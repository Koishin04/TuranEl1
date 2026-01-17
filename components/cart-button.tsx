"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface CartButtonProps {
  onClick: () => void
}

export function CartButton({ onClick }: CartButtonProps) {
  const { totalItems, totalPrice } = useCart()

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  if (totalItems === 0) return null

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-6 py-4 rounded-full shadow-lg flex items-center gap-3 hover:bg-gray-800 transition-colors"
    >
      <ShoppingCart className="w-5 h-5" />
      <span className="font-medium">{totalItems} товар(а)</span>
      <span className="font-bold">{formatPrice(totalPrice)} ₸</span>
    </button>
  )
}
