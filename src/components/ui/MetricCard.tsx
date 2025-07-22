
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
    <Card className={cn("overflow-hidden transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && (
          <div className={cn("p-1.5 rounded-full", iconClassName)}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1 truncate" style={{ fontVariantNumeric: "tabular-nums" }}>
          {value}
        </div>
        
        {(description || trend) && (
          <div className="flex items-center mt-1">
            {trend && (
              <span
                className={cn(
                  "text-xs font-medium inline-flex items-center mr-2 rounded-full px-1.5 py-0.5",
                  trend === "up" && "bg-profit/10 text-profit",
                  trend === "down" && "bg-loss/10 text-loss",
                  trend === "neutral" && "bg-neutral text-neutral-foreground"
                )}
              >
                {trend === "up" && "↑"}
                {trend === "down" && "↓"}
                {trendValue}
              </span>
            )}
            
            {description && (
              <span className="text-xs text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
