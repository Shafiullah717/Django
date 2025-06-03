import { useState } from 'react';
import { predictLoan } from '@/app/lib/api';

export default function useLoanPredictor() {
  const [result, setResult] = useState<null | any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const submitPrediction = async (formData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await predictLoan(formData);
      setResult(response);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    result,
    loading,
    error,
    submitPrediction,
  };
}