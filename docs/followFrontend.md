# Frontend Architecture Specification

## 1. Overview

The frontend must use a **feature-based modular architecture** built with React, TypeScript, and Vite.

The architecture should organize the application around business features rather than grouping the entire codebase only by technical file type.

Each major feature must contain its own pages, components, hooks, API services, state management, types, and other feature-specific logic where required.

The architecture should provide:

* Clear separation of responsibilities
* Feature isolation
* Reusable shared components
* Centralized API communication
* Centralized authentication handling
* Global and feature-level state management using Zustand
* Route-level lazy loading
* Role-based route protection
* Type safety with TypeScript
* Consistent form validation
* Easy navigation and maintainability

The frontend architecture should follow the same general pattern used in the previous project.

---

# 2. High-Level Frontend Structure

The frontend source directory should follow this structure:

```text
src/
├── app/
│   ├── layouts/
│   │   ├── MainLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   ├── AdminLayout.tsx
│   │   └── [Role]Layout.tsx
│   │
│   └── router/
│       ├── index.tsx
│       ├── main.routes.tsx
│       ├── auth.routes.tsx
│       ├── admin.routes.tsx
│       └── [role].routes.tsx
│
├── assets/
│
├── constants/
│   └── api-routes.ts
│
├── features/
│   ├── auth/
│   ├── [feature-1]/
│   ├── [feature-2]/
│   ├── [feature-3]/
│   └── ...
│
├── services/
│   └── apiClient.ts
│
├── shared/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── table/
│   │
│   ├── hooks/
│   ├── pages/
│   ├── providers/
│   ├── services/
│   └── constants/
│
├── store/
│   ├── app.store.ts
│   └── ui.store.ts
│
└── styles/
    └── tailwind.css
```

The exact feature names should be determined from the requirements of the new project.

Do not create unnecessary feature folders. A feature should represent a meaningful business/domain area of the application.

---

# 3. Feature-Based Architecture

The `features/` directory is the main organizational structure of the frontend.

Each major business feature should be isolated into its own directory.

For example:

```text
features/
├── auth/
├── users/
├── products/
├── orders/
├── payments/
├── profile/
└── dashboard/
```

The actual features should be based on the new project's requirements.

A feature may contain:

```text
features/<feature>/
├── pages/
├── components/
├── hooks/
├── services/
├── store/
├── types/
├── constants/
└── schemas/
```

Not every feature needs every directory.

Only create a directory when that feature actually requires it.

For example, if a feature does not have feature-specific Zustand state, do not create an empty `store/` directory.

---

# 4. Feature Responsibilities

A feature should contain most of the code directly related to that business domain.

For example:

```text
features/products/
├── pages/
│   ├── ProductListPage.tsx
│   ├── ProductDetailsPage.tsx
│   └── CreateProductPage.tsx
│
├── components/
│   ├── ProductCard.tsx
│   ├── ProductTable.tsx
│   ├── ProductForm.tsx
│   └── ProductFilters.tsx
│
├── hooks/
│   ├── useProducts.ts
│   └── useProductFilters.ts
│
├── services/
│   └── product.service.ts
│
├── store/
│   └── products.store.ts
│
├── types/
│   └── product.types.ts
│
└── schemas/
    └── product.schema.ts
```

This makes the feature easy to understand without searching through unrelated parts of the project.

---

# 5. Pages

The `pages/` directory inside a feature contains route-level page components.

Example:

```text
features/products/pages/
├── ProductListPage.tsx
├── ProductDetailsPage.tsx
└── CreateProductPage.tsx
```

Pages should act primarily as **composition layers**.

A page should combine feature components rather than contain a large amount of implementation itself.

For example:

```text
ProductListPage
│
├── PageHeader
├── ProductFilters
├── SearchBar
├── ProductGrid
│   └── ProductCard
└── Pagination
```

Avoid creating extremely large page components containing all UI, API calls, state logic, validation, and business logic.

