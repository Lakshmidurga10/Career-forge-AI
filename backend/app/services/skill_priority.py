def calculate_skill_priority(
    skill: str,
    required_skills: list[str],
    preferred_skills: list[str],
) -> str:
    skill_lower = skill.lower().strip()

    required = [item.lower().strip() for item in required_skills]
    preferred = [item.lower().strip() for item in preferred_skills]

    if skill_lower in required:
        return "Critical"

    if skill_lower in preferred:
        return "Important"

    return "Nice to Have"


def generate_skill_gap(
    skill: str,
    required_skills: list[str],
    preferred_skills: list[str],
) -> dict:
    priority = calculate_skill_priority(
        skill,
        required_skills,
        preferred_skills,
    )

    if priority == "Critical":
        reason = "This skill is explicitly required by the target job."
        action = f"Prioritize learning {skill} and build one end-to-end practical project before applying."
    elif priority == "Important":
        reason = "This skill is preferred by the target job."
        action = f"Add {skill} to your roadmap after completing critical core gaps."
    else:
        reason = "This skill can strengthen the candidate profile."
        action = f"Consider learning {skill} as a secondary skill."

    return {
        "skill": skill,
        "priority": priority,
        "reason": reason,
        "action": action,
    }
