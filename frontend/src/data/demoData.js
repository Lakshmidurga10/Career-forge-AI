export const demoData = {
  candidate: {
    name: "Arjun Kumar",
    email: "arjun.kumar@example.com",
    phone: "+91 9876543210",
    summary:
      "Computer Science student with experience in Python, React, SQL and machine learning projects.",
    skills: [
      "Python",
      "SQL",
      "React",
      "JavaScript",
      "Machine Learning",
      "Git",
      "Pandas",
      "NumPy",
    ],
    education: [
      {
        degree: "B.Tech Computer Science Engineering",
        institution: "ABC Institute of Technology",
        graduation_year: "2027",
      },
    ],
    projects: [
      {
        name: "AI Resume Analyzer",
        description:
          "Built an AI-powered system to analyze resumes and compare candidate skills with job requirements.",
        technologies: ["Python", "FastAPI", "React", "Gemini"],
      },
      {
        name: "Sales Prediction System",
        description:
          "Developed a machine learning model to predict sales using historical business data.",
        technologies: ["Python", "Pandas", "Scikit-learn"],
      },
    ],
    experience: [],
    certifications: [
      "Python Programming Certification",
      "SQL Certification",
    ],
    achievements: [],
  },

  job: {
    job_title: "AI/ML Engineer",
    company: "TechNova",
    required_skills: [
      "Python",
      "Machine Learning",
      "SQL",
      "FastAPI",
      "Docker",
    ],
    preferred_skills: [
      "React",
      "Git",
      "TensorFlow",
    ],
    responsibilities: [
      "Develop machine learning applications.",
      "Build APIs for AI services.",
      "Work with structured and unstructured data.",
      "Deploy AI applications.",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field.",
    ],
    experience_required: "0-2 years",
    keywords: [
      "AI",
      "Machine Learning",
      "Python",
      "FastAPI",
      "SQL",
      "Docker",
    ],
  },

  analysis: {
    match_score: 72.5,

    score_breakdown: {
      required_skill_score: 56.0,
      preferred_skill_score: 13.3,
      semantic_score: 3.2,
      project_score: 5.0,
      final_score: 72.5,
    },

    ats_analysis: {
      ats_score: 68.0,
      matched_keywords: ["Python", "Machine Learning", "SQL", "AI"],
      missing_keywords: ["FastAPI", "Docker"],
    },

    matched_skills: [
      "Python",
      "Machine Learning",
      "SQL",
      "React",
      "Git",
    ],

    missing_skills: [
      "FastAPI",
      "Docker",
      "TensorFlow",
    ],

    critical_gaps: [
      {
        skill: "FastAPI",
        priority: "Critical",
        reason: "This skill is explicitly required by the target job.",
        action: "Prioritize learning FastAPI and build one end-to-end practical project before applying.",
      },
      {
        skill: "Docker",
        priority: "Critical",
        reason: "This skill is explicitly required by the target job.",
        action: "Learn containerization and deploy one project.",
      },
      {
        skill: "TensorFlow",
        priority: "Important",
        reason: "This skill is preferred by the target job.",
        action: "Add TensorFlow to your roadmap after completing critical core gaps.",
      },
    ],

    strengths: [
      "Matches 3 required skills.",
      "Matches 2 preferred skills.",
      "Has 2 documented project(s).",
      "Has documented educational qualifications.",
    ],

    recommendations: [
      "Close the highest-priority skill gaps and strengthen relevant projects.",
      "Prioritize learning: FastAPI, Docker, TensorFlow.",
      "Highlight your most relevant projects prominently in the resume.",
    ],

    project_relevance: [
      "AI Resume Analyzer: consider highlighting technologies relevant to the target role.",
      "Sales Prediction System: consider highlighting technologies relevant to the target role.",
    ],

    career_level: "Entry Level / Fresher",
    readiness_level: "Interview Ready",
    recruiter_score: 74.2,
  },

  resume: {
    professional_summary:
      "Computer Science Engineering student with practical experience in Python, SQL, machine learning and AI application development. Experienced in building data-driven projects and modern web applications.",

    skills: [
      "Python",
      "Machine Learning",
      "SQL",
      "React",
      "JavaScript",
      "Git",
      "Pandas",
      "NumPy",
    ],

    education: [
      "B.Tech Computer Science Engineering — ABC Institute of Technology — 2027",
    ],

    projects: [
      "AI Resume Analyzer — Built an AI-powered resume analysis and job matching application using Python, FastAPI, React and Gemini.",
      "Sales Prediction System — Developed a machine learning model for sales prediction using Python, Pandas and Scikit-learn.",
    ],

    experience: [],

    certifications: [
      "Python Programming Certification",
      "SQL Certification",
    ],

    ats_keywords_used: [
      "Python",
      "Machine Learning",
      "SQL",
      "AI",
      "FastAPI",
    ],

    improvements: [
      "Added job-relevant keywords without inventing experience.",
      "Prioritized the most relevant technical skills.",
      "Improved project descriptions for ATS readability.",
    ],
  },

  interview: {
    technical: [
      {
        question: "What is the difference between supervised and unsupervised learning?",
        category: "Technical",
        difficulty: "Easy",
        skill: "Machine Learning",
      },
      {
        question: "How would you build a REST API using FastAPI?",
        category: "Technical",
        difficulty: "Medium",
        skill: "FastAPI",
      },
      {
        question: "How would you handle missing values in a machine learning dataset?",
        category: "Technical",
        difficulty: "Medium",
        skill: "Python",
      },
    ],

    project: [
      {
        question:
          "Explain the architecture of your AI Resume Analyzer project.",
        category: "Project",
        difficulty: "Medium",
        project: "AI Resume Analyzer",
      },
      {
        question:
          "Why did you choose Python and FastAPI for your AI application?",
        category: "Project",
        difficulty: "Medium",
        project: "AI Resume Analyzer",
      },
    ],

    skill_gap: [
      {
        question: "What are the main benefits of containerizing an application with Docker?",
        category: "Skill Gap",
        difficulty: "Medium",
        skill: "Docker",
      },
      {
        question: "How does FastAPI differ from Flask?",
        category: "Skill Gap",
        difficulty: "Medium",
        skill: "FastAPI",
      },
    ],

    behavioral: [
      {
        question: "Tell me about a difficult technical problem you solved.",
        category: "Behavioral",
        difficulty: "Medium",
      },
      {
        question: "How do you learn a technology that you have never used before?",
        category: "Behavioral",
        difficulty: "Easy",
      },
    ],

    hr: [
      {
        question: "Why do you want to become an AI/ML Engineer?",
        category: "HR",
        difficulty: "Easy",
      },
      {
        question: "Where do you see yourself in the next three years?",
        category: "HR",
        difficulty: "Easy",
      },
    ],
  },

  career_graph: {
    nodes: [
      { id: "candidate", label: "Arjun Kumar", node_type: "candidate", status: "active" },
      { id: "job", label: "AI/ML Engineer", node_type: "job", status: "target" },
      { id: "skill_0", label: "Python", node_type: "skill", status: "matched" },
      { id: "skill_1", label: "Machine Learning", node_type: "skill", status: "matched" },
      { id: "skill_2", label: "SQL", node_type: "skill", status: "matched" },
      { id: "gap_0", label: "FastAPI", node_type: "skill_gap", status: "missing" },
      { id: "gap_1", label: "Docker", node_type: "skill_gap", status: "missing" },
      { id: "gap_2", label: "TensorFlow", node_type: "skill_gap", status: "missing" },
      { id: "proj_0", label: "AI Resume Analyzer", node_type: "project", status: "evidence" },
    ],
    edges: [
      { source: "candidate", target: "job", relationship: "targets" },
      { source: "candidate", target: "skill_0", relationship: "has_skill" },
      { source: "candidate", target: "proj_0", relationship: "built" },
      { source: "job", target: "gap_0", relationship: "requires" },
    ],
    readiness_score: 72.5,
    readiness_level: "Interview Ready",
    strengths: [
      "Strong Python foundation",
      "Relevant machine learning project experience",
    ],
    critical_gaps: ["FastAPI", "Docker", "TensorFlow"],
    actions: [
      {
        title: "Learn FastAPI",
        description: "Build an asynchronous REST backend microservice with Pydantic validation.",
        priority: "High",
        estimated_effort: "1–2 weeks",
        reason: "FastAPI is required for deploying production ML models for this role.",
      },
      {
        title: "Learn Docker",
        description: "Containerize the AI Resume Analyzer with a multi-stage Dockerfile.",
        priority: "High",
        estimated_effort: "1 week",
        reason: "Containerization is required for scalable cloud deployment.",
      },
      {
        title: "Highlight AI Resume Analyzer",
        description: "Move the LLM-powered project to the top section of the resume.",
        priority: "Medium",
        estimated_effort: "1 day",
        reason: "Demonstrates direct hands-on relevance to the target job.",
      },
    ],
    next_best_action: "Start targeted interview preparation while building a containerized FastAPI endpoint.",
  },

  explainability: {
    overall_explanation:
      "Candidate Arjun Kumar has a match score of 72.5% because they satisfy 3 of 5 required skills (Python, Machine Learning, SQL), 2 preferred skills (React, Git), and have 2 documented projects showing relevant engineering capability. Critical gaps remain in FastAPI and Docker.",
    score_explanations: [
      {
        factor: "Required Skills (56.0 pts)",
        contribution: 56.0,
        status: "Strong",
        explanation:
          "Candidate matches 3 out of 5 required skills (Python, Machine Learning, SQL). Missing: FastAPI, Docker.",
      },
      {
        factor: "Preferred Skills (13.3 pts)",
        contribution: 13.3,
        status: "Strong",
        explanation:
          "Candidate matches 2 preferred skills (React, Git) that enhance profile competitiveness.",
      },
      {
        factor: "Semantic Match (3.2 pts)",
        contribution: 3.2,
        status: "Moderate",
        explanation:
          "High contextual semantic overlap between candidate background and AI/ML Engineer responsibilities.",
      },
      {
        factor: "Project Alignment (5.0 pts)",
        contribution: 5.0,
        status: "Relevant",
        explanation:
          "Candidate has 2 projects (AI Resume Analyzer, Sales Prediction System) directly demonstrating target role skills.",
      },
    ],
    skill_explanations: [
      {
        skill: "Python",
        status: "Matched",
        evidence: "Listed in skills section and demonstrated across 2 projects (AI Resume Analyzer, Sales Prediction).",
        confidence: 0.95,
        explanation: "Strong foundational match supported by explicit skills list, project code references, and certifications.",
      },
      {
        skill: "Machine Learning",
        status: "Matched",
        evidence: "Explicitly listed in skills and demonstrated in the Sales Prediction System project.",
        confidence: 0.9,
        explanation: "Verified through scikit-learn usage and model development in historical projects.",
      },
      {
        skill: "SQL",
        status: "Matched",
        evidence: "Listed in profile skills and confirmed by SQL Certification.",
        confidence: 0.88,
        explanation: "Competency confirmed by external certification and candidate skills list.",
      },
      {
        skill: "FastAPI",
        status: "Gap",
        evidence: "Target job lists FastAPI under core requirements; candidate has project mention but no core competency claim.",
        confidence: 0.85,
        explanation: "Candidate lacks deep documented FastAPI backend production experience.",
      },
      {
        skill: "Docker",
        status: "Gap",
        evidence: "Required by job description, absent from candidate profile and projects.",
        confidence: 0.95,
        explanation: "Containerization is missing from candidate profile and represents a high-priority learning requirement.",
      },
    ],
    recommendation_explanations: [
      {
        recommendation: "Learn FastAPI and build an asynchronous REST service",
        reason: "FastAPI is required for deploying production ML models for this target role.",
        evidence: ["Job description lists FastAPI as a required skill."],
      },
      {
        recommendation: "Containerize existing AI projects with Docker",
        reason: "Containerization bridges the primary deployment gap required by TechNova.",
        evidence: ["Docker is a required deployment skill in the job specification."],
      },
    ],
    trust_notes: [
      "All scores are derived from verifiable extracted evidence from the uploaded resume.",
      "No skills or past experience were hallucinated or fabricated by the AI engine.",
      "Confidence scores are grounded directly in exact term matches, ontology synonyms, and project evidence.",
    ],
  },

  learning_plan: {
    learning_plan: [
      {
        skill: "FastAPI",
        priority: "Critical",
        topics: [
          "FastAPI routing, path & query parameters",
          "Pydantic schemas and request validation",
          "Dependency injection system",
          "Async request handlers and lifespan events",
        ],
        practice_tasks: [
          "Build a CRUD REST API with Pydantic request validation.",
          "Implement dependency injection for an authentication mock.",
          "Write async endpoint tests using pytest and TestClient.",
        ],
        interview_topics: [
          "Explain the difference between FastAPI and Flask/Django.",
          "How does Pydantic improve data validation speed and developer ergonomics?",
          "How do async/await endpoints handle concurrency under load?",
        ],
        evidence_to_build: "Deploy an asynchronous FastAPI service exposing a machine learning inference endpoint with OpenAPI documentation.",
      },
      {
        skill: "Docker",
        priority: "Critical",
        topics: [
          "Container vs Virtual Machine architecture",
          "Writing optimized multi-stage Dockerfiles",
          "Port mapping, environment variables, and volume mounts",
          "Docker Compose for multi-container orchestration",
        ],
        practice_tasks: [
          "Containerize a Python FastAPI application with a slim base image.",
          "Use Docker Compose to run a web service and a Postgres database.",
          "Optimize build cache layers to reduce Docker image size.",
        ],
        interview_topics: [
          "What is the difference between an image and a container?",
          "How do multi-stage Docker builds reduce image attack surface and size?",
          "How do you inspect container logs and resource constraints in production?",
        ],
        evidence_to_build: "Containerize the AI Resume Analyzer project and provide a public repository with Dockerfile and compose file.",
      },
      {
        skill: "TensorFlow",
        priority: "Important",
        topics: [
          "Tensors, computation graphs, and Keras Sequential API",
          "Data preprocessing pipelines using tf.data",
          "Model saving and export formats (SavedModel, ONNX)",
        ],
        practice_tasks: [
          "Train a basic deep learning classification model using tf.keras.",
          "Export model weights and load them into a FastAPI scoring pipeline.",
        ],
        interview_topics: [
          "Compare TensorFlow / Keras with PyTorch for production serving.",
          "What are the benefits of using the tf.data API over in-memory arrays?",
        ],
        evidence_to_build: "Build a mini deep learning image or text classifier with model artifact versioning.",
      },
    ],
  },
}

