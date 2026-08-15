Tendagon Machine Task --- Backend Architecture

1. Purpose

This backend architecture adapts the familiar BookMyVenue layered
backend to the Tendagon Film Production Management Platform.

The architectural direction is:

Route → Middleware → Controller → Service → Repository → Mongoose
Model → MongoDB

The goal is not to copy BookMyVenue feature-for-feature. Reuse the
structure and request-flow patterns while removing unrelated complexity
such as payments, Redis OTP, wallets, Google OAuth, and cron jobs.

2. Backend Technology Stack

Node.js

TypeScript

Express

MongoDB

Mongoose

Zod

JWT

HTTP-only cookie authentication

bcryptjs

cookie-parser

cors

dotenv

Architectural concepts, not packages:

Controllers

Services

Repositories

DTOs / Zod schemas

Middleware

Centralized error handling

Constants and TypeScript types

3. Recommended Folder Structure

server/
├── src/
│   ├── app.ts
│   ├── server.ts
│   │
│   ├── configs/
│   │   ├── env.config.ts
│   │   └── db.config.ts
│   │
│   ├── constants/
│   │   ├── contractor-types.ts
│   │   ├── roles.ts
│   │   ├── permissions.ts
│   │   ├── production-status.ts
│   │   ├── onboarding-status.ts
│   │   ├── fund-status.ts
│   │   ├── location-status.ts
│   │   ├── costume-status.ts
│   │   └── audit-actions.ts
│   │
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── role.model.ts
│   │   ├── permission.model.ts
│   │   ├── onboarding.model.ts
│   │   ├── document.model.ts
│   │   ├── production.model.ts
│   │   ├── character.model.ts
│   │   ├── cast-assignment.model.ts
│   │   ├── crew-assignment.model.ts
│   │   ├── location.model.ts
│   │   ├── location-request.model.ts
│   │   ├── fund-request.model.ts
│   │   ├── costume.model.ts
│   │   ├── costume-assignment.model.ts
│   │   ├── audit-log.model.ts
│   │   └── notification.model.ts
│   │
│   ├── dto/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── roles/
│   │   ├── onboarding/
│   │   ├── productions/
│   │   ├── locations/
│   │   ├── funds/
│   │   └── costumes/
│   │
│   ├── repositories/
│   │   ├── user.repository.ts
│   │   ├── role.repository.ts
│   │   ├── permission.repository.ts
│   │   ├── onboarding.repository.ts
│   │   ├── production.repository.ts
│   │   ├── character.repository.ts
│   │   ├── cast-assignment.repository.ts
│   │   ├── crew-assignment.repository.ts
│   │   ├── location.repository.ts
│   │   ├── location-request.repository.ts
│   │   ├── fund-request.repository.ts
│   │   ├── costume.repository.ts
│   │   ├── costume-assignment.repository.ts
│   │   ├── audit-log.repository.ts
│   │   └── notification.repository.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── role.service.ts
│   │   ├── permission.service.ts
│   │   ├── onboarding.service.ts
│   │   ├── production.service.ts
│   │   ├── cast-crew.service.ts
│   │   ├── location.service.ts
│   │   ├── fund.service.ts
│   │   ├── costume.service.ts
│   │   ├── audit-log.service.ts
│   │   └── notification.service.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── role.controller.ts
│   │   ├── permission.controller.ts
│   │   ├── onboarding.controller.ts
│   │   ├── production.controller.ts
│   │   ├── location.controller.ts
│   │   ├── fund.controller.ts
│   │   ├── costume.controller.ts
│   │   ├── audit-log.controller.ts
│   │   └── notification.controller.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── permission.middleware.ts
│   │   ├── validate.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── not-found.middleware.ts
│   │
│   ├── routes/
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── users.routes.ts
│   │   ├── roles.routes.ts
│   │   ├── permissions.routes.ts
│   │   ├── onboarding.routes.ts
│   │   ├── productions.routes.ts
│   │   ├── locations.routes.ts
│   │   ├── funds.routes.ts
│   │   ├── costumes.routes.ts
│   │   ├── audit-logs.routes.ts
│   │   └── notifications.routes.ts
│   │
│   ├── utils/
│   │   ├── AppError.ts
│   │   ├── asyncHandler.ts
│   │   ├── response.ts
│   │   ├── jwt.ts
│   │   └── auditLogger.ts
│   │
│   ├── types/
│   │   ├── express.d.ts
│   │   └── common.types.ts
│   │
│   └── seed/
│       ├── permissions.seed.ts
│       ├── roles.seed.ts
│       ├── users.seed.ts
│       └── index.ts
│
├── .env
├── .env.example
├── package.json
└── tsconfig.json