---

# 6. Feature Components

Feature-specific components belong inside:

```text
features/<feature>/components/
```

Examples:

```text
ProductCard
ProductTable
ProductForm
ProductFilters
ProductDetails
ProductStatus
```

These components should remain inside the feature when their responsibility is specific to that domain.

For example:

```text
features/orders/components/OrderCard.tsx
```

should not be moved to `shared/components/` merely because it happens to be reused in multiple order-related pages.

---

# 7. Shared Components

Components that are genuinely reusable across multiple unrelated features should be placed inside:

```text
shared/components/
```

Recommended organization:

```text
shared/components/
├── ui/
│   ├── Button
│   ├── Input
│   ├── Select
│   ├── Modal
│   ├── Badge
│   ├── Loading
│   └── ...
│
├── layout/
│   ├── Navbar
│   ├── Footer
│   ├── Sidebar
│   └── ...
│
└── table/
    ├── Table
    ├── Pagination
    └── ...
```

Examples of appropriate shared components:

* Button
* Input
* Modal
* Select
* Pagination
* Table
* Loading
* EmptyState
* DateTimePicker
* Navbar
* Footer
* Sidebar

Do not put business-specific components in the shared directory.

For example:

```text
ProductCard
BookingCard
OrderStatus
UserApprovalTable
```

should remain inside their respective feature.

---

# 8. Application Layer

The `app/` directory contains application-level composition.

It should primarily contain:

* Layouts
* Routing
* Application-level route configuration

It should not contain feature-specific business logic.

---

# 9. Layout Architecture

Different application sections should use separate layouts when their UI structure differs.

Examples:

### MainLayout

Used for the main application/public area.

May contain:

* Navbar
* Main content
* Footer

### AuthLayout

Used for:

* Login
* Signup
* OTP verification
* Password recovery
* Other authentication screens

### AdminLayout

Used for administrative screens.

May contain:

* Admin navbar
* Admin sidebar
* Main admin content

### Role-specific layouts

If the application has other roles, create role-specific layouts where necessary.

For example:

```text
OwnerLayout
ManagerLayout
VendorLayout
```

Layouts should handle structural UI composition.

Do not place feature business logic inside layouts.

---

# 10. Routing Architecture

Use:

```text
react-router-dom
```

with:

```text
createBrowserRouter
```

Routes should be organized into separate route modules according to application areas.

For example:

```text
app/router/
├── index.tsx
├── main.routes.tsx
├── auth.routes.tsx
├── admin.routes.tsx
└── owner.routes.tsx
```

The exact route files should depend on the new application's roles and modules.

Conceptually:

```text
Router
│
├── Authentication Routes
│   ├── Login
│   ├── Signup
│   ├── OTP Verification
│   └── Forgot Password
│
├── Public/Main Routes
│   ├── Home
│   ├── Listing
│   └── Details
│
├── Protected User Routes
│   ├── Dashboard
│   ├── Profile
│   └── ...
│
├── Protected Role Routes
│   ├── Dashboard
│   ├── Management
│   └── ...
│
└── 404
```

---

# 11. Route-Level Lazy Loading

Use React's:

```text
lazy()
```

and:

```text
Suspense
```

for route-level code splitting.

Example:

```text
const DashboardPage = lazy(
  () => import("@/features/dashboard/pages/DashboardPage")
);
```

Lazy loading should primarily be applied to route-level pages.

Do not unnecessarily lazy-load every small component.

The desired structure is:

```text
Route
   ↓
Lazy-loaded Page
   ↓
Feature Components
```

This allows larger sections of the application to be loaded only when required.

---

# 12. Route Protection

Protected routes should use dedicated route protection components.

For example:

```text
ProtectedRoute
```

The component can handle:

* Authentication checks
* Role checks
* Redirecting unauthenticated users
* Redirecting unauthorized users

Example:

