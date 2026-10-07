import { useState, useEffect } from "react"
import AppShell from "./components/AppShell"
import Hero from "./components/Hero"
import DemoBanner from "./components/DemoBanner"
import WorkflowSteps from "./components/WorkflowSteps"
import AnalysisWorkspace from "./components/AnalysisWorkspace"
import AnalysisLoader from "./components/AnalysisLoader"
import ErrorMessage from "./components/ErrorMessage"

import DashboardLayout from "./components/DashboardLayout"
import DashboardHeader from "./components/DashboardHeader"
import OverviewDashboard from "./components/OverviewDashboard"
import SkillMatrix from "./components/SkillMatrix"
import SkillGapMatrix from "./components/SkillGapMatrix"
import ATSPanel from "./components/ATSPanel"
import ScoreExplanation from "./components/ScoreExplanation"
import LearningRoadmap from "./components/LearningRoadmap"
import GroundedRoadmap from "./components/GroundedRoadmap"
import ExplainableScore from "./components/ExplainableScore"
import SkillEvidence from "./components/SkillEvidence"
import TrustPanel from "./components/TrustPanel"
import ResumeResult from "./components/ResumeResult"
import InterviewSimulator from "./components/InterviewSimulator"
import InterviewReport from "./components/InterviewReport"
import InterviewResult from "./components/InterviewResult"
import InterviewPractice from "./components/InterviewPractice"
import CareerActionPlan from "./components/CareerActionPlan"

import {
  createSession,
  extractProfile,
  analyzeJob,
  analyzeMatch,
  generateResume,
  generateInterview,
  evaluateAdaptiveAnswer,
  generateInterviewReport,
  generateCareerGraph,
  generateExplainabilityReport,
  generateLearningPlan,
} from "./services/api"

import { demoData } from "./data/demoData"
import { Database } from "lucide-react"

