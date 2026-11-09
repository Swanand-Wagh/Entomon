# Entomon Institute of Invertebrates Zoology

## Local development

Use Node.js 22.x (22.6 or newer) and Yarn Classic. Select Node 22 before running Yarn if your global Node version is newer. MongoDB must run as a replica set.

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

## Critical dependency remediation

The security update covers all ten critical Dependabot alerts reported on the default branch:

| Alerts | Patched dependency |
| --- | --- |
| #229, #211, #210, #209, #208, #29 | Next.js 15.5.29 |
| #169, #165 | NextAuth 5.0.0-beta.32 |
| #166 | Auth.js core 0.41.3, shared by NextAuth and Prisma adapter 2.11.3 |
| #16 | form-data 4.0.6 |

Sharp is explicitly pinned to 0.35.5: Next's optional dependency range still permits an older Sharp line, while the SVG image advisory requires at least 0.35.5. The lockfile includes patched Linux/glibc and musl binaries. `eslint-config-next` matches Next 15.5.29.

The `form-data` resolution updates both Razorpay/Axios and jsdom's transitive copies without upgrading those unrelated parent APIs. Both copies resolve to the same patched version. The Node 22 engine requirement is aligned with `Dockerfile`'s `node:22-alpine` base.

Verification:

- Every resolved affected version was compared against all ten advisory ranges; none matched.
- `yarn audit --json` reported **zero critical findings**. Its exit status remains nonzero for remaining high/moderate/low findings; this is not a full dependency-security clearance.
- Six native tests and a full production build passed.
- The new multipart regression reproduced an injected `admin` field on form-data 4.0.1. With 4.0.6, the real multipart parser preserves the submitted value and creates no injected field.
- The Auth.js wrapper with an intentionally invalid provider configuration did not authenticate the request. Real credential callbacks, user/admin session roles, wrong-password rejection, and sign-out passed against disposable local MongoDB.
- Public HTML/RSC caching, authenticated route isolation, server-action cache invalidation, and the existing Brave session/registration/logout flows passed.
- Next's image optimizer processed PNG and AVIF inputs and retained its default SVG prohibition.
- A clean frozen-lockfile install in Linux x64/glibc passed native Sharp AVIF decoding, JWT encryption/decryption, and the multipart-injection smoke. The pinned Alpine image's Node/Yarn versions were checked; the full application Docker image was not built.

Jose can emit Edge compression API warnings, but those APIs require compressed `zip: DEF` tokens; ordinary Auth.js session tokens do not use compression. Middleware remains on Edge, and its normal JWT routing was exercised. The existing lint warnings and external-provider/paid-checkout limits above remain.

Dependabot tracks `main`: pushing a feature-branch fix does not close those default-branch alerts until the fixes are merged. Alerts were not dismissed, and production remains unchanged.

## Review and deployment safety

Independent media/cache and authentication-lifecycle code reviews found no blocking issues. The reviewed patch passed the media tests, full production build, and a fresh isolated production-mode HTTP smoke run.

`vercel.json` disables automatic Git deployments only for `fix/origin-transfer-caching`. Other branches, including `main`, keep their normal deployment behavior. Pushing the feature branch is separate from merging or deploying production.

The transfer and security fixes were pushed directly to `main` with explicit authorization. At the November 8, 2026 audit, Vercel still reported `Account is blocked.` and the last successful production deployment remained on `3a21bdb`. No new production deployment, billing change, production data write, or cache purge was performed.

## India-first Vercel settings audit

Verified in the existing authenticated personal workspace on November 8, 2026:

| Setting | Decision |
| --- | --- |
| Function region | Keep the existing Mumbai (`bom1`) region. Hobby supports one function region. |
| Compute/runtime | Keep Fluid Compute enabled, standard CPU, and Node 22.x. |
| Preview protection | Keep Vercel authentication for previews and generated production deployment URLs. |
| Bot Protection | Enabled in **Log** mode, not Challenge. It does not block requests or reduce transfer by itself. |
| AI bots | Log AI Crawlers; leave the AI Assistants category disabled/allowed. No crawler denial or country blocking. |
| CDN | Keep caches intact; no dashboard routing overrides or external rewrite caching are needed by this app. |

The live firewall configuration was read back as version 2 with no pending draft, custom rules, or IP blocks. The UI confirmed crawler logging and allowed assistants. Browser/training/search user-agent probes still returned the account's existing `402 DEPLOYMENT_DISABLED`, with no mitigation header. These probes do not simulate verified bot source IPs or establish live page performance.

Crawler denial was not enabled: Vercel warns it can reduce AI search/citation visibility. Observe logs before considering stronger rules. Blanket non-browser challenges also need payment-webhook and external-provider verification first. No paid WAF ruleset, drain, or analytics upgrade was enabled.

Vercel's CDN already serves cached assets near visitors; changing function geography does not reduce the number of bytes counted toward Fast Origin Transfer. The database region is not exposed by this project's Vercel storage/integration settings and was not changed.

After the pause ends on December 4, deploy the current `main` and verify real public HTML/RSC cache hits, immutable media caching, and private-route isolation before attributing production savings to the local measurements above. Current cache-hit and real-user performance views have no usable data in their selected time ranges. Monitor **Fast Origin Transfer for the whole workspace**, not just visitor-facing Fast Data Transfer. An Entomon target around 250 MB/day leaves headroom within a 10 GB, 30-day allowance; traffic growth can still exceed it.

Hobby usage notifications are automatic. Custom notification thresholds and project alerts require Pro and were not purchased. Cache purges cannot reverse already-consumed transfer and create new cold misses.

The existing apex-to-`www` 308 redirect is correct. Vercel additionally recommends updating the Squarespace-managed DNS zone to `A @ 216.198.79.1` and `CNAME www 437fad1136826e7c.vercel-dns-017.com.`. Its UI explicitly says the current legacy records still work. DNS was not changed; this recommendation is separate from the origin-transfer quota.

References: [function regions](https://vercel.com/docs/functions/configuring-functions/region), [CDN usage](https://vercel.com/docs/manage-cdn-usage), [bot management](https://vercel.com/docs/bot-management), and [usage notifications](https://vercel.com/docs/notifications).