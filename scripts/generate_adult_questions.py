#!/usr/bin/env python3
"""Generate 84 new trivia questions per adults category using DeepSeek via OpenRouter.

Usage:  python3 generate_adult_questions.py <openrouter_api_key> [category]
        If no category is given, generates for ALL 12 categories.
        
Each call generates 28 easy, 28 medium, 28 hard questions (IDs 085-168).
Output is appended to the existing JSON files in questions/adults/.
"""

import json, os, sys, time, urllib.request, ssl

API_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "deepseek/deepseek-chat"
QUESTIONS_DIR = os.path.join(os.path.dirname(__file__), "custom_components", "quizify", "questions", "adults")

CATEGORIES = [
    "animals", "art", "food_and_drink", "general_knowledge",
    "geography", "history", "language", "literature",
    "mythology", "science", "sport", "technology",
]

CATEGORY_DESCRIPTIONS = {
    "animals": "zoology, animal behavior, species facts, evolution, biology",
    "art": "fine art, art history, famous artists, art movements, techniques, architecture",
    "food_and_drink": "cuisine, cooking techniques, food history, beverages, world gastronomy",
    "general_knowledge": "broad trivia spanning current events, famous people, world records, common knowledge",
    "geography": "physical geography, countries, capitals, landmarks, climate, demographics",
    "history": "world history, ancient civilizations, modern history, wars, important dates and figures",
    "language": "linguistics, etymology, grammar, world languages, writing systems, language families",
    "literature": "classic and modern literature, authors, literary movements, famous works, poetry",
    "mythology": "world mythologies, Greek/Roman/Norse/Egyptian myths, legendary creatures, folklore",
    "science": "physics, chemistry, biology, astronomy, earth science, famous scientists",
    "sport": "world sports, Olympics, famous athletes, rules, records, sporting history",
    "technology": "computing, internet, gadgets, AI, programming, tech history, cybersecurity",
}

ID_PREFIXES = {
    "animals": "ak-an", "art": "ak-ar", "food_and_drink": "ak-fd",
    "general_knowledge": "ak-gk", "geography": "ak-ge", "history": "ak-hi",
    "language": "ak-la", "literature": "ak-li", "mythology": "ak-my",
    "science": "ak-sc", "sport": "ak-sp", "technology": "ak-tc",
}


def load_existing(category: str) -> list[dict]:
    path = os.path.join(QUESTIONS_DIR, f"{category}.json")
    if os.path.exists(path):
        return json.load(open(path))
    return []


def build_prompt(category: str, existing: list[dict]) -> str:
    """Build a prompt that asks for 84 new diverse questions."""
    desc = CATEGORY_DESCRIPTIONS.get(category, category)
    prefix = ID_PREFIXES[category]
    
    # Sample a few existing questions for context (avoid duplicates)
    samples = existing[-10:] if len(existing) >= 10 else existing
    sample_text = "\n".join(
        f'  {{"id":"{q["id"]}","question":"{q["question"]}","answers":{json.dumps(q["answers"])},"correct":{q["correct"]},"difficulty":"{q["difficulty"]}","explanation":"{q["explanation"]}"}}'
        for q in samples
    )
    
    return f"""You are a trivia question writer. Generate 84 NEW, DIVERSE trivia questions about: {desc}.

Existing questions (DO NOT duplicate any of these — here are the last 10 as examples):
[{sample_text}]

REQUIREMENTS:
- Generate exactly 84 questions with IDs {prefix}-085 through {prefix}-168
- 28 easy, 28 medium, 28 hard — MIX THEM UP, don't group by difficulty
- Each question has exactly 4 answer choices, one correct (index 0-3)
- The correct answer MUST be at index 0 (I will shuffle it later)
- Vary which position the correct answer would land in naturally (make some obvious, some tricky)
- Questions must be factually accurate and verifiable
- Avoid overly US-centric or Euro-centric questions — global perspective
- No duplicate or near-duplicate questions with existing ones
- Explanations should be 1-2 sentences, informative

FORMAT: Return ONLY a valid JSON array. No markdown, no explanation, just the JSON array.
Each element:
{{
  "id": "{prefix}-NNN",
  "question": "...",
  "answers": ["correct answer", "wrong 1", "wrong 2", "wrong 3"],
  "correct": 0,
  "difficulty": "easy|medium|hard",
  "explanation": "..."
}}"""


