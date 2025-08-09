
# generator.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import json
import re
import requests
from dotenv import load_dotenv

# Try to import Mistral, fallback to requests if not available
try:
    from mistralai import Mistral
    MISTRAL_AVAILABLE = True
except ImportError:
    MISTRAL_AVAILABLE = False


class PromptRequest(BaseModel):
    text: str
    
class PromptResponse(BaseModel):
    original_text: str
    json_prompt: dict
    ai_generated_output: str = None  # Optional AI output

router = APIRouter()

load_dotenv()

# Try Mistral API first, fallback to HF API
MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
HF_API_KEY = os.getenv("HF_API_KEY")

# Initialize Mistral client if available
mistral_client = None
if MISTRAL_AVAILABLE and MISTRAL_API_KEY:
    mistral_client = Mistral(api_key=MISTRAL_API_KEY)
    MODEL = "mistral-large-latest"

# Fallback to HF API
if HF_API_KEY:
    HF_MODEL_ID = "codellama/CodeLlama-13b-Instruct-hf"
    HF_API_URL = f"https://api-inference.huggingface.co/models/{HF_MODEL_ID}"
    HF_HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}
else:
    HF_MODEL_ID = None
    HF_API_URL = None
    HF_HEADERS = None

def generate_dynamic_json_with_mistral(text: str) -> dict:
    """Generate dynamic JSON using Mistral API based on the request content."""
    if not mistral_client:
        raise HTTPException(status_code=503, detail="Mistral AI not available - MISTRAL_API_KEY not configured")
    
    messages = [
        {
            "role": "system",
            "content": (
                "You are a JSON generator. Based on the user's request, generate a JSON object with only relevant keys. "
                "Possible keys include (but are not limited to): task, type, topic, language, word_count, tone, audience, "
                "difficulty, city, state, country, date, author, programming_language, framework, dataset, model, "
                "steps, libraries, output_format, example_input, example_output. "
                "If the request is about programming, include relevant tech keys (programming_language, framework, libraries). "
                "If the request is about travel, include location keys (city, state, country, date). "
                "If the request is about writing, include keys like tone, audience, word_count. "
                "If the request is about data science, include dataset, model, metrics. "
                "Do NOT include irrelevant or empty keys. "
                "Never include a key called 'result_text'."
            )
        },
        {"role": "user", "content": text}
    ]
    
    try:
        resp = mistral_client.chat.complete(
            model=MODEL,
            messages=messages,
            temperature=0,
            response_format={"type": "json_object"}
        )
        
        raw = resp.choices[0].message.content
        
        # Parse JSON
        try:
            parsed = json.loads(raw)
            return parsed
        except Exception:
            # Try to extract JSON from response
            m = re.search(r"\{.*\}", raw, flags=re.S)
            if m:
                return json.loads(m.group(0))
            else:
                raise HTTPException(status_code=500, detail="Could not parse JSON from Mistral response")
                
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Mistral AI error: {str(e)}")

def extract_language_from_text(text: str) -> str:
    """Extract programming language or content type from text."""
    text_lower = text.lower()
    
    # Programming languages
    languages = {
        'python': ['python', 'py'],
        'javascript': ['javascript', 'js', 'node'],
        'java': ['java'],
        'c++': ['c++', 'cpp'],
        'c': ['c programming', ' c '],
        'html': ['html'],
        'css': ['css'],
        'sql': ['sql', 'database'],
        'r': [' r ', 'r programming'],
        'go': ['golang', 'go'],
        'rust': ['rust'],
        'php': ['php'],
        'ruby': ['ruby'],
        'swift': ['swift'],
        'kotlin': ['kotlin']
    }
    
    # Check for programming languages first
    for lang, keywords in languages.items():
        if any(keyword in text_lower for keyword in keywords):
            return lang
    
    # Check for other content types
    if any(word in text_lower for word in ['image', 'picture', 'photo', 'graphic', 'visual', 'drawing', 'artwork', 'illustration']):
        return "image"
    elif any(word in text_lower for word in ['idea', 'concept', 'brainstorm', 'suggestion', 'plan', 'strategy', 'creative', 'innovation']):
        return "idea"
    elif any(word in text_lower for word in ['text', 'content', 'article', 'blog', 'writing', 'essay']):
        return "text"
    
    return "general"

