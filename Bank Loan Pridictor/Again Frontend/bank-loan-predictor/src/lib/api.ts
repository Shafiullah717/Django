// src/lib/api.ts

import { ApiPayload, PredictionResult, AllPredictionsResponse } from './types';

const API_BASE_URL = 'http://127.0.0.1:8000/api/'; // Your backend API base URL

// Function to predict loan status
export async function predictLoan(payload: ApiPayload): Promise<PredictionResult> {
  try {
    const response = await fetch(`${API_BASE_URL}predict/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to predict loan status.');
    }

    const data: PredictionResult = await response.json();
    return data;
  } catch (error) {
    console.error('Error predicting loan:', error);
    throw error;
  }
}

// NEW: Function to get all previous loan predictions
export async function getAllPredictions(): Promise<AllPredictionsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}request/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch previous predictions.');
    }

    const data: AllPredictionsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all predictions:', error);
    throw error;
  }
}