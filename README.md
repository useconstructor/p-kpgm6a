# Taller de Corte

Demonstration website in Spanish. Next.js App Router, Tailwind 4, shadcn/ui, Turso and Temporal. No payments, email delivery, sessions or public lookup of bookings.

Configure server variables `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` and `ALLOWED_ORIGINS`. `ALLOWED_ORIGINS` must contain every exact public preview/custom domain origin that may submit bookings. Vercel's deployment and production URLs are automatically recognized. A cross-origin iframe sends the application frame origin, not its parent origin. No wildcard origin is accepted. The exact loopback origins http://127.0.0.1:3100 and http://localhost:3100 are allowed for the independent HTTP verifier. `ENABLE_LOCAL_QA=1` additionally permits port 3000 for local QA; do not enable it on the host.

`npm run dev`, `npm run build`, `npm run start`, `npm run lint`.

Run migrations explicitly with `node --conditions=react-server --import tsx scripts/migrate.ts`. Server initialization also applies them safely on first access. Initialization is atomic with a persistent marker, and seeds only three demonstration services and six availability rules. Existing bookings are never seeded, deleted or modified. Keep `migrations/001.sql` available in the server runtime.

Availability covers today and the next 27 calendar days in Europe/Madrid. Booking creation revalidates persisted service duration, local schedule, future start and overlap inside a SQLite write transaction. Database triggers independently block overlap, including direct inserts and updates. The browser uses a logical-attempt idempotency key for retries and retains only non-personal confirmation data in sessionStorage; Turso is authoritative.

A fictional demonstration brand with local licensed imagery, an interactive craft gallery and a matching visitor reservation route. Photo attribution is in the footer. Design rationale, screenshots and executed QA are in ignored `.evidence/`, with a review copy in `/tmp/constructor-quality`. No deployment or git commit is performed by this implementation.

The approved redesign uses Six Caps display lettering, Barlow Condensed service/action type and Source Sans 3 body text, with licenses stored alongside local font files. Six clean illustrative portraits are cropped from the user-authorized reference; all controls and paper geometry are HTML/CSS. The reservation route opens on the earliest date with real service availability inside the 28-day window. Active service IDs and all booking protections remain unchanged.

Latest correction: detailed authorized photographic masters now supply the complete left-side vintage chair and continuous wood/tools/folded-fabric invitation scene. Anton supplies the heavier narrow hero cut while Six Caps retains slender mastheads. Known summary values stay full-opacity during service changes; morning/afternoon disclosures report actual server slot counts and retain selected-time feedback.

The reproducible primary-flow verifier exports `verify({browser,baseUrl,evidenceDir})` at `/tmp/constructor-quality/verify-interactions.cjs`. It runs against the supplied HTTP server at port 3100 using the existing Turso connection. Required prerequisites include live morning/afternoon availability and overlapping service durations; missing prerequisites fail verification rather than skip a scenario. It creates three labelled fictitious QA bookings, preserves all existing rows, and never sends messages or payments. HTTPS-only integration and actual Constructor iframe checks remain in a separate pending array until those deployed environments exist.
