from typing import List, Dict, Set
from app.models.candidate import CandidateProfile
from app.models.job import JobProfile
from app.models.analysis import (
    CareerAnalysis,
    SkillGap,
    ScoreBreakdown,
    ATSAnalysis,
)
from app.services.semantic_matcher import find_semantic_matches
from app.services.skill_ontology import get_skill_info
from app.services.skill_priority import generate_skill_gap
from app.services.ats_analyzer import analyze_ats_keywords
from app.services.recruiter_ranker import calculate_recruiter_score, get_readiness_level
from app.services.career_recommendations import generate_career_recommendations


def normalize_skill(skill: str) -> str:
    info = get_skill_info(skill)
    return info["skill"]


def calculate_required_score(
    candidate_skills: Set[str],
    required_skills: Set[str]
) -> float:
    if not required_skills:
        return 0.0
    matched = candidate_skills.intersection(required_skills)
    return (len(matched) / len(required_skills)) * 70.0


def calculate_preferred_score(
    candidate_skills: Set[str],
    preferred_skills: Set[str]
) -> float:
    if not preferred_skills:
        return 0.0
    matched = candidate_skills.intersection(preferred_skills)
    return (len(matched) / len(preferred_skills)) * 20.0


def calculate_semantic_score(
    candidate_skills: Set[str],
    job_skills: Set[str]
) -> float:
    if not candidate_skills or not job_skills:
        return 0.0

    matches = find_semantic_matches(
        list(candidate_skills),
        list(job_skills),
        threshold=0.65
    )
    if not matches:
        return 0.0

    similarities = [item["similarity"] for item in matches]
    average_similarity = sum(similarities) / len(similarities)
    return min(average_similarity * 10.0, 10.0)


def calculate_project_score(
    candidate: CandidateProfile,
    job: JobProfile
) -> float:
    if not candidate.projects:
        return 0.0

    job_text = " ".join(
        job.required_skills
        + job.preferred_skills
        + job.responsibilities
        + job.keywords
    ).lower()

    relevant_projects = 0
    for project in candidate.projects:
        project_text = (
            project.name
            + " "
            + project.description
            + " "
            + " ".join(project.technologies)
        ).lower()

        project_words = set(project_text.split())
        job_words = set(job_text.split())
        overlap = project_words.intersection(job_words)

        if len(overlap) >= 2:
            relevant_projects += 1

    if relevant_projects == 0:
        return 0.0

    return min(relevant_projects * 5.0, 10.0)


def determine_career_level(candidate: CandidateProfile) -> str:
    if candidate.experience:
        return "Experienced"
    if candidate.projects:
        return "Entry Level / Fresher"
    return "Entry Level"


def calculate_match(
    candidate: CandidateProfile,
    job: JobProfile
) -> CareerAnalysis:
    candidate_skills = {
        normalize_skill(skill)
        for skill in candidate.skills
    }

    required_skills = {
        normalize_skill(skill)
        for skill in job.required_skills
    }

    preferred_skills = {
        normalize_skill(skill)
        for skill in job.preferred_skills
    }

    # Exact matching
    matched_required = candidate_skills.intersection(required_skills)
    matched_preferred = candidate_skills.intersection(preferred_skills)
    missing_required = required_skills - candidate_skills
    missing_preferred = preferred_skills - candidate_skills

    # Scores
    required_score = calculate_required_score(
        candidate_skills,
        required_skills
    )

    preferred_score = calculate_preferred_score(
        candidate_skills,
        preferred_skills
    )

    semantic_score = calculate_semantic_score(
        candidate_skills,
        required_skills
    )

    project_score = calculate_project_score(
        candidate,
        job
    )

    # Calculate overall match score
    if not required_skills and not preferred_skills:
        final_score = 100.0
    else:
        raw_score = required_score + preferred_score + semantic_score + project_score
        final_score = min(round(raw_score, 2), 100.0)

    # ATS Keyword Analysis
    all_job_keywords = job.keywords if job.keywords else list(required_skills.union(preferred_skills))
    ats_data = analyze_ats_keywords(candidate.skills, all_job_keywords)
    ats_analysis = ATSAnalysis(
        ats_score=ats_data["ats_score"],
        matched_keywords=ats_data["matched_keywords"],
        missing_keywords=ats_data["missing_keywords"],
    )

    # Recruiter Score & Readiness
    recruiter_score = calculate_recruiter_score(
        match_score=final_score,
        ats_score=ats_analysis.ats_score,
        project_score=(project_score / 10.0) * 100.0 if project_score > 0 else 0.0,
    )
    readiness_level = get_readiness_level(final_score)

    # Structured Skill Gaps
    critical_gaps = []
    for skill in missing_required:
        gap_dict = generate_skill_gap(
            skill,
            job.required_skills,
            job.preferred_skills,
        )
        critical_gaps.append(SkillGap(**gap_dict))

    for skill in missing_preferred:
        gap_dict = generate_skill_gap(
            skill,
            job.required_skills,
            job.preferred_skills,
        )
        critical_gaps.append(SkillGap(**gap_dict))

    # Strengths
    strengths = []
    if matched_required:
        strengths.append(f"Matches {len(matched_required)} required skills.")
    if matched_preferred:
        strengths.append(f"Matches {len(matched_preferred)} preferred skills.")
    if candidate.projects:
        strengths.append(f"Has {len(candidate.projects)} documented project(s).")
    if candidate.education:
        strengths.append("Has documented educational qualifications.")

    # Project relevance
    project_relevance = []
    for project in candidate.projects:
        project_relevance.append(
            f"{project.name}: consider highlighting technologies relevant to the target role."
        )

    # Career level
    career_level = determine_career_level(candidate)

    # Temporary Analysis object to build recommendations
    score_breakdown = ScoreBreakdown(
        required_skill_score=round(required_score, 2),
        preferred_skill_score=round(preferred_score, 2),
        semantic_score=round(semantic_score, 2),
        project_score=round(project_score, 2),
        final_score=final_score
    )

    temp_analysis = CareerAnalysis(
        match_score=final_score,
        score_breakdown=score_breakdown,
        ats_analysis=ats_analysis,
        matched_skills=sorted(matched_required.union(matched_preferred)),
        missing_skills=sorted(missing_required.union(missing_preferred)),
        critical_gaps=critical_gaps,
        strengths=strengths,
        recommendations=[],
        project_relevance=project_relevance,
        career_level=career_level,
        readiness_level=readiness_level,
        recruiter_score=recruiter_score,
    )

    temp_analysis.recommendations = generate_career_recommendations(temp_analysis)
    return temp_analysis
