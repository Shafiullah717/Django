// src/components/Charts/StatusChart.tsx
'use client'; // This component uses client-side interactivity (charts)

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { HistoricalPredictionData } from '../../lib/types';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface StatusChartProps {
  data: HistoricalPredictionData[];
}

const StatusChart: React.FC<StatusChartProps> = ({ data }) => {
  // Process data to count statuses
  const statusCounts = data.reduce((acc, prediction) => {
    acc[prediction.status] = (acc[prediction.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>); // Initialize with string keys and number values

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Approved (Teal)
          'rgba(255, 99, 132, 0.6)', // Rejected (Red)
          'rgba(255, 205, 86, 0.6)', // Pending (Yellow)
          'rgba(54, 162, 235, 0.6)', // Blue (for other potential statuses)
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows flexible sizing
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'var(--foreground)', // Use CSS variable for legend text color
        },
      },
      title: {
        display: true,
        text: 'Loan Application Status Distribution',
        color: 'var(--foreground)', // Use CSS variable for title color
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="relative h-80 w-full md:h-96"> {/* Fixed height for consistent chart size */}
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default StatusChart;