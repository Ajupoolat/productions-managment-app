# Tendagon Film Production Management Platform

## 1. Project Overview

This project is a machine task for building a web-based internal
management platform for a film production company.

The platform manages:

- Users
- Contractor onboarding
- System roles
- Permissions / RBAC
- Film productions
- Cast
- Crew
- Characters
- Locations
- Location requests/bookings
- Fund requests and approvals
- Costume inventory
- Costume assignments
- Audit logs
- Notifications

The application is an internal operational platform for a production
company that may manage multiple film productions simultaneously.

A production can be in different stages such as:

- Development
- Pre-Production
- Production
- Post-Production
- Completed
- Archived

---

# 2. Critical Concept: Contractor Type != System Role

These two concepts MUST remain separate.

## Contractor Type

Contractor Type describes what kind of person is onboarding.

Allowed contractor types:

- Freelancer
- Cast
- Supplier
- Cast-Crew Agent
- TCS Team
- Intern

These are NOT RBAC roles.

## System Role

System Role describes what the user is allowed to do inside the application.

Example roles:

- Super Admin
- Production Manager
- Finance Manager
- Location Manager
- Costume Manager
- Cast
- Crew

A user can have:

Contractor Type = Cast

and:

System Role = Cast

But these concepts must be stored and handled separately.

---

# 3. RBAC Model

The authorization model is:

User
  ↓
Role
  ↓
Permissions

A User has a role.

A Role contains a collection of permissions.

Permissions define the actions a user can perform.

Example:

Rahul
  ↓
Production Manager
  ↓
productions.view
productions.create
productions.update
funds.view
funds.request

The Super Admin manages users, roles and permissions.

The backend must enforce permissions through reusable authorization
middleware/guards.

Do NOT implement authorization by scattering role checks throughout
controllers.

Prefer:

requirePermission("productions.create")

instead of:

if (user.role === "Production Manager") { ... }

---

# 4. Authentication

Users authenticate using:

- Email
- Password
- JWT
- HTTP-only cookie

Passwords must be hashed.

The backend should provide reusable authentication middleware.

Client
  ↓
HTTP Request
  ↓
Authentication Middleware
  ↓
Identify User
  ↓
Load Role / Permissions
  ↓
Permission Middleware
  ↓
Validation Middleware / DTO
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Mongoose Model
  ↓
MongoDB

---

# 5. User Onboarding

A new user:

1. Signs up
2. Logs in
3. Selects a Contractor Type
4. Completes onboarding
5. Submits onboarding
6. Onboarding becomes Pending Review
7. Super Admin reviews it
8. Super Admin can:
   - Approve
   - Reject
   - Request Changes
9. After approval, the user can be assigned an appropriate System Role

Onboarding contains:

- Welcome/instructions
- Personal information
- Financial information
- Documents
- Signature/consent
- Completion/submission

Onboarding status:

- Pending Review
- Approved
- Rejected
- Changes Requested

Onboarding status and User account status are separate concepts.

---

# 6. Super Admin

Super Admin is a SYSTEM ROLE.

The initial Super Admin account should be created through seed data,
not by hard-coding a specific email into authorization logic.

Super Admin has broad system-level access.

Example areas:

- Users
- Roles
- Permissions
- Onboarding
- Productions
- Locations
- Funds
- Costumes
- Audit Logs

The Super Admin is not necessarily the day-to-day manager of every film.

---

# 7. Production Manager

Production Manager is a SYSTEM ROLE.

A Production Manager manages the operational side of productions.

A single Production Manager may manage multiple productions.

Example:

Rahul
  ↓
Production Manager
  ↓
Film A
Film B
Film C

A Production contains:

- Name
- Description
- Status
- Start date
- End date
- Production Manager
- Budget
- Notes

Production statuses:

- Development
- Pre-Production
- Production
- Post-Production
- Completed
- Archived

A Production Manager should only modify productions they are
authorized to manage.

---

# 8. Cast

Cast members are assigned to productions and characters.

Example:

Riya
  ↓
Film A
  ↓
Heroine

Use a CastAssignment entity because the relationship contains
additional information such as:

- User
- Production
- Character
- Assignment status
- Assignment date

Do not interpret CastAssignment as a generic task-management system.

---

# 9. Crew

Crew members are assigned to productions with:

- Department
- Position

Example:

Arun
  ↓
Film A
  ↓
Department: Camera
Position: Cinematographer

Use a CrewAssignment entity.

---

# 10. Location Management

Location Manager is a SYSTEM ROLE.

Locations contain information such as:

