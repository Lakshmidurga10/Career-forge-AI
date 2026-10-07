from pydantic import BaseModel
from typing import List


class DecisionStep(BaseModel):
    step: int
    component: str
    decision: str
    reason: str


class DecisionTrace(BaseModel):
    steps: List[DecisionStep]
