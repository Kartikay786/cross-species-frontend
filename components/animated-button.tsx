"use client"

import type { ReactNode } from "react"

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  loading?: boolean
  className?: string
}

export function AnimatedButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
}: AnimatedButtonProps) {
  const baseStyles =
    "font-medium rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-blue-600 active:scale-95",
    secondary: "bg-secondary text-secondary-foreground hover:bg-slate-600 active:scale-95",
  }

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  const disabledStyles = disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
        {children}
      </div>
    </button>
  )
}
