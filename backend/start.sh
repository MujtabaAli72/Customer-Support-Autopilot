#!/bin/bash

# Activate virtual environment
source .venv/bin/activate  # Linux/Mac
# source .venv/Scripts/activate  # Windows (uncomment if on Windows)

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start the FastAPI server
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
