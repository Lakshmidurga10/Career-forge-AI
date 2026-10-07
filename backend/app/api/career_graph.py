from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.models.candidate import CandidateProfile
from app.models.job import JobProfile
from app.models.analysis import CareerAnalysis

from app.services.career_graph_engine import (
    build_career_graph
)


router = APIRouter(
    prefix="/api/career",
    tags=["Career Intelligence"]
)


class CareerGraphRequest(BaseModel):
    candidate: CandidateProfile
    job: JobProfile
    analysis: CareerAnalysis


@router.post("/graph")
async def generate_career_graph(
    request: CareerGraphRequest
):
    try:
        graph = build_career_graph(
            request.candidate,
            request.job,
            request.analysis,
        )

        return {
            "status": "success",
            "graph": graph,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Career graph generation failed: {str(error)}"
        )
