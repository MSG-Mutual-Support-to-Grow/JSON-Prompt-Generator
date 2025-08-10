from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

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
