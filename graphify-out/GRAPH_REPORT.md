# Graph Report - Aurevo.UI  (2026-08-02)

## Corpus Check
- 362 files · ~813,689 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1742 nodes · 4157 edges · 328 communities (109 shown, 219 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 72 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `846c640f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- admin-variants-page.tsx
- admin-order-detail-page.tsx
- use-cart.ts
- layout.tsx
- services/types.ts
- AdminOrderDetailPage
- admin-images-page.tsx
- compilerOptions
- client.ts
- admin-categories-page.tsx
- test-utils.tsx
- Step 3: Extract Entities and Relationships
- cn
- variant-size-sort.ts
- use-product-query.ts
- use-inventory-mutation.ts
- cart-side-panel.test.tsx
- button.tsx
- bulk-image-upload-dialog.test.tsx
- use-order-mutation.ts
- Order
- admin-orders-page.tsx
- Export Button Disabled When No Records
- components.json
- protected-routes.tsx
- home/index.ts
- use-auth-mutation.ts
- use-product-mutation.ts
- admin-products-page.tsx
- useProduct
- use-toast.ts
- checkout-page.tsx
- @types/node
- Step 1: Ensure graphify Installed
- Step 2: Detect Files
- Aurevo.UI README.md
- promotional-banners.tsx
- Step 5: Label Communities
- use-order-query.ts
- Step 6: Generate Obsidian Vault + HTML
- api.ts
- AI Chat Widget
- Fix 2: Cart Migration Always Failing
- Tech Stack Table
- AdminOrdersPage
- DashboardPage
- fixtures.ts
- devDependencies
- Fix 10: Order Confirmation Page Not Showing Product Names
- use-ai-metrics-query.test.ts
- services/index.ts
- server.ts
- variant-availability.ts
- RECENT_INTEGRATIONS.md
- CI Workflow
- scripts
- auth-context.tsx
- shop-help-pages.tsx
- AuthProvider
- Fix 4: Cart Availability API Firing On Every Page Load
- UserProfile
- admin-routes.tsx
- public-routes.tsx
- dependencies
- Aurevo.UI CLAUDE.md
- use-courier-mutation.ts
- header-product-search.tsx
- category-image-field.tsx
- Courier Tracking (Steadfast)
- class-variance-authority
- Fix 5: Products Page Showing Out of Stock Incorrectly
- Fix 6: Inventory Showing Stock But Products Still Out of Stock
- oauth-success-landing-redirect.tsx
- Fix 7: New Variants Not Appearing In Inventory Admin Page
- compilerOptions
- App.tsx
- Fix 8: Inventory Queries Not Refreshing After Variant Operations
- @eslint/js
- utils.ts
- use-address.ts
- use-user-mutation.ts
- Fix 9: colorCode Validation Rejecting Empty String
- Backend-only Auth (Supabase SDK Removed)
- Saved Addresses & Checkout Autofill
- Image Uploads Not Refreshing Product Image List
- 5 Existing Variants Missing Inventory Rows Backfill
- E2E Tests (Playwright)
- E2E Tests (Playwright, local only)
- Order Invoice PDF Download
- Blob Animation (Hero Background)
- alert.tsx
- error-boundary.tsx
- package.json
- useToast
- terms-page.tsx
- index.html Entry Point
- linkedin-icon.tsx
- vite-env.d.ts
- Auth State Reactivity (useMeQuery)
- embla-carousel-react
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- globals
- @headlessui/react
- @heroicons/react
- i18next
- lodash
- lucide-react
- msw
- next-themes
- @radix-ui/react-alert-dialog
- @radix-ui/react-avatar
- @radix-ui/react-checkbox
- @radix-ui/react-collapsible
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-label
- @radix-ui/react-popover
- @radix-ui/react-radio-group
- @radix-ui/react-select
- @radix-ui/react-separator
- @radix-ui/react-slot
- @radix-ui/react-tabs
- react-i18next
- react-markdown
- react-router-dom
- recharts
- @sentry/react
- sonner
- tailwind-merge
- tailwindcss
- @tailwindcss/vite
- @tanstack/react-query
- @tanstack/react-query-devtools
- @vercel/speed-insights
- postgres
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- @types/lodash
- @types/react
- @types/react-dom
- typescript
- vite
- vitest
- vercel.json
- /graphify Trigger Instruction
- /graphify add and --watch
- graphify.watch module (--watch)
- Extra Exports and Benchmark
- FalkorDB Export (--falkordb/--falkordb-push)
- graphify benchmark
- graphify.serve module (--mcp)
- Neo4j Export (--neo4j/--neo4j-push)
- Wiki Export (--wiki)
- Confidence Score Rubric
- Node ID Format Rule
- Extraction Subagent Prompt Spec
- GitHub Clone and Cross-Repo Merge
- graphify clone
- graphify extract (CLI, monorepo)
- graphify merge-graphs
- graphify claude install/uninstall
- graphify hook install/uninstall/status
- graphify explain CLI
- graphify path CLI
- graphify query CLI
- Query, Path, Explain
- graphify reflect / LESSONS.md
- graphify save-result (work memory)
- Constrained Query Expansion (vocab)
- Transcribe Video and Audio
- GRAPHIFY_WHISPER_PROMPT / Model
- graphify cluster-only
- Incremental Update and Cluster-Only
- GEMINI_API_KEY / GOOGLE_API_KEY
- general-purpose Subagent (Agent tool)
- #479 Shrink-Guard (to_json refusal)
- /graphify command
- Step 0: GitHub Repos and Multi-Path Merge
- Step 2.5: Video and Audio
- Part A: Structural (AST) Extraction
- Part C: Merge AST + Semantic
- Step 4.5: Graph Health Check
- Step 4: Build Graph, Cluster, Analyze
- Step 9: Save Manifest, Update Cost, Cleanup
- Steps 6b-8: Wiki/Neo4j/FalkorDB/SVG/GraphML/MCP/Benchmark
- Aurevo.BE (backend, port 5000)
- Aurevo.UI (frontend, port 5173)
- auth.spec.ts
- authLimiter middleware (Aurevo.BE)
- cart.spec.ts
- checkout-saved-address.spec.ts
- fixtures.ts
- global-setup.ts
- guest-checkout.spec.ts
- Local Supabase Docker
- Mailpit (mail catcher)
- password-reset.spec.ts
- cart-count-debug.ts
- Cart Count Display Logic Fix
- Cart Count Not Showing Bug
- Query Enablement Timing Issue
- Immediate Session ID Initialization Fix
- useCart Hook (debug reference)
- admin-products-page.tsx
- cart.schema.ts (BE)
- cart.service.ts (BE)
- cart-side-panel.tsx
- Fix 1: Cart Showing Blank Name/Price
- Fix 3: guest_session_id Never Cleared After Migration
- inventory.service.ts (BE)
- order-confirmation-page.tsx
- use-cart-mutation.ts (FE)
- use-product-mutation.ts (FE)
- variants.schema.ts (BE)
- variants.service.ts (BE)
- cartQueryKeys (mutation analysis)
- src/services/cart/use-cart-mutation.ts
- src/hooks/use-cart.ts
- useClearCart References Deleted Query Keys Bug
- useClearCart Doesn't Support Guest Users Issue
- cartQueryKeys (query analysis)
- src/services/cart/use-cart-query.ts
- useCartData(userId?, sessionId?)
- useCartItemCount() (unused, removed)
- useCartItems() (unused, removed)
- useCartTotal() (unused, removed)
- Category Navigation - Sleek Pills
- Card-based Features Section
- src/pages/home-page.tsx (premium redesign)
- Newsletter Section
- Modern Circular Pagination
- Premium Interactive Product Cards
- src/services/category/index.ts
- Dynamic Categories Service (from static to DB-backed)
- Hero Section Background Not Visible Fix
- src/pages/home-page.tsx (dynamic categories)
- useCategory(slug)
- Category Filtering Logic
- Sticky Category Navigation Bar
- src/pages/home-page.tsx (products+categories rebuild)
- Smart Pagination
- Product Cards (grid, with sale badge)
- AuthContext (cart migration effect)
- cart-debug.ts
- Context Value Recreation Issue
- GuestCartProvider
- Memoized Guest Cart Context Fix
- Migration Effect Loop Issue
- Migration Tracking Fix (migrationAttempted ref)
- Query Parameter Instability Issue
- Stable Query Parameters Fix
- useCart Hook (query params)
- Auth Service (src/services/auth/)
- Cart Service (src/services/cart/)
- Product Service (src/services/product/)
- Migration From Service Classes To TanStack Query Hooks
- User Service (src/services/user/)
- AdminGuard.tsx
- adminRoutes.tsx (group)
- src/routes/AppRoutes.tsx
- AuthGuard.tsx
- GuestGuard.tsx
- guestRoutes.tsx (group)
- src/routes/paths.ts (APP_PATHS)
- protectedRoutes.tsx (group)
- publicRoutes.tsx (group)
- useRoutes Declarative Nested Routing Pattern
- lib/api.ts (apiDownloadFile)
- app.ts (BE, CORS config)
- /api/auth/me Called On Every Page Bug
- Bulk Create Variants — colorCode Empty String Bug
- Recent Fixes & Changes Log (document)
- Inventory Export Filename Showing download.xlsx Bug
- Local DB Wiped After Docker Restart Recovery
- orders.routes.ts (BE)
- orders.service.ts (BE)
- /api/orders/stats Returned 400 Invalid UUID Bug
- lib/xlsx-export.ts (BE)
- AdminRoutes.tsx (legacy)
- App.tsx (legacy 22-line clean version)
- ProtectedRoutes.tsx (legacy)
- PublicRoutes.tsx (legacy)
- src/components/ui/button.jsx
- components.json
- shadcn/ui Setup
- Frontend Testing — Aurevo.UI (document)
- Vitest + MSW Testing Setup
- tsconfig.json
- src/types/index.ts
- JavaScript to TypeScript Migration

## God Nodes (most connected - your core abstractions)
1. `cn()` - 120 edges
2. `useToast()` - 106 edges
3. `Button()` - 46 edges
4. `APP_PATHS` - 35 edges
5. `useAuth()` - 34 edges
6. `formatPrice()` - 30 edges
7. `useCart()` - 29 edges
8. `server` - 28 edges
9. `Input()` - 27 edges
10. `api` - 25 edges

## Surprising Connections (you probably didn't know these)
- `LCP Hero Image Preload (cover-photo.webp)` --conceptually_related_to--> `Tech Stack Table`  [AMBIGUOUS]
  index.html → README.md
- `Merge Main Back Into Dev Workflow` --semantically_similar_to--> `Commit Hook and CLAUDE.md Integration`  [INFERRED] [semantically similar]
  .github/workflows/merge-back.yml → .claude/skills/graphify/references/hooks.md
- `No Supabase SDK Architecture Decision` --semantically_similar_to--> `Backend-only Auth (Supabase SDK Removed)`  [INFERRED] [semantically similar]
  CLAUDE.md → memory-bank/RECENT_INTEGRATIONS.md
- `i18n (English/Bangla)` --semantically_similar_to--> `i18n English + Bangla`  [INFERRED] [semantically similar]
  CLAUDE.md → memory-bank/RECENT_INTEGRATIONS.md
- `Saved Addresses & Checkout Autofill` --semantically_similar_to--> `Saved Addresses + Checkout Autofill`  [INFERRED] [semantically similar]
  CLAUDE.md → memory-bank/RECENT_INTEGRATIONS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **AI Chat Widget Feature Documented Across Files** — claude_ai_chat_widget_component, claude_chat_stream, readme_ai_chat_widget, memory_bank_recent_integrations_ai_chat_widget [INFERRED 0.85]
- **Backend-Driven Auth Architecture (No Supabase SDK)** — claude_no_supabase_sdk, claude_oauth_redirect_flow, memory_bank_recent_integrations_backend_only_auth, memory_bank_recent_integrations_oauth_success_landing_redirect [INFERRED 0.85]
- **Courier Tracking Feature (Steadfast)** — claude_courier_tracking, claude_tracking_page, claude_admin_order_detail_page, memory_bank_recent_integrations_courier_tracking [INFERRED 0.80]
- **Guest Cart Session Lifecycle Fixes** — memory_bank_cart_count_fix_session_id_initialization_fix, memory_bank_cart_functionality_fixes_fix3_guest_session_id_not_cleared, memory_bank_infinite_api_calls_fix_migration_tracking_fix, memory_bank_cart_mutation_analysis_usemigrateguestcart [INFERRED 0.80]
- **Home Page Redesign Iterations** — memory_bank_home_page_with_products_home_page_tsx, memory_bank_home_page_improvements_home_page_tsx, memory_bank_home_page_design_home_page_tsx [INFERRED 0.85]
- **CI Required Checks Gate** — github_workflows_ci_lint_job, github_workflows_ci_typecheck_job, github_workflows_ci_test_job, github_workflows_ci_build_job, github_workflows_ci_all_green_job [EXTRACTED 1.00]
- **Graphify Extraction Pipeline (AST + Semantic + Merge)** — claude_skills_graphify_skill_step3_part_a_ast, claude_skills_graphify_skill_step3_part_b_semantic, claude_skills_graphify_skill_step3_part_c_merge [EXTRACTED 1.00]
- **E2E Money-Critical Flow Specs** — e2e_readme_guest_checkout_spec, e2e_readme_checkout_saved_address_spec, e2e_readme_cart_spec, e2e_readme_auth_spec, e2e_readme_password_reset_spec [EXTRACTED 1.00]

## Communities (328 total, 219 thin omitted)

### Community 0 - "admin-variants-page.tsx"
Cohesion: 0.25
Nodes (8): ProductCombobox(), ProductComboboxProps, mockUseAdminProducts, PopoverContent, useDebouncedValue(), statusColors, VariantFormData, useAdminProducts()

### Community 1 - "admin-order-detail-page.tsx"
Cohesion: 0.16
Nodes (19): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+11 more)

### Community 2 - "use-cart.ts"
Cohesion: 0.19
Nodes (16): fetchAvailableUnitsCached(), computeCartTotals(), getCartLineUnitPrice(), mockUseToast, useAddToCart(), useCartMutations(), useClearCart(), useMigrateGuestCart() (+8 more)

### Community 3 - "layout.tsx"
Cohesion: 0.06
Nodes (33): AurevoBlack(), AurevoBlackProps, AurevoWhite(), AurevoWhiteProps, EmailIcon(), EmailIconProps, FacebookSquareIcon(), FacebookSquareIconProps (+25 more)

### Community 4 - "services/types.ts"
Cohesion: 0.11
Nodes (19): AddressType, ApiResponse, CourierTrackingEvent, Inventory, Payment, PaymentMethod, Product, ProductImage (+11 more)

### Community 5 - "AdminOrderDetailPage"
Cohesion: 0.25
Nodes (11): addrStr(), AdminOrderDetailPage(), getCustomerDisplayName(), getCustomerPhoneDisplay(), linesFromAddressJson(), nameFromAddressJson(), phoneFromAddressJson(), resolvedShippingDisplay() (+3 more)

### Community 6 - "admin-images-page.tsx"
Cohesion: 0.26
Nodes (12): BulkImageUploadDialogProps, QueuedFile, DialogContent, DialogDescription, DialogFooter(), DialogHeader(), DialogOverlay, DialogTitle (+4 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (29): DOM, DOM.Iterable, e2e, ES2020, node, playwright.config.ts, src, src/components/button-showcase.tsx (+21 more)

### Community 8 - "client.ts"
Cohesion: 0.15
Nodes (29): MetaPixelTracker(), API_URL, CURRENCY_CODE, addToCartDedupe, getFbq(), getMetaPixelId(), getMetaPixelNoscriptImageUrl(), initMetaPixel() (+21 more)

### Community 9 - "admin-categories-page.tsx"
Cohesion: 0.20
Nodes (16): ColorRow, GenerateVariantsDialogProps, slugifyForSku(), Table, TableBody, TableCaption, TableCell, TableFooter (+8 more)

### Community 10 - "test-utils.tsx"
Cohesion: 0.20
Nodes (9): mockUseToast, useCreateProduct(), useDeleteProduct(), AllProviders(), AllProvidersProps, createTestQueryClient(), CustomRenderOptions, renderHookWithQueryClient() (+1 more)

### Community 12 - "cn"
Cohesion: 0.05
Nodes (76): react, react, AdminLayout(), AdminSpaceSwitcher(), spaces, AppSidebar(), data, NavMain() (+68 more)

### Community 13 - "variant-size-sort.ts"
Cohesion: 0.30
Nodes (12): AdminVariantRow, compareSizeLabels(), getFirstVariantForCart(), getUniqueSizesFromVariants(), LETTER_SIZE_RANK, letterSizeRank(), parseSizeSortKey(), sortAdminVariantRows() (+4 more)

### Community 14 - "use-product-query.ts"
Cohesion: 0.16
Nodes (16): COLOR_HINTS, productMatchesPromoColorRole(), PROMOTIONAL_BANNER_PRODUCT_SLUGS, PromotionalBannerColor, withSortedVariants(), AdminImageRow, AdminImagesParams, AdminProductsParams (+8 more)

### Community 15 - "use-inventory-mutation.ts"
Cohesion: 0.08
Nodes (33): PaginationMeta, AdminInventoryPage(), unwrapRelation(), variantProductName(), AddProductParams, CancelOrderInventoryParams, DecreaseStockParams, invalidateInventory() (+25 more)

### Community 16 - "cart-side-panel.test.tsx"
Cohesion: 0.15
Nodes (10): CART_ITEM, mockUseCart, mockUseGuestCart, mockUseProduct, mockUseToast, mockUseVariantsAvailableQuantities, GuestCartContext, GuestCartContextType (+2 more)

### Community 17 - "button.tsx"
Cohesion: 0.15
Nodes (14): FacebookIcon(), FacebookIconProps, GoogleIcon(), GoogleIconProps, Button(), buttonVariants, Checkbox, Input() (+6 more)

### Community 18 - "bulk-image-upload-dialog.test.tsx"
Cohesion: 0.22
Nodes (9): ACCEPTED_MIME_SET, BulkImageUploadDialog(), formatBytes(), newId(), mockUseAdminProducts, mockUseBulkUploadProductImages, mockUseProductVariants, useBulkUploadProductImages() (+1 more)

### Community 19 - "use-order-mutation.ts"
Cohesion: 0.17
Nodes (15): BulkUpdateOrderStatusParams, CheckoutAddress, CreateGuestOrderParams, FULFILLMENT_STATUS_LABELS, normalizeAddress(), ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS, UpdateFulfillmentStatusParams (+7 more)

### Community 20 - "Order"
Cohesion: 0.36
Nodes (5): getOrderCustomerName(), nameFromAddress(), OrderWithUser, OrderWithUser, Order

### Community 21 - "admin-orders-page.tsx"
Cohesion: 0.17
Nodes (12): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, fulfillmentStatusColors (+4 more)

### Community 23 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 24 - "protected-routes.tsx"
Cohesion: 0.22
Nodes (7): AuthGuard(), mockUseAuth, DashboardAddressesPage, DashboardPage, DashboardProfilePage, DashboardWishlistPage, protectedRoutes

### Community 25 - "home/index.ts"
Cohesion: 0.06
Nodes (41): AboutStoreSection(), ContactUsSection(), FullCollectionBanner(), HeroSection(), NewCollectionSection(), NewsletterBanner(), OurShopSection(), SectionHeading() (+33 more)

### Community 26 - "use-auth-mutation.ts"
Cohesion: 0.20
Nodes (17): clearStoredTokens(), storeTokens(), ForgotPasswordPage(), ResetPasswordPage(), mockUseToast, AuthTokenResponse, saveAuthTokens(), useAuthMutations() (+9 more)

### Community 27 - "use-product-mutation.ts"
Cohesion: 0.11
Nodes (27): AdminImagesPage(), ProductFormData, AdminVariantsPage(), BulkCreateVariantItem, BulkCreateVariantsParams, BulkUploadImageItem, BulkUploadProductImagesParams, CreateProductImageParams (+19 more)

### Community 28 - "admin-products-page.tsx"
Cohesion: 0.20
Nodes (13): formatPrice(), FormatPriceOptions, TAKA_SYMBOL, AdminDashboardPage(), AdminProductsPage(), EMPTY_PRODUCT_FORM_DATA, statusColors, variantAvailableUnits() (+5 more)

### Community 29 - "useProduct"
Cohesion: 0.22
Nodes (10): APPAREL_SIZES, EU_SHOE_SIZES, GenerateVariantsDialog(), newColorId(), mockUseAdminProducts, mockUseBulkCreateVariants, mockUseProduct, CartItemSizeSelector() (+2 more)

### Community 30 - "use-toast.ts"
Cohesion: 0.08
Nodes (27): mockUseCart, mockUseProducts, mockUseToast, mockUseWishlistActions, mockUseCart, mockUseProducts, mockUseToast, mockUseWishlistActions (+19 more)

### Community 31 - "checkout-page.tsx"
Cohesion: 0.06
Nodes (48): InfoPageLayout(), InfoPageLayoutProps, NumberStepper(), NumberStepperProps, ProductCard(), ProductCardProps, ProductCardTitle(), ProductVideoPlayer() (+40 more)

### Community 35 - "Aurevo.UI README.md"
Cohesion: 0.15
Nodes (16): Account Dashboard (/dashboard), Admin Panel (/admin), src/lib/api.ts (API Layer), Authentication Feature, Cart Two Stock Sources, Aurevo.UI README.md, Guest Cart Flow, invalidateInventoryQueries (+8 more)

### Community 36 - "promotional-banners.tsx"
Cohesion: 0.24
Nodes (9): BANNER_CONFIG, PROMO_COPY, PromoBannerCard(), PromoBannerCardProps, PromotionalBanners(), mockUseCart, mockUsePromotionalBannerProducts, mockUseToast (+1 more)

### Community 38 - "use-order-query.ts"
Cohesion: 0.21
Nodes (9): AdminOrdersParams, OrderStats, OrderUser, NOTE: `api.get`/`apiFetch` converts every response key from camelCase to, useOrder(), useOrders(), useOrderStats(), OrderItem (+1 more)

### Community 40 - "api.ts"
Cohesion: 0.05
Nodes (59): AiChatbotIcon(), AiChatbotIconProps, AiChatWidget(), ChatMessage, getOrCreateSessionId(), ProductCards(), quickRepliesForAssistant(), api (+51 more)

### Community 41 - "AI Chat Widget"
Cohesion: 0.15
Nodes (14): AI Chat Widget, ai-chat-widget.tsx, Aurevo.BE docs/09-ai-chatbot-rag.md, chat-stream.ts, messenger-chat.tsx Removal, ai-chat-widget.tsx, Aurevo.BE docs/09-ai-chatbot-rag.md, AI Shopping Assistant — Chat Widget (RAG) (+6 more)

### Community 43 - "Tech Stack Table"
Cohesion: 0.14
Nodes (14): pnpm-workspace.yaml allowBuilds config, i18next + react-i18next, Meta Pixel, Observability, Radix UI + Shadcn/ui, React 19.1.1, React Router 7.9.3, Sentry (@sentry/react) (+6 more)

### Community 44 - "AdminOrdersPage"
Cohesion: 0.22
Nodes (10): AdminOrdersPage(), getCustomerPhone(), getOrderLineItems(), lineItemSku(), mockUseToast, useBulkUpdateOrderStatus(), useCancelOrder(), useDeleteOrder() (+2 more)

### Community 45 - "DashboardPage"
Cohesion: 0.24
Nodes (7): formatOrderShippingLine(), DashboardPage(), orderItemsSummary(), statusBadgeClass(), userQueryKeys, useUserOrder(), useUserOrders()

### Community 46 - "fixtures.ts"
Cohesion: 0.14
Nodes (11): GUEST_SHIPPING, PublicOrderDraft, addSavedAddress(), API_URL, extractAuthActionLink(), INBUCKET_URL, loginAs(), registerTestUser() (+3 more)

### Community 47 - "devDependencies"
Cohesion: 0.15
Nodes (13): eslint, jsdom, devDependencies, eslint, jsdom, @playwright/test, tailwindcss-animate, @vitejs/plugin-react (+5 more)

### Community 49 - "use-ai-metrics-query.test.ts"
Cohesion: 0.50
Nodes (3): AdminAiMetricsPage(), AiMetricsData, useAiMetrics()

### Community 50 - "services/index.ts"
Cohesion: 0.23
Nodes (6): CategoryCard, HEX_CLIP, ProductCategorySection(), mockUseCategories, ProductDetailPage(), useCategories()

### Community 51 - "server.ts"
Cohesion: 0.25
Nodes (6): AdminDashboardData, useAdminDashboard(), handlers, server, MockIntersectionObserver, MockResizeObserver

### Community 52 - "variant-availability.ts"
Cohesion: 0.35
Nodes (7): useVariantAvailableQuantity(), useVariantsAvailableQuantities(), AvailabilityRow, computeAvailableUnits(), fetchVariantAvailableQuantity(), fetchVariantsAvailableQuantities(), VariantAvailabilityMap

### Community 53 - "RECENT_INTEGRATIONS.md"
Cohesion: 0.17
Nodes (9): i18n (English/Bangla), ci.yml, Intentionally Dropped Features, Footer Mobile Layout, i18n English + Bangla, language-switcher.tsx, layout.tsx, merge-back.yml (+1 more)

### Community 54 - "CI Workflow"
Cohesion: 0.30
Nodes (12): Commit Hook and CLAUDE.md Integration, All Checks Passed Job, Branch Protection Required Checks, Build Job, CI Workflow, Database / Validate migrations check, Lint Job, pnpm (+4 more)

### Community 55 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, coverage, dev, lint, preview, test, test:e2e (+4 more)

### Community 56 - "auth-context.tsx"
Cohesion: 0.22
Nodes (11): GuestGuard(), mockUseAuth, mockUseSession, AuthContext, AuthProviderProps, AuthUser, StoredSession, useAuth() (+3 more)

### Community 57 - "shop-help-pages.tsx"
Cohesion: 0.24
Nodes (4): formatTrackingDate(), TrackingLookup(), usePublicTracking(), PublicTracking

### Community 58 - "AuthProvider"
Cohesion: 0.47
Nodes (4): AuthProvider(), buildProfileFieldsFromUserMetadata(), pickAvatar(), useClaimGuestOrders()

### Community 60 - "UserProfile"
Cohesion: 0.47
Nodes (4): AuthContextType, getProfileCompletion(), ProfileSegment, UserProfile

### Community 61 - "admin-routes.tsx"
Cohesion: 0.12
Nodes (14): AdminGuard(), mockUseAuth, AdminAiMetricsPage, AdminBrandsPage, AdminCategoriesPage, AdminDashboardPage, AdminImagesPage, AdminImportsPage (+6 more)

### Community 62 - "public-routes.tsx"
Cohesion: 0.11
Nodes (16): EmailConfirmationPage, ForgotPasswordPage, guestRoutes, LoginPage, RegisterPage, ResetPasswordPage, AppRoutes(), AboutPage (+8 more)

### Community 63 - "dependencies"
Cohesion: 0.18
Nodes (11): clsx, cmdk, dependencies, clsx, cmdk, @radix-ui/react-tooltip, react-dom, @vercel/analytics (+3 more)

### Community 64 - "Aurevo.UI CLAUDE.md"
Cohesion: 0.18
Nodes (11): admin-ai-metrics-page.tsx, AI Monitoring Dashboard, alert-dialog.tsx, Delete Confirmation Pattern, Development Workflow, Aurevo.UI CLAUDE.md, GRAPH_REPORT.md, graphify Knowledge Graph (+3 more)

### Community 65 - "use-courier-mutation.ts"
Cohesion: 0.47
Nodes (4): mockUseToast, useRefreshCourierStatus(), useShipOrderWithCourier(), orderQueryKeys

### Community 66 - "header-product-search.tsx"
Cohesion: 0.21
Nodes (11): HeaderProductSearch(), HeaderProductSearchProps, pickSuggestionImage(), mockNavigate, mockUseSearchProducts, withSortedVariantsOnProducts(), ProductsPage(), buildProductsUrl() (+3 more)

### Community 68 - "Courier Tracking (Steadfast)"
Cohesion: 0.20
Nodes (10): admin-order-detail-page.tsx, Courier Tracking (Steadfast), TrackingPage (shop-help-pages.tsx), usePublicTracking, useShipOrderWithCourier, admin-order-detail-page.tsx, Courier Tracking (Steadfast), TrackingPage (shop-help-pages.tsx) (+2 more)

### Community 72 - "oauth-success-landing-redirect.tsx"
Cohesion: 0.38
Nodes (5): OAuthSuccessLandingRedirect(), OAuthTokens, consumeOAuthLoginPending(), markOAuthLoginPending(), peekOAuthLoginPending()

### Community 74 - "compilerOptions"
Cohesion: 0.22
Nodes (8): vite.config.ts, compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, include

### Community 75 - "App.tsx"
Cohesion: 0.06
Nodes (25): App(), ErrorBoundary, ErrorBoundaryProps, ErrorBoundaryState, LanguageSwitcher(), OAuthErrorRouteHandler(), SpeedInsightsTracker(), Toaster() (+17 more)

### Community 78 - "utils.ts"
Cohesion: 0.27
Nodes (9): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, RANGES, statusColors (+1 more)

### Community 79 - "use-address.ts"
Cohesion: 0.35
Nodes (9): DashboardAddressesPage(), ADDRESS, AddressInput, addressQueryKeys, useAddresses(), useCreateAddress(), useDeleteAddress(), UserAddress (+1 more)

### Community 80 - "use-user-mutation.ts"
Cohesion: 0.57
Nodes (5): useCreateUserProfile(), useDeleteAvatar(), useUpdateUserProfile(), useUploadAvatar(), useUserMutations()

### Community 82 - "Backend-only Auth (Supabase SDK Removed)"
Cohesion: 0.25
Nodes (8): No Supabase SDK Architecture Decision, OAuth Redirect Flow, OAuthSuccessLandingRedirect, useSignInWithOAuth, src/lib/api.ts, src/contexts/auth-context.tsx, Backend-only Auth (Supabase SDK Removed), oauth-success-landing-redirect.tsx

### Community 83 - "Saved Addresses & Checkout Autofill"
Cohesion: 0.25
Nodes (8): Radix Select Empty-String onValueChange Guard, Saved Address Default Toggle Layout Guard, Saved Addresses & Checkout Autofill, use-address.ts, checkout-page.tsx, dashboard-addresses-page.tsx, Saved Addresses + Checkout Autofill, use-address.ts

### Community 87 - "E2E Tests (Playwright)"
Cohesion: 0.29
Nodes (7): cartLimiter Rate Limit Interaction, e2e/global-setup.ts, E2E Tests (Playwright), .github/workflows/ci.yml, E2E Tests (Playwright), .github/workflows/merge-back.yml, Testing (Vitest/MSW)

### Community 93 - "Order Invoice PDF Download"
Cohesion: 0.33
Nodes (6): apiDownloadFile, Order Invoice Download, Aurevo.BE src/lib/email.ts, Aurevo.BE src/lib/invoice-pdf.ts, order-confirmation-page.tsx, Order Invoice PDF Download

### Community 100 - "alert.tsx"
Cohesion: 0.53
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 101 - "error-boundary.tsx"
Cohesion: 0.50
Nodes (5): error-boundary.tsx, Sentry Integration, error-boundary.tsx, Observability — Sentry + Error Boundary, src/lib/sentry.ts

### Community 104 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 118 - "useToast"
Cohesion: 0.31
Nodes (11): useToast(), AdminCategoriesPage(), compareCategoriesBySort(), mockUseToast, buildCategoryFormData(), CreateCategoryParams, UpdateCategoryParams, useBulkUpdateCategoryStatus() (+3 more)

### Community 122 - "index.html Entry Point"
Cohesion: 0.67
Nodes (3): index.html Entry Point, Async Inter Font Loading (media=print trick), LCP Hero Image Preload (cover-photo.webp)

## Ambiguous Edges - Review These
- `LCP Hero Image Preload (cover-photo.webp)` → `Tech Stack Table`  [AMBIGUOUS]
  index.html · relation: conceptually_related_to

## Knowledge Gaps
- **613 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+608 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **219 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `LCP Hero Image Preload (cover-photo.webp)` and `Tech Stack Table`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `dependencies` connect `dependencies` to `embla-carousel-react`, `cn`, `@headlessui/react`, `@heroicons/react`, `i18next`, `lodash`, `lucide-react`, `next-themes`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-label`, `@radix-ui/react-popover`, `@radix-ui/react-radio-group`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-tabs`, `react-i18next`, `react-markdown`, `react-router-dom`, `recharts`, `@sentry/react`, `sonner`, `tailwind-merge`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tanstack/react-query-devtools`, `@vercel/speed-insights`, `class-variance-authority`, `package.json`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `react` connect `cn` to `home/index.ts`, `dependencies`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `admin-variants-page.tsx`, `admin-order-detail-page.tsx`, `AdminOrderDetailPage`, `admin-images-page.tsx`, `admin-categories-page.tsx`, `button.tsx`, `bulk-image-upload-dialog.test.tsx`, `admin-orders-page.tsx`, `home/index.ts`, `admin-products-page.tsx`, `useProduct`, `checkout-page.tsx`, `api.ts`, `AdminOrdersPage`, `DashboardPage`, `use-ai-metrics-query.test.ts`, `category-image-field.tsx`, `App.tsx`, `utils.ts`, `alert.tsx`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Are the 13 inferred relationships involving `useToast()` (e.g. with `new-collection-section.test.tsx` and `our-shop-section.test.tsx`) actually correct?**
  _`useToast()` has 13 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _613 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06475485661424607 - nodes in this community are weakly interconnected._