def extract_task_type(text: str) -> str:
    """Determine the type of task from text."""
    text_lower = text.lower()
    
    if any(word in text_lower for word in ['generate', 'create', 'make', 'draw', 'design']) and any(word in text_lower for word in ['image', 'picture', 'photo', 'graphic', 'visual']):
        return "image_generation"
    elif any(word in text_lower for word in ['idea', 'brainstorm', 'suggest', 'concept', 'plan']):
        return "idea_generation"
    elif any(word in text_lower for word in ['write', 'create', 'generate']) and any(word in text_lower for word in ['content', 'article', 'text', 'blog']):
        return "content_generation"
    elif any(word in text_lower for word in ['program', 'code', 'function', 'script', 'algorithm']):
        return "code_generation"
    else:
        return "general_query"

def extract_task_from_text(text: str) -> str:
    """Extract task description from text."""
    # Remove common prompt prefixes
    text = text.strip()
    prefixes_to_remove = [
        "give me", "write", "create", "make", "build", "develop", 
        "generate", "show me", "help me", "i need", "can you"
    ]
    
    text_lower = text.lower()
    for prefix in prefixes_to_remove:
        if text_lower.startswith(prefix):
            text = text[len(prefix):].strip()
            break
    
    # Remove articles at the beginning
    articles = ["a ", "an ", "the "]
    text_lower = text.lower()
    for article in articles:
        if text_lower.startswith(article):
            text = text[len(article):].strip()
            break
    
    return text

def text_to_json_prompt(text: str, task_type: str = "general") -> dict:
    """Convert plain text to structured JSON prompt format."""
    language = extract_language_from_text(text)
    task = extract_task_from_text(text)
    task_type = extract_task_type(text)
    
    # Base JSON structure
    json_prompt = {
        "task": task,
        "language": language,
        "original_request": text,
        "type": task_type,
        "parameters": {}
    }
    
    # Add specific parameters based on task type
    if task_type == "image_generation":
        json_prompt["parameters"] = {
            "style": "realistic",
            "quality": "high",
            "size": "1024x1024",
            "format": "PNG"
        }
    elif task_type == "idea_generation":
        json_prompt["parameters"] = {
            "creativity_level": "high",
            "number_of_ideas": 5,
            "format": "structured_list",
            "detail_level": "moderate"
        }
    elif task_type == "content_generation":
        json_prompt["parameters"] = {
            "tone": "professional",
            "length": "medium",
            "format": "structured",
            "target_audience": "general"
        }
    elif task_type == "code_generation":
        json_prompt["parameters"] = {
            "style": "clean",
            "comments": True,
            "examples": True,
            "best_practices": True
        }
    else:
        json_prompt["parameters"] = {
            "format": "structured_response",
            "detail_level": "moderate"
        }
    
    return json_prompt

def generate_from_json(json_prompt: dict) -> str:
    if not HF_API_URL or not HF_HEADERS:
        raise HTTPException(status_code=503, detail="AI generation service not available - HF_API_KEY not configured")
    
    payload = {
        "inputs": json.dumps(json_prompt),
        "parameters": {"max_new_tokens": 500, "temperature": 0.7}
    }
    response = requests.post(HF_API_URL, headers=HF_HEADERS, json=payload)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    result = response.json()
    return result[0].get("generated_text", "")

@router.post("/generate-prompt", response_model=PromptResponse)
async def generate_prompt(request: PromptRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    # Try to use Mistral for dynamic JSON generation first
    json_prompt = None
    if mistral_client and MISTRAL_API_KEY:
        try:
            json_prompt = generate_dynamic_json_with_mistral(request.text)
        except Exception as e:
            # If Mistral fails, fallback to static JSON generation
            json_prompt = text_to_json_prompt(request.text)
    else:
        # Use static JSON generation if Mistral not available
        json_prompt = text_to_json_prompt(request.text)
    
    # Try to generate AI output if HF API key is available
    ai_output = None
    if HF_API_URL and HF_HEADERS:
        try:
            ai_output = generate_from_json(json_prompt)
        except Exception as e:
            # If AI generation fails, still return the JSON prompt
            ai_output = f"AI generation failed: {str(e)}"
    else:
        ai_output = "AI generation not available - HF_API_KEY not configured"
    
    return PromptResponse(
        original_text=request.text,
        json_prompt=json_prompt,
        ai_generated_output=ai_output
    )
