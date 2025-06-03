# predictor/utils.py
import joblib
import numpy as np
import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Paths to model files
MODEL_DIR = os.path.join(BASE_DIR, 'predictor', 'ml_models')
MODEL_PATH = os.path.join(MODEL_DIR, 'loan_model.pkl')
SCALER_PATH = os.path.join(MODEL_DIR, 'scaler.pkl')

# Initialize model and scaler as None
model = None
scaler = None

# Check if we're running a server (not management commands)
is_server = 'runserver' in sys.argv or 'gunicorn' in sys.argv

if is_server:
    try:
        # Lazy import Keras only when needed
        from keras.models import load_model
        
        # Load model and scaler only when running server
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        print("✅ Successfully loaded model and scaler")
        print(f"Scaler expects {scaler.n_features_in_} features") 
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        # Handle error appropriately (e.g., log to file, send alert)
else:
    print("⏩ Skipping model loading for management command")
def predict_loan(data):
    # Check if models are loaded
    if model is None or scaler is None:
        return "Error: Prediction models not loaded. Server may be starting up."
    
    try:
        # Convert model instance to prediction format
        # Note: We're using the EXACT feature names and order from training
        processed_data = {
            'Dependents': data.dependants,
            'ApplicantIncome': data.applicantincome,
            'CoapplicantIncome': data.coapplicantincome,
            'LoanAmount': data.loanamt,
            'Loan_Amount_Term': data.loanterm,
            'Credit_History': data.credithistory,
            'Gender_Female': 1 if data.gender == "Female" else 0,
            'Gender_Male': 1 if data.gender == "Male" else 0,
            'Married_No': 1 if data.married == "No" else 0,
            'Married_Yes': 1 if data.married == "Yes" else 0,
            'Education_Graduate': 1 if data.graduatededucation == "Graduate" else 0,
            'Education_Not Graduate': 1 if data.graduatededucation == "Not Graduate" else 0,
            'Self_Employed_No': 1 if data.selfemployed == "No" else 0,
            'Self_Employed_Yes': 1 if data.selfemployed == "Yes" else 0,
            'Property_Area_Rural': 1 if data.area == "Rural" else 0,
            'Property_Area_Semiurban': 1 if data.area == "Semiurban" else 0,
            'Property_Area_Urban': 1 if data.area == "Urban" else 0,
        }
        
        # Define feature order (EXACTLY as in training)
        feature_order = [
            'Dependents',
            'ApplicantIncome',
            'CoapplicantIncome',
            'LoanAmount',
            'Loan_Amount_Term',
            'Credit_History',
            'Gender_Female',
            'Gender_Male',
            'Married_No',
            'Married_Yes',
            'Education_Graduate',
            'Education_Not Graduate',
            'Self_Employed_No',
            'Self_Employed_Yes',
            'Property_Area_Rural',
            'Property_Area_Semiurban',
            'Property_Area_Urban'
        ]

        print("Processed data:", processed_data)
        print("Feature order:", feature_order)
        
        # Create array in correct order
        input_array = np.array([processed_data[field] for field in feature_order]).reshape(1, -1)
        
        # Scale the input
        scaled_input = scaler.transform(input_array)
        
        # Predict
        prediction = model.predict(scaled_input)
        probability = float(prediction[0][0])
        
        # Apply threshold (0.52 as in training)
        return "Approved" if probability > 0.52 else "Rejected"
    
    except Exception as e:
        return f"Prediction error: {str(e)}"