
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
    <div className={cn("glass-elevated apple-spacing-lg apple-hover group cursor-pointer", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-3">
            <span className="apple-body text-xs font-medium opacity-60 uppercase tracking-wider">{symbol}</span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
              isNeutral 
                ? 'bg-neutral/20' 
                : isPositive 
                  ? 'bg-profit/20 group-hover:bg-profit/30' 
                  : 'bg-loss/20 group-hover:bg-loss/30'
            }`}>
              {isNeutral ? (
                <Minus className="h-3 w-3 text-muted-foreground" />
              ) : isPositive ? (
                <TrendingUp className="h-3 w-3 text-profit" />
              ) : (
                <TrendingDown className="h-3 w-3 text-loss" />
              )}
            </div>
          </div>
          <div className="apple-subtitle text-sm font-medium truncate">{name}</div>
        </div>
        
        <div className="text-right space-y-2">
          <div className="text-2xl font-light tracking-tight">
            ${data.price.toFixed(2)}
          </div>
          <div className={cn(
            "apple-body text-sm font-medium",
            isPositive ? "text-profit" : isNeutral ? "text-muted-foreground" : "text-loss"
          )}>
            {isPositive ? "+" : ""}{data.change.toFixed(2)}
          </div>
          <div className={cn(
            "apple-body text-xs",
            isPositive ? "text-profit" : isNeutral ? "text-muted-foreground" : "text-loss"
          )}>
            ({isPositive ? "+" : ""}{data.changePercent.toFixed(2)}%)
          </div>
        </div>
      </div>
      
      {data.volume && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="apple-body text-xs opacity-50">
              Volume: {(data.volume / 1000000).toFixed(1)}M
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
