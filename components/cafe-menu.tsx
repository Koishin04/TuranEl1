"use client"

import { useState, createContext, useContext } from "react"
import { CategoryCard } from "@/components/category-card"
import { MenuItem } from "@/components/menu-item"
import { SubcategoryPill } from "@/components/subcategory-pill"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CartButton } from "@/components/cart-button"
import { CartPage } from "@/components/cart-page"
import { categories, menuItems, translations } from "@/lib/menu-data"

export type Language = "en" | "ru" | "kk"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (translations: { en: string; ru: string; kk: string }) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function CafeMenu() {
  const [language, setLanguage] = useState<Language>("kk")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>("hot-dishes")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [showCart, setShowCart] = useState(false)

  const t = (translations: { en: string; ru: string; kk: string }) => {
    return translations[language]
  }

  const currentCategory = categories.find((c) => c.id === selectedCategory)
  const subcategories = currentCategory?.subcategories || []

  const currentSubcategory = subcategories.find((s) => s.id === selectedSubcategory)

  const filteredItems = menuItems.filter((item) => {
    const nameMatch =
      item.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.kk.toLowerCase().includes(searchQuery.toLowerCase())
    const descMatch =
      item.description.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.kk.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSearch = nameMatch || descMatch

    if (searchQuery.trim()) {
      return matchesSearch
    }

    const matchesCategory = selectedCategory ? item.category === selectedCategory : true
    const matchesSubcategory = selectedSubcategory ? item.subcategory === selectedSubcategory : true
    return matchesCategory && matchesSubcategory
  })

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (value.trim()) {
      setSelectedCategory(null)
      setSelectedSubcategory(null)
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    setSearchQuery("")
    if (selectedCategory === categoryId) {
      setSelectedCategory(null)
      setSelectedSubcategory(null)
    } else {
      setSelectedCategory(categoryId)
      setSelectedSubcategory(null)
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {showCart ? (
        <CartPage onBack={() => setShowCart(false)} />
      ) : (
        <div className="min-h-screen bg-white relative">
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("/images/image.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
            }}
          />

          <header className="relative z-10 bg-white border-b border-gray-100">
            <div className="relative">
              <img
                src="/images/telegram-cloud-photo-size-2-5420400357537419731-y.jpg"
                alt="Turan-El Restaurant"
                className="w-full h-auto max-h-[200px] md:max-h-[280px] object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-1 border border-gray-200">
                <LanguageSwitcher />
              </div>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-4 py-6 space-y-6 relative pb-28">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder={t(translations.search)}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-white border border-gray-200 text-base outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all"
              />
            </div>

            {/* Categories - hide when searching */}
            {!searchQuery.trim() && (
              <div className="overflow-x-auto pb-2 -mx-4 px-4">
                <div className="flex gap-3">
                  {categories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      name={t(category.name)}
                      image={category.image}
                      isSelected={selectedCategory === category.id}
                      onClick={() => handleCategoryClick(category.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Subcategories - hide when searching */}
            {!searchQuery.trim() && selectedCategory && subcategories.length > 0 && (
              <div className="overflow-x-auto pb-2 -mx-4 px-4">
                <div className="flex gap-2">
                  {subcategories.map((subcategory) => (
                    <SubcategoryPill
                      key={subcategory.id}
                      name={t(subcategory.name)}
                      isSelected={selectedSubcategory === subcategory.id}
                      onClick={() =>
                        setSelectedSubcategory(selectedSubcategory === subcategory.id ? null : subcategory.id)
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Section Title */}
            {!searchQuery.trim() && currentSubcategory && (
              <h2 className="text-2xl font-bold">{t(currentSubcategory.name)}</h2>
            )}

            {/* Search Results Title */}
            {searchQuery.trim() && (
              <h2 className="text-lg text-gray-600">
                {t(translations.searchResults)}: {filteredItems.length}
              </h2>
            )}

            {/* Menu Items */}
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <MenuItem
                  key={item.id}
                  id={item.id}
                  name={t(item.name)}
                  description={t(item.description)}
                  image={item.image}
                  sizes={item.sizes}
                />
              ))}
              {filteredItems.length === 0 && (
                <div className="text-center py-12 text-gray-500">{t(translations.noItems)}</div>
              )}
            </div>
          </main>

          <CartButton onClick={() => setShowCart(true)} />
        </div>
      )}
    </LanguageContext.Provider>
  )
}
