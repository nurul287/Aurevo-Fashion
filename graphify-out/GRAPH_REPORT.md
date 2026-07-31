# Graph Report - Aurevo.UI  (2026-08-01)

## Corpus Check
- 360 files · ~811,825 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1726 nodes · 4132 edges · 332 communities (113 shown, 219 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 72 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `50b5ef09`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- admin-variants-page.tsx
- admin-order-detail-page.tsx
- use-inventory-mutation.ts
- layout.tsx
- services/types.ts
- AdminOrderDetailPage
- use-brand-mutation.ts
- compilerOptions
- client.ts
- admin-products-page.tsx
- use-toast.ts
- Step 3: Extract Entities and Relationships
- sidebar.tsx
- cn
- use-product-query.ts
- use-inventory-query.ts
- use-imports-queries.ts
- input.tsx
- useProduct
- use-order-mutation.ts
- Order
- admin-orders-page.tsx
- Export Button Disabled When No Records
- components.json
- SidebarProvider
- home/index.ts
- use-auth-mutation.ts
- use-product-mutation.ts
- useToast
- admin-inventory-page.tsx
- use-wishlist.ts
- checkout-page.tsx
- @types/node
- Step 1: Ensure graphify Installed
- Step 2: Detect Files
- Aurevo.UI README.md
- product-detail-page.tsx
- Step 5: Label Communities
- use-order-query.ts
- Step 6: Generate Obsidian Vault + HTML
- api.ts
- AI Chat Widget
- Fix 2: Cart Migration Always Failing
- Tech Stack Table
- nav-main.tsx
- DashboardPage
- fixtures.ts
- devDependencies
- Fix 10: Order Confirmation Page Not Showing Product Names
- api
- services/index.ts
- sheet.tsx
- variant-availability.ts
- RECENT_INTEGRATIONS.md
- CI Workflow
- scripts
- use-auth-query.ts
- shop-help-pages.tsx
- auth-context.tsx
- Fix 4: Cart Availability API Firing On Every Page Load
- upload-category-image.ts
- useAuth
- public-routes.tsx
- dependencies
- Aurevo.UI CLAUDE.md
- formatPrice
- Courier Tracking (Steadfast)
- Fix 5: Products Page Showing Out of Stock Incorrectly
- Fix 6: Inventory Showing Stock But Products Still Out of Stock
- oauth-success-landing-redirect.tsx
- Fix 7: New Variants Not Appearing In Inventory Admin Page
- compilerOptions
- App.tsx
- Fix 8: Inventory Queries Not Refreshing After Variant Operations
- product-card.tsx
- button.tsx
- use-address.ts
- use-user-mutation.ts
- Fix 9: colorCode Validation Rejecting Empty String
- Backend-only Auth (Supabase SDK Removed)
- Saved Addresses & Checkout Autofill
- new-collection-section.test.tsx
- Image Uploads Not Refreshing Product Image List
- 5 Existing Variants Missing Inventory Rows Backfill
- E2E Tests (Playwright)
- E2E Tests (Playwright, local only)
- NumberStepper.tsx
- loading-spinner.tsx
- Order Invoice PDF Download
- Blob Animation (Hero Background)
- alert.tsx
- error-boundary.tsx
- package.json
- nav-user.tsx
- ProductVideoPlayer.tsx
- use-category-mutation.ts
- terms-page.tsx
- index.html Entry Point
- linkedin-icon.tsx
- vite-env.d.ts
- Auth State Reactivity (useMeQuery)
- cmdk
- embla-carousel-react
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- globals
- @headlessui/react
- @heroicons/react
- i18next
- jsdom
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

## Communities (332 total, 219 thin omitted)

### Community 0 - "admin-variants-page.tsx"
Cohesion: 0.12
Nodes (23): ACCEPTED_MIME_SET, BulkImageUploadDialog(), BulkImageUploadDialogProps, formatBytes(), newId(), QueuedFile, ProductCombobox(), ProductComboboxProps (+15 more)

### Community 1 - "admin-order-detail-page.tsx"
Cohesion: 0.15
Nodes (24): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+16 more)

