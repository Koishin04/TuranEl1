"use client"

interface Size {
  size: string
  price: number
}

interface MenuItemProps {
  name: string
  description: string
  image: string
  sizes: Size[]
}

export function MenuItem({ name, description, image, sizes }: MenuItemProps) {
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="relative h-28 w-28 flex-shrink-0 rounded-lg overflow-hidden">
        <img src={image || "/placeholder.svg?height=112&width=112"} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
        <div className="mt-3 space-y-1">
          {sizes.map((size, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="font-medium">{formatPrice(size.price)} ₸</span>
              {size.size && (
                <>
                  <span className="text-gray-300 flex-1 mx-2 border-b border-dotted border-gray-300" />
                  <span className="text-gray-500">{size.size}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
