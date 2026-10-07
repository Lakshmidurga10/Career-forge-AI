from app.services.semantic_matcher import calculate_similarity

examples = [
    (
        "RESTful API development",
        "REST API development"
    ),
    (
        "FastAPI backend development",
        "Python backend development"
    ),
    (
        "machine learning",
        "deep learning"
    ),
    (
        "React",
        "frontend development"
    )
]

print("=== Semantic Similarity Test ===")
for candidate, job in examples:
    score = calculate_similarity(candidate, job)
    print(f"{candidate} <-> {job}: {score:.3f}")
