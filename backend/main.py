from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import random

from services.generator import router as generator_router

app = FastAPI()

# Allow requests from your frontend (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include /generate-prompt route
app.include_router(generator_router)

@app.get("/")
async def root():
    return {"message": "JSON Prompt Generator Backend is running!"}

@app.post("/prompt")
async def process_prompt(request: Request):
    data = await request.json()
    text = data.get("text", "")

    # Example dummy processing
    words = text.split()
    char_count = len(text)
    word_count = len(words)

    response = {
        "input": {
            "originalText": text,
            "processedAt": datetime.utcnow().isoformat() + "Z",
            "wordCount": word_count,
            "characterCount": char_count
        },
        "analysis": {
            "language": "en",
            "sentiment": "neutral",
            "confidence": round(random.uniform(0.8, 1.0), 2),
            "readabilityScore": 8.5
        }
    }

    return response
