"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

export default function ShopPage() {
  const [cart, setCart] = useState<number[]>([])
  const [favorites, setFavorites] = useState<number[]>([])

  const products = [
    {
      id: 1,
      title: "Robe d'été fleurie",
      price: "89€",
      originalPrice: "120€",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 24,
      badge: "Bestseller",
    },
    {
      id: 2,
      title: "Sac à main cuir premium",
      price: "159€",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 18,
      badge: "Nouveau",
    },
    {
      id: 3,
      title: "Bijoux dorés élégants",
      price: "45€",
      originalPrice: "65€",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 31,
      badge: "Promo",
    },
    {
      id: 4,
      title: "Chaussures tendance",
      price: "125€",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 15,
    },
    {
      id: 5,
      title: "Veste en jean vintage",
      price: "79€",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 22,
    },
    {
      id: 6,
      title: "Lunettes de soleil",
      price: "35€",
      originalPrice: "50€",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviews: 12,
      badge: "Soldes",
    },
  ]

  const addToCart = (productId: number) => {
    setCart([...cart, productId])
    const product = products.find((p) => p.id === productId)
    toast.success(`${product?.title} ajouté au panier !`)
  }

  const toggleFavorite = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId))
      toast.info(`${product?.title} retiré des favoris`)
    } else {
      setFavorites([...favorites, productId])
      toast.success(`${product?.title} ajouté aux favoris !`)
    }
  }

  const shareProduct = (product: any) => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Découvrez ${product.title} sur Marie's Fashion`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Lien copié dans le presse-papiers !")
    }
  }

  const viewCart = () => {
    toast.info(`Panier : ${cart.length} article(s)`)
  }

  const viewFavorites = () => {
    toast.info(`Favoris : ${favorites.length} article(s)`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
              <div>
                <h1 className="text-2xl font-bold">Marie's Fashion</h1>
                <p className="text-gray-600">Style & Élégance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={viewFavorites}>
                <Heart className="w-4 h-4 mr-2" />
                Favoris ({favorites.length})
              </Button>
              <Button variant="outline" size="sm" onClick={shareProduct}>
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
              <Button
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                onClick={viewCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Panier ({cart.length})
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 to-orange-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
            Collection Été 2024
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Découvrez ma sélection de pièces tendance, directement depuis mon Instagram
          </p>
          <Badge className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-lg px-4 py-2">
            ✨ Livraison gratuite dès 75€
          </Badge>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Mes Coups de Cœur</h3>
            <p className="text-gray-600">{products.length} produits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge
                      className={`absolute top-3 left-3 ${
                        product.badge === "Bestseller"
                          ? "bg-green-500"
                          : product.badge === "Nouveau"
                            ? "bg-blue-500"
                            : product.badge === "Promo"
                              ? "bg-red-500"
                              : "bg-orange-500"
                      }`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity ${
                      favorites.includes(product.id)
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    variant="secondary"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-pink-600 transition-colors">{product.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 group-hover:shadow-lg transition-all"
                    onClick={() => addToCart(product.id)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="bg-gradient-to-r from-pink-600 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Suivez-moi sur Instagram ! 📸</h3>
          <p className="text-xl mb-6 opacity-90">
            Découvrez mes looks du jour et soyez les premiers informés des nouveautés
          </p>
          <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100" asChild>
            <Link href="https://instagram.com/fashionista_marie" target="_blank">
              Suivre @fashionista_marie
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
              <span className="font-medium">Marie's Fashion</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Link href="#" className="hover:text-gray-900">
                Livraison & Retours
              </Link>
              <Link href="#" className="hover:text-gray-900">
                Contact
              </Link>
              <Link href="#" className="hover:text-gray-900">
                CGV
              </Link>
            </div>
          </div>
          <div className="border-t mt-6 pt-6 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              Boutique créée avec
              <Badge variant="outline" className="text-xs">
                Powered by Instagram2Shop
              </Badge>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
