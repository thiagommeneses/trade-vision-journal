
import { Layout } from "@/components/layout/Layout";
import { NewsWidget } from "@/components/widgets/NewsWidget";
import { VIXWidget } from "@/components/widgets/VIXWidget";
import { CommoditiesWidget } from "@/components/widgets/CommoditiesWidget";
import { MagnificentTen } from "@/components/sections/MagnificentTen";
import { BrazilianADRs } from "@/components/sections/BrazilianADRs";
import { MiniIndicesDashboard } from "@/components/sections/MiniIndicesDashboard";

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4 pt-20 pb-20 animate-fade-in space-y-8">
        {/* Hero Section */}
        <div className="liquid-glass-intense rounded-2xl p-8 floating">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Real-Time Financial Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Monitor global markets, track your favorite instruments, and stay ahead with real-time data and insights.
            </p>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <VIXWidget className="h-fit" />
          <CommoditiesWidget className="h-fit" />
          <NewsWidget className="h-fit" />
        </div>

        {/* Mini-Índices Dashboard */}
        <MiniIndicesDashboard />

        {/* Magnificent 10 Section */}
        <MagnificentTen />

        {/* Brazilian ADRs Section */}
        <BrazilianADRs />

        {/* Additional Market Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="liquid-glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Market Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">S&P 500</span>
                <span className="font-semibold text-profit">+0.85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">NASDAQ</span>
                <span className="font-semibold text-profit">+1.24%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Ibovespa</span>
                <span className="font-semibold text-loss">-0.42%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">USD/BRL</span>
                <span className="font-semibold text-profit">+0.18%</span>
              </div>
            </div>
          </div>

          <div className="liquid-glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-profit">↑ 2,847</div>
                <div className="text-sm text-muted-foreground">Advancing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-loss">↓ 1,253</div>
                <div className="text-sm text-muted-foreground">Declining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$2.4T</div>
                <div className="text-sm text-muted-foreground">Volume</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">16.8</div>
                <div className="text-sm text-muted-foreground">VIX Level</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
