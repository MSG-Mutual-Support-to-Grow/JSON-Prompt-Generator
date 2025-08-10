from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route("/api/convert", methods=["POST"])
def convert_to_json():
    data = request.json
    input_text = data.get('text', '')
    
    if not input_text.strip():
        return jsonify({"error": "Input text is required"}), 400

    prompt = {
        "role": "user",
        "content": input_text.strip(),
        "metadata": {
            "timestamp": datetime.now().isoformat(),
            "type": "text_prompt",
            "length": len(input_text),
            "word_count": len(input_text.split())
        },
        "context": {
            "format": "conversational",
            "intent": "query",
            "priority": "normal"
        }
    }
    
    return jsonify(prompt)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
