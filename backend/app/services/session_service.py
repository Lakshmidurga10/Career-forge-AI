import uuid
from datetime import datetime, timezone
from app.core.database import database, sessions_collection, check_database_connection

_in_memory_sessions = {}
_in_memory_interview_sessions = {}


def create_session() -> str:
    session_id = str(uuid.uuid4())
    document = {
        "session_id": session_id,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "candidate_id": None,
        "job_id": None,
        "analysis_id": None,
        "resume_id": None,
        "interview_id": None,
    }

    if check_database_connection():
        try:
            sessions_collection.insert_one(document.copy())
        except Exception:
            _in_memory_sessions[session_id] = document
    else:
        _in_memory_sessions[session_id] = document

    return session_id


def get_session(session_id: str):
    if check_database_connection():
        try:
            doc = sessions_collection.find_one(
                {"session_id": session_id},
                {"_id": 0}
            )
            if doc:
                return doc
        except Exception:
            pass

    return _in_memory_sessions.get(session_id)


def update_session(session_id: str, updates: dict):
    if check_database_connection():
        try:
            sessions_collection.update_one(
                {"session_id": session_id},
                {"$set": updates}
            )
            return get_session(session_id)
        except Exception:
            pass

    if session_id in _in_memory_sessions:
        _in_memory_sessions[session_id].update(updates)
        return _in_memory_sessions[session_id]

    return None


def attach_to_session(session_id: str, field: str, document_id: str):
    return update_session(session_id, {field: document_id})


# -------------------------------------------------------------
# Adaptive Interview Session Management
# -------------------------------------------------------------

def create_interview_session(
    session_id: str,
    candidate_name: str,
    job_title: str,
    questions: list,
):
    document = {
        "session_id": session_id,
        "candidate_name": candidate_name,
        "job_title": job_title,
        "questions": questions,
        "current_question_index": 0,
        "current_question": None,
        "completed": False,
        "turns": [],
        "adaptive_decisions": [],
        "final_report": None,
    }

    if check_database_connection():
        try:
            interviews_coll = database["interview_sessions"]
            interviews_coll.insert_one(document.copy())
        except Exception:
            _in_memory_interview_sessions[session_id] = document
    else:
        _in_memory_interview_sessions[session_id] = document

    return session_id


def get_interview_session(session_id: str):
    if check_database_connection():
        try:
            interviews_coll = database["interview_sessions"]
            doc = interviews_coll.find_one(
                {"session_id": session_id},
                {"_id": 0}
            )
            if doc:
                return doc
        except Exception:
            pass

    return _in_memory_interview_sessions.get(session_id)


def update_interview_session(
    session_id: str,
    updates: dict
):
    if check_database_connection():
        try:
            interviews_coll = database["interview_sessions"]
            interviews_coll.update_one(
                {"session_id": session_id},
                {"$set": updates}
            )
            return get_interview_session(session_id)
        except Exception:
            pass

    if session_id in _in_memory_interview_sessions:
        _in_memory_interview_sessions[session_id].update(updates)
        return _in_memory_interview_sessions[session_id]

    # Create if not exists in memory
    _in_memory_interview_sessions[session_id] = updates
    return _in_memory_interview_sessions[session_id]
