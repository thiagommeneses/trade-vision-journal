import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { MetricCard } from "@/components/ui/MetricCard";
import { PerformanceLineChart } from "@/components/charts/PerformanceLineChart";
import { MonthlyBarChart } from "@/components/charts/MonthlyBarChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownRight, ArrowUpRight, BarChart3, CalendarDays, Search, Target, TrendingDown, TrendingUp, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const recentTrades = [
  {
    id: 1,
    date: "2023-06-15",
    asset: "Mini Índice",
    type: "buy",
    profit: 120.5,
  },
  {
    id: 2,
    date: "2023-06-14",
    asset: "Mini Dólar",
    type: "sell",
    profit: -45.2,
  },
  {
    id: 3,
    date: "2023-06-14",
    asset: "Mini Índice",
    type: "buy",
    profit: 78.3,
  },
  {
    id: 4,
    date: "2023-06-13",
    asset: "Mini Dólar",
    type: "buy",
    profit: 34.1,
  },
  {
    id: 5,
    date: "2023-06-12",
    asset: "Mini Índice",
    type: "sell",
    profit: -62.7,
  },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Welcome to your Trading Diary",
        description: "Track your performance and improve your trading strategy",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR");
  };

  const totalTrades = 143;
  const winningTrades = 86;
  const losingTrades = totalTrades - winningTrades;
  const winRate = (winningTrades / totalTrades) * 100;
  const highestProfit = 1245.6;
  const lowestProfit = -578.9;
  const totalBalance = 8735.4;
  const monthlyGoal = 10000;
  const monthlyProgress = (totalBalance / monthlyGoal) * 100;
  const tradesExecuted = 23;
  const dailyGoal = 5;
  const daysInMonth = 22;
  const tradeGoalProgress = (tradesExecuted / (dailyGoal * daysInMonth)) * 100;

  const filteredTrades = recentTrades.filter(trade => 
    trade.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.profit.toString().includes(searchTerm) ||
    trade.date.includes(searchTerm)
  );

  return (
    <Layout>
      <div className="container mx-auto p-4 pt-20 pb-20 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <Select 
            value={filterPeriod} 
            onValueChange={setFilterPeriod}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trades..."
              className="pl-9 pr-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Trades"
            value={`${totalTrades}`}
            description={`Win: ${winningTrades} | Loss: ${losingTrades}`}
            icon={ListChecks}
            iconClassName="bg-primary/10 text-primary"
          />
          <MetricCard
            title="Win Rate"
            value={`${winRate.toFixed(1)}%`}
            trend={winRate > 50 ? "up" : "down"}
            trendValue={`${Math.abs(winRate - 50).toFixed(1)}%`}
            icon={winRate > 50 ? TrendingUp : TrendingDown}
            iconClassName={winRate > 50 ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"}
          />
          <MetricCard
            title="Highest Profit"
            value={formatCurrency(highestProfit)}
            icon={ArrowUpRight}
            iconClassName="bg-profit/10 text-profit"
          />
          <MetricCard
            title="Lowest Profit"
            value={formatCurrency(lowestProfit)}
            icon={ArrowDownRight}
            iconClassName="bg-loss/10 text-loss"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Monthly Goal Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current: {formatCurrency(totalBalance)}</span>
                  <span>Goal: {formatCurrency(monthlyGoal)}</span>
                </div>
                <Progress value={monthlyProgress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {monthlyProgress < 100
                    ? `${formatCurrency(monthlyGoal - totalBalance)} remaining to reach your goal`
                    : "Congratulations! You've reached your monthly goal"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CalendarDays className="h-5 w-5 mr-2" />
                Trade Execution Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Executed: {tradesExecuted} trades</span>
                  <span>Goal: {dailyGoal * daysInMonth} trades</span>
                </div>
                <Progress value={tradeGoalProgress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {`${dailyGoal} trades per day (${tradesExecuted}/${
                    dailyGoal * daysInMonth
                  } completed)`}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PerformanceLineChart />
          <MonthlyBarChart />
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Recent Trade Entries
            </CardTitle>
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{filteredTrades.length} entries</span>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] rounded-md">
              <div className="space-y-4">
                {filteredTrades.length > 0 ? (
                  filteredTrades.map((trade) => (
                    <div key={trade.id}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              trade.profit >= 0
                                ? "bg-profit/10 text-profit"
                                : "bg-loss/10 text-loss"
                            }`}
                          >
                            {trade.profit >= 0 ? (
                              <TrendingUp className="h-5 w-5" />
                            ) : (
                              <TrendingDown className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{trade.asset}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(trade.date)} · {trade.type === "buy" ? "Long" : "Short"}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`text-right ${
                            trade.profit >= 0 ? "text-profit" : "text-loss"
                          }`}
                        >
                          <p className="text-sm font-medium">
                            {trade.profit >= 0 ? "+" : ""}
                            {formatCurrency(trade.profit)}
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No trades found matching your search</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
