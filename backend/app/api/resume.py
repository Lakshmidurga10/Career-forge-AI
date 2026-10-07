import os
import tempfile
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.resume_parser import extract_resume_text
from app.services.file_validator import validate_upload

router = APIRouter(
    prefix="/api/resume",
    tags=["Resume"]
)


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
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

        text = extract_resume_text(temp_file_path)

        if not text:
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from the resume."
            )

        return {
            "filename": filename,
            "status": "success",
            "text": text,
            "character_count": len(text)
        }

    except HTTPException:
        raise
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Resume processing failed: {str(error)}"
        )
    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
