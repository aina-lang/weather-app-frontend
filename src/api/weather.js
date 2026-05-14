import client from './client';

export const getWeather = async (city = '', option = 'weather') => {
  const response = await client.get('/weather/', {
    params: { city, option },
  });
  return response.data;
};

export const getHealth = async () => {
  const response = await client.get('/health/');
  return response.data;
};
