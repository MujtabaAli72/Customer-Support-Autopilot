import axios from 'axios';
import type { AxiosError, AxiosResponse, AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ==================
// Types
// ==================
export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

// ==================
// Axios Instance
// ==================
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}) as AxiosInstance & {
  me: () => Promise<User>;
  login: (email: string, password: string, rememberMe: boolean) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  setAuthToken: (token: string | null) => void;
};

// ==================
// Request Interceptor
// ==================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==================
// Response Interceptor
// ==================
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================
// Helper: Set Token
// ==================
api.setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common.Authorization;
  }
};

// ==================
// API Methods
// ==================
api.me = async (): Promise<User> => {
  try {
    const response = await api.get('/api/users/me');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

api.login = async (
  email: string,
  password: string,
  rememberMe: boolean
): Promise<LoginResponse> => {
  const response = await api.post('/api/login', {
    email,
    password,
    remember_me: rememberMe,
  });

  api.setAuthToken(response.data.access_token);
  return response.data;
};

api.logout = async (): Promise<void> => {
  try {
    await api.post('/api/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    api.setAuthToken(null);
  }
};

export default api;
