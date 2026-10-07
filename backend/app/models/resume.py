from pydantic import BaseModel
from typing import List, Union, Dict, Any


class ResumeExperience(BaseModel):
    title: str
    company: str | None = None
    bullets: List[str] = []


class TailoredResume(BaseModel):
    professional_summary: str
    skills: List[str] = []
    education: List[Union[str, Dict[str, Any]]] = []
    projects: List[Union[str, Dict[str, Any]]] = []
    experience: List[Union[ResumeExperience, str, Dict[str, Any]]] = []
    certifications: List[str] = []
    ats_keywords_used: List[str] = []
    improvements: List[str] = []
