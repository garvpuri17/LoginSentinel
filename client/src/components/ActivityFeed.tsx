import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, ShieldAlert, ShieldCheck, MapPin, Clock } from "lucide-react";

interface LoginAttempt {
  id: string;
  username: string;
  ipAddress: string;
  location: string;
  timestamp: string;
  riskScore: number;
  status: "success" | "blocked" | "flagged";
}

interface ActivityFeedProps {
  attempts?: any[];
  maxHeight?: string;
}

function formatTimeAgo(timestamp: string | Date): string {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export default function ActivityFeed({ attempts, maxHeight = "400px" }: ActivityFeedProps) {
  const defaultAttempts: LoginAttempt[] = [
    { id: "1", username: "admin@company.com", ipAddress: "192.168.1.100", location: "San Francisco, CA", timestamp: "2 min ago", riskScore: 0.12, status: "success" },
    { id: "2", username: "user.smith", ipAddress: "203.0.113.42", location: "London, UK", timestamp: "5 min ago", riskScore: 0.89, status: "blocked" },
    { id: "3", username: "j.doe", ipAddress: "198.51.100.23", location: "New York, NY", timestamp: "8 min ago", riskScore: 0.45, status: "flagged" },
    { id: "4", username: "support@company.com", ipAddress: "192.168.1.101", location: "San Francisco, CA", timestamp: "12 min ago", riskScore: 0.08, status: "success" },
    { id: "5", username: "test.user", ipAddress: "198.51.100.78", location: "Tokyo, JP", timestamp: "15 min ago", riskScore: 0.92, status: "blocked" },
    { id: "6", username: "developer", ipAddress: "192.168.1.105", location: "Austin, TX", timestamp: "18 min ago", riskScore: 0.19, status: "success" },
    { id: "7", username: "admin", ipAddress: "203.0.113.89", location: "Unknown", timestamp: "22 min ago", riskScore: 0.95, status: "blocked" },
    { id: "8", username: "maria.garcia", ipAddress: "198.51.100.45", location: "Madrid, ES", timestamp: "25 min ago", riskScore: 0.34, status: "success" },
  ];

  const rawAttempts = attempts && attempts.length > 0 ? attempts : null;
  const loginAttempts = rawAttempts ? rawAttempts.map((a: any) => ({
    id: a.id,
    username: a.username,
    ipAddress: a.ipAddress,
    location: a.location || "Unknown",
    timestamp: formatTimeAgo(a.timestamp),
    riskScore: a.riskScore,
    status: a.blocked ? "blocked" : (a.success ? "success" : "flagged"),
  })) : defaultAttempts;

  const getStatusConfig = (status: string, riskScore: number) => {
    switch (status) {
      case "blocked":
        return { icon: ShieldAlert, label: "Blocked", variant: "destructive" as const, color: "text-destructive" };
      case "flagged":
        return { icon: Shield, label: "Flagged", variant: "outline" as const, color: "text-yellow-600" };
      default:
        return { icon: ShieldCheck, label: "Success", variant: "outline" as const, color: "text-green-600" };
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 0.3) return "text-green-600";
    if (score < 0.7) return "text-yellow-600";
    return "text-destructive";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Real-time login attempts with risk scoring</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea style={{ height: maxHeight }}>
          <div className="space-y-3">
            {loginAttempts.map((attempt) => {
              const status = getStatusConfig(attempt.status, attempt.riskScore);
              const StatusIcon = status.icon;

              return (
                <div
                  key={attempt.id}
                  data-testid={`activity-${attempt.id}`}
                  className="flex items-start gap-3 rounded-md border p-3 hover-elevate"
                >
                  <div className={`mt-0.5 ${status.color}`}>
                    <StatusIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">{attempt.username}</p>
                      <Badge variant={status.variant} className="text-xs">
                        {status.label}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="font-mono">{attempt.ipAddress}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {attempt.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {attempt.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Risk Score:</span>
                      <span className={`text-xs font-medium tabular-nums ${getRiskColor(attempt.riskScore)}`}>
                        {(attempt.riskScore * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
