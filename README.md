# Taller de Corte

Demonstration website in Spanish. Next.js App Router, Tailwind 4, shadcn/ui, Turso and Temporal. No payments, email delivery, sessions or public lookup of bookings.

Configure server variables `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` and `ALLOWED_ORIGINS`. `ALLOWED_ORIGINS` must contain every exact public preview/custom domain origin that may submit bookings. Vercel's deployment and production URLs are automatically recognized. A cross-origin iframe sends the application frame origin, not its parent origin. No wildcard origin is accepted. The exact loopback origins http://127.0.0.1:3100 and http://localhost:3100 are allowed for the independent HTTP verifier. `ENABLE_LOCAL_QA=1` additionally permits port 3000 for local QA; do not enable it on the host.

`npm run dev`, `npm run build`, `npm run start`, `npm run lint`.

Run migrations explicitly with `node --conditions=react-server --import tsx scripts/migrate.ts`. Server initialization also applies them safely on first access. Initialization is atomic with a persistent marker, and seeds only three demonstration services and six availability rules. Existing bookings are never seeded, deleted or modified. Keep `migrations/001.sql` available in the server runtime.

Availability covers today and the next 27 calendar days in Europe/Madrid. Booking creation revalidates persisted service duration, local schedule, future start and overlap inside a SQLite write transaction. Database triggers independently block overlap, including direct inserts and updates. The browser uses a logical-attempt idempotency key for retries and retains only non-personal confirmation data in sessionStorage; Turso is authoritative.

A fictional demonstration brand with local licensed imagery, an interactive craft gallery and a matching visitor reservation route. Photo attribution is in the footer. Design rationale, screenshots and executed QA are in ignored `.evidence/`, with a review copy in `/tmp/constructor-quality`. No deployment or git commit is performed by this implementation.
