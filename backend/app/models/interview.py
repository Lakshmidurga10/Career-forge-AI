from pydantic import BaseModel
from typing import List, Optional, Any


class InterviewQuestion(BaseModel):
    question: str
    category: str
    difficulty: str
    skill: Optional[str] = None
    project: Optional[str] = None


class InterviewSet(BaseModel):
    technical: List[InterviewQuestion] = []
    project: List[InterviewQuestion] = []
    skill_gap: List[InterviewQuestion] = []
    behavioral: List[InterviewQuestion] = []
    hr: List[InterviewQuestion] = []


class InterviewEvaluation(BaseModel):
    technical_score: float = 0.0
    communication_score: float = 0.0
    relevance_score: float = 0.0
    confidence_score: float = 0.0

    overall_score: float = 0.0

    strengths: List[str] = []
    weaknesses: List[str] = []

    feedback: str = ""
    improved_answer: str = ""

    follow_up_question: Optional[str] = None


class InterviewAnswer(BaseModel):
    question: InterviewQuestion
    answer: str


class InterviewTurn(BaseModel):
    question: InterviewQuestion
    answer: str
    evaluation: InterviewEvaluation


class InterviewReport(BaseModel):
    overall_score: float = 0.0
    technical_score: float = 0.0
    communication_score: float = 0.0
    relevance_score: float = 0.0
    confidence_score: float = 0.0

    strengths: List[str] = []
    weaknesses: List[str] = []
    recommendations: List[str] = []

    readiness_level: str = "Interview Ready"


class AdaptiveDecision(BaseModel):
    reason: str
    difficulty_change: str = "maintain"
    focus_area: str = "application"


class InterviewSession(BaseModel):
    session_id: str
    candidate_name: str
    job_title: str

    questions: List[InterviewQuestion] = []

    current_question: Optional[InterviewQuestion] = None
    current_question_index: int = 0

    completed: bool = False

    turns: List[InterviewTurn] = []
    adaptive_decisions: List[AdaptiveDecision] = []

    final_report: Optional[InterviewReport] = None


class InterviewPracticeResponse(BaseModel):
    question: InterviewQuestion
    evaluation: InterviewEvaluation
