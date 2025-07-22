
import { 
  fetchStockDataFromAlphaVantage, 
  fetchStockDataFromFMP, 
  fetchStockDataFromPolygon,
  fetchVIXFromYahoo,
  fetchCommoditiesFromYahoo,
  fetchRealFinancialNews,
  fetchBrazilianFutures
} from './realFinancialApi';

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

// Check if we're in development mode or have API keys configured
const isDevelopment = import.meta.env.DEV;
const hasAPIKeys = !!(
  import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 
  import.meta.env.VITE_FMP_API_KEY || 
  import.meta.env.VITE_POLYGON_API_KEY
);

// Mock data generators (fallback)
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

// Enhanced stock data fetching with multiple API fallbacks
export const fetchStockData = async (symbol: string): Promise<StockData> => {
  console.log(`Fetching real data for ${symbol}...`);
  
  // If no API keys configured, use mock data
  if (!hasAPIKeys) {
    console.warn(`No API keys configured, using mock data for ${symbol}`);
    await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
    
    const basePrices: Record<string, number> = {
      'AAPL': 175, 'MSFT': 380, 'GOOGL': 135, 'AMZN': 145, 'TSLA': 250,
      'META': 320, 'NVDA': 450, 'NFLX': 400, 'BABA': 85, 'CRM': 210,
      'VALE': 12.5, 'ITUB': 6.2, 'BBD': 2.8, 'PBR': 15.3, 'ABEV': 2.4,
      'WIN': 118500, 'WDO': 5.45
    };
    
    return generateMockStockData(symbol, basePrices[symbol] || 100);
  }

  // Try real APIs in order of preference
  const apiMethods = [
    () => fetchStockDataFromFMP(symbol),
    () => fetchStockDataFromAlphaVantage(symbol),
    () => fetchStockDataFromPolygon(symbol),
  ];

  // Special handling for Brazilian futures
  if (symbol === 'WIN' || symbol === 'WDO') {
    try {
      return await fetchBrazilianFutures(symbol);
    } catch (error) {
      console.warn(`Failed to fetch ${symbol} data:`, error);
    }
  }

  // Try each API method
  for (const apiMethod of apiMethods) {
    try {
      const data = await apiMethod();
      console.log(`Successfully fetched ${symbol} from API`);
      return data;
    } catch (error) {
      console.warn(`API call failed for ${symbol}:`, error);
      continue;
    }
  }

  // Fallback to mock data if all APIs fail
  console.warn(`All APIs failed for ${symbol}, using mock data`);
  const basePrices: Record<string, number> = {
    'AAPL': 175, 'MSFT': 380, 'GOOGL': 135, 'AMZN': 145, 'TSLA': 250,
    'META': 320, 'NVDA': 450, 'NFLX': 400, 'BABA': 85, 'CRM': 210,
    'VALE': 12.5, 'ITUB': 6.2, 'BBD': 2.8, 'PBR': 15.3, 'ABEV': 2.4,
    'WIN': 118500, 'WDO': 5.45
  };
  
  return generateMockStockData(symbol, basePrices[symbol] || 100);
};

export const fetchCommodities = async (): Promise<CommodityData[]> => {
  console.log('Fetching real commodities data...');
  
  try {
    const data = await fetchCommoditiesFromYahoo();
    console.log('Successfully fetched commodities from Yahoo Finance');
    return data;
  } catch (error) {
    console.warn('Failed to fetch real commodities data:', error);
    
    // Fallback to mock data
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
  }
};

export const fetchVIX = async (): Promise<VIXData> => {
  console.log('Fetching real VIX data...');
  
  try {
    const data = await fetchVIXFromYahoo();
    console.log('Successfully fetched VIX from Yahoo Finance');
    return data;
  } catch (error) {
    console.warn('Failed to fetch real VIX data:', error);
    
    // Fallback to mock data
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const baseVIX = 18.5;
    const change = (Math.random() - 0.5) * 2;
    
    return {
      value: baseVIX + change,
      change,
      changePercent: (change / baseVIX) * 100,
      timestamp: new Date().toISOString()
    };
  }
};

export const fetchFinancialNews = async (): NewsItem[] => {
  console.log('Fetching real financial news...');
  
  try {
    const realNews = await fetchRealFinancialNews();
    if (realNews.length > 0) {
      console.log('Successfully fetched real financial news');
      return realNews;
    }
  } catch (error) {
    console.warn('Failed to fetch real news:', error);
  }
  
  // Fallback to mock news
  console.log('Using mock news data');
  return generateMockNews();
};
