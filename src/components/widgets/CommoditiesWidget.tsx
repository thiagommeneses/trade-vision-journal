
import { useRealtimeCommodities } from "@/hooks/useRealtimeData";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Fuel, Coins, Gem } from "lucide-react";

interface CommoditiesWidgetProps {
  className?: string;
}

export function CommoditiesWidget({ className }: CommoditiesWidgetProps) {
  const { commodities, loading } = useRealtimeCommodities();

  if (loading) {
    return (
      <div className={cn("liquid-glass-card p-6", className)}>
        <div className="space-y-4">
          <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between animate-pulse">
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-4 bg-muted rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getIcon = (symbol: string) => {
    if (symbol.includes('CL')) return <Fuel className="h-4 w-4 text-orange-600" />;
    if (symbol.includes('GC')) return <Coins className="h-4 w-4 text-yellow-500" />;
    if (symbol.includes('SI')) return <Gem className="h-4 w-4 text-gray-400" />;
    return <TrendingUp className="h-4 w-4" />;
  };

  return (
    <div className={cn("liquid-glass-card p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Commodities</h3>
        <div className="w-2 h-2 bg-orange-500 rounded-full pulse-glow"></div>
      </div>

      <div className="space-y-4">
        {commodities.map((commodity) => {
          const isPositive = commodity.change >= 0;
          
          return (
            <div key={commodity.symbol} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getIcon(commodity.symbol)}
                <div>
                  <div className="text-sm font-medium">{commodity.name}</div>
                  <div className="text-xs text-muted-foreground">{commodity.unit}</div>
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <div className="text-sm font-semibold">
                  {commodity.price.toFixed(2)}
                </div>
                <div className="flex items-center gap-1">
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3 text-profit" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-loss" />
                  )}
                  <span className={cn(
                    "text-xs font-medium",
                    isPositive ? "text-profit" : "text-loss"
                  )}>
                    {isPositive ? "+" : ""}{commodity.changePercent.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
