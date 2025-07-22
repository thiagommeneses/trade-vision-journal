
import { useRealtimeNews } from "@/hooks/useRealtimeData";
import { cn } from "@/lib/utils";
import { ExternalLink, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NewsWidgetProps {
  className?: string;
}

export function NewsWidget({ className }: NewsWidgetProps) {
  const { news, loading } = useRealtimeNews();

  if (loading) {
    return (
      <div className={cn("liquid-glass-card p-6", className)}>
        <div className="space-y-4">
          <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2 animate-pulse">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("liquid-glass-card p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Market News</h3>
        <div className="w-2 h-2 bg-profit rounded-full pulse-glow"></div>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {news.slice(0, 5).map((item) => (
          <div key={item.id} className="group">
            <div className="space-y-2">
              <h4 className="text-sm font-medium leading-snug group-hover:text-primary transition-colors cursor-pointer">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {item.summary}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">{item.source}</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </div>
            {item !== news[news.length - 1] && (
              <div className="mt-4 border-t border-white/10"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
