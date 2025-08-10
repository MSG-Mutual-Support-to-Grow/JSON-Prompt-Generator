from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from fastapi.responses import JSONResponse
import os

from services.generator import router as generator_router

app = FastAPI(
    title="JSON Prompt Generator API",
    description="Transform plain text into structured JSON prompts",
    version="1.0.0"
)

# Production-ready CORS configuration
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173", 
    "http://localhost:5174",
    "http://localhost:5175",
    "https://json-prompt-frontend.onrender.com",
]

# Add environment variable support for additional origins
if os.getenv("ADDITIONAL_ORIGINS"):
    additional_origins = os.getenv("ADDITIONAL_ORIGINS").split(",")
    ALLOWED_ORIGINS.extend([origin.strip() for origin in additional_origins])

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include /generate-prompt route
app.include_router(generator_router)

@app.get("/")
async def root():
    return {"message": "JSON Prompt Generator Backend is running!"}