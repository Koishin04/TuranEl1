"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage, type Language } from "@/components/cafe-menu"

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "kk", label: "Қазақша", flag: "🇰🇿" },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = languages.find((l) => l.code === language)

  const handleLanguageChange = (code: Language) => {
    setLanguage(code)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-2 h-8 px-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground outline-none"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path
            d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
            strokeWidth="2"
          />
        </svg>
        <span className="hidden sm:inline">{currentLang?.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 min-w-[8rem] rounded-md border bg-white p-1 shadow-md z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none cursor-pointer hover:bg-accent hover:text-accent-foreground ${
                language === lang.code ? "bg-accent" : ""
              }`}
            >
              <span>{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
