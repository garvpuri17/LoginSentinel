import DashboardMetrics from "@/components/DashboardMetrics";
import AnomalyChart from "@/components/AnomalyChart";
import PerformanceChart from "@/components/PerformanceChart";
import ActivityFeed from "@/components/ActivityFeed";
import RiskScoreGauge from "@/components/RiskScoreGauge";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data: loginAttempts } = useQuery<any[]>({
    queryKey: ["/api/login-attempts"],
    refetchInterval: 5000,
  });

  const recentRiskScore = (loginAttempts && loginAttempts.length > 0) ? loginAttempts[0]?.riskScore || 0.28 : 0.28;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time security monitoring and performance metrics
        </p>
      </div>

      <DashboardMetrics />

      <div className="grid gap-6 lg:grid-cols-2">
        <AnomalyChart />
        <PerformanceChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed maxHeight="500px" attempts={loginAttempts} />
        </div>
        <RiskScoreGauge score={recentRiskScore} />
      </div>
    </div>
  );
}
