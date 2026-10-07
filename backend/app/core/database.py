from pymongo import MongoClient
from app.core.config import (
    MONGODB_URI,
    DATABASE_NAME
)

client = MongoClient(
    MONGODB_URI,
    serverSelectionTimeoutMS=5000,
    connectTimeoutMS=5000,
    socketTimeoutMS=10000,
)

database = client[DATABASE_NAME]

candidates_collection = database["candidates"]
jobs_collection = database["jobs"]
analyses_collection = database["analyses"]
resumes_collection = database["resumes"]
interviews_collection = database["interviews"]
sessions_collection = database["sessions"]


def check_database_connection() -> bool:
    try:
        client.admin.command("ping")
        return True
    except Exception:
        return False
