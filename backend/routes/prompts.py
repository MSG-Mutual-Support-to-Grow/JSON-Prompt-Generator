from fastapi import APIRouter, Request
from datetime import datetime
import random

router = APIRouter()

@router.post("/prompt")
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
