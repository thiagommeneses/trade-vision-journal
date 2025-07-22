
import { useRealtimeStock } from "@/hooks/useRealtimeData";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

interface MiniIndicesDashboardProps {
  className?: string;
}

export function MiniIndicesDashboard({ className }: MiniIndicesDashboardProps) {
  const { data: miniIndice } = useRealtimeStock("WIN", 2000);
  const { data: miniDolar } = useRealtimeStock("WDO", 2000);

  return (
    <div className={cn("space-y-6", className)}>
      <div className="liquid-glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Mini-Índice & Mini-Dólar</h2>
            <p className="text-muted-foreground">Contratos futuros em tempo real</p>
          </div>
          <BarChart3 className="h-6 w-6 text-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mini-Índice */}
          <div className="liquid-glass-subtle rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Mini-Índice (WIN)</h3>
                <p className="text-sm text-muted-foreground">Ibovespa Futuro</p>
              </div>
              {miniIndice && (
                miniIndice.change >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-profit" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-loss" />
                )
              )}
            </div>

            {miniIndice ? (
              <div className="space-y-3">
                <div className="text-3xl font-bold">
                  {miniIndice.price.toLocaleString('pt-BR')}
                </div>
                <div className="flex items-center justify-between">
                  <div className={cn(
                    "text-lg font-semibold",
                    miniIndice.change >= 0 ? "metric-positive" : "metric-negative"
                  )}>
                    {miniIndice.change >= 0 ? "+" : ""}{miniIndice.change.toFixed(0)}
                  </div>
                  <div className={cn(
                    "text-sm px-2 py-1 rounded",
                    miniIndice.change >= 0 ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"
                  )}>
                    {miniIndice.change >= 0 ? "+" : ""}{miniIndice.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 animate-pulse">
                <div className="h-8 bg-muted rounded w-32"></div>
                <div className="h-6 bg-muted rounded w-24"></div>
              </div>
            )}
          </div>

          {/* Mini-Dólar */}
          <div className="liquid-glass-subtle rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Mini-Dólar (WDO)</h3>
                <p className="text-sm text-muted-foreground">USD/BRL Futuro</p>
              </div>
              {miniDolar && (
                miniDolar.change >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-profit" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-loss" />
                )
              )}
            </div>

            {miniDolar ? (
              <div className="space-y-3">
                <div className="text-3xl font-bold">
                  R$ {miniDolar.price.toFixed(3)}
                </div>
                <div className="flex items-center justify-between">
                  <div className={cn(
                    "text-lg font-semibold",
                    miniDolar.change >= 0 ? "metric-positive" : "metric-negative"
                  )}>
                    {miniDolar.change >= 0 ? "+" : ""}{miniDolar.change.toFixed(3)}
                  </div>
                  <div className={cn(
                    "text-sm px-2 py-1 rounded",
                    miniDolar.change >= 0 ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"
                  )}>
                    {miniDolar.change >= 0 ? "+" : ""}{miniDolar.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 animate-pulse">
                <div className="h-8 bg-muted rounded w-32"></div>
                <div className="h-6 bg-muted rounded w-24"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
