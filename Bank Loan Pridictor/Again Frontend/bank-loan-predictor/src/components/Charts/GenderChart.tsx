// src/components/Charts/GenderChart.tsx
'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { HistoricalPredictionData } from '../../lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface GenderChartProps {
  data: HistoricalPredictionData[];
}

const GenderChart: React.FC<GenderChartProps> = ({ data }) => {
  // Process data to count gender occurrences
  const genderCounts = data.reduce((acc, prediction) => {
    // Ensure 'gender' is either 'Male' or 'Female' and not an empty string
    if (prediction.gender === 'Male' || prediction.gender === 'Female') {
      acc[prediction.gender] = (acc[prediction.gender] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(genderCounts),
    datasets: [
      {
        data: Object.values(genderCounts),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Blue for Male
          'rgba(255, 99, 132, 0.6)', // Red for Female
          'rgba(201, 203, 207, 0.6)', // Grey for unknown/other
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(201, 203, 207, 1)',
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
        text: 'Applicant Gender Distribution',
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

export default GenderChart;