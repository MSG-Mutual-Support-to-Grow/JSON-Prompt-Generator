# JSON Prompt Generator Backend

A FastAPI-based backend service that converts plain text prompts into dynamic structured JSON format using Mistral AI for intelligent content generation.

## Features

- **Dynamic Text-to-JSON Conversion**: Uses Mistral AI to convert natural language prompts into context-aware structured JSON format
- **Smart Key Selection**: Automatically includes only relevant keys based on request context (no empty or irrelevant fields)
- **Intelligent AI Integration**: Powered by Mistral AI for both JSON generation and content creation
- **Context-Aware Detection**: Automatically detects programming languages, content types, and task categories
- **Multi-Domain Support**: Handles code generation, travel planning, data science, writing, and more
- **Multiple Content Types**: Supports code generation, image prompts, idea brainstorming, and content creation

## Tech Stack

- **FastAPI**: Modern web framework for building APIs
- **Python 3.9+**: Programming language
- **Mistral AI**: Dynamic JSON generation with context-aware key selection and intelligent content creation
- **Uvicorn**: ASGI server for running the application
- **Pydantic**: Data validation and serialization
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
   # or using uv
   uv pip install -r requirements.txt
   ```

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

### Dynamic JSON Generation
- **Context-Aware Keys**: Automatically generates relevant JSON keys based on input content
- **Mistral AI Integration**: Advanced language model for intelligent content generation
- **Smart Categorization**: Detects programming, travel, business, educational, and creative content
- **Flexible Response**: 3-5 dynamic keys tailored to each request type

### AI Content Generation
- **Code Generation**: Functions, classes, APIs, scripts
- **Travel Planning**: Itineraries, recommendations, logistics
- **Educational Content**: Learning paths, explanations, examples
- **Business Solutions**: Strategies, plans, analyses
- **Creative Writing**: Stories, articles, descriptions

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

2. **"API key not configured"**
   - Create `.env` file with MISTRAL_API_KEY
   - Mistral AI API key is required for full functionality

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
