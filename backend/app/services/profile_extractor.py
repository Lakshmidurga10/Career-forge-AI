import re
from app.models.candidate import CandidateProfile


def extract_skills(text: str) -> list[str]:
    """
    Extract commonly mentioned technical skills with case-insensitive boundary matching.
    """
    known_skills = [
        "Python",
        "Java",
        "C",
        "C++",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "React",
        "Node.js",
        "FastAPI",
        "Django",
        "Flask",
        "SQL",
        "MySQL",
        "MongoDB",
        "PostgreSQL",
        "Git",
        "GitHub",
        "Docker",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Generative AI",
        "LangChain",
        "LangGraph",
    ]

    found = []
    text_lower = text.lower()

    for skill in known_skills:
        # Avoid false positives for single-character skills like "C"
        pattern = r"\b" + re.escape(skill.lower()) + r"\b"
        if re.search(pattern, text_lower):
            found.append(skill)

    return found


def extract_email(text: str) -> str | None:
    pattern = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
    match = re.search(pattern, text)
    return match.group(0) if match else None


def extract_phone(text: str) -> str | None:
    pattern = r"(?:\+91[\s-]?)?[6-9]\d{9}"
    match = re.search(pattern, text)
    return match.group(0) if match else None


def extract_name(text: str) -> str:
    """
    Basic fallback name extraction.
    Usually the first non-empty line of a resume is the candidate's name.
    """
    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]
    if not lines:
        return "Unknown"
    return lines[0]


def build_candidate_profile(text: str) -> CandidateProfile:
    return CandidateProfile(
        name=extract_name(text),
        email=extract_email(text),
        phone=extract_phone(text),
        skills=extract_skills(text),
    )
