
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
const generatePerformanceData = (days: number) => {
  const data = [];
  let balance = 0;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    const dailyProfit = Math.random() < 0.6 
      ? Math.floor(Math.random() * 800) + 100 
      : -Math.floor(Math.random() * 500) - 50;
    
    balance += dailyProfit;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      profit: dailyProfit,
      balance,
    });
  }
  
  return data;
};

const timeRanges = [
  { label: "Last 7 days", value: "7d", days: 7 },
  { label: "Last 30 days", value: "30d", days: 30 },
  { label: "Last 90 days", value: "90d", days: 90 },
  { label: "Last 6 months", value: "6m", days: 180 },
  { label: "Last year", value: "1y", days: 365 },
];

interface PerformanceLineChartProps {
  className?: string;
}

export function PerformanceLineChart({ className }: PerformanceLineChartProps) {
  const [timeRange, setTimeRange] = useState("30d");
  const selectedRange = timeRanges.find((range) => range.value === timeRange) || timeRanges[1];
  const data = generatePerformanceData(selectedRange.days);

  // Calculate total profit/loss
  const totalBalance = data[data.length - 1].balance;
  const isProfit = totalBalance >= 0;

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
      return (
        <div className="glass-card p-3">
          <p className="text-sm font-medium mb-1">{label}</p>
          <p className="text-xs">
            <span className="font-medium">Daily: </span>
            <span className={payload[0].value >= 0 ? "text-profit" : "text-loss"}>
              {formatCurrency(payload[0].value)}
            </span>
          </p>
          <p className="text-xs">
            <span className="font-medium">Balance: </span>
            <span className={payload[1].value >= 0 ? "text-profit" : "text-loss"}>
              {formatCurrency(payload[1].value)}
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
          <CardTitle className="text-lg">Performance</CardTitle>
          <CardDescription>
            {isProfit ? "Profit" : "Loss"} of {formatCurrency(Math.abs(totalBalance))}
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
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ opacity: 0.2 }}
                tickMargin={10}
              />
              <YAxis 
                tickFormatter={(value) => `R$${value}`}
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ opacity: 0.2 }}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <Line
                type="monotone"
                dataKey="profit"
                name="Daily P&L"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                name="Balance"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
