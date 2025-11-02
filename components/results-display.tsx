"use client"

import { CheckCircle } from "lucide-react"

interface AnalysisResult {
  species?: string
  emotion?: string
  confidence?: number
  behavior?: string
}

interface ResultsDisplayProps {
  result: AnalysisResult | null
  loading?: boolean
  error?: string | null
}

export function ResultsDisplay({ result, loading = false, error = null }: ResultsDisplayProps) {
  if (loading) {
    return (
      <div className="space-y-4 animate-fade-in">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-4 h-20 animate-pulse-custom" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-200 animate-fade-in">{error}</div>
    )
  }

  if (!result) {
    return null
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {result.species && (
        <div className="bg-card border border-primary/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-foreground">Species Identified</h3>
              <p className="text-muted text-sm mt-1">{result.species}</p>
            </div>
          </div>
        </div>
      )}

      {result.emotion && (
        <div className="bg-card border border-accent/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-foreground">Emotion Detected</h3>
              <p className="text-muted text-sm mt-1">{result.emotion}</p>
              {result.confidence && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted">Confidence</span>
                    <span className="text-xs font-semibold text-accent">{result.confidence}%</span>
                  </div>
                  <div className="w-full bg-primary/20 rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all duration-500"
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {result.behavior && (
        <div className="bg-card border border-primary/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-foreground">Behavior Analysis</h3>
              <p className="text-muted text-sm mt-1">{result.behavior}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
