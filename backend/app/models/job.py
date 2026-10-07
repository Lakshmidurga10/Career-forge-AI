from pydantic import BaseModel
from typing import List


class JobProfile(BaseModel):
    job_title: str
    company: str | None = None
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    responsibilities: List[str] = []
    qualifications: List[str] = []
    experience_required: str | None = None
    keywords: List[str] = []
