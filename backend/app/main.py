from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.resume import router as resume_router
from app.api.profile import router as profile_router
from app.api.jobs import router as jobs_router
from app.api.analysis import router as analysis_router
from app.api.resume_generator import router as resume_generator_router
from app.api.interview import router as interview_router
from app.api.interview_practice import router as interview_practice_router
from app.api.pdf import router as pdf_router
from app.api.session import router as session_router
from app.api.interview_simulator import router as interview_simulator_router
from app.api.career_graph import router as career_graph_router
from app.api.explainability import router as explainability_router
from app.api.learning import router as learning_router
from app.core.config import FRONTEND_URL
from app.core.database import check_database_connection


app = FastAPI(
    title="CareerForge AI",
    description="""
    Intelligent Resume and Career Guidance Generator.

    CareerForge AI analyzes resumes against job descriptions,
    identifies skill gaps, generates tailored resumes,
    creates role-specific interview questions,
    evaluates interview answers, and produces learning roadmaps.
    """,
    version="1.0.0",
)


# -----------------------------
# CORS
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        FRONTEND_URL,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Routers
# -----------------------------

app.include_router(resume_router)
app.include_router(profile_router)
app.include_router(jobs_router)
app.include_router(analysis_router)
app.include_router(resume_generator_router)
app.include_router(interview_router)
app.include_router(interview_practice_router)
app.include_router(interview_simulator_router)
app.include_router(career_graph_router)
app.include_router(explainability_router)
app.include_router(learning_router)
app.include_router(pdf_router)
app.include_router(session_router)


# -----------------------------
# Basic endpoints
# -----------------------------

@app.get("/")
def root():
    return {
        "application": "CareerForge AI",
        "description": "Intelligent Resume and Career Guidance Generator",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health")
def health():
    database_status = check_database_connection()

    return {
        "status": "healthy",
        "service": "CareerForge AI",
        "version": "1.0.0",
        "database": "connected" if database_status else "disconnected"
    }
