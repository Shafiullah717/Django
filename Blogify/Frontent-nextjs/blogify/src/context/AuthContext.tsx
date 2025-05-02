'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Adjust to match your backend
});

interface AuthContextProps {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  username: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (storedToken) setToken(storedToken);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const login = (newToken: string, newUsername: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', newUsername);
    setToken(newToken);
    setUsername(newUsername);
    router.push('/dashboard');
  };

  const logout = async () => {
    try {
      if (token) {
        await API.post('logout/', {}, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      }
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setToken(null);
      setUsername(null);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
