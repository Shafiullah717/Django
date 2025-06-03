// src/components/LoanForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useLoanApplication } from '../context/LoanApplicationContext';
import { predictLoan } from '../lib/api';
import { ApiPayload, PredictionResult, LoanApplicationFormData } from '../lib/types'; // Import LoanApplicationFormData
import PredictionResultDisplay from './PredictionResultDisplay'; // Make sure this import is correct

// Helper function to validate current step fields
const validateStep = (
  formData: LoanApplicationFormData, // Changed type from 'any' to 'LoanApplicationFormData'
  currentStep: number,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
): boolean => {
  let isValid = true;
  const newErrors: Record<string, string> = {};

  const addError = (field: string, message: string) => {
    newErrors[field] = message;
    isValid = false;
  };

  switch (currentStep) {
    case 0: // Personal Information
      if (!formData.firstname) addError('firstname', 'First Name is required.');
      if (!formData.lastname) addError('lastname', 'Last Name is required.');
      if (!formData.gender) addError('gender', 'Gender is required.');
      if (!formData.married) addError('married', 'Marital Status is required.');
      // Robust check for dependants: can be '' or a number
      if (typeof formData.dependants === 'string' && formData.dependants === '') {
        addError('dependants', 'Dependants is required and must be a number.');
      } else if (typeof formData.dependants === 'number' && formData.dependants < 0) {
        addError('dependants', 'Dependants must be a non-negative number.');
      }
      break;
    case 1: // Income and Education
      // Robust checks for numeric fields that can be empty strings
      if (typeof formData.applicantincome === 'string' && formData.applicantincome === '') {
        addError('applicantincome', 'Applicant Income is required and must be a number.');
      } else if (typeof formData.applicantincome === 'number' && formData.applicantincome < 0) {
        addError('applicantincome', 'Applicant Income must be a non-negative number.');
      }

      if (typeof formData.coapplicantincome === 'string' && formData.coapplicantincome === '') {
        addError('coapplicantincome', 'Co-Applicant Income is required and must be a number.');
      } else if (typeof formData.coapplicantincome === 'number' && formData.coapplicantincome < 0) {
        addError('coapplicantincome', 'Co-Applicant Income must be a non-negative number.');
      }

      if (!formData.graduatededucation) addError('graduatededucation', 'Education is required.');
      if (!formData.selfemployed) addError('selfemployed', 'Self Employed status is required.');
      break;
    case 2: // Loan Details and Area
      if (typeof formData.loanamt === 'string' && formData.loanamt === '') {
        addError('loanamt', 'Loan Amount is required and must be a positive number.');
      } else if (typeof formData.loanamt === 'number' && formData.loanamt <= 0) {
        addError('loanamt', 'Loan Amount must be a positive number.');
      }

      if (typeof formData.loanterm === 'string' && formData.loanterm === '') {
        addError('loanterm', 'Loan Term is required and must be a positive number.');
      } else if (typeof formData.loanterm === 'number' && formData.loanterm <= 0) {
        addError('loanterm', 'Loan Term must be a positive number.');
      }

      // For credithistory, it can be '', 0, or 1
      if (formData.credithistory === '' || (typeof formData.credithistory === 'number' && (formData.credithistory !== 0 && formData.credithistory !== 1))) {
        addError('credithistory', 'Credit History is required and must be 0 or 1.');
      }
      if (!formData.area) addError('area', 'Area is required.');
      break;
  }

  setErrors(newErrors);
  return isValid;
};


