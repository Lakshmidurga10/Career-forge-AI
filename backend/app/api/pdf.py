import os
import tempfile
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from starlette.background import BackgroundTasks

from app.models.resume import TailoredResume
from app.services.pdf_generator import generate_resume_pdf

router = APIRouter(
    prefix="/api/resume",
    tags=["Resume PDF"]
)


def cleanup_temp_file(path: str):
    if os.path.exists(path):
        os.remove(path)


@router.post("/download")
async def download_resume(
    resume: TailoredResume,
    background_tasks: BackgroundTasks
):
    temp_file = None
    try:
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as file:
            temp_file = file.name

        generate_resume_pdf(
            resume.model_dump(),
            temp_file
        )

        background_tasks.add_task(cleanup_temp_file, temp_file)

        return FileResponse(
            temp_file,
            media_type="application/pdf",
            filename="tailored_resume.pdf"
        )

    except Exception as error:
        if temp_file and os.path.exists(temp_file):
            os.remove(temp_file)

        raise HTTPException(
            status_code=500,
            detail=f"PDF generation failed: {str(error)}"
        )
