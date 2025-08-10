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
│   ├── main.py                # API entry point
│   ├── services/
│   │   └── generator.py       # AI + JSON generation logic
│   ├── requirements.txt
│   └── .env                   # Environment variables (not in git)
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
git clone https://github.com/your-username/JSON-Prompt-Generator.git
cd JSON-Prompt-Generator
```

### 2️⃣ Backend Setup
```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Create `.env` file:**
```env
MISTRAL_API_KEY=your_mistral_api_key_here
```

**Run Backend Server:**
```bash
uvicorn main:app --reload
```
- API: [http://127.0.0.1:8000](http://127.0.0.1:8000)  
- Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)  

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
- App will run at: [http://localhost:5173](http://localhost:5173)  

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

This project is part of the JSON-Prompt-Generator repository.

---

## 🤝 Contributing

Pull requests are welcome! Please follow:  
1. PEP 8 for Python code  
2. TypeScript standards for frontend  
3. Add docstrings/comments for clarity  

---

## 🌟 Credits

- **Backend:** FastAPI + Pydantic AI + Mistral AI  
- **Frontend:** React + Tailwind CSS + Vite  
- **Icons:** Lucide React  
