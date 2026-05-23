from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import pandas as pd
import os

app = FastAPI(title="Industrial Fabric Quality API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and encoders
MODEL_PATH = "model.pkl"

def load_resources():
    if not os.path.exists(MODEL_PATH):
        # Try parent directory if not in backend
        if os.path.exists("../model.pkl"):
            return pickle.load(open("../model.pkl", "rb"))
        raise FileNotFoundError("model.pkl not found. Please place it in the backend folder.")
    return pickle.load(open(MODEL_PATH, "rb"))

try:
    resources = load_resources()
    model = resources["model"]
    scaler = resources["scaler"]
    le_fabric = resources["le_fabric"]
    le_quality = resources["le_quality"]
    features = resources["features"]
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

class FabricInspectionRequest(BaseModel):
    thread_count: float
    gsm: float
    tensile_strength: float
    fabric_thickness: float
    defect_count: int
    fabric_type: str

@app.get("/")
def health_check():
    return {"status": "active", "engine": "SVM Support Vector Machine", "project": "Industrial Fabric Quality Inspection"}

@app.post("/predict")
def predict(request: FabricInspectionRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded on server.")
    
    try:
        # 1. Encode fabric type
        try:
            fabric_encoded = le_fabric.transform([request.fabric_type])[0]
        except:
            # Fallback if unknown type
            fabric_encoded = 0
        
        # 2. Prepare input array
        input_data = np.array([[
            request.thread_count,
            request.gsm,
            request.tensile_strength,
            request.fabric_thickness,
            request.defect_count,
            fabric_encoded
        ]])
        
        # 3. Scale the input
        input_scaled = scaler.transform(input_data)
        
        # 4. Predict
        prediction_idx = model.predict(input_scaled)[0]
        prediction_label = le_quality.inverse_transform([prediction_idx])[0]
        
        # 5. Probabilities
        probs = model.predict_proba(input_scaled)[0]
        confidence = float(np.max(probs))
        
        return {
            "quality": prediction_label,
            "confidence": confidence,
            "probabilities": {
                label: float(prob) for label, prob in zip(le_quality.classes_, probs)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