### Community 2 - "use-inventory-mutation.ts"
Cohesion: 0.17
Nodes (17): AddProductParams, CancelOrderInventoryParams, DecreaseStockParams, invalidateInventory(), InventoryUpdateProductParams, ReserveStockParams, resolveInventoryId(), RestockParams (+9 more)

### Community 3 - "layout.tsx"
Cohesion: 0.05
Nodes (42): AurevoBlack(), AurevoBlackProps, AurevoWhite(), AurevoWhiteProps, EmailIcon(), EmailIconProps, FacebookSquareIcon(), FacebookSquareIconProps (+34 more)

### Community 4 - "services/types.ts"
Cohesion: 0.12
Nodes (15): AddressType, ApiResponse, CourierTrackingEvent, Inventory, Payment, PaymentMethod, ProductImage, ProductReview (+7 more)

### Community 5 - "AdminOrderDetailPage"
Cohesion: 0.12
Nodes (22): addrStr(), AdminOrderDetailPage(), getCustomerDisplayName(), getCustomerPhoneDisplay(), linesFromAddressJson(), nameFromAddressJson(), phoneFromAddressJson(), resolvedShippingDisplay() (+14 more)

### Community 6 - "use-brand-mutation.ts"
Cohesion: 0.24
Nodes (10): AdminBrandsPage(), buildBrandFormData(), CreateBrandParams, UpdateBrandParams, useBulkUpdateBrandStatus(), useCreateBrand(), useDeleteBrand(), useUpdateBrand() (+2 more)

### Community 7 - "compilerOptions"
Cohesion: 0.07
Nodes (29): DOM, DOM.Iterable, e2e, ES2020, node, playwright.config.ts, src, src/components/button-showcase.tsx (+21 more)

### Community 8 - "client.ts"
Cohesion: 0.10
Nodes (41): MetaPixelTracker(), CURRENCY_CODE, addToCartDedupe, getFbq(), getMetaPixelId(), getMetaPixelNoscriptImageUrl(), initMetaPixel(), injectOfficialPixelBootstrap() (+33 more)

### Community 9 - "admin-products-page.tsx"
Cohesion: 0.19
Nodes (17): Badge(), BadgeProps, badgeVariants, Table, TableBody, TableCaption, TableCell, TableFooter (+9 more)

### Community 10 - "use-toast.ts"
Cohesion: 0.11
Nodes (17): mockUseToast, mockUseToast, mockUseToast, mockUseToast, mockUseToast, mockUseToast, mockUseToast, handlers (+9 more)

