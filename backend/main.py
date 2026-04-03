from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import LabelEncoder
import os

app = FastAPI(title="Clean Energy Intelligence API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Clean Energy Intelligence API is running", "status": "online"}

# Load data and model
DATA_PATH = "backend/data/Global renewable and fossil fuel energy.csv"
MODEL_PATH = "backend/models/lightgbm.pkl"

if not os.path.exists(DATA_PATH) or not os.path.exists(MODEL_PATH):
    # Fallback paths for local relative execution
    DATA_PATH = "data/Global renewable and fossil fuel energy.csv"
    MODEL_PATH = "models/lightgbm.pkl"
    
    # Root paths fallback
    if not os.path.exists(DATA_PATH):
        DATA_PATH = "../Global renewable and fossil fuel energy.csv"
    if not os.path.exists(MODEL_PATH):
        MODEL_PATH = "models/lightgbm.pkl" # This is inside backend/models/ usually

try:
    if not os.path.exists(DATA_PATH):
        # Final desperate check for root relative to where main.py is (one level up)
        DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "Global renewable and fossil fuel energy.csv")
    
    df = pd.read_csv(DATA_PATH)
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    
    # Pre-fit encoders
    le_country = LabelEncoder()
    le_country.fit(df["country"])
    
    le_region = LabelEncoder()
    le_region.fit(df["region"])
    
    # Metadata mapping
    country_region_map = df[["country", "region"]].drop_duplicates().set_index("country")["region"].to_dict()
    
except Exception as e:
    print(f"Error initializing backend: {e}")

class PredictionRequest(BaseModel):
    country: str
    year: int

@app.get("/metadata")
def get_metadata():
    return {
        "countries": sorted(df["country"].unique().tolist()),
        "regions": sorted(df["region"].unique().tolist()),
        "mapping": country_region_map
    }

@app.get("/countries")
def get_countries():
    return {
        "countries": sorted(df["country"].unique().tolist())
    }

@app.get("/regions")
def get_regions():
    return {
        "regions": sorted(df["region"].unique().tolist())
    }

@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        region = country_region_map.get(request.country)
        c_code = int(le_country.transform([request.country])[0])
        r_code = int(le_region.transform([region])[0])
        
        features = np.array([[c_code, r_code, request.year]])
        prediction = int(model.predict(features)[0])
        probs = model.predict_proba(features)[0].tolist()
        
        return {
            "country": request.country,
            "year": request.year,
            "region": region,
            "is_clean_dominant": bool(prediction),
            "confidence": max(probs),
            "probabilities": probs
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/forecast/{country}")
def forecast(country: str):
    try:
        region = country_region_map.get(country)
        if not region:
            raise HTTPException(status_code=404, detail="Country not found")
            
        c_code = int(le_country.transform([country])[0])
        r_code = int(le_region.transform([region])[0])
        
        results = []
        # Predict from 2000 to 2042 for a full trendline
        for year in range(2000, 2043):
            features = np.array([[c_code, r_code, year]])
            prob_clean = model.predict_proba(features)[0][1] # Probability of True/1
            
            results.append({
                "year": year,
                "probability": round(prob_clean, 4),
                "is_clean": bool(model.predict(features)[0])
            })
            
        return {
            "country": country,
            "region": region,
            "forecast": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
