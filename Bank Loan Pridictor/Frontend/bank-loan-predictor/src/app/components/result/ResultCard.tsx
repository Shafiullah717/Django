import { cn } from "../../lib/utils";

interface ResultCardProps {
  status: 'Approved' | 'Rejected';
  probability: number;
}

export default function ResultCard({ status, probability }: ResultCardProps) {
  const isApproved = status === 'Approved';
  const percentage = Math.round(probability * 100);
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={cn(
        "p-6 text-white text-center",
        isApproved ? "bg-green-500" : "bg-red-500"
      )}>
        <h2 className="text-2xl font-bold mb-2">Loan Application Status</h2>
        <div className="text-5xl font-extrabold mb-4">{status}</div>
        <p className="opacity-90">Confidence Level: {percentage}%</p>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Risk Assessment</span>
          <span className="text-sm font-medium">{percentage}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className={cn(
              "h-4 rounded-full",
              isApproved ? "bg-green-500" : "bg-red-500"
            )}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <div className="text-center">
            <div className="text-2xl font-bold">Low</div>
            <div className="text-gray-500 text-sm">Risk</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">Moderate</div>
            <div className="text-gray-500 text-sm">Risk</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">High</div>
            <div className="text-gray-500 text-sm">Risk</div>
          </div>
        </div>
      </div>
    </div>
  );
}