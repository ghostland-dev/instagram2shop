"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  ShoppingCart,
  Heart,
  Instagram,
  Download,
  RefreshCw,
} from "lucide-react"
import { AppLayout } from "@/components/layouts/app-layout"
import { toast } from "sonner"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const handleRefresh = async () => {
    setIsRefreshing(true)
    toast.info("Actualisation des données...")
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success("Données mises à jour !")
    } catch (error) {
      toast.error("Erreur lors de l'actualisation")
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleExport = () => {
    toast.success("Export des données en cours...")
    // Ici on générerait un fichier CSV/PDF
  }

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
    toast.info(`Période changée : ${value}`)
  }

  const stats = {
    revenue: { value: "3,015€", change: "+12%", trend: "up" },
    orders: { value: "47", change: "+8%", trend: "up" },
    views: { value: "12,450", change: "-3%", trend: "down" },
    conversion: { value: "2.8%", change: "+0.3%", trend: "up" },
  }

  const topProducts = [
    { name: "Robe d'été fleurie", sales: 12, revenue: "1,068€", views: 1200 },
    { name: "Sac à main cuir", sales: 8, revenue: "1,272€", views: 890 },
    { name: "Bijoux dorés", sales: 15, revenue: "675€", views: 1580 },
    { name: "Chaussures tendance", sales: 6, revenue: "750€", views: 650 },
    { name: "Veste en jean", sales: 4, revenue: "316€", views: 420 },
  ]

  return (
    <AppLayout title="Analytics" breadcrumbItems={[{ label: "Analytics" }]}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Dernières 24h</SelectItem>
                <SelectItem value="7d">7 derniers jours</SelectItem>
                <SelectItem value="30d">30 derniers jours</SelectItem>
                <SelectItem value="90d">3 derniers mois</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
            >
              {isRefreshing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Actualisation...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualiser
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.revenue.value}</div>
              <div className="flex items-center gap-1 text-xs">
                {stats.revenue.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={stats.revenue.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stats.revenue.change}
                </span>
                <span className="text-muted-foreground">vs période précédente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.orders.value}</div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">{stats.orders.change}</span>
                <span className="text-muted-foreground">vs période précédente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vues</CardTitle>
              <Eye className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.views.value}</div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingDown className="h-3 w-3 text-red-600" />
                <span className="text-red-600">{stats.views.change}</span>
                <span className="text-muted-foreground">vs période précédente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.conversion.value}</div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">{stats.conversion.change}</span>
                <span className="text-muted-foreground">vs période précédente</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="traffic">Trafic</TabsTrigger>
            <TabsTrigger value="social">Réseaux sociaux</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution des revenus</CardTitle>
                  <CardDescription>Revenus par jour sur la période sélectionnée</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                      <p>Graphique des revenus</p>
                      <p className="text-sm">Données simulées</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top produits</CardTitle>
                  <CardDescription>Produits les plus performants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="outline"
                            className="w-8 h-8 rounded-full p-0 flex items-center justify-center"
                          >
                            {index + 1}
                          </Badge>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.views} vues</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">{product.revenue}</div>
                          <div className="text-sm text-gray-500">{product.sales} ventes</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Performance des produits</CardTitle>
                <CardDescription>Analyse détaillée de vos produits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{product.name}</h4>
                        <Badge className="bg-green-500">{product.sales} ventes</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Revenus:</span>
                          <div className="font-medium text-green-600">{product.revenue}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Vues:</span>
                          <div className="font-medium">{product.views}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Conversion:</span>
                          <div className="font-medium">{((product.sales / product.views) * 100).toFixed(1)}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traffic">
            <Card>
              <CardHeader>
                <CardTitle>Sources de trafic</CardTitle>
                <CardDescription>D'où viennent vos visiteurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Instagram className="w-6 h-6 text-pink-600" />
                      <span>Instagram</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">8,450 visites</div>
                      <div className="text-sm text-gray-500">68% du trafic</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        G
                      </div>
                      <span>Google</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">2,100 visites</div>
                      <div className="text-sm text-gray-500">17% du trafic</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        D
                      </div>
                      <span>Direct</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">1,900 visites</div>
                      <div className="text-sm text-gray-500">15% du trafic</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Performance Instagram</CardTitle>
                <CardDescription>Statistiques de vos posts Instagram</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-pink-50 rounded-lg">
                    <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">2,450</div>
                    <div className="text-sm text-gray-600">Likes totaux</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">12,450</div>
                    <div className="text-sm text-gray-600">Impressions</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">4.2%</div>
                    <div className="text-sm text-gray-600">Engagement</div>
                  </div>
                </div>
                <div className="text-center py-8 text-gray-500">
                  <Instagram className="w-12 h-12 mx-auto mb-4" />
                  <p>Détails des posts Instagram à venir...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
