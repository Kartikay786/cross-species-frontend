"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import { ArrowLeft, Upload, Sparkles } from "lucide-react"
import { AnimatedButton } from "@/components/animated-button"
import { ResultsDisplay } from "@/components/results-display"

interface AnalysisResult {
  species?: string
  emotion?: string
  confidence?: number
  behavior?: string
}

export default function AudioAnalysisPage() {
  const router = useRouter()
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // ✅ Handle file selection with format validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = [
        "audio/mpeg", // .mp3
        "audio/wav",  // .wav
        "audio/x-wav",
        "audio/aiff", // .aif
        "audio/x-aiff"
      ]

      const fileExtension = file.name.split(".").pop()?.toLowerCase()

      if (
        !allowedTypes.includes(file.type) &&
        !["mp3", "wav", "aif", "aiff"].includes(fileExtension || "")
      ) {
        alert("❌ Only .mp3, .wav, or .aif audio files are allowed.")
        e.target.value = "" // Clear input
        setAudioFile(null)
        return
      }

      setAudioFile(file)
      setResult(null)
      setError(null)
    }
  }

  // ✅ Handle analysis API call
  const handleAnalyze = async () => {
    if (!audioFile) {
      setError("Please upload an audio file before analyzing.")
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("file", audioFile)

      const response = await axios.post(
        "https://genetalk-audio-backend.onrender.com/audio_predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      const data = response.data

      // 🧠 Map backend response
      setResult({
        species: data.species || "Unknown",
        emotion: data.emotion || "Unknown",
        confidence: Math.round(
          ((data.species_confidence + data.emotion_confidence) / 2) * 100
        ),
        behavior: `Species confidence: ${(data.species_confidence * 100).toFixed(
          1
        )}%. Emotion confidence: ${(data.emotion_confidence * 100).toFixed(1)}%.`,
      })
    } catch (err: any) {
      console.error("Error uploading file:", err)
      setError(
        err.response?.data?.detail ||
          "Failed to analyze. Please try again later."
      )
    } finally {
      setLoading(false)
    }
  }

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
            <h1 className="text-4xl font-bold text-[#2563eb]">Audio Analysis</h1>
            <p className="text-gray-600 text-sm mt-1">
              Upload an animal sound clip to identify species and emotional tone.
            </p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white/80 border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
            <input
              type="file"
              accept=".mp3,.wav,.aif,.aiff,audio/*"
              onChange={handleFileChange}
              className="hidden"
              id="audio-upload"
            />
            <label
              htmlFor="audio-upload"
              className="cursor-pointer flex flex-col items-center gap-3 text-[#2563eb] hover:text-[#1d4ed8]"
            >
              <Upload size={36} />
              <span className="text-sm font-medium">
                {audioFile ? audioFile.name : "Click to upload an audio file"}
              </span>
            </label>
            {audioFile && (
              <audio
                controls
                src={URL.createObjectURL(audioFile)}
                className="mt-4 w-full"
              />
            )}
            <div className="mt-4">
              <AnimatedButton
                onClick={handleAnalyze}
                loading={loading}
                disabled={!audioFile || loading}
              >
                Analyze
              </AnimatedButton>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>

        {/* Results Section */}
        {(result || loading || error) && (
          <div className="bg-white/80 border border-gray-200 rounded-xl p-6 shadow-sm space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#2563eb]" size={20} />
              <h2 className="text-2xl font-semibold text-[#2563eb]">Analysis Results</h2>
            </div>
            <ResultsDisplay result={result} loading={loading} error={error} />
          </div>
        )}
      </div>
    </main>
  )
}
