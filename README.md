# 📝 Text to JSON Prompt Converter

A complete Full-Stack AI-powered application that converts plain text into context-aware, structured JSON prompts for better AI model comprehension.  
The system features a React + Tailwind frontend for easy text input and history tracking, and a FastAPI + Pydantic AI + Mistral AI backend for intelligent JSON generation and validation.

## 🌐 Live Demo
- **Frontend (Static Site):** `https://json-prompt-frontend.onrender.com`
- **Backend API:** `https://json-prompt-backend.onrender.com`
- **API Health Check:** `https://json-prompt-backend.onrender.com/health`

*Note: Replace with your actual Render URLs after deployment*

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
The backend setup instructions are in the [backend/README.md](https://github.com/MSG-Mutual-Support-to-Grow/JSON-Prompt-Generator/blob/main/backend/README.md)

---

### 3️⃣ Frontend Setup 
The frontend setup instructions are in the [frontend/README.md](https://github.com/MSG-Mutual-Support-to-Grow/JSON-Prompt-Generator/blob/main/frontend/README.md)


---

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
- [ThirupathiS-45](https://github.com/ThirupathiS-45)
- [Klassy01](https://github.com/Klassy01)



## 🤝 Contributing
Pull requests are welcome! Please follow:  
1. PEP 8 for Python code  
2. TypeScript standards for frontend  
3. Add docstrings/comments for clarity  

---

