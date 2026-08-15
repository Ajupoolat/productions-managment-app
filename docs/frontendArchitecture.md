Tendagon Machine Task --- Frontend Architecture

1. Purpose

This frontend architecture adapts the familiar BookMyVenue feature-based
React architecture to the Tendagon Film Production Management Platform.

The main pattern is:

Router/Layout → Feature Page → Feature Components/Hooks → Feature
Service → Axios API Client → Backend

The frontend must be permission-aware, but the backend remains the real
security boundary. Hiding a button is UX; backend permission middleware
is security.

2. Frontend Technology Stack

React

TypeScript

Vite

React Router

Zustand

Axios

Zod

Tailwind CSS

Lucide React

Optional only if already familiar/installed:

react-hook-form

@hookform/resolvers

sonner

Do not add Redux or TanStack Query under the current deadline unless
there is a concrete need.

3. Recommended Folder Structure

client/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   │
│   ├── app/
│   │   ├── layouts/
│   │   │   ├── AppLayout.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   └── DashboardLayout.tsx
│   │   │
│   │   └── router/
│   │       ├── index.tsx
│   │       ├── auth.routes.tsx
│   │       ├── admin.routes.tsx
│   │       ├── production.routes.tsx
│   │       └── protected.routes.tsx
│   │
│   ├── constants/
│   │   ├── api-routes.ts
│   │   ├── roles.ts
│   │   ├── permissions.ts
│   │   └── navigation.ts
│   │
│   ├── services/
│   │   └── apiClient.ts
│   │
│   ├── store/
│   │   ├── auth.store.ts
│   │   └── ui.store.ts
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── schemas/
│   │   │   └── types/
│   │   │
│   │   ├── onboarding/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── schemas/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   │
│   │   ├── dashboard/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   └── types/
│   │   │
│   │   ├── users/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── types/
│   │   │
│   │   ├── roles/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── types/
│   │   │
│   │   ├── productions/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── schemas/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   │
│   │   ├── locations/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── schemas/
│   │   │   └── types/
│   │   │
│   │   ├── funds/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── schemas/
│   │   │   └── types/
│   │   │
│   │   ├── costumes/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── schemas/
│   │   │   └── types/
│   │   │
│   │   ├── audit-logs/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── types/
│   │   │
│   │   └── notifications/
│   │       ├── components/
│   │       ├── services/
│   │       └── types/
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── layout/
│   │   │   ├── table/
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── PublicRoute.tsx
│   │   │   └── PermissionGuard.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── usePermission.ts
│   │   │   └── useDebounce.ts
│   │   ├── utils/
│   │   └── types/
│   │
│   ├── assets/
│   └── styles/
│       └── tailwind.css
│
├── .env
├── .env.example
├── package.json
└── vite.config.ts

Not every feature needs every subfolder. Create folders only when they
contain real code.

4. Feature-Based Architecture

Each business feature owns its UI and API concerns.

Example:

features/productions/
├── pages/
│   ├── ProductionListPage.tsx
│   ├── ProductionDetailsPage.tsx
│   └── CreateProductionPage.tsx
├── components/
│   ├── ProductionForm.tsx
│   ├── ProductionCard.tsx
│   ├── CastSection.tsx
│   └── CrewSection.tsx
├── services/
│   └── production.service.ts
├── schemas/
│   └── production.schema.ts
├── hooks/
│   └── useProductions.ts
└── types/
    └── production.types.ts

Feature code should not be dumped into global folders unless it is
genuinely shared.

5. Application-Level Responsibilities

app/router

Defines route hierarchy and lazy-loaded pages.

Example conceptual routes:

/login
/register

/onboarding
/profile
/dashboard

/admin/users
/admin/onboarding
/admin/roles
/admin/permissions

/productions
/productions/:id

/locations
/funds
/costumes
/audit-logs

app/layouts

Layouts define page shells:

AuthLayout
  └── login/register

DashboardLayout
  ├── sidebar
  ├── navbar
  ├── notification control
  └── <Outlet />

Avoid creating a different full layout for every role unless the UI
truly differs. Prefer one dashboard layout whose navigation is generated
from permissions.

6. Authentication State

auth.store.ts should contain only global authentication/user state
that multiple features need.

Example:

user
isAuthenticated
isLoading
setUser()
clearUser()

The authenticated user returned by /auth/me should include enough
authorization information for frontend rendering, for example:

User
├── id
├── fullName
├── email
├── contractorType
├── role
└── permissions[]

Do not store passwords or JWT values in Zustand/localStorage when using
HTTP-only cookie authentication.

