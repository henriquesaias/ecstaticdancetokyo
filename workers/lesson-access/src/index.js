import { AwsClient } from 'aws4fetch';

const json = (data, init = {}) => {
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json');
  return new Response(JSON.stringify(data), {
    ...init,
    headers,
  });
};

const withCors = (request, response) => {
  const origin = request.headers.get('Origin') || '*';
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', origin);
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Range');
  headers.set('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Content-Type, Accept-Ranges');
  headers.set('Vary', 'Origin');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

const parseJson = async (request) => {
  try {
    return await request.json();
  } catch (_) {
    return null;
  }
};

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const VIDEO_REGEX = /^[A-Za-z0-9._\-/ %()+]+$/;

const isValidEmail = (email) => EMAIL_REGEX.test(email || '');

const normalizeVideoSlug = (video) => {
  const value = (video || '').trim();

  if (!value || !VIDEO_REGEX.test(value) || value.includes('..')) {
    return null;
  }

  const sanitized = value.replace(/^\/+/, '');

  if (!sanitized) {
    return null;
  }

  return sanitized.replace(/\.mp4$/i, '');
};

const normalizeVideoKey = (video, prefix) => {
  const slug = normalizeVideoSlug(video);

  if (!slug) {
    return null;
  }

  const sanitized = `${slug}.mp4`;
  const cleanPrefix = (prefix || '').replace(/^\/+|\/+$/g, '');

  if (!cleanPrefix) {
    return sanitized;
  }

  return `${cleanPrefix}/${sanitized}`;
};

const encodeRfc3986 = (value) => {
  return encodeURIComponent(value).replace(/[!'()*]/g, (ch) => {
    return `%${ch.charCodeAt(0).toString(16).toUpperCase()}`;
  });
};

const encodeObjectPath = (value) => {
  return String(value)
    .split('/')
    .map((segment) => encodeRfc3986(segment))
    .join('/');
};

const encodeUrlPath = (value) => {
  return String(value)
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
};

const bytesToHex = (bytes) => {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const toBase64Url = (input) => {
  const source = typeof input === 'string' ? new TextEncoder().encode(input) : input;
  let binary = '';

  for (let i = 0; i < source.length; i += 1) {
    binary += String.fromCharCode(source[i]);
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const fromBase64Url = (value) => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (normalized.length % 4)) % 4);
  return atob(normalized + padding);
};

const sha256Hex = async (value) => {
  const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : value;
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return bytesToHex(digest);
};

const hmacSha256 = async (keyBytes, value) => {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const valueBytes = typeof value === 'string' ? new TextEncoder().encode(value) : value;
  return crypto.subtle.sign('HMAC', cryptoKey, valueBytes);
};

const hmacSha256Hex = async (keyBytes, value) => {
  const signature = await hmacSha256(keyBytes, value);
  return bytesToHex(signature);
};

const signSession = async (payload, secret) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = toBase64Url(JSON.stringify(header));
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const keyBytes = new TextEncoder().encode(secret);
  const sig = await hmacSha256(keyBytes, signingInput);
  return `${signingInput}.${toBase64Url(new Uint8Array(sig))}`;
};

