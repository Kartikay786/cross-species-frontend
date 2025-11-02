"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { ArrowLeft, Upload, Sparkles } from "lucide-react"
import { AnimatedButton } from "@/components/animated-button"
import { ResultsDisplay } from "@/components/results-display"

interface AnalysisResult {
  species?: string
  emotion?: string
  confidence?: number
  behavior?: string
}

export default function ImageAnalysisPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
        setResult(null)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      setError("Please select an image first.")
      return
    }

    const file = fileInputRef.current.files[0]
    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("https://genetalk-audio-backend2-1.onrender.com/predict", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("API Response:", data)

      // ✅ Adjust to match your API response
      setResult({
        species: data.filename?.split(".")[0] || "Unknown", // e.g. "images"
        emotion: data.predicted_emotion || "Not detected",
        confidence: data.confidence ? Math.round(data.confidence * 100) : undefined, // convert 0.5167 → 52%
        behavior: `The detected emotion is ${data.predicted_emotion}, with ${Math.round(
          data.confidence * 100
        )}% confidence.`,
      })
    } catch (err: any) {
      console.error(err)
      setError("Failed to analyze the image. Please try again.")
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
            <h1 className="text-4xl font-bold text-[#2563eb]">Image Analysis</h1>
            <p className="text-gray-600 text-sm mt-1">
              Upload an image to identify emotions and confidence levels.
            </p>
          </div>
        </div>

        {/* Upload Area */}
        <div className="space-y-6 animate-fade-in">
          {!imagePreview ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-[#2563eb]/30 rounded-xl p-12 hover:border-[#2563eb] hover:bg-[#2563eb]/5 transition-all cursor-pointer group"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-[#2563eb]/10 rounded-lg group-hover:bg-[#2563eb]/20 transition-smooth">
                  <Upload className="text-[#2563eb]" size={36} />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-[#2563eb]">Click to upload an image</p>
                  <p className="text-sm text-gray-600 mt-1">or drag and drop (JPG, PNG)</p>
                </div>
              </div>
            </button>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-white border border-gray-200 shadow-md">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div className="flex gap-3">
                <AnimatedButton
                  variant="secondary"
                  onClick={() => {
                    setImagePreview(null)
                    setResult(null)
                    setError(null)
                  }}
                  className="flex-1"
                >
                  Change Image
                </AnimatedButton>
                <AnimatedButton
                  onClick={handleAnalyze}
                  loading={loading}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? "Analyzing..." : "Analyze Image"}
                </AnimatedButton>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Results Section */}
        {result || loading || error ? (
          <div className="bg-white/80 border border-gray-200 rounded-xl p-6 backdrop-blur-sm space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#2563eb]" size={22} />
              <h2 className="text-2xl font-semibold text-[#2563eb]">Analysis Results</h2>
            </div>
            <ResultsDisplay result={result} loading={loading} error={error} />
          </div>
        ) : null}
      </div>
    </main>
  )
}
