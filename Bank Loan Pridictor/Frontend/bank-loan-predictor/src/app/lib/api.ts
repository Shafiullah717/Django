import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictLoan = async (data: any) => {
  try {
    const response = await api.post('/predict/', data);
    return response.data;
  } catch (error) {
    console.error('Prediction API error:', error);
    throw error;
  }
};