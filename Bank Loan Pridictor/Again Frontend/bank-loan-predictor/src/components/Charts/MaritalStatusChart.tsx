// src/components/Charts/MaritalStatusChart.tsx
'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { HistoricalPredictionData } from '../../lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface MaritalStatusChartProps {
  data: HistoricalPredictionData[];
}

const MaritalStatusChart: React.FC<MaritalStatusChartProps> = ({ data }) => {
  // Process data to count marital status occurrences
  const maritalStatusCounts = data.reduce((acc, prediction) => {
    if (prediction.married === 'Yes' || prediction.married === 'No') {
      acc[prediction.married] = (acc[prediction.married] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(maritalStatusCounts),
    datasets: [
      {
        data: Object.values(maritalStatusCounts),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Blue for Yes
          'rgba(255, 99, 132, 0.6)', // Red for No
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
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
        text: 'Marital Status Distribution',
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

export default MaritalStatusChart;