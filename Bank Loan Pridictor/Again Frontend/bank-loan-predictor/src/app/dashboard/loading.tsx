// src/app/dashboard/loading.tsx
import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-blue-500 border-t-transparent"></div>
        <p className="text-xl">Loading dashboard...</p>
      </div>
      <p className="mt-2 text-md">Fetching historical loan prediction data.</p>
    </div>
  );
}