```tsx
<ProtectedRoute allowedRoles={["admin"]}>
    <AdminRoutes />
</ProtectedRoute>
```

A `PublicRoute` can also be used for pages such as:

* Login
* Signup
* Forgot Password

Authenticated users can be redirected away from these pages where appropriate.

Frontend route protection is primarily a client-side access-control and UX mechanism.

Actual authorization must always be enforced by the backend.

---

# 13. Centralized API Client

All HTTP communication must go through a centralized Axios instance.

Create:

```text
src/services/apiClient.ts
```

The API client should handle:

* API base URL
* Request configuration
* `withCredentials`
* Authentication cookies
* Response interceptors
* Token refresh
* Logout on failed refresh
* Common HTTP error handling
* Common toast/error behavior where appropriate

The API URL should come from an environment variable:

```text
VITE_API_URL
```

Example:

```text
VITE_API_URL=http://localhost:5000/api
```

Do not create separate Axios instances for individual features unless there is a specific architectural requirement.

---

# 14. Feature API Services

Each feature should have its own service file when it communicates with the backend.

Example:

```text
features/products/services/product.service.ts
```

The service should contain the API functions related to that feature.

Example:

```text
getProducts()
getProductById()
createProduct()
updateProduct()
deleteProduct()
```

The service should use the centralized:

```text
apiClient
```

Example flow:

```text
Product Service
      ↓
apiClient
      ↓
Backend API
```

Components must not directly call Axios.

Avoid:

```text
Component
   ↓
axios.get(...)
```

Instead:

```text
Component
   ↓
Feature Hook
   ↓
Feature Service
   ↓
apiClient
   ↓
Backend
```

---

# 15. Data Fetching

The previous project did **not** use TanStack Query or React Query.

The new project should follow the same data-fetching approach unless the project requirements explicitly call for a different library.

API fetching should be handled through:

* Feature services
* Custom feature hooks
* React state where necessary
* Reusable shared async hooks where appropriate

The previous architecture used custom hooks such as:

```text
useAsyncFetch
useDebounce
useSearch
```

The same pattern can be reused.

For example:

```text
ProductPage
     ↓
useProducts()
     ↓
product.service.ts
     ↓
apiClient
     ↓
Backend
```

Do not introduce TanStack Query into this architecture unless it is explicitly requested later.

---

# 16. Custom Hooks

Custom hooks should contain reusable React-specific logic.

There are two categories.

### Feature-specific hooks

Place these inside:

```text
features/<feature>/hooks/
```

Example:

```text
features/products/hooks/useProducts.ts
features/products/hooks/useProductFilters.ts
```

### Shared hooks

Hooks that are independent of a specific business feature belong inside:

```text
shared/hooks/
```

Examples:

```text
useAsyncFetch
useDebounce
useSearch
useMediaQuery
useClickOutside
```

Do not put feature-specific hooks into `shared/hooks/`.

---

# 17. Zustand State Management

Use:

```text
Zustand
```

for client-side application state.

The architecture should have a distinction between:

### Global application state

Located in:

```text
src/store/
```

For example:

```text
app.store.ts
ui.store.ts
```

### Feature-specific state

Located inside the relevant feature:

```text
features/<feature>/store/
```

Example:

```text
features/products/store/products.store.ts
```

---

# 18. Global Application Store

The global application store should contain state that is genuinely needed across multiple unrelated features.

For example:

```text
app.store.ts
```

may contain:

* Current user
* Authentication status
* User/role information
* Global application state
* Wishlist/favorites where appropriate

Selected state may be persisted to localStorage when persistence is required.

Do not put every piece of application state into the global store.

---

# 19. UI Store

Create:

```text
src/store/ui.store.ts
```

for global UI state.

Examples:

* Theme mode
* Sidebar open/close state
* Other application-wide UI preferences

UI state should only be persisted when there is a clear requirement.

---

# 20. Feature Stores

