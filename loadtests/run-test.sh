#!/bin/bash

# Script to run k6 load tests with proper environment setup

echo "Starting LoginSentinel load test..."
echo "This will test authentication under load (up to 1,250 concurrent users)"
echo ""

export LOAD_TEST_MODE=true
export BASE_URL=${BASE_URL:-http://localhost:5000}

echo "Configuration:"
echo "  BASE_URL: $BASE_URL"
echo "  LOAD_TEST_MODE: enabled (rate limiting disabled for testing)"
echo ""

if ! command -v k6 &> /dev/null; then
    echo "Error: k6 is not installed"
    echo "Please install k6: https://k6.io/docs/getting-started/installation/"
    exit 1
fi

echo "Running load test..."
k6 run loadtests/login-load-test.js

echo ""
echo "Load test complete!"
echo "Check the results above to verify:"
echo "  ✓ p95 latency < 200ms"
echo "  ✓ p99 latency < 300ms"
echo "  ✓ Error rate < 10%"
echo "  ✓ Peak throughput > 1,000 req/s"
