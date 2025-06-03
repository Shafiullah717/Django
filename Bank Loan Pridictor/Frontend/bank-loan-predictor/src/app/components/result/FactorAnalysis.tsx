import { cn } from "../../lib/utils";

interface Factor {
  name: string;
  impact: number; // Value between 0 and 1
}

interface FactorAnalysisProps {
  factors: Factor[];
}

export default function FactorAnalysis({ factors }: FactorAnalysisProps) {
  // Sort factors by impact (descending)
  const sortedFactors = [...factors].sort((a, b) => b.impact - a.impact);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Key Decision Factors</h2>
      
      <div className="space-y-4">
        {sortedFactors.map((factor, index) => {
          const percentage = Math.round(factor.impact * 100);
          const isPositive = factor.impact > 0;
          
          return (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{factor.name}</span>
                <span className={cn(
                  "font-bold",
                  isPositive ? "text-green-600" : "text-red-600"
                )}>
                  {isPositive ? '+' : ''}{percentage}%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={cn(
                    "h-2.5 rounded-full",
                    isPositive ? "bg-green-500" : "bg-red-500"
                  )}
                  style={{ width: `${Math.abs(percentage)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">How these factors affect your application:</h3>
        <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
          <li>Higher values indicate stronger influence on approval decision</li>
          <li>Positive percentages increase approval likelihood</li>
          <li>Negative percentages decrease approval likelihood</li>
        </ul>
      </div>
    </div>
  );
}