from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.models.candidate import CandidateProfile
from app.models.job import JobProfile
from app.services.matching_engine import calculate_match
from app.core.database import analyses_collection
from app.services.persistence_service import save_document
from app.services.session_service import attach_to_session

router = APIRouter(
    prefix="/api/analysis",
    tags=["Career Analysis"]
)


class AnalysisRequest(BaseModel):
    candidate: CandidateProfile
    job: JobProfile
    session_id: str | None = None


@router.post("/match")
async def match_resume_to_job(request: AnalysisRequest):
    try:
        result = calculate_match(
            request.candidate,
            request.job
        )

        analysis_id = None
        if request.session_id:
            analysis_id = save_document(
                analyses_collection,
                request.session_id,
                result.model_dump()
            )
            attach_to_session(request.session_id, "analysis_id", analysis_id)

        return {
            "status": "success",
            "analysis_id": analysis_id,
            "analysis": result.model_dump()
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(error)}"
        )
