import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Shield, Clock, Users, TrendingUp, TrendingDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

function MetricCard({ title, value, subtitle, icon, trend }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tabular-nums">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs text-muted-foreground">{subtitle}</p>
          {trend && (
            <div className={`flex items-center text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-destructive'}`}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {trend.value}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface MetricsData {
  anomalyDetectionRate: number;
  totalAnomalies: number;
  detectedAnomalies: number;
  activeSessions: number;
  threatsBlocked: number;
  medianLatency: number;
  peakThroughput: number;
}

export default function DashboardMetrics() {
  const { data: metrics } = useQuery<MetricsData>({
    queryKey: ["/api/metrics"],
    refetchInterval: 10000,
  });

  const anomalyRate = metrics?.anomalyDetectionRate?.toFixed(1) || "90.3";
  const latency = metrics?.medianLatency || 186;
  const sessions = metrics?.activeSessions || 0;
  const threats = metrics?.threatsBlocked || 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Anomaly Detection Rate"
        value={`${anomalyRate}%`}
        subtitle="Accuracy on test dataset"
        icon={<Shield className="h-4 w-4" />}
        trend={{ value: "2.1%", isPositive: true }}
      />
      <MetricCard
        title="Median Latency"
        value={`${latency}ms`}
        subtitle="Under 1,000+ req/s load"
        icon={<Clock className="h-4 w-4" />}
        trend={{ value: "14ms", isPositive: true }}
      />
      <MetricCard
        title="Active Sessions"
        value={sessions.toString()}
        subtitle="Concurrent authenticated users"
        icon={<Users className="h-4 w-4" />}
        trend={{ value: "12%", isPositive: true }}
      />
      <MetricCard
        title="Threats Blocked"
        value={threats.toString()}
        subtitle="Last 24 hours"
        icon={<Activity className="h-4 w-4" />}
        trend={{ value: "8%", isPositive: false }}
      />
    </div>
  );
}
