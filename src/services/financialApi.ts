
export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  pe?: number;
  high52Week?: number;
  low52Week?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface CommodityData {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  unit: string;
}

export interface VIXData {
  value: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

// Mock data generators for real-time simulation
export const generateMockStockData = (symbol: string, basePrice: number): StockData => {
  const change = (Math.random() - 0.5) * 10;
  const changePercent = (change / basePrice) * 100;
  
  return {
    symbol,
    price: basePrice + change,
    change,
    changePercent,
    volume: Math.floor(Math.random() * 1000000) + 100000,
    marketCap: Math.floor(Math.random() * 1000000000000) + 100000000000,
    pe: Math.random() * 50 + 10,
    high52Week: basePrice * (1 + Math.random() * 0.5),
    low52Week: basePrice * (1 - Math.random() * 0.3),
  };
};

export const generateMockNews = (): NewsItem[] => {
  const headlines = [
    "Federal Reserve hints at interest rate adjustments",
    "Tech stocks surge amid AI breakthrough announcements",
    "Oil prices fluctuate on geopolitical tensions",
    "Brazilian market shows resilience despite global headwinds",
    "Cryptocurrency market volatility continues",
    "Emerging markets outperform developed economies"
  ];
  
  return headlines.map((title, index) => ({
    id: `news-${index}`,
    title,
    summary: `${title}. Market analysts provide insights on the latest developments and their potential impact on global financial markets.`,
    url: `#news-${index}`,
    source: ['Reuters', 'Bloomberg', 'Financial Times', 'WSJ'][Math.floor(Math.random() * 4)],
    publishedAt: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as 'positive' | 'negative' | 'neutral',
  }));
};

export const fetchStockData = async (symbol: string): Promise<StockData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
  
  const basePrices: Record<string, number> = {
    'AAPL': 175,
    'MSFT': 380,
    'GOOGL': 135,
    'AMZN': 145,
    'TSLA': 250,
    'META': 320,
    'NVDA': 450,
    'NFLX': 400,
    'BABA': 85,
    'CRM': 210,
    'VALE': 12.5,
    'ITUB': 6.2,
    'BBD': 2.8,
    'PBR': 15.3,
    'ABEV': 2.4,
  };
  
  return generateMockStockData(symbol, basePrices[symbol] || 100);
};

export const fetchCommodities = async (): Promise<CommodityData[]> => {
  await new Promise(resolve => setTimeout(resolve, 150));
  
  return [
    {
      name: 'Crude Oil (WTI)',
      symbol: 'CL=F',
      price: 82.45 + (Math.random() - 0.5) * 5,
      change: (Math.random() - 0.5) * 2,
      changePercent: (Math.random() - 0.5) * 3,
      unit: 'USD/barrel'
    },
    {
      name: 'Gold',
      symbol: 'GC=F',
      price: 2020 + (Math.random() - 0.5) * 50,
      change: (Math.random() - 0.5) * 20,
      changePercent: (Math.random() - 0.5) * 1.5,
      unit: 'USD/oz'
    },
    {
      name: 'Silver',
      symbol: 'SI=F',
      price: 24.5 + (Math.random() - 0.5) * 2,
      change: (Math.random() - 0.5) * 0.5,
      changePercent: (Math.random() - 0.5) * 2,
      unit: 'USD/oz'
    }
  ];
};

export const fetchVIX = async (): Promise<VIXData> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const baseVIX = 18.5;
  const change = (Math.random() - 0.5) * 2;
  
  return {
    value: baseVIX + change,
    change,
    changePercent: (change / baseVIX) * 100,
    timestamp: new Date().toISOString()
  };
};
