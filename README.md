# 📝 Text to JSON Prompt Converter

A complete Full-Stack AI-powered application that converts plain text into context-aware, structured JSON prompts for better AI model comprehension.  
The system features a React + Tailwind frontend for easy text input and history tracking, and a FastAPI + Pydantic AI + Mistral AI backend for intelligent JSON generation and validation.

---

## 🚀 Features

### 🔹 Backend (FastAPI + Pydantic AI + Mistral AI)
- **Advanced Pydantic AI Integration:** Strong validation and structured responses  
- **Mistral AI Powered:** Context-aware JSON generation with relevant keys only  
- **Smart Validation:** Multi-layer type checking and error recovery  
- **Async Operations:** High-performance async/await for scalability  
- **Robust Error Handling:** Built-in retry logic, graceful fallbacks  
- **Multi-Domain Support:** Handles code generation, travel planning, data science, writing, and more  

### 🔹 Frontend (React + Tailwind)
- Instant Text-to-JSON Conversion  
- Conversion History: Stores latest 5 conversions  
- Copy to Clipboard for generated JSON  
- Responsive UI with sidebar navigation  
- Customizable JSON Structure  

---

## 🛠 Tech Stack

**Backend:**  
- FastAPI (Python 3.9+)  
- Pydantic AI with Mistral AI integration  
- Uvicorn  
- python-dotenv  

**Frontend:**  
- React + TypeScript  
- Vite  
- Tailwind CSS  
- Lucide React Icons  

---

## 📂 Project Structure
```bash
JSON-Prompt-Generator/
├── backend/                  # FastAPI backend
│   ├── main.py
│   ├── services/
│   │   └── generator.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── components/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TextToJsonConverter.tsx
│   │   │   └── HistoryView.tsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/MSG-Mutual-Support-to-Grow/JSON-Prompt-Generator.git
cd JSON-Prompt-Generator
```

---

### 2️⃣ Backend Setup
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


### 3️⃣ Frontend Setup 
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/text-to-json-converter.git
   cd text-to-json-converter/frontend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```

## 📡 API Endpoints

### **POST** `/prompts/transform`
Transform plain text into structured JSON with context-aware key selection.

**Request:**
```json
{
  "text": "plan a trip to Tokyo in December",
  "num_keys": 5,
  "include_ai_content": true
}
```

**Response Example:**
```json
{
  "response": {
    "text": "plan a trip to Tokyo in December",
    "city": "Tokyo",
    "country": "Japan",
    "month": "December",
    "activities": ["sightseeing", "food tours"]
  },
  "source": "mistral"
}
```

### **GET** `/`
Health check endpoint.

---

## 🖥 Example Workflows
- **Programming** → Generates language, framework, libraries, etc.  
- **Travel** → Generates destination, budget, activities, etc.  
- **Content Writing** → Generates topic, tone, audience, word_count.  

---

## 🎨 Frontend Features
- Text Input → JSON Output instantly via API  
- Copy JSON to Clipboard  
- View Conversion History  
- Responsive Design for desktop & mobile  

---

## 🔧 Development
- **Code Style:** PEP 8 (backend), TypeScript best practices (frontend)  
- **Strong Typing:** Pydantic models for backend validation  
- **CORS Ready:** Accepts requests from http://localhost:3000 and http://localhost:5173  

---

## 🐞 Troubleshooting
- Backend not starting? Activate venv and check `.env` file  
- CORS issues? Update `allow_origins` in `main.py`  
- Port conflicts? Change with `--port` flag in uvicorn or vite  

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).

---

## 👥 Contributors
- [aswathkarthick75-collab](https://github.com/aswathkarthick75-collab)
- [Joelrtharakan](https://github.com/Joelrtharakan)
- [DicksonLegend](https://github.com/DicksonLegend)
- [gokul18062006](https://github.com/gokul18062006)
- [Niranjan070](https://github.com/Niranjan070)
- [snipergib](https://github.com/snipergib)
- [hazim564-dotcom](https://github.com/hazim564-dotcom)


## 🤝 Contributing
Pull requests are welcome! Please follow:  
1. PEP 8 for Python code  
2. TypeScript standards for frontend  
3. Add docstrings/comments for clarity  

---

