// src/components/PredictionResultDisplay.tsx
import React from 'react';
import { PredictionResult, LoanApplicationFormData } from '../lib/types';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';
import { useLoanApplication } from '../context/LoanApplicationContext'; // *** NEW IMPORT ***

interface PredictionResultDisplayProps {
  predictionResult: PredictionResult | null;
  isLoading: boolean;
  apiError: string | null;
  onReset: () => void;
  // formData: LoanApplicationFormData; // *** REMOVE THIS PROP ***
}

const PredictionResultDisplay: React.FC<PredictionResultDisplayProps> = ({
  predictionResult,
  isLoading,
  apiError,
  onReset,
  // formData, // *** REMOVE FROM DESTRUCTURING ***
}) => {
  // *** GET formData DIRECTLY FROM CONTEXT HERE ***
  const { formData } = useLoanApplication();

  // --- DEFENSIVE CHECK (STILL USEFUL FOR DEBUGGING, BUT SHOULDN'T FIRE NOW) ---
  if (formData === undefined || formData === null) {
    console.error("PredictionResultDisplay received formData as undefined or null. This indicates a deeper context issue.");
    return (
      <div className="flex flex-col items-center justify-center p-8 text-red-500 bg-[var(--background)] text-[var(--foreground)] rounded-lg">
        <FaTimesCircle className="mb-4 text-5xl" />
        <h2 className="mb-2 text-2xl font-bold">Application Data Missing!</h2>
        <p className="mb-4 text-center text-lg">
          Required application details could not be loaded. Please try submitting a new prediction.
        </p>
        <button
          onClick={onReset}
          className="rounded-md bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition-colors hover:bg-blue-700"
        >
          Start New Prediction
        </button>
      </div>
    );
  }
  // --- END DEFENSIVE CHECK ---


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-[var(--background)] text-[var(--foreground)] rounded-lg">
        <FaHourglassHalf className="mb-4 animate-spin text-5xl text-blue-500" />
        <p className="text-xl font-semibold">Predicting loan status...</p>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-[var(--background)] text-[var(--foreground)] rounded-lg">
        <FaTimesCircle className="mb-4 text-5xl text-red-500" />
        <h2 className="mb-2 text-2xl font-bold text-red-600">Error!</h2>
        <p className="mb-4 text-center text-lg text-red-700">{apiError}</p>
        <button
          onClick={onReset}
          className="rounded-md bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition-colors hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!predictionResult) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-[var(--background)] text-[var(--foreground)] rounded-lg">
        <p className="text-lg">No prediction made yet. Please fill out the form.</p>
        <button
          onClick={onReset}
          className="mt-4 rounded-md bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition-colors hover:bg-blue-700"
        >
          Start New Prediction
        </button>
      </div>
    );
  }

  // Determine status display properties
  const status = predictionResult.status;
  let statusText = '';
  let statusColorClass = '';
  let statusIcon = null;
  let message = '';

  switch (status) {
    case 'Approved':
      statusText = 'LOAN APPROVED!';
      statusColorClass = 'text-green-600 dark:text-green-400';
      statusIcon = <FaCheckCircle className="text-6xl text-green-500" />;
      message = 'Congratulations! Your loan application has been approved based on the information provided.';
      break;
    case 'Rejected':
      statusText = 'LOAN REJECTED';
      statusColorClass = 'text-red-600 dark:text-red-400';
      statusIcon = <FaTimesCircle className="text-6xl text-red-500" />;
      message = 'We regret to inform you that your loan application has been rejected at this time.';
      break;
    case 'Pending':
      statusText = 'APPLICATION PENDING';
      statusColorClass = 'text-yellow-600 dark:text-yellow-400';
      statusIcon = <FaHourglassHalf className="text-6xl text-yellow-500 animate-pulse" />;
      message = 'Your loan application is currently under review. Please check back later or refer to your dashboard for updates.';
      break;
    default:
      statusText = 'UNKNOWN STATUS';
      statusColorClass = 'text-gray-600 dark:text-gray-400';
      statusIcon = null;
      message = 'An unexpected status was received.';
  }

  // Helper to format currency
  const formatCurrency = (amount: number | '') => {
    if (typeof amount !== 'number') return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // Helper to format percentage (for credit history)
  const formatCreditHistory = (value: number | '') => {
    if (value === 1) return 'Met Requirements';
    if (value === 0) return 'Not Met Requirements';
    return 'N/A';
  };

  return (
    <div className="p-8 rounded-lg bg-[var(--background)] text-[var(--foreground)]">
      <div className="mb-6 text-center">
        {statusIcon}
        <h2 className={`mt-4 text-4xl font-extrabold ${statusColorClass}`}>
          {statusText}
        </h2>
        <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">{message}</p>
        {predictionResult.prediction_id && (
            <p className="mt-2 text-md text-gray-500 dark:text-gray-400">
                Prediction ID: {predictionResult.prediction_id}
            </p>
        )}
      </div>

      <div className="mb-8 border-t border-gray-300 pt-6">
        <h3 className="mb-4 text-2xl font-semibold">Your Application Details:</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* All these formData accesses are now safe because of the initial check */}
          <div className="detail-item">
            <span className="font-medium text-gray-600 dark:text-gray-400">Applicant Name:</span> {formData.firstname} {formData.lastname}
          </div>
          <div className="detail-item">
            <span className="font-medium text-gray-600 dark:text-gray-400">Gender:</span> {formData.gender}
          </div>
          <div className="detail-item">
            <span className="font-medium text-gray-600 dark:text-gray-400">Marital Status:</span> {formData.married}
          </div>
          <div className="detail-item">
            <span className="font-medium text-gray-600 dark:text-gray-400">Dependants:</span> {formData.dependants === '' ? 'N/A' : formData.dependants}
          </div>
          <div className="detail-item">
            <span className="font-medium text-gray-600 dark:text-gray-400">Education:</span> {formData.graduatededucation}
          </div>
          <div className="detail-item">
            <span className="font-medium text-gray-600 dark:text-gray-400">Self Employed:</span> {formData.selfemployed}
          </div>
          <div className="detail-item">
            <span className="font-medium text-gray-600 dark:text-gray-400">Applicant Income:</span> {formatCurrency(formData.applicantincome)}
          </div>
          <div className="detail-item">
            <span className="font-medium text-gray-600 dark:text-gray-400">Co-Applicant Income:</span> {formatCurrency(formData.coapplicantincome)}
          </div>
          <div className="detail-item">
            <span className="font-medium text-gray-600 dark:text-gray-400">Loan Amount:</span> {formatCurrency(formData.loanamt)}
          </div>
          <div className="detail-item">
            <span className="font-medium text-gray-600 dark:text-gray-400">Loan Term:</span> {formData.loanterm === '' ? 'N/A' : `${formData.loanterm} months`}
          </div>
          <div className="detail-item">
            <span className="font-medium text-gray-600 dark:text-gray-400">Credit History:</span> {formatCreditHistory(formData.credithistory)}
          </div>
          <div className="detail-item">
            <span className="font-medium text-gray-600 dark:text-gray-400">Area:</span> {formData.area}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={onReset}
          className="rounded-md bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition-colors hover:bg-blue-700"
        >
          Make Another Prediction
        </button>
      </div>
    </div>
  );
};

export default PredictionResultDisplay;