from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.models.candidate import CandidateProfile
from app.models.job import JobProfile
from app.models.analysis import CareerAnalysis
from app.models.interview import InterviewSet
from app.services.interview_generator import generate_interview_questions
from app.core.database import interviews_collection
from app.services.persistence_service import save_document
from app.services.session_service import attach_to_session

router = APIRouter(
    prefix="/api/interview",
    tags=["Interview Generator"]
)


class InterviewRequest(BaseModel):
    candidate: CandidateProfile
    job: JobProfile
    analysis: CareerAnalysis
    session_id: str | None = None


@router.post("/generate")
async def generate_interview(request: InterviewRequest):
    try:
        interview_data = generate_interview_questions(
            request.candidate,
            request.job,
            request.analysis
        )
        interview = InterviewSet.model_validate(interview_data)

        interview_id = None
        if request.session_id:
            interview_id = save_document(
                interviews_collection,
                request.session_id,
                interview.model_dump()
            )
            attach_to_session(request.session_id, "interview_id", interview_id)

        return {
            "status": "success",
            "interview_id": interview_id,
            "interview": interview.model_dump()
        }
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Interview generation failed: {str(error)}"
        )
