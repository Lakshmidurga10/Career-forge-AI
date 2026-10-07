from typing import List, Dict, Any


def calculate_interview_report(turns: list) -> Dict[str, Any]:
    if not turns:
        return {
            "overall_score": 0.0,
            "technical_score": 0.0,
            "communication_score": 0.0,
            "relevance_score": 0.0,
            "confidence_score": 0.0,
            "strengths": [],
            "weaknesses": [],
            "recommendations": [],
            "readiness_level": "Not Evaluated",
        }

    evaluations = []
    for turn in turns:
        if hasattr(turn, "evaluation"):
            evaluations.append(turn.evaluation)
        elif isinstance(turn, dict) and "evaluation" in turn:
            eval_data = turn["evaluation"]
            evaluations.append(eval_data)

    def average(values):
        if not values:
            return 0.0
        return round(sum(values) / len(values), 2)

    def get_attr(obj, attr, default=0.0):
        if hasattr(obj, attr):
            return getattr(obj, attr)
        if isinstance(obj, dict):
            return obj.get(attr, default)
        return default

    technical = average([get_attr(e, "technical_score") for e in evaluations])
    communication = average([get_attr(e, "communication_score") for e in evaluations])
    relevance = average([get_attr(e, "relevance_score") for e in evaluations])
    confidence = average([get_attr(e, "confidence_score") for e in evaluations])
    overall = average([get_attr(e, "overall_score") for e in evaluations])

    strengths = []
    weaknesses = []

    for e in evaluations:
        str_list = get_attr(e, "strengths", [])
        weak_list = get_attr(e, "weaknesses", [])
        if isinstance(str_list, list):
            strengths.extend(str_list)
        if isinstance(weak_list, list):
            weaknesses.extend(weak_list)

    strengths = list(dict.fromkeys(strengths))[:5]
    weaknesses = list(dict.fromkeys(weaknesses))[:5]

    recommendations = []
    if technical < 70:
        recommendations.append("Strengthen technical fundamentals and architectural patterns for the target role.")
    if communication < 70:
        recommendations.append("Practice explaining technical concepts clearly, concisely, and using structured frameworks (STAR method).")
    if relevance < 70:
        recommendations.append("Focus on answering the core question directly before expanding into secondary details.")
    if confidence < 70:
        recommendations.append("Practice mock technical interviews with structured time limits to boost delivery confidence.")

    if not recommendations:
        recommendations.append("Great job! Continue refining advanced role-specific problem-solving strategies.")

    if overall >= 85:
        readiness = "Highly Interview Ready"
    elif overall >= 70:
        readiness = "Interview Ready"
    elif overall >= 50:
        readiness = "Needs More Practice"
    else:
        readiness = "Significant Preparation Needed"

    return {
        "overall_score": overall,
        "technical_score": technical,
        "communication_score": communication,
        "relevance_score": relevance,
        "confidence_score": confidence,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "recommendations": recommendations,
        "readiness_level": readiness,
    }
