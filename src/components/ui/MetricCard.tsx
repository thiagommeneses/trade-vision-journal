
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  valueClassName?: string;
  iconClassName?: string;
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
  valueClassName,
  iconClassName,
}: MetricCardProps) {
  return (
    <div className={cn("glass-elevated apple-spacing-lg apple-hover apple-glow group", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="apple-subtitle font-medium">{title}</h3>
        {Icon && (
          <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110", iconClassName)}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className={cn(
          "text-3xl font-light tracking-tight",
          valueClassName
        )} style={{ fontVariantNumeric: "tabular-nums" }}>
          {value}
        </div>
        
        {(description || trend) && (
          <div className="flex items-center gap-3">
            {trend && (
              <div
                className={cn(
                  "apple-body text-xs font-medium inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5",
                  trend === "up" && "bg-profit/10 text-profit",
                  trend === "down" && "bg-loss/10 text-loss",
                  trend === "neutral" && "bg-neutral/10 text-neutral-foreground"
                )}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  trend === "up" && "bg-profit",
                  trend === "down" && "bg-loss",
                  trend === "neutral" && "bg-neutral-foreground"
                )}></div>
                {trend === "up" && "↗"}
                {trend === "down" && "↘"}
                {trendValue}
              </div>
            )}
            
            {description && (
              <span className="apple-body text-xs opacity-60 leading-relaxed">{description}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
