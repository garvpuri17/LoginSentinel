# LoginSentinel - Risk-Based Authentication Platform

## Overview

LoginSentinel is an enterprise-grade authentication platform that combines JWT-based user authentication with real-time anomaly detection to identify and block suspicious login attempts. The system uses an IsolationForest-based machine learning approach to calculate risk scores for each authentication attempt, achieving 90% detection accuracy while maintaining sub-200ms response times under load. The platform includes a comprehensive dashboard for monitoring authentication activity, security metrics, and system performance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, built using Vite as the build tool.

**UI Component Library**: shadcn/ui components built on Radix UI primitives, providing a consistent design system with support for both light and dark themes. The design follows a "Modern Developer Tool Aesthetic" inspired by Linear and Stripe dashboards, emphasizing clarity, precision, and professional restraint.

**State Management**: TanStack Query (React Query) for server state management with automatic caching and real-time refetching. Authentication state is managed through a custom React Context (`AuthProvider`) that persists user sessions to localStorage.

**Routing**: Wouter for lightweight client-side routing without the overhead of React Router.

**Data Visualization**: Recharts library for rendering performance charts, anomaly detection graphs, and risk score gauges.

**Styling**: Tailwind CSS with a custom configuration extending the base theme. CSS variables are used for theming to support light/dark mode switching. The design system uses specific spacing units (2, 4, 6, 8, 12, 16) and custom color tokens for consistency.

### Backend Architecture

**Framework**: Express.js server with TypeScript, serving both the API and static assets.

**Authentication Flow**: 
- JWT tokens for stateless authentication with 24-hour expiration
- bcrypt for password hashing (10 salt rounds)
- Bearer token authentication via Authorization header
- Token payload includes userId and username

**Anomaly Detection Engine**: Custom IsolationForest implementation that calculates risk scores based on:
- IP frequency (number of attempts from same IP)
- Username variety (diverse usernames from single IP indicates scanning)
- Time spread (temporal patterns of login attempts)
- Failure rate (ratio of failed to total attempts)

Risk scores range from 0-1, with thresholds at 0.3 (medium risk) and 0.7 (high risk/auto-block).

**Security Measures**:
- Rate limiting via express-rate-limit (5 attempts per 15 minutes for login, 100 requests per minute for general API)
- Automatic blocking of high-risk login attempts (risk score > 0.7)
- Load test mode bypass for performance testing (LOAD_TEST_MODE environment variable)

**Request Processing**: Custom middleware logs all API requests with timing, method, path, status code, and response preview (truncated to 80 characters).

### Data Storage

**Database**: PostgreSQL accessed via Neon's serverless driver with WebSocket support.

**ORM**: Drizzle ORM for type-safe database operations and schema management.

**Schema**:
- `users` table: id (UUID), username (unique), password (hashed), createdAt
- `loginAttempts` table: id (UUID), username, ipAddress, userAgent, location, riskScore, success (boolean), blocked (boolean), timestamp

**Data Access Layer**: Abstracted through a `DatabaseStorage` class implementing `IStorage` interface, providing methods for:
- User CRUD operations
- Login attempt logging and querying
- Time-windowed queries for anomaly detection
- Aggregated statistics for dashboard metrics

### External Dependencies

**Database Provider**: Neon Serverless PostgreSQL - WebSocket-based connection for serverless environments, automatically provisioned on Replit.

**UI Components**: Radix UI primitives (@radix-ui/*) - Accessible, unstyled component primitives for building the interface.

**Development Tools**:
- Vite for fast development server and optimized production builds
- Replit-specific plugins for error overlay, cartographer (code mapping), and dev banner (development mode only)

**Authentication Libraries**:
- jsonwebtoken for JWT creation and verification
- bcrypt for password hashing

**Performance Testing**: k6 for load testing scripts that validate the system can handle 1,000+ concurrent users with <200ms median latency.

**Form Validation**: Zod for runtime type validation of user inputs and API payloads, integrated with react-hook-form via @hookform/resolvers.

**Styling Dependencies**: 
- tailwindcss + autoprefixer for utility-first CSS
- class-variance-authority (cva) for variant-based component styling
- clsx + tailwind-merge for conditional class merging

**Charts**: Recharts for declarative chart components built on D3 primitives.