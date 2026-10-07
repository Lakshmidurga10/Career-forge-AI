from app.services.trust_engine import generate_trust_notes


def explain_score(analysis):
    breakdown = getattr(analysis, "score_breakdown", None)
    if not breakdown:
        return []

    req_score = getattr(breakdown, "required_skill_score", 0.0)
    pref_score = getattr(breakdown, "preferred_skill_score", 0.0)
    sem_score = getattr(breakdown, "semantic_score", 0.0)
    proj_score = getattr(breakdown, "project_score", 0.0)

    explanations = [
        {
            "factor": "Required Skills",
            "contribution": req_score,
            "status": "Strong" if req_score >= 55 else "Needs Improvement",
            "explanation": (
                f"Required skills contributed {req_score:.1f} points "
                "to the final compatibility score."
            ),
        },
        {
            "factor": "Preferred Skills",
            "contribution": pref_score,
            "status": "Strong" if pref_score >= 15 else "Needs Improvement",
            "explanation": f"Preferred skills contributed {pref_score:.1f} points.",
        },
        {
            "factor": "Semantic Relevance",
            "contribution": sem_score,
            "status": "Relevant" if sem_score >= 6 else "Limited",
            "explanation": (
                "Semantic similarity identifies related skills or experience "
                "beyond exact keyword matches."
            ),
        },
        {
            "factor": "Project Relevance",
            "contribution": proj_score,
            "status": "Strong" if proj_score >= 5 else "Limited",
            "explanation": (
                "Relevant projects provide practical evidence for the target role."
            ),
        },
    ]

    return explanations


def explain_skills(candidate, job):
    candidate_skills = {
        skill.lower().strip()
        for skill in getattr(candidate, "skills", [])
    }

    explanations = []
    all_job_skills = (
        getattr(job, "required_skills", [])
        + getattr(job, "preferred_skills", [])
    )

    for skill in all_job_skills:
        normalized = skill.lower().strip()

        if normalized in candidate_skills:
            explanations.append({
                "skill": skill,
                "status": "Matched",
                "evidence": f"{skill} appears explicitly in the candidate profile.",
                "confidence": 1.0,
                "explanation": f"The candidate explicitly lists {skill}.",
            })
        else:
            explanations.append({
                "skill": skill,
                "status": "Gap",
                "evidence": (
                    f"{skill} is required or preferred by the target job "
                    "but is not explicitly listed in the candidate profile."
                ),
                "confidence": 0.95,
                "explanation": (
                    f"{skill} should be treated as a skill gap "
                    "until the candidate provides verified evidence."
                ),
            })

    return explanations


def explain_recommendations(analysis):
    explanations = []
    recommendations = getattr(analysis, "recommendations", [])
    missing_skills = getattr(analysis, "missing_skills", [])
    project_relevance = getattr(analysis, "project_relevance", [])
    match_score = getattr(analysis, "match_score", 0.0)

    for recommendation in recommendations:
        evidence = []

        if missing_skills:
            evidence.append("Missing skills were identified during job matching.")
        if project_relevance:
            evidence.append("Relevant projects were detected.")
        if match_score < 70:
            evidence.append(
                "Overall role compatibility is below the recommended interview-ready threshold."
            )

        explanations.append({
            "recommendation": recommendation,
            "reason": "This recommendation is based on the candidate-job analysis.",
            "evidence": evidence if evidence else ["Target job competency requirements."],
        })

    return explanations


def build_explainability_report(
    candidate,
    job,
    analysis
):
    score_explanations = explain_score(analysis)
    skill_explanations = explain_skills(candidate, job)
    recommendation_explanations = explain_recommendations(analysis)
    trust_notes = generate_trust_notes(candidate, analysis)

    job_title = getattr(job, "job_title", "Target Role")
    match_score = getattr(analysis, "match_score", 0.0)

    overall = (
        f"The candidate has a {match_score:.1f}% compatibility "
        f"with the target {job_title} role. "
        f"The score is primarily influenced by required skill alignment, "
        f"preferred skills, semantic relevance, and project relevance."
    )

    return {
        "overall_explanation": overall,
        "score_explanations": score_explanations,
        "skill_explanations": skill_explanations,
        "recommendation_explanations": recommendation_explanations,
        "trust_notes": trust_notes,
    }
