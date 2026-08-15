User
This is the central person.
User
──────
_id
fullName
email
password
contractorType
roleId
status
isActive
createdAt
updatedAt
Example:
Rahul
contractorType = TCS_TEAM
roleId = Production Manager
Or:
Riya
contractorType = CAST
roleId = Cast

4. Role
Role
──────
_id
name
description
permissionIds[]
isActive
Example:
Production Manager
    │
    ├── productions.view
    ├── productions.create
    ├── productions.update
    ├── cast.view
    ├── cast.assign
    ├── crew.view
    ├── crew.assign
    ├── funds.view
    └── funds.request

5. Permission
Permission
──────────────
_id
key
description
module
action
Example:
{
  key: "funds.approve",
  module: "funds",
  action: "approve"
}
Relationship:
User
 ↓
roleId
 ↓
Role
 ↓
permissionIds
 ↓
Permission
This is the core of the entire machine task.
The task explicitly requires roles to contain collections of permissions and administrators to manage those assignments.

6. OnboardingApplication
This is separate from User.
OnboardingApplication
──────────────────────

_id
userId
contractorType
personalInformation
financialInformation
signature
status
reviewedBy
reviewedAt
reviewComments
createdAt
updatedAt

Relationship:
User
 │
 │ 1
 ↓
OnboardingApplication
Workflow:
PENDING
   ↓
APPROVED
or:
PENDING
   ↓
REJECTED
or:
PENDING
   ↓
CHANGES_REQUESTED

7. Production
This is the central business entity.
Production
────────────
_id
name
description
status
startDate
endDate
budget
productionManagerId
notes
createdAt
updatedAt
Relationship:
User
 │
 │ Production Manager
 │
 ├─────────────┐
 ↓             ↓
Film A        Film B
So yes:
One Production Manager → many Productions
while:
One Production → one primary Production Manager
For your MVP.

8. Character
A film can have characters.
Character
───────────
_id
productionId
name
description
Example:
Film A
 ├── Heroine
 ├── Villain
 └── Father

9. CastAssignment
Don't put a huge cast[] object inside Production.
Use an assignment collection.
CastAssignment
───────────────
_id
productionId
userId
characterId
status
assignedAt
Relationship:
Production
    │
    └── CastAssignment
            │
       ┌────┴────┐
       ↓         ↓
      User    Character
Example:
Riya
 ↓
Heroine
 ↓
Film A

10. CrewAssignment
CrewAssignment
──────────────
_id
productionId
userId
department
position
status
assignedAt
Example:
Arun
 ↓
Film A
 ↓
Camera
 ↓
Cinematographer
This directly represents the cast/crew assignment requirements.

11. Location
Location
─────────
_id
name
address
coordinates
contactName
contactNumber
rentalCost
availability
permitInformation
status
createdBy
The task expects location details such as address, coordinates, contact information, rental cost, availability and permit information.

12. LocationRequest / Booking
You need something connecting:
Production
      ↓
Location
So:
LocationRequest
────────────────
_id
productionId
locationId
requestedBy
startDate
endDate
status
permitStatus
approvedBy
approvedAt
Relationship:
Production
    │
    ↓
LocationRequest
    │
    ↓
Location
This is better than putting locationIds[] directly inside Production because you need request/approval/booking state.

13. FundRequest
FundRequest
────────────
_id
productionId
requestedBy
category
requestedAmount
approvedAmount
reason
requiredDate
status
approvedBy
approvedAt
rejectionReason
Relationship:
Production
    │
    ↓
FundRequest
    │
    ├── requestedBy → User
    └── approvedBy  → User
Workflow:
SUBMITTED
    ↓
UNDER_REVIEW
    ↓
APPROVED / REJECTED
The task explicitly describes this workflow.

14. Costume
Costume
─────────
_id
name
category
size
quantity
condition
storageLocation
cost
status
Example:
Red Dress
Quantity: 5
Available: 2

15. CostumeAssignment
CostumeAssignment
─────────────────
_id
costumeId
productionId
castUserId
characterId
assignedAt
returnDate
conditionBefore
conditionAfter
status
Relationship:
Costume
   │
   ↓
CostumeAssignment
   │
   ├── Production
   ├── Cast User
   └── Character
Example:
Red Dress
   ↓
Riya
   ↓
Heroine
   ↓
Film A
The task explicitly requires costume assignment and tracking return/condition information.

16. Document
You can keep this simple.
Document
─────────
_id
onboardingId
type
url
fileName
uploadedAt
For example:
Riya
 ↓
Onboarding
 ↓
Passport
 ↓
Cloudinary URL
Don't build a sophisticated document management system.

17. AuditLog
AuditLog
─────────
_id
userId
action
module
resourceType
resourceId
metadata
createdAt
Example:
User: Rahul
Action: FUND_REQUEST_CREATED
Resource: FundRequest
ResourceId: abc123
The task explicitly requires audit records for important actions.

18. Notification
Notification
─────────────
_id
userId
type
title
message
isRead
metadata
createdAt
Example:
Riya
 ↓
Notification