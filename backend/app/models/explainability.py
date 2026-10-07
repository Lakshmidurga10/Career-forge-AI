from pydantic import BaseModel
from typing import List


class ExplanationItem(BaseModel):
    factor: str
    contribution: float
    status: str
    explanation: str


class SkillExplanation(BaseModel):
    skill: str
    status: str
    evidence: str
    confidence: float
    explanation: str


class RecommendationExplanation(BaseModel):
    recommendation: str
    reason: str
    evidence: List[str]


class ExplainabilityReport(BaseModel):
    overall_explanation: str
    score_explanations: List[ExplanationItem]
    skill_explanations: List[SkillExplanation]
    recommendation_explanations: List[RecommendationExplanation]
    trust_notes: List[str]
