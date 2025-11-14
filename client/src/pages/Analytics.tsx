import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnomalyChart from "@/components/AnomalyChart";
import PerformanceChart from "@/components/PerformanceChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Shield, Zap } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Detailed performance metrics and security insights
        </p>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance" data-testid="tab-performance">
            <Zap className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="security" data-testid="tab-security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="trends" data-testid="tab-trends">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceChart />
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Load Testing Results</CardTitle>
                <CardDescription>k6 performance benchmarks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Peak Throughput</span>
                    <span className="text-sm font-mono">1,284 req/s</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Concurrent Users</span>
                    <span className="text-sm font-mono">547 users</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">p95 Latency</span>
                    <span className="text-sm font-mono">194ms</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">p99 Latency</span>
                    <span className="text-sm font-mono">198ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Error Rate</span>
                    <span className="text-sm font-mono text-green-600">0.02%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
                <CardDescription>Standard hardware performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-sm font-mono">42%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm font-mono">3.2GB / 8GB</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Database Connections</span>
                    <span className="text-sm font-mono">28 / 100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Cache Hit Rate</span>
                    <span className="text-sm font-mono text-green-600">94.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <AnomalyChart />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>IsolationForest Metrics</CardTitle>
                <CardDescription>Anomaly detection performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Detection Accuracy</span>
                    <span className="text-sm font-mono text-green-600">90.3%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">True Positives</span>
                    <span className="text-sm font-mono">109 / 121</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">False Positives</span>
                    <span className="text-sm font-mono">8</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">False Negatives</span>
                    <span className="text-sm font-mono">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">F1 Score</span>
                    <span className="text-sm font-mono text-green-600">0.89</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Threat Prevention</CardTitle>
                <CardDescription>Security events blocked</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Brute Force Attacks</span>
                    <span className="text-sm font-mono">847</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Credential Stuffing</span>
                    <span className="text-sm font-mono">312</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Anomalous IP Patterns</span>
                    <span className="text-sm font-mono">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Rate Limit Violations</span>
                    <span className="text-sm font-mono">36</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Week-over-Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+12.3%</div>
                <p className="text-xs text-muted-foreground mt-1">Detection rate improved</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">-14ms</div>
                <p className="text-xs text-muted-foreground mt-1">Latency reduction</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.2%</div>
                <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>All systems operational</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm">Authentication Service</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm">IsolationForest Engine</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm">Rate Limiting</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm">MongoDB Cluster</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Operational</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
