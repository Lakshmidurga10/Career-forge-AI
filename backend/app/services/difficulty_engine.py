def determine_difficulty(score: float) -> str:
    if score >= 85:
        return "Hard"
    if score >= 70:
        return "Medium"
    return "Easy"


def determine_adaptation(score: float) -> dict:
    if score >= 85:
        return {
            "difficulty_change": "increase",
            "focus_area": "advanced_reasoning",
        }
    if score >= 70:
        return {
            "difficulty_change": "maintain",
            "focus_area": "application",
        }
    return {
        "difficulty_change": "decrease",
        "focus_area": "fundamentals",
    }
