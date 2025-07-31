"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Instagram,
  ShoppingBag,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  ExternalLink,
  RefreshCw,
  BarChart3,
  Settings,
} from "lucide-react"
import Image from "next/image"
import { AppLayout } from "@/components/layouts/app-layout"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [isScanning, setIsScanning] = useState(false)
  const [activeTab, setActiveTab] = useState("products")
  const router = useRouter()

  const mockProducts = [
    {
      id: 1,
      title: "Robe d'été fleurie",
      price: "89€",
      image: "/placeholder.svg?height=200&width=200",
      instagramPost: "https://instagram.com/p/abc123",
      shopifyUrl: "https://myshop.shopify.com/products/robe-ete",
      likes: 245,
      comments: 18,
      views: 1200,
      sales: 12,
      revenue: "1,068€",
    },
    {
      id: 2,
      title: "Sac à main cuir",
      price: "159€",
      image: "/placeholder.svg?height=200&width=200",
      instagramPost: "https://instagram.com/p/def456",
      shopifyUrl: "https://myshop.shopify.com/products/sac-cuir",
      likes: 189,
      comments: 24,
      views: 890,
      sales: 8,
      revenue: "1,272€",
    },
    {
      id: 3,
      title: "Bijoux dorés",
      price: "45€",
      image: "/placeholder.svg?height=200&width=200",
      instagramPost: "https://instagram.com/p/ghi789",
      shopifyUrl: "https://myshop.shopify.com/products/bijoux-dores",
      likes: 312,
      comments: 31,
      views: 1580,
      sales: 15,
      revenue: "675€",
    },
  ]

  const handleScan = async () => {
    setIsScanning(true)
    toast.info("Analyse de votre Instagram en cours...")
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      toast.success("3 nouveaux produits détectés !")
    } catch (error) {
      toast.error("Erreur lors du scan")
    } finally {
      setIsScanning(false)
    }
  }

  const viewProduct = (url: string) => {
    window.open(url, "_blank")
  }

  const goToAnalytics = () => {
    router.push("/analytics")
  }

  const goToSettings = () => {
    router.push("/settings")
  }

  return (
    <AppLayout title="Dashboard" breadcrumbItems={[{ label: "Dashboard" }]}>
      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">3,015€</div>
              <p className="text-xs text-muted-foreground">+12% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits actifs</CardTitle>
              <ShoppingBag className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">3 nouveaux cette semaine</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vues totales</CardTitle>
              <Eye className="h-4 w-4 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,450</div>
              <p className="text-xs text-muted-foreground">+8% cette semaine</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.8%</div>
              <p className="text-xs text-muted-foreground">+0.3% ce mois</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="products">Mes Produits</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Scan en cours...
                </>
              ) : (
                <>
                  <Instagram className="w-4 h-4 mr-2" />
                  Scanner Instagram
                </>
              )}
            </Button>
          </div>

          <TabsContent value="products" className="space-y-6">
            {isScanning && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <RefreshCw className="w-6 h-6 text-orange-600 animate-spin" />
                    <div className="flex-1">
                      <h3 className="font-medium text-orange-900">Analyse de votre Instagram en cours...</h3>
                      <p className="text-sm text-orange-700">Détection des nouveaux produits dans vos posts récents</p>
                      <Progress value={65} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500">{product.sales} ventes</Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{product.title}</CardTitle>
                        <CardDescription className="text-xl font-bold text-green-600">{product.price}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {product.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {product.comments}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {product.views}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{product.revenue}</div>
                      <div className="text-sm text-gray-500">Revenus générés</div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => viewProduct(product.instagramPost)}
                      >
                        <Instagram className="w-4 h-4 mr-1" />
                        Post
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => viewProduct(product.shopifyUrl)}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Boutique
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics détaillées</CardTitle>
                <CardDescription>Suivez les performances de vos produits et optimisez vos ventes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                  <p className="mb-4">Graphiques et statistiques détaillées</p>
                  <Button onClick={goToAnalytics} className="bg-gradient-to-r from-pink-500 to-orange-500">
                    Voir les analytics complètes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de la boutique</CardTitle>
                <CardDescription>Configurez votre intégration Instagram et Shopify</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Instagram className="w-8 h-8 text-pink-600" />
                      <div>
                        <div className="font-medium">Instagram connecté</div>
                        <div className="text-sm text-gray-500">@fashionista_marie</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Actif
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-8 h-8 text-orange-600" />
                      <div>
                        <div className="font-medium">Boutique Shopify</div>
                        <div className="text-sm text-gray-500">marie-fashion.myshopify.com</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Synchronisé
                    </Badge>
                  </div>

                  <div className="flex justify-center">
                    <Button onClick={goToSettings} variant="outline" className="bg-transparent">
                      <Settings className="w-4 h-4 mr-2" />
                      Paramètres avancés
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
