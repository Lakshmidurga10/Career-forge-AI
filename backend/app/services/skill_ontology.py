SKILL_ONTOLOGY = {
    "python": {
        "category": "Programming",
        "aliases": ["python3", "python 3", "py"],
        "related": ["pandas", "numpy", "scikit-learn"],
    },
    "javascript": {
        "category": "Programming",
        "aliases": ["js", "javascript es6"],
        "related": ["react", "node.js", "typescript"],
    },
    "typescript": {
        "category": "Programming",
        "aliases": ["ts"],
        "related": ["javascript", "react", "node.js", "angular"],
    },
    "react": {
        "category": "Frontend",
        "aliases": ["reactjs", "react.js"],
        "related": ["javascript", "html", "css", "redux", "next.js"],
    },
    "fastapi": {
        "category": "Backend",
        "aliases": ["fast api"],
        "related": ["python", "rest", "pydantic", "uvicorn"],
    },
    "node.js": {
        "category": "Backend",
        "aliases": ["node", "nodejs"],
        "related": ["javascript", "express", "npm"],
    },
    "sql": {
        "category": "Database",
        "aliases": ["structured query language", "my sql", "mysql", "postgresql", "postgres"],
        "related": ["database", "rdbms", "sqlite"],
    },
    "mongodb": {
        "category": "Database",
        "aliases": ["mongo", "nosql"],
        "related": ["database", "pymongo", "mongoose"],
    },
    "docker": {
        "category": "DevOps",
        "aliases": ["docker container", "containerization"],
        "related": ["kubernetes", "deployment", "ci/cd"],
    },
    "machine learning": {
        "category": "AI/ML",
        "aliases": ["ml", "machine learning algorithms"],
        "related": [
            "scikit-learn",
            "tensorflow",
            "pytorch",
            "pandas",
            "numpy",
        ],
    },
    "deep learning": {
        "category": "AI/ML",
        "aliases": ["dl"],
        "related": [
            "tensorflow",
            "pytorch",
            "neural networks",
            "keras",
        ],
    },
    "generative ai": {
        "category": "AI/ML",
        "aliases": ["genai", "gen ai"],
        "related": [
            "llm",
            "rag",
            "langchain",
            "langgraph",
            "gemini",
        ],
    },
    "git": {
        "category": "Tools",
        "aliases": ["github", "gitlab", "version control"],
        "related": ["devops", "ci/cd"],
    },
}


def get_skill_info(skill: str) -> dict:
    normalized = skill.lower().strip()

    for canonical, info in SKILL_ONTOLOGY.items():
        if normalized == canonical:
            return {
                "skill": canonical,
                **info,
            }

        if normalized in info.get("aliases", []):
            return {
                "skill": canonical,
                **info,
            }

    return {
        "skill": normalized,
        "category": "Other",
        "aliases": [],
        "related": [],
    }
