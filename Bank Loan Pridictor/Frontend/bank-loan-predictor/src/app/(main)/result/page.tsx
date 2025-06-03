'use client';

import { useLoanContext } from '@/context/LoanContext';
import ResultCard from '@/app/components/result/ResultCard';
import FactorAnalysis from '@/app/components/result/FactorAnalysis';
import ApprovalRateChart from '@/app/components/charts/ApprovalRateChart';
import ImpactChart from '@/app/components/charts/ImpactChart';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/ui/Button';
import { useEffect, useState } from 'react';
import { LoanApplication, PredictionResult } from '@/types/loan';

export default function ResultPage() {
  const router = useRouter();
  const context = useLoanContext();
  
  // State to hold application data and result
  const [application, setApplication] = useState<LoanApplication>({
    firstname: '',
    lastname: '',
    dependants: 0,
    applicantincome: 0,
    coapplicantincome: 0,
    loanamt: 0,
    loanterm: 0,
    credithistory: 0,
    gender: 'Male',
    married: 'No',
    graduatededucation: 'Not Graduate',
    selfemployed: 'No',
    area: 'Urban',
  });
  
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isContextAvailable, setIsContextAvailable] = useState(false);

  useEffect(() => {
    if (context) {
      setIsContextAvailable(true);
      setApplication(context.application);
      setResult(context.result);
    }
  }, [context]);

  const handleNewApplication = () => {
    if (context) {
      context.reset();
    }
    router.push('/');
  };

  // Fallback UI if context is not available
  if (!isContextAvailable) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Application Loading</h1>
        <p className="text-lg text-gray-600 mb-8">
          Loading your application data...
        </p>
        <Button 
          onClick={() => router.push('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg"
        >
          Return to Application
        </Button>
      </div>
    );
  }

  // Fallback UI if no result exists
  if (!result) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Loan Application Result Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          It seems you haven't submitted a loan application yet, or your session has expired.
        </p>
        <Button 
          onClick={handleNewApplication}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg"
        >
          Start New Application
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Loan Application Result
        </h1>
        <Button 
          onClick={handleNewApplication}
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Apply Again
        </Button>
      </div>
      
      <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Applicant Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">{application.firstname} {application.lastname}</p>
          </div>
          <div>
            <p className="text-gray-600">Loan Amount</p>
            <p className="font-medium">${application.loanamt.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Loan Term</p>
            <p className="font-medium">{application.loanterm} months</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ResultCard 
            status={result.status} 
            probability={result.probability ?? 0} 
          />
          <FactorAnalysis factors={result.factors || []} />
        </div>
        
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Approval Rate Distribution
            </h2>
            <ApprovalRateChart />
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Key Decision Factors
            </h2>
            <ImpactChart factors={result.factors || []} />
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          onClick={handleNewApplication}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 text-lg"
        >
          Submit Another Application
        </Button>
      </div>
    </div>
  );
}