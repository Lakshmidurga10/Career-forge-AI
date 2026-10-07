from app.models.candidate import CandidateProfile, Project
from app.models.job import JobProfile
from app.services.matching_engine import calculate_match


def test_exact_skill_matching():
    candidate = CandidateProfile(
        name="Test Candidate",
        skills=["Python", "SQL"]
    )

    job = JobProfile(
        job_title="Backend Developer",
        required_skills=[
            "Python",
            "SQL",
            "Docker"
        ]
    )

    result = calculate_match(candidate, job)

    # 2 out of 3 required skills = (2/3)*70 = 46.67
    assert round(result.match_score, 1) == 46.7
    assert result.score_breakdown.required_skill_score == 46.67

    assert "python" in result.matched_skills
    assert "sql" in result.matched_skills
    assert "docker" in result.missing_skills


def test_skill_alias_matching():
    candidate = CandidateProfile(
        name="Test Candidate",
        skills=[
            "Python3",
            "React.js",
            "Node"
        ]
    )

    job = JobProfile(
        job_title="Full Stack Developer",
        required_skills=[
            "Python",
            "React",
            "Node.js"
        ]
    )

    result = calculate_match(candidate, job)

    assert len(result.matched_skills) == 3
    assert len(result.missing_skills) == 0
    assert result.score_breakdown.required_skill_score == 70.0


def test_empty_job_skills():
    candidate = CandidateProfile(
        name="Test Candidate",
        skills=["Python"]
    )

    job = JobProfile(
        job_title="Software Engineer"
    )

    result = calculate_match(candidate, job)

    assert result.match_score == 100.0
    assert result.missing_skills == []


def test_missing_required_skills():
    candidate = CandidateProfile(
        name="Test Candidate",
        skills=["Python"]
    )

    job = JobProfile(
        job_title="AI Engineer",
        required_skills=[
            "Python",
            "PyTorch",
            "Docker"
        ]
    )

    result = calculate_match(candidate, job)

    assert "pytorch" in result.missing_skills
    assert "docker" in result.missing_skills
    assert len(result.critical_gaps) == 2
    assert result.career_level == "Entry Level"
