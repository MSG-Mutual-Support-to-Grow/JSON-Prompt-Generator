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
            "You are a universal JSON prompt generator that converts natural language requests into clean, structured JSON that can be fed into any LLM or system.\n\n"
            
            "CORE PRINCIPLES:\n"
            "1. ANALYZE the user's request to identify the main task and key parameters\n"
            "2. EXTRACT essential information in a universal, system-agnostic format\n"
            "3. USE simple, clear field names that any system can understand\n"
            "4. KEEP the JSON clean and minimal - only include relevant fields\n\n"
            
            "DOMAIN-SPECIFIC FIELD MAPPING:\n"
            "• Programming Tasks: task, language, functionality, output_format, requirements\n"
            "• Image Generation: task, style, subject, composition, lighting, mood, quality, format\n"
            "• Writing Tasks: task, type, tone, audience, length, format, topic\n"
            "• Data Analysis: task, data_source, analysis_type, output_format, metrics\n"
            "• General Tasks: task, type, requirements, parameters, output_format\n\n"
            
            "OUTPUT RULES:\n"
            "- Always include a 'task' field describing the main action\n"
            "- Use lowercase field names with underscores\n"
            "- Keep values concise and specific\n"
            "- Return ONLY valid JSON, no explanations or markdown\n"
            "- Maximum 8 fields per JSON object\n"
            
            "EXAMPLES:\n"
            "Input: 'Write a Python function to scrape news headlines'\n"
            "Output: {\"task\": \"write code\", \"language\": \"Python\", \"functionality\": \"scrape news headlines\", \"output_format\": \"function\"}\n\n"
            
            "Input: 'Create a sunset landscape painting'\n" 
            "Output: {\"task\": \"generate image\", \"subject\": \"landscape\", \"time\": \"sunset\", \"style\": \"painting\", \"mood\": \"serene\"}"
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
            
            # Try to fix common JSON issues
            # Fix trailing commas
            cleaned_response = re.sub(r',(\s*[}\]])', r'\1', cleaned_response)
            # Fix missing commas between objects/arrays
            cleaned_response = re.sub(r'([}\]])\s*([{\[])', r'\1,\2', cleaned_response)
            # Fix missing commas between string values
            cleaned_response = re.sub(r'("\s*)\s*("\s*:)', r'\1,\2', cleaned_response)
            
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
                # Try multiple regex patterns to extract JSON
                patterns = [
                    r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}',  # Simple nested objects
                    r'\{.*?\}',  # Basic object
                    r'\{[\s\S]*\}',  # Multi-line object
                ]
                
                for pattern in patterns:
                    json_match = re.search(pattern, cleaned_response, re.DOTALL)
                    if json_match:
                        try:
                            extracted_json = json.loads(json_match.group(0))
                            print(f"✅ Extracted JSON with pattern {pattern}: {extracted_json}")
                            return extracted_json
                        except json.JSONDecodeError:
                            continue
                
                print("❌ All extraction patterns failed")
                
                # If parsing fails completely, use fallback function for better structured output
                print("🔄 Using fallback text_to_json_prompt function")
                return text_to_json_prompt(text)
        elif isinstance(cleaned_response, dict):
            print(f"✅ Received dict directly: {cleaned_response}")
            return cleaned_response
        else:
            print(f"⚠️ Unexpected response type: {type(cleaned_response)}")
            # Use fallback function for better structured output
            print("🔄 Using fallback text_to_json_prompt function")
            return text_to_json_prompt(text)
                
    except Exception as e:
        print(f"❌ Exception in Mistral AI call: {str(e)}")
        # Use fallback function for better structured output
        print("🔄 Using fallback text_to_json_prompt function")
        return text_to_json_prompt(text)

def text_to_json_prompt(text: str) -> dict:
    """Convert plain text to clean, universal JSON prompt format that can be fed into any LLM."""
    
    # Analyze the text to determine task type and extract key information
    text_lower = text.lower().strip()
    
    # Programming/coding detection
    if any(keyword in text_lower for keyword in ['function', 'code', 'script', 'program', 'algorithm', 'python', 'javascript', 'java', 'c++', 'api']):
        json_prompt = {"task": "write code"}
        
        # Extract programming language
        languages = ['python', 'javascript', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'typescript']
        for lang in languages:
            if lang in text_lower:
                json_prompt["language"] = lang.title() if lang != 'c++' else 'C++'
                break
        
        # Extract functionality
        if 'scrape' in text_lower or 'scraping' in text_lower:
            if 'news' in text_lower or 'headline' in text_lower:
                json_prompt["functionality"] = "scrape top 5 news headlines"
            else:
                json_prompt["functionality"] = "web scraping"
        elif 'api' in text_lower:
            json_prompt["functionality"] = "API integration"
        elif 'database' in text_lower or 'db' in text_lower:
            json_prompt["functionality"] = "database operations"
        else:
            json_prompt["functionality"] = "general programming"
            
        # Extract output format
        if 'csv' in text_lower:
            json_prompt["output_format"] = "CSV"
        elif 'json' in text_lower:
            json_prompt["output_format"] = "JSON"
        elif 'function' in text_lower:
            json_prompt["output_format"] = "function"
        
    # Image generation detection
    elif any(keyword in text_lower for keyword in ['image', 'picture', 'photo', 'painting', 'drawing', 'artwork', 'generate', 'create art']):
        json_prompt = {"task": "generate image"}
        
        # Extract style
        if 'painting' in text_lower:
            json_prompt["style"] = "painting"
        elif 'photo' in text_lower or 'realistic' in text_lower:
            json_prompt["style"] = "photorealistic"
        elif 'cartoon' in text_lower or 'anime' in text_lower:
            json_prompt["style"] = "cartoon"
        
        # Extract subject
        subjects = ['landscape', 'portrait', 'animal', 'building', 'abstract', 'nature']
        for subject in subjects:
            if subject in text_lower:
                json_prompt["subject"] = subject
                break
                
    # Writing tasks detection
    elif any(keyword in text_lower for keyword in ['write', 'essay', 'article', 'blog', 'story', 'letter', 'email']):
        json_prompt = {"task": "write content"}
        
        # Extract content type
        if 'essay' in text_lower:
            json_prompt["type"] = "essay"
        elif 'article' in text_lower:
            json_prompt["type"] = "article"
        elif 'blog' in text_lower:
            json_prompt["type"] = "blog post"
        elif 'email' in text_lower:
            json_prompt["type"] = "email"
        elif 'story' in text_lower:
            json_prompt["type"] = "story"
            
    # Data analysis detection
    elif any(keyword in text_lower for keyword in ['analyze', 'data', 'chart', 'graph', 'statistics', 'report']):
        json_prompt = {"task": "analyze data"}
        
        if 'chart' in text_lower or 'graph' in text_lower:
            json_prompt["output_format"] = "visualization"
        elif 'report' in text_lower:
            json_prompt["output_format"] = "report"
            
    # General task fallback
    else:
        json_prompt = {
            "task": "general request",
            "type": "unspecified"
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