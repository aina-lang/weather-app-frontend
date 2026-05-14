import client from './client';

export const login = async (username, password) => {
  const response = await client.post('/login/', { username, password });
  return response.data;
};

export const register = async (username, password) => {
  const response = await client.post('/register/', { username, password });
  return response.data;
};

export const refreshToken = async (refresh) => {
  const response = await client.post('/token/refresh/', { refresh });
  return response.data;
};