Feature-specific Zustand stores should be created when the feature has meaningful client-side state that needs to be shared between multiple components.

Examples:

```text
features/auth/store/auth.store.ts
features/products/store/products.store.ts
features/dashboard/store/dashboard.store.ts
```

A feature does not automatically require a Zustand store.

Do not create empty stores simply to make every feature structurally identical.

---

# 21. State Flow

The state-management flow should generally look like:

```text
                    React Component
                           │
                           ▼
                    Feature Hook
                           │
                  ┌────────┴────────┐
                  │                 │
                  ▼                 ▼
            Zustand Store      API Service
                  │                 │
                  │                 ▼
                  │             apiClient
                  │                 │
                  │                 ▼
                  │            Backend API
                  │
                  ▼
               UI State
```

Use Zustand for client-side state.

Use the custom API-fetching approach for server/API data.

Do not treat Zustand as a replacement for API services.

---

# 22. Authentication Architecture

Authentication-related functionality should remain inside:

```text
features/auth/
```

Example:

```text
features/auth/
├── pages/
├── components/
├── hooks/
├── services/
├── store/
├── types/
└── schemas/
```

Authentication services should communicate with the backend through the centralized API client.

The authentication flow should be centralized rather than duplicated across individual features.

---

# 23. Cookie-Based Authentication

If the backend uses HTTP-only cookies for authentication:

* Do not store JWT access tokens in localStorage.
* Configure Axios with `withCredentials: true`.
* Let the browser handle HTTP-only authentication cookies.
* Handle token refresh centrally in the Axios response interceptor.
* Clear application authentication state when refresh fails.

The frontend should not directly manipulate HTTP-only cookies.

---

# 24. Axios Authentication Interceptor

The centralized API client should handle authentication failures.

Conceptually:

```text
API Request
    ↓
Backend
    ↓
401 Response
    ↓
Axios Response Interceptor
    ↓
Refresh Token Request
    ↓
Success?
 ┌──┴───┐
 │      │
Yes     No
 │      │
Retry   Logout
Request
```

The interceptor should also prevent refresh logic from being incorrectly applied to public authentication endpoints.

This follows the previous project's architecture.

---

# 25. Forms and Validation

Use:

```text
react-hook-form
```

with:

```text
Zod
```

and:

```text
@hookform/resolvers
```

Forms should follow this structure:

```text
Form Component
      ↓
React Hook Form
      ↓
Zod Schema
      ↓
Validated Data
      ↓
Feature Service
      ↓
API
```

Feature-specific schemas should be placed inside:

```text
features/<feature>/schemas/
```

Example:

```text
features/auth/schemas/signup.schema.ts
features/products/schemas/product.schema.ts
```

Do not scatter validation rules across multiple components.

---

# 26. TypeScript Architecture

TypeScript must be used throughout the frontend.

Feature-specific types should be located inside:

```text
features/<feature>/types/
```

Types may represent:

* API responses
* API request payloads
* Domain entities
* Component props
* Form values
* Query/filter parameters
* Client-side state

Avoid unnecessary use of:

```text
any
```

Prefer explicit types and reusable interfaces/types.

---

# 27. Constants

Application-wide constants should be located in:

```text
src/constants/
```

For example:

```text
api-routes.ts
```

Feature-specific constants should remain inside:

```text
features/<feature>/constants/
```

For example:

```text
features/orders/constants/order.constants.ts
```

Do not create one huge constants file containing unrelated feature-specific values.

---

# 28. Shared Providers

Application-wide React providers should be placed inside:

```text
shared/providers/
```

Examples may include:

```text
ThemeProvider
```

and other providers required by the application.

The root application should compose these providers.

---

# 29. Styling

Use:

```text
Tailwind CSS
```

for styling.

Keep component-specific styling close to the component using Tailwind utility classes.

Global styles should remain limited to:

* Tailwind configuration
* Global reset
* CSS variables
* Truly global styles

