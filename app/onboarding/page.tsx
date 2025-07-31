"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Instagram, CheckCircle, ArrowRight, ArrowLeft, ExternalLink, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isConnecting, setIsConnecting] = useState(false)
  const [instagramConnected, setInstagramConnected] = useState(false)
  const [shopifyConnected, setShopifyConnected] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    instagramUsername: "@fashionista_marie",
    shopName: "Marie's Fashion",
    shopUrl: "marie-fashion",
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleInstagramConnect = async () => {
    if (!formData.instagramUsername.trim()) {
      toast.error("Veuillez entrer votre nom d'utilisateur Instagram")
      return
    }

    setIsConnecting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setInstagramConnected(true)
      toast.success("Instagram connecté avec succès !")
    } catch (error) {
      toast.error("Erreur lors de la connexion Instagram")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleShopifyConnect = async () => {
    if (!formData.shopName.trim() || !formData.shopUrl.trim()) {
      toast.error("Veuillez remplir tous les champs")
      return
    }

    setIsConnecting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setShopifyConnected(true)
      toast.success("Boutique créée avec succès !")
    } catch (error) {
      toast.error("Erreur lors de la création de la boutique")
    } finally {
      setIsConnecting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      toast.success("Configuration terminée !")
      router.push("/dashboard")
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipStep = () => {
    toast.info("Étape ignorée")
    nextStep()
  }

  const goToDashboard = () => {
    router.push("/dashboard")
  }

  const viewShop = () => {
    window.open("/shop", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Instagram2Shop
            </span>
          </div>
          <Badge variant="outline">Configuration initiale</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Étape {currentStep} sur {totalSteps}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% terminé</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Instagram Connection */}
        {currentStep === 1 && (
          <Card className="border-2 border-pink-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Instagram className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Connecter votre Instagram</CardTitle>
              <CardDescription className="text-base">
                Nous allons analyser vos posts pour identifier automatiquement vos produits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!instagramConnected ? (
                <>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Pourquoi connecter Instagram ?</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Analyse automatique de vos posts avec produits</li>
                        <li>• Extraction des images et descriptions</li>
                        <li>• Synchronisation en temps réel</li>
                        <li>• Respect total de votre vie privée</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instagram-username">Nom d'utilisateur Instagram</Label>
                      <Input
                        id="instagram-username"
                        placeholder="@votre_nom_utilisateur"
                        value={formData.instagramUsername}
                        onChange={(e) => setFormData({ ...formData, instagramUsername: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleInstagramConnect}
                    disabled={isConnecting}
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-lg py-6"
                  >
                    {isConnecting ? (
                      "Connexion en cours..."
                    ) : (
                      <>
                        <Instagram className="w-5 h-5 mr-2" />
                        Connecter Instagram
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Instagram connecté avec succès !</h3>
                    <p className="text-green-600">@fashionista_marie • 24 posts analysés • 18 produits détectés</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Shopify Connection */}
        {currentStep === 2 && (
          <Card className="border-2 border-orange-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Créer votre boutique</CardTitle>
              <CardDescription className="text-base">
                Nous allons créer automatiquement votre boutique Shopify avec vos produits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!shopifyConnected ? (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="shop-name">Nom de votre boutique</Label>
                      <Input
                        id="shop-name"
                        placeholder="Marie's Fashion"
                        value={formData.shopName}
                        onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shop-url">URL de la boutique</Label>
                      <div className="flex">
                        <Input
                          id="shop-url"
                          placeholder="marie-fashion"
                          value={formData.shopUrl}
                          onChange={(e) => setFormData({ ...formData, shopUrl: e.target.value })}
                          className="rounded-r-none"
                        />
                        <div className="bg-gray-100 border border-l-0 rounded-r-md px-3 py-2 text-sm text-gray-600">
                          .myshopify.com
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-medium text-orange-900 mb-2">Ce qui sera créé automatiquement :</h4>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• Boutique Shopify complète</li>
                        <li>• 18 produits importés depuis Instagram</li>
                        <li>• Design optimisé pour mobile</li>
                        <li>• Système de paiement intégré</li>
                      </ul>
                    </div>
                  </div>

                  <Button
                    onClick={handleShopifyConnect}
                    disabled={isConnecting}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-lg py-6"
                  >
                    {isConnecting ? (
                      "Création de la boutique..."
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Créer ma boutique
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Boutique créée avec succès !</h3>
                    <p className="text-green-600">marie-fashion.myshopify.com • 18 produits importés</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent" onClick={viewShop}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Voir ma boutique
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Final Setup */}
        {currentStep === 3 && (
          <Card className="border-2 border-green-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Félicitations ! 🎉</CardTitle>
              <CardDescription className="text-base">
                Votre boutique Instagram2Shop est prête à générer des revenus
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <Instagram className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <h4 className="font-medium">Instagram</h4>
                  <p className="text-sm text-gray-600">Connecté</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <ShoppingBag className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-medium">Boutique</h4>
                  <p className="text-sm text-gray-600">18 produits</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium">Prêt</h4>
                  <p className="text-sm text-gray-600">À vendre</p>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-2">Prochaines étapes :</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>1. Ajoutez le lien de votre boutique dans votre bio Instagram</li>
                  <li>2. Partagez vos premiers produits en story</li>
                  <li>3. Suivez vos ventes dans le dashboard</li>
                </ul>
              </div>

              <div className="text-center">
                <p className="text-lg font-medium mb-2">Lien à ajouter dans votre bio :</p>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">marie-fashion.myshopify.com</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          <div className="flex gap-2">
            {currentStep < totalSteps && (
              <Button variant="ghost" onClick={skipStep}>
                Ignorer
              </Button>
            )}

            <Button
              onClick={currentStep === totalSteps ? goToDashboard : nextStep}
              disabled={
                (currentStep === 1 && !instagramConnected) || (currentStep === 2 && !shopifyConnected) || isConnecting
              }
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
            >
              {currentStep === totalSteps ? (
                <>
                  Accéder au dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Help */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Besoin d'aide ?{" "}
            <Link href="/support" className="text-pink-600 hover:underline">
              Contactez notre support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
