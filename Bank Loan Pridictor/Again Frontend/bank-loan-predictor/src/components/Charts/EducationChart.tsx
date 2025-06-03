// src/components/Charts/EducationChart.tsx
'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { HistoricalPredictionData } from '../../lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface EducationChartProps {
  data: HistoricalPredictionData[];
}

const EducationChart: React.FC<EducationChartProps> = ({ data }) => {
  // Process data to count education occurrences
  const educationCounts = data.reduce((acc, prediction) => {
    // Note: Historical data has 'Not_Graduate', while form submission uses 'Not Graduate'
    // Normalize to 'Not Graduate' for consistent display
    const label = prediction.graduatededucation === 'Not_Graduate' ? 'Not Graduate' : prediction.graduatededucation;
    if (label === 'Graduate' || label === 'Not Graduate') { // Ensure valid types
        acc[label] = (acc[label] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(educationCounts),
    datasets: [
      {
        data: Object.values(educationCounts),
        backgroundColor: [
          'rgba(255, 159, 64, 0.6)', // Orange for Graduate
          'rgba(153, 102, 255, 0.6)', // Purple for Not Graduate
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
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
        text: 'Education Distribution',
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

export default EducationChart;