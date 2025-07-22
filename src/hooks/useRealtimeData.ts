
import { useState, useEffect, useCallback } from 'react';
import { 
  StockData, 
  NewsItem, 
  CommodityData, 
  VIXData,
  fetchStockData,
  fetchCommodities,
  fetchVIX,
  generateMockNews
} from '@/services/financialApi';

export const useRealtimeStock = (symbol: string, intervalMs: number = 5000) => {
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const stockData = await fetchStockData(symbol);
      setData(stockData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, intervalMs);
    return () => clearInterval(interval);
  }, [fetchData, intervalMs]);

  return { data, loading, error, refetch: fetchData };
};

export const useRealtimeNews = (intervalMs: number = 30000) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = () => {
      const mockNews = generateMockNews();
      setNews(mockNews);
      setLoading(false);
    };

    fetchNews();
    const interval = setInterval(fetchNews, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return { news, loading };
};

export const useRealtimeCommodities = (intervalMs: number = 10000) => {
  const [commodities, setCommodities] = useState<CommodityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCommodities();
        setCommodities(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch commodities:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return { commodities, loading };
};

export const useRealtimeVIX = (intervalMs: number = 5000) => {
  const [vix, setVIX] = useState<VIXData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVIX();
        setVIX(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch VIX:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return { vix, loading };
};