const verifySession = async (token, secret, options = {}) => {
  const ignoreExpiration = options.ignoreExpiration === true;

  if (!token || token.split('.').length !== 3) {
    return null;
  }

  const [encodedHeader, encodedPayload, signature] = token.split('.');
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const keyBytes = new TextEncoder().encode(secret);
  const expected = toBase64Url(new Uint8Array(await hmacSha256(keyBytes, signingInput)));

  if (expected !== signature) {
    return null;
  }

  try {
    const payloadJson = fromBase64Url(encodedPayload);
    const payload = JSON.parse(payloadJson);

    if (!payload?.exp) {
      return null;
    }

    if (!ignoreExpiration && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch (_) {
    return null;
  }
};

const nowUnix = () => Math.floor(Date.now() / 1000);

const splitCsv = (value) => {
  return (value || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
};

const normalizePathToken = (value) => String(value || '').trim().replace(/^\/+/, '');

const isTruthy = (value) => {
  const normalized = String(value || '').trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes';
};

const metadataList = (product, key) => {
  return splitCsv(product?.metadata?.[key]).map((entry) => normalizePathToken(entry));
};

const canProductAccessVideo = (product, video, videoKey) => {
  if (!product || typeof product !== 'object') {
    return false;
  }

  if (isTruthy(product?.metadata?.access_all)) {
    return true;
  }

  const normalizedVideo = normalizePathToken(video);
  const normalizedVideoWithExtension = normalizePathToken(`${video}.mp4`);
  const normalizedVideoKey = normalizePathToken(videoKey);
  const normalizedVideoKeyWithoutExtension = normalizedVideoKey.replace(/\.mp4$/i, '');

  const exactVideos = metadataList(product, 'access_videos');
  if (
    exactVideos.some(
      (rule) =>
        rule === normalizedVideo ||
        rule === normalizedVideoWithExtension ||
        rule === normalizedVideoKey ||
        rule === normalizedVideoKeyWithoutExtension
    )
  ) {
    return true;
  }

  const prefixRules = metadataList(product, 'access_prefixes');
  if (
    prefixRules.some(
      (prefix) =>
        prefix &&
        (normalizedVideo.startsWith(prefix) || normalizedVideoKey.startsWith(prefix))
    )
  ) {
    return true;
  }

  return false;
};

const stripeRequest = async (env, path, searchParams = {}) => {
  const url = new URL(`https://api.stripe.com${path}`);
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => {
        if (entry !== undefined && entry !== null && entry !== '') {
          url.searchParams.append(`${key}[]`, String(entry));
        }
      });
      return;
    }

    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Stripeへのリクエストに失敗しました (${res.status}): ${body}`);
  }

  return res.json();
};

const hasStripeAccess = async (env, email, video, videoKey) => {
  const escapedEmail = email.replace(/'/g, "\\'");
  const customerSearch = await stripeRequest(env, '/v1/customers/search', {
    query: `email:'${escapedEmail}'`,
    limit: '10',
  });

  const customers = customerSearch.data || [];

  if (!customers.length) {
    return false;
  }

  const allowedStatuses = (env.ALLOWED_SUBSCRIPTION_STATUSES || 'active,trialing')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const productCache = new Map();

  const getProduct = async (productRef) => {
    if (!productRef) {
      return null;
    }

    if (typeof productRef !== 'string') {
      return productRef;
    }

    if (productCache.has(productRef)) {
      return productCache.get(productRef);
    }

    const product = await stripeRequest(env, `/v1/products/${encodeURIComponent(productRef)}`);
    productCache.set(productRef, product);
    return product;
  };

  for (const customer of customers) {
    const subs = await stripeRequest(env, '/v1/subscriptions', {
      customer: customer.id,
      status: 'all',
      limit: '100',
    });

    const entries = subs.data || [];

    for (const sub of entries) {
      if (!allowedStatuses.includes(sub.status)) {
        continue;
      }

      for (const item of sub.items?.data || []) {
        const product = await getProduct(item.price?.product);
        if (canProductAccessVideo(product, video, videoKey)) {
          return true;
        }
      }
    }
  }

  return false;
};

const sendEmail = async (env, email, verifyUrl) => {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [email],
      subject: env.EMAIL_SUBJECT || 'オンラインレッスン視聴確認',
      html: `
        <p>ご希望のレッスンを視聴するために、メール認証を完了してください。</p>
        <p><a href="${verifyUrl}">安全にレッスンを開く</a></p>
        <p>このリンクの有効期限は15分です。</p>
      `,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`メール送信プロバイダーへのリクエストに失敗しました (${res.status}): ${body}`);
  }
};

const fetchFromSpaces = async ({ env, objectKey, method = 'GET', range }) => {
  const endpoint = new URL(env.DO_SPACES_ENDPOINT);
  const encodedObjectKey = encodeObjectPath(objectKey);
  const requestUrl = `${endpoint.origin}/${env.DO_SPACES_BUCKET}/${encodedObjectKey}`;
  const awsClient = new AwsClient({
    accessKeyId: env.DO_SPACES_KEY,
    secretAccessKey: env.DO_SPACES_SECRET,
    region: env.DO_SPACES_REGION,
    service: 's3',
  });

  const headers = {
    host: endpoint.host,
  };

  if (range) {
    headers.Range = range;
  }

  return awsClient.fetch(requestUrl, {
    method,
    headers,
  });
};

const fetchFromSpacesCdn = async ({ env, objectKey, method = 'GET', range }) => {
  const region = (env.DO_SPACES_REGION || '').trim();
  const bucket = (env.DO_SPACES_BUCKET || '').trim();
  const encodedObjectKey = encodeObjectPath(objectKey);
  const cdnUrl = `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${encodedObjectKey}`;

  const headers = {};
  if (range) {
    headers.Range = range;
  }

  return fetch(cdnUrl, {
    method,
    headers,
  });
};

const checkObjectAccess = async (env, objectKey) => {
  const res = await fetchFromSpaces({
    env,
    objectKey,
    method: 'HEAD',
  });

  if (res.ok) {
    return { exists: true, source: 'spaces-api', status: res.status };
  }

  // Fallback to CDN URL for buckets configured for public read.
  if (res.status === 401 || res.status === 403 || res.status === 400) {
    const cdnRes = await fetchFromSpacesCdn({
      env,
      objectKey,
      method: 'HEAD',
    });

    if (cdnRes.ok) {
      return { exists: true, source: 'spaces-cdn', status: cdnRes.status };
    }

    return {
      exists: false,
      source: 'spaces-api+cdn',
      status: cdnRes.status,
      apiStatus: res.status,
    };
  }

  return { exists: false, source: 'spaces-api', status: res.status };
};

const handleRequestEmailLink = async (request, env) => {
  const body = await parseJson(request);
  const email = (body?.email || '').trim().toLowerCase();
  const video = normalizeVideoSlug(body?.video || '');
  const videoKey = normalizeVideoKey(video, env.DO_SPACES_PREFIX);

  if (!isValidEmail(email) || !videoKey) {
    return json({ error: 'メールアドレスまたは動画識別子が無効です。' }, { status: 400 });
  }

  const hasAccess = await hasStripeAccess(env, email, video, videoKey);

  if (!hasAccess) {
    return json({ error: 'このメールアドレスは、このレッスンを視聴可能な有効サブスクリプションに紐づいていません。' }, { status: 403 });
  }

  const objectAccess = await checkObjectAccess(env, videoKey);
  if (!objectAccess.exists) {
    if (objectAccess.status === 401 || objectAccess.status === 403 || objectAccess.apiStatus === 401 || objectAccess.apiStatus === 403) {
      return json(
        {
          error: '現在のSpaces権限またはキー設定では、レッスン動画オブジェクトを読み取れません。',
          details: {
            source: objectAccess.source,
            status: objectAccess.status,
            apiStatus: objectAccess.apiStatus,
            objectKey: videoKey,
          },
        },
        { status: 502 }
      );
    }

    return json({ error: '指定されたレッスンが存在しません。' }, { status: 404 });
  }

  const rawToken = crypto.randomUUID().replace(/-/g, '');
  const tokenHash = await sha256Hex(rawToken);
  const createdAt = nowUnix();
  const expiresAt = createdAt + 15 * 60;

  await env.DB.prepare(
    `INSERT INTO verification_tokens (token_hash, email, video_slug, created_at, expires_at)
     VALUES (?, ?, ?, ?, ?)`
  )
    .bind(tokenHash, email, video, createdAt, expiresAt)
    .run();

  const verifyUrl = `${env.PUBLIC_APP_ARCHIVE_URL}/${encodeUrlPath(video)}?token=${encodeURIComponent(rawToken)}`;
  await sendEmail(env, email, verifyUrl);

  return json({ ok: true, message: '認証メールを送信しました。' }, { status: 202 });
};

const handleVerifyEmail = async (request, env) => {
  const body = await parseJson(request);
  const rawToken = (body?.token || '').trim();
  const video = normalizeVideoSlug(body?.video || '');

  if (!rawToken || !video) {
    return json({ error: 'トークンまたは動画情報が不足しています。' }, { status: 400 });
  }

  const tokenHash = await sha256Hex(rawToken);
  const current = nowUnix();

  const row = await env.DB.prepare(
    `SELECT token_hash, email, video_slug, expires_at, used_at
     FROM verification_tokens
     WHERE token_hash = ?`
  )
    .bind(tokenHash)
    .first();

  if (!row || normalizeVideoSlug(row.video_slug) !== video || row.used_at || row.expires_at < current) {
    return json({ error: '認証トークンが無効か、有効期限が切れています。' }, { status: 401 });
  }

  await env.DB.prepare('UPDATE verification_tokens SET used_at = ? WHERE token_hash = ?')
    .bind(current, tokenHash)
    .run();

  const sessionId = crypto.randomUUID();
  const sessionExpirySeconds = Number(env.SESSION_TTL_SECONDS || 3600);
  const sessionExp = current + sessionExpirySeconds;

  await env.DB.prepare(
    `INSERT INTO access_sessions (session_id, email, video_slug, created_at, expires_at)
     VALUES (?, ?, ?, ?, ?)`
  )
    .bind(sessionId, row.email, video, current, sessionExp)
    .run();

  const sessionToken = await signSession(
    {
      sid: sessionId,
      email: row.email,
      video,
      exp: sessionExp,
    },
    env.SESSION_SIGNING_SECRET
  );

  return json({ ok: true, sessionToken }, { status: 200 });
};

const handleStream = async (request, env) => {
  const url = new URL(request.url);
  const video = normalizeVideoSlug(url.searchParams.get('video') || '');
  const sessionToken = (url.searchParams.get('session') || '').trim();
  const videoKey = normalizeVideoKey(video, env.DO_SPACES_PREFIX);

  if (!videoKey || !sessionToken) {
    return json({ error: 'セッションまたは動画情報が不足しています。' }, { status: 400 });
  }

  const freshSession = await verifySession(sessionToken, env.SESSION_SIGNING_SECRET);
  const session = freshSession || await verifySession(sessionToken, env.SESSION_SIGNING_SECRET, { ignoreExpiration: true });

  if (!session || normalizeVideoSlug(session.video) !== video) {
    return json({ error: 'セッションが無効です。' }, { status: 401 });
  }

  const sessionRow = await env.DB.prepare(
    `SELECT session_id, video_slug, expires_at, started_at
     FROM access_sessions
     WHERE session_id = ?`
  )
    .bind(session.sid)
    .first();

  if (!sessionRow || normalizeVideoSlug(sessionRow.video_slug) !== video) {
    return json({ error: 'セッションが無効です。' }, { status: 401 });
  }

  const current = nowUnix();
  const tokenAndDbSessionActive = Boolean(freshSession) && Number(sessionRow.expires_at) >= current;

  if (tokenAndDbSessionActive) {
    if (!sessionRow.started_at) {
      await env.DB.prepare('UPDATE access_sessions SET started_at = ? WHERE session_id = ?')
        .bind(current, session.sid)
        .run();
    }
  } else {
    const startedAt = Number(sessionRow.started_at || 0);
    const continuationSeconds = Number(env.PLAYBACK_CONTINUATION_SECONDS || 21600);

    if (!startedAt || current > startedAt + continuationSeconds) {
      return json({ error: 'セッションの有効期限が切れました。' }, { status: 401 });
    }
  }

  const range = request.headers.get('Range') || undefined;

  const spacesResponse = await fetchFromSpaces({
    env,
    objectKey: videoKey,
    method: 'GET',
    range,
  });

  let upstreamResponse = spacesResponse;

  if (spacesResponse.status === 401 || spacesResponse.status === 403 || spacesResponse.status === 400) {
    upstreamResponse = await fetchFromSpacesCdn({
      env,
      objectKey: videoKey,
      method: 'GET',
      range,
    });
  }

  if (!upstreamResponse.ok && upstreamResponse.status !== 206) {
    const body = await upstreamResponse.text();
    return json({ error: `動画の取得に失敗しました (${upstreamResponse.status}): ${body}` }, { status: 502 });
  }

  const responseHeaders = new Headers();
  const passHeaders = ['Content-Type', 'Content-Length', 'Content-Range', 'Accept-Ranges', 'ETag', 'Last-Modified'];

  passHeaders.forEach((headerName) => {
    const value = upstreamResponse.headers.get(headerName);
    if (value) {
      responseHeaders.set(headerName, value);
    }
  });

  if (!responseHeaders.has('Content-Type')) {
    responseHeaders.set('Content-Type', 'video/mp4');
  }

  responseHeaders.set('Content-Disposition', 'inline');
  responseHeaders.set('Cache-Control', 'private, no-store');
  responseHeaders.set('X-Content-Type-Options', 'nosniff');

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return withCors(request, new Response(null, { status: 204 }));
    }

    try {
      const url = new URL(request.url);

      let response;

      if (request.method === 'POST' && url.pathname === '/v1/access/request-email-link') {
        response = await handleRequestEmailLink(request, env);
      } else if (request.method === 'POST' && url.pathname === '/v1/access/verify-email') {
        response = await handleVerifyEmail(request, env);
      } else if (request.method === 'GET' && url.pathname === '/v1/access/stream') {
        response = await handleStream(request, env);
      } else {
        response = json({ error: '見つかりません。' }, { status: 404 });
      }

      return withCors(request, response);
    } catch (err) {
      const message = err instanceof Error ? err.message : '予期しないWorkerエラーが発生しました。';
      return withCors(request, json({ error: message }, { status: 500 }));
    }
  },
};
