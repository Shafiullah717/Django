import { SelectOption } from '@/types/loan';
import { 
  genderOptions, 
  marriedOptions, 
  educationOptions, 
  employmentOptions, 
  areaOptions 
} from '@/types/loan';
import { LoanApplication } from '@/types/loan'; // Import LoanApplication

interface PersonalSectionProps {
  data: LoanApplication; // Use specific type instead of 'any'
  onChange: (field: keyof LoanApplication, value: any) => void; // Updated type
  nextStep: () => void;
  errors: Record<string, string>;
}

export default function PersonalSection({ 
  data, 
  onChange, 
  nextStep,
  errors 
}: PersonalSectionProps) {
  // Update handlers with proper type assertions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof LoanApplication, value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof LoanApplication, Number(value));
  };

  // Add type to name parameter
  const renderSelect = (
    name: keyof LoanApplication, 
    options: SelectOption[], 
    label: string
  ) => (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <select
        name={name}
        value={data[name] ?? ''}
        onChange={handleInputChange}
        className={`w-full p-2 border rounded ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
      >
        <option value="">Select {label}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            name="firstname"
            value={data.firstname || ''}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.firstname ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={data.lastname || ''}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded ${errors.lastname ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {renderSelect('gender', genderOptions, 'Gender')}
        {renderSelect('married', marriedOptions, 'Marital Status')}
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Number of Dependants</label>
        <input
          type="number"
          name="dependants"
          value={data.dependants ?? 0}
          onChange={handleNumberChange}
          min="0"
          max="10"
          className={`w-full p-2 border rounded ${errors.dependants ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.dependants && <p className="text-red-500 text-sm mt-1">{errors.dependants}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {renderSelect('graduatededucation', educationOptions, 'Education')}
        {renderSelect('selfemployed', employmentOptions, 'Employment Status')}
      </div>
      
      <div className="mb-8">
        {renderSelect('area', areaOptions, 'Area')}
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={nextStep}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
        >
          Next: Financial Information
        </button>
      </div>
    </div>
  );
}