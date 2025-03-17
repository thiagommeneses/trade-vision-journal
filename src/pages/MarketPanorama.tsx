import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  SearchIcon,
  TrendingDown,
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  Info
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock market data
const marketIndices = [
  { id: 1, name: "IBOVESPA", value: "118,432", change: "+1.25%", trending: "up" },
  { id: 2, name: "S&P 500", value: "4,853", change: "+0.87%", trending: "up" },
  { id: 3, name: "NASDAQ", value: "15,347", change: "-0.12%", trending: "down" },
  { id: 4, name: "EUROSTOXX 50", value: "4,465", change: "+0.54%", trending: "up" },
  { id: 5, name: "NIKKEI 225", value: "37,963", change: "-0.83%", trending: "down" },
];

const topMovers = [
  { id: 1, symbol: "PETR4", name: "Petrobras", change: "+3.42%", trending: "up" },
  { id: 2, symbol: "VALE3", name: "Vale", change: "+2.18%", trending: "up" },
  { id: 3, symbol: "MGLU3", name: "Magazine Luiza", change: "-4.65%", trending: "down" },
  { id: 4, symbol: "ITUB4", name: "Itaú Unibanco", change: "+1.87%", trending: "up" },
  { id: 5, symbol: "BBDC4", name: "Bradesco", change: "-1.23%", trending: "down" },
];

const economicData = [
  { id: 1, indicator: "SELIC", value: "10.50%", previous: "10.75%", change: "down" },
  { id: 2, indicator: "IPCA (12m)", value: "4.24%", previous: "4.31%", change: "down" },
  { id: 3, indicator: "USD/BRL", value: "4.98", previous: "5.03", change: "down" },
  { id: 4, indicator: "EUR/BRL", value: "5.42", previous: "5.39", change: "up" },
  { id: 5, indicator: "Unemployment", value: "7.5%", previous: "7.7%", change: "down" },
];

// Mock market news
const marketNews = [
  {
    id: 1,
    title: "Brazil Central Bank discusses potential rate cut in next meeting",
    source: "Valor Econômico",
    time: "2h ago",
    url: "#",
  },
  {
    id: 2,
    title: "Mini Índice futures rise on positive economic outlook",
    source: "InfoMoney",
    time: "3h ago",
    url: "#",
  },
  {
    id: 3,
    title: "Dollar weakens against Real following positive trade balance data",
    source: "Reuters",
    time: "4h ago",
    url: "#",
  },
  {
    id: 4,
    title: "B3 reports record trading volume for Mini Índice contracts",
    source: "B3 News",
    time: "5h ago",
    url: "#",
  },
  {
    id: 5,
    title: "Government announces new economic measures to boost growth",
    source: "Folha de São Paulo",
    time: "8h ago",
    url: "#",
  },
];

const MarketPanorama = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout>
      <div className="container mx-auto p-4 pt-20 pb-20 animate-fade-in">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Market Panorama</h1>
              <p className="text-muted-foreground">
                Real-time market insights and analysis for informed trading decisions
              </p>
            </div>
            <div className="relative w-full md:w-72">
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search market information..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Market Overview Section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <LineChart className="h-5 w-5 mr-2" />
                Market Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="indices" className="space-y-4">
                <TabsList className="grid grid-cols-3 w-full md:w-auto">
                  <TabsTrigger value="indices">Indices</TabsTrigger>
                  <TabsTrigger value="movers">Top Movers</TabsTrigger>
                  <TabsTrigger value="economic">Economic Data</TabsTrigger>
                </TabsList>
                
                <TabsContent value="indices" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {marketIndices.map((index) => (
                      <div 
                        key={index.id}
                        className="bg-card rounded-lg border p-4 flex justify-between items-center"
                      >
                        <div>
                          <p className="text-sm font-medium">{index.name}</p>
                          <p className="text-xl font-bold">{index.value}</p>
                        </div>
                        <div className={`flex items-center ${
                          index.trending === "up" ? "text-profit" : "text-loss"
                        }`}>
                          {index.trending === "up" ? (
                            <TrendingUp className="mr-1 h-5 w-5" />
                          ) : (
                            <TrendingDown className="mr-1 h-5 w-5" />
                          )}
                          <span className="font-medium">{index.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="movers" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topMovers.map((stock) => (
                      <div 
                        key={stock.id}
                        className="bg-card rounded-lg border p-4 flex justify-between items-center"
                      >
                        <div>
                          <div className="flex items-center">
                            <p className="text-sm font-bold">{stock.symbol}</p>
                            <span className="mx-2 text-muted-foreground">•</span>
                            <p className="text-sm text-muted-foreground">{stock.name}</p>
                          </div>
                          <div className={`mt-1 flex items-center ${
                            stock.trending === "up" ? "text-profit" : "text-loss"
                          }`}>
                            {stock.trending === "up" ? (
                              <ArrowUpRight className="mr-1 h-4 w-4" />
                            ) : (
                              <ArrowDownRight className="mr-1 h-4 w-4" />
                            )}
                            <span className="font-medium">{stock.change}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="economic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {economicData.map((data) => (
                      <div 
                        key={data.id}
                        className="bg-card rounded-lg border p-4"
                      >
                        <div className="flex justify-between mb-2">
                          <p className="text-sm font-medium">{data.indicator}</p>
                          <div className={`flex items-center ${
                            data.change === "down" ? "text-profit" : "text-loss"
                          }`}>
                            {data.change === "down" ? (
                              <ArrowDownRight className="h-4 w-4" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                          </div>
                        </div>
                        <p className="text-xl font-bold">{data.value}</p>
                        <p className="text-sm text-muted-foreground">
                          Previous: {data.previous}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Latest Market News */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Info className="h-5 w-5 mr-2" />
                Latest Market News
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketNews.map((news) => (
                  <div key={news.id} className="border-b pb-4 last:border-0">
                    <a 
                      href={news.url}
                      className="text-base font-medium hover:underline"
                    >
                      {news.title}
                    </a>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <span>{news.source}</span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{news.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mini Índice & Mini Dólar Focus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mini Índice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold">117,853</p>
                    <div className="flex items-center text-profit">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>+1.2% (1,402 pts)</span>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 bg-muted rounded-md flex flex-col items-center justify-center">
                    <p className="text-sm font-medium">Volume</p>
                    <p className="text-base">438,721</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Open</p>
                    <p className="font-medium">116,451</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Previous Close</p>
                    <p className="font-medium">116,451</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Day Range</p>
                    <p className="font-medium">116,278 - 118,023</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">52 Week Range</p>
                    <p className="font-medium">99,814 - 134,253</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mini Dólar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold">4.978</p>
                    <div className="flex items-center text-loss">
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                      <span>-0.8% (-0.041)</span>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 bg-muted rounded-md flex flex-col items-center justify-center">
                    <p className="text-sm font-medium">Volume</p>
                    <p className="text-base">231,542</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Open</p>
                    <p className="font-medium">5.019</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Previous Close</p>
                    <p className="font-medium">5.019</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Day Range</p>
                    <p className="font-medium">4.972 - 5.034</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">52 Week Range</p>
                    <p className="font-medium">4.821 - 5.587</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarketPanorama;
