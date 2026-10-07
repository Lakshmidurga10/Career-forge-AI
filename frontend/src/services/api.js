import axios from "axios"

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000",
})

export const createSession = async () => {
  const response = await API.post("/api/session/create")
  return response.data
}

export const getSession = async (sessionId) => {
  const response = await API.get(`/api/session/${sessionId}`)
  return response.data
}

export const getFullSession = async (sessionId) => {
  const response = await API.get(`/api/session/${sessionId}/full`)
  return response.data
}

export const uploadResume = async (file) => {
  const formData = new FormData()
  formData.append("file", file)

  const response = await API.post(
    "/api/resume/upload",
    formData
  )

  return response.data
}

export const extractProfile = async (file, sessionId) => {
  const formData = new FormData()
  formData.append("file", file)

  const response = await API.post(
    "/api/profile/extract",
    formData,
    {
      params: {
        session_id: sessionId
      }
    }
  )

  return response.data
}

export const analyzeJob = async (jobDescription, sessionId) => {
  const response = await API.post(
    "/api/jobs/analyze",
    {
      job_description: jobDescription,
    },
    {
      params: {
        session_id: sessionId
      }
    }
  )

  return response.data
}

export const analyzeMatch = async (candidate, job, sessionId) => {
  const response = await API.post(
    "/api/analysis/match",
    {
      candidate,
      job,
      session_id: sessionId
    }
  )

  return response.data
}

export const generateResume = async (
  candidate,
  job,
  analysis,
  sessionId
) => {
  const response = await API.post(
    "/api/resume/generate",
    {
      candidate,
      job,
      analysis,
      session_id: sessionId
    }
  )

  return response.data
}

export const generateInterview = async (
  candidate,
  job,
  analysis,
  sessionId
) => {
  const response = await API.post(
    "/api/interview/generate",
    {
      candidate,
      job,
      analysis,
      session_id: sessionId
    }
  )

  return response.data
}

export const evaluateInterviewAnswer = async (
  question,
  answer
) => {
  const response = await API.post(
    "/api/interview/evaluate",
    {
      question,
      answer,
    }
  )

  return response.data
}

export const downloadResume = async (resume) => {
  const response = await API.post(
    "/api/resume/download",
    resume,
    {
      responseType: "blob",
    }
  )

  return response.data
}

export const startInterview = async (
  candidate,
  job,
  analysis,
  questions
) => {
  const response = await API.post(
    "/api/interview/simulator/start",
    {
      candidate,
      job,
      analysis,
      questions,
    }
  )

  return response.data
}

export const evaluateAdaptiveAnswer = async (
  candidate,
  job,
  analysis,
  question,
  answer,
  previousTurns = []
) => {
  const response = await API.post(
    "/api/interview/simulator/evaluate",
    {
      candidate,
      job,
      analysis,
      question,
      answer,
      previous_turns: previousTurns,
    }
  )

  return response.data
}

export const generateFollowUp = async (
  candidate,
  job,
  analysis,
  question,
  answer,
  previousTurns = []
) => {
  const response = await API.post(
    "/api/interview/simulator/follow-up",
    {
      candidate,
      job,
      analysis,
      question,
      answer,
      previous_turns: previousTurns,
    }
  )

  return response.data
}

export const generateInterviewReport = async (
  turns
) => {
  const response = await API.post(
    "/api/interview/simulator/report",
    {
      turns
    }
  )

  return response.data
}

export const getNextInterviewQuestion = async (
  sessionId,
  candidate,
  job,
  analysis,
  availableQuestions
) => {
  const response = await API.post(
    "/api/interview/simulator/next-question",
    {
      session_id: sessionId || "demo_session",
      candidate,
      job,
      analysis,
      available_questions: availableQuestions,
    }
  )

  return response.data
}

export const generateCareerGraph = async (
  candidate,
  job,
  analysis
) => {
  const response = await API.post(
    "/api/career/graph",
    {
      candidate,
      job,
      analysis,
    }
  )

  return response.data
}

export const generateExplainabilityReport = async (
  candidate,
  job,
  analysis
) => {
  const response = await API.post(
    "/api/explainability/report",
    {
      candidate,
      job,
      analysis,
    }
  )

  return response.data
}

export const generateLearningPlan = async (
  candidate,
  job,
  analysis
) => {
  const response = await API.post(
    "/api/learning/plan",
    {
      candidate,
      job,
      analysis,
    }
  )

  return response.data
}
