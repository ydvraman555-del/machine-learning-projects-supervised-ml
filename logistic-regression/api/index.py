from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import numpy as np
import os
import lightgbm as lgb

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
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
METADATA_PATH = os.path.join(BASE_DIR, "metadata.json")
MODEL_PATH = os.path.join(BASE_DIR, "models", "model.txt")  # Using native format

try:
    if not os.path.exists(METADATA_PATH):
        raise FileNotFoundError(f"Metadata file not found at {METADATA_PATH}")
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Native model file not found at {MODEL_PATH}")
    
    with open(METADATA_PATH, "r") as f:
        metadata = json.load(f)
    
    # Load native LightGBM booster (No Scikit-learn or SciPy required!)
    model = lgb.Booster(model_file=MODEL_PATH)
    
    # Extract metadata for easy access
    countries_list = metadata["countries"]
    regions_list = metadata["regions"]
    country_region_map = metadata["mapping"]
    country_to_code = metadata["country_to_code"]
    region_to_code = metadata["region_to_code"]
    
except Exception as e:
    print(f"Error initializing backend: {e}")

class PredictionRequest(BaseModel):
    country: str
    year: int

@app.get("/metadata")
def get_metadata():
    return {
        "countries": countries_list,
        "regions": regions_list,
        "mapping": country_region_map
    }

@app.get("/countries")
def get_countries():
    return {
        "countries": countries_list
    }

@app.get("/regions")
def get_regions():
    return {
        "regions": regions_list
    }

@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        region = country_region_map.get(request.country)
        c_code = country_to_code.get(request.country)
        r_code = region_to_code.get(region)
        
        if c_code is None or r_code is None:
            raise HTTPException(status_code=400, detail="Invalid country or region")

        features = np.array([[c_code, r_code, request.year]])
        # Native booster predict returns probability of class 1 (Clean)
        prob_clean = float(model.predict(features)[0])
        prediction = 1 if prob_clean >= 0.5 else 0
        probs = [1.0 - prob_clean, prob_clean]
        
        return {
            "country": request.country,
            "year": request.year,
            "region": region,
            "is_clean_dominant": bool(prediction),
            "confidence": float(max(probs)),
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
            
        c_code = country_to_code.get(country)
        r_code = region_to_code.get(region)
        
        results = []
        # Predict from 2000 to 2042 for a full trendline
        for year in range(2000, 2043):
            features = np.array([[c_code, r_code, year]])
            prob_clean = float(model.predict(features)[0])
            
            results.append({
                "year": year,
                "probability": round(prob_clean, 4),
                "is_clean": bool(prob_clean >= 0.5)
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
