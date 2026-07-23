# Recent Integrations — Aurevo.UI

Summary of major features and architecture changes integrated into the frontend. For day-to-day bug fixes, see [RECENT_FIXES.md](RECENT_FIXES.md).

---

## Backend-only auth (Supabase SDK removed)

**What changed:** `@supabase/supabase-js` was removed from the frontend. Email/password and OAuth all go through Aurevo.BE.

| Flow             | Endpoints                                                       |
| ---------------- | --------------------------------------------------------------- |
| Login / register | `POST /auth/login`, `POST /auth/register`                       |
| Session          | `GET /auth/me`                                                  |
| Refresh          | `POST /auth/refresh` (auto on 401 in `src/lib/api.ts`)          |
| Logout           | `POST /auth/logout` + clear local tokens                        |
| OAuth start      | `GET /auth/oauth/url?provider=google\|facebook`                 |
| OAuth redeem     | `GET /auth/oauth/session?code=…` after `/?oauth_code=…` landing |

**Key files:** `src/lib/api.ts`, `src/contexts/auth-context.tsx`, `src/services/auth/`, `src/components/oauth-success-landing-redirect.tsx`

**Optional:** `VITE_SUPABASE_URL` + `VITE_USE_SUPABASE_IMAGE_TRANSFORM` still exist only for storage image-transform URL rewriting — not for auth.

---

## i18n — English + Bangla

**What changed:** Full UI string localization with i18next.

- Locales: `src/i18n/locales/en.json`, `bn.json`
- Default: **English** (persisted override via `localStorage` key `aurevo_language`)
- Switcher in the header: `src/components/language-switcher.tsx`
- Coverage includes nav, home, footer, cart, account dashboard, and common UI

---

## Saved addresses + checkout autofill

**What changed:** Customers can manage delivery addresses in the dashboard; checkout can pick a saved address to fill the form.

| Piece           | Location                                               |
| --------------- | ------------------------------------------------------ |
| Route           | `/dashboard/addresses`                                 |
| Page            | `src/pages/dashboard-addresses-page.tsx`               |
| API hooks       | `src/services/user/use-address.ts` → `/auth/addresses` |
| Checkout picker | `src/pages/checkout-page.tsx`                          |
| Location type   | Home / Office / Pick Up                                |
| Geo helpers     | Bangladesh district / upazila lists                    |

---

## Observability — Sentry + Error Boundary

**What changed:** Production-ready error reporting and a user-facing recovery screen.

| Piece          | Location                                                       |
| -------------- | -------------------------------------------------------------- |
| Sentry init    | `src/lib/sentry.ts` (no-op unless `VITE_SENTRY_DSN` is set)    |
| Session Replay | 10% of sessions, 100% of error sessions                        |
| Error Boundary | `src/components/error-boundary.tsx` wraps the app in `App.tsx` |

---

## CI / merge workflow

| Workflow                           | Role                                                                              |
| ---------------------------------- | --------------------------------------------------------------------------------- |
| `.github/workflows/ci.yml`         | Lint → typecheck → unit tests → build on PRs to `main`/`dev` and pushes to `main` |
| `.github/workflows/merge-back.yml` | After every merge to `main`, auto-merge `main` back into `dev`                    |

---

## Footer (mobile layout)

- Category and About Shop render **side by side** on mobile (`grid-cols-2` + `sm:contents`)
- Fast Delivery link removed from About Shop
- File: `src/components/layout.tsx`

---

## AI shopping assistant — chat widget (RAG)

**What changed:** A floating AI chat widget was added, backed by Aurevo.BE's RAG chatbot pipeline (Claude + Voyage AI embeddings + pgvector). Replaced the old floating Facebook Messenger deep-link chat button (`messenger-chat.tsx`, removed) — the static footer Messenger icon link is unrelated and still there.