7. Axios API Layer

Create one global Axios instance:

src/services/apiClient.ts

Responsibilities:

baseURL from environment variable

withCredentials: true

common headers

normalized error handling where useful

Example request path:

ProductionListPage
    ↓
production.service.ts
    ↓
apiClient.get("/productions")
    ↓
Backend

Feature services should use apiClient; components should not
repeatedly construct raw Axios configuration.

8. Frontend Authorization

There are three frontend authorization concerns.

Protected Route

Answers:

Is the user authenticated?

Not authenticated
  ↓
redirect /login

Permission-Aware Route

Answers:

Should this user be allowed to open this frontend route?

Example:

/admin/roles
requires roles.view

PermissionGuard

Answers:

Should this particular UI action be shown?

Example:

<PermissionGuard permission="funds.approve">
    <ApproveButton />
</PermissionGuard>

Important:

Frontend permission check = UX
Backend permission check  = security

A malicious user can bypass frontend UI restrictions, so every protected
API must still enforce permissions on the backend.

9. Permission-Based Navigation

Do not hard-code one sidebar that shows every module to everyone.

Define navigation metadata:

Dashboard
  permission: none/authenticated

Users
  permission: users.view

Onboarding Reviews
  permission: onboarding.review

Roles
  permission: roles.view

Productions
  permission: productions.view

Locations
  permission: locations.view

Funds
  permission: funds.view

Costumes
  permission: costumes.view

Audit Logs
  permission: audit_logs.view

Then filter:

navigation items
    ↓
current user permissions
    ↓
visible sidebar items

This gives:

Super Admin
  → Users, Roles, Permissions, Onboarding, Productions, Locations,
    Funds, Costumes, Audit Logs

Production Manager
  → Productions, Locations where allowed, Fund Requests

Finance Manager
  → Funds

Location Manager
  → Locations

Costume Manager
  → Costumes

Cast/Crew
  → Profile, Onboarding Status, Assigned Production/Assignments

10. Form Architecture

Use Zod schemas on the frontend for user feedback.

Example:

ProductionForm
    ↓
Zod frontend validation
    ↓
feature service
    ↓
API
    ↓
Backend Zod validation AGAIN

Frontend validation does not replace backend validation.

Recommended structure:

features/productions/schemas/production.schema.ts
features/productions/types/production.types.ts
features/productions/components/ProductionForm.tsx

If React Hook Form is already familiar, use:

react-hook-form
    +
zodResolver
    +
Zod

Otherwise, do not introduce it solely for architectural purity.

11. Page vs Component vs Service vs Hook

Page

Route-level screen.

Examples:

ProductionListPage
ProductionDetailsPage
FundRequestsPage
OnboardingReviewPage

A page coordinates components and data.

Component

Reusable visual/business UI within a feature.

Examples:

ProductionForm
FundRequestTable
ApprovalModal
CostumeAssignmentForm

Feature Service

Contains API calls for that feature.

Example:

production.service.ts

getProductions()
getProductionById()
createProduction()
updateProduction()
assignCast()
assignCrew()

Hook

Use when stateful behavior/data-fetching logic is reused or makes a page
significantly cleaner.

Example:

useProductions()
usePermission()
useDebounce()

Do not create a custom hook for every API call just to increase
abstraction.

12. Full Frontend Request Flow

Example: Rahul creates a production.

Rahul opens Create Production
    ↓
Router verifies authenticated route
    ↓
Permission-aware UI checks productions.create
    ↓
CreateProductionPage
    ↓
ProductionForm
    ↓
User enters data
    ↓
Frontend Zod validation
    ├── invalid → show form errors
    └── valid
          ↓
production.service.createProduction(data)
          ↓
apiClient.post("/productions", data)
          ↓
HTTP-only auth cookie automatically included
          ↓
Backend authentication
          ↓
Backend permission check
          ↓
Backend Zod validation
          ↓
Controller → Service → Repository → MongoDB
          ↓
JSON response
          ↓
production.service
          ↓
Page updates UI / navigates
          ↓
success feedback

13. Dashboard Architecture

Use a single dashboard shell and render widgets based on permissions.

Example:

DashboardPage
    ↓
currentUser.permissions
    ↓
┌─────────────────────────────┐
│ Production Manager          │
│                             │
│ Active Productions          │
│ Pending Fund Requests       │
│ Cast/Crew Summary           │
└─────────────────────────────┘

Do not spend excessive time building analytics. Basic useful cards are
enough.

14. Onboarding Frontend Flow

User logs in
    ↓
Check onboarding status
    ↓
