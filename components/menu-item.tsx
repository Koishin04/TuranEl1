"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

interface Size {
  size: string
  price: number
}

interface MenuItemProps {
  id: string | number
  name: string
  description: string
  image: string
  sizes: Size[]
}

export function MenuItem({ id, name, description, image, sizes }: MenuItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
  const { addItem } = useCart()

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const handleAddToCart = () => {
    const selectedSize = sizes[selectedSizeIndex]
    addItem({
      id: String(id),
      name,
      description,
      image,
      size: selectedSize.size || "",
      price: selectedSize.price,
    })
    setIsOpen(false)
  }

  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedSizeIndex(0)
    setIsOpen(true)
  }

  return (
    <>
      <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="relative h-28 w-28 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={image || "/placeholder.svg?height=112&width=112"}
            alt={name}
            className="w-full h-full object-cover"
          />
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
        <div className="flex items-end">
          <button
            onClick={handlePlusClick}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md p-0 bg-white overflow-hidden">
          {/* Image section */}
          <div className="relative w-full aspect-[4/3] bg-gray-100">
            <img
              src={image || "/placeholder.svg?height=300&width=400"}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content section */}
          <div className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-gray-500 mt-1">{description}</p>
            </div>

            {/* Price display */}
            <div className="text-2xl font-bold">{formatPrice(sizes[selectedSizeIndex].price)} ₸</div>

            {/* Size selection with radio buttons */}
            {sizes.length > 1 ? (
              <RadioGroup
                value={String(selectedSizeIndex)}
                onValueChange={(value) => setSelectedSizeIndex(Number(value))}
                className="space-y-3"
              >
                {sizes.map((size, index) => (
                  <label key={index} className="flex items-center gap-3 cursor-pointer">
                    <RadioGroupItem value={String(index)} className="w-5 h-5" />
                    <div className="flex-1">
                      <span className="font-medium">{size.size || "Стандарт"}</span>
                      <p className="text-sm text-gray-500">Цена: {formatPrice(size.price)} ₸</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            ) : (
              <div className="py-2">
                <span className="text-gray-600">{sizes[0].size || "Стандарт"}</span>
              </div>
            )}

            {/* Add button */}
            <Button
              onClick={handleAddToCart}
              className="w-full h-14 text-lg font-medium bg-black hover:bg-gray-800 text-white rounded-full"
            >
              Добавить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
