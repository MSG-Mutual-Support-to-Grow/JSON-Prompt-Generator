# convert.py
import os
import json
import re
from dotenv import load_dotenv
from mistralai import Mistral

# Load API key
load_dotenv()
API_KEY = os.getenv("MISTRAL_API_KEY")
if not API_KEY:
    raise SystemExit("Set MISTRAL_API_KEY in .env or environment")

# Init client
client = Mistral(api_key=API_KEY)
MODEL = "mistral-large-latest"

print("Dynamic JSON Prompt Generator started. Type 'exit' to quit.\n")

while True:
    user_input = input("Enter your request: ").strip()
    if user_input.lower() in ["exit", "quit"]:
        break

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
        {"role": "user", "content": user_input}
    ]

    try:
        resp = client.chat.complete(
            model=MODEL,
            messages=messages,
            temperature=0,
            response_format={"type": "json_object"}  # Dynamic key JSON
        )

        raw = resp.choices[0].message.content
        print("\nRAW RESPONSE:\n", raw)

        # Parse JSON
        parsed = None
        try:
            parsed = json.loads(raw)
        except Exception:
            m = re.search(r"\{.*\}", raw, flags=re.S)
            if m:
                parsed = json.loads(m.group(0))

        if not parsed:
            print("Couldn't parse JSON from model response.")
            continue

        print("\nParsed Dynamic JSON:\n", json.dumps(parsed, indent=2))

    except Exception as e:
        print("Error calling Mistral API:", e)