4. Responsibilities of Each Layer

Routes

Routes declare endpoints and compose middleware.

They should answer:

Which HTTP method?

Which URL?

Is authentication required?

Which permission is required?

Which Zod schema validates the request?

Which controller receives the validated request?

Example:

POST /api/productions
  → authenticate
  → requirePermission("productions.create")
  → validate(createProductionSchema)
  → productionController.create

Routes should contain no business logic.

Authentication Middleware

Reads the JWT from the HTTP-only cookie, verifies it, obtains the user
identity, loads the current user and their role/permissions, and
attaches the authenticated principal to req.user.

It answers:

Who is making this request?

Permission Middleware

Checks whether the authenticated user's role contains the required
permission.

Example:

requirePermission("funds.approve")

It answers:

Is this user generally allowed to perform this action?

Do not scatter checks such as if (role === "FINANCE_MANAGER") through
controllers.

Validation Middleware / DTO Layer

Zod validates body, params, and/or query.

It answers:

Is the incoming request structurally valid?

Example:

requestedAmount must be a positive number
productionId must be a valid ID
status must be an allowed enum

A Zod schema is runtime validation. An inferred TypeScript type can
serve as the DTO:

CreateProductionSchema → runtime validation
CreateProductionDTO    → compile-time data shape

Controllers

Controllers are thin HTTP adapters.

Responsibilities:

Read already-validated request data.

Read authenticated user information.

Call the appropriate service.

Send the HTTP response.

Controllers should not contain database queries or substantial business
rules.

Services

Services contain business rules and workflow decisions.

Examples:

Can Rahul modify this specific production?

Is the onboarding application in a state that can be approved?

Does a location booking overlap another booking?

Is the fund approver also the requester?

Is costume inventory available?

Should an audit log or notification be generated?

Authorization has two layers:

Permission middleware:
"Can this role perform productions.update?"

Service:
"Can this specific user update this specific production?"

Repositories

Repositories are the database-access layer.

Responsibilities:

findById

findByEmail

create

update

delete

filtered/paginated queries

conflict/overlap queries

Mongoose population where appropriate

Repositories should not make HTTP decisions.

Models

Mongoose models define persistence:

fields

references

enums

indexes

timestamps

database constraints

Models should not contain controller logic.

5. Full Request Flow

React Client
    ↓
HTTP Request
    ↓
Express Global Middleware
    ├── cors
    ├── express.json
    └── cookieParser
    ↓
Route
    ↓
Authentication Middleware
    ↓
JWT Cookie Verification
    ↓
Identify Current User
    ↓
Load Current Role + Permissions
    ↓
Permission Middleware
    ├── denied → 403
    └── allowed
          ↓
Zod Validation Middleware
    ├── invalid → 400
    └── valid
          ↓
Controller
    ↓
Service
    ├── business validation
    ├── resource-level authorization
    ├── workflow/state rules
    ├── audit-log orchestration
    └── notification orchestration
          ↓
Repository
    ↓
Mongoose Model
    ↓
MongoDB
    ↓
Repository Result
    ↓
Service Result
    ↓
Controller Response
    ↓
JSON Response
    ↓
React Client

Error flow:

Any layer throws AppError / validation / DB error
    ↓
Central Error Middleware
    ↓
Consistent JSON error response

6. Authentication Architecture

Keep the machine-task auth simpler than BookMyVenue unless existing code
can be reused safely.

Core flow:

Register
  ↓
hash password
  ↓
create User

Login
  ↓
find User
  ↓
compare password
  ↓
generate JWT
  ↓
set HTTP-only cookie

Protected Request
  ↓
read cookie
  ↓
verify JWT
  ↓
load live User + Role + Permissions
  ↓
attach req.user

A simple single-token cookie implementation is acceptable for the
deadline. Do not add Redis refresh-token rotation unless it already
exists and copying it genuinely saves time.

7. RBAC Architecture

Core relationship:

User
  ↓ roleId
Role
  ↓ permissionIds[]
Permission

Example:

Rahul
  ↓
Production Manager
  ├── productions.view
  ├── productions.create
  ├── productions.update
  ├── cast.assign
  ├── crew.assign
  └── funds.request

The backend enforces permissions. The Super Admin manages
role-permission assignments.

