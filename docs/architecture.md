# CareerForge AI Architecture

```text
                         ┌──────────────────────┐
                         │      User            │
                         │ Resume + Job JD      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │   Vite + Tailwind    │
                         └──────────┬───────────┘
                                    │ REST API
                                    ▼
                         ┌──────────────────────┐
                         │    FastAPI Backend   │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌────────────┐       ┌──────────────┐      ┌──────────────┐
       │ Resume     │       │ Job Analysis │      │ Session      │
       │ Parser     │       │ Engine       │      │ Manager      │
       └─────┬──────┘       └──────┬───────┘      └──────┬───────┘
             │                     │                     │
             └─────────────────────┼─────────────────────┘
                                   ▼
                        ┌──────────────────────┐
                        │ Career Intelligence  │
                        │ Engine               │
                        └──────────┬───────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                ▼                  ▼                  ▼
        ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
        │ Hybrid Skill │   │ Semantic     │   │ Project      │
        │ Matching     │   │ Matching     │   │ Relevance    │
        └──────────────┘   └──────────────┘   └──────────────┘
                                   │
                                   ▼
                           ┌──────────────┐
                           │ Gemini AI    │
                           └──────┬───────┘
                                  │
              ┌───────────────────┼───────────────────┐
              ▼                   ▼                   ▼
       Tailored Resume      Interview AI       Learning Roadmap
              │                   │                   │
              └───────────────────┼───────────────────┘
                                  ▼
                           ┌──────────────┐
                           │  MongoDB     │
                           │ Persistence  │
                           └──────────────┘
```

## System Workflow

1. **Document Ingestion & Validation**: Multi-format support (PDF, DOCX) protected against oversized (>5MB) or malicious files.
2. **Deterministic & Semantic Parsing**: High-fidelity text extraction passed through strict anti-hallucination prompts.
3. **Multi-Factor Career Intelligence**:
   - 70% Required Skills Overlap
   - 20% Preferred Skills Overlap
   - 10% Semantic Contextual Similarity
   - 10% Project Domain Alignment (score capped at 100%)
4. **Actionable Career Outputs**:
   - ATS-tailored resume generation & PDF export (ReportLab)
   - Role-specific dynamic interview question generation
   - Interactive mock interview scoring & response evaluation
   - Gap-targeted step-by-step learning roadmap
5. **Persistence Layer**: Seamless MongoDB document storage with automatic graceful in-memory fallback.
