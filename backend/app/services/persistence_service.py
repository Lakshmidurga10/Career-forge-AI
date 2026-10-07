from datetime import datetime, timezone
from bson import ObjectId
from app.core.database import check_database_connection
import uuid

# In-memory document store fallback
_in_memory_docs = {}


def save_document(collection, session_id: str, data: dict) -> str:
    now = datetime.now(timezone.utc).isoformat()
    document = {
        "session_id": session_id,
        "data": data,
        "created_at": now,
        "updated_at": now,
    }

    if check_database_connection():
        try:
            result = collection.insert_one(document.copy())
            return str(result.inserted_id)
        except Exception:
            pass

    doc_id = str(uuid.uuid4())
    _in_memory_docs[doc_id] = document
    return doc_id


def get_document(collection, document_id: str):
    if check_database_connection():
        try:
            document = collection.find_one({"_id": ObjectId(document_id)})
            if document:
                document["_id"] = str(document["_id"])
                return document
        except Exception:
            pass

    doc = _in_memory_docs.get(document_id)
    if doc:
        ret = doc.copy()
        ret["_id"] = document_id
        return ret

    return None
