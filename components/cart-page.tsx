"use client"

import { Minus, Plus, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

interface CartPageProps {
  onBack: () => void
}

export function CartPage({ onBack }: CartPageProps) {
  const { items, updateQuantity, totalPrice, clearCart } = useCart()

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  const handleShowToWaiter = () => {
    // Show confirmation or alert
    alert("Ваш заказ готов к показу официанту!")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-100 z-10">
        <div className="flex items-center gap-4 p-4 max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Ваш заказ</h1>
        </div>
      </header>

      {/* Cart Items */}
      <main className="max-w-4xl mx-auto p-4 pb-32">
        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Корзина пуста</div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 py-4 border-b border-gray-100">
                {/* Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image || "/placeholder.svg?height=80&width=80"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{item.name}</h3>
                  {item.size && <p className="text-sm text-gray-500">• {item.size}</p>}

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <span className="font-bold">{formatPrice(item.price * item.quantity)} ₸</span>
                </div>
              </div>
            ))}

            {/* Totals */}
            <div className="pt-4 space-y-3">
              <div className="flex justify-between text-lg">
                <span>Итого</span>
                <span className="font-bold">{formatPrice(totalPrice)} ₸</span>
              </div>
              <div className="flex justify-between text-lg border-t pt-3">
                <span>Полная стоимость</span>
                <span className="font-bold">{formatPrice(totalPrice)} ₸</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Button */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={handleShowToWaiter}
              className="w-full h-14 text-lg font-medium bg-black hover:bg-gray-800 text-white rounded-full"
            >
              Показать официанту
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
