import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m', target: 500 },
    { duration: '1m', target: 1000 },
    { duration: '30s', target: 1250 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    'http_req_duration{expected_response:true}': ['p(95)<200', 'p(99)<300'],
    errors: ['rate<0.1'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';

export default function () {
  const username = `testuser${Math.floor(Math.random() * 10000)}`;
  const password = 'testpassword123';
  
  const registerPayload = JSON.stringify({
    username: username,
    password: password,
  });
  
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const registerRes = http.post(
    `${BASE_URL}/api/register`,
    registerPayload,
    params
  );
  
  check(registerRes, {
    'registration status is 200': (r) => r.status === 200,
    'registration has token': (r) => JSON.parse(r.body).token !== undefined,
  }) || errorRate.add(1);
  
  sleep(0.1);
  
  const loginPayload = JSON.stringify({
    username: username,
    password: password,
  });
  
  const loginRes = http.post(
    `${BASE_URL}/api/login`,
    loginPayload,
    params
  );
  
  check(loginRes, {
    'login status is 200': (r) => r.status === 200,
    'login has token': (r) => JSON.parse(r.body).token !== undefined,
    'login has risk score': (r) => JSON.parse(r.body).riskScore !== undefined,
  }) || errorRate.add(1);
  
  sleep(0.5);
  
  const metricsRes = http.get(`${BASE_URL}/api/metrics`);
  
  check(metricsRes, {
    'metrics status is 200': (r) => r.status === 200,
    'metrics has anomaly rate': (r) => JSON.parse(r.body).anomalyDetectionRate !== undefined,
  }) || errorRate.add(1);
  
  sleep(0.5);
}

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    'loadtest-summary.json': JSON.stringify(data),
  };
}

function textSummary(data, opts) {
  const indent = opts.indent || '';
  const summary = [];
  
  summary.push(`${indent}checks.........................: ${(data.metrics.checks.values.passes / data.metrics.checks.values.count * 100).toFixed(2)}% ✓ ${data.metrics.checks.values.passes} ✗ ${data.metrics.checks.values.fails}`);
  summary.push(`${indent}data_received..................: ${(data.metrics.data_received.values.count / 1024 / 1024).toFixed(2)} MB`);
  summary.push(`${indent}data_sent......................: ${(data.metrics.data_sent.values.count / 1024 / 1024).toFixed(2)} MB`);
  summary.push(`${indent}http_req_duration..............: avg=${data.metrics.http_req_duration.values.avg.toFixed(2)}ms min=${data.metrics.http_req_duration.values.min.toFixed(2)}ms med=${data.metrics.http_req_duration.values.med.toFixed(2)}ms max=${data.metrics.http_req_duration.values.max.toFixed(2)}ms p(90)=${data.metrics.http_req_duration.values['p(90)'].toFixed(2)}ms p(95)=${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms`);
  summary.push(`${indent}http_reqs......................: ${data.metrics.http_reqs.values.count} ${(data.metrics.http_reqs.values.rate).toFixed(2)}/s`);
  summary.push(`${indent}iteration_duration.............: avg=${(data.metrics.iteration_duration.values.avg / 1000).toFixed(2)}s`);
  summary.push(`${indent}iterations.....................: ${data.metrics.iterations.values.count}`);
  summary.push(`${indent}vus............................: ${data.metrics.vus.values.min} min, ${data.metrics.vus.values.max} max`);
  
  return summary.join('\n');
}
