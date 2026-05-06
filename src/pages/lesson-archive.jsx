import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useParams, useSearchParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Field,
  Heading,
  Input,
  Link,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  buildStreamUrl,
  requestEmailVerification,
  verifyEmailToken,
} from '../utils/lessonAccess';

const isValidEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

const normalizeVideoSlug = (value) => {
  const normalized = String(value || '').trim().replace(/^\/+/, '');

  if (!normalized) {
    return '';
  }

  return normalized.replace(/\.mp4$/i, '');
};

const LessonArchive = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const videoFromPath = (() => {
    const raw = (params['*'] || '').trim().replace(/^\/+/, '');

    if (!raw) {
      return '';
    }

    try {
      return decodeURIComponent(raw).trim();
    } catch (_) {
      return raw;
    }
  })();
  const video = normalizeVideoSlug(videoFromPath || searchParams.get('video') || '');
  const emailToken = (searchParams.get('token') || '').trim();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusError, setStatusError] = useState('');
  const [sessionToken, setSessionToken] = useState('');

  const streamUrl = useMemo(() => {
    if (!video || !sessionToken) {
      return '';
    }

    return buildStreamUrl({ sessionToken, video });
  }, [sessionToken, video]);

  useEffect(() => {
    let ignore = false;

    const verify = async () => {
      if (!emailToken || !video) {
        return;
      }

      setStatusError('');
      setStatusMessage('メールを確認しています...');
      setIsVerifying(true);

      try {
        const data = await verifyEmailToken({ token: emailToken, video });
        if (!ignore) {
          setSessionToken(data.sessionToken);
          setStatusMessage('メールが確認されました。このレッスンのロックが解除されました。');
        }
      } catch (err) {
        if (!ignore) {
          setStatusError(err.message || 'メールの確認に失敗しました。');
          setStatusMessage('');
        }
      } finally {
        if (!ignore) {
          setIsVerifying(false);
        }
      }
    };

    verify();

    return () => {
      ignore = true;
    };
  }, [emailToken, video]);

  const onRequestLink = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!video) {
      setStatusError('URLに動画IDがありません。/#/lessons/ElementsMay2026/EarthMay4.mp4 の形式で開いてください。');
      setStatusMessage('');
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setStatusError('有効なメールアドレスを入力してください。');
      setStatusMessage('');
      return;
    }

    setIsSubmitting(true);
    setStatusError('');
    setStatusMessage('アクセスを確認し、認証リンクを送信しています...');

    try {
      await requestEmailVerification({
        email: normalizedEmail,
        video,
      });

      setStatusMessage('受信トレイを確認し、リンクをクリックしてこのレッスンを解除してください。見当たらない場合は、迷惑メールやプロモーションフォルダも確認してください。');
    } catch (err) {
      setStatusError(err.message || '認証メールを送信できませんでした。');
      setStatusMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Heading as="h2" mb={3}>オンラインレッスンアーカイブ</Heading>
      <Text mb={8}>
        サブスクリプションに登録したメールアドレスを入力すると、このレッスン用の安全なログインリンクが送信されます。
      </Text>

      {!video && (
        <Alert.Root status="warning" mb={8}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>動画パラメータが必要です</Alert.Title>
            <Alert.Description>
              /#/lessons/ElementsMay2026/EarthMay4.mp4 のようなURLでこのページを開いてください
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {video && !sessionToken && (
        <Box as="form" onSubmit={onRequestLink} mb={8}>
          <VStack align="stretch" gap={4}>
            <Text fontWeight="bold">リクエストされたレッスン: {video}</Text>

            <Field.Root required>
              <Field.Label>メールアドレス</Field.Label>
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                type="email"
                autoComplete="email"
              />
            </Field.Root>

            <Button
              type="submit"
              colorPalette="orange"
              loading={isSubmitting}
              disabled={isVerifying}
            >
              認証メールを送信
            </Button>
          </VStack>
        </Box>
      )}

      {(isVerifying || statusMessage) && (
        <Alert.Root status="info" mb={6}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>アクセス状況の更新</Alert.Title>
            <Alert.Description display="flex" alignItems="center" gap={2}>
              {isVerifying && <Spinner size="sm" />}
              {statusMessage || '処理中...'}
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {statusError && (
        <Alert.Root status="error" mb={6}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>アクセスを確認できませんでした</Alert.Title>
            <Alert.Description>{statusError}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {sessionToken && streamUrl && (
        <Box>
          <Text mb={3} fontWeight="bold">レッスンの準備ができました。</Text>
          <video
            controls
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            onContextMenu={(event) => event.preventDefault()}
            src={streamUrl}
            style={{ width: '100%', borderRadius: '12px' }}
          >
            お使いのブラウザはvideoタグに対応していません。
          </video>
        </Box>
      )}

      <Link asChild display="inline-block" mt={8}>
        <RouterLink to="/online-community">オンラインコミュニティに戻る</RouterLink>
      </Link>
    </Box>
  );
};

export default LessonArchive;
