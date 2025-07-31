"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ShoppingBag,
  Calendar,
  Sparkles,
  Zap,
  Bug,
  Shield,
  Palette,
  Users,
  TrendingUp,
  Bell,
  Crown,
  Gift,
} from "lucide-react"
import { AppLayout } from "@/components/layouts/app-layout"

export default function ChangelogPage() {
  const updates = [
    {
      version: "2.1.0",
      date: "15 Février 2024",
      type: "major",
      title: "Programme de Parrainage & Templates Pro",
      description: "Gagnez des commissions en parrainant vos amis et personnalisez votre boutique",
      features: [
        {
          icon: Gift,
          title: "Programme de parrainage",
          description: "Gagnez jusqu'à 25% de commission sur chaque parrainage",
          type: "new",
        },
        {
          icon: Palette,
          title: "Templates de boutique",
          description: "50+ designs professionnels pour personnaliser votre boutique",
          type: "new",
        },
        {
          icon: Crown,
          title: "Système de niveaux",
          description: "Bronze, Silver, Gold, Diamond avec avantages croissants",
          type: "new",
        },
        {
          icon: Bell,
          title: "Notifications améliorées",
          description: "Système de notifications en temps réel plus performant",
          type: "improvement",
        },
      ],
    },
    {
      version: "2.0.5",
      date: "08 Février 2024",
      type: "minor",
      title: "Webhooks Shopify & Support 24/7",
      description: "Intégration complète avec Shopify et nouveau centre d'aide",
      features: [
        {
          icon: Zap,
          title: "Webhooks Shopify",
          description: "Synchronisation automatique des commandes et paiements",
          type: "new",
        },
        {
          icon: Users,
          title: "Centre de support",
          description: "Chat en direct, FAQ, tickets et tutoriels vidéo",
          type: "new",
        },
        {
          icon: TrendingUp,
          title: "Analytics avancées",
          description: "Métriques détaillées sur vos ventes et performances",
          type: "improvement",
        },
        {
          icon: Shield,
          title: "Sécurité renforcée",
          description: "Vérification des signatures webhooks et chiffrement",
          type: "security",
        },
      ],
    },
    {
      version: "2.0.0",
      date: "25 Janvier 2024",
      type: "major",
      title: "Lancement officiel d'Instagram2Shop",
      description: "Première version stable avec toutes les fonctionnalités principales",
      features: [
        {
          icon: ShoppingBag,
          title: "Création automatique de boutique",
          description: "Génération de boutique Shopify en 1 clic depuis Instagram",
          type: "new",
        },
        {
          icon: Sparkles,
          title: "IA de détection de produits",
          description: "Analyse automatique des posts Instagram avec Puppeteer",
          type: "new",
        },
        {
          icon: TrendingUp,
          title: "Dashboard complet",
          description: "Suivi des ventes, analytics et gestion des produits",
          type: "new",
        },
        {
          icon: Users,
          title: "Système d'authentification",
          description: "Inscription, connexion et onboarding guidé",
          type: "new",
        },
      ],
    },
    {
      version: "1.5.2",
      date: "15 Janvier 2024",
      type: "patch",
      title: "Corrections et optimisations",
      description: "Améliorations de performance et corrections de bugs",
      features: [
        {
          icon: Bug,
          title: "Correction scraping Instagram",
          description: "Résolution des problèmes de détection sur certains posts",
          type: "fix",
        },
        {
          icon: Zap,
          title: "Performance améliorée",
          description: "Temps de chargement réduit de 40%",
          type: "improvement",
        },
        {
          icon: Shield,
          title: "Gestion d'erreurs",
          description: "Meilleure gestion des erreurs API Shopify",
          type: "fix",
        },
      ],
    },
  ]

  const getVersionBadge = (type: string) => {
    switch (type) {
      case "major":
        return <Badge className="bg-green-100 text-green-700">Majeure</Badge>
      case "minor":
        return <Badge className="bg-blue-100 text-blue-700">Mineure</Badge>
      case "patch":
        return <Badge className="bg-gray-100 text-gray-700">Correctif</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getFeatureBadge = (type: string) => {
    switch (type) {
      case "new":
        return <Badge className="bg-green-100 text-green-700">Nouveau</Badge>
      case "improvement":
        return <Badge className="bg-blue-100 text-blue-700">Amélioration</Badge>
      case "fix":
        return <Badge className="bg-orange-100 text-orange-700">Correction</Badge>
      case "security":
        return <Badge className="bg-red-100 text-red-700">Sécurité</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <AppLayout title="Nouveautés & Mises à jour" breadcrumbItems={[{ label: "Changelog" }]}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-blue-600" />
            Nouveautés & Mises à jour
          </h1>
          <p className="text-gray-600">Découvrez les dernières fonctionnalités et améliorations d'Instagram2Shop</p>
        </div>

        {/* Current Version */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Version actuelle: {updates[0].version}</h3>
                  <p className="text-gray-600">Dernière mise à jour: {updates[0].date}</p>
                </div>
              </div>
              {getVersionBadge(updates[0].type)}
            </div>
            <p className="text-gray-700">{updates[0].description}</p>
          </CardContent>
        </Card>

        {/* Updates Timeline */}
        <div className="space-y-8">
          {updates.map((update, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      Version {update.version}
                      {getVersionBadge(update.type)}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {update.date}
                    </CardDescription>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold">{update.title}</h3>
                  <p className="text-gray-600">{update.description}</p>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {update.features.map((feature, featureIndex) => {
                    const IconComponent = feature.icon
                    return (
                      <div key={featureIndex} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-100 to-orange-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-pink-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{feature.title}</h4>
                            {getFeatureBadge(feature.type)}
                          </div>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subscribe to Updates */}
        <Card className="mt-8 bg-gradient-to-r from-pink-50 to-orange-50 border-pink-200">
          <CardContent className="p-6 text-center">
            <Bell className="w-12 h-12 text-pink-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Restez informé des nouveautés</h3>
            <p className="text-gray-600 mb-4">
              Recevez une notification à chaque nouvelle mise à jour d'Instagram2Shop
            </p>
            <Button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600">
              <Bell className="w-4 h-4 mr-2" />
              Activer les notifications
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