function App() {
  const [started, setStarted] = useState(false)
  const [file, setFile] = useState(null)
  const [jobDescription, setJobDescription] = useState("")

  const [sessionId, setSessionId] = useState(
    localStorage.getItem("careerforge_session")
  )

  const [candidate, setCandidate] = useState(null)
  const [job, setJob] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [careerGraph, setCareerGraph] = useState(null)
  const [explainability, setExplainability] = useState(null)
  const [learningPlan, setLearningPlan] = useState(null)
  const [resume, setResume] = useState(null)
  const [interview, setInterview] = useState(null)
  const [practiceQuestions, setPracticeQuestions] = useState([])
  const [interviewReport, setInterviewReport] = useState(null)

  const [activeSection, setActiveSection] = useState("overview")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [demoMode, setDemoMode] = useState(false)

  // Initialize session
  useEffect(() => {
    const initializeSession = async () => {
      if (sessionId) return
      try {
        const result = await createSession()
        localStorage.setItem("careerforge_session", result.session_id)
        setSessionId(result.session_id)
      } catch (err) {
        console.error("Session initialization failed:", err)
      }
    }
    initializeSession()
  }, [sessionId])

  // Instant Demo Mode
  const handleDemoMode = () => {
    setDemoMode(true)
    setStarted(true)

    setCandidate(demoData.candidate)
    setJob(demoData.job)
    setAnalysis(demoData.analysis)
    setCareerGraph(demoData.career_graph)
    setExplainability(demoData.explainability)
    setLearningPlan(demoData.learning_plan)
    setResume(demoData.resume)
    setInterview(demoData.interview)

    const allQuestions = [
      ...(demoData.interview.technical || []),
      ...(demoData.interview.project || []),
      ...(demoData.interview.skill_gap || []),
      ...(demoData.interview.behavioral || []),
      ...(demoData.interview.hr || []),
    ]
    setPracticeQuestions(allQuestions.slice(0, 5))
    setInterviewReport(null)
    setError(null)
  }

  // Live End-to-End Analysis Pipeline
  const handleAnalyze = async () => {
    if (!file || !jobDescription.trim()) {
      setError("Please upload a resume and enter a target job description.")
      return
    }

    if (!sessionId) {
      setError("Session is still initializing. Please try again.")
      return
    }

    try {
      setLoading(true)
      setError(null)

      // STEP 1 — Resume Profile Extraction
      const profileResult = await extractProfile(file, sessionId)
      const candidateData = profileResult.candidate || profileResult.profile
      setCandidate(candidateData)

      // STEP 2 — Job Analysis
      const jobResult = await analyzeJob(jobDescription, sessionId)
      const jobData = jobResult.job || jobResult.job_profile
      setJob(jobData)

      // STEP 3 — Hybrid Career Match
      const analysisResult = await analyzeMatch(candidateData, jobData, sessionId)
      const analysisData = analysisResult.analysis || analysisResult
      setAnalysis(analysisData)

      // STEP 4 — Intelligence Enhancements (Career Graph, Explainability, RAG Learning Plan)
      try {
        const [graphRes, explainRes, planRes] = await Promise.allSettled([
          generateCareerGraph(candidateData, jobData, analysisData),
          generateExplainabilityReport(candidateData, jobData, analysisData),
          generateLearningPlan(candidateData, jobData, analysisData),
        ])

        if (graphRes.status === "fulfilled") {
          setCareerGraph(graphRes.value.graph || graphRes.value)
        }
        if (explainRes.status === "fulfilled") {
          setExplainability(explainRes.value.report || explainRes.value)
        }
        if (planRes.status === "fulfilled") {
          setLearningPlan(planRes.value.learning_plan ? planRes.value : { learning_plan: planRes.value })
        }
      } catch (extraErr) {
        console.error("Secondary intelligence error:", extraErr)
      }

      // STEP 5 — Tailored ATS Resume
      const resumeResult = await generateResume(candidateData, jobData, analysisData, sessionId)
      setResume(resumeResult.resume || resumeResult)

      // STEP 6 — Role-Specific Interview Questions
      const interviewResult = await generateInterview(candidateData, jobData, analysisData, sessionId)
      const interviewData = interviewResult.interview || interviewResult
      setInterview(interviewData)

      const allQuestions = [
        ...(interviewData.technical || []),
        ...(interviewData.project || []),
        ...(interviewData.skill_gap || []),
        ...(interviewData.behavioral || []),
        ...(interviewData.hr || []),
      ]
      setPracticeQuestions(allQuestions.slice(0, 5))
      setInterviewReport(null)
    } catch (err) {
      console.error(err)
      setError(
        err.response?.data?.detail ||
          "Something went wrong while analyzing your career profile. Please verify backend is running."
      )
    } finally {
      setLoading(false)
    }
  }

  // Interview Evaluation Handlers
  const handleInterviewEvaluate = async (question, answer, previousTurns) => {
    if (demoMode) {
      return {
        evaluation: {
          technical_score: 85,
          communication_score: 90,
          relevance_score: 88,
          confidence_score: 82,
          overall_score: 86.2,
          strengths: ["Clear logical framework", "Good technical depth"],
          weaknesses: ["Could include practical edge-case handling"],
          feedback: "Strong structured answer demonstrating good grasp of foundational concepts.",
          improved_answer: "In a production environment, I would isolate this with containerization, ensure automated CI testing, and manage state transitions cleanly.",
        },
      }
    }

    return await evaluateAdaptiveAnswer(
      candidate,
      job,
      analysis,
      question,
      answer,
      previousTurns
    )
  }

  const handleInterviewFinish = async (turns) => {
    if (demoMode) {
      setInterviewReport({
        overall_score: 84.5,
        technical_score: 82.0,
        communication_score: 88.0,
        relevance_score: 86.0,
        confidence_score: 82.0,
        strengths: [
          "Demonstrates solid conceptual foundation in Python and ML.",
          "Articulates architecture trade-offs clearly.",
        ],
        weaknesses: [
          "Elaborate on production containerization (Docker) and deployment pipelines.",
        ],
        recommendations: [
          "Review FastAPI dependency injection and async routing before interviews.",
          "Practice timed responses using the STAR method for behavioral questions.",
        ],
        readiness_level: "Interview Ready",
      })
      return
    }

    try {
      const result = await generateInterviewReport(turns)
      setInterviewReport(result.report || result)
    } catch (err) {
      console.error("Report error:", err)
    }
  }

  // Reset workflow
  const handleReset = () => {
    setStarted(false)
    setFile(null)
    setJobDescription("")
    setCandidate(null)
    setJob(null)
    setAnalysis(null)
    setCareerGraph(null)
    setExplainability(null)
    setLearningPlan(null)
    setResume(null)
    setInterview(null)
    setPracticeQuestions([])
    setInterviewReport(null)
    setDemoMode(false)
    setError(null)
    setActiveSection("overview")
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {demoMode && <DemoBanner />}

      {/* Top Session Bar (When in input stage) */}
      {!analysis && started && (
        <div className="border-b bg-white py-3">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">
                {demoMode ? "Demo Sandbox" : "Live Workspace"}
              </span>
              {sessionId && (
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 px-2.5 py-0.5 text-[10px] font-mono">
                  <Database size={11} /> {sessionId.slice(0, 8)}
                </span>
              )}
            </div>

            <button
              onClick={handleReset}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {/* Landing Page */}
      {!started && (
        <AppShell>
          <Hero
            onStart={() => setStarted(true)}
            onDemo={handleDemoMode}
          />
        </AppShell>
      )}

      {/* Analysis Workspace (Before result generated) */}
      {started && !analysis && (
        <div className="py-8">
          <WorkflowSteps currentStep={file ? 2 : 1} />

          {error && (
            <div className="mb-6 px-6">
              <ErrorMessage message={error} onRetry={handleAnalyze} />
            </div>
          )}

          {loading ? (
            <AnalysisLoader />
          ) : (
            <AnalysisWorkspace
              file={file}
              setFile={setFile}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              onAnalyze={handleAnalyze}
              loading={loading}
            />
          )}
        </div>
      )}

      {/* Full Career Intelligence Dashboard Layout */}
      {analysis && candidate && job && (
        <DashboardLayout
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        >
          <DashboardHeader
            candidate={candidate}
            onNewAnalysis={handleReset}
          />

          <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
            {activeSection === "overview" && (
              <div className="space-y-6">
                <OverviewDashboard
                  candidate={candidate}
                  job={job}
                  analysis={analysis}
                />

                <ATSPanel analysis={analysis} />

                <SkillMatrix analysis={analysis} />

                <SkillGapMatrix analysis={analysis} />
              </div>
            )}

            {activeSection === "match" && (
              <div className="space-y-6">
                <OverviewDashboard
                  candidate={candidate}
                  job={job}
                  analysis={analysis}
                />

                <ScoreExplanation analysis={analysis} />
              </div>
            )}

            {activeSection === "skills" && (
              <div className="space-y-6">
                <SkillMatrix analysis={analysis} />

                <SkillGapMatrix analysis={analysis} />

                <LearningRoadmap analysis={analysis} />
              </div>
            )}

            {activeSection === "resume" && (
              <ResumeResult resume={resume} />
            )}

            {activeSection === "interview" && (
              <div className="space-y-6">
                {!interviewReport ? (
                  <InterviewSimulator
                    sessionId={sessionId}
                    candidate={candidate}
                    job={job}
                    analysis={analysis}
                    interview={interview}
                    onEvaluate={handleInterviewEvaluate}
                    onFinish={handleInterviewFinish}
                  />
                ) : (
                  <InterviewReport
                    report={interviewReport}
                    onRestart={() => setInterviewReport(null)}
                  />
                )}
              </div>
            )}

            {activeSection === "career" && (
              <CareerActionPlan graph={careerGraph} />
            )}

            {activeSection === "explainability" && (
              <div className="space-y-6">
                <ExplainableScore report={explainability} />
                <SkillEvidence report={explainability} />
                <TrustPanel report={explainability} />
              </div>
            )}

            {activeSection === "roadmap" && (
              <div className="space-y-6">
                {learningPlan ? (
                  <GroundedRoadmap plan={learningPlan} />
                ) : (
                  <LearningRoadmap analysis={analysis} />
                )}
              </div>
            )}
          </div>
        </DashboardLayout>
      )}
    </div>
  )
}

export default App

