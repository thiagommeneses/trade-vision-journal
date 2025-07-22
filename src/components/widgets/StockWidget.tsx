
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useRealtimeStock } from "@/hooks/useRealtimeData";
import { cn } from "@/lib/utils";

interface StockWidgetProps {
  symbol: string;
  name: string;
  className?: string;
}

export function StockWidget({ symbol, name, className }: StockWidgetProps) {
  const { data, loading } = useRealtimeStock(symbol, 3000);

  if (loading || !data) {
    return (
      <div className={cn("liquid-glass-card p-4 animate-pulse", className)}>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-20"></div>
          <div className="h-6 bg-muted rounded w-24"></div>
          <div className="h-4 bg-muted rounded w-16"></div>
        </div>
      </div>
    );
  }

  const isPositive = data.change >= 0;
  const isNeutral = data.change === 0;

  return (
    <div className={cn("liquid-glass-card p-4 liquid-glass-hover", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">{symbol}</span>
            {isNeutral ? (
              <Minus className="h-3 w-3 text-muted-foreground" />
            ) : isPositive ? (
              <TrendingUp className="h-3 w-3 text-profit" />
            ) : (
              <TrendingDown className="h-3 w-3 text-loss" />
            )}
          </div>
          <div className="text-xs text-muted-foreground truncate max-w-20">{name}</div>
        </div>
        
        <div className="text-right space-y-1">
          <div className="text-lg font-semibold">
            ${data.price.toFixed(2)}
          </div>
          <div className={cn(
            "text-xs font-medium",
            isPositive ? "metric-positive" : isNeutral ? "text-muted-foreground" : "metric-negative"
          )}>
            {isPositive ? "+" : ""}{data.change.toFixed(2)}
          </div>
          <div className={cn(
            "text-xs",
            isPositive ? "text-profit" : isNeutral ? "text-muted-foreground" : "text-loss"
          )}>
            ({isPositive ? "+" : ""}{data.changePercent.toFixed(2)}%)
          </div>
        </div>
      </div>
      
      {data.volume && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="text-xs text-muted-foreground">
            Vol: {(data.volume / 1000000).toFixed(1)}M
          </div>
        </div>
      )}
    </div>
  );
}
