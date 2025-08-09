
# generator.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import json
import requests
from dotenv import load_dotenv


class PromptRequest(BaseModel):
    text: str
    
class PromptResponse(BaseModel):
    original_text: str
    json_prompt: dict

router = APIRouter()

load_dotenv()
HF_API_KEY = os.getenv("HF_API_KEY")
if not HF_API_KEY:
    raise HTTPException(status_code=500, detail="HF_API_KEY not set in environment")

MODEL_ID = "codellama/CodeLlama-13b-Instruct-hf"
API_URL = f"https://api-inference.huggingface.co/models/{MODEL_ID}"
HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}

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
    payload = {
        "inputs": json.dumps(json_prompt),
        "parameters": {"max_new_tokens": 500, "temperature": 0.7}
    }
    response = requests.post(API_URL, headers=HEADERS, json=payload)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    result = response.json()
    return result[0].get("generated_text", "")

@router.post("/generate-prompt", response_model=PromptResponse)
async def generate_prompt(request: PromptRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    # Convert text to JSON prompt
    json_prompt = text_to_json_prompt(request.text)
    
    return PromptResponse(
        original_text=request.text,
        json_prompt=json_prompt
    )
