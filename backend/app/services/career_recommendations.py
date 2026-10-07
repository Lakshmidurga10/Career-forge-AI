from typing import List


def generate_career_recommendations(
    analysis,
) -> List[str]:
    recommendations = []

    if analysis.match_score < 60:
        recommendations.append(
            "Strengthen the critical technical skills before targeting this role."
        )
    elif analysis.match_score < 80:
        recommendations.append(
            "Close the highest-priority skill gaps and strengthen relevant projects."
        )
    else:
        recommendations.append(
            "Your profile is strongly aligned with this role. Focus on interview preparation."
        )

    if hasattr(analysis, "missing_skills") and analysis.missing_skills:
        top_missing = analysis.missing_skills[:3]
        recommendations.append(
            f"Prioritize learning: {', '.join(top_missing)}."
        )

    if hasattr(analysis, "project_relevance") and analysis.project_relevance:
        recommendations.append(
            "Highlight your most relevant projects prominently in the resume."
        )

    return recommendations
