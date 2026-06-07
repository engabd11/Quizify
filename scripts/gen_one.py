#!/usr/bin/env python3
"""Generate trivia questions for ONE category using Gemini Flash (fast).
Called in parallel for all 12 categories by the launcher.
"""
import json, os, sys, time, urllib.request, ssl

KEY_FILE = "/tmp/or_key.txt"
BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "custom_components", "quizify", "questions", "adults")
MODEL = "google/gemini-2.5-flash"

DESC = {
    "animals": "zoology, animal behavior, species facts, evolution, wildlife",
    "art": "fine art, art history, famous artists, movements, architecture",
    "food_and_drink": "cuisine, cooking, food history, beverages, world gastronomy",
    "general_knowledge": "broad trivia: current events, famous people, records",
    "geography": "physical geography, countries, capitals, landmarks, climate",
    "history": "world history, ancient civilizations, modern history, wars, key dates",
    "language": "linguistics, etymology, grammar, world languages, writing systems",
    "literature": "classic/modern literature, authors, movements, famous works, poetry",
    "mythology": "world mythologies, Greek/Roman/Norse/Egyptian, folklore",
    "science": "physics, chemistry, biology, astronomy, earth science",
    "sport": "sports, Olympics, famous athletes, rules, records",
    "technology": "computing, internet, gadgets, AI, programming, cybersecurity",
}

PREF = {
    "animals": "ak-an", "art": "ak-ar", "food_and_drink": "ak-fd",
    "general_knowledge": "ak-gk", "geography": "ak-ge", "history": "ak-hi",
    "language": "ak-la", "literature": "ak-li", "mythology": "ak-my",
    "science": "ak-sc", "sport": "ak-sp", "technology": "ak-tc",
}


def call_api(key, prompt):
    body = json.dumps({
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are a trivia generator. Output ONLY valid JSON arrays. No markdown. No backticks. No surrounding text."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.9,
        "max_tokens": 8000,
    }).encode()
    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/chat/completions", data=body, method="POST",
    )
    req.add_header("Authorization", f"Bearer {key}")
    req.add_header("Content-Type", "application/json")
    req.add_header("HTTP-Referer", "https://github.com/engabd11/Quizify")
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
            time.sleep(1)
    raise RuntimeError("3 attempts failed")


def main():
    category = sys.argv[1]
    if category not in DESC:
        print(f"[{category}] Unknown category", flush=True)
        sys.exit(1)

    with open(KEY_FILE) as f:
        key = f.read().strip()

    desc = DESC[category]
    prefix = PREF[category]
    path = os.path.join(BASE_DIR, f"{category}.json")
    existing = json.load(open(path)) if os.path.exists(path) else []
    
    if len(existing) >= 168:
        print(f"[{category}] ✓ Already {len(existing)}q", flush=True)
        return
    
    seen_q = {q["question"].strip().lower().rstrip("?") for q in existing}
    existing_ids = {q["id"] for q in existing}
    all_new = []
    next_id = len(existing) + 1
    t0 = time.time()

    for difficulty in ("easy", "medium", "hard"):
        count = 28
        end_id = next_id + count - 1
        
        same_diff = [q for q in existing if q.get("difficulty") == difficulty][-5:]
        sample_text = json.dumps(same_diff, indent=2, ensure_ascii=False) if same_diff else "[]"
        
        prompt = f"""Generate {count} NEW {difficulty}-difficulty trivia questions about {desc}.

Existing {difficulty} questions (DO NOT repeat):
{sample_text}

IDs: {prefix}-{next_id:03d} through {prefix}-{end_id:03d}
Difficulty: {difficulty} ({"basic common knowledge" if difficulty == "easy" else "requires some knowledge" if difficulty == "medium" else "specialized/obscure"})

RULES: Factually accurate. 4 answers, correct at index 0. 1-2 sentence explanation. Global perspective. Return ONLY JSON array."""

        try:
            raw = call_api(key, prompt)
        except Exception as e:
            print(f"[{category}] {difficulty}: FAIL - {e}", flush=True)
            raw = []

        valid_count = 0
        for q in raw:
            if not isinstance(q, dict):
                continue
            if not all(k in q for k in ("question", "answers", "difficulty", "explanation")):
                continue
            ans = q.get("answers")
            if not isinstance(ans, list) or len(ans) != 4:
                continue
            ci = q.get("correct", 0)
            if ci != 0 and 0 <= ci < 4:
                q["answers"] = [ans[ci]] + [a for i, a in enumerate(ans) if i != ci]
            q["correct"] = 0
            q["difficulty"] = difficulty
            q["id"] = f"{prefix}-{next_id+valid_count:03d}"
            qtext = q["question"].strip().lower().rstrip("?")
            if qtext in seen_q:
                continue
            seen_q.add(qtext)
            existing_ids.add(q["id"])
            all_new.append(q)
            valid_count += 1
        
        next_id += valid_count
        print(f"[{category}] {difficulty}: {valid_count}/{len(raw)}", flush=True)

    if all_new:
        with open(path, "w") as f:
            json.dump(existing + all_new, f, indent=2, ensure_ascii=False)
        e = sum(1 for q in all_new if q["difficulty"] == "easy")
        m = sum(1 for q in all_new if q["difficulty"] == "medium")
        h = sum(1 for q in all_new if q["difficulty"] == "hard")
        print(f"[{category}] ✓ +{len(all_new)}q ({e}e/{m}m/{h}h) = {len(existing)+len(all_new)} total ({time.time()-t0:.0f}s)", flush=True)
    else:
        print(f"[{category}] ✗ No questions added", flush=True)


if __name__ == "__main__":
    main()
