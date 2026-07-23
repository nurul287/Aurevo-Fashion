# Recent Fixes & Changes Log

Running log of significant bugs fixed and features added across Aurevo.UI + Aurevo.BE.

For a higher-level summary of major integrations (backend auth, i18n, addresses, Sentry, CI), see [RECENT_INTEGRATIONS.md](RECENT_INTEGRATIONS.md).

---

## Orders

### `/api/orders/stats` returned 400 Invalid UUID

**Cause:** The `/stats` route was registered after `/:id`, so Express matched "stats" as a UUID and the Zod `.uuid()` validator rejected it.
**Fix (BE `orders.routes.ts`):** Moved `router.get("/stats", ...)` above `router.get("/:id", ...)`.

### Orders pagination + search

**Added (BE):** `getOrders` now accepts `page`, `limit`, `search` query params. Search uses `ilike` on order number, shipping name, phone, and email. Returns `meta.pagination`.
**Added (FE):** Admin orders page uses server-side pagination with debounced search input.

### Order line items — product names

**Added (BE `orders.service.ts`):** `createOrder` now fetches product names and resolves `effectivePrice = variant.price ?? product.basePrice`. Each `orderItems` row stores `productName`, `variantName`, `sku`, `unitPrice`, `totalPrice`.
**Added (BE):** `fetchOrderItemsWithImages` joins product images so `getOrderById`/`getOrderByNumber` returns `items[].imageUrl`.

### Guest order claim on login

**Added (BE `orders.service.ts`):** `claimGuestOrders(userId, email, phone?, sessionId?)` bulk-assigns matching guest orders on sign-in using three strategies: session ID → email → phone.

---

## Inventory

### Inventory export — filename showing "download.xlsx"

**Cause:** `Content-Disposition` header was not in CORS `exposedHeaders`, so `response.headers.get("Content-Disposition")` returned `null` in the browser.
**Fix (BE `app.ts`):** Added `exposedHeaders: ["Content-Disposition"]` to CORS config.

### Server-side XLSX export

**Added (BE):** `GET /api/inventory/export` builds an .xlsx buffer entirely on the server using `lib/xlsx-export.ts` and streams it with proper `Content-Disposition`.
**Added (FE `lib/api.ts`):** `apiDownloadFile(path)` fetches binary response, reads filename from header, and triggers browser download via an `<a>` tag.

### Inventory pagination

**Added:** Inventory levels, low-stock, and movements all have server-side pagination with debounced search.

### Export button disabled when no records

**Added (FE):** Export button is disabled when the current filtered result set is empty.

---

## Variants

### Bulk create variants — colorCode empty string

**Cause:** `z.string().regex(...).optional()` treats `""` as a non-undefined string that fails the hex regex.
**Fix:** Added `optionalHexColor` preprocess helper that converts `""` → `undefined` before the regex check. Applied to `createVariantSchema`, `updateVariantSchema`, `bulkCreateVariantsSchema`.

### Image uploads not refreshing product image list

**Fix (FE `use-product-mutation.ts`):** `useBulkUploadProductImages.onSuccess` now invalidates `["admin", "images", productId]`.

---

## Auth / Profile

### `/api/auth/me` called on every page (not just protected routes)

**Context:** Checkout page was fetching categories, cart, and `/me` even for guests.
**Fix (FE):** `/me` is only called when `useAuth` is used in a component that requires auth. Guest checkout skips the profile fetch.

### Real admins showing as normal users after login

**Cause:** `useAuth`'s `isAdmin` checked `profile.preferences.role` — the `profiles` table has no `role` column at all, and nothing on the BE ever wrote a role into its free-form `preferences` JSONB blob. The real role only ever lived in the Supabase Auth JWT's `app_metadata.role`, which the BE's `authenticate` middleware already resolves onto `req.user.role` for every admin-gated endpoint — it just never made it into the `GET /auth/me` response body. A real admin passed every BE authorization check and could still see the FE render them as a normal user (hidden admin nav, `AdminGuard` redirect).
**Fix (BE `auth.controller.ts`):** `getMe` now merges `role: req.user!.role` onto the response.
**Fix (FE `use-auth-query.ts`, `services/types.ts`):** `isAdmin` reads the new top-level `UserProfile.role` instead of `preferences.role` (which has been removed from the type — nothing else referenced it).
**Verified:** logged in as the local admin fixture, confirmed `GET /auth/me` returns `role: "admin"` and `/admin` loads the dashboard instead of redirecting.

---

## Database

### Local DB wiped (all rows gone after Supabase Docker restart)

**Cause:** Volume data was not persisted across Docker restart.
**Recovery:** `pnpm run db:seed` (had a port typo: `55322` → `54322` fixed in `package.json`).

### 5 existing variants missing inventory rows (backfill)

After fixing `createVariant` to always insert inventory, existing variants created before the fix had no `inventory` rows. Backfilled via direct SQL.
