#!/usr/bin/env python3
"""Generate new trivia questions in 28-question batches by difficulty level.
3 calls per category (easy, medium, hard) = much faster than 84 at once.
"""
import json, os, sys, time, urllib.request, ssl

KEY_FILE = "/tmp/or_key.txt"
QUESTIONS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "custom_components", "quizify", "questions", "adults")

CATEGORIES = [
    "animals", "art", "food_and_drink", "general_knowledge",
    "geography", "history", "language", "literature",
    "mythology", "science", "sport", "technology",
]

DESCRIPTIONS = {
    "animals": "zoology, animal behavior, species facts, evolution, biology, wildlife",
    "art": "fine art, art history, famous artists, movements, techniques, architecture",
    "food_and_drink": "cuisine, cooking, food history, beverages, world gastronomy",
    "general_knowledge": "broad trivia: current events, famous people, records, common knowledge",
    "geography": "physical geography, countries, capitals, landmarks, climate, demographics",
    "history": "world history, ancient civilizations, modern history, wars, key dates and figures",
    "language": "linguistics, etymology, grammar, world languages, writing systems",
    "literature": "classic/modern literature, authors, movements, famous works, poetry",
    "mythology": "world mythologies, Greek/Roman/Norse/Egyptian, legendary creatures, folklore",
    "science": "physics, chemistry, biology, astronomy, earth science, famous scientists",
    "sport": "world sports, Olympics, famous athletes, rules, records, sporting history",
    "technology": "computing, internet, gadgets, AI, programming, tech history, cybersecurity",
}

PREFIXES = {
    "animals": "ak-an", "art": "ak-ar", "food_and_drink": "ak-fd",
    "general_knowledge": "ak-gk", "geography": "ak-ge", "history": "ak-hi",
    "language": "ak-la", "literature": "ak-li", "mythology": "ak-my",
    "science": "ak-sc", "sport": "ak-sp", "technology": "ak-tc",
}


def load_key():
    with open(KEY_FILE) as f:
        return f.read().strip()


def load_existing(cat):
    p = os.path.join(QUESTIONS_DIR, f"{cat}.json")
    return json.load(open(p)) if os.path.exists(p) else []


def save(cat, data):
    p = os.path.join(QUESTIONS_DIR, f"{cat}.json")
    with open(p, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def call_api(key, prompt):
    body = json.dumps({
        "model": "deepseek/deepseek-chat",
        "messages": [
            {"role": "system", "content": "You are a trivia generator. Output ONLY valid JSON arrays. No markdown, no backticks."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.9,
        "max_tokens": 8000,
    }).encode()

    req = urllib.request.Request("https://openrouter.ai/api/v1/chat/completions", data=body, method="POST")
    req.add_header("Authorization", f"Bearer {key}")
    req.add_header("Content-Type", "application/json")
    req.add_header("HTTP-Referer", "https://github.com/engabd11/Quizify")
    req.add_header("X-Title", "Quizify Generator")

    ctx = ssl.create_default_context()
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=60) as r:
                result = json.loads(r.read())
                content = result["choices"][0]["message"]["content"].strip()
                if content.startswith("```"):
                    lines = content.split("\n")
                    content = "\n".join(lines[1:])
                if content.endswith("```"):
                    content = content[:-3].strip()
                return json.loads(content)
        except Exception as e:
            print(f"    Retry {attempt+1}: {e}")
            time.sleep(2)
    raise RuntimeError("3 attempts failed")


def generate_batch(key, cat, difficulty, existing, start_id, count=28):
    """Generate 'count' questions of a specific difficulty."""
    desc = DESCRIPTIONS[cat]
    prefix = PREFIXES[cat]
    
    # Sample existing questions of same difficulty for context
    same_diff = [q for q in existing if q.get("difficulty") == difficulty][-5:]
    sample_text = json.dumps(same_diff, indent=2, ensure_ascii=False) if same_diff else "[]"
    
    end_id = start_id + count - 1
    prompt = f"""Generate {count} NEW {difficulty}-difficulty trivia questions about {desc}.

Existing {difficulty} questions (DO NOT repeat):
{sample_text}

Generate exactly {count} questions: {prefix}-{start_id:03d} through {prefix}-{end_id:03d}
ALL must be {difficulty} difficulty.

RULES:
- Factually accurate. 4 answers, correct at index 0. 1-2 sentence explanation.
- {difficulty} means: {"basic common knowledge" if difficulty == "easy" else "requires some specific knowledge" if difficulty == "medium" else "specialized/obscure knowledge"}
- Global perspective. No duplicates with existing.

Return ONLY the JSON array."""

    print(f"    {difficulty} ({start_id:03d}-{end_id:03d})...", end=" ", flush=True)
    start = time.time()
    try:
        raw = call_api(key, prompt)
    except Exception as e:
        print(f"FAIL: {e}")
        return []
    
    elapsed = time.time() - start
    print(f"{len(raw)}q in {elapsed:.0f}s", flush=True)
    return raw


def generate_category(key, cat):
    print(f"\n  {cat}:", end=" ", flush=True)
    existing = load_existing(cat)
    existing_ids = {q["id"] for q in existing}
    
    if len(existing) >= 168:
        print(f"already {len(existing)}q")
        return 0
    
    seen_q = {q["question"].strip().lower().rstrip("?") for q in existing}
    all_new = []
    next_id = len(existing) + 1
    
    for difficulty in ("easy", "medium", "hard"):
        batch = generate_batch(key, cat, difficulty, existing, next_id, count=28)
        for q in batch:
            if not isinstance(q, dict):
                continue
            if not all(k in q for k in ("id", "question", "answers", "correct", "difficulty", "explanation")):
                continue
            if q["id"] in existing_ids:
                continue
            # Normalize correct answer to index 0
            ci = q.get("correct", 0)
            if ci != 0 and 0 <= ci < 4:
                ans = q["answers"]
                q["answers"] = [ans[ci]] + [a for i, a in enumerate(ans) if i != ci]
            q["correct"] = 0
            q["difficulty"] = difficulty  # force correct difficulty
            qtext = q["question"].strip().lower().rstrip("?")
            if qtext in seen_q:
                continue
            seen_q.add(qtext)
            existing_ids.add(q["id"])
            all_new.append(q)
            next_id += 1
    
    if all_new:
        save(cat, existing + all_new)
    
    e = sum(1 for q in all_new if q["difficulty"] == "easy")
    m = sum(1 for q in all_new if q["difficulty"] == "medium")
    h = sum(1 for q in all_new if q["difficulty"] == "hard")
    print(f"  → +{len(all_new)}q ({e}e/{m}m/{h}h) = {len(existing)+len(all_new)} total")
    return len(all_new)


def main():
    key = load_key()
    target = sys.argv[1] if len(sys.argv) > 1 else None
    cats = [target] if target else CATEGORIES
    
    if target and target not in CATEGORIES:
        print(f"Unknown. Valid: {', '.join(CATEGORIES)}")
        sys.exit(1)
    
    t0 = time.time()
    total = 0
    for cat in cats:
        total += generate_category(key, cat)
        time.sleep(1)
    
    print(f"\nDone. +{total} questions in {time.time()-t0:.0f}s")


if __name__ == "__main__":
    main()
