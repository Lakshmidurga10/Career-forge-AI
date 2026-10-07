def build_career_graph(
    candidate,
    job,
    analysis,
):
    nodes = []
    edges = []

    # Candidate node
    candidate_name = getattr(candidate, "name", "Candidate")
    nodes.append({
        "id": "candidate",
        "label": candidate_name,
        "node_type": "candidate",
        "status": "active",
    })

    # Job node
    job_title = getattr(job, "job_title", "Target Role")
    nodes.append({
        "id": "job",
        "label": job_title,
        "node_type": "job",
        "status": "target",
    })

    edges.append({
        "source": "candidate",
        "target": "job",
        "relationship": "targets",
    })

    # Candidate skills
    candidate_skills = getattr(candidate, "skills", [])
    for index, skill in enumerate(candidate_skills):
        skill_id = f"candidate_skill_{index}"
        nodes.append({
            "id": skill_id,
            "label": skill,
            "node_type": "skill",
            "status": "matched",
        })
        edges.append({
            "source": "candidate",
            "target": skill_id,
            "relationship": "has_skill",
        })

    # Missing skills / gaps
    missing_skills = getattr(analysis, "missing_skills", [])
    for index, skill in enumerate(missing_skills):
        skill_id = f"missing_skill_{index}"
        nodes.append({
            "id": skill_id,
            "label": skill,
            "node_type": "skill_gap",
            "status": "missing",
        })
        edges.append({
            "source": "job",
            "target": skill_id,
            "relationship": "requires",
        })

    # Projects evidence
    candidate_projects = getattr(candidate, "projects", [])
    for index, project in enumerate(candidate_projects):
        project_id = f"project_{index}"
        project_name = getattr(project, "name", str(project))
        nodes.append({
            "id": project_id,
            "label": project_name,
            "node_type": "project",
            "status": "evidence",
        })
        edges.append({
            "source": "candidate",
            "target": project_id,
            "relationship": "built",
        })

    readiness_score = getattr(analysis, "match_score", 0.0)

    if readiness_score >= 85:
        readiness_level = "Highly Ready"
    elif readiness_score >= 70:
        readiness_level = "Interview Ready"
    elif readiness_score >= 50:
        readiness_level = "Needs Improvement"
    else:
        readiness_level = "Significant Skill Gaps"

    actions = []
    for skill in missing_skills[:5]:
        actions.append({
            "title": f"Learn {skill}",
            "description": (
                f"Build practical knowledge of {skill} "
                "and create evidence through a small project."
            ),
            "priority": "High",
            "estimated_effort": "1–3 weeks",
            "reason": (
                f"{skill} is relevant to the target role "
                "and is currently missing from the candidate profile."
            ),
        })

    project_relevance = getattr(analysis, "project_relevance", [])
    if project_relevance:
        actions.append({
            "title": "Highlight relevant projects",
            "description": (
                "Move the strongest job-relevant projects "
                "higher in the resume."
            ),
            "priority": "Medium",
            "estimated_effort": "1 day",
            "reason": (
                "Relevant project evidence strengthens "
                "the candidate's role alignment."
            ),
        })

    if readiness_score >= 70:
        next_best_action = (
            f"Start targeted interview preparation for the {job_title} role."
        )
    elif missing_skills:
        next_best_action = (
            f"Prioritize learning {missing_skills[0]} before focusing heavily on interviews."
        )
    else:
        next_best_action = (
            "Strengthen practical projects and begin mock interview preparation."
        )

    strengths = getattr(analysis, "strengths", [])

    return {
        "nodes": nodes,
        "edges": edges,
        "readiness_score": round(readiness_score, 2),
        "readiness_level": readiness_level,
        "strengths": strengths,
        "critical_gaps": missing_skills,
        "actions": actions,
        "next_best_action": next_best_action,
    }
