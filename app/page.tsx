"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Instagram, ShoppingBag, Zap, TrendingUp, Users, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function HomePage() {
  const router = useRouter()

  const handleGetStarted = () => {
    toast.success("Redirection vers l'inscription...")
    router.push("/auth")
  }

  const handleConnectInstagram = () => {
    toast.info("Connexion Instagram en cours...")
    router.push("/auth")
  }

  const handleViewDemo = () => {
    toast.info("Ouverture de la démo...")
    router.push("/shop")
  }

  const handleLogin = () => {
    router.push("/auth")
  }

  const handlePricing = (plan: string) => {
    toast.success(`Plan ${plan} sélectionné !`)
    router.push("/auth")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Instagram2Shop
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-600 hover:text-gray-900">
              Fonctionnalités
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
              Tarifs
            </Link>
            <Link href="#demo" className="text-gray-600 hover:text-gray-900">
              Démo
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleLogin}>
              Connexion
            </Button>
            <Button
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
              onClick={handleGetStarted}
            >
              Commencer
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 border-pink-200">
            🚀 Nouveau : Intégration Shopify automatique
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Transforme ton Instagram en boutique en 1 clic
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Convertis automatiquement tes posts Instagram en produits e-commerce. Génère jusqu'à{" "}
            <span className="font-bold text-orange-600">5 000€/mois</span> sans quitter Instagram.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-lg px-8"
              onClick={handleConnectInstagram}
            >
              <Instagram className="w-5 h-5 mr-2" />
              Connecter mon Instagram
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" onClick={handleViewDemo}>
              Voir la démo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">5K€</div>
              <div className="text-gray-600">Revenus moyens/mois</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">1 clic</div>
              <div className="text-gray-600">Pour créer ta boutique</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">24h</div>
              <div className="text-gray-600">Mise en ligne</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-pink-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
                <CardTitle>1. Connecte ton Instagram</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Notre système analyse automatiquement tes posts avec des produits grâce à l'IA
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle>2. Génération automatique</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Création instantanée de ta boutique Shopify avec tous tes produits
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-yellow-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle>3. Monétise</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Ajoute le lien "Shop Now" dans ta bio et commence à vendre immédiatement
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-gradient-to-r from-pink-50 to-orange-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">Fonctionnalités puissantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Scraping intelligent</h3>
                  <p className="text-gray-600">
                    Détection automatique des produits dans tes posts avec Puppeteer et IA
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Intégration Shopify</h3>
                  <p className="text-gray-600">Création automatique de ta boutique avec l'API Shopify</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Viralité intégrée</h3>
                  <p className="text-gray-600">Badge "Powered by Instagram2Shop" pour une croissance organique</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Analytics avancées</h3>
                  <p className="text-gray-600">Suivi des ventes et performance de tes produits en temps réel</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-16">Tarifs simples et transparents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="relative border-2 hover:border-pink-200 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Abonnement</CardTitle>
                <div className="text-4xl font-bold text-pink-600 mt-4">
                  49€<span className="text-lg text-gray-500">/mois</span>
                </div>
                <CardDescription>Parfait pour commencer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-pink-500" />
                  <span>Boutique Shopify automatique</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-pink-500" />
                  <span>Scraping illimité</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-pink-500" />
                  <span>Support 24/7</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-pink-500" />
                  <span>Analytics détaillées</span>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 mt-6"
                  onClick={() => handlePricing("Abonnement")}
                >
                  Commencer maintenant
                </Button>
              </CardContent>
            </Card>

            <Card className="relative border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                Recommandé
              </Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Commission</CardTitle>
                <div className="text-4xl font-bold text-orange-600 mt-4">
                  5%<span className="text-lg text-gray-500"> du CA</span>
                </div>
                <CardDescription>Tu paies seulement si tu vends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span>Tout de l'abonnement</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span>Aucun frais fixe</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span>Optimisation des ventes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span>Support prioritaire</span>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 mt-6"
                  onClick={() => handlePricing("Commission")}
                >
                  Choisir ce plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-600 to-orange-600 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Prêt à transformer ton Instagram en machine à cash ? 💰</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoins les créateurs qui génèrent déjà des milliers d'euros grâce à Instagram2Shop
          </p>
          <Button
            size="lg"
            className="bg-white text-pink-600 hover:bg-gray-100 text-lg px-8"
            onClick={handleConnectInstagram}
          >
            <Instagram className="w-5 h-5 mr-2" />
            Commencer gratuitement
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Instagram2Shop</span>
            </div>
            <div className="flex gap-6 text-gray-400">
              <Link href="/legal" className="hover:text-white">
                Mentions légales
              </Link>
              <Link href="/terms" className="hover:text-white">
                CGV
              </Link>
              <Link href="/support" className="hover:text-white">
                Support
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Instagram2Shop. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
