CREATE TABLE IF NOT EXISTS verification_tokens (
  token_hash TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  video_slug TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  used_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_verification_tokens_email ON verification_tokens (email);
CREATE INDEX IF NOT EXISTS idx_verification_tokens_video_slug ON verification_tokens (video_slug);

CREATE TABLE IF NOT EXISTS access_sessions (
  session_id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  video_slug TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  started_at INTEGER
);

CREATE INDEX IF NOT EXISTS idx_access_sessions_email ON access_sessions (email);
CREATE INDEX IF NOT EXISTS idx_access_sessions_video_slug ON access_sessions (video_slug);
