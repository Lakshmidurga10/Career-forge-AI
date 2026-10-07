from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.models.candidate import CandidateProfile
from app.models.job import JobProfile
from app.models.analysis import CareerAnalysis
from app.models.resume import TailoredResume
from app.services.resume_generator import generate_tailored_resume
from app.core.database import resumes_collection
from app.services.persistence_service import save_document
from app.services.session_service import attach_to_session

router = APIRouter(
    prefix="/api/resume",
    tags=["Resume Generator"]
)


class ResumeGenerationRequest(BaseModel):
    candidate: CandidateProfile
    job: JobProfile
    analysis: CareerAnalysis
    session_id: str | None = None


@router.post("/generate")
async def generate_resume(request: ResumeGenerationRequest):
    try:
        resume_data = generate_tailored_resume(
            request.candidate,
            request.job,
            request.analysis
        )
        resume = TailoredResume.model_validate(resume_data)

        resume_id = None
        if request.session_id:
            resume_id = save_document(
                resumes_collection,
                request.session_id,
                resume.model_dump()
            )
            attach_to_session(request.session_id, "resume_id", resume_id)

        return {
            "status": "success",
            "resume_id": resume_id,
            "resume": resume.model_dump()
        }
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Resume generation failed: {str(error)}"
        )
