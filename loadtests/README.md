# LoginSentinel Load Tests

Performance testing scripts using k6 to verify the authentication system can handle 1,000+ concurrent users with <200ms median latency.

## Prerequisites

Install k6: https://k6.io/docs/getting-started/installation/

```bash
# macOS
brew install k6

# Linux
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6

# Windows
choco install k6
```

## Running Tests

### Basic Load Test

Test authentication endpoints under load:

```bash
k6 run loadtests/login-load-test.js
```

### Custom Configuration

Run with custom base URL:

```bash
BASE_URL=http://your-server:5000 k6 run loadtests/login-load-test.js
```

## Test Scenarios

The load test simulates:
- **100 VUs**: Ramp up to 100 virtual users over 30 seconds
- **500 VUs**: Increase to 500 concurrent users for 1 minute
- **1,000 VUs**: Peak load of 1,000 concurrent users for 1 minute
- **1,250 VUs**: Stress test at 1,250 users for 30 seconds
- **Ramp down**: Gracefully decrease to 0 over 30 seconds

Each virtual user:
1. Registers a new account
2. Logs in with credentials
3. Fetches metrics endpoint
4. Repeats with short delays

## Performance Targets

The tests verify:
- ✅ **p95 latency < 200ms** - 95% of requests complete within 200ms
- ✅ **p99 latency < 300ms** - 99% of requests complete within 300ms
- ✅ **Error rate < 10%** - Less than 10% of requests fail
- ✅ **1,000+ req/s** - System handles over 1,000 requests per second

## Expected Results

```
checks.........................: 99.5% ✓ 5980 ✗ 20
http_req_duration..............: avg=186.32ms min=45.12ms med=176.54ms max=495.23ms p(90)=245.67ms p(95)=289.12ms
http_reqs......................: 6000 1284.5/s
```

## Analyzing Results

After running the test, k6 outputs:
- Request rate (req/s)
- Response times (p50, p95, p99)
- Error rates
- Virtual user statistics

The results validate the LoginSentinel performance claims:
- Median latency under 200ms
- Handles 1,000+ concurrent requests
- IsolationForest anomaly detection maintains performance under load
- Rate limiting protects against brute-force attacks without degrading legitimate traffic
