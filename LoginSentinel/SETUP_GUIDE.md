# LoginSentinel - Complete Setup Guide

This guide walks you through setting up LoginSentinel from scratch, whether you're a recruiter evaluating the project or a developer looking to run it locally.

## 📋 Table of Contents
- [System Requirements](#system-requirements)
- [Quick Start (5 minutes)](#quick-start-5-minutes)
- [Detailed Setup](#detailed-setup)
- [Database Configuration](#database-configuration)
- [Environment Variables](#environment-variables)
- [Creating Demo Data](#creating-demo-data)
- [Running Load Tests](#running-load-tests)
- [Troubleshooting](#troubleshooting)

## System Requirements

Before you begin, ensure you have:

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))
- **npm** or **yarn** (comes with Node.js)

Optional for load testing:
- **k6** ([Installation guide](https://k6.io/docs/getting-started/installation/))

## Quick Start (5 minutes)

For recruiters who want to see the app running immediately:

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/loginsentinel.git
cd loginsentinel

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and add your DATABASE_URL and SESSION_SECRET

# 4. Set up database
npm run db:push

# 5. Create admin account with sample data
npm run seed:admin

# 6. Start the application
npm run dev
```

**Open your browser**: Navigate to `http://localhost:5000`

**Login credentials**:
- Username: `admin`
- Password: `admin123`

You should now see the dashboard with 50+ sample login attempts and analytics!

## Detailed Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/loginsentinel.git
cd loginsentinel
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- Express.js for the backend
- React for the frontend
- Drizzle ORM for database operations
- JWT and bcrypt for authentication
- And more...

### 3. Database Configuration

#### Option A: Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Create a new database
createdb loginsentinel

# Or using psql
psql -U postgres
CREATE DATABASE loginsentinel;
\q
```

Your `DATABASE_URL` will look like:
```
postgresql://username:password@localhost:5432/loginsentinel
```

#### Option B: Hosted PostgreSQL (Recommended for Demo)

Use a free PostgreSQL hosting service:

**Neon (Recommended)**:
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string

**Supabase**:
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Get the connection string from Settings → Database

**Railway**:
1. Sign up at [railway.app](https://railway.app)
2. Create a PostgreSQL database
3. Copy the DATABASE_URL

### 4. Environment Variables

Create a `.env` file in the root directory:

```bash
# Database Connection
DATABASE_URL=postgresql://user:password@host:port/database

# JWT Secret (generate a random string)
SESSION_SECRET=your-super-secret-jwt-key-change-this

# Optional: Enable load test mode (disables rate limiting)
LOAD_TEST_MODE=false
```

**Generating a SESSION_SECRET**:
```bash
# On Linux/Mac
openssl rand -base64 32

# Or use any random string generator
```

### 5. Database Migration

Push the database schema to your PostgreSQL instance:

```bash
npm run db:push
```

This creates the necessary tables:
- `users` - User accounts
- `login_attempts` - Login history with risk scores

### 6. Create Admin Account & Sample Data

Run the seed script to create an admin account and populate sample data:

```bash
tsx server/seed-admin.ts
```

This creates:
- ✅ Admin account (username: `admin`, password: `admin123`)
- ✅ 50 sample login attempts with varying risk scores
- ✅ Mix of successful and failed logins
- ✅ High-risk anomaly examples

### 7. Start the Application

```bash
npm run dev
```

The application starts on `http://localhost:5000`

**What's running:**
- ✅ Express backend on port 5000
- ✅ Vite dev server for React frontend
- ✅ Hot module replacement (HMR) enabled
- ✅ Database connection established

## Creating Demo Data

If you want to generate additional test data:

```bash
# Run the seed script again (generates 50 more attempts)
tsx server/seed-admin.ts
```

Or create custom data using the API:

```bash
# Register a new user
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## Running Load Tests

LoginSentinel includes k6 load tests to verify performance claims.

### 1. Install k6

**macOS**:
```bash
brew install k6
```

**Linux**:
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg \
  --keyserver hkp://keyserver.ubuntu.com:80 \
  --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] \
  https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

**Windows**:
```bash
choco install k6
```

### 2. Run Load Tests

```bash
# Enable load test mode (disables rate limiting)
export LOAD_TEST_MODE=true

# Run the test
./loadtests/run-test.sh
```

The test simulates:
- 100 → 500 → 1,000 → 1,250 concurrent users
- Registration and login flows
- Metrics API calls

**Expected Results**:
- ✅ p95 latency < 200ms
- ✅ p99 latency < 300ms
- ✅ 1,000+ requests/second
- ✅ Error rate < 10%

## Troubleshooting

### Issue: "Cannot connect to database"

**Solution**:
1. Verify DATABASE_URL is correct
2. Check PostgreSQL is running: `pg_isready`
3. Test connection: `psql $DATABASE_URL`

### Issue: "Port 5000 already in use"

**Solution**:
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9

# Or change the port in server/index.ts
```

### Issue: "Login credentials not working"

**Solution**:
1. Verify admin account exists:
   ```bash
   psql $DATABASE_URL -c "SELECT username FROM users WHERE username='admin';"
   ```
2. Re-run seed script:
   ```bash
   tsx server/seed-admin.ts
   ```
3. Clear browser localStorage and try again

### Issue: "Module not found" errors

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue: Load tests fail with 429 errors

**Solution**:
Ensure `LOAD_TEST_MODE=true` is set before running tests:
```bash
export LOAD_TEST_MODE=true
./loadtests/run-test.sh
```

## Production Deployment

For production deployment:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Set production environment variables**:
   ```bash
   export NODE_ENV=production
   export DATABASE_URL=your-production-db-url
   export SESSION_SECRET=your-production-secret
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Optional**: Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name loginsentinel
   ```

## Next Steps

- 📖 Read the [main README](README.md) for feature documentation
- 🧪 Explore the [load test documentation](loadtests/README.md)
- 🔒 Review security configurations in `server/rate-limit.ts` and `server/anomaly-detection.ts`
- 🎨 Check the frontend code in `client/src/`

## Support

For issues or questions:
- Open an issue on GitHub
- Review the code documentation
- Check the inline comments in source files

---

**Happy coding!** 🚀
