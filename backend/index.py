from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
import numpy as np

# Initialize FastAPI App
app = FastAPI(title="Clean Energy Intelligence API (Render)")

# Enable CORS (Security)
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
            # Use relative paths since Render maintains the folder structure
            base_dir = os.path.dirname(os.path.abspath(__file__))
            metadata_path = os.path.join(base_dir, "metadata.json")
            model_path = os.path.join(base_dir, "models", "model.txt")

            # Load Metadata
            if not os.path.exists(metadata_path):
                raise FileNotFoundError(f"Missing {metadata_path}")
            
            with open(metadata_path, "r") as f:
                _metadata = json.load(f)

            # Load LightGBM Model
            import lightgbm as lgb
            _model = lgb.Booster(model_file=model_path)
            print("--- Resources Loaded Successfully ---")
            
        except Exception as e:
            print(f"ERROR: {str(e)}")
            raise RuntimeError(f"Initialization Failed: {str(e)}")
    
    return _model, _metadata

@app.get("/")
def health_check():
    return {"status": "online", "message": "EcoPredict Brain is LIVE on Render", "deployment": "persistent"}

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
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Local testing support
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
