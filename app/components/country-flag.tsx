"use client"

import { useState, useEffect } from "react"

interface CountryFlagProps {
  flag: string
  fallback: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export default function CountryFlag({ flag, fallback, size = "md", className = "" }: CountryFlagProps) {
  const [showFallback, setShowFallback] = useState(false)

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  }

  const fallbackSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  }

  useEffect(() => {
    // For consistent design, let's always show the fallback badges
    // This ensures all countries have the same yellow styling
    setShowFallback(true)
  }, [flag])

  if (showFallback) {
    return (
      <span
        className={`inline-flex items-center justify-center text-[#e2b714] font-bold ${fallbackSizeClasses[size]} ${className}`}
      >
        {fallback}
      </span>
    )
  }

  return (
    <span
      className={`${sizeClasses[size]} ${className}`}
      style={{ fontFamily: "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif" }}
    >
      {flag}
    </span>
  )
}
