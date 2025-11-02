"use client"

import type { ReactNode } from "react"

interface AnalysisCardProps {
  title: string
  description: string
  icon: ReactNode
  onClick?: () => void
  className?: string
}

export function AnalysisCard({ title, description, icon, onClick, className = "" }: AnalysisCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative bg-card border border-border rounded-lg p-6 transition-smooth hover:border-primary hover:shadow-lg hover:-translate-y-1 cursor-pointer animate-fade-in ${className}`}
    >
      <div className="flex flex-col items-start gap-3">
        <div className="text-primary text-3xl group-hover:scale-110 transition-smooth">{icon}</div>
        <div className="text-left">
          <h3 className="font-bold text-lg text-[#2563eb]">{title}</h3>
          <p className="text-sm text-muted mt-1">{description}</p>
        </div>
      </div>
    </button>
  )
}