### Community 12 - "sidebar.tsx"
Cohesion: 0.10
Nodes (24): AppSidebar(), data, mockUseAuth, Separator(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps (+16 more)

### Community 13 - "cn"
Cohesion: 0.17
Nodes (20): AdminSpaceSwitcher(), spaces, DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem() (+12 more)

### Community 14 - "use-product-query.ts"
Cohesion: 0.08
Nodes (44): BANNER_CONFIG, PROMO_COPY, PromoBannerCard(), PromoBannerCardProps, PromotionalBanners(), mockUseCart, mockUsePromotionalBannerProducts, mockUseToast (+36 more)

### Community 15 - "use-inventory-query.ts"
Cohesion: 0.12
Nodes (16): PaginationMeta, AdminInventoryPage(), unwrapRelation(), variantProductName(), useDecreaseStock(), computeInventoryStats(), InventoryLevelsResult, InventoryMovement (+8 more)

### Community 16 - "use-imports-queries.ts"
Cohesion: 0.19
Nodes (14): ACCEPTED_EXTENSIONS, AdminImportsPage(), ImportJob, ImportJobStatus, ImportRejection, ImportRow, ImportRowStatus, TERMINAL_JOB_STATUSES (+6 more)

### Community 17 - "input.tsx"
Cohesion: 0.19
Nodes (11): FacebookIcon(), FacebookIconProps, GoogleIcon(), GoogleIconProps, Input(), Label, labelVariants, Textarea (+3 more)

### Community 18 - "useProduct"
Cohesion: 0.40
Nodes (4): CartItemSizeSelector(), getProductHeroImageUrl(), ProductDetailPage(), useProduct()

### Community 19 - "use-order-mutation.ts"
Cohesion: 0.17
Nodes (15): BulkUpdateOrderStatusParams, CheckoutAddress, CreateGuestOrderParams, FULFILLMENT_STATUS_LABELS, normalizeAddress(), ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS, UpdateFulfillmentStatusParams (+7 more)

### Community 20 - "Order"
Cohesion: 0.23
Nodes (8): getOrderCustomerName(), nameFromAddress(), OrderWithUser, OrderWithUser, AdminDashboardPage(), AdminDashboardData, useAdminDashboard(), Order

### Community 21 - "admin-orders-page.tsx"
Cohesion: 0.17
Nodes (12): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, fulfillmentStatusColors (+4 more)

### Community 23 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 24 - "SidebarProvider"
Cohesion: 0.18
Nodes (9): react, react, NavProjects(), TeamSwitcher(), PROJECTS, TEAMS, SidebarMenuSkeleton(), SidebarProvider() (+1 more)

### Community 25 - "home/index.ts"
Cohesion: 0.05
Nodes (44): AboutStoreSection(), ContactUsSection(), FullCollectionBanner(), HeroSection(), NewCollectionSection(), NewsletterBanner(), OurShopSection(), SectionHeading() (+36 more)

### Community 26 - "use-auth-mutation.ts"
Cohesion: 0.25
Nodes (15): clearStoredTokens(), storeTokens(), ForgotPasswordPage(), ResetPasswordPage(), AuthTokenResponse, saveAuthTokens(), useAuthMutations(), usePasswordReset() (+7 more)

### Community 27 - "use-product-mutation.ts"
Cohesion: 0.11
Nodes (24): mockUseAdminProducts, mockUseBulkCreateVariants, mockUseProduct, ProductFormData, AdminVariantsPage(), BulkCreateVariantItem, BulkCreateVariantsParams, BulkUploadImageItem (+16 more)

### Community 28 - "useToast"
Cohesion: 0.23
Nodes (14): useToast(), AdminImagesPage(), AdminProductsPage(), variantAvailableUnits(), useBulkDeleteImages(), useBulkDeleteProducts(), useBulkUpdateProductStatus(), useCreateProduct() (+6 more)

### Community 29 - "admin-inventory-page.tsx"
Cohesion: 0.19
Nodes (12): APPAREL_SIZES, ColorRow, EU_SHOE_SIZES, GenerateVariantsDialog(), GenerateVariantsDialogProps, newColorId(), slugifyForSku(), TabsContent (+4 more)

### Community 30 - "use-wishlist.ts"
Cohesion: 0.13
Nodes (19): baseProduct, mockUseCart, mockUseToast, mockUseWishlistActions, useWishlistActions(), DashboardWishlistPage(), mockUseToast, useAddToWishlist() (+11 more)

### Community 31 - "checkout-page.tsx"
Cohesion: 0.13
Nodes (17): DropDownList(), DropDownListOption, DropDownListProps, RadioGroup, RadioGroupItem, OPTIONS, BANGLADESH_DISTRICTS, BANGLADESH_UPAZILAS (+9 more)

### Community 35 - "Aurevo.UI README.md"
Cohesion: 0.15
Nodes (16): Account Dashboard (/dashboard), Admin Panel (/admin), src/lib/api.ts (API Layer), Authentication Feature, Cart Two Stock Sources, Aurevo.UI README.md, Guest Cart Flow, invalidateInventoryQueries (+8 more)

### Community 36 - "product-detail-page.tsx"
Cohesion: 0.30
Nodes (12): InfoPageLayout(), InfoPageLayoutProps, ProductCard(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList() (+4 more)

### Community 38 - "use-order-query.ts"
Cohesion: 0.17
Nodes (10): useRefreshCourierStatus(), useShipOrderWithCourier(), AdminOrdersParams, orderQueryKeys, OrderStats, OrderUser, NOTE: `api.get`/`apiFetch` converts every response key from camelCase to, useOrder() (+2 more)

### Community 40 - "api.ts"
Cohesion: 0.19
Nodes (19): API_URL, apiDownloadFile(), ApiError, apiFetch(), apiFetchForm(), apiFetchList(), ApiListResult, buildError() (+11 more)

### Community 41 - "AI Chat Widget"
Cohesion: 0.15
Nodes (14): AI Chat Widget, ai-chat-widget.tsx, Aurevo.BE docs/09-ai-chatbot-rag.md, chat-stream.ts, messenger-chat.tsx Removal, ai-chat-widget.tsx, Aurevo.BE docs/09-ai-chatbot-rag.md, AI Shopping Assistant — Chat Widget (RAG) (+6 more)

### Community 43 - "Tech Stack Table"
Cohesion: 0.14
Nodes (14): pnpm-workspace.yaml allowBuilds config, i18next + react-i18next, Meta Pixel, Observability, Radix UI + Shadcn/ui, React 19.1.1, React Router 7.9.3, Sentry (@sentry/react) (+6 more)

### Community 44 - "nav-main.tsx"
Cohesion: 0.36
Nodes (6): NavMain(), ITEMS, Collapsible(), CollapsibleContent(), CollapsibleTrigger(), SidebarMenuSub()

### Community 45 - "DashboardPage"
Cohesion: 0.21
Nodes (8): AuthContextType, formatOrderShippingLine(), getProfileCompletion(), ProfileSegment, DashboardPage(), orderItemsSummary(), statusBadgeClass(), UserProfile

### Community 46 - "fixtures.ts"
Cohesion: 0.24
Nodes (9): addSavedAddress(), API_URL, extractAuthActionLink(), INBUCKET_URL, loginAs(), registerTestUser(), seedProductAndVariant(), TEST_ADDRESS (+1 more)

### Community 47 - "devDependencies"
Cohesion: 0.15
Nodes (13): eslint, @eslint/js, devDependencies, eslint, @eslint/js, @playwright/test, tailwindcss-animate, @vitejs/plugin-react (+5 more)

### Community 49 - "api"
Cohesion: 0.21
Nodes (7): api, AdminAiMetricsPage(), AiMetricsData, useAiMetrics(), userQueryKeys, useUserOrder(), useUserOrders()

### Community 50 - "services/index.ts"
Cohesion: 0.25
Nodes (5): CategoryCard, HEX_CLIP, ProductCategorySection(), mockUseCategories, useCategories()

### Community 51 - "sheet.tsx"
Cohesion: 0.23
Nodes (9): Sheet(), SheetClose(), SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle() (+1 more)

### Community 52 - "variant-availability.ts"
Cohesion: 0.36
Nodes (6): useVariantAvailableQuantity(), AvailabilityRow, computeAvailableUnits(), fetchVariantAvailableQuantity(), fetchVariantsAvailableQuantities(), VariantAvailabilityMap

### Community 53 - "RECENT_INTEGRATIONS.md"
Cohesion: 0.17
Nodes (9): i18n (English/Bangla), ci.yml, Intentionally Dropped Features, Footer Mobile Layout, i18n English + Bangla, language-switcher.tsx, layout.tsx, merge-back.yml (+1 more)

### Community 54 - "CI Workflow"
Cohesion: 0.30
Nodes (12): Commit Hook and CLAUDE.md Integration, All Checks Passed Job, Branch Protection Required Checks, Build Job, CI Workflow, Database / Validate migrations check, Lint Job, pnpm (+4 more)

### Community 55 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, build, coverage, dev, lint, preview, test, test:e2e (+4 more)

### Community 56 - "use-auth-query.ts"
Cohesion: 0.35
Nodes (7): GuestGuard(), mockUseAuth, mockUseSession, useAuth(), useMeQuery(), useSession(), useUserProfile()

### Community 57 - "shop-help-pages.tsx"
Cohesion: 0.24
Nodes (4): formatTrackingDate(), TrackingLookup(), usePublicTracking(), PublicTracking

### Community 58 - "auth-context.tsx"
Cohesion: 0.22
Nodes (9): AuthContext, AuthProvider(), AuthProviderProps, AuthUser, buildProfileFieldsFromUserMetadata(), pickAvatar(), authQueryKeys, StoredSession (+1 more)

### Community 60 - "upload-category-image.ts"
Cohesion: 0.67
Nodes (3): ALLOWED_MIME, CategoryImageResult, uploadCategoryCoverImage()

### Community 61 - "useAuth"
Cohesion: 0.08
Nodes (23): AdminLayout(), mockUseAuth, AdminGuard(), AuthGuard(), mockUseAuth, mockUseAuth, useAuth(), EmailConfirmationPage() (+15 more)

### Community 62 - "public-routes.tsx"
Cohesion: 0.10
Nodes (18): adminRoutes, EmailConfirmationPage, ForgotPasswordPage, guestRoutes, LoginPage, RegisterPage, ResetPasswordPage, AppRoutes() (+10 more)

### Community 63 - "dependencies"
Cohesion: 0.18
Nodes (11): class-variance-authority, clsx, dependencies, class-variance-authority, clsx, @radix-ui/react-tooltip, react-dom, @vercel/analytics (+3 more)

### Community 64 - "Aurevo.UI CLAUDE.md"
Cohesion: 0.18
Nodes (11): admin-ai-metrics-page.tsx, AI Monitoring Dashboard, alert-dialog.tsx, Delete Confirmation Pattern, Development Workflow, Aurevo.UI CLAUDE.md, GRAPH_REPORT.md, graphify Knowledge Graph (+3 more)

### Community 66 - "formatPrice"
Cohesion: 0.31
Nodes (7): HeaderProductSearch(), HeaderProductSearchProps, pickSuggestionImage(), mockNavigate, mockUseSearchProducts, formatPrice(), useSearchProducts()

### Community 68 - "Courier Tracking (Steadfast)"
Cohesion: 0.20
Nodes (10): admin-order-detail-page.tsx, Courier Tracking (Steadfast), TrackingPage (shop-help-pages.tsx), usePublicTracking, useShipOrderWithCourier, admin-order-detail-page.tsx, Courier Tracking (Steadfast), TrackingPage (shop-help-pages.tsx) (+2 more)

### Community 72 - "oauth-success-landing-redirect.tsx"
Cohesion: 0.50
Nodes (5): OAuthSuccessLandingRedirect(), OAuthTokens, consumeOAuthLoginPending(), markOAuthLoginPending(), peekOAuthLoginPending()

### Community 74 - "compilerOptions"
Cohesion: 0.22
Nodes (8): vite.config.ts, compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, include

### Community 75 - "App.tsx"
Cohesion: 0.05
Nodes (32): App(), AiChatbotIcon(), AiChatbotIconProps, AiChatWidget(), ChatMessage, getOrCreateSessionId(), ProductCards(), ErrorBoundary (+24 more)

### Community 77 - "product-card.tsx"
Cohesion: 0.39
Nodes (6): ProductCardProps, ProductCardTitle(), Tooltip(), TooltipContent(), TooltipProvider(), TooltipTrigger()

### Community 78 - "button.tsx"
Cohesion: 0.18
Nodes (12): CategoryImageField(), CategoryImageFieldProps, Button(), buttonVariants, Card, CardContent, CardDescription, CardFooter (+4 more)

### Community 79 - "use-address.ts"
Cohesion: 0.35
Nodes (9): DashboardAddressesPage(), ADDRESS, AddressInput, addressQueryKeys, useAddresses(), useCreateAddress(), useDeleteAddress(), UserAddress (+1 more)

### Community 80 - "use-user-mutation.ts"
Cohesion: 0.39
Nodes (7): DashboardProfilePage(), toDateInputValue(), useCreateUserProfile(), useDeleteAvatar(), useUpdateUserProfile(), useUploadAvatar(), useUserMutations()

### Community 82 - "Backend-only Auth (Supabase SDK Removed)"
Cohesion: 0.25
Nodes (8): No Supabase SDK Architecture Decision, OAuth Redirect Flow, OAuthSuccessLandingRedirect, useSignInWithOAuth, src/lib/api.ts, src/contexts/auth-context.tsx, Backend-only Auth (Supabase SDK Removed), oauth-success-landing-redirect.tsx

### Community 83 - "Saved Addresses & Checkout Autofill"
Cohesion: 0.25
Nodes (8): Radix Select Empty-String onValueChange Guard, Saved Address Default Toggle Layout Guard, Saved Addresses & Checkout Autofill, use-address.ts, checkout-page.tsx, dashboard-addresses-page.tsx, Saved Addresses + Checkout Autofill, use-address.ts

### Community 84 - "new-collection-section.test.tsx"
Cohesion: 0.33
Nodes (4): mockUseCart, mockUseProducts, mockUseToast, mockUseWishlistActions

### Community 87 - "E2E Tests (Playwright)"
Cohesion: 0.29
Nodes (7): cartLimiter Rate Limit Interaction, e2e/global-setup.ts, E2E Tests (Playwright), .github/workflows/ci.yml, E2E Tests (Playwright), .github/workflows/merge-back.yml, Testing (Vitest/MSW)

### Community 90 - "NumberStepper.tsx"
Cohesion: 0.43
Nodes (4): NumberStepper(), NumberStepperProps, Callback, useDebounceCallback()

### Community 91 - "loading-spinner.tsx"
Cohesion: 0.38
Nodes (5): LoadingIndicator(), LoadingIndicatorProps, LoadingSpinner(), LoadingSpinnerProps, sizeClasses

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

### Community 107 - "nav-user.tsx"
Cohesion: 0.27
Nodes (8): fullName(), initials(), NavUser(), mockUseAuth, Avatar(), AvatarFallback(), AvatarImage(), DropdownMenuGroup()

### Community 118 - "use-category-mutation.ts"
Cohesion: 0.22
Nodes (11): AdminCategoriesPage(), compareCategoriesBySort(), buildCategoryFormData(), CreateCategoryParams, UpdateCategoryParams, useBulkUpdateCategoryStatus(), useCreateCategory(), useDeleteCategory() (+3 more)

### Community 122 - "index.html Entry Point"
Cohesion: 0.67
Nodes (3): index.html Entry Point, Async Inter Font Loading (media=print trick), LCP Hero Image Preload (cover-photo.webp)

## Ambiguous Edges - Review These
- `LCP Hero Image Preload (cover-photo.webp)` → `Tech Stack Table`  [AMBIGUOUS]
  index.html · relation: conceptually_related_to

## Knowledge Gaps
- **609 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+604 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **219 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `LCP Hero Image Preload (cover-photo.webp)` and `Tech Stack Table`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `dependencies` connect `dependencies` to `cmdk`, `embla-carousel-react`, `@headlessui/react`, `@heroicons/react`, `i18next`, `lodash`, `lucide-react`, `next-themes`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-label`, `@radix-ui/react-popover`, `@radix-ui/react-radio-group`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-tabs`, `react-i18next`, `react-markdown`, `react-router-dom`, `recharts`, `@sentry/react`, `sonner`, `tailwind-merge`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tanstack/react-query-devtools`, `@vercel/speed-insights`, `package.json`, `SidebarProvider`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `react` connect `SidebarProvider` to `home/index.ts`, `sidebar.tsx`, `dependencies`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `admin-variants-page.tsx`, `admin-order-detail-page.tsx`, `AdminOrderDetailPage`, `admin-products-page.tsx`, `sidebar.tsx`, `use-imports-queries.ts`, `input.tsx`, `Order`, `admin-orders-page.tsx`, `SidebarProvider`, `home/index.ts`, `useToast`, `admin-inventory-page.tsx`, `checkout-page.tsx`, `product-detail-page.tsx`, `nav-main.tsx`, `DashboardPage`, `api`, `sheet.tsx`, `App.tsx`, `product-card.tsx`, `button.tsx`, `loading-spinner.tsx`, `alert.tsx`, `nav-user.tsx`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Are the 13 inferred relationships involving `useToast()` (e.g. with `new-collection-section.test.tsx` and `our-shop-section.test.tsx`) actually correct?**
  _`useToast()` has 13 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _609 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `admin-variants-page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11587301587301588 - nodes in this community are weakly interconnected._