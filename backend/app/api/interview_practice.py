from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.models.interview import (
    InterviewQuestion,
    InterviewEvaluation
)
from app.services.interview_evaluator import (
    evaluate_interview_answer
)

router = APIRouter(
    prefix="/api/interview",
    tags=["Interview Practice"]
)


class InterviewEvaluationRequest(BaseModel):
    question: InterviewQuestion
    answer: str


@router.post("/evaluate")
async def evaluate_answer(
    request: InterviewEvaluationRequest
):
    if not request.answer.strip():
        raise HTTPException(
            status_code=400,
            detail="Answer cannot be empty."
        )

    try:
        evaluation_data = evaluate_interview_answer(
            request.question,
            request.answer
        )

        evaluation = InterviewEvaluation.model_validate(
            evaluation_data
        )

        return {
            "status": "success",
            "evaluation": evaluation.model_dump()
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Answer evaluation failed: {str(error)}"
        )
