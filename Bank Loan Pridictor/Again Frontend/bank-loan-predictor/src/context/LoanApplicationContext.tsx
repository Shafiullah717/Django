// src/context/LoanApplicationContext.tsx
'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
// Correctly import LoanApplicationFormData and LoanApplicationContextType
import { LoanApplicationFormData, LoanApplicationContextType } from '../lib/types'; // *** UPDATED IMPORT ***

// Use LoanApplicationFormData for the initial state
const initialFormData: LoanApplicationFormData = { // *** UPDATED TYPE ***
  firstname: '',
  lastname: '',
  dependants: '', // Changed to allow empty string for initial state
  applicantincome: '', // Changed to allow empty string for initial state
  coapplicantincome: '', // Changed to allow empty string for initial state
  loanamt: '', // Changed to allow empty string for initial state
  loanterm: '', // Changed to allow empty string for initial state
  credithistory: '', // Changed to allow empty string for initial state
  gender: '',
  married: '',
  graduatededucation: '',
  selfemployed: '',
  area: '',
};

export const LoanApplicationContext = createContext<LoanApplicationContextType | undefined>(undefined);

interface LoanApplicationProviderProps {
  children: ReactNode;
}

export const LoanApplicationProvider: React.FC<LoanApplicationProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<LoanApplicationFormData>(initialFormData); // *** UPDATED TYPE ***

  // Ensure updateFormField uses keyof LoanApplicationFormData
  const updateFormField = useCallback((field: keyof LoanApplicationFormData, value: any) => { // *** UPDATED TYPE ***
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  const contextValue: LoanApplicationContextType = {
    formData,
    updateFormField,
    resetForm,
  };

  return (
    <LoanApplicationContext.Provider value={contextValue}>
      {children}
    </LoanApplicationContext.Provider>
  );
};

export const useLoanApplication = () => {
  const context = useContext(LoanApplicationContext);
  if (context === undefined) {
    throw new Error('useLoanApplication must be used within a LoanApplicationProvider');
  }
  return context;
};