'use client';

import { useState } from 'react';
import API from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post('login/', form);
      const { token, username } = res.data;

      if (token && username) {
        login(token, username); // ✅ updated to pass both token and username
      } else {
        setError('Login failed: missing token or username');
      }
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-black p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-white">Login</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border rounded"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
