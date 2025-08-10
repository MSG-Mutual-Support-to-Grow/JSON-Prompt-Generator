# JSON Prompt Generator Backend

A FastAPI-based backend service that converts plain text prompts into dynamic structured JSON format using **Pydantic AI framework** with **Mistral AI** for enhanced validation and intelligent content generation.

## Features

- **Advanced Pydantic AI Integration**: Uses Pydantic AI framework for enhanced validation and structured responses
- **Mistral AI Powered**: Leverages Mistral AI through Pydantic AI for dynamic JSON generation
- **Smart Validation**: Multi-layer validation with automatic type checking and error recovery
- **Intelligent JSON Generation**: Context-aware structured JSON with relevant keys only
- **Robust Error Handling**: Built-in retry logic and graceful fallbacks
- **Async Operations**: High-performance async/await patterns for better scalability
- **Multi-Domain Support**: Handles code generation, travel planning, data science, writing, and more

## Tech Stack

- **FastAPI**: Modern web framework for building APIs
- **Python 3.9+**: Programming language
- **Pydantic AI**: Advanced AI framework for structured, validated responses
- **Mistral AI**: Large language model accessed through Pydantic AI for dynamic JSON generation
- **Pydantic**: Data validation and serialization with enhanced type safety
- **Uvicorn**: ASGI server for running the application
- **python-dotenv**: Environment variable management

## Project Structure

```
backend/
├── main.py                 # FastAPI application entry point with combined routes
├── services/
│   ├── __init__.py
│   └── generator.py       # Pydantic AI + Mistral integration service
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
   # or using uv (recommended for faster installation)
   uv pip install -r requirements.txt
   ```
   
   **Key Dependencies:**
   - `fastapi` - Web framework
   - `pydantic-ai-slim[mistral]` - Pydantic AI with Mistral support
   - `mistralai` - Mistral AI client library
   - `pydantic` - Data validation

4. **Create environment file:**
   ```bash
   # Create .env file in backend directory with Mistral AI API key
   echo "MISTRAL_API_KEY=your_mistral_api_key_here" > .env
   ```

## Configuration

### Environment Variables

Create a `.env` file in the backend directory with:

```env
MISTRAL_API_KEY=your_mistral_api_key_here
```

### Getting API Key

### Getting API Key

