'use client';

import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  const { token, logout } = useAuth();

  return (
    <ProtectedRoute>
      <main className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome to your Dashboard!</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
        <p className="text-gray-700">
          You are authenticated. Your token:
          <span className="block mt-2 p-2 bg-gray-100 rounded break-words text-sm text-gray-600">
            {token}
          </span>
        </p>
      </main>
    </ProtectedRoute>
  );
}