- Name
- Address
- Coordinates
- Contact information
- Rental cost
- Availability
- Permit information

The location workflow can involve:

Location
  ↓
Location Request
  ↓
Review
  ↓
Approval
  ↓
Booking

A LocationRequest is used because the relationship between a
Production and Location contains business information such as:

- Production
- Location
- Requested by
- Start date
- End date
- Status
- Permit status
- Approval information

The system should prevent conflicting location bookings.

---

# 11. Finance Management

Finance Manager is a SYSTEM ROLE.

Finance is represented through FundRequest entities.

Example:

Production Manager
  ↓
Fund Request
  ↓
Finance Manager
  ↓
Approve / Reject

FundRequest contains:

- Production
- Requester
- Category
- Requested amount
- Approved amount
- Reason
- Required date
- Status
- Approver
- Rejection reason

Fund workflow:

Submitted
  ↓
Under Review
  ↓
Approved / Rejected
  ↓
Paid (if implemented)

A user should not approve their own fund request.

---

# 12. Costume Management

Costume Manager is a SYSTEM ROLE.

Costume inventory contains:

- Name
- Category
- Size
- Quantity
- Condition
- Storage location
- Cost
- Status

CostumeAssignment connects:

- Costume
- Production
- Cast user
- Character

Example:

Red Dress
  ↓
Riya
  ↓
Heroine
  ↓
Film A

The system should prevent assigning unavailable costume inventory.

---

# 13. Audit Logs

Important actions should create audit records.

AuditLog contains:

- userId
- action
- module
- resourceType
- resourceId
- metadata
- timestamp

resourceId is the ID of the specific resource affected by the action.

Examples:

Production created:
resourceType = Production
resourceId = Production._id

Fund approved:
resourceType = FundRequest
resourceId = FundRequest._id

Costume assigned:
resourceType = CostumeAssignment
resourceId = CostumeAssignment._id

---

# 14. Notifications

Implement a basic in-app notification system.

Examples:

- Onboarding approved
- Production assignment
- Fund approval
- Location approval
- Costume assignment

Real-time WebSocket notifications and email notifications are not
required for the core implementation.

---

# 15. Architecture

Use the existing familiar BookMyVenue architectural pattern.

Backend:

Route
  ↓
Controller
  ↓
DTO / Zod validation
  ↓
Service
  ↓
Repository
  ↓
Mongoose Model
  ↓
MongoDB

Frontend should use feature-based organization.

Do not redesign the architecture unless there is a concrete problem.

---

# 16. Backend Stack

- TypeScript
- Node.js
- Express
- MongoDB
- Mongoose
- Zod
- JWT
- HTTP-only Cookie Authentication
- bcrypt
- CORS
- Controller
- Service
- Repository
- DTO
- Middleware

---

# 17. Frontend Stack

- React
- TypeScript
- React Router
- Zustand
- Axios
- Tailwind CSS
- Zod
- Lucide React

---

# 18. Core Database Entities

Expected core entities:

- User
- Role
- Permission
- OnboardingApplication
- Document
- Production
- Character
- CastAssignment
- CrewAssignment
- Location
- LocationRequest
- FundRequest
- Costume
- CostumeAssignment
- AuditLog
- Notification

Do not create unnecessary entities unless a real business requirement
requires them.

---

# 19. Important Relationships

User
  └── roleId → Role

Role
  └── permissionIds → Permission

User
  └── OnboardingApplication

Production
  └── productionManagerId → User

Production
  └── Character

CastAssignment
  ├── productionId → Production
  ├── userId → User
  └── characterId → Character

CrewAssignment
  ├── productionId → Production
  └── userId → User

LocationRequest
  ├── productionId → Production
  └── locationId → Location

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

---

# 20. Development Priority

Build in this order:

1. Project setup
2. Database models and relationships
3. Roles and permissions seed
4. Authentication
5. Authorization middleware
6. User onboarding
7. Productions
8. Cast/Crew assignments
9. Locations
10. Fund requests
11. Costumes
12. Audit logs
13. Notifications
14. Frontend dashboards
15. Testing
16. README

Do not build bonus features before the core workflows work.

---

# 21. Important Development Rule

Do not implement the entire application in one step.

Work one bounded feature at a time.

Before implementing each feature:

1. Understand the requirement
2. Identify affected entities
3. Design/update the model
4. Implement repository
5. Implement service
6. Implement controller
7. Implement routes
8. Add authorization
9. Add frontend UI
10. Test the complete flow

Do not invent requirements that are not present in this context.

When a requirement is ambiguous, explicitly identify the assumption
before implementing it.