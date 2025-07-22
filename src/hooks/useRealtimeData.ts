
import { useState, useEffect, useCallback } from 'react';
import { 
  StockData, 
  NewsItem, 
  CommodityData, 
  VIXData,
  fetchStockData,
  fetchCommodities,
  fetchVIX,
  fetchFinancialNews
} from '@/services/financialApi';

// Market hours checker
const isMarketOpen = (): boolean => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();
  
  // Check if it's a weekday
  if (day === 0 || day === 6) return false;
  
  // Market hours: 9:30 AM - 4:00 PM EST (simplified)
  return hour >= 9 && hour < 16;
};

// Dynamic interval based on market status
const getDynamicInterval = (baseInterval: number): number => {
  const marketOpen = isMarketOpen();
  return marketOpen ? baseInterval : baseInterval * 3; // Slower updates when market is closed
};

export const useRealtimeStock = (symbol: string, intervalMs: number = 5000) => {
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const stockData = await fetchStockData(symbol);
      setData(stockData);
      setLastUpdate(new Date());
      console.log(`Updated ${symbol} at ${new Date().toLocaleTimeString()}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      console.error(`Error fetching ${symbol}:`, errorMessage);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchData();
    
    const dynamicInterval = getDynamicInterval(intervalMs);
    const interval = setInterval(fetchData, dynamicInterval);
    
    console.log(`Started polling ${symbol} every ${dynamicInterval}ms (market ${isMarketOpen() ? 'open' : 'closed'})`);
    
    return () => {
      clearInterval(interval);
      console.log(`Stopped polling ${symbol}`);
    };
  }, [fetchData, intervalMs]);

  return { data, loading, error, refetch: fetchData, lastUpdate };
};

export const useRealtimeNews = (intervalMs: number = 300000) => { // 5 minutes
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await fetchFinancialNews();
        setNews(newsData);
        setLastUpdate(new Date());
        console.log(`Updated news at ${new Date().toLocaleTimeString()}`);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, intervalMs);
    
    console.log(`Started polling news every ${intervalMs}ms`);
    
    return () => {
      clearInterval(interval);
      console.log('Stopped polling news');
    };
  }, [intervalMs]);

  return { news, loading, lastUpdate };
};

export const useRealtimeCommodities = (intervalMs: number = 10000) => {
  const [commodities, setCommodities] = useState<CommodityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCommodities();
        setCommodities(data);
        setLastUpdate(new Date());
        console.log(`Updated commodities at ${new Date().toLocaleTimeString()}`);
      } catch (error) {
        console.error('Failed to fetch commodities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const dynamicInterval = getDynamicInterval(intervalMs);
    const interval = setInterval(fetchData, dynamicInterval);
    
    console.log(`Started polling commodities every ${dynamicInterval}ms`);
    
    return () => {
      clearInterval(interval);
      console.log('Stopped polling commodities');
    };
  }, [intervalMs]);

  return { commodities, loading, lastUpdate };
};

export const useRealtimeVIX = (intervalMs: number = 5000) => {
  const [vix, setVIX] = useState<VIXData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVIX();
        setVIX(data);
        setLastUpdate(new Date());
        console.log(`Updated VIX at ${new Date().toLocaleTimeString()}`);
      } catch (error) {
        console.error('Failed to fetch VIX:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const dynamicInterval = getDynamicInterval(intervalMs);
    const interval = setInterval(fetchData, dynamicInterval);
    
    console.log(`Started polling VIX every ${dynamicInterval}ms`);
    
    return () => {
      clearInterval(interval);
      console.log('Stopped polling VIX');
    };
  }, [intervalMs]);

  return { vix, loading, lastUpdate };
};
