'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../lib/api';

export default function RegisterPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post('register/', form);
      if (res.data.token) {
        login(res.data.token);
      } else {
        setError('Registration succeeded but no token returned');
      }
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
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
          <button type="submit" className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
