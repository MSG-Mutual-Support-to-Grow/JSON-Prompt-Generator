from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from fastapi.responses import JSONResponse

from services.generator import router as generator_router

app = FastAPI()

# Allow requests from your frontend (localhost:5173, 5174, 5175 for Vite, localhost:3000 for other)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include /generate-prompt route
app.include_router(generator_router)

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
    return {"message": "JSON Prompt Generator Backend is running!"}
