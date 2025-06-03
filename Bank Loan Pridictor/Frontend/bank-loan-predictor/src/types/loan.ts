// src/types/loan.d.ts

// Loan Application Interface
export interface LoanApplication {
  firstname: string;
  lastname: string;
  dependants: number;
  applicantincome: number;
  coapplicantincome: number;
  loanamt: number;
  loanterm: number;
  credithistory: number;
  gender: 'Male' | 'Female';
  married: 'Yes' | 'No';
  graduatededucation: 'Graduate' | 'Not Graduate';
  selfemployed: 'Yes' | 'No';
  area: 'Rural' | 'Semiurban' | 'Urban';
}

// Prediction Result Interface
export interface PredictionResult {
  status: 'Approved' | 'Rejected';
  probability?: number; // Optional for future
  factors?: Array<{ name: string; impact: number }>; // Optional
}

// API Payload Structure
export interface LoanPredictionPayload extends LoanApplication {}

// Form Field Types
export type FormField = keyof LoanApplication;

// Form Step Structure
export interface FormStep {
  id: number;
  title: string;
  fields: FormField[];
}

// Context State
export interface LoanContextState {
  application: LoanApplication;
  result: PredictionResult | null;
  currentStep: number;
  loading: boolean;
  error: string | null;
}

// Reusable Option Type for Select Inputs
export interface SelectOption {
  value: string;
  label: string;
}

// Gender Options
export const genderOptions: SelectOption[] = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
];

// Marital Status Options
export const marriedOptions: SelectOption[] = [
  { value: 'Yes', label: 'Married' },
  { value: 'No', label: 'Single' }
];

// Education Options
export const educationOptions: SelectOption[] = [
  { value: 'Graduate', label: 'Graduate' },
  { value: 'Not Graduate', label: 'Not Graduate' }
];

// Employment Options
export const employmentOptions: SelectOption[] = [
  { value: 'Yes', label: 'Self-Employed' },
  { value: 'No', label: 'Salaried' }
];

// Area Options
export const areaOptions: SelectOption[] = [
  { value: 'Rural', label: 'Rural' },
  { value: 'Semiurban', label: 'Semi-Urban' },
  { value: 'Urban', label: 'Urban' }
];

// Credit History Options
export const creditHistoryOptions: SelectOption[] = [
  { value: '1', label: 'Good Credit History' },
  { value: '0', label: 'No Credit History' }
];

// Form Steps Configuration
export const FORM_STEPS: FormStep[] = [
  {
    id: 1,
    title: "Personal Information",
    fields: [
      'firstname', 
      'lastname', 
      'gender', 
      'married', 
      'dependants',
      'graduatededucation',
      'selfemployed',
      'area'
    ]
  },
  {
    id: 2,
    title: "Financial Information",
    fields: [
      'applicantincome',
      'coapplicantincome',
      'loanamt',
      'loanterm',
      'credithistory'
    ]
  },
  {
    id: 3,
    title: "Review Application",
    fields: [] // No specific fields, just review
  }
];