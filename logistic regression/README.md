# Logistic Regression Deployment Project

This project implements a machine learning model using **Logistic Regression** to predict energy trends, featuring a full-stack architecture with a FastAPI backend and a Vite/React frontend.

## Project Structure

- `backend/`: FastAPI server implementation.
- `frontend/`: React + Vite + Tailwind CSS dashboard.
- `Project Logistic Regression.ipynb`: Data analysis and model training notebook.
- `Global renewable and fossil fuel energy.csv`: Dataset used for training.

## Tech Stack

- **Frontend**: Vite, React, Tailwind CSS.
- **Backend**: FastAPI, Pydantic, LightGBM (used for comparison/inference).
- **Deployment**: Configured for Vercel.

## Setup Instructions

### Backend
1. Navigate to `backend/`
2. Install dependencies: `pip install -r requirements.txt`
3. Run the server: `python index.py`

### Frontend
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## How to use
- Input the required features in the dashboard.
- Get instant predictions from the Logistic Regression model.
