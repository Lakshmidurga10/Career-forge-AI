from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from app.models.interview import (
    InterviewQuestion,
    InterviewEvaluation,
    InterviewTurn,
    InterviewReport,
    AdaptiveDecision,
)

from app.services.advanced_interview_evaluator import (
    evaluate_interview_answer
)

from app.services.adaptive_interview import (
    generate_adaptive_follow_up
)

from app.services.adaptive_question_engine import (
    select_next_question
)

from app.services.interview_report import (
    calculate_interview_report
)

from app.services.session_service import (
    create_interview_session,
    get_interview_session,
    update_interview_session,
)


router = APIRouter(
    prefix="/api/interview/simulator",
    tags=["Interview Simulator"]
)


class StartInterviewRequest(BaseModel):
    candidate: Dict[str, Any]
    job: Dict[str, Any]
    analysis: Dict[str, Any]
    questions: List[InterviewQuestion]
    session_id: Optional[str] = None


class AnswerRequest(BaseModel):
    candidate: Dict[str, Any]
    job: Dict[str, Any]
    analysis: Dict[str, Any]

    question: InterviewQuestion
    answer: str

    previous_turns: List[InterviewTurn] = []
    session_id: Optional[str] = None


class AdaptiveQuestionRequest(BaseModel):
    session_id: str
    candidate: Dict[str, Any]
    job: Dict[str, Any]
    analysis: Dict[str, Any]
    available_questions: List[InterviewQuestion]


class ReportRequest(BaseModel):
    turns: List[InterviewTurn] = []


@router.post("/start")
async def start_interview(
    request: StartInterviewRequest
):
    if not request.questions:
        raise HTTPException(
            status_code=400,
            detail="No interview questions available."
        )

    sess_id = request.session_id or "default_interview_session"
    create_interview_session(
        session_id=sess_id,
        candidate_name=request.candidate.get("name", "Candidate"),
        job_title=request.job.get("job_title", "Role"),
        questions=[q.model_dump() for q in request.questions],
    )

    return {
        "status": "success",
        "session_id": sess_id,
        "total_questions": len(request.questions),
        "current_question": request.questions[0],
        "question_index": 0,
    }


@router.post("/next-question")
async def get_next_adaptive_question(
    request: AdaptiveQuestionRequest
):
    session = get_interview_session(request.session_id)
    if not session:
        # Create lightweight session if missing
        create_interview_session(
            session_id=request.session_id,
            candidate_name=request.candidate.get("name", "Candidate"),
            job_title=request.job.get("job_title", "Role"),
            questions=[q.model_dump() for q in request.available_questions],
        )
        session = get_interview_session(request.session_id)

    previous_turns = session.get("turns", [])
    previous_questions = []
    for turn in previous_turns:
        if isinstance(turn, dict) and "question" in turn:
            q = turn["question"]
            previous_questions.append(q.get("question", "") if isinstance(q, dict) else getattr(q, "question", ""))

    available_questions = [
        q for q in request.available_questions
        if q.question not in previous_questions
    ]

    if not available_questions:
        return {
            "status": "complete",
            "message": "No more interview questions in pool."
        }

    try:
        decision = select_next_question(
            request.candidate,
            request.job,
            request.analysis,
            previous_questions,
            previous_turns,
            available_questions,
        )

        selected_question = InterviewQuestion(
            question=decision.get("question", available_questions[0].question),
            category=decision.get("category", available_questions[0].category),
            difficulty=decision.get("difficulty", available_questions[0].difficulty),
            skill=decision.get("skill", available_questions[0].skill),
            project=decision.get("project", available_questions[0].project),
        )

        update_interview_session(
            request.session_id,
            {
                "current_question": selected_question.model_dump()
            }
        )

        return {
            "status": "success",
            "question": selected_question,
            "reason": decision.get(
                "reason",
                "Selected to evaluate candidate alignment and adapt to prior answers."
            ),
        }
    except Exception:
        # Fallback to next available question deterministically
        fallback_q = available_questions[0]
        return {
            "status": "success",
            "question": fallback_q,
            "reason": f"Evaluating {fallback_q.category} competency.",
        }


@router.post("/evaluate")
async def evaluate_answer(
    request: AnswerRequest
):
    if not request.answer.strip():
        raise HTTPException(
            status_code=400,
            detail="Answer cannot be empty."
        )

    try:
        evaluation_data = evaluate_interview_answer(
            request.candidate,
            request.job,
            request.analysis,
            request.question,
            request.answer,
        )

        evaluation = InterviewEvaluation(
            **evaluation_data
        )

        # Update session turns if session_id is provided
        if request.session_id:
            session = get_interview_session(request.session_id)
            if session:
                turns = session.get("turns", [])
                turns.append({
                    "question": request.question.model_dump(),
                    "answer": request.answer,
                    "evaluation": evaluation.model_dump(),
                })
                update_interview_session(request.session_id, {"turns": turns})

        return {
            "status": "success",
            "evaluation": evaluation,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Interview evaluation failed: {str(error)}"
        )


@router.post("/follow-up")
async def follow_up(
    request: AnswerRequest
):
    try:
        evaluation_data = evaluate_interview_answer(
            request.candidate,
            request.job,
            request.analysis,
            request.question,
            request.answer,
        )

        evaluation = InterviewEvaluation(
            **evaluation_data
        )

        follow_up_data = generate_adaptive_follow_up(
            request.candidate,
            request.job,
            request.analysis,
            request.question,
            request.answer,
            evaluation,
        )

        follow_up_question = InterviewQuestion(
            **follow_up_data
        )

        return {
            "status": "success",
            "evaluation": evaluation,
            "follow_up_question": follow_up_question,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Follow-up generation failed: {str(error)}"
        )


@router.post("/report")
async def generate_report(
    request: ReportRequest
):
    try:
        report_data = calculate_interview_report(
            request.turns
        )

        report = InterviewReport(
            **report_data
        )

        return {
            "status": "success",
            "report": report,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Interview report failed: {str(error)}"
        )
