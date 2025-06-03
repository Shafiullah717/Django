// src/app/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { getAllPredictions } from '../../lib/api';
import { HistoricalPredictionData } from '../../lib/types';
import StatusChart from '../../components/Charts/StatusChart';
import GenderChart from '../../components/Charts/GenderChart';
import AreaChart from '../../components/Charts/AreaChart';
import CreditHistoryChart from '../../components/Charts/CreditHistoryChart';
import EducationChart from '../../components/Charts/EducationChart';
import MaritalStatusChart from '../../components/Charts/MaritalStatusChart';
import SelfEmployedChart from '../../components/Charts/SelfEmployedChart';
import DependantsChart from '../../components/Charts/DependantsChart';

export default function DashboardPage() {
  const [predictions, setPredictions] = useState<HistoricalPredictionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllPredictions();
        setPredictions(response.payload);
      } catch (err: any) {
        setError(err.message || 'Failed to load historical data.');
        console.error('Failed to fetch historical data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  // Calculate KPIs
  const totalApplications = predictions.length;
  const approvedApplications = predictions.filter(p => p.status === 'Approved').length;
  const rejectedApplications = predictions.filter(p => p.status === 'Rejected').length;
  const pendingApplications = predictions.filter(p => p.status === 'Pending').length;
  const approvalRate = totalApplications > 0 ? ((approvedApplications / totalApplications) * 100).toFixed(2) : '0.00';


  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
        <p className="text-xl">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[var(--background)] text-red-500">
        <p className="text-xl">Error: {error}</p>
        <p className="ml-2 text-lg text-[var(--foreground)]">Please try again later.</p>
      </div>
    );
  }

  if (totalApplications === 0) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
        <p className="text-xl mb-4">No past prediction data available yet.</p>
        <p className="text-lg">Apply for a loan to see insights here!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 p-6 rounded-lg shadow-lg bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-3xl font-bold mb-6 text-center">Loan Prediction Dashboard</h1>

      {/* KPIs Section */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-md border border-gray-400 bg-blue-100 p-4 text-center shadow-md dark:bg-blue-800 dark:text-white">
          <p className="text-sm text-gray-600 dark:text-gray-300">Total Applications</p>
          <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">{totalApplications}</p>
        </div>
        <div className="rounded-md border border-gray-400 bg-green-100 p-4 text-center shadow-md dark:bg-green-800 dark:text-white">
          <p className="text-sm text-gray-600 dark:text-gray-300">Approved</p>
          <p className="text-3xl font-bold text-green-800 dark:text-green-200">{approvedApplications}</p>
        </div>
        <div className="rounded-md border border-gray-400 bg-red-100 p-4 text-center shadow-md dark:bg-red-800 dark:text-white">
          <p className="text-sm text-gray-600 dark:text-gray-300">Rejected</p>
          <p className="text-3xl font-bold text-red-800 dark:text-red-200">{rejectedApplications}</p>
        </div>
        <div className="rounded-md border border-gray-400 bg-purple-100 p-4 text-center shadow-md dark:bg-purple-800 dark:text-white">
          <p className="text-sm text-gray-600 dark:text-gray-300">Approval Rate</p>
          <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">{approvalRate}%</p>
        </div>
        {pendingApplications > 0 && (
          <div className="rounded-md border border-gray-400 bg-yellow-100 p-4 text-center shadow-md dark:bg-yellow-800 dark:text-white">
            <p className="text-sm text-gray-600 dark:text-gray-300">Pending</p>
            <p className="text-3xl font-bold text-yellow-800 dark:text-yellow-200">{pendingApplications}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Status Chart */}
        <div className="bg-[var(--background)] p-4 rounded-md shadow-md border border-gray-400">
          <h3 className="text-xl font-semibold mb-4 text-center text-[var(--foreground)]">Loan Status Distribution</h3>
          <StatusChart data={predictions} />
        </div>

        {/* Gender Chart */}
        <div className="bg-[var(--background)] p-4 rounded-md shadow-md border border-gray-400">
          <h3 className="text-xl font-semibold mb-4 text-center text-[var(--foreground)]">Applicant Gender Distribution</h3>
          <GenderChart data={predictions} />
        </div>

        {/* Area Chart */}
        <div className="bg-[var(--background)] p-4 rounded-md shadow-md border border-gray-400">
          <h3 className="text-xl font-semibold mb-4 text-center text-[var(--foreground)]">Applicant Area Distribution</h3>
          <AreaChart data={predictions} />
        </div>

        {/* Credit History Chart */}
        <div className="bg-[var(--background)] p-4 rounded-md shadow-md border border-gray-400">
          <h3 className="text-xl font-semibold mb-4 text-center text-[var(--foreground)]">Credit History Distribution</h3>
          <CreditHistoryChart data={predictions} />
        </div>

        {/* Education Chart */}
        <div className="bg-[var(--background)] p-4 rounded-md shadow-md border border-gray-400">
          <h3 className="text-xl font-semibold mb-4 text-center text-[var(--foreground)]">Education Distribution</h3>
          <EducationChart data={predictions} />
        </div>

        {/* Marital Status Chart */}
        <div className="bg-[var(--background)] p-4 rounded-md shadow-md border border-gray-400">
          <h3 className="text-xl font-semibold mb-4 text-center text-[var(--foreground)]">Marital Status Distribution</h3>
          <MaritalStatusChart data={predictions} />
        </div>

        {/* Self Employed Chart */}
        <div className="bg-[var(--background)] p-4 rounded-md shadow-md border border-gray-400">
          <h3 className="text-xl font-semibold mb-4 text-center text-[var(--foreground)]">Self-Employed Distribution</h3>
          <SelfEmployedChart data={predictions} />
        </div>

        {/* Dependants Chart */}
        <div className="bg-[var(--background)] p-4 rounded-md shadow-md border border-gray-400">
          <h3 className="text-xl font-semibold mb-4 text-center text-[var(--foreground)]">Dependants Distribution</h3>
          <DependantsChart data={predictions} />
        </div>

        {/* Placeholder for future charts if needed (e.g., Income Distribution, Loan Amount Distribution, Time Series) */}
        {/* <div className="bg-[var(--background)] p-4 rounded-md shadow-md border border-gray-400">
          <h3 className="text-xl font-semibold mb-4 text-center text-[var(--foreground)]">More Insights (Soon)</h3>
          <div className="h-48 flex items-center justify-center text-gray-500">
            <p>Further charts can be added here!</p>
          </div>
        </div> */}
      </div>

      {/* Raw Data Table (remains unchanged) */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">All Predictions</h2>
        <div className="overflow-x-auto rounded-md border border-gray-400">
          <table className="min-w-full bg-[var(--background)] text-[var(--foreground)]">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Income</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Loan Amt</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Credit History</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Status</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Date</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p) => (
                <tr key={p.id} className="border-t border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2">{p.firstname} {p.lastname}</td>
                  <td className="px-4 py-2">${p.applicantincome.toLocaleString()}</td>
                  <td className="px-4 py-2">${p.loanamt.toLocaleString()}</td>
                  <td className="px-4 py-2">{p.credithistory === 1 ? 'Met' : 'Not Met'}</td>
                  <td className={`px-4 py-2 font-bold ${p.status === 'Approved' ? 'text-green-600' : p.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {p.status}
                  </td>
                  <td className="px-4 py-2 text-sm">{new Date(p.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}