from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.jd_analyzer import analyze_job_description
from app.models.job import JobProfile
from app.core.database import jobs_collection
from app.services.persistence_service import save_document
from app.services.session_service import attach_to_session

router = APIRouter(
    prefix="/api/jobs",
    tags=["Job Description"]
)


class JobDescriptionRequest(BaseModel):
    job_description: str


@router.post("/analyze")
async def analyze_job(
    request: JobDescriptionRequest,
    session_id: str | None = None
):
    job_description = request.job_description.strip()

    if not job_description:
        raise HTTPException(
            status_code=400,
            detail="Job description cannot be empty."
        )

    if len(job_description) > 30000:
        raise HTTPException(
            status_code=400,
            detail="Job description is too large."
        )

    try:
        job_data = analyze_job_description(job_description)
        job_profile = JobProfile.model_validate(job_data)

        job_id = None
        if session_id:
            job_id = save_document(
                jobs_collection,
                session_id,
                job_profile.model_dump()
            )
            attach_to_session(session_id, "job_id", job_id)

        return {
            "status": "success",
            "job_id": job_id,
            "job_profile": job_profile.model_dump()
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Job analysis failed: {str(error)}"
        )