| Piece         | Location                                                        |
| ------------- | ---------------------------------------------------------------- |
| Widget        | `src/components/ai-chat-widget.tsx`                               |
| SSE parsing   | `src/lib/chat-stream.ts` (hand-rolled over `fetch` `ReadableStream` — `EventSource` doesn't support POST bodies) |
| Endpoint      | `POST /api/chat` (SSE stream)                                     |
| Backend docs  | `Aurevo.BE`'s [`docs/09-ai-chatbot-rag.md`](../../Aurevo.BE/docs/09-ai-chatbot-rag.md) |
| Assistant markdown | `react-markdown`                                              |

---

## Order invoice PDF download

**What changed:** After checkout, customers can download a PDF invoice from the confirmation page (and receive the same PDF attached to the Resend confirmation email from the BE).

| Piece | Location |
| ----- | -------- |
| Confirmation UI | `src/pages/order-confirmation-page.tsx` — Download invoice link |
| Endpoint | `GET /orders/by-number/:orderNumber/invoice` (`?guestToken=` for guests) |
| Tests | `src/pages/__tests__/order-confirmation-page.test.tsx` |
| Backend | `Aurevo.BE` `src/lib/invoice-pdf.ts` + `src/lib/email.ts` |

Guest downloads use a direct URL (not `apiDownloadFile`) so the guest token can be passed in the query string.

---

## Courier tracking (Steadfast)

**What changed:** Public parcel lookup and admin consignment booking against Aurevo.BE's Steadfast integration.

| Piece | Location |
| ----- | -------- |
| Public page | `/tracking` — `TrackingPage` in `src/pages/shop-help-pages.tsx` |
| Public hook | `src/services/courier/use-courier-query.ts` → `GET /courier/track/:code` |
| Admin ship / refresh | `src/services/courier/use-courier-mutation.ts` |
| Admin UI | `src/pages/admin/admin-order-detail-page.tsx` — Ship with Steadfast |
| Types | `PublicTracking`, `CourierTrackingEvent` in `src/services/types.ts` |
| Tests | `tracking-lookup.test.tsx`, courier query/mutation tests under `src/services/courier/__tests__/` |

Booking is an explicit admin click only (never automatic) — the BE books a real Steadfast consignment that commits COD/delivery charges.

---

## Bulk product import admin UI

**What changed:** `/admin/imports` — download the spreadsheet template, drag-and-drop upload a `.xlsx`/`.csv`/`.json`/`.ndjson` batch, watch it process live, retry failed rows.

| Piece | Location |
| ----- | -------- |
| Page | `src/pages/admin/admin-imports-page.tsx` |
| Hooks | `src/services/imports/` — `useUploadImport`, `useDownloadTemplate` (via `apiDownloadFile`), `useImportJobs`, `useImportJob` (polling), `useImportRows`, `useRetryImportJob` |
| Route + nav | `src/routes/admin-routes.tsx`, `src/components/admin/app-sidebar.tsx` ("Bulk Import"), `src/constants/app-paths.ts` |
| Backend | `Aurevo.BE` — full architecture in [`docs/10-bulk-import-pipeline.md`](../../Aurevo.BE/docs/10-bulk-import-pipeline.md) |

`useImportJob(jobId)` is this codebase's first use of TanStack Query's `refetchInterval` — it polls every 2s and stops once the job reaches a terminal status (`completed`/`partial`/`failed`). The progress bar is a manual `<div style={{width}}>` (same idiom as `admin-ai-metrics-page.tsx`'s tool-usage bars) since there's no shadcn `Progress` component in this project yet.

A standalone scraper package (`Aurevo/scraper`, sibling to both repos, its own git history) can also POST batches straight to the same `/admin/imports` endpoint the dropzone uses — see the backend doc for how it's guarded (robots.txt check, rate limiting, catalog-reads-only).

---

## What was intentionally dropped from older docs

These appeared in earlier README drafts but are **not** in the current codebase:

- Wishlist / saved-items product feature
- Dedicated `/cart` page (cart is the side panel only)
- Direct Supabase client auth / OAuth in the browser
