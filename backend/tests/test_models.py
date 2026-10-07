import pytest
from app.models.candidate import (
    CandidateProfile,
    Education,
    Project
)
from app.models.job import JobProfile


def test_candidate_profile():
    candidate = CandidateProfile(
        name="Kasi",
        email="test@example.com",
        skills=["Python", "SQL"],
        education=[
            Education(
                degree="B.Tech CSE",
                institution="KARE",
                graduation_year="2027"
            )
        ],
        projects=[
            Project(
                name="CareerForge AI",
                description="AI career guidance system",
                technologies=[
                    "Python",
                    "FastAPI",
                    "React"
                ]
            )
        ]
    )

    assert candidate.name == "Kasi"
    assert "Python" in candidate.skills
    assert len(candidate.education) == 1
    assert len(candidate.projects) == 1


def test_job_profile():
    job = JobProfile(
        job_title="AI Engineer",
        company="Example Company",
        required_skills=[
            "Python",
            "Machine Learning"
        ],
        preferred_skills=[
            "Docker"
        ]
    )

    assert job.job_title == "AI Engineer"
    assert "Python" in job.required_skills
    assert "Docker" in job.preferred_skills


def test_candidate_name_required():
    with pytest.raises(Exception):
        CandidateProfile(
            skills=["Python"]
        )
