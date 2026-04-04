from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import json
import os
import sys

app = FastAPI(title="Clean Energy Intelligence API")

# Enable CORS (Security)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for lazy loading
_model = None
_metadata = None

def get_technical_manifest():
    """Build a manifest of the system for debugging."""
    try:
        task_root = "/var/task" if os.path.exists("/var/task") else os.getcwd()
        # List files in the root to see where we are
        root_files = os.listdir(task_root) if os.path.exists(task_root) else []
        return {
            "root": task_root,
            "exists": root_files,
            "python": sys.version,
            "path": sys.path
        }
    except:
        return {"error": "Manifest failed"}

def get_resources():
    """Ultra-robust resource loading with specific path check for Vercel."""
    global _model, _metadata
    if _model is None or _metadata is None:
        try:
            # 1. Direct path check (Vercel moves files to the root of /var/task)
            base_dir = os.path.dirname(os.path.abspath(__file__))
            
            # Try specific Vercel locations
            candidates = [
                os.path.join(base_dir, "metadata.json"),
                os.path.join("/var/task", "metadata.json"),
                os.path.join("/var/task", "backend", "metadata.json"),
                "metadata.json"
            ]
            
            metadata_path = next((c for c in candidates if os.path.exists(c)), None)
            
            # Try model locations
            model_candidates = [
                os.path.join(base_dir, "models", "model.txt"),
                os.path.join("/var/task", "models", "model.txt"),
                os.path.join("/var/task", "backend", "models", "model.txt"),
                "models/model.txt"
            ]
            model_path = next((c for c in model_candidates if os.path.exists(c)), None)

            if not metadata_path:
                raise FileNotFoundError(f"METADATA_NOT_FOUND. Searched: {candidates}")
            if not model_path:
                raise FileNotFoundError(f"MODEL_NOT_FOUND. Searched: {model_candidates}")

            # 2. Load Metadata
            with open(metadata_path, "r") as f:
                _metadata = json.load(f)

            # 3. Load Model with safety check for LightGBM
            try:
                import numpy as np
                import lightgbm as lgb
                _model = lgb.Booster(model_file=model_path)
            except ImportError:
                # If library is missing, we need to know!
                raise ImportError("LIBRARY_MISSING: lightgbm or numpy not installed by Vercel.")
            
        except Exception as e:
            # THIS IS THE KEY: Return exactly what went wrong
            raise RuntimeError(f"TECH_ERROR: {str(e)}")
    
    return _model, _metadata

@app.get("/")
def health_check():
    return {"status": "online", "manifest": get_technical_manifest()}

@app.get("/countries")
def get_countries():
    try:
        _, meta = get_resources()
        return {"countries": meta["countries"]}
    except Exception as e:
        # Instead of 500, we return a 200 with the error in it for debugging
        return JSONResponse(status_code=500, content={"error": str(e), "manifest": get_technical_manifest()})

@app.get("/regions")
def get_regions():
    try:
        _, meta = get_resources()
        return {"regions": meta["regions"]}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e), "manifest": get_technical_manifest()})

@app.get("/metadata")
def get_metadata():
    try:
        _, meta = get_resources()
        return {
            "countries": meta["countries"],
            "regions": meta["regions"],
            "mapping": meta["mapping"]
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

class PredictionRequest(BaseModel):
    country: str
    year: int

@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        import numpy as np
        model, meta = get_resources()
        region = meta["mapping"].get(request.country)
        c_code = meta["country_to_code"].get(request.country)
        r_code = meta["region_to_code"].get(region)
        features = np.array([[c_code, r_code, request.year]])
        prob_clean = float(model.predict(features)[0])
        return {
            "country": request.country,
            "is_clean_dominant": bool(prob_clean >= 0.5),
            "confidence": float(max([1.0 - prob_clean, prob_clean])),
            "probabilities": [1.0 - prob_clean, prob_clean]
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
