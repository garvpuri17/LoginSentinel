import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function AnomalyChart() {
  const data = [
    { time: "00:00", normal: 245, anomalies: 12, detected: 11 },
    { time: "04:00", normal: 189, anomalies: 8, detected: 7 },
    { time: "08:00", normal: 412, anomalies: 23, detected: 21 },
    { time: "12:00", normal: 586, anomalies: 31, detected: 28 },
    { time: "16:00", normal: 521, anomalies: 28, detected: 25 },
    { time: "20:00", normal: 389, anomalies: 19, detected: 17 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomaly Detection Performance</CardTitle>
        <CardDescription>Login patterns and threat detection over 24 hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="time" 
              className="text-xs"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Line 
              type="monotone" 
              dataKey="normal" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              name="Normal Logins"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="anomalies" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              name="Total Anomalies"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="detected" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              name="Detected"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold tabular-nums">90.3%</div>
            <div className="text-xs text-muted-foreground">Detection Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold tabular-nums">121</div>
            <div className="text-xs text-muted-foreground">Total Anomalies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold tabular-nums">109</div>
            <div className="text-xs text-muted-foreground">Detected</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
