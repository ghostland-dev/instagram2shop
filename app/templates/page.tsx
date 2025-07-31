"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Eye, Download, Star, Heart, Sparkles, Crown, Zap, CheckCircle } from "lucide-react"
import Image from "next/image"
import { AppLayout } from "@/components/layouts/app-layout"

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const templates = [
    {
      id: 1,
      name: "Fashion Minimalist",
      category: "fashion",
      description: "Design épuré et élégant pour les marques de mode haut de gamme",
      image: "/placeholder.svg?height=300&width=400",
      price: "Gratuit",
      rating: 4.9,
      downloads: 1234,
      tags: ["Mode", "Minimaliste", "Élégant"],
      premium: false,
      colors: ["#000000", "#FFFFFF", "#F5F5F5"],
    },
    {
      id: 2,
      name: "Boho Chic",
      category: "fashion",
      description: "Style bohème coloré parfait pour les créateurs lifestyle",
      image: "/placeholder.svg?height=300&width=400",
      price: "Pro",
      rating: 4.8,
      downloads: 892,
      tags: ["Bohème", "Coloré", "Lifestyle"],
      premium: true,
      colors: ["#D4A574", "#E8C5A0", "#F4E4C1"],
    },
    {
      id: 3,
      name: "Tech Modern",
      category: "tech",
      description: "Design futuriste pour les produits tech et gadgets",
      image: "/placeholder.svg?height=300&width=400",
      price: "Pro",
      rating: 4.7,
      downloads: 567,
      tags: ["Tech", "Moderne", "Futuriste"],
      premium: true,
      colors: ["#1E293B", "#3B82F6", "#60A5FA"],
    },
    {
      id: 4,
      name: "Beauty Glow",
      category: "beauty",
      description: "Template lumineux et féminin pour les produits beauté",
      image: "/placeholder.svg?height=300&width=400",
      price: "Gratuit",
      rating: 4.9,
      downloads: 2156,
      tags: ["Beauté", "Féminin", "Lumineux"],
      premium: false,
      colors: ["#FDF2F8", "#F9A8D4", "#EC4899"],
    },
    {
      id: 5,
      name: "Artisan Craft",
      category: "handmade",
      description: "Style artisanal pour les créateurs de produits faits main",
      image: "/placeholder.svg?height=300&width=400",
      price: "Gratuit",
      rating: 4.6,
      downloads: 743,
      tags: ["Artisanal", "Naturel", "Authentique"],
      premium: false,
      colors: ["#92400E", "#D97706", "#FCD34D"],
    },
    {
      id: 6,
      name: "Luxury Gold",
      category: "luxury",
      description: "Template premium pour les marques de luxe et bijouterie",
      image: "/placeholder.svg?height=300&width=400",
      price: "Pro",
      rating: 5.0,
      downloads: 321,
      tags: ["Luxe", "Or", "Premium"],
      premium: true,
      colors: ["#000000", "#D4AF37", "#FFFFFF"],
    },
  ]

  const categories = [
    { id: "all", name: "Tous", count: templates.length },
    { id: "fashion", name: "Mode", count: templates.filter((t) => t.category === "fashion").length },
    { id: "beauty", name: "Beauté", count: templates.filter((t) => t.category === "beauty").length },
    { id: "tech", name: "Tech", count: templates.filter((t) => t.category === "tech").length },
    { id: "handmade", name: "Artisanal", count: templates.filter((t) => t.category === "handmade").length },
    { id: "luxury", name: "Luxe", count: templates.filter((t) => t.category === "luxury").length },
  ]

  const filteredTemplates =
    selectedCategory === "all" ? templates : templates.filter((t) => t.category === selectedCategory)

  const applyTemplate = (templateId: number) => {
    console.log(`Application du template ${templateId}`)
    // Ici on appliquerait le template à la boutique de l'utilisateur
  }

  return (
    <AppLayout title="Templates de Boutique" breadcrumbItems={[{ label: "Templates" }]}>
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-600" />
            Templates de Boutique
          </h1>
          <p className="text-gray-600">Personnalise ta boutique avec nos designs professionnels</p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="browse">Parcourir</TabsTrigger>
            <TabsTrigger value="my-templates">Mes Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id ? "bg-gradient-to-r from-pink-500 to-orange-500" : "bg-transparent"
                  }
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {template.premium && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        Pro
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">{template.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Rating and Downloads */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{template.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Download className="w-4 h-4" />
                        <span>{template.downloads.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Color Palette */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Couleurs:</span>
                      <div className="flex gap-1">
                        {template.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => applyTemplate(template.id)}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                        disabled={template.premium}
                      >
                        {template.premium ? (
                          <>
                            <Crown className="w-4 h-4 mr-2" />
                            Upgrade Pro
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Appliquer
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-templates" className="space-y-6">
            <Card>
              <CardContent className="p-8 text-center">
                <Palette className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun template sauvegardé</h3>
                <p className="text-gray-500 mb-4">Sauvegarde tes templates préférés pour les retrouver facilement</p>
                <Button variant="outline" className="bg-transparent">
                  Parcourir les templates
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Pro Features */}
        <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Débloquer tous les templates Pro</h3>
                  <p className="text-gray-600">Accès illimité à tous nos designs premium + nouveautés chaque mois</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">+15€/mois</div>
                <Button className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Upgrade Pro
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">50+ templates premium</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Nouveautés mensuelles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Personnalisation avancée</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
