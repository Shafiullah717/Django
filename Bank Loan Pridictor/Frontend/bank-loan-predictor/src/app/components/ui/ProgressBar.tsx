import { cn } from '../../lib/utils';

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between relative">
        {/* Progress line */}
        <div 
          className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 -z-10" 
          aria-hidden="true"
        />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 -z-10 transition-all duration-500"
          style={{ 
            width: `calc(${(currentStep / (steps.length - 1)) * 100}%)` 
          }}
        />
        
        {/* Step indicators */}
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center border-2",
              index <= currentStep 
                ? "bg-blue-600 border-blue-700 text-white" 
                : "bg-white border-gray-300 text-gray-400"
            )}>
              {index + 1}
            </div>
            <span className={cn(
              "mt-2 text-sm font-medium",
              index <= currentStep ? "text-blue-600" : "text-gray-500"
            )}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}