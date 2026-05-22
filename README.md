# Ecstatic Dance Tokyo

## Online Lesson Archive (Cloudflare Worker + DO Spaces + Stripe)

This repository now includes a secure archive flow for online lessons with these guarantees:

- Video is requested by URL param on the frontend (`/#/lessons?video=...`).
- User must enter an email.
- Worker verifies that email belongs to a Stripe customer with valid entitlement.
- Subscription products are allowed based on active/trialing subscription status.
- One-off Checkout purchases are persisted from Stripe webhooks into D1 entitlements, then granted for a limited window starting from first granted access (default 90 days).
- Worker sends a one-time verification link by email.
- Only after clicking that link does the app receive a short-lived session token.
- Video is streamed through the Worker (not directly exposed), and every stream request validates the session.

### Frontend changes

- New page: `src/pages/lesson-archive.jsx`
- New utility: `src/utils/lessonAccess.js`
- New route: `/lessons`

Set this environment variable for the React app:

```
REACT_APP_LESSON_ACCESS_API_BASE_URL=https://your-lesson-access-worker.workers.dev
```

### Worker project

Worker implementation and setup live in:

- `workers/lesson-access/src/index.js`
- `workers/lesson-access/schema.sql`
- `workers/lesson-access/wrangler.toml.example`

Quick start:

1. `cd workers/lesson-access`
2. `npm install`
3. Create D1 DB and bind it in `wrangler.toml`.
4. Apply schema: `wrangler d1 execute emi-lesson-access --file=./schema.sql`
5. Configure vars in `wrangler.toml` and secrets with `wrangler secret put`.
6. Deploy: `npm run deploy`
7. Configure Stripe webhook endpoint: `https://<your-worker-domain>/v1/stripe/webhook`
8. Subscribe webhook events: `checkout.session.completed` and `checkout.session.async_payment_succeeded`

Required Worker secrets:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `BACKFILL_ADMIN_TOKEN` (for one-off historical backfill endpoint)
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `SESSION_SIGNING_SECRET`
- `DO_SPACES_KEY`
- `DO_SPACES_SECRET`

Important vars (non-secret):

- `PUBLIC_APP_ARCHIVE_URL` (for verification link target)
- `ONE_OFF_ACCESS_WINDOW_DAYS` (one-off purchase access window starting at first granted access)
- `DO_SPACES_ENDPOINT` (for example `https://nyc3.digitaloceanspaces.com`)
- `DO_SPACES_REGION` (for example `nyc3`)
- `DO_SPACES_BUCKET`
- `DO_SPACES_PREFIX` (folder where videos are stored)

Stripe Dashboard metadata rules (set on each Product):

- `access_all=true` grants access to all videos.
- `access_videos=video-a.mp4,course1/lesson-2.mp4` grants exact video access.
- `access_prefixes=course1/,membership/may/` grants access by video key prefix.

Notes:

- `DO_SPACES_KEY` should be your DigitalOcean Spaces access key ID (not the secret).
- Video values should match the same `video` query value used in `/#/lessons?video=...`.
- After updating Worker schema, run `wrangler d1 execute emi-lesson-access --file=./schema.sql --remote` to create new entitlement tables in production.
- One-time backfill endpoint: `POST /v1/admin/backfill-one-off-entitlements` with `Authorization: Bearer <BACKFILL_ADMIN_TOKEN>`.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