**Mistral AI API Key:**
1. Visit [Mistral AI Console](https://console.mistral.ai/)
2. Create an account or sign in
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

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

### POST `/prompts/transform`

Transform plain text into structured JSON format with dynamic, context-aware key selection powered by Mistral AI.

**Method:** `POST`
**URL:** `http://127.0.0.1:8000/prompts/transform`

**Request Body:**
```json
{
  "text": "Your prompt text here",
  "num_keys": 5,  // Optional: default is 5
  "include_ai_content": true  // Optional: default is true
}
```

**Response Format:**
```json
{
  "response": {
    "text": "Original prompt text",
    "generated_key_1": "AI-generated value",
    "generated_key_2": "AI-generated value"
    // Dynamic keys based on context (3-5 keys typical)
  },
  "source": "mistral",
  "generated_content": {
    "key": "value"  // Only if include_ai_content is true
  }
}
```

**Dynamic Key Examples:**
- **Programming**: `programming_language`, `framework`, `libraries`, `difficulty`
- **Travel**: `destination`, `duration`, `budget`, `activities`  
- **Learning**: `subject`, `difficulty`, `prerequisites`, `resources`
- **Business**: `industry`, `target_audience`, `budget`, `timeline`

### GET `/`

Health check endpoint to verify server status.

**Method:** `GET`
**URL:** `http://127.0.0.1:8000/`

**Response:**
```json
{
  "message": "JSON Prompt Generator Backend is running!"
}
```

## Features

### Pydantic AI Framework Integration
- **Enhanced Validation**: Multi-layer validation with automatic type checking
- **Structured Responses**: Guaranteed JSON structure with proper error handling
- **Built-in Retries**: Automatic retry logic (2 attempts) for improved reliability
- **Async Operations**: High-performance async/await patterns for scalability
- **Type Safety**: Strong typing throughout the AI interaction pipeline

### Advanced Mistral AI Integration
- **Context-Aware JSON**: Generates relevant keys based on input content analysis
- **Intelligent Categorization**: Automatic detection of programming, travel, business, and creative content
- **Dynamic Key Selection**: Only includes relevant fields, no empty or irrelevant data
- **Flexible Responses**: 3-5 dynamic keys tailored to each specific request type

### Robust Error Handling & Fallbacks
- **Graceful Degradation**: Falls back to static JSON if Pydantic AI fails
- **Multiple Parsing Strategies**: Handles string, dict, and other response formats
- **Comprehensive Error Recovery**: Structured error responses with detailed information

### Code Generation
```json
{
  "text": "create a JavaScript function to validate email"
}
```
**Response includes**: `programming_language`, `type`, `framework`, `libraries`, `output_format`

### Travel Planning
```json
{
  "text": "plan a trip to Tokyo in December"
}
```
**Response includes**: `city`, `country`, `date`, `type`, `topic`, `difficulty`

### Data Science
```json
{
  "text": "analyze sales data using machine learning"
}
```
**Response includes**: `dataset`, `model`, `libraries`, `steps`, `output_format`

### Content Writing
```json
{
  "text": "write a blog post about climate change"
}
```
**Response includes**: `topic`, `tone`, `audience`, `word_count`, `type`

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
- **503**: Service Unavailable (when MISTRAL_API_KEY is not configured)

**Error Response Format:**
```json
{
  "detail": "Error description",
  "error_type": "api_error|validation_error|service_unavailable"
}
```

## Troubleshooting

### Common Issues

1. **"Could not import module 'main'"**
   - Ensure you're in the backend directory
   - Check that virtual environment is activated

2. **"Pydantic AI with Mistral not available"**
   - Create `.env` file with MISTRAL_API_KEY
   - Ensure `pydantic-ai-slim[mistral]` is installed
   - Check that virtual environment is activated

3. **CORS errors**
   - Check that your frontend URL is in the `allow_origins` list
   - Ensure the server is running on the correct port

4. **Port already in use**
   - Change the port: `uvicorn main:app --reload --port 8001`

### Logs

Check server logs for detailed error information. The `--reload` flag provides automatic reloading during development.

## Pydantic AI Advantages

### Enhanced Validation & Type Safety
- **Automatic Input Validation**: Pydantic AI validates all requests automatically
- **Response Type Checking**: Multiple response format handling (string, dict, object)
- **Error Recovery**: Built-in fallback mechanisms for failed parsing
- **Structured Exceptions**: Clear error messages with detailed context

### Performance & Reliability
- **Async Operations**: Full async/await support for better concurrency
- **Retry Logic**: Built-in retry mechanism (2 attempts) for network reliability
- **Connection Pooling**: Optimized HTTP connections for better performance
- **Graceful Degradation**: Seamless fallback to static JSON generation

### Developer Experience
- **Type Hints**: Full TypeScript-like type safety in Python
- **IDE Support**: Better autocomplete and error detection
- **Debugging**: Enhanced error tracing and logging
- **Configuration**: Simple, declarative agent configuration

## Performance & Limitations

### Response Times
- **Pydantic AI + Mistral**: ~2-4 seconds for dynamic JSON generation
- **Enhanced Reliability**: Built-in retries reduce failure rates
- **Simple JSON Fallback**: <1 second (when AI generation fails)

### Rate Limits
- **Mistral AI**: Depends on your API plan
- **Automatic Retry**: Built-in backoff for rate limit handling
- Consider implementing caching for production use

### Input Limitations
- **Maximum text length**: 2000 characters recommended
- **Supported languages**: English (primary), with basic support for other languages
- **Complex requests**: Enhanced parsing handles edge cases better

## Contributing

### Development Setup

1. Follow the existing code structure
2. Use Pydantic AI for all AI interactions
3. Add appropriate error handling with try-catch blocks
4. Update this README for new features
5. Test all endpoints before committing

### Testing the Pydantic AI Integration

```bash
# Test the import
python -c "from services.generator import router; print('Pydantic AI import successful')"

# Start the development server
python -m uvicorn main:app --reload

# Test the endpoint
curl -X POST "http://127.0.0.1:8000/generate-prompt" \
     -H "Content-Type: application/json" \
     -d '{"text": "create a Python function to calculate fibonacci"}'
```

### Code Style

- Follow PEP 8 conventions
- Use type hints throughout
- Add docstrings for functions
- Use Pydantic models for request/response validation
- Leverage Pydantic AI for all AI interactions

## License

This project is part of the JSON-Prompt-Generator repository.
