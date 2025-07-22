
import { StockWidget } from "@/components/widgets/StockWidget";
import { cn } from "@/lib/utils";

const brazilianADRs = [
  { symbol: "VALE", name: "Vale S.A." },
  { symbol: "ITUB", name: "Itaú Unibanco" },
  { symbol: "BBD", name: "Banco Bradesco" },
  { symbol: "PBR", name: "Petrobras" },
  { symbol: "ABEV", name: "Ambev S.A." },
];

interface BrazilianADRsProps {
  className?: string;
}

export function BrazilianADRs({ className }: BrazilianADRsProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="liquid-glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Brazilian ADRs</h2>
            <p className="text-muted-foreground">Major Brazilian companies on US exchanges</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full pulse-glow"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {brazilianADRs.map((stock) => (
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
