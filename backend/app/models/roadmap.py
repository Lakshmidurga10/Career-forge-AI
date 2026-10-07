from pydantic import BaseModel
from typing import List


class LearningPlanItem(BaseModel):
    skill: str
    priority: str
    topics: List[str] = []
    practice_tasks: List[str] = []
    interview_topics: List[str] = []
    evidence_to_build: str = ""


class LearningPlan(BaseModel):
    learning_plan: List[LearningPlanItem] = []
