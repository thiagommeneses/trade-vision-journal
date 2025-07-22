
import { StockWidget } from "@/components/widgets/StockWidget";
import { cn } from "@/lib/utils";

const magnificentTen = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "GOOGL", name: "Alphabet" },
  { symbol: "AMZN", name: "Amazon" },
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "META", name: "Meta" },
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "NFLX", name: "Netflix" },
  { symbol: "BABA", name: "Alibaba" },
  { symbol: "CRM", name: "Salesforce" },
];

interface MagnificentTenProps {
  className?: string;
}

export function MagnificentTen({ className }: MagnificentTenProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="liquid-glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">The Magnificent 10</h2>
            <p className="text-muted-foreground">Top tech stocks driving market performance</p>
          </div>
          <div className="w-3 h-3 bg-primary rounded-full pulse-glow"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {magnificentTen.map((stock) => (
            <StockWidget
              key={stock.symbol}
              symbol={stock.symbol}
              name={stock.name}
              className="h-32"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