Avoid creating unnecessary global CSS.

---

# 30. UI Libraries and Utilities

The previous frontend architecture used libraries such as:

```text
React
TypeScript
Vite
React Router
Zustand
Axios
React Hook Form
Zod
Tailwind CSS
Lucide React
Sonner
```

Additional libraries such as:

```text
Recharts
Leaflet
CropperJS
date-fns
```

should only be included when the new project actually requires their functionality.

Do not add libraries just because they existed in the previous project.

---

# 31. Error Handling

API errors should be handled consistently.

The centralized Axios client should handle common HTTP-level errors.

For example:

```text
401
→ authentication/refresh handling

403
→ unauthorized access handling

404
→ resource not found handling

500+
→ server error notification
```

Feature-specific errors should be handled at the appropriate feature/hook/page level.

Use a consistent toast notification system such as Sonner where appropriate.

Do not duplicate identical API error handling in every component.

---

# 32. Barrel Exports

Use `index.ts` barrel files where they improve import organization.

For example:

```text
features/products/components/index.ts
```

can export:

```text
ProductCard
ProductFilters
ProductTable
```

Then components can be imported using:

```text
import {
  ProductCard,
  ProductFilters
} from "@/features/products/components";
```

Do not create barrel files everywhere unnecessarily.

---

# 33. Dependency Rules

The architecture should follow a clear dependency direction:

```text
app
 │
 ├── layouts
 └── router
        │
        ▼
     features
        │
        ▼
      shared
```

Features should remain independent from one another as much as reasonably possible.

Avoid directly importing another feature's internal implementation.

For example, avoid:

```text
features/orders/
      ↓
features/users/internal-component.tsx
```

If functionality must be shared between features, consider:

* Moving genuinely reusable UI to `shared/`
* Moving shared utilities to `shared/`
* Using global application state
* Exposing a clean public API from the feature

---

# 34. Feature Internal Dependency Flow

Within a feature, the preferred flow is:

```text
Page
 ↓
Feature Components
 ↓
Feature Hooks
 ↓
Feature Store / Feature Service
 ↓
apiClient
 ↓
Backend API
```

Types and schemas can be consumed by the appropriate layers.

Components should not directly communicate with the backend.

Bad:

```text
ProductPage
    ↓
axios.get(...)
```

Good:

```text
ProductPage
    ↓
useProducts()
    ↓
productService.getProducts()
    ↓
apiClient
    ↓
Backend
```

---

# 35. Separation of Responsibilities

Each directory has a specific responsibility.

```text
app/
→ Application composition, layouts and routing.

features/
→ Business/domain-specific frontend functionality.

services/
→ Centralized API/HTTP infrastructure.

shared/
→ Reusable cross-feature functionality.

store/
→ Global client-side state.

assets/
→ Static assets.

constants/
→ Application-wide constants.

styles/
→ Global styling.
```

Do not mix responsibilities between these directories without a clear reason.

---

# 36. Reusability Rule

Do not optimize for maximum abstraction.

Optimize for **appropriate reuse**.

A component should be moved to `shared/` only when it is genuinely generic.

For example:

```text
Button
Modal
Pagination
Table
Input
```

are good candidates.

But:

```text
BookingCard
ProductCard
VenueCard
OrderSummary
UserApprovalTable
```

should normally remain feature-specific.

Premature abstraction should be avoided.

---

# 37. Code Organization Principle

The main goal is that a developer can enter a feature directory and understand that feature without searching through the entire project.

For example:

```text
features/orders/
```

should contain most order-related frontend functionality:

```text
pages/
components/
hooks/
services/
store/
types/
schemas/
constants/
```

This is preferable to a global structure such as:

```text
components/
    hundreds of components

services/
    hundreds of services

hooks/
    hundreds of hooks

types/
    hundreds of types
```

The architecture should remain **domain-oriented**.

---

# 38. Development Approach

