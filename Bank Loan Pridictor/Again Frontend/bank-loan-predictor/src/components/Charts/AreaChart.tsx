// src/components/Charts/AreaChart.tsx
'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { HistoricalPredictionData } from '../../lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface AreaChartProps {
  data: HistoricalPredictionData[];
}

const AreaChart: React.FC<AreaChartProps> = ({ data }) => {
  // Process data to count area occurrences
  const areaCounts = data.reduce((acc, prediction) => {
    // Ensure 'area' is one of the valid types
    if (prediction.area === 'Rural' || prediction.area === 'Semiurban' || prediction.area === 'Urban') {
      acc[prediction.area] = (acc[prediction.area] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(areaCounts),
    datasets: [
      {
        data: Object.values(areaCounts),
        backgroundColor: [
          'rgba(255, 205, 86, 0.6)',   // Yellow for Rural
          'rgba(75, 192, 192, 0.6)',   // Teal for Semiurban
          'rgba(153, 102, 255, 0.6)',  // Purple for Urban
          'rgba(201, 203, 207, 0.6)',  // Grey for unknown/other
        ],
        borderColor: [
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
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
        text: 'Applicant Area Distribution',
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

export default AreaChart;