Permission examples:

users.view
users.update

roles.view
roles.manage

permissions.view
permissions.manage

onboarding.view
onboarding.review

productions.view
productions.create
productions.update

cast.assign
crew.assign

locations.view
locations.create
locations.update
locations.approve

funds.view
funds.request
funds.approve
funds.reject

costumes.view
costumes.create
costumes.update
costumes.assign

audit_logs.view

8. Core Data Relationships

User
  └── roleId → Role

Role
  └── permissionIds[] → Permission

User
  └── OnboardingApplication

Production
  └── productionManagerId → User

Character
  └── productionId → Production

CastAssignment
  ├── productionId → Production
  ├── userId → User
  └── characterId → Character

CrewAssignment
  ├── productionId → Production
  └── userId → User

LocationRequest
  ├── productionId → Production
  ├── locationId → Location
  ├── requestedBy → User
  └── approvedBy → User

FundRequest
  ├── productionId → Production
  ├── requestedBy → User
  └── approvedBy → User

CostumeAssignment
  ├── costumeId → Costume
  ├── productionId → Production
  ├── castUserId → User
  └── characterId → Character

AuditLog
  └── userId → User

Notification
  └── userId → User

Separate relationship entities are intentional when the relationship
itself has data.

For example:

Production + Location

needs dates, status, requester, approval and permit information,
therefore use LocationRequest instead of only locationIds[].

9. Example Flow --- Create Production

POST /api/productions
    ↓
authenticate()
    ↓
req.user = Rahul
    ↓
requirePermission("productions.create")
    ↓
validate(CreateProductionSchema)
    ↓
ProductionController.create()
    ↓
ProductionService.create()
    ├── apply business rules
    ├── productionManagerId = authenticated user where appropriate
    └── call repository
          ↓
ProductionRepository.create()
    ↓
ProductionModel.create()
    ↓
MongoDB
    ↓
AuditLog: PRODUCTION_CREATED
    ↓
Return Production

Do not trust client-controlled ownership fields when ownership should
come from the authenticated user.

10. Example Flow --- Approve Fund Request

PATCH /api/funds/:id/approve
    ↓
authenticate
    ↓
requirePermission("funds.approve")
    ↓
validate params/body
    ↓
FundController.approve
    ↓
FundService.approve
    ├── load FundRequest
    ├── verify current status permits approval
    ├── reject self-approval
    ├── set approvedAmount
    ├── set approvedBy
    ├── update status
    ├── create AuditLog
    └── create Notification for requester
          ↓
FundRepository.update
    ↓
MongoDB

11. Seed Architecture

Seed in dependency order:

1. Permissions
2. Roles + permission assignments
3. Users + role assignments
4. Optional sample productions/resources

Seed test accounts for:

Super Admin

Production Manager

Finance Manager

Location Manager

Costume Manager

Cast

Crew

The first Super Admin should be bootstrapped by seed data, not by
hard-coded email checks.

12. Error Handling

Use a central AppError and error middleware.

Examples:

400 BAD_REQUEST
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT_FOUND
409 CONFLICT
500 INTERNAL_SERVER_ERROR

Services throw meaningful application errors. Controllers do not
duplicate error formatting.

Use asyncHandler to avoid repetitive controller try/catch blocks.

13. What to Reuse from BookMyVenue

Reuse:

Controller → Service → Repository layering

Zod validation middleware

centralized error handling

Axios/cookie-compatible backend auth concepts

route aggregation

TypeScript types

constants

thin controllers

repository abstraction

Do not blindly reuse:

Razorpay

wallets

settlement logic

Redis OTP

Google OAuth

booking cron jobs

venue-specific parsing

duplicated Multer setup

unused DI dependencies

14. Backend Design Rules for the AI Agent

Read this architecture before changing backend code.

Do not bypass Service/Repository layers.

Controllers stay thin.

No direct Mongoose queries inside controllers.

Validate request input with Zod before controller logic.

Use reusable authenticate and requirePermission middleware.

Do not hard-code role checks when a permission check can represent
the rule.

Put resource-level authorization and business rules in services.

Do not trust ownership/approver IDs from the frontend when they
should come from req.user.

Generate audit logs for important state-changing actions.

Add notifications only where they support a real workflow.

Avoid unrelated packages and bonus features until core workflows
work.

Keep repository/export patterns consistent.

Keep service files focused; do not create a single giant service.

Preserve the BookMyVenue architecture pattern, not its unrelated
business logic.