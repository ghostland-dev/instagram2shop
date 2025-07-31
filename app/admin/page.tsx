"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, Users, TrendingUp, DollarSign, Search, Filter, Download, Eye, Ban } from "lucide-react"
import { AppLayout } from "@/components/layouts/app-layout"

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const globalStats = {
    totalUsers: 2847,
    activeUsers: 2156,
    totalRevenue: "127,450€",
    monthlyGrowth: "+23%",
    totalShops: 1923,
    totalProducts: 45678,
    avgRevenuePerUser: "59€",
    churnRate: "3.2%",
  }

  const users = [
    {
      id: 1,
      name: "Marie Dupont",
      email: "marie@example.com",
      instagram: "@fashionista_marie",
      plan: "Commission",
      status: "Active",
      revenue: "3,015€",
      products: 24,
      joinDate: "15 Jan 2024",
      lastActive: "Il y a 2h",
      shopUrl: "marie-fashion.myshopify.com",
    },
    {
      id: 2,
      name: "Sophie Martin",
      email: "sophie@example.com",
      instagram: "@style_sophie",
      plan: "Abonnement",
      status: "Active",
      revenue: "1,890€",
      products: 18,
      joinDate: "22 Jan 2024",
      lastActive: "Il y a 1h",
      shopUrl: "sophie-style.myshopify.com",
    },
    {
      id: 3,
      name: "Lucas Bernard",
      email: "lucas@example.com",
      instagram: "@lucas_streetwear",
      plan: "Commission",
      status: "Inactive",
      revenue: "456€",
      products: 8,
      joinDate: "10 Fév 2024",
      lastActive: "Il y a 5j",
      shopUrl: "lucas-streetwear.myshopify.com",
    },
    {
      id: 4,
      name: "Emma Rousseau",
      email: "emma@example.com",
      instagram: "@emma_bijoux",
      plan: "Abonnement",
      status: "Suspended",
      revenue: "2,340€",
      products: 32,
      joinDate: "05 Jan 2024",
      lastActive: "Il y a 3j",
      shopUrl: "emma-bijoux.myshopify.com",
    },
  ]

  const recentActivity = [
    {
      type: "user_signup",
      message: "Nouvel utilisateur inscrit: @fashion_clara",
      time: "Il y a 5 min",
      icon: Users,
      color: "text-green-600",
    },
    {
      type: "sale",
      message: "Vente de 89€ sur marie-fashion.myshopify.com",
      time: "Il y a 12 min",
      icon: DollarSign,
      color: "text-blue-600",
    },
    {
      type: "shop_created",
      message: "Nouvelle boutique créée: style-clara.myshopify.com",
      time: "Il y a 18 min",
      icon: ShoppingBag,
      color: "text-purple-600",
    },
    {
      type: "milestone",
      message: "Objectif 100K€ de revenus atteint !",
      time: "Il y a 1h",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700">Actif</Badge>
      case "Inactive":
        return <Badge className="bg-gray-100 text-gray-700">Inactif</Badge>
      case "Suspended":
        return <Badge className="bg-red-100 text-red-700">Suspendu</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPlanBadge = (plan: string) => {
    return plan === "Commission" ? (
      <Badge className="bg-orange-100 text-orange-700">Commission</Badge>
    ) : (
      <Badge className="bg-pink-100 text-pink-700">Abonnement</Badge>
    )
  }

  return (
    <AppLayout title="Tableau de bord Admin" breadcrumbItems={[{ label: "Administration" }]}>
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-pink-600" />
            Tableau de bord Admin
          </h1>
          <p className="text-gray-600">Vue d'ensemble de la plateforme Instagram2Shop</p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{globalStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-green-600">{globalStats.activeUsers.toLocaleString()} actifs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{globalStats.totalRevenue}</div>
              <p className="text-xs text-green-600">{globalStats.monthlyGrowth} ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Boutiques créées</CardTitle>
              <ShoppingBag className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{globalStats.totalShops.toLocaleString()}</div>
              <p className="text-xs text-gray-600">{globalStats.totalProducts.toLocaleString()} produits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus/utilisateur</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{globalStats.avgRevenuePerUser}</div>
              <p className="text-xs text-red-600">{globalStats.churnRate} churn rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>

            <div className="space-y-4">
              {users.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-pink-600">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-sm text-blue-600">{user.instagram}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{user.revenue}</div>
                          <div className="text-xs text-gray-500">Revenus</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">{user.products}</div>
                          <div className="text-xs text-gray-500">Produits</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {getStatusBadge(user.status)}
                          {getPlanBadge(user.plan)}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Ban className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm text-gray-500">
                      <span>Inscrit le {user.joinDate}</span>
                      <span>Dernière activité: {user.lastActive}</span>
                      <span className="text-blue-600">{user.shopUrl}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activité en temps réel</CardTitle>
                <CardDescription>Dernières actions sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const IconComponent = activity.icon
                    return (
                      <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <IconComponent className={`w-5 h-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.message}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Croissance utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                    <p>Graphique de croissance à venir...</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenus par mois</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <DollarSign className="w-12 h-12 mx-auto mb-4" />
                    <p>Graphique des revenus à venir...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de la plateforme</CardTitle>
                <CardDescription>Configuration globale d'Instagram2Shop</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Taux de commission</h4>
                    <p className="text-2xl font-bold text-orange-600">5%</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Modifier
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Prix abonnement</h4>
                    <p className="text-2xl font-bold text-pink-600">49€/mois</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Modifier
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Nouvelles inscriptions</span>
                    <Badge className="bg-green-100 text-green-700">Activées</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Mode maintenance</span>
                    <Badge className="bg-gray-100 text-gray-700">Désactivé</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Notifications email</span>
                    <Badge className="bg-green-100 text-green-700">Activées</Badge>
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
