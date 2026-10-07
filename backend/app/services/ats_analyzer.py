from typing import List, Dict, Any


def analyze_ats_keywords(
    candidate_skills: List[str],
    job_keywords: List[str],
) -> Dict[str, Any]:
    candidate = {
        skill.lower().strip()
        for skill in candidate_skills
    }

    keywords = {
        keyword.lower().strip()
        for keyword in job_keywords
    }

    matched = sorted(list(candidate.intersection(keywords)))
    missing = sorted(list(keywords - candidate))

    if not keywords:
        score = 100.0
    else:
        score = (len(matched) / len(keywords)) * 100.0

    return {
        "ats_score": round(score, 2),
        "matched_keywords": matched,
        "missing_keywords": missing,
    }
