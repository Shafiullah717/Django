// src/components/Charts/SelfEmployedChart.tsx
'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { HistoricalPredictionData } from '../../lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SelfEmployedChartProps {
  data: HistoricalPredictionData[];
}

const SelfEmployedChart: React.FC<SelfEmployedChartProps> = ({ data }) => {
  // Process data to count self-employed status occurrences
  const selfEmployedCounts = data.reduce((acc, prediction) => {
    if (prediction.selfemployed === 'Yes' || prediction.selfemployed === 'No') {
      acc[prediction.selfemployed] = (acc[prediction.selfemployed] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(selfEmployedCounts),
    datasets: [
      {
        data: Object.values(selfEmployedCounts),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Teal for Yes
          'rgba(255, 205, 86, 0.6)', // Yellow for No
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)',
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
        text: 'Self-Employed Distribution',
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

export default SelfEmployedChart;