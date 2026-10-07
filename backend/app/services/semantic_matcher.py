from functools import lru_cache
from typing import List, Dict

_model = None


def get_embedding_model():
    """Lazy load SentenceTransformer model only once."""
    global _model
    if _model is None:
        from sentence_transformers import SentenceTransformer
        _model = SentenceTransformer("all-MiniLM-L6-v2")
    return _model


def calculate_similarity(
    candidate_skill: str,
    job_skill: str
) -> float:
    try:
        from sklearn.metrics.pairwise import cosine_similarity
        model = get_embedding_model()
        embeddings = model.encode([candidate_skill, job_skill])
        similarity = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
        return float(similarity)
    except Exception:
        return 0.0


def find_semantic_matches(
    candidate_skills: List[str],
    job_skills: List[str],
    threshold: float = 0.60
) -> List[Dict]:
    matches = []
    if not candidate_skills or not job_skills:
        return matches

    try:
        from sklearn.metrics.pairwise import cosine_similarity
        model = get_embedding_model()
        cand_embeds = model.encode(candidate_skills)
        job_embeds = model.encode(job_skills)
        sim_matrix = cosine_similarity(cand_embeds, job_embeds)

        for i, c_skill in enumerate(candidate_skills):
            for j, j_skill in enumerate(job_skills):
                sim = float(sim_matrix[i][j])
                if sim >= threshold:
                    matches.append({
                        "candidate_skill": c_skill,
                        "job_skill": j_skill,
                        "similarity": round(sim, 3)
                    })
    except Exception:
        pass

    return matches
