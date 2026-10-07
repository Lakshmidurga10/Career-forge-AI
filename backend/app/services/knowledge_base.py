import json
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
KNOWLEDGE_FILE = BASE_DIR / "data" / "career_knowledge.json"


def load_knowledge_base():
    try:
        with open(KNOWLEDGE_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception:
        return []


def get_skill_knowledge(skill: str):
    knowledge = load_knowledge_base()
    normalized = skill.lower().strip()

    for item in knowledge:
        if item.get("skill", "").lower() == normalized:
            return item

    return None
