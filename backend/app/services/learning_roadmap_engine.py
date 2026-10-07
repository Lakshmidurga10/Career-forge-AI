def generate_learning_roadmap(
    missing_skills: list,
    candidate=None,
    job=None,
    analysis=None,
) -> list:
    roadmap = []

    for index, skill in enumerate(missing_skills[:6]):
        if index == 0:
            priority = "Critical"
            duration = "1–2 weeks"
        elif index <= 2:
            priority = "High"
            duration = "2–3 weeks"
        else:
            priority = "Medium"
            duration = "3–4 weeks"

        roadmap.append({
            "skill": skill,
            "priority": priority,
            "duration": duration,
            "steps": [
                f"Learn {skill} fundamentals and core syntax",
                f"Practice {skill} with focused hands-on coding exercises",
                f"Build one practical portfolio project integrating {skill}",
                f"Add verified {skill} evidence and metrics to your resume",
                f"Practice role-specific mock interview questions on {skill}",
            ],
        })

    return roadmap
