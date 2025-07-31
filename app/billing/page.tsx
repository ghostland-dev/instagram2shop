"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Download, Calendar, TrendingUp, AlertCircle, CheckCircle, Euro, Receipt } from "lucide-react"
import { AppLayout } from "@/components/layouts/app-layout"

export default function BillingPage() {
  const [currentPlan] = useState("commission")

  const planDetails = {
    subscription: {
      name: "Abonnement",
      price: "49€/mois",
      features: ["Boutique Shopify automatique", "Scraping illimité", "Support 24/7", "Analytics détaillées"],
    },
    commission: {
      name: "Commission",
      price: "5% du CA",
      features: ["Tout de l'abonnement", "Aucun frais fixe", "Optimisation des ventes", "Support prioritaire"],
    },
  }

  const invoices = [
    {
      id: "INV-2024-001",
      date: "15 Jan 2024",
      amount: "127.50€",
      status: "Payée",
      description: "Commission sur ventes - Janvier 2024",
      downloadUrl: "#",
    },
    {
      id: "INV-2023-012",
      date: "15 Déc 2023",
      amount: "89.25€",
      status: "Payée",
      description: "Commission sur ventes - Décembre 2023",
      downloadUrl: "#",
    },
    {
      id: "INV-2023-011",
      date: "15 Nov 2023",
      amount: "156.80€",
      status: "Payée",
      description: "Commission sur ventes - Novembre 2023",
      downloadUrl: "#",
    },
  ]

  const monthlyStats = {
    currentMonth: {
      sales: "2,550€",
      commission: "127.50€",
      orders: 32,
      progress: 85,
    },
    lastMonth: {
      sales: "1,785€",
      commission: "89.25€",
      orders: 24,
    },
  }

  return (
    <AppLayout title="Facturation" breadcrumbItems={[{ label: "Facturation" }]}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-pink-600" />
            Facturation
          </h1>
          <p className="text-gray-600">Gérez votre abonnement et consultez vos factures</p>
        </div>

        {/* Current Plan Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Plan actuel
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Actif
                </Badge>
              </CardTitle>
              <CardDescription>Votre plan {planDetails[currentPlan as keyof typeof planDetails].name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-green-600">
                    {planDetails[currentPlan as keyof typeof planDetails].price}
                  </h3>
                  <p className="text-gray-600">
                    {currentPlan === "commission" ? "Prélevé sur vos ventes" : "Facturé mensuellement"}
                  </p>
                </div>
                <Button variant="outline">Changer de plan</Button>
              </div>

              <div className="space-y-2">
                {planDetails[currentPlan as keyof typeof planDetails].features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prochaine facturation</CardTitle>
            </CardHeader>
            <CardContent>
              {currentPlan === "commission" ? (
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-orange-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Commission calculée</p>
                  <p className="font-bold text-lg">Fin du mois</p>
                  <p className="text-xs text-gray-500">Basée sur vos ventes</p>
                </div>
              ) : (
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-pink-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Prochain prélèvement</p>
                  <p className="font-bold text-lg">15 Fév 2024</p>
                  <p className="text-xs text-gray-500">49€</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="invoices">Factures</TabsTrigger>
            <TabsTrigger value="payment">Moyens de paiement</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {currentPlan === "commission" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Ce mois-ci
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Ventes totales</span>
                        <span className="font-bold text-green-600">{monthlyStats.currentMonth.sales}</span>
                      </div>
                      <Progress value={monthlyStats.currentMonth.progress} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Objectif: 3,000€</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Commission (5%)</span>
                      <span className="font-bold text-orange-600">{monthlyStats.currentMonth.commission}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Commandes</span>
                      <span className="font-bold">{monthlyStats.currentMonth.orders}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-gray-600" />
                      Mois dernier
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Ventes totales</span>
                      <span className="font-bold">{monthlyStats.lastMonth.sales}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Commission (5%)</span>
                      <span className="font-bold text-orange-600">{monthlyStats.lastMonth.commission}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Commandes</span>
                      <span className="font-bold">{monthlyStats.lastMonth.orders}</span>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-600">+43% vs mois précédent</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Informations de facturation</CardTitle>
                <CardDescription>Détails de votre compte et facturation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Nom de facturation</Label>
                    <p className="font-medium">Marie Dupont</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Email</Label>
                    <p className="font-medium">marie@example.com</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Adresse</Label>
                    <p className="font-medium">123 Rue de la Mode, 75001 Paris</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">SIRET</Label>
                    <p className="font-medium">123 456 789 00012</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 bg-transparent">
                  Modifier les informations
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Historique des factures</h2>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Télécharger tout
              </Button>
            </div>

            <div className="space-y-4">
              {invoices.map((invoice) => (
                <Card key={invoice.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                          <Receipt className="w-6 h-6 text-pink-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{invoice.description}</h3>
                          <p className="text-sm text-gray-500">
                            {invoice.id} • {invoice.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-lg">{invoice.amount}</p>
                          <Badge className="bg-green-100 text-green-700">{invoice.status}</Badge>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={invoice.downloadUrl} download>
                            <Download className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Moyens de paiement</CardTitle>
                <CardDescription>Gérez vos cartes et méthodes de paiement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-500">Expire 12/25</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Principal
                    </Badge>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Ajouter un moyen de paiement
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Informations importantes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p>• Les commissions sont calculées automatiquement sur chaque vente</p>
                <p>• La facturation s'effectue en fin de mois pour le plan commission</p>
                <p>• Vous pouvez changer de plan à tout moment depuis cette page</p>
                <p>• Toutes les factures sont disponibles au téléchargement</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
