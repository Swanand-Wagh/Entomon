# Entomon Institute of Invertebrates Zoology

## Local development

Use Node.js 22.6+ and Yarn Classic. MongoDB must run as a replica set.

```sh
yarn install --frozen-lockfile
yarn dev
yarn test
yarn build
yarn start
```

Configure credentials outside Git:

- `DATABASE_URL`: MongoDB connection string. Builds read blogs/events to prerender public pages.
- `AUTH_SECRET`, `AUTH_URL`: authentication secret and application origin.
- `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`: Google sign-in credentials.
- `NEXT_PUBLIC_APP_URL`: public application origin.
- `ARCJET_KEY`: authentication/email rate limiting.
- `RESEND_API_KEY`, `EMAIL_ADDRESS`, `ADMIN_EMAIL`: email delivery.
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`: payments.

Use a disposable local database for testing. Public event-list reads currently update expired event statuses; do not point an audit build at production.

## Public caching and media

- Public pages do not read a server session. Navigation, comment permissions, and registration status obtain the current session on the client.
- Blog/event pages retain one-hour incremental static regeneration. Protected dashboards and authentication/payment APIs remain request-specific.
- Public routes and `/media/` bypass session middleware. Private routes and APIs retain their existing middleware checks; authenticated server actions still authorize each mutation.
- Public covers and rich-text `img` sources containing PNG, JPEG, GIF, or WebP data URLs become content-versioned `/media/{kind}/{id}/{slot}/{version}` URLs. Editor/database values stay unchanged; no storage migration or new external service is required.
- The media endpoint reads only public blog/event fields, validates identifiers and raster signatures, and serves exact matching versions with immutable cache headers. Missing, invalid, or superseded versions return uncached 404 responses. Other image formats retain their existing rendering behavior rather than becoming broken images.
- Registration receives only event ID, slug, price, and status—not the cover or full description. Its status action derives identity from the authenticated session.
- Content mutations invalidate public caches. **Layout invalidation paths must include filesystem route groups**: `/(public)/(resources)/blogs` and `/(public)/events`. Using `/blogs` or `/events` with the `layout` type misses those layout cache tags. Concrete URL invalidation, such as `/blogs/some-slug`, does not need route groups.

Clearing caches does not reverse Fast Origin Transfer already consumed. Keeping public responses/media cached avoids repeated origin transfers.

## Transfer audit verification

Verified locally in production mode with an isolated MongoDB replica set and synthetic records. The fixture used a 720,683-byte PNG cover and a 90,243-byte inline image.

| Response | Before HTML bytes | After HTML bytes |
| --- | ---: | ---: |
| Blog list | 2,953,234 | 62,777 |
| Blog detail | 3,197,712 | 74,842 |
| Event list | 2,955,157 | 62,202 |
| Event detail | 4,282,147 | 76,284 |

The event detail's gzip response fell from 3,207,869 to 12,851 bytes. Its seven embedded PNG data-URL copies became zero; the image bytes are fetched separately through cacheable URLs. These are synthetic local measurements, not production usage savings or historical per-request attribution.

Verification included:

- Five deterministic media/version/parser regression tests with `yarn test`.
- Full production build, TypeScript validation, and linting. Existing warnings remain in email image markup and the email-verification effect.
- Public HTML/RSC cache behavior; unchanged binary image bytes; immutable media headers; uncached wrong-version/missing-media responses.
- Guest/user/admin route isolation and absence of session identity in shared public HTML.
- Real Brave interactions for session refresh, free registration/unregistration, comments, image loading, and logout.
- Actual HTTP server-action create/update/delete operations for blogs/events and comments, including warmed-cache invalidation, renamed slugs, and rejection of old image versions.
- Session-scoped registration lookup rejects guests and ignores a supplied different user identity.

Native screen capture was unavailable; UI evidence came from the actual Brave DOM, interactions, image loading, and database/HTTP outcomes. Live CDN behavior, external sign-in/email providers, and paid checkout were not exercised. Existing payment-endpoint trust in client identity/amount is outside this transfer fix.

## Review and deployment safety

Independent media/cache and authentication-lifecycle code reviews found no blocking issues. The reviewed patch passed the media tests, full production build, and a fresh isolated production-mode HTTP smoke run.

`vercel.json` disables automatic Git deployments only for `fix/origin-transfer-caching`. Other branches, including `main`, keep their normal deployment behavior. Pushing the feature branch is separate from merging or deploying production.

The personal Vercel quota pause is unchanged. No production merge/deployment, billing change, production data write, or cache purge was performed.