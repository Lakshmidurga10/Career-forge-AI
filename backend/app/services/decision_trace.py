def build_decision_trace(
    candidate,
    job,
    analysis,
):
    job_title = getattr(job, "job_title", "Target Role")
    match_score = getattr(analysis, "match_score", 0.0)
    readiness_level = getattr(analysis, "readiness_level", "Interview Ready")
    missing_skills = getattr(analysis, "missing_skills", [])

    return {
        "steps": [
            {
                "step": 1,
                "component": "Resume Parser",
                "decision": "Candidate profile created",
                "reason": (
                    "Resume information and verified competencies were extracted "
                    "from the uploaded document."
                ),
            },
            {
                "step": 2,
                "component": "Job Analyzer",
                "decision": "Target role requirements identified",
                "reason": (
                    f"The system extracted requirements and keyword taxonomy for {job_title}."
                ),
            },
            {
                "step": 3,
                "component": "Skill Matcher",
                "decision": "Candidate-job skills compared",
                "reason": (
                    "Exact normalization, synonym mapping, and semantic vector embeddings "
                    "were evaluated."
                ),
            },
            {
                "step": 4,
                "component": "Career Intelligence",
                "decision": readiness_level,
                "reason": (
                    f"Calculated explainable multi-signal match score: {match_score}%."
                ),
            },
            {
                "step": 5,
                "component": "Skill Gap Engine",
                "decision": f"{len(missing_skills)} potential skill gaps identified",
                "reason": (
                    "Required and preferred job competencies were compared with verified candidate evidence."
                ),
            },
        ]
    }
