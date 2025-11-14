import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LoginFormProps {
  onSubmit?: (username: string, password: string) => void;
  riskScore?: number;
  showRiskIndicator?: boolean;
}

export default function LoginForm({ onSubmit, riskScore, showRiskIndicator = false }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
    onSubmit?.(username, password);
  };

  const getRiskLevel = (score?: number) => {
    if (!score) return { level: "Low", color: "bg-green-500" };
    if (score < 0.3) return { level: "Low", color: "bg-green-500" };
    if (score < 0.7) return { level: "Medium", color: "bg-yellow-500" };
    return { level: "High", color: "bg-destructive" };
  };

  const risk = getRiskLevel(riskScore);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl font-semibold">LoginSentinel</CardTitle>
          </div>
          {showRiskIndicator && riskScore !== undefined && (
            <Badge variant="outline" className="gap-1">
              <div className={`h-2 w-2 rounded-full ${risk.color}`} />
              {risk.level} Risk
            </Badge>
          )}
        </div>
        <CardDescription>
          Secure authentication with risk-based monitoring
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              data-testid="input-username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              data-testid="input-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {showRiskIndicator && riskScore !== undefined && riskScore > 0.7 && (
            <div className="flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3">
              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
              <div className="text-xs text-destructive">
                High risk login detected. Additional verification may be required.
              </div>
            </div>
          )}
          <Button
            type="submit"
            data-testid="button-login"
            className="w-full"
          >
            Sign In
          </Button>
        </form>
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Protected by IsolationForest anomaly detection
        </div>
      </CardContent>
    </Card>
  );
}