def call_deepseek(api_key: str, prompt: str) -> list[dict]:
    """Call DeepSeek via OpenRouter and return parsed JSON."""
    body = json.dumps({
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are a trivia question generator. You output ONLY valid JSON arrays, no markdown, no explanations outside the JSON."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.9,
        "max_tokens": 32000,
        "response_format": {"type": "json_object"},
    }).encode()

    req = urllib.request.Request(API_URL, data=body, method="POST")
    req.add_header("Authorization", f"Bearer {api_key}")
    req.add_header("Content-Type", "application/json")
    req.add_header("HTTP-Referer", "https://github.com/engabd11/Quizify")
    req.add_header("X-Title", "Quizify Question Generator")

    ctx = ssl.create_default_context()
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=120) as resp:
                result = json.loads(resp.read())
                content = result["choices"][0]["message"]["content"]
                # Extract JSON array from response
                content = content.strip()
                if content.startswith("```"):
                    content = content.split("\n", 1)[1]
                    if content.endswith("```"):
                        content = content[:-3]
                parsed = json.loads(content)
                if isinstance(parsed, dict) and "questions" in parsed:
                    parsed = parsed["questions"]
                if not isinstance(parsed, list):
                    raise ValueError(f"Expected JSON array, got {type(parsed)}")
                return parsed
        except Exception as e:
            print(f"  Attempt {attempt+1} failed: {e}")
            time.sleep(3)
    raise RuntimeError("Failed after 3 attempts")


def validate_questions(questions: list[dict], category: str, existing_ids: set[str]) -> list[dict]:
    """Validate and deduplicate generated questions."""
    prefix = ID_PREFIXES[category]
    valid = []
    seen_questions = set()
    
    # Build set of existing question texts (lowercased, stripped)
    for qid in existing_ids:
        pass  # We'll check by ID
    
    for q in questions:
        # Check required fields
        if not all(k in q for k in ("id", "question", "answers", "correct", "difficulty", "explanation")):
            print(f"  Skipping malformed: {q.get('id', 'unknown')}")
            continue
        
        # Check ID uniqueness
        if q["id"] in existing_ids:
            print(f"  Skipping duplicate ID: {q['id']}")
            continue
        
        # Check answers
        if not isinstance(q["answers"], list) or len(q["answers"]) != 4:
            print(f"  Skipping bad answers: {q.get('id', 'unknown')}")
            continue
        
        # Normalize correct
        if q["correct"] != 0:
            # Move correct answer to index 0
            correct_idx = q["correct"]
            if 0 <= correct_idx < 4:
                answers = q["answers"]
                q["answers"] = [answers[correct_idx]] + [a for i, a in enumerate(answers) if i != correct_idx]
            q["correct"] = 0
        
        # Check for near-duplicate questions (same question text)
        q_lower = q["question"].strip().lower().rstrip("?")
        if q_lower in seen_questions:
            print(f"  Skipping duplicate question: {q['id']}")
            continue
        seen_questions.add(q_lower)
        
        # Validate ID format
        if not q["id"].startswith(prefix + "-"):
            q["id"] = f"{prefix}-{q['id'].split('-')[-1]}"
        
        # Validate difficulty
        if q["difficulty"] not in ("easy", "medium", "hard"):
            q["difficulty"] = "medium"
        
        valid.append(q)
    
    return valid


def generate_category(api_key: str, category: str) -> int:
    """Generate questions for one category. Returns count added."""
    print(f"\n{'='*60}")
    print(f"Category: {category}")
    print(f"{'='*60}")
    
    existing = load_existing(category)
    existing_ids = {q["id"] for q in existing}
    prefix = ID_PREFIXES[category]
    
    # Check if already done
    target_id = f"{prefix}-168"
    if target_id in existing_ids:
        print(f"  Already has 84+ questions (found {target_id}). Skipping.")
        return 0
    
    print(f"  Existing: {len(existing)} questions")
    
    # Build prompt and call API
    prompt = build_prompt(category, existing)
    print("  Calling DeepSeek...")
    
    try:
        new_questions = call_deepseek(api_key, prompt)
    except Exception as e:
        print(f"  ERROR: {e}")
        return 0
    
    print(f"  Generated: {len(new_questions)} raw questions")
    
    # Validate
    valid = validate_questions(new_questions, category, existing_ids)
    print(f"  Valid: {len(valid)} questions")
    
    if not valid:
        print("  No valid questions — skipping")
        return 0
    
    # Append to file
    all_questions = existing + valid
    path = os.path.join(QUESTIONS_DIR, f"{category}.json")
    with open(path, "w") as f:
        json.dump(all_questions, f, indent=2, ensure_ascii=False)
    
    # Verify saved correctly
    saved = load_existing(category)
    print(f"  Saved: {len(saved)} total questions (was {len(existing)})")
    
    # Show a sample
    if valid:
        sample = valid[0]
        print(f"  Sample: [{sample['difficulty']}] {sample['question'][:80]}...")
    
    return len(valid)


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 generate_adult_questions.py <openrouter_api_key> [category]")
        print(f"Categories: {', '.join(CATEGORIES)}")
        sys.exit(1)
    
    api_key = sys.argv[1]
    target = sys.argv[2] if len(sys.argv) > 2 else None
    
    categories = [target] if target else CATEGORIES
    if target and target not in CATEGORIES:
        print(f"Unknown category: {target}")
        print(f"Valid: {', '.join(CATEGORIES)}")
        sys.exit(1)
    
    total = 0
    for cat in categories:
        try:
            added = generate_category(api_key, cat)
            total += added
        except Exception as e:
            print(f"  FATAL: {e}")
        time.sleep(2)  # Rate limit
    
    print(f"\n{'='*60}")
    print(f"Done. Added {total} new questions across {len(categories)} categories.")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
