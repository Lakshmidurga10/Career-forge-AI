from pydantic import BaseModel
from typing import List, Optional


class SkillGap(BaseModel):
    skill: str
    priority: str
    reason: str
    action: str = ""


class ScoreBreakdown(BaseModel):
    required_skill_score: float
    preferred_skill_score: float
    semantic_score: float
    project_score: float
    final_score: float


class ATSAnalysis(BaseModel):
    ats_score: float
    matched_keywords: List[str] = []
    missing_keywords: List[str] = []


class CareerAnalysis(BaseModel):
    match_score: float
    score_breakdown: ScoreBreakdown

    ats_analysis: Optional[ATSAnalysis] = None

    matched_skills: List[str] = []
    missing_skills: List[str] = []

    critical_gaps: List[SkillGap] = []

    strengths: List[str] = []
    recommendations: List[str] = []

    project_relevance: List[str] = []

    career_level: str = "Entry Level"
    readiness_level: str = "Interview Ready"
    recruiter_score: float = 0.0
