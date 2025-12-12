# Chazon Backend Documentation

## 1. Project Overview

The Chazon backend is a robust, scalable serverless API built with Next.js (App Router), designed to power a two-sided marketplace similar to TaskRabbit. It connects Users (Clients) with vetted Stewards (Taskers) for local services, handling complex workflows from real-time matching to secure payments.

### Core Objectives
- **Smart Matching**: Connect clients with the best-suited Stewards based on location, skills, and availability.
- **Trust & Safety**: Integrated background checks, identity verification, and insurance workflows.
- **Real-Time Operations**: Live chat, location tracking, and instant booking updates.
- **Financial Integrity**: Secure escrow-style payments, dynamic pricing, and automated payouts.

### Technology Stack
- **Runtime**: Node.js (via Next.js Serverless Functions)
- **Framework**: Next.js 14 (App Router API Routes)
- **Language**: TypeScript
- **Database**: PostgreSQL with PostGIS (for geospatial queries)
- **ORM**: Prisma
- **Real-time**: Pusher / Socket.io (for Chat & Tracking)
- **Storage**: AWS S3 (for Evidence/Media)
- **Payments**: Stripe Connect (Marketplace logic)
- **Background Jobs**: Redis / BullMQ (for notifications & payouts)

---

## 2. API Features

The API provides a comprehensive set of endpoints to manage the entire lifecycle of a task.

### Authentication & Identity
- **Multi-Factor Auth (MFA)**: SMS/Email verification for high-value actions.
- **Identity Verification**: Integration with 3rd party providers (e.g., Checkr/Onfido).
- **Role Switching**: Seamless toggle between Client and Steward modes.

### Key Endpoints

#### Smart Discovery & Matching
- `GET /api/match` - Algorithmic matching based on lat/lng, category, and time window.
- `GET /api/stewards/availability` - Query complex calendar slots.
- `POST /api/tasks/instant` - "Book Now" feature for urgent tasks.

#### Task Management
- `POST /api/tasks` - Create a new task request.
- `PATCH /api/tasks/[id]/negotiate` - Propose new time or price.
- `POST /api/tasks/[id]/check-in` - Steward marks arrival (GPS verified).
- `POST /api/tasks/[id]/complete` - Mark task done and trigger payment capture.

#### Real-Time Communication
- `POST /api/chat/channels` - Open a secure communication line.
- `POST /api/chat/messages` - Send text/image/location.
- `GET /api/notifications` - User activity feed.

#### Financials
- `POST /api/payments/hold` - Pre-authorize funds.
- `POST /api/payments/release` - Release funds to Steward.
- `POST /api/payments/tip` - Add gratuity after service.
- `GET /api/wallet` - Steward earnings and payout history.

#### Trust & Safety
- `POST /api/disputes` - Open a dispute for a task.
- `POST /api/verification/upload-id` - Submit government ID.
- `GET /api/background-check/status` - Check vetting progress.

---

## 3. Database Schema

The database utilizes PostgreSQL with extensions for advanced functionality.

### Entity-Relationship Diagram (ERD)

```mermaid
erDiagram
    User ||--o{ Task : "requests"
    User ||--o{ StewardProfile : "has"
    StewardProfile ||--o{ ServiceOffering : "offers"
    StewardProfile ||--o{ AvailabilitySlot : "defines"
    Task ||--o{ ChatMessage : "contains"
    Task ||--o{ Transaction : "generates"
    Task ||--o{ Dispute : "may_have"
    
    User {
        string id PK
        string email
        string phone
        boolean isIdentityVerified
        jsonb trustedContact
    }

    StewardProfile {
        string id PK
        string userId FK
        float rating
        int completedTasks
        float acceptanceRate
        string backgroundCheckStatus
        geography location "PostGIS Point"
    }

    Task {
        string id PK
        string clientId FK
        string stewardId FK
        string status "OPEN | ASSIGNED | IN_PROGRESS | DONE | DISPUTED"
        float agreedPrice
        string pricingType "HOURLY | FLAT"
        datetime scheduledStart
        datetime actualStart
        datetime actualEnd
    }

    Transaction {
        string id PK
        string taskId FK
        float amount
        float platformFee
        string type "CHARGE | PAYOUT | REFUND"
        string status
    }
```

### Advanced Tables
1.  **StewardProfile**: Stores specialized metrics (reliability score, elite status) and location data.
2.  **ServiceOffering**: Maps a Steward to a Category with specific pricing (e.g., "Cleaning" @ 50k UGX/hr).
3.  **AvailabilitySlot**: Stores recurring and one-off working hours.
4.  **Dispute**: Tracks conflict resolution workflow and evidence.
5.  **AuditLog**: Immutable record of all critical actions (booking, cancellation, payment).

---

## 4. Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (with PostGIS extension enabled)
- Redis (for queues)

### Environment Configuration
```env
# Core
DATABASE_URL="postgresql://user:pass@localhost:5432/chazon"
NEXTAUTH_SECRET="secure-key"

# Services
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_CONNECT_ID="ca_..."
AWS_ACCESS_KEY_ID="AKIA..."
PUSHER_APP_ID="12345"

# Geo
GOOGLE_MAPS_API_KEY="AIza..."
```

### Local Development
1.  **Install dependencies**: `npm install`
2.  **Start DB containers**: `docker-compose up -d db redis`
3.  **Run migrations**: `npx prisma migrate dev`
4.  **Seed mock data**: `npm run seed` (Generates geo-distributed stewards)
5.  **Start Dev Server**: `npm run dev`

---

## 5. Testing Strategy

### Levels of Testing
- **Unit**: Business logic (Pricing calculator, Availability overlap).
- **Integration**: API endpoints with mock DB.
- **Geospatial**: Testing location queries (e.g., "Find stewards within 5km").
- **Concurrency**: Handling race conditions on "Instant Book" slots.

### Tools
- **Jest**: Test runner.
- **Supertest**: HTTP assertions.
- **Stripe-Mock**: Simulating payment webhooks.

---

## 6. Deployment & Scaling

### Architecture
- **API Layer**: Stateless Next.js functions (Auto-scaling).
- **Worker Layer**: Node.js workers processing queues (Email, SMS, Payouts).
- **Real-time Layer**: Dedicated WebSocket server or Managed Service (Pusher).

### CI/CD Pipeline (GitHub Actions)
1.  **Code Quality**: ESLint, Prettier, TypeCheck.
2.  **Security Scan**: Dependency vulnerability check (Snyk).
3.  **Test Suite**: Run all unit and integration tests.
4.  **Build & Push**: Create Docker images for API and Workers.
5.  **Deploy**: Blue/Green deployment to ensure zero downtime.

---

## 7. API Documentation & Error Handling

### Standard Response Format
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "pagination": { "page": 1, "total": 50 }
  }
}
```

### Error Reference
- `402 Payment Required`: Failed to capture funds.
- `409 Conflict`: Scheduling conflict (Double booking).
- `422 Unprocessable Entity`: Validation failed (e.g., Task time in past).
- `429 Too Many Requests`: Rate limit exceeded.

### Webhooks
The system consumes webhooks from:
- **Stripe**: Payment success/failure.
- **Checkr**: Background check completion.
- **Twilio**: SMS delivery status.
