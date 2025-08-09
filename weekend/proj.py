import requests
import json
import time
import os
import dotenv
dotenv.load_dotenv()

class CodeLlamaPromptConverter:
    def __init__(self, api_key, model_size="8b"):
        """
        Initialize Llama API client
        
        Args:
            api_key (str): Your Hugging Face API key (starts with 'hf_')
            model_size (str): "8b" for Llama-3-8b-Instruct (default)
        """
        self.api_key = api_key
        
        # Use a general-purpose instruct model
        models = {
            "8b": "https://api-inference.huggingface.co/models/meta-llama/Llama-3-8b-Instruct",
            "mixtral": "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1"
        }
        
        self.api_url = models.get(model_size, models["8b"])
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

    def convert_prompt_to_json(self, english_prompt, task_type="general"):
        """
        Convert English prompt to structured JSON format
        
        Args:
            english_prompt (str): Your natural language prompt
            task_type (str): Type of task (e.g., "writing", "coding", "analysis", "creative")
        
        Returns:
            dict: Structured JSON prompt
        """
        # System prompt for a general LLM
        system_prompt = f"""You are an expert prompt engineer. Convert the following natural language prompt into a structured JSON format that other AI models can understand better.

The JSON should include:
1. "task": Main objective
2. "parameters": Specific requirements, style, length, etc.
3. "output_format": Expected output structure
4. "context": Any additional context needed

Natural Language Prompt: "{english_prompt}"
Task Type: {task_type}

Respond ONLY with a clean, valid JSON object, and nothing else."""

        payload = {
            "inputs": system_prompt,
            "parameters": {
                "max_new_tokens": 500,
                "temperature": 0.3,
                "top_p": 0.9,
                "do_sample": True,
                "return_full_text": False
            }
        }
        
        try:
            print("🔄 Converting your prompt to JSON...")
            response = requests.post(self.api_url, headers=self.headers, json=payload)
            
            if response.status_code == 200:
                result = response.json()
                if isinstance(result, list) and len(result) > 0:
                    generated_text = result[0].get("generated_text", "")
                    return self.parse_json_response(generated_text, english_prompt, task_type)
                else:
                    return self.fallback_json(english_prompt, task_type)
            elif response.status_code == 503:
                print("🔄 Model is loading, trying again...")
                time.sleep(20)
                return self.convert_prompt_to_json(english_prompt, task_type)
            else:
                print(f"❌ API Error: {response.status_code}")
                return self.fallback_json(english_prompt, task_type)
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            return self.fallback_json(english_prompt, task_type)

    def parse_json_response(self, generated_text, original_prompt, task_type):
        """Parse and clean the JSON response from Code Llama"""
        try:
            # Try to find JSON in the response
            json_start = generated_text.find("{")
            json_end = generated_text.rfind("}") + 1
            
            if json_start != -1 and json_end != -1:
                json_str = generated_text[json_start:json_end]
                parsed_json = json.loads(json_str)
                return parsed_json
            else:
                return self.fallback_json(original_prompt, task_type)
                
        except json.JSONDecodeError:
            return self.fallback_json(original_prompt, task_type)
    
    def fallback_json(self, prompt, task_type):
        """Create a fallback structured JSON if parsing fails"""
        return {
            "task": self.extract_task(prompt),
            "parameters": {
                "original_prompt": prompt,
                "task_type": task_type,
                "requirements": self.extract_requirements(prompt)
            },
            "output_format": {
                "type": "text",
                "style": "professional" if "professional" in prompt.lower() else "casual",
                "length": "medium"
            },
            "context": {
                "user_intent": prompt,
                "processing_method": "fallback_structured"
            }
        }
    
    def extract_task(self, prompt):
        """Extract main task from prompt"""
        prompt_lower = prompt.lower()
        
        if any(word in prompt_lower for word in ["write", "create", "generate"]):
            return "content_generation"
        elif any(word in prompt_lower for word in ["analyze", "review", "examine"]):
            return "analysis"
        elif any(word in prompt_lower for word in ["code", "program", "script"]):
            return "coding"
        elif any(word in prompt_lower for word in ["explain", "describe", "tell"]):
            return "explanation"
        else:
            return "general_task"
    
    def extract_requirements(self, prompt):
        """Extract requirements from prompt"""
        requirements = []
        
        if "short" in prompt.lower():
            requirements.append("brief_response")
        elif "long" in prompt.lower() or "detailed" in prompt.lower():
            requirements.append("detailed_response")
            
        if "professional" in prompt.lower():
            requirements.append("professional_tone")
        elif "casual" in prompt.lower():
            requirements.append("casual_tone")
            
        if "examples" in prompt.lower():
            requirements.append("include_examples")
            
        return requirements if requirements else ["standard_format"]

    def wait_for_model(self):
        """Wait for the model to be ready (simulate for Hugging Face Inference API)"""
        print("⏳ Waiting for model to be ready...")
        time.sleep(2)
        print("✅ Model ready!")

def main():
    # Read API key from environment variable for security
    API_KEY = os.getenv("HF_API_KEY")
    if not API_KEY:
        print("❌ Error: Please set your Hugging Face API key in the HF_API_KEY environment variable.")
        return
    
    # Initialize converter
    converter = CodeLlamaPromptConverter(API_KEY, model_size="8b")
    
    # Wait for model to be ready
    converter.wait_for_model()
    
    print("🚀 JSON Prompt Generator (type 'exit' to quit)\n")

    while True:
        user_prompt = input("Enter your prompt: ")
        if user_prompt.strip().lower() == "exit":
            print("Goodbye!")
            break
        # Convert to JSON
        json_result = converter.convert_prompt_to_json(user_prompt, "general")
        
        # Display results
        print("✅ Structured JSON Output:")
        print(json.dumps(json_result, indent=2))
        print("\n" + "="*60 + "\n")

if __name__ == "__main__":
    main()