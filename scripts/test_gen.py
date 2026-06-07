#!/usr/bin/env python3
"""Quick test: generate 5 science questions via OpenRouter."""
import urllib.request, json, ssl, sys, time

API_KEY = sys.argv[1] if len(sys.argv) > 1 else None
if not API_KEY:
    print("Usage: python3 test_gen.py <openrouter_key>")
    sys.exit(1)

prompt = """Generate 5 trivia questions about science. Return ONLY a JSON array.
Each question: {"id": "ak-sc-NNN", "question": "...", "answers": ["correct", "wrong1", "wrong2", "wrong3"], "correct": 0, "difficulty": "easy", "explanation": "..."}
Mix easy/medium/hard. Be factually accurate. No duplicate questions."""

body = json.dumps({
    "model": "deepseek/deepseek-chat",
    "messages": [
        {"role": "system", "content": "You output ONLY valid JSON arrays. No markdown, no backticks."},
        {"role": "user", "content": prompt},
    ],
    "temperature": 0.9,
    "max_tokens": 4000,
}).encode()

req = urllib.request.Request(
    "https://openrouter.ai/api/v1/chat/completions",
    data=body, method="POST",
)
req.add_header("Authorization", f"Bearer {API_KEY}")
req.add_header("Content-Type", "application/json")
req.add_header("HTTP-Referer", "https://github.com/engabd11/Quizify")
req.add_header("X-Title", "Quizify Generator")

ctx = ssl.create_default_context()
start = time.time()
try:
    with urllib.request.urlopen(req, context=ctx, timeout=60) as r:
        result = json.loads(r.read())
        content = result["choices"][0]["message"]["content"]
        elapsed = time.time() - start
        print(f"Response in {elapsed:.1f}s, {len(content)} chars")
        
        # Clean markdown
        content = content.strip()
        if content.startswith("```"):
            lines = content.split("\n")
            content = "\n".join(lines[1:])
        if content.endswith("```"):
            content = content[:-3].strip()
        
        questions = json.loads(content)
        print(f"Got {len(questions)} questions:\n")
        for q in questions:
            print(f"  [{q['difficulty']}] {q['question']}")
            print(f"    Answers: {q['answers']}")
            print(f"    Explanation: {q['explanation']}\n")
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code}: {e.read().decode()[:500]}")
except Exception as e:
    print(f"Error: {e}")
