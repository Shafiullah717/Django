// Define LoanApplication type or import it from the appropriate file
interface LoanApplication {
  applicantincome: number | '';
  coapplicantincome: number | '';
  loanamt: number | '';
  loanterm: number | '';
  credithistory: number | '';
  // Add other fields as needed
}

interface FinancialSectionProps {
  data: LoanApplication;
  onChange: (field: keyof LoanApplication, value: any) => void; // Fix field type
  nextStep: () => void;
  prevStep: () => void;
  errors: Record<string, string>;
}

export default function FinancialSection({ 
  data, 
  onChange, 
  nextStep,
  prevStep,
  errors 
}: FinancialSectionProps) {
  // Update handler types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof LoanApplication, value === '' ? '' : Number(value));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof LoanApplication, Number(value));
  };


  const formatCurrency = (value: number | string) => {
    if (value === '') return '';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Financial Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700 mb-2">Applicant Income</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              name="applicantincome"
              value={data.applicantincome || ''}
              onChange={handleInputChange}
              min="0"
              className={`w-full pl-8 p-2 border rounded ${errors.applicantincome ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          {errors.applicantincome && <p className="text-red-500 text-sm mt-1">{errors.applicantincome}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Co-Applicant Income</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              name="coapplicantincome"
              value={data.coapplicantincome || ''}
              onChange={handleInputChange}
              min="0"
              className={`w-full pl-8 p-2 border rounded ${errors.coapplicantincome ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          {errors.coapplicantincome && <p className="text-red-500 text-sm mt-1">{errors.coapplicantincome}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700 mb-2">Loan Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              name="loanamt"
              value={data.loanamt || ''}
              onChange={handleInputChange}
              min="0"
              className={`w-full pl-8 p-2 border rounded ${errors.loanamt ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          {errors.loanamt && <p className="text-red-500 text-sm mt-1">{errors.loanamt}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Loan Term (months)</label>
          <input
            type="number"
            name="loanterm"
            value={data.loanterm || ''}
            onChange={handleInputChange}
            min="1"
            max="600"
            className={`w-full p-2 border rounded ${errors.loanterm ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.loanterm && <p className="text-red-500 text-sm mt-1">{errors.loanterm}</p>}
        </div>
      </div>
      
      <div className="mb-8">
        <label className="block text-gray-700 mb-2">Credit History</label>
        <select
          name="credithistory"
          value={data.credithistory ?? ''}
          onChange={handleSelectChange}
          className={`w-full p-2 border rounded ${errors.credithistory ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Select Credit History</option>
          <option value="1">Good Credit History</option>
          <option value="0">No Credit History</option>
        </select>
        {errors.credithistory && <p className="text-red-500 text-sm mt-1">{errors.credithistory}</p>}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
        >
          Next: Review Application
        </button>
      </div>
    </div>
  );
}