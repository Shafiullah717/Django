// src/lib/types.ts

// Existing types
export interface ApiPayload {
  firstname: string;
  lastname: string;
  dependants: number;
  applicantincome: number;
  coapplicantincome: number;
  loanamt: number;
  loanterm: number;
  credithistory: number;
  // MODIFIED: Allow empty string for initial form state
  gender: 'Male' | 'Female' | '';
  married: 'Yes' | 'No' | '';
  // *** KEY CHANGE HERE: Include 'Not_Graduate' for API compatibility ***
  graduatededucation: 'Graduate' | 'Not Graduate' | 'Not_Graduate' | '';
  selfemployed: 'Yes' | 'No' | '';
  area: 'Rural' | 'Semiurban' | 'Urban' | '';
}

export interface PredictionResult {
  status: 'Approved' | 'Rejected' | 'Pending';
  prediction_id?: number;
}

// Type for historical prediction data (from /api/request/)
export interface HistoricalPredictionData {
  id: number;
  firstname: string;
  lastname: string;
  dependants: number;
  applicantincome: number;
  coapplicantincome: number;
  loanamt: number;
  loanterm: number;
  credithistory: number;
  gender: 'Male' | 'Female'; // Historical data likely won't have empty strings
  married: 'Yes' | 'No';
  graduatededucation: 'Graduate' | 'Not_Graduate'; // Note: your sample data has 'Not_Graduate' for historical
  selfemployed: 'Yes' | 'No';
  area: 'Rural' | 'Semiurban' | 'Urban';
  status: 'Approved' | 'Rejected' | 'Pending';
  created_at: string;
}

// Type for the API response structure for historical data
export interface AllPredictionsResponse {
  Status: number;
  payload: HistoricalPredictionData[];
}

// Type for the form data structure (can be the same as ApiPayload or slightly adjusted)
export type LoanApplication = ApiPayload; // Alias ApiPayload for use in context

// Type for the LoanApplicationContext
export interface LoanApplicationContextType {
  formData: LoanApplication;
  updateFormField: (field: keyof LoanApplication, value: any) => void;
  resetForm: () => void;
}