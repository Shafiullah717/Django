import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Factor {
  name: string;
  impact: number;
}

interface ImpactChartProps {
  factors: Factor[];
}

export default function ImpactChart({ factors }: ImpactChartProps) {
  // Sort factors by absolute impact and take top 5
  const sortedFactors = [...factors]
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
    .slice(0, 5);
  
  // Transform data for chart with color coding
  const chartData = sortedFactors.map(factor => ({
    name: factor.name,
    value: Math.abs(factor.impact),
    impact: factor.impact,
    fill: factor.impact > 0 ? '#10B981' : '#EF4444'
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium">{data.name}</p>
          <p className={data.impact > 0 ? "text-green-600" : "text-red-600"}>
            Impact: {(data.impact * 100).toFixed(1)}%
          </p>
          <p className="text-gray-600 text-sm">
            {data.impact > 0 
              ? "Increases approval likelihood" 
              : "Decreases approval likelihood"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          domain={[0, 1]} 
          tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
        />
        <YAxis 
          dataKey="name" 
          type="category" 
          width={120}
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          dataKey="value" 
          name="Impact Strength"
          barSize={20}
        >
          {chartData.map((entry, index) => (
            <rect 
              key={`bar-${index}`} 
              fill={entry.fill} 
              rx="4" 
              ry="4" // Rounded corners
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}