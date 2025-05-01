'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function DashboardPage() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example: only show dashboard if token exists
    if (token) {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div className="p-4">Loading Dashboard...</div>;
  }

  if (!token) {
    return (
      <div className="p-4 text-red-600">
        You are not logged in. Please <a href="/login" className="text-blue-600 underline">login</a>.
      </div>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard!</h1>
      <p className="text-gray-700">You are authenticated. Your token: <span className="break-words">{token}</span></p>
    </main>
  );
}
