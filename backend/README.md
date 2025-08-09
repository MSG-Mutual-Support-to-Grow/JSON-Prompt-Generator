# JSON Prompt Generator Backend

A FastAPI-based backend service that converts plain text prompts into structured JSON format and generates AI responses using Hugging Face models.

## Features

- **Text-to-JSON Conversion**: Converts natural language prompts into structured JSON format
- **Language Detection**: Automatically detects programming languages and content types
- **Task Type Classification**: Identifies whether the request is for code generation, image generation, idea generation, or content creation
- **AI Generation**: Integrates with Hugging Face API for AI-powered responses
- **Multiple Content Types**: Supports code generation, image prompts, idea brainstorming, and content creation

## Tech Stack

- **FastAPI**: Modern web framework for building APIs
- **Python 3.9+**: Programming language
- **Uvicorn**: ASGI server for running the application
- **Pydantic**: Data validation and serialization
- **Hugging Face API**: AI model integration
- **python-dotenv**: Environment variable management

## Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── routes/
│   └── prompts.py         # Basic prompt processing routes
├── services/
│   ├── __init__.py
│   └── generator.py       # Main JSON prompt generator service
├── utils/
│   └── __init__.py
├── requirements.txt       # Python dependencies
├── .env                  # Environment variables (not in git)
└── README.md             # This file
```

## Installation

1. **Clone the repository and navigate to backend:**
   ```bash
   cd JSON-Prompt-Generator/backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create environment file:**
   ```bash
   # Create .env file in backend directory
   echo "HF_API_KEY=your_huggingface_api_key_here" > .env
   ```

## Configuration

### Environment Variables

Create a `.env` file in the backend directory with:

```env
HF_API_KEY=your_huggingface_api_key_here
```

**Note**: The HF_API_KEY is optional. The service will work for JSON conversion without it, but AI generation requires a valid Hugging Face API key.

### Getting Hugging Face API Key

1. Visit [Hugging Face](https://huggingface.co/)
2. Create an account or sign in
3. Go to Settings → Access Tokens
4. Create a new token with read permissions
5. Copy the token to your `.env` file

## Running the Server

1. **Activate virtual environment:**
   ```bash
   venv\Scripts\activate  # Windows
   # or
   source venv/bin/activate  # macOS/Linux
   ```

2. **Start the server:**
   ```bash
   python -m uvicorn main:app --reload
   ```

3. **Server will start on:**
   - API: http://127.0.0.1:8000
   - Swagger UI: http://127.0.0.1:8000/docs
   - OpenAPI Schema: http://127.0.0.1:8000/openapi.json

## API Endpoints

### Main Endpoint: `/generate-prompt`

**Method:** `POST`
**URL:** `http://127.0.0.1:8000/generate-prompt`

**Request Body:**
```json
{
  "text": "your prompt text here"
}
```

**Response:**
```json
{
  "original_text": "write a python function to add two numbers",
  "json_prompt": {
    "task": "create Python function",
    "programming_language": "python",
    "type": "function",
    "difficulty": "beginner",
    "output_format": "code",
    "example_input": "two numbers",
    "example_output": "sum of numbers"
  },
  "ai_generated_output": "def add_numbers(a, b):\n    return a + b"
}
```

**Dynamic JSON Examples:**

*Programming Request:*
```json
{
  "text": "create a REST API in Node.js with Express"
}
```
Response includes: `programming_language`, `framework`, `type`, `libraries`

*Travel Request:*
```json
{
  "text": "plan a trip to Tokyo in December"
}
```
Response includes: `city`, `country`, `date`, `type`, `topic`

*Data Science Request:*
```json
{
  "text": "analyze sales data using machine learning"
}
```
Response includes: `dataset`, `model`, `type`, `libraries`, `output_format`

### Other Endpoints

- **`GET /`**: Health check endpoint
- **`POST /prompt`**: Basic prompt processing (legacy)

## Usage Examples

### Code Generation
```json
{
  "text": "create a JavaScript function to validate email"
}
```

### Image Generation
```json
{
  "text": "generate an image of a sunset over mountains"
}
```

### Idea Generation
```json
{
  "text": "brainstorm ideas for a productivity mobile app"
}
```

### Content Creation
```json
{
  "text": "write an article about climate change"
}
```

## Supported Languages

The system automatically detects:
- **Programming Languages**: Python, JavaScript, Java, C++, C, HTML, CSS, SQL, R, Go, Rust, PHP, Ruby, Swift, Kotlin
- **Content Types**: Image, Idea, Text, General

## Task Types

- **`code_generation`**: Programming and development tasks
- **`image_generation`**: Image creation and design prompts
- **`idea_generation`**: Brainstorming and creative thinking
- **`content_generation`**: Writing and content creation
- **`general_query`**: General questions and requests

## Development

### Adding New Features

1. **New Routes**: Add to `routes/` directory
2. **New Services**: Add to `services/` directory
3. **Utilities**: Add to `utils/` directory

### Code Style

- Follow PEP 8 conventions
- Use type hints
- Add docstrings for functions
- Use Pydantic models for request/response validation

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (React development server)

To add more origins, modify the `allow_origins` list in `main.py`.

## Error Handling

The API returns appropriate HTTP status codes:
- **200**: Success
- **400**: Bad Request (empty text, invalid input)
- **500**: Internal Server Error
- **503**: Service Unavailable (when HF_API_KEY is not configured)

## Troubleshooting

### Common Issues

1. **"Could not import module 'main'"**
   - Ensure you're in the backend directory
   - Check that virtual environment is activated

2. **"HF_API_KEY not set"**
   - Create `.env` file with your Hugging Face API key
   - The service works without it for JSON conversion only

3. **CORS errors**
   - Check that your frontend URL is in the `allow_origins` list
   - Ensure the server is running on the correct port

4. **Port already in use**
   - Change the port: `uvicorn main:app --reload --port 8001`

### Logs

Check server logs for detailed error information. The `--reload` flag provides automatic reloading during development.

## Contributing

1. Follow the existing code structure
2. Add appropriate error handling
3. Update this README for new features
4. Test all endpoints before committing

## License

This project is part of the JSON-Prompt-Generator repository.
