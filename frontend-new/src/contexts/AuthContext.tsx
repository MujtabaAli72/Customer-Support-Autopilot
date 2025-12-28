// 1. Import the hooks (Values)
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

// 2. Import the type separately
import type { ReactNode } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
/* =======================
   Types
======================= */
interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  // FIX: Removed 'rememberMe' to match Login.tsx
  login: (email: string, password: string) => Promise<void>; 
  logout: () => void;
  isAuthenticated: boolean;
}

/* =======================
   API Setup (Internal)
======================= */
// We define the API here so you don't need a separate 'services/api.ts' file
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Check your Backend Port!
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =======================
   Context
======================= */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =======================
   Provider
======================= */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔐 Check auth on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      // If no token, stop loading and maybe redirect
      if (!token) {
        setLoading(false);
        if (location.pathname !== '/login') {
          navigate('/login');
        }
        return;
      }

      try {
        // Verify token with backend
        const { data } = await api.get('/users/me');
        setUser(data);

        // If on login page but logged in, go to Dashboard
        if (location.pathname === '/login') {
          navigate('/');
        }
      } catch (error) {
        console.error("Auth Check Failed:", error);
        localStorage.removeItem('token');
        setUser(null);
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  /* =======================
     Login Function
  ======================= */
  // FIX: Removed rememberMe from arguments to fix the error in Login.tsx
  const login = async (email: string, password: string) => {
    // 1. Send credentials to backend
    const response = await api.post('/login', {
      email,
      password,
    });

    // 2. Backend returns { access_token: "..." }
    const { access_token } = response.data;

    // 3. Save to LocalStorage
    localStorage.setItem('token', access_token);

    // 4. Fetch User Details immediately to update UI
    const userResponse = await api.get('/users/me');
    setUser(userResponse.data);

    // 5. Redirect
    navigate('/');
  };

  /* =======================
     Logout Function
  ======================= */
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* =======================
   Hook
======================= */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};