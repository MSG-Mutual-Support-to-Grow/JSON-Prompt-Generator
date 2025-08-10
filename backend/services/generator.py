# generator.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import json
import re
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
            "You are an intelligent content analyzer and JSON prompt generator. Analyze the user's request deeply and generate a comprehensive, structured JSON response.\n\n"
            
            "ANALYSIS PRINCIPLES:\n"
            "1. UNDERSTAND the user's intent and domain (programming, image generation, writing, data science, etc.)\n"
            "2. EXTRACT key requirements, constraints, and context\n"
            "3. ENHANCE the request with professional insights and missing details\n"
            "4. STRUCTURE the output with relevant, meaningful fields\n\n"
            
            "DOMAIN-SPECIFIC GUIDELINES:\n"
            "• Image Generation: Include visual elements, composition, lighting, mood, style, enhanced prompt\n"
            "• Programming: Include language, framework, features, libraries, implementation approach\n"
            "• Writing: Include tone, audience, purpose, structure, style\n"
            "• Data Science: Include dataset, model, metrics, methodology\n\n"
            
            "OUTPUT REQUIREMENTS:\n"
            "- Use descriptive, specific field names\n"
            "- Break down complex requests into structured components\n"
            "- Add professional context and technical details\n"
            "- Always include an 'enhanced_prompt' field for refined output\n"
            "- Respond with VALID JSON only, no explanations or markdown"
        ),
        retries=2
    )

async def generate_dynamic_json_with_mistral(text: str) -> dict:
    """Generate dynamic JSON using Pydantic AI with Mistral based on the request content."""
    if not agent:
        raise HTTPException(status_code=503, detail="Pydantic AI with Mistral not available - MISTRAL_API_KEY not configured")
    
    try:
        print(f"🔄 Sending to Mistral AI: '{text}'")
        
        # Use Pydantic AI agent to generate structured response
        result = await agent.run(text)
        
        # Access the actual output from the result
        if hasattr(result, 'output'):
            response_text = result.output
            print(f"📝 Raw Mistral response: {response_text}")
        else:
            response_text = str(result)
            print(f"📝 Fallback response: {response_text}")
        
        print(f"📝 Response type: {type(response_text)}")
        
        # Clean up the response - remove markdown code blocks if present
        cleaned_response = response_text
        if isinstance(response_text, str):
            # Remove markdown code blocks ```json and ```
            cleaned_response = re.sub(r'```json\s*', '', response_text)
            cleaned_response = re.sub(r'```\s*$', '', cleaned_response)
            cleaned_response = cleaned_response.strip()
            print(f"🧹 Cleaned response: {cleaned_response}")
        
        # Parse the response as JSON
        if isinstance(cleaned_response, str):
            try:
                parsed_json = json.loads(cleaned_response)
                print(f"✅ Successfully parsed JSON: {parsed_json}")
                return parsed_json
            except json.JSONDecodeError as e:
                print(f"❌ JSON parsing failed: {e}")
                print(f"❌ Raw content: {cleaned_response}")
                
                # Try to extract JSON from response if it has extra text
                json_match = re.search(r'\{.*\}', cleaned_response, re.DOTALL)
                if json_match:
                    try:
                        extracted_json = json.loads(json_match.group(0))
                        print(f"✅ Extracted JSON: {extracted_json}")
                        return extracted_json
                    except json.JSONDecodeError:
                        print("❌ Extracted text is not valid JSON")
                
                # If parsing fails completely, return the original working format
                return {
                    "task": text.strip(),
                    "type": "general",
                    "original_request": text,
                    "error": "Failed to parse AI response",
                    "raw_response": cleaned_response
                }
        elif isinstance(cleaned_response, dict):
            print(f"✅ Received dict directly: {cleaned_response}")
            return cleaned_response
        else:
            print(f"⚠️ Unexpected response type: {type(cleaned_response)}")
            # Return original working format
            return {
                "task": text.strip(),
                "type": "general", 
                "original_request": text,
                "error": "Unexpected response format",
                "raw_response": str(cleaned_response)
            }
                
    except Exception as e:
        print(f"❌ Exception in Mistral AI call: {str(e)}")
        # Return original working format instead of raising exception
        return {
            "task": text.strip(),
            "type": "general",
            "original_request": text
        }

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
    
    print(f"📥 Received request: '{request.text}'")
    print(f"🔧 Agent available: {agent is not None}")
    print(f"🔑 API key configured: {MISTRAL_API_KEY is not None}")
    
    # Use Pydantic AI with Mistral for dynamic JSON generation
    if agent and MISTRAL_API_KEY:
        try:
            print("🚀 Using Pydantic AI + Mistral")
            json_prompt = await generate_dynamic_json_with_mistral(request.text)
            status_message = "Generated using Pydantic AI + Mistral"
        except Exception as e:
            print(f"❌ Pydantic AI failed: {e}")
            # If Pydantic AI fails, fallback to static JSON generation
            json_prompt = text_to_json_prompt(request.text)
            status_message = f"Fallback mode - Pydantic AI error: {str(e)}"
    else:
        print("⚠️ Using fallback static JSON")
        # Use static JSON generation if Pydantic AI not available
        json_prompt = text_to_json_prompt(request.text)
        if not agent:
            status_message = "Pydantic AI agent not initialized"
        elif not MISTRAL_API_KEY:
            status_message = "MISTRAL_API_KEY not configured"
        else:
            status_message = "Unknown configuration issue"
    
    return PromptResponse(
        original_text=request.text,
        json_prompt=json_prompt,
        ai_generated_output=status_message
    )