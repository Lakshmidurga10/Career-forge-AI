from pydantic import BaseModel, Field
from typing import List


class Education(BaseModel):
    degree: str
    institution: str
    graduation_year: str | None = None


class Project(BaseModel):
    name: str
    description: str
    technologies: List[str] = []


class CandidateProfile(BaseModel):
    name: str
    email: str | None = None
    phone: str | None = None
    summary: str | None = None
    skills: List[str] = []
    education: List[Education] = []
    projects: List[Project] = []
    experience: List[str] = []
    certifications: List[str] = []
    achievements: List[str] = []
