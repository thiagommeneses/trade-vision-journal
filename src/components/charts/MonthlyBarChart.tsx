
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
const generateMonthlyData = (months: number) => {
  const data = [];
  const currentDate = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date();
    date.setMonth(currentDate.getMonth() - i);
    
    const profit = Math.random() < 0.7 
      ? Math.floor(Math.random() * 10000) + 1000 
      : -Math.floor(Math.random() * 8000) - 500;
    
    data.push({
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      profit,
    });
  }
  
  return data;
};

const timeRanges = [
  { label: "Last 6 months", value: "6m", months: 6 },
  { label: "Last 12 months", value: "1y", months: 12 },
  { label: "YTD", value: "ytd", months: new Date().getMonth() + 1 },
];

interface MonthlyBarChartProps {
  className?: string;
}

export function MonthlyBarChart({ className }: MonthlyBarChartProps) {
  const [timeRange, setTimeRange] = useState("6m");
  const selectedRange = timeRanges.find((range) => range.value === timeRange) || timeRanges[0];
  const data = generateMonthlyData(selectedRange.months);

  // Calculate total profit/loss
  const totalProfit = data.reduce((sum, entry) => sum + entry.profit, 0);
  const isProfit = totalProfit >= 0;

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isPositive = payload[0].value >= 0;
      return (
        <div className="glass-card p-3">
          <p className="text-sm font-medium mb-1">{label}</p>
          <p className="text-xs">
            <span className="font-medium">Result: </span>
            <span className={isPositive ? "text-profit" : "text-loss"}>
              {formatCurrency(payload[0].value)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg">Monthly Results</CardTitle>
          <CardDescription>
            Total {isProfit ? "profit" : "loss"} of {formatCurrency(Math.abs(totalProfit))}
          </CardDescription>
        </div>
        <Select
          value={timeRange}
          onValueChange={(value) => setTimeRange(value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent align="end">
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ opacity: 0.2 }}
                tickMargin={10}
              />
              <YAxis 
                tickFormatter={(value) => `R$${Math.abs(value / 1000)}k`}
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ opacity: 0.2 }}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeWidth={1} />
              <Bar
                dataKey="profit"
                name="Monthly P&L"
                radius={[4, 4, 0, 0]}
                fill="hsl(var(--primary))"
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
