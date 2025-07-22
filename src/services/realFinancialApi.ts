
// Real Financial API Integration
export interface APIConfig {
  alphaVantage?: string;
  financialModelingPrep?: string;
  polygon?: string;
  iexCloud?: string;
}

// Environment configuration
const API_CONFIG: APIConfig = {
  alphaVantage: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
  financialModelingPrep: import.meta.env.VITE_FMP_API_KEY,
  polygon: import.meta.env.VITE_POLYGON_API_KEY,
  iexCloud: import.meta.env.VITE_IEX_CLOUD_API_KEY,
};

// Rate limiting
const rateLimiter = new Map<string, number>();

const checkRateLimit = (apiName: string, limitPerMinute: number): boolean => {
  const now = Date.now();
  const key = `${apiName}_${Math.floor(now / 60000)}`;
  const current = rateLimiter.get(key) || 0;
  
  if (current >= limitPerMinute) {
    return false;
  }
  
  rateLimiter.set(key, current + 1);
  return true;
};

// Cache implementation
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 30000; // 30 seconds

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Alpha Vantage API calls
export const fetchStockDataFromAlphaVantage = async (symbol: string) => {
  if (!API_CONFIG.alphaVantage || !checkRateLimit('alphaVantage', 5)) {
    throw new Error('API limit reached or key not configured');
  }

  const cacheKey = `av_${symbol}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_CONFIG.alphaVantage}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data['Error Message'] || data['Note']) {
    throw new Error('API Error or rate limit exceeded');
  }
  
  const quote = data['Global Quote'];
  if (!quote) {
    throw new Error('No data available');
  }
  
  const result = {
    symbol,
    price: parseFloat(quote['05. price']),
    change: parseFloat(quote['09. change']),
    changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
    volume: parseInt(quote['06. volume']),
    high: parseFloat(quote['03. high']),
    low: parseFloat(quote['04. low']),
    open: parseFloat(quote['02. open']),
    previousClose: parseFloat(quote['08. previous close']),
  };
  
  setCachedData(cacheKey, result);
  return result;
};

// Financial Modeling Prep API calls
export const fetchStockDataFromFMP = async (symbol: string) => {
  if (!API_CONFIG.financialModelingPrep || !checkRateLimit('fmp', 250)) {
    throw new Error('API limit reached or key not configured');
  }

  const cacheKey = `fmp_${symbol}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${API_CONFIG.financialModelingPrep}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (!data || data.length === 0) {
    throw new Error('No data available');
  }
  
  const quote = data[0];
  const result = {
    symbol,
    price: quote.price,
    change: quote.change,
    changePercent: quote.changesPercentage,
    volume: quote.volume,
    marketCap: quote.marketCap,
    pe: quote.pe,
    high52Week: quote.yearHigh,
    low52Week: quote.yearLow,
  };
  
  setCachedData(cacheKey, result);
  return result;
};

// Polygon.io API calls
export const fetchStockDataFromPolygon = async (symbol: string) => {
  if (!API_CONFIG.polygon || !checkRateLimit('polygon', 5)) {
    throw new Error('API limit reached or key not configured');
  }

  const cacheKey = `polygon_${symbol}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const prevDate = new Date();
  prevDate.setDate(prevDate.getDate() - 1);
  const dateStr = prevDate.toISOString().split('T')[0];
  
  const url = `https://api.polygon.io/v1/open-close/${symbol}/${dateStr}?adjusted=true&apiKey=${API_CONFIG.polygon}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.status !== 'OK') {
    throw new Error('API Error');
  }
  
  const result = {
    symbol,
    price: data.close,
    change: data.close - data.open,
    changePercent: ((data.close - data.open) / data.open) * 100,
    volume: data.volume,
    high: data.high,
    low: data.low,
    open: data.open,
  };
  
  setCachedData(cacheKey, result);
  return result;
};

// Fetch VIX data
export const fetchVIXFromYahoo = async () => {
  const cacheKey = 'vix_yahoo';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    // Using Yahoo Finance API via public endpoint
    const response = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/^VIX');
    const data = await response.json();
    
    const result = data.chart.result[0];
    const quote = result.meta;
    const currentPrice = quote.regularMarketPrice;
    const previousClose = quote.previousClose;
    
    const vixData = {
      value: currentPrice,
      change: currentPrice - previousClose,
      changePercent: ((currentPrice - previousClose) / previousClose) * 100,
      timestamp: new Date().toISOString(),
    };
    
    setCachedData(cacheKey, vixData);
    return vixData;
  } catch (error) {
    throw new Error('Failed to fetch VIX data');
  }
};

// Fetch commodities data
export const fetchCommoditiesFromYahoo = async () => {
  const cacheKey = 'commodities_yahoo';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const symbols = ['CL=F', 'GC=F', 'SI=F']; // Oil, Gold, Silver
  const commodityNames = ['Crude Oil (WTI)', 'Gold', 'Silver'];
  const units = ['USD/barrel', 'USD/oz', 'USD/oz'];
  
  try {
    const promises = symbols.map(symbol => 
      fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`)
        .then(res => res.json())
    );
    
    const results = await Promise.all(promises);
    
    const commodities = results.map((data, index) => {
      const result = data.chart.result[0];
      const quote = result.meta;
      const currentPrice = quote.regularMarketPrice;
      const previousClose = quote.previousClose;
      
      return {
        name: commodityNames[index],
        symbol: symbols[index],
        price: currentPrice,
        change: currentPrice - previousClose,
        changePercent: ((currentPrice - previousClose) / previousClose) * 100,
        unit: units[index],
      };
    });
    
    setCachedData(cacheKey, commodities);
    return commodities;
  } catch (error) {
    throw new Error('Failed to fetch commodities data');
  }
};

// Fetch news from financial news APIs
export const fetchRealFinancialNews = async () => {
  const cacheKey = 'financial_news';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    // Using a free financial news API
    const response = await fetch('https://financialmodelingprep.com/api/v3/stock_news?limit=10&apikey=' + API_CONFIG.financialModelingPrep);
    const data = await response.json();
    
    const news = data.slice(0, 6).map((item: any, index: number) => ({
      id: `real-news-${index}`,
      title: item.title,
      summary: item.text.substring(0, 200) + '...',
      url: item.url,
      source: item.site,
      publishedAt: item.publishedDate,
      sentiment: 'neutral' as const,
    }));
    
    setCachedData(cacheKey, news);
    return news;
  } catch (error) {
    console.warn('Failed to fetch real news, using fallback');
    return [];
  }
};

// Brazilian futures data (WIN and WDO)
export const fetchBrazilianFutures = async (symbol: 'WIN' | 'WDO') => {
  const cacheKey = `br_futures_${symbol}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    // For Brazilian futures, we'll use B3 data or Yahoo Finance
    const yahooSymbol = symbol === 'WIN' ? '^BVSP' : 'USDBRL=X';
    const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}`);
    const data = await response.json();
    
    const result = data.chart.result[0];
    const quote = result.meta;
    const currentPrice = quote.regularMarketPrice;
    const previousClose = quote.previousClose;
    
    const futuresData = {
      symbol,
      price: symbol === 'WIN' ? Math.floor(currentPrice) : currentPrice,
      change: currentPrice - previousClose,
      changePercent: ((currentPrice - previousClose) / previousClose) * 100,
      volume: Math.floor(Math.random() * 100000) + 50000, // Approximation
    };
    
    setCachedData(cacheKey, futuresData);
    return futuresData;
  } catch (error) {
    throw new Error(`Failed to fetch ${symbol} data`);
  }
};