No application / changes requested
    ↓
OnboardingPage
    ├── Welcome
    ├── Contractor Type
    ├── Personal Info
    ├── Financial Info
    ├── Documents
    └── Consent/Signature
          ↓
Submit
          ↓
PENDING_REVIEW
          ↓
Status Page

Admin side:

/admin/onboarding
    ↓
Pending applications table
    ↓
Application details
    ↓
Approve / Reject / Request Changes

Keep contractor type separate from role in frontend types and forms.

15. Production Frontend Flow

/productions
    ↓
Production list
    ↓
/productions/:id
    ├── overview
    ├── characters
    ├── cast assignments
    ├── crew assignments
    ├── locations
    └── fund requests

Actions must be permission-aware.

Example:

productions.update
    ↓
show Edit button

cast.assign
    ↓
show Assign Cast button

funds.request
    ↓
show Request Fund button

16. Location Frontend Flow

/locations
    ↓
Location list
    ↓
Location details
    ↓
Create/Edit based on permissions

For production usage:

Production Details
    ↓
Request Location
    ↓
Choose Location + Dates
    ↓
Submit LocationRequest
    ↓
Location Manager review

Show conflict errors returned by the backend rather than trying to make
the browser the source of truth for availability.

17. Fund Frontend Flow

Production Manager:

Production
    ↓
Create Fund Request
    ↓
Submitted

Finance Manager:

/funds
    ↓
Pending requests
    ↓
Open request
    ↓
Approve / Reject

Only render approval controls when the user has the appropriate
permission.

18. Costume Frontend Flow

Costume Manager:

/costumes
    ↓
Inventory
    ↓
Create/Edit Costume
    ↓
Assign Costume
    ↓
Choose Production
    ↓
Choose Cast/Character
    ↓
Submit

Backend remains responsible for inventory availability checks.

19. Shared Components

Good shared candidates:

Button
Input
Select
Modal
Table
Pagination
Loading
EmptyState
StatusBadge
ConfirmDialog
PageHeader
Sidebar
Navbar
ProtectedRoute
PermissionGuard

Do not move feature-specific components into shared/.

Example:

CostumeAssignmentForm

belongs in:

features/costumes/components/

not shared/components/.

20. State Management Rules

Use Zustand for genuinely global state:

Authentication/user
UI/sidebar

Prefer local component state for:

modal open/close
form input state
single-page filters
temporary selections

Do not create a Zustand store for every feature unless multiple distant
components need the same state.

Server data does not automatically need to live globally.

21. Error Handling

API errors should produce useful UI.

Example:

400 → show validation/message
401 → user is unauthenticated; redirect/login handling
403 → show access denied
404 → not found
409 → show business conflict, e.g. location already booked
500 → generic failure message

Do not expose raw stack traces.

22. What to Reuse from BookMyVenue

Reuse:

feature-based organization

app/router

layouts

global Axios client

withCredentials

Zustand auth/user state

ProtectedRoute pattern

shared UI components

feature services

Zod form schemas

lazy-loaded route pages where easy

Do not blindly reuse:

venue booking UI

payments

wishlist

Google OAuth

wallet

map libraries unless required

image cropper

complex refresh/Redis assumptions unless backend uses them

23. Frontend Design Rules for the AI Agent

Read this architecture before changing frontend code.

Keep business features inside features/.

Use the shared Axios apiClient.

Do not make raw Axios instances inside components.

Keep route-level screens in pages/.

Keep feature-specific reusable UI in that feature's components/.

Keep global state minimal.

Do not store JWT tokens in localStorage when backend uses HTTP-only
cookies.

Use permissions to filter navigation and actions.

Never treat frontend permission checks as sufficient security.

Keep contractor type and system role as separate concepts.

Use frontend Zod validation for UX; backend still validates
everything.

Do not add libraries or abstractions without a concrete need.

Do not build bonus features before core workflows.

Preserve the BookMyVenue feature-based architecture while adapting
it to the Tendagon domain.

24. Architecture Summary

                         REACT APPLICATION
                                │
                         App Router/Layout
                                │
                    Protected/Permission Route
                                │
                             Feature Page
                                │
                    ┌───────────┴───────────┐
                    ↓                       ↓
             Feature Components        Feature Hooks
                    │                       │
                    └───────────┬───────────┘
                                ↓
                         Feature Service
                                ↓
                         Axios apiClient
                                ↓
                          Express Backend

The frontend is organized by business feature. The backend is organized
by application layer. This intentionally follows the same broad
BookMyVenue architecture so the codebase remains familiar under the
machine-task deadline.