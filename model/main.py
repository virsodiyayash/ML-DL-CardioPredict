import joblib
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os

# Initialize FastAPI app
app = FastAPI(title="Cardio Predict API", version="1.0")

# Enable CORS for frontend communication
# In production, replace ["*"] with the specific frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models
# Files are in the same directory
MODEL_PATH = "logistic_model.pkl"
SCALER_PATH = "scaler.pkl"

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    print("Models loaded successfully.")
except Exception as e:
    print(f"Error loading models: {e}")
    # Fallback to absolute paths if running from root
    try:
        model = joblib.load(os.path.join("model", MODEL_PATH))
        scaler = joblib.load(os.path.join("model", SCALER_PATH))
        print("Models loaded successfully (from root).")
    except Exception as e2:
         print(f"Error loading models (retry): {e2}")
         model = None
         scaler = None

class PatientData(BaseModel):
    age: int
    gender: str # "Male" or "Female"
    height: float # cm
    weight: float # kg
    ap_hi: int # Systolic BP
    ap_lo: int # Diastolic BP
    cholesterol: int # 1, 2, 3
    gluc: int # 1, 2, 3
    smoke: int # 0 or 1
    alco: int # 0 or 1
    active: int # 0 or 1

@app.get("/")
def read_root():
    return {"message": "Cardiovascular Disease Prediction API is running"}

@app.post("/predict")
def predict_risk(data: PatientData):
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    # Preprocessing
    # 1. Encode Gender: Male -> 1, Female -> 0
    gender_encoded = 1 if data.gender == "Male" else 0

    # 2. Calculate BMI
    # bmi = weight / (height/100)^2
    try:
        height_m = data.height / 100.0
        bmi = data.weight / (height_m ** 2)
    except ZeroDivisionError:
         raise HTTPException(status_code=400, detail="Height cannot be zero")

    # 3. Prepare input array
    # Order must match training: age, gender, height, weight, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, active, bmi
    input_data = np.array([[
        data.age,
        gender_encoded,
        data.height,
        data.weight,
        data.ap_hi,
        data.ap_lo,
        data.cholesterol,
        data.gluc,
        data.smoke,
        data.alco,
        data.active,
        bmi
    ]])

    # 4. Scale data
    try:
        input_scaled = scaler.transform(input_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scaling error: {str(e)}")

    # 5. Predict
    try:
        prediction = model.predict(input_scaled)
        probability = model.predict_proba(input_scaled)
        
        # probability is [[prob_0, prob_1]]
        risk_prob = probability[0][1]
        is_high_risk = int(prediction[0]) == 1

        return {
            "prediction": is_high_risk,
            "probability": float(risk_prob),
            "bmi": float(bmi),
            "message": "High Risk" if is_high_risk else "Low Risk"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")



# uvicorn main:app --reload


