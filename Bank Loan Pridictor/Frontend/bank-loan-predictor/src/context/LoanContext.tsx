import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LoanApplication, PredictionResult } from '../types/loan';

interface LoanContextType {
  application: LoanApplication;
  setApplication: (data: Partial<LoanApplication>) => void;
  result: PredictionResult | null;
  setResult: (result: PredictionResult | null) => void;
  reset: () => void;
  currentStep: number; // Add this
  setCurrentStep: (step: number) => void; // Add this
}

const defaultApplication: LoanApplication = {
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
};

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const LoanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [application, setApplicationData] = useState<LoanApplication>(defaultApplication);
  const [result, setResultData] = useState<PredictionResult | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0); // Add this state

  const setApplication = (data: Partial<LoanApplication>) => {
    setApplicationData(prev => ({ ...prev, ...data }));
  };

  const setResult = (result: PredictionResult | null) => {
    setResultData(result);
  };

  const reset = () => {
    setApplicationData(defaultApplication);
    setResultData(null);
  };

  return (
    <LoanContext.Provider value={{ 
      application, 
      setApplication,
      result,
      setResult,
      reset,
      currentStep, // Add to context
      setCurrentStep // Add to context
    }}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoanContext = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error('useLoanContext must be used within a LoanProvider');
  }
  return context;
};