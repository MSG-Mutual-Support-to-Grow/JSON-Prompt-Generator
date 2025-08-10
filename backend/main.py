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
    "https://json-prompt-frontend.onrender.com",  # Your actual frontend URL
    "https://your-custom-domain.com",  # If you have a custom domain
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

# Add startup event
@app.on_event("startup")
async def startup_event():
    print("🚀 JSON Prompt Generator Backend starting up...")
    print("✅ Backend is ready to serve requests!")

@app.post("/api/convert")
async def convert_to_json(request: Request):
    data = await request.json()
    input_text = data.get('text', '')

    if not input_text.strip():
        return JSONResponse(content={"error": "Input text is required"}, status_code=400)

    prompt = {
        "role": "user",
        "content": input_text.strip(),
        "metadata": {
            "timestamp": datetime.now().isoformat(),
            "type": "text_prompt",
            "length": len(input_text),
            "word_count": len(input_text.split())
        },
        "context": {
            "format": "conversational",
            "intent": "query",
            "priority": "normal"
        }
    }

    return prompt

@app.get("/")
async def root():
    return {
        "message": "JSON Prompt Generator Backend is running!",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "JSON Prompt Generator Backend",
        "timestamp": datetime.now().isoformat()
    }
