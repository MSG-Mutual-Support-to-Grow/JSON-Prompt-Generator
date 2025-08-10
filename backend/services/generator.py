
# generator.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import json
from dotenv import load_dotenv
from typing import Dict, Any

# Try to import Pydantic AI, fallback if not available
try:
    from pydantic_ai import Agent
    from pydantic_ai.models.mistral import MistralModel
    PYDANTIC_AI_AVAILABLE = True
except ImportError:
    PYDANTIC_AI_AVAILABLE = False


class PromptRequest(BaseModel):
    text: str
    
class PromptResponse(BaseModel):
    original_text: str
    json_prompt: dict
    ai_generated_output: str = None  # Optional AI output

router = APIRouter()

load_dotenv()

# Mistral API configuration
MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")

# Initialize Pydantic AI agent if available
agent = None
if PYDANTIC_AI_AVAILABLE and MISTRAL_API_KEY:
    model = MistralModel('mistral-large-latest')
    agent = Agent(
        model=model,
        system_prompt=(
            "You are a JSON generator. Based on the user's request, generate a JSON object with only relevant keys. "
            "Possible keys include (but are not limited to): task, type, topic, language, word_count, tone, audience, "
            "difficulty, city, state, country, date, author, programming_language, framework, dataset, model, "
            "steps, libraries, output_format, example_input, example_output. "
            "If the request is about programming, include relevant tech keys (programming_language, framework, libraries). "
            "If the request is about travel, include location keys (city, state, country, date). "
            "If the request is about writing, include keys like tone, audience, word_count. "
            "If the request is about data science, include dataset, model, metrics. "
            "Do NOT include irrelevant or empty keys. "
            "Return only valid JSON format."
        ),
        retries=2
    )

async def generate_dynamic_json_with_mistral(text: str) -> dict:
    """Generate dynamic JSON using Pydantic AI with Mistral based on the request content."""
    if not agent:
        raise HTTPException(status_code=503, detail="Pydantic AI with Mistral not available - MISTRAL_API_KEY not configured")
    
    try:
        # Use Pydantic AI agent to generate structured response
        result = await agent.run(text)
        
        # Parse the response as JSON
        if isinstance(result.data, str):
            try:
                return json.loads(result.data)
            except json.JSONDecodeError:
                # If not valid JSON, create a structured response
                return {
                    "task": text.strip(),
                    "type": "general",
                    "original_request": text,
                    "generated_content": result.data
                }
        elif isinstance(result.data, dict):
            return result.data
        else:
            # Fallback structure
            return {
                "task": text.strip(),
                "type": "general", 
                "original_request": text,
                "response": str(result.data)
            }
                
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pydantic AI error: {str(e)}")

def text_to_json_prompt(text: str) -> dict:
    """Convert plain text to basic structured JSON prompt format."""
    # Simple fallback JSON structure
    json_prompt = {
        "task": text.strip(),
        "type": "general",
        "original_request": text
    }
    
    return json_prompt

@router.post("/generate-prompt", response_model=PromptResponse)
async def generate_prompt(request: PromptRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    # Use Pydantic AI with Mistral for dynamic JSON generation
    if agent and MISTRAL_API_KEY:
        try:
            json_prompt = await generate_dynamic_json_with_mistral(request.text)
        except Exception as e:
            # If Pydantic AI fails, fallback to static JSON generation
            json_prompt = text_to_json_prompt(request.text)
    else:
        # Use static JSON generation if Pydantic AI not available
        json_prompt = text_to_json_prompt(request.text)
    
    return PromptResponse(
        original_text=request.text,
        json_prompt=json_prompt,
        ai_generated_output=None
    )
