from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import json
import os
import numpy as np
import lightgbm as lgb
import sys

# Initialize FastAPI App
app = FastAPI(title="Clean Energy Intelligence API (Final)")

# Enable CORS (The Security Lock)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for caching
_model = None
_metadata = None

def get_resources():
    """Standard resource loading for Render (Persistent Server)."""
    global _model, _metadata
    if _model is None or _metadata is None:
        try:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            metadata_path = os.path.join(base_dir, "metadata.json")
            model_path = os.path.join(base_dir, "models", "model.txt")
            
            with open(metadata_path, "r") as f:
                _metadata = json.load(f)

            _model = lgb.Booster(model_file=model_path)
            print(">>> System Resources Loaded")
        except Exception as e:
            print(f">>> INIT_ERROR: {str(e)}")
            raise e
    
    return _model, _metadata

@app.get("/")
def health_check():
    return {"status": "online", "message": "EcoPredict Brain READY on Render"}

@app.get("/countries")
def get_countries():
    _, meta = get_resources()
    return {"countries": meta["countries"]}

@app.get("/regions")
def get_regions():
    _, meta = get_resources()
    return {"regions": meta["regions"]}

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
        return JSONResponse(status_code=500, content={"error": str(e)}, headers={"Access-Control-Allow-Origin": "*"})

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
        return JSONResponse(status_code=500, content={"error": str(e)}, headers={"Access-Control-Allow-Origin": "*"})

@app.get("/metadata")
def get_metadata():
    _, meta = get_resources()
    return {
        "countries": meta["countries"],
        "regions": meta["regions"],
        "mapping": meta["mapping"]
    }
