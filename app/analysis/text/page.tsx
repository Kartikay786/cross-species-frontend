"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { ArrowLeft, Send, Sparkles } from "lucide-react"
import { AnimatedButton } from "@/components/animated-button"
import { ResultsDisplay } from "@/components/results-display"

interface AnalysisResult {
  message?: string
}

export default function TextAnalysisPage() {
  const router = useRouter()
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter a description before analyzing.")
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const { data } = await axios.post("https://chatbot-back-1.onrender.com/chat", {
        message: text,
      })

      console.log("API Response:", data.reply)

      // ✅ Store response in `message` (not `reply`)
      setResult({
        message: data.reply || "No response received from the server.",
      })
    } catch (err: any) {
      console.error("Error:", err)
      if (err.response) {
        setError(
          `Server responded with error: ${err.response.status} ${err.response.statusText}`
        )
      } else if (err.request) {
        setError("No response from the server. Please try again later.")
      } else {
        setError("Failed to analyze text. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  const charCount = text.length
  const maxChars = 1000

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 px-4 py-10 md:py-14">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-center gap-4 animate-slide-in">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white/70 border border-gray-200 rounded-lg transition-smooth"
          >
            <ArrowLeft size={24} className="text-[#2563eb]" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-[#2563eb]">Text Analysis</h1>
            <p className="text-gray-600 text-sm mt-1">
              Describe the animal’s behavior to receive contextual insights.
            </p>
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white/80 border border-gray-200 rounded-xl p-5 shadow-sm focus-within:border-[#2563eb] transition-all">
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value.slice(0, maxChars))
                setResult(null)
                setError(null)
              }}
              placeholder="Describe the animal's behavior (e.g., 'A horse is pacing nervously with its ears pinned back')..."
              className="w-full h-40 bg-transparent text-gray-800 placeholder-gray-400 resize-none focus:outline-none text-sm leading-relaxed"
            />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                {charCount}/{maxChars} characters
              </p>
              <AnimatedButton
                onClick={handleAnalyze}
                loading={loading}
                disabled={!text.trim() || loading}
                size="sm"
              >
                <Send size={16} />
                Analyze
              </AnimatedButton>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Example Prompts */}
        {!result && !loading && (
          <div className="bg-[#2563eb]/5 border border-[#2563eb]/20 rounded-xl p-5 space-y-3">
            <p className="text-sm font-semibold text-[#2563eb]">Try these examples:</p>
            <div className="space-y-2">
              {[
                "A cat with arched back, hissing with bared fangs.",
                "A dog wagging its tail and jumping playfully.",
                "A horse pacing nervously, ears pinned back.",
              ].map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setText(example)}
                  className="text-left text-xs text-gray-600 hover:text-[#2563eb] transition-all p-2 rounded-md hover:bg-[#2563eb]/10 cursor-pointer"
                >
                  → {example}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Section */}
        {result || loading || error ? (
          <div className="bg-white/80 border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#2563eb]" size={20} />
              <h2 className="text-2xl font-semibold text-[#2563eb]">Analysis Results</h2>
            </div>

            {/* ✅ This will now correctly display the message */}
            <ResultsDisplay
              result={result}
              loading={loading}
              error={error}
            />

            {/* 👇 Optional fallback direct display in case ResultsDisplay is not showing */}
            {result && (
              <div className="mt-3 text-gray-700 whitespace-pre-wrap text-sm border-t border-gray-100 pt-3">
                {result.message}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </main>
  )
}
