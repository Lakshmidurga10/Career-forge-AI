from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.models.candidate import CandidateProfile
from app.models.job import JobProfile
from app.models.analysis import CareerAnalysis
from app.models.roadmap import LearningPlan

from app.services.rag_career_advisor import (
    generate_grounded_learning_plan
)


router = APIRouter(
    prefix="/api/learning",
    tags=["Learning Intelligence"]
)


class LearningRequest(BaseModel):
    candidate: CandidateProfile
    job: JobProfile
    analysis: CareerAnalysis


@router.post("/plan")
async def generate_learning_plan(
    request: LearningRequest
):
    try:
        result = generate_grounded_learning_plan(
            request.candidate,
            request.job,
            request.analysis,
        )

        plan = LearningPlan(**result)

        return {
            "status": "success",
            "plan": plan,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Learning plan failed: {str(error)}"
        )