const LoanForm: React.FC = () => {
  const { formData, updateFormField, resetForm } = useLoanApplication();
  const [currentStep, setCurrentStep] = useState(0);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | ''>('');

  const totalSteps = 3; // 0:Personal, 1:Income/Edu, 2:Loan/Area

  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => {
        setShowFeedback(false);
        setFeedbackMessage('');
        setFeedbackType('');
      }, 5000); // Hide feedback after 5 seconds
      return () => clearTimeout(timer); // Cleanup timer if component unmounts or feedback changes
    }
  }, [showFeedback]);

  const handleNext = () => {
    if (validateStep(formData, currentStep, setErrors)) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
        setErrors({}); // Clear errors on successful step progression
      } else {
        handleSubmit(); // Last step, submit the form
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setErrors({}); // Clear errors when going back
      setPredictionResult(null); // Clear result if navigating back from results
      setShowFeedback(false); // Hide feedback if navigating back
      setFeedbackMessage('');
      setFeedbackType('');
    }
  };

  const handleSubmit = async () => {
    setApiError(null);
    setIsLoading(true);
    setPredictionResult(null);
    setShowFeedback(false); // Hide any previous feedback
    setFeedbackMessage('');
    setFeedbackType('');


    const payload: ApiPayload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      dependants: Number(formData.dependants),
      applicantincome: Number(formData.applicantincome),
      coapplicantincome: Number(formData.coapplicantincome),
      loanamt: Number(formData.loanamt),
      loanterm: Number(formData.loanterm),
      credithistory: Number(formData.credithistory),
      gender: formData.gender as 'Male' | 'Female',
      married: formData.married as 'Yes' | 'No',
      graduatededucation: formData.graduatededucation === 'Not Graduate' ? 'Not_Graduate' : formData.graduatededucation as 'Graduate' | 'Not_Graduate',
      selfemployed: formData.selfemployed as 'Yes' | 'No',
      area: formData.area as 'Rural' | 'Semiurban' | 'Urban',
    };

    try {
      const result = await predictLoan(payload);
      setPredictionResult(result);
      setFeedbackMessage(`Prediction successful! Status: ${result.status}`);
      setFeedbackType('success');
      setShowFeedback(true);
    } catch (err: any) {
      const errorMessage = err.message || 'Something went wrong during prediction.';
      setApiError(errorMessage);
      setFeedbackMessage(`Error: ${errorMessage}`);
      setFeedbackType('error');
      setShowFeedback(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    resetForm();
    setCurrentStep(0);
    setPredictionResult(null);
    setIsLoading(false);
    setApiError(null);
    setErrors({});
    setShowFeedback(false); // Hide feedback on reset
    setFeedbackMessage('');
    setFeedbackType('');
  };

  const handleGoToDashboard = () => {
    setCurrentStep(totalSteps); // Navigate to results/dashboard
    setShowFeedback(false); // Hide feedback immediately
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="mb-6 rounded-md border border-gray-400 p-5 bg-[var(--background)] text-[var(--foreground)]">
            <h2 className="mb-4 text-xl font-semibold">1. Personal Information</h2>
            <div className="mb-4">
              <label htmlFor="firstname" className="mb-1 block font-bold">First Name *</label>
              <input
                type="text"
                id="firstname"
                value={formData.firstname}
                onChange={(e) => updateFormField('firstname', e.target.value)}
                className={`w-full rounded-md border p-2 text-base bg-[var(--background)] text-[var(--foreground)] ${errors.firstname ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
              />
              {errors.firstname && <p className="mt-1 text-sm text-red-500">{errors.firstname}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className="mb-1 block font-bold">Last Name *</label>
              <input
                type="text"
                id="lastname"
                value={formData.lastname}
                onChange={(e) => updateFormField('lastname', e.target.value)}
                className={`w-full rounded-md border p-2 text-base bg-[var(--background)] text-[var(--foreground)] ${errors.lastname ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
              />
              {errors.lastname && <p className="mt-1 text-sm text-red-500">{errors.lastname}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="mb-1 block font-bold">Gender *</label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => updateFormField('gender', e.target.value)}
                className={`w-full rounded-md border p-2 text-base bg-[var(--background)] text-[var(--foreground)] ${errors.gender ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="married" className="mb-1 block font-bold">Married *</label>
              <select
                id="married"
                value={formData.married}
                onChange={(e) => updateFormField('married', e.target.value)}
                className={`w-full rounded-md border p-2 text-base bg-[var(--background)] text-[var(--foreground)] ${errors.married ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
              >
                <option value="">Select Status</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.married && <p className="mt-1 text-sm text-red-500">{errors.married}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="dependants" className="mb-1 block font-bold">Dependants</label>
              <input
                type="number"
                id="dependants"
                value={formData.dependants}
                onChange={(e) => updateFormField('dependants', e.target.value === '' ? '' : Number(e.target.value))} // Handle empty string correctly
                className={`w-full rounded-md border p-2 text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-[var(--background)] text-[var(--foreground)] ${errors.dependants ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
              />
              {errors.dependants && <p className="mt-1 text-sm text-red-500">{errors.dependants}</p>}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="mb-6 rounded-md border border-gray-400 p-5 bg-[var(--background)] text-[var(--foreground)]">
            <h2 className="mb-4 text-xl font-semibold">2. Income and Education</h2>
            <div className="mb-4">
              <label htmlFor="applicantincome" className="mb-1 block font-bold">Applicant Income *</label>
              <input
                type="number"
                id="applicantincome"
                value={formData.applicantincome}
                onChange={(e) => updateFormField('applicantincome', e.target.value === '' ? '' : Number(e.target.value))} // Handle empty string correctly
                className={`w-full rounded-md border p-2 text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-[var(--background)] text-[var(--foreground)] ${errors.applicantincome ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
              />
              {errors.applicantincome && <p className="mt-1 text-sm text-red-500">{errors.applicantincome}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="coapplicantincome" className="mb-1 block font-bold">Co-Applicant Income *</label>
              <input
                type="number"
                id="coapplicantincome"
                value={formData.coapplicantincome}
                onChange={(e) => updateFormField('coapplicantincome', e.target.value === '' ? '' : Number(e.target.value))} // Handle empty string correctly
                className={`w-full rounded-md border p-2 text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-[var(--background)] text-[var(--foreground)] ${errors.coapplicantincome ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
              />
              {errors.coapplicantincome && <p className="mt-1 text-sm text-red-500">{errors.coapplicantincome}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="graduatededucation" className="mb-1 block font-bold">Education *</label>
              <select
                id="graduatededucation"
                value={formData.graduatededucation}
                onChange={(e) => updateFormField('graduatededucation', e.target.value)}
                className={`w-full rounded-md border p-2 text-base bg-[var(--background)] text-[var(--foreground)] ${errors.graduatededucation ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
              >
                <option value="">Select Education</option>
                <option value="Graduate">Graduate</option>
                <option value="Not Graduate">Not Graduate</option>
              </select>
              {errors.graduatededucation && <p className="mt-1 text-sm text-red-500">{errors.graduatededucation}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="selfemployed" className="mb-1 block font-bold">Self Employed *</label>
              <select
                id="selfemployed"
                value={formData.selfemployed}
                onChange={(e) => updateFormField('selfemployed', e.target.value)}
                className={`w-full rounded-md border p-2 text-base bg-[var(--background)] text-[var(--foreground)] ${errors.selfemployed ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
              >
                <option value="">Select Status</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.selfemployed && <p className="mt-1 text-sm text-red-500">{errors.selfemployed}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="mb-6 rounded-md border border-gray-400 p-5 bg-[var(--background)] text-[var(--foreground)]">
            <h2 className="mb-4 text-xl font-semibold">3. Loan Details and Area</h2>
            <div className="mb-4">
              <label htmlFor="loanamt" className="mb-1 block font-bold">Loan Amount *</label>
              <input
                type="number"
                id="loanamt"
                value={formData.loanamt}
                onChange={(e) => updateFormField('loanamt', e.target.value === '' ? '' : Number(e.target.value))} // Handle empty string correctly
                className={`w-full rounded-md border p-2 text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-[var(--background)] text-[var(--foreground)] ${errors.loanamt ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
              />
              {errors.loanamt && <p className="mt-1 text-sm text-red-500">{errors.loanamt}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="loanterm" className="mb-1 block font-bold">Loan Term (in months) *</label>
              <input
                type="number"
                id="loanterm"
                value={formData.loanterm}
                onChange={(e) => updateFormField('loanterm', e.target.value === '' ? '' : Number(e.target.value))} // Handle empty string correctly
                className={`w-full rounded-md border p-2 text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-[var(--background)] text-[var(--foreground)] ${errors.loanterm ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
              />
              {errors.loanterm && <p className="mt-1 text-sm text-red-500">{errors.loanterm}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="credithistory" className="mb-1 block font-bold">Credit History (1: Met, 0: Not Met) *</label>
              <select
                id="credithistory"
                value={formData.credithistory}
                onChange={(e) => updateFormField('credithistory', e.target.value === '' ? '' : Number(e.target.value))} // Handle empty string correctly
                className={`w-full rounded-md border p-2 text-base bg-[var(--background)] text-[var(--foreground)] ${errors.credithistory ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
              >
                <option value="">Select</option>
                <option value={1}>1 (Met)</option>
                <option value={0}>0 (Not Met)</option>
              </select>
              {errors.credithistory && <p className="mt-1 text-sm text-red-500">{errors.credithistory}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="area" className="mb-1 block font-bold">Area *</label>
              <select
                id="area"
                value={formData.area}
                onChange={(e) => updateFormField('area', e.target.value)}
                className={`w-full rounded-md border p-2 text-base bg-[var(--background)] text-[var(--foreground)] ${errors.area ? 'border-red-500' : 'border-gray-400 focus:border-blue-500'}`}
              >
                <option value="">Select Area</option>
                <option value="Rural">Rural</option>
                <option value="Semiurban">Semiurban</option>
                <option value="Urban">Urban</option>
              </select>
              {errors.area && <p className="mt-1 text-sm text-red-500">{errors.area}</p>}
            </div>
          </div>
        );
      case totalSteps: // Results step
        return (
          <PredictionResultDisplay
            predictionResult={predictionResult}
            isLoading={isLoading}
            apiError={apiError}
            onReset={handleReset}
            // Removed formData prop here as PredictionResultDisplay will get it from context
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto my-5 max-w-3xl rounded-lg shadow-lg bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="mb-6 pt-8 text-center text-2xl font-bold">Bank Loan Predictor</h1>

      <div className="p-8 pt-0"> {/* Wrapper for main form content to apply padding */}

        {showFeedback && (
          <div className={`mb-4 p-3 rounded-md text-center text-lg font-semibold
            ${feedbackType === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : ''}
            ${feedbackType === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100' : ''}`}>
            {feedbackMessage}
            {feedbackType === 'success' && (
              <button
                onClick={handleGoToDashboard}
                className="ml-4 px-4 py-1 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 transition-colors"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        )}

        {renderStep()}

        {currentStep < totalSteps && (
          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <button onClick={handlePrevious} className="rounded-md border-none bg-gray-300 px-6 py-3 text-base font-bold text-gray-800 shadow-sm transition-colors hover:bg-gray-400 cursor-pointer">
                Previous
              </button>
            )}
            <button onClick={handleNext} className={`ml-auto rounded-md border-none px-6 py-3 text-base font-bold text-white shadow-md transition-colors cursor-pointer ${isLoading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`} disabled={isLoading}>
              {currentStep === totalSteps - 1 ? (isLoading ? 'Submitting...' : 'Submit Prediction') : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanForm;