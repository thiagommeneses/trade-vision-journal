
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 animate-fade-in">
        {/* Apple-style Hero Section */}
        <div className="glass-ultra apple-spacing-2xl mb-12 mx-6 mt-6">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-ultralight tracking-tight bg-gradient-to-r from-primary via-accent to-profit bg-clip-text text-transparent">
              Financial Intelligence
            </h1>
            <p className="apple-subtitle text-xl max-w-3xl mx-auto leading-relaxed opacity-80">
              Real-time market insights with Apple-class design. Monitor global markets, track investments, and stay ahead with precision data.
            </p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-3 h-3 bg-profit rounded-full animate-pulse"></div>
              <span className="apple-body text-sm opacity-60">Live Market Data</span>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="px-6 space-y-8">
          {/* Primary Widgets Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="apple-hover apple-press">
              <VIXWidget className="h-full" />
            </div>
            <div className="apple-hover apple-press">
              <CommoditiesWidget className="h-full" />
            </div>
            <div className="apple-hover">
              <NewsWidget className="h-full" />
            </div>
          </div>

          {/* Mini-Índices Dashboard */}
          <div className="apple-hover">
            <MiniIndicesDashboard />
          </div>

          {/* Market Intelligence Sections */}
          <div className="space-y-12">
            {/* Magnificent 10 */}
            <div className="apple-hover">
              <MagnificentTen />
            </div>

            {/* Brazilian ADRs */}
            <div className="apple-hover">
              <BrazilianADRs />
            </div>
          </div>

          {/* Market Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-12">
            <div className="glass-elevated apple-spacing-xl apple-hover apple-glow">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
                  📈
                </div>
                <h3 className="apple-title text-2xl">Market Overview</h3>
              </div>
              <div className="space-y-6">
                {[
                  { name: "S&P 500", change: "+0.85%", positive: true },
                  { name: "NASDAQ", change: "+1.24%", positive: true },
                  { name: "Ibovespa", change: "-0.42%", positive: false },
                  { name: "USD/BRL", change: "+0.18%", positive: true }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center apple-glass-secondary rounded-xl apple-spacing-md">
                    <span className="apple-body font-medium">{item.name}</span>
                    <span className={`apple-body font-semibold ${item.positive ? 'text-profit' : 'text-loss'}`}>
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-elevated apple-spacing-xl apple-hover apple-glow">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-profit rounded-2xl flex items-center justify-center">
                  ⚡
                </div>
                <h3 className="apple-title text-2xl">Live Analytics</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "2,847", label: "Advancing", icon: "↗", color: "text-profit" },
                  { value: "1,253", label: "Declining", icon: "↘", color: "text-loss" },
                  { value: "$2.4T", label: "Volume", icon: "💰", color: "text-primary" },
                  { value: "16.8", label: "VIX Level", icon: "📊", color: "text-orange-500" }
                ].map((stat, i) => (
                  <div key={i} className="text-center space-y-3">
                    <div className={`text-3xl font-light ${stat.color}`}>
                      {stat.icon} {stat.value}
                    </div>
                    <div className="apple-body text-sm opacity-60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
