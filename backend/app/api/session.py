from fastapi import APIRouter, HTTPException
from app.services.session_service import (
    create_session,
    get_session
)
from app.core.database import (
    candidates_collection,
    jobs_collection,
    analyses_collection,
    resumes_collection,
    interviews_collection
)
from app.services.persistence_service import (
    get_document
)

router = APIRouter(
    prefix="/api/session",
    tags=["Session"]
)


@router.post("/create")
async def create_new_session():
    try:
        session_id = create_session()
        return {
            "status": "success",
            "session_id": session_id
        }
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Session creation failed: {str(error)}"
        )


@router.get("/{session_id}")
async def get_existing_session(session_id: str):
    try:
        session = get_session(session_id)
        if not session:
            raise HTTPException(
                status_code=404,
                detail="Session not found."
            )

        return {
            "status": "success",
            "session": session
        }
    except HTTPException:
        raise
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Session retrieval failed: {str(error)}"
        )


@router.get("/{session_id}/full")
async def get_full_session(session_id: str):
    session = get_session(session_id)

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Session not found."
        )

    candidate = None
    job = None
    analysis = None
    resume = None
    interview = None

    if session.get("candidate_id"):
        candidate = get_document(
            candidates_collection,
            session["candidate_id"]
        )

    if session.get("job_id"):
        job = get_document(
            jobs_collection,
            session["job_id"]
        )

    if session.get("analysis_id"):
        analysis = get_document(
            analyses_collection,
            session["analysis_id"]
        )

    if session.get("resume_id"):
        resume = get_document(
            resumes_collection,
            session["resume_id"]
        )

    if session.get("interview_id"):
        interview = get_document(
            interviews_collection,
            session["interview_id"]
        )

    return {
        "status": "success",
        "session": session,
        "candidate": candidate,
        "job": job,
        "analysis": analysis,
        "resume": resume,
        "interview": interview
    }
