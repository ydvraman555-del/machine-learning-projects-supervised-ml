from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import numpy as np
import os

app = FastAPI(title="Clean Energy Intelligence API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for lazy loading
_model = None
_metadata = None

def get_resources():
    """Lazy load the model and metadata to avoid boot-up crashes."""
    global _model, _metadata
    if _model is None or _metadata is None:
        try:
            # Use absolute path relative to this file
            base_dir = os.path.dirname(os.path.abspath(__file__))
            metadata_path = os.path.join(base_dir, "metadata.json")
            model_path = os.path.join(base_dir, "models", "model.txt")

            # Check if files exist
            if not os.path.exists(metadata_path):
                raise FileNotFoundError(f"Metadata not found at {metadata_path}")
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model not found at {model_path}")

            # Load Metadata
            with open(metadata_path, "r") as f:
                _metadata = json.load(f)

            # Import LightGBM ONLY when needed (Lazy Loading)
            import lightgbm as lgb
            _model = lgb.Booster(model_file=model_path)
            
        except Exception as e:
            raise RuntimeError(f"Initialization Failed: {str(e)}")
    
    return _model, _metadata

@app.get("/")
def read_root():
    return {"message": "Clean Energy Intelligence API is running", "status": "online"}

@app.get("/countries")
def get_countries():
    _, meta = get_resources()
    return {"countries": meta["countries"]}

@app.get("/regions")
def get_regions():
    _, meta = get_resources()
    return {"regions": meta["regions"]}

@app.get("/metadata")
def get_metadata():
    _, meta = get_resources()
    return {
        "countries": meta["countries"],
        "regions": meta["regions"],
        "mapping": meta["mapping"]
    }

class PredictionRequest(BaseModel):
    country: str
    year: int

@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        model, meta = get_resources()
        
        region = meta["mapping"].get(request.country)
        c_code = meta["country_to_code"].get(request.country)
        r_code = meta["region_to_code"].get(region)
        
        if c_code is None or r_code is None:
            raise HTTPException(status_code=400, detail="Invalid country or region")

        features = np.array([[c_code, r_code, request.year]])
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
        raise HTTPException(status_code=500, detail=f"Prediction Error: {str(e)}")

@app.get("/forecast/{country}")
def forecast(country: str):
    try:
        model, meta = get_resources()
        
        region = meta["mapping"].get(country)
        if not region:
            raise HTTPException(status_code=404, detail="Country not found")
            
        c_code = meta["country_to_code"].get(country)
        r_code = meta["region_to_code"].get(region)
        
        results = []
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
        raise HTTPException(status_code=500, detail=f"Forecast Error: {str(e)}")
