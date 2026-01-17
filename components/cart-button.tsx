"use client"

import { ShoppingCart, ChevronUp } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useState, useEffect } from "react"

interface CartButtonProps {
  onClick: () => void
}

export function CartButton({ onClick }: CartButtonProps) {
  const { totalItems, totalPrice } = useCart()
  const [showScrollTop, setShowScrollTop] = useState(false)

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-4 z-50 bg-black text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
          aria-label="Наверх"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {totalItems > 0 && (
        <button
          onClick={onClick}
          className="fixed bottom-6 right-4 z-50 bg-black text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-bold">{formatPrice(totalPrice)} ₸</span>
        </button>
      )}
    </>
  )
}
