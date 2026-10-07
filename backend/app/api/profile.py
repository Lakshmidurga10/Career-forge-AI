import os
import tempfile
from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.resume_parser import extract_resume_text
from app.services.llm_service import extract_candidate_profile
from app.services.file_validator import validate_upload
from app.models.candidate import CandidateProfile
from app.core.database import candidates_collection
from app.services.persistence_service import save_document
from app.services.session_service import attach_to_session

router = APIRouter(
    prefix="/api/profile",
    tags=["Candidate Profile"]
)


@router.post("/extract")
async def extract_profile(
    file: UploadFile = File(...),
    session_id: str | None = None
):
    filename = file.filename or ""
    extension = os.path.splitext(filename)[1].lower()

    temp_file_path = None
    try:
        file_content = await validate_upload(file)

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=extension
        ) as temp_file:
            temp_file.write(file_content)
            temp_file_path = temp_file.name

        resume_text = extract_resume_text(temp_file_path)

        if not resume_text:
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from resume."
            )

        profile_data = extract_candidate_profile(resume_text)
        profile = CandidateProfile.model_validate(profile_data)

        candidate_id = None
        if session_id:
            candidate_id = save_document(
                candidates_collection,
                session_id,
                profile.model_dump()
            )
            attach_to_session(session_id, "candidate_id", candidate_id)

        return {
            "status": "success",
            "candidate_id": candidate_id,
            "profile": profile.model_dump()
        }

    except HTTPException:
        raise
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Profile extraction failed: {str(error)}"
        )
    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
