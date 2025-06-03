import { LoanApplication } from '@/types/loan';

interface ReviewSectionProps {
  data: LoanApplication;
  prevStep: () => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function ReviewSection({ 
  data, 
  prevStep, 
  onSubmit,
  loading 
}: ReviewSectionProps) {
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Map values to labels
  const mapValueToLabel = (value: string, options: {value: string; label: string}[]) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Review Your Application</h2>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">{data.firstname} {data.lastname}</p>
          </div>
          <div>
            <p className="text-gray-600">Gender</p>
            <p className="font-medium">{data.gender}</p>
          </div>
          <div>
            <p className="text-gray-600">Marital Status</p>
            <p className="font-medium">{mapValueToLabel(data.married, [
              {value: 'Yes', label: 'Married'},
              {value: 'No', label: 'Single'}
            ])}</p>
          </div>
          <div>
            <p className="text-gray-600">Dependants</p>
            <p className="font-medium">{data.dependants}</p>
          </div>
          <div>
            <p className="text-gray-600">Education</p>
            <p className="font-medium">{mapValueToLabel(data.graduatededucation, [
              {value: 'Graduate', label: 'Graduate'},
              {value: 'Not Graduate', label: 'Not Graduate'}
            ])}</p>
          </div>
          <div>
            <p className="text-gray-600">Employment</p>
            <p className="font-medium">{mapValueToLabel(data.selfemployed, [
              {value: 'Yes', label: 'Self-Employed'},
              {value: 'No', label: 'Salaried'}
            ])}</p>
          </div>
          <div>
            <p className="text-gray-600">Area</p>
            <p className="font-medium">{mapValueToLabel(data.area, [
              {value: 'Rural', label: 'Rural'},
              {value: 'Semiurban', label: 'Semi-Urban'},
              {value: 'Urban', label: 'Urban'}
            ])}</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-4">Financial Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Applicant Income</p>
            <p className="font-medium">{formatCurrency(data.applicantincome)}</p>
          </div>
          <div>
            <p className="text-gray-600">Co-Applicant Income</p>
            <p className="font-medium">{formatCurrency(data.coapplicantincome)}</p>
          </div>
          <div>
            <p className="text-gray-600">Loan Amount</p>
            <p className="font-medium">{formatCurrency(data.loanamt)}</p>
          </div>
          <div>
            <p className="text-gray-600">Loan Term</p>
            <p className="font-medium">{data.loanterm} months</p>
          </div>
          <div>
            <p className="text-gray-600">Credit History</p>
            <p className="font-medium">
              {data.credithistory === 1 
                ? 'Good Credit History' 
                : data.credithistory === 0 
                  ? 'No Credit History' 
                  : 'Not Specified'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className={`py-2 px-6 rounded text-white ${
            loading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Submit Application'
          )}
        </button>
      </div>
    </div>
  );
}