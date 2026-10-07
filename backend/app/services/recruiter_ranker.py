def calculate_recruiter_score(
    match_score: float,
    ats_score: float,
    project_score: float,
) -> float:
    # Weighted calculation
    score = (
        match_score * 0.60
        + ats_score * 0.25
        + project_score * 0.15
    )
    return round(min(score, 100.0), 2)


def get_readiness_level(score: float) -> str:
    if score >= 85.0:
        return "Highly Ready"
    if score >= 70.0:
        return "Interview Ready"
    if score >= 50.0:
        return "Needs Improvement"
    return "Significant Skill Gaps"
