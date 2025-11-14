import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface RiskScoreGaugeProps {
  score: number;
  title?: string;
  description?: string;
}

export default function RiskScoreGauge({ score, title = "Current Risk Level", description = "Real-time security assessment" }: RiskScoreGaugeProps) {
  const percentage = Math.round(score * 100);
  
  const getRiskLevel = () => {
    if (score < 0.3) return { label: "Low", color: "hsl(var(--chart-2))" };
    if (score < 0.7) return { label: "Medium", color: "hsl(var(--chart-4))" };
    return { label: "High", color: "hsl(var(--destructive))" };
  };

  const risk = getRiskLevel();

  const data = [
    { name: "Risk", value: percentage },
    { name: "Safe", value: 100 - percentage },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx={100}
                  cy={100}
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                >
                  <Cell fill={risk.color} />
                  <Cell fill="hsl(var(--muted))" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold tabular-nums" style={{ color: risk.color }}>
                {percentage}%
              </div>
              <div className="text-sm text-muted-foreground">{risk.label} Risk</div>
            </div>
          </div>
          <div className="mt-6 grid w-full grid-cols-3 gap-4 border-t pt-4">
            <div className="text-center">
              <div className="h-2 w-2 rounded-full bg-chart-2 mx-auto mb-2" />
              <div className="text-xs font-medium">Low</div>
              <div className="text-xs text-muted-foreground">0-30%</div>
            </div>
            <div className="text-center">
              <div className="h-2 w-2 rounded-full bg-chart-4 mx-auto mb-2" />
              <div className="text-xs font-medium">Medium</div>
              <div className="text-xs text-muted-foreground">30-70%</div>
            </div>
            <div className="text-center">
              <div className="h-2 w-2 rounded-full bg-destructive mx-auto mb-2" />
              <div className="text-xs font-medium">High</div>
              <div className="text-xs text-muted-foreground">70-100%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
