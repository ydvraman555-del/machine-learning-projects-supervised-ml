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
app = FastAPI(title="Clean Energy Intelligence API (Final Strike)")

# Enable CORS (Security - Extra permissive for final debugging)
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
    """Definitive resource loading using relative paths (Render persistent structure)."""
    global _model, _metadata
    if _model is None or _metadata is None:
        try:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            metadata_path = os.path.join(base_dir, "metadata.json")
            model_path = os.path.join(base_dir, "models", "model.txt")

            if not os.path.exists(metadata_path):
                raise FileNotFoundError(f"METADATA_NOT_FOUND: {metadata_path}")
            
            with open(metadata_path, "r") as f:
                _metadata = json.load(f)

            if not os.path.exists(model_path):
                raise FileNotFoundError(f"MODEL_NOT_FOUND: {model_path}")
            
            _model = lgb.Booster(model_file=model_path)
            print(">>> RESOURCES_DEPLOYED_SUCCESSFULLY")
            
        except Exception as e:
            print(f">>> SYSTEM_INIT_ERROR: {str(e)}")
            raise e
    
    return _model, _metadata

@app.get("/")
def health_check():
    return {"status": "online", "message": "EcoPredict Brain READY on Render", "python": sys.version}

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
        
        # 1. Get Country context
        region = meta["mapping"].get(request.country)
        c_code = meta["country_to_code"].get(request.country)
        r_code = meta["region_to_code"].get(region)
        
        if c_code is None:
            raise ValueError(f"Country code missing for: {request.country}")

        # 2. Perform Inference
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
        # RETURN JSON WITH CORS HEADERS MANUALLY (The 'Final Strike' fix)
        return JSONResponse(
            status_code=500, 
            content={"error": str(e)},
            headers={"Access-Control-Allow-Origin": "*"}
        )

@app.get("/metadata")
def get_metadata():
    _, meta = get_resources()
    return {
        "countries": meta["countries"],
        "regions": meta["regions"],
        "mapping": meta["mapping"]
    }
