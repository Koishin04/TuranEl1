"use client"

interface SubcategoryPillProps {
  name: string
  isSelected: boolean
  onClick: () => void
}

export function SubcategoryPill({ name, isSelected, onClick }: SubcategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
        isSelected ? "bg-gray-900 text-white" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
      }`}
    >
      {name}
    </button>
  )
}
