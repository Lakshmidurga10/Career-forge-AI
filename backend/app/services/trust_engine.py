def generate_trust_notes(
    candidate,
    analysis
):
    notes = [
        "Candidate information is extracted strictly from provided resume data.",
        "Missing skills are not automatically added or fabricated in the candidate profile.",
        "Semantic similarity indicates conceptual relatedness, not unverified skill mastery.",
        "AI-tailored resume content remains fully grounded in verified candidate evidence.",
        "Career recommendations are decision-support suggestions to be verified by the candidate.",
    ]

    missing_skills = getattr(analysis, "missing_skills", [])
    if missing_skills:
        notes.append(
            "The system detected skill gaps without claiming the candidate possesses those skills."
        )

    return notes
