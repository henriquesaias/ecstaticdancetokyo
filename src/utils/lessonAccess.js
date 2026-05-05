const API_BASE_URL = process.env.REACT_APP_LESSON_ACCESS_API_BASE_URL;

if (!API_BASE_URL) {
  // eslint-disable-next-line no-console
  console.warn('REACT_APP_LESSON_ACCESS_API_BASE_URL が未設定です。レッスンアーカイブへのリクエストは失敗します。');
}

const normalizeError = async (res) => {
  let message = 'リクエストに失敗しました。';

  try {
    const data = await res.json();
    if (data?.error) {
      message = data.error;
    }
  } catch (_) {
    // Keep fallback message when response is not JSON.
  }

  throw new Error(message);
};

const postJson = async (path, body) => {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return normalizeError(res);
  }

  return res.json();
};

const verifyEmailToken = async ({ token, video }) => {
  return postJson('/v1/access/verify-email', { token, video });
};

const requestEmailVerification = async ({ email, video }) => {
  return postJson('/v1/access/request-email-link', { email, video });
};

const buildStreamUrl = ({ sessionToken, video }) => {
  const params = new URLSearchParams({
    video,
    session: sessionToken,
  });

  return `${API_BASE_URL}/v1/access/stream?${params.toString()}`;
};

export {
  requestEmailVerification,
  verifyEmailToken,
  buildStreamUrl,
};
