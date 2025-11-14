import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export default function PerformanceChart() {
  const data = [
    { requests: "100", latency: 145 },
    { requests: "250", latency: 162 },
    { requests: "500", latency: 178 },
    { requests: "750", latency: 186 },
    { requests: "1000", latency: 192 },
    { requests: "1250", latency: 198 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Under Load</CardTitle>
        <CardDescription>Response latency across different request volumes</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="requests" 
              className="text-xs"
              tick={{ fontSize: 12 }}
              label={{ value: 'Requests/sec', position: 'insideBottom', offset: -5, fontSize: 12 }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fontSize: 12 }}
              label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                fontSize: '12px'
              }}
              formatter={(value) => [`${value}ms`, 'Latency']}
            />
            <ReferenceLine 
              y={200} 
              stroke="hsl(var(--destructive))" 
              strokeDasharray="3 3"
              label={{ value: 'Target: <200ms', fontSize: 10, fill: 'hsl(var(--destructive))' }}
            />
            <Bar 
              dataKey="latency" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold tabular-nums">186ms</div>
            <div className="text-xs text-muted-foreground">Median Latency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold tabular-nums">1,284</div>
            <div className="text-xs text-muted-foreground">Peak Throughput</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold tabular-nums">99.2%</div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
