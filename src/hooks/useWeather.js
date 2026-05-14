import { useState, useCallback } from 'react';
import { getWeather } from '../api/weather';

export const useWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city = '', option = 'weather') => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeather(city, option);
      setData(weatherData);
      return weatherData;
    } catch (err) {
      const msg = err.response?.data?.error || 'Erreur lors de la récupération de la météo';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchWeather };
};
