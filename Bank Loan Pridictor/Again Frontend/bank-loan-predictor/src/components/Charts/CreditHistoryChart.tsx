// src/components/Charts/CreditHistoryChart.tsx
'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { HistoricalPredictionData } from '../../lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CreditHistoryChartProps {
  data: HistoricalPredictionData[];
}

const CreditHistoryChart: React.FC<CreditHistoryChartProps> = ({ data }) => {
  // Process data to count credit history occurrences
  const creditHistoryCounts = data.reduce((acc, prediction) => {
    const label = prediction.credithistory === 1 ? 'Met' : 'Not Met';
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(creditHistoryCounts),
    datasets: [
      {
        data: Object.values(creditHistoryCounts),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Greenish for Met
          'rgba(255, 99, 132, 0.6)', // Reddish for Not Met
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'var(--foreground)',
        },
      },
      title: {
        display: true,
        text: 'Credit History Distribution',
        color: 'var(--foreground)',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="relative h-80 w-full md:h-96">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default CreditHistoryChart;