Do not generate the entire frontend as one large implementation.

First establish the architectural foundation:

```text
1. Project setup
2. Folder structure
3. Routing
4. Layouts
5. Centralized Axios client
6. Global Zustand stores
7. Shared UI components
8. Authentication architecture
9. Route protection
10. Feature boundaries
```

Then implement features incrementally.

For every new feature:

```text
1. Define feature responsibility
2. Create feature directory
3. Define types
4. Define schemas if required
5. Create API service
6. Create custom hooks if required
7. Create feature store if required
8. Create reusable feature components
9. Create pages
10. Register routes
11. Add route protection if required
12. Test the complete feature flow
```

Do not introduce a different architecture pattern for every feature.

All features should follow the same conventions.

---

# 39. Expected Frontend Request Flow

For a typical API-driven feature, the flow should be:

```text
User Interaction
       ↓
React Page
       ↓
Feature Component
       ↓
Feature Hook
       ↓
Feature Service
       ↓
Centralized apiClient
       ↓
Backend API
       ↓
API Response
       ↓
Feature Hook / State
       ↓
React Component
       ↓
UI Update
```

For client-only state:

```text
User Interaction
       ↓
React Component
       ↓
Zustand Store
       ↓
State Update
       ↓
React Component Re-render
```

For authentication failures:

```text
React Request
       ↓
apiClient
       ↓
Backend
       ↓
401
       ↓
Axios Interceptor
       ↓
Refresh Token
       ↓
Retry Request
       ↓
Success
```

If refresh fails:

```text
Refresh Failed
       ↓
Clear Authentication State
       ↓
Logout / Redirect to Login
```

---

# 40. Final Architecture Rules

The new frontend must follow these rules:

1. Use React + TypeScript + Vite.
2. Organize the application primarily by business features.
3. Keep feature-specific code inside its feature directory.
4. Keep genuinely reusable functionality inside `shared/`.
5. Use React Router with `createBrowserRouter`.
6. Use lazy loading for route-level pages.
7. Use Zustand for client-side state management.
8. Use the centralized Axios client for all HTTP communication.
9. Use feature-specific service files for API operations.
10. Use custom React hooks for reusable fetching and UI logic.
11. Do not use TanStack Query unless explicitly requested.
12. Use React Hook Form + Zod for form handling and validation.
13. Use TypeScript throughout the frontend.
14. Use protected routes for authenticated/role-specific areas.
15. Keep layouts responsible for structure, not business logic.
16. Keep pages responsible primarily for composition.
17. Keep components focused on UI and interaction.
18. Keep API communication inside services.
19. Keep global state inside global Zustand stores.
20. Keep feature-specific client state inside feature stores.
21. Avoid unnecessary abstractions.
22. Avoid unnecessary dependencies.
23. Avoid duplicating common UI and logic.
24. Keep feature dependencies loosely coupled.
25. Maintain the same architectural conventions throughout the project.

## Core Architecture

The final architecture should follow this model:

```text
                    APPLICATION
                         │
              ┌──────────┴──────────┐
              │                     │
           ROUTER                 LAYOUTS
              │                     │
              └──────────┬──────────┘
                         │
                         ▼
                    FEATURES
                         │
          ┌──────────────┼──────────────┐
          │              │              │
        PAGES       COMPONENTS       HOOKS
          │              │              │
          └──────────────┼──────────────┘
                         │
                  ┌──────┴──────┐
                  │             │
                  ▼             ▼
             ZUSTAND        SERVICES
           Client State        │
                               ▼
                           apiClient
                               │
                               ▼
                         BACKEND API

                    SHARED
                      │
       ┌──────────────┼──────────────┐
       │              │              │
   UI Components    Hooks        Providers
```

This architecture should be treated as the baseline frontend architecture for the new project. The exact feature names, routes, layouts, and feature-specific folders must be derived from the new project's requirements rather than copied blindly from the previous project.
