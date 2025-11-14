import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Settings() {
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [anomalyDetectionEnabled, setAnomalyDetectionEnabled] = useState(true);
  const [autoBlockEnabled, setAutoBlockEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure authentication and security parameters
        </p>
      </div>

      <Tabs defaultValue="security" className="space-y-6">
        <TabsList>
          <TabsTrigger value="security" data-testid="tab-security">Security</TabsTrigger>
          <TabsTrigger value="performance" data-testid="tab-performance">Performance</TabsTrigger>
          <TabsTrigger value="notifications" data-testid="tab-notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rate Limiting</CardTitle>
              <CardDescription>
                Protect against brute-force attacks with configurable thresholds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="rate-limit">Enable Rate Limiting</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Limit authentication attempts per IP address
                  </p>
                </div>
                <Switch
                  id="rate-limit"
                  data-testid="switch-rate-limit"
                  checked={rateLimitEnabled}
                  onCheckedChange={setRateLimitEnabled}
                />
              </div>
              {rateLimitEnabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="max-attempts">Max Attempts</Label>
                    <Input
                      id="max-attempts"
                      data-testid="input-max-attempts"
                      type="number"
                      defaultValue="5"
                      className="max-w-xs"
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum login attempts before rate limiting kicks in
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time-window">Time Window (seconds)</Label>
                    <Input
                      id="time-window"
                      data-testid="input-time-window"
                      type="number"
                      defaultValue="60"
                      className="max-w-xs"
                    />
                    <p className="text-xs text-muted-foreground">
                      Time window for counting attempts
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
              <CardDescription>
                IsolationForest-based risk scoring for authentication attempts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="anomaly-detection">Enable Anomaly Detection</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use machine learning to detect suspicious login patterns
                  </p>
                </div>
                <Switch
                  id="anomaly-detection"
                  data-testid="switch-anomaly-detection"
                  checked={anomalyDetectionEnabled}
                  onCheckedChange={setAnomalyDetectionEnabled}
                />
              </div>
              {anomalyDetectionEnabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="risk-threshold">Risk Threshold</Label>
                    <Input
                      id="risk-threshold"
                      data-testid="input-risk-threshold"
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      defaultValue="0.7"
                      className="max-w-xs"
                    />
                    <p className="text-xs text-muted-foreground">
                      Threshold above which logins are flagged as high-risk (0-1)
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-block">Auto-block High Risk</Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Automatically block logins with risk scores above threshold
                      </p>
                    </div>
                    <Switch
                      id="auto-block"
                      data-testid="switch-auto-block"
                      checked={autoBlockEnabled}
                      onCheckedChange={setAutoBlockEnabled}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>JWT Configuration</CardTitle>
              <CardDescription>
                Secure token management and session settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token-expiry">Token Expiry (hours)</Label>
                <Input
                  id="token-expiry"
                  data-testid="input-token-expiry"
                  type="number"
                  defaultValue="24"
                  className="max-w-xs"
                />
                <p className="text-xs text-muted-foreground">
                  How long authentication tokens remain valid
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="refresh-window">Refresh Window (minutes)</Label>
                <Input
                  id="refresh-window"
                  data-testid="input-refresh-window"
                  type="number"
                  defaultValue="15"
                  className="max-w-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Time before expiry when token can be refreshed
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cache Settings</CardTitle>
              <CardDescription>
                Optimize performance with intelligent caching
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                <Input
                  id="cache-ttl"
                  data-testid="input-cache-ttl"
                  type="number"
                  defaultValue="300"
                  className="max-w-xs"
                />
                <p className="text-xs text-muted-foreground">
                  How long to cache user data and session information
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database Optimization</CardTitle>
              <CardDescription>
                MongoDB query and connection settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="max-connections">Max Connections</Label>
                <Input
                  id="max-connections"
                  data-testid="input-max-connections"
                  type="number"
                  defaultValue="100"
                  className="max-w-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Maximum concurrent database connections
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Preferences</CardTitle>
              <CardDescription>
                Configure when and how you receive security alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>High Risk Login Alerts</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get notified when high-risk logins are detected
                  </p>
                </div>
                <Switch defaultChecked data-testid="switch-high-risk-alerts" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Rate Limit Violations</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Alert when rate limits are exceeded
                  </p>
                </div>
                <Switch defaultChecked data-testid="switch-rate-limit-alerts" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>System Performance</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Receive alerts for performance degradation
                  </p>
                </div>
                <Switch data-testid="switch-performance-alerts" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" data-testid="button-cancel">
          Cancel
        </Button>
        <Button data-testid="button-save">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
