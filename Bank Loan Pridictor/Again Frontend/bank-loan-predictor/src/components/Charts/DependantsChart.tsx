// src/components/Charts/DependantsChart.tsx
'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2'; // Pie is fine for a few categories, but bar might also work for more dependants
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { HistoricalPredictionData } from '../../lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DependantsChartProps {
  data: HistoricalPredictionData[];
}

const DependantsChart: React.FC<DependantsChartProps> = ({ data }) => {
  // Process data to count dependants occurrences
  const dependantsCounts = data.reduce((acc, prediction) => {
    const dependants = prediction.dependants;
    // You might want to group 3+ dependants into one category
    const label = dependants >= 3 ? '3+' : String(dependants); // Convert number to string for label
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort labels numerically for better chart order (0, 1, 2, 3+)
  const sortedLabels = Object.keys(dependantsCounts).sort((a, b) => {
    if (a === '3+') return 1;
    if (b === '3+') return -1;
    return Number(a) - Number(b);
  });

  const sortedData = sortedLabels.map(label => dependantsCounts[label]);

  const chartData = {
    labels: sortedLabels,
    datasets: [
      {
        data: sortedData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',  // Red (0)
          'rgba(54, 162, 235, 0.6)',  // Blue (1)
          'rgba(255, 205, 86, 0.6)',  // Yellow (2)
          'rgba(75, 192, 192, 0.6)',  // Green (3+)
          'rgba(153, 102, 255, 0.6)', // Purple (Fallback)
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
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
        text: 'Dependants Distribution',
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

export default DependantsChart;