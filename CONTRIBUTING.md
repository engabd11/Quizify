# Contributing to Quizify

Thanks for helping make Quizify better! There are three main ways to contribute, and any one of them is genuinely appreciated.

## 1. Add questions (the easiest, most valuable contribution)

Quizify lives or dies on the quality of its question banks. Adding more questions is a single-file change and you don't need any tooling beyond a text editor.

### Where they live

```
custom_components/quizify/questions/
├── adults/
│   ├── general_knowledge.json
│   ├── science.json
│   ├── geography.json
│   └── history.json
└── kids/
    ├── general_knowledge.json
    ├── science.json
    ├── geography.json
    └── history.json
```

### Format

```json
{
  "id": "ak-gk-099",
  "question": "What is the capital of Belgium?",
  "answers": ["Brussels", "Antwerp", "Ghent", "Liège"],
  "correct": 0,
  "difficulty": "easy",
  "explanation": "Brussels is also the headquarters of the EU."
}
```

### Rules

1. **ID prefix**: `ak-` for adults, `kd-` for kids. Then category code:
   - `gk` = General Knowledge
   - `sc` = Science
   - `ge` = Geography
   - `hi` = History
   Then a sequential number. Don't reuse numbers within a file.
2. **`correct` is always `0`** in the source file. The first answer is the correct one. The runtime shuffles answer order before display.
3. **2–6 answers.** Most questions work best with 4.
4. **`difficulty`** must be `easy`, `medium`, or `hard`.
5. **`explanation`** is shown on the reveal. Keep it punchy and informative.

### Kids questions

For the `kids/` folder, please follow these extra guidelines:

- Use simple vocabulary suitable for a 6–10 year old
- Avoid topics involving violence, scary themes, or anything inappropriate for young children
- Pick topics that delight kids: animals, dinosaurs, space, fairy tales, colours, music
- Don't make distractor answers cruel or mocking

### Quality bar

Before submitting:
- Read your question out loud — does it make sense?
- Are the wrong answers plausible? (Don't make obvious throwaways.)
- Did you check the answer is actually correct? Cite a source in the PR description if it's something niche.

## 2. Add a new category

To add a new category (e.g. Music, Movies & TV, Sports):

1. Add the constant in `custom_components/quizify/const.py`:
   ```python
   CATEGORY_MUSIC: Final = "music"
   CATEGORIES: Final = [..., CATEGORY_MUSIC]
   ```
2. Create `questions/adults/music.json` and `questions/kids/music.json` with at least 25 questions each.
3. Add a friendly label in `frontend/src/utils/helpers.js`:
   ```js
   export const CATEGORY_LABELS = {
     ...,
     music: "Music",
   };
   ```
4. Rebuild the frontend (`cd custom_components/quizify/frontend && npm run build`).

## 3. Code contributions

For bug fixes or new features:

```bash
git clone https://github.com/YOUR_GITHUB/quizify.git
cd quizify

# Backend lint check
python -m ruff check custom_components/quizify

# Frontend build
cd custom_components/quizify/frontend
npm install
npm run build
```

When opening a PR:

- Keep changes focused — one feature or fix per PR
- Match the existing code style (we use `ruff` for Python, `prettier` for JS where applicable)
- Update `CHANGELOG.md` with a short entry
- If your change is user-facing, update the `README.md`

## Reporting bugs

Open an issue with:

- HA version (`Settings → About`)
- Quizify version (`hacs.json`)
- A short reproduction (what you did, what you expected, what happened)
- Anything from `Settings → System → Logs` mentioning `quizify`

## Code of conduct

Be kind. Assume good faith. The goal is to make a fun, accessible quiz game for the HA community.
