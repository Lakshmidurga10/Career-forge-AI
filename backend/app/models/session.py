from pydantic import BaseModel


class CareerSession(BaseModel):
    session_id: str
    candidate_id: str | None = None
    job_id: str | None = None
    analysis_id: str | None = None
    resume_id: str | None = None
    interview_id: str | None = None
