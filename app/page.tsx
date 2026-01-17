import { CafeMenu } from "@/components/cafe-menu"
import { CartProvider } from "@/lib/cart-context"

export default function Home() {
  return (
    <CartProvider>
      <CafeMenu />
    </CartProvider>
  )
}
