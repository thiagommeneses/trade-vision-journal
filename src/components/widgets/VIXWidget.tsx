
import { useRealtimeVIX } from "@/hooks/useRealtimeData";
import { cn } from "@/lib/utils";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface VIXWidgetProps {
  className?: string;
}

export function VIXWidget({ className }: VIXWidgetProps) {
  const { vix, loading } = useRealtimeVIX();

  if (loading || !vix) {
    return (
      <div className={cn("liquid-glass-card p-4 animate-pulse", className)}>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-16"></div>
          <div className="h-8 bg-muted rounded w-20"></div>
          <div className="h-4 bg-muted rounded w-24"></div>
        </div>
      </div>
    );
  }

  const getVIXLevel = (value: number) => {
    if (value < 12) return { level: "Low", color: "text-profit", bg: "bg-profit/10" };
    if (value < 20) return { level: "Normal", color: "text-muted-foreground", bg: "bg-neutral/10" };
    if (value < 30) return { level: "High", color: "text-orange-500", bg: "bg-orange-500/10" };
    return { level: "Extreme", color: "text-loss", bg: "bg-loss/10" };
  };

  const vixLevel = getVIXLevel(vix.value);
  const isPositive = vix.change >= 0;

  return (
    <div className={cn("liquid-glass-card p-4 liquid-glass-hover", className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-medium">VIX Fear Index</span>
        </div>
        {isPositive ? (
          <TrendingUp className="h-4 w-4 text-loss" />
        ) : (
          <TrendingDown className="h-4 w-4 text-profit" />
        )}
      </div>

      <div className="space-y-3">
        <div className="text-2xl font-bold">
          {vix.value.toFixed(2)}
        </div>

        <div className="flex items-center justify-between">
          <div className={cn("text-sm font-medium", isPositive ? "text-loss" : "text-profit")}>
            {isPositive ? "+" : ""}{vix.change.toFixed(2)} ({isPositive ? "+" : ""}{vix.changePercent.toFixed(2)}%)
          </div>
          <div className={cn("px-2 py-1 rounded text-xs font-medium", vixLevel.bg, vixLevel.color)}>
            {vixLevel.level}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Market volatility indicator
        </div>
      </div>
    </div>
  );
}
