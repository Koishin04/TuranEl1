"use client"

interface CategoryCardProps {
  name: string
  image: string
  isSelected: boolean
  onClick: () => void
}

export function CategoryCard({ name, image, isSelected, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 w-28 rounded-xl overflow-hidden transition-all ${
        isSelected ? "ring-2 ring-gray-900 ring-offset-2" : ""
      }`}
    >
      <div className="relative h-24 w-full">
        <img src={image || "/placeholder.svg?height=96&width=112"} alt={name} className="w-full h-full object-cover" />
        {isSelected && <div className="absolute inset-0 bg-black/40" />}
      </div>
      <div className="p-2 bg-white">
        <p className="text-sm font-medium truncate">{name}</p>
      </div>
    </button>
  )
}
