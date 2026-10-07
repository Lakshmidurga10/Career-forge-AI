from app.services.knowledge_base import load_knowledge_base


def retrieve_skill_knowledge(
    skill: str,
    top_k: int = 3,
):
    knowledge = load_knowledge_base()
    query = skill.lower().strip()

    scored = []
    for item in knowledge:
        text = " ".join([
            item.get("skill", ""),
            item.get("category", ""),
            *item.get("topics", []),
            *item.get("practice", []),
            *item.get("interview_topics", []),
        ]).lower()

        score = 0
        if query in text:
            score += 3
        if query == item.get("skill", "").lower():
            score += 10
        if query in item.get("category", "").lower():
            score += 2

        scored.append({
            "score": score,
            "knowledge": item,
        })

    scored.sort(key=lambda x: x["score"], reverse=True)
    return [
        item["knowledge"]
        for item in scored[:top_k]
        if item["score"] > 0
    ]
