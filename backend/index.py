from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import json
import os
import sys

app = FastAPI(title="Clean Energy Intelligence API")

# Enable CORS (The Security Lock)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for lazy loading
_model = None
_metadata = None

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Ensure we return JSON even on crashes, which fixes the CORS error."""
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal System Error: {str(exc)}", "type": str(type(exc).__name__)},
        headers={"Access-Control-Allow-Origin": "*"}
    )

def find_file(filename, search_path):
    """Recursively search for a file in the given path."""
    for root, dirs, files in os.walk(search_path):
        if filename in files:
            return os.path.join(root, filename)
    return None

def get_resources():
    """Ultra-robust resource loading using recursive Path-Scanning."""
    global _model, _metadata
    if _model is None or _metadata is None:
        try:
            # 1. Scan for files starting from the task directory
            task_root = "/var/task" if os.path.exists("/var/task") else os.getcwd()
            
            metadata_path = find_file("metadata.json", task_root)
            model_path = find_file("model.txt", task_root)

            if not metadata_path or not model_path:
                # Fallback to absolute local check if scanning fails
                base_dir = os.path.dirname(os.path.abspath(__file__))
                metadata_path = metadata_path or os.path.join(base_dir, "metadata.json")
                model_path = model_path or os.path.join(base_dir, "models", "model.txt")

            if not os.path.exists(metadata_path):
                raise FileNotFoundError(f"Metadata scanning failed. Root: {task_root}")

            # 2. Load Metadata
            with open(metadata_path, "r") as f:
                _metadata = json.load(f)

            # 3. Load Model (Import heavy libraries ONLY when needed)
            import numpy as np
            import lightgbm as lgb
            _model = lgb.Booster(model_file=model_path)
            
        except Exception as e:
            raise RuntimeError(f"Scanner Failure: {str(e)}")
    
    return _model, _metadata

@app.get("/")
def health_check():
    return {"status": "online", "system": "Clean Energy API Scanner active"}

@app.get("/debug-paths")
def debug_paths():
    """Helper to see where Vercel is putting your files."""
    return {
        "cwd": os.getcwd(),
        "files": os.listdir(os.getcwd()),
        "task_exists": os.path.exists("/var/task"),
        "root_files": os.listdir("/var/task") if os.path.exists("/var/task") else []
    }

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
