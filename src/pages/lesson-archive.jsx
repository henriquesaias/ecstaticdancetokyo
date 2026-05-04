import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
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

const LessonArchive = () => {
  const [searchParams] = useSearchParams();
  const video = (searchParams.get('video') || '').trim();
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
      setStatusMessage('Verifying your email...');
      setIsVerifying(true);

      try {
        const data = await verifyEmailToken({ token: emailToken, video });
        if (!ignore) {
          setSessionToken(data.sessionToken);
          setStatusMessage('Email verified. Your lesson is now unlocked.');
        }
      } catch (err) {
        if (!ignore) {
          setStatusError(err.message || 'Email verification failed.');
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
      setStatusError('Missing video id in URL. Add ?video=your-video-slug');
      setStatusMessage('');
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setStatusError('Please enter a valid email address.');
      setStatusMessage('');
      return;
    }

    setIsSubmitting(true);
    setStatusError('');
    setStatusMessage('Checking access and sending your verification link...');

    try {
      await requestEmailVerification({
        email: normalizedEmail,
        video,
      });

      setStatusMessage('Check your inbox and click the link to unlock this lesson. If you do not see it, check your spam or promotions folder.');
    } catch (err) {
      setStatusError(err.message || 'Could not send verification email.');
      setStatusMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Heading as="h2" mb={3}>Online Lesson Archive</Heading>
      <Text mb={8}>
        Enter your subscription email to receive a secure login link for this lesson.
      </Text>

      {!video && (
        <Alert.Root status="warning" mb={8}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Video parameter is required</Alert.Title>
            <Alert.Description>
              Open this page with a URL like /#/lessons?video=breathwork-2026-05-01
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {video && !sessionToken && (
        <Box as="form" onSubmit={onRequestLink} mb={8}>
          <VStack align="stretch" gap={4}>
            <Text fontWeight="bold">Requested lesson: {video}</Text>

            <Field.Root required>
              <Field.Label>Email address</Field.Label>
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
              Send verification email
            </Button>
          </VStack>
        </Box>
      )}

      {(isVerifying || statusMessage) && (
        <Alert.Root status="info" mb={6}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Access flow update</Alert.Title>
            <Alert.Description display="flex" alignItems="center" gap={2}>
              {isVerifying && <Spinner size="sm" />}
              {statusMessage || 'Working...'}
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {statusError && (
        <Alert.Root status="error" mb={6}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Could not verify access</Alert.Title>
            <Alert.Description>{statusError}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {sessionToken && streamUrl && (
        <Box>
          <Text mb={3} fontWeight="bold">Your lesson is ready.</Text>
          <video
            controls
            src={streamUrl}
            style={{ width: '100%', borderRadius: '12px' }}
          >
            Your browser does not support the video tag.
          </video>
        </Box>
      )}

      <Link asChild display="inline-block" mt={8}>
        <RouterLink to="/online-community">Back to Online Community</RouterLink>
      </Link>
    </Box>
  );
};

export default LessonArchive;
