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
      let msg = 'Erreur lors de la récupération de la météo';
      if (err.response) {
        if (err.response.status === 404) {
          msg = err.response.data?.error || 'Ville introuvable ou problème avec la clé API météo.';
        } else {
          msg = err.response.data?.error || `Erreur serveur (${err.response.status})`;
        }
      } else {
        msg = 'Erreur réseau. Le serveur backend est-il accessible ?';
      }
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchWeather };
};
