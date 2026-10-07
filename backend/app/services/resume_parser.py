import pymupdf  # PyMuPDF
from docx import Document
from pathlib import Path


def extract_from_pdf(file_path: str) -> str:
    """Extract text from a PDF file."""
    text = []
    document = pymupdf.open(file_path)

    for page in document:
        page_text = page.get_text()
        text.append(page_text)

    document.close()
    return "\n".join(text).strip()


def extract_from_docx(file_path: str) -> str:
    """Extract text from a DOCX file."""
    document = Document(file_path)
    paragraphs = []

    for paragraph in document.paragraphs:
        if paragraph.text.strip():
            paragraphs.append(paragraph.text.strip())

    return "\n".join(paragraphs)


def extract_resume_text(file_path: str) -> str:
    """Detect file type and extract resume text."""
    extension = Path(file_path).suffix.lower()

    if extension == ".pdf":
        return extract_from_pdf(file_path)

    if extension == ".docx":
        return extract_from_docx(file_path)

    raise ValueError(
        "Unsupported file type. Please upload PDF or DOCX."
    )
