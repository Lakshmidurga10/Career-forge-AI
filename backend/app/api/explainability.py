from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.models.candidate import CandidateProfile
from app.models.job import JobProfile
from app.models.analysis import CareerAnalysis
from app.models.explainability import ExplainabilityReport

from app.services.explainability_engine import (
    build_explainability_report
)


router = APIRouter(
    prefix="/api/explainability",
    tags=["Explainability"]
)


class ExplainabilityRequest(BaseModel):
    candidate: CandidateProfile
    job: JobProfile
    analysis: CareerAnalysis


@router.post("/report")
async def generate_explanation(
    request: ExplainabilityRequest
):
    try:
        report = build_explainability_report(
            request.candidate,
            request.job,
            request.analysis,
        )

        return {
            "status": "success",
            "report": report,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Explainability report generation failed: {str(error)}"
        )
