from pydantic import BaseModel
from typing import List


class CareerNode(BaseModel):
    id: str
    label: str
    node_type: str
    status: str = "neutral"


class CareerEdge(BaseModel):
    source: str
    target: str
    relationship: str


class CareerAction(BaseModel):
    title: str
    description: str
    priority: str
    estimated_effort: str
    reason: str


class CareerIntelligenceGraph(BaseModel):
    nodes: List[CareerNode]
    edges: List[CareerEdge]

    readiness_score: float
    readiness_level: str

    strengths: List[str]
    critical_gaps: List[str]

    actions: List[CareerAction]

    next_best_action: str
