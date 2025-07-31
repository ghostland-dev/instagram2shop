"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingBag, Instagram, Mail, Lock, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("signup")
  const router = useRouter()

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    instagram: "",
    password: "",
    terms: false,
  })

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!signupForm.terms) {
      toast.error("Vous devez accepter les conditions d'utilisation")
      return
    }

    setIsLoading(true)
    try {
      // Simulation d'inscription
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success("Compte créé avec succès !")
      router.push("/onboarding")
    } catch (error) {
      toast.error("Erreur lors de la création du compte")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Simulation de connexion
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success("Connexion réussie !")
      router.push("/dashboard")
    } catch (error) {
      toast.error("Email ou mot de passe incorrect")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    toast.info("Email de récupération envoyé !")
  }

  const handleSocialLogin = (provider: string) => {
    toast.info(`Connexion avec ${provider}...`)
    // Ici on redirigerait vers l'OAuth du provider
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
            Instagram2Shop
          </h1>
          <p className="text-gray-600 mt-2">Transforme ton Instagram en boutique</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">S'inscrire</TabsTrigger>
            <TabsTrigger value="login">Se connecter</TabsTrigger>
          </TabsList>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Créer un compte</CardTitle>
                <CardDescription>Commencez à monétiser votre Instagram dès aujourd'hui</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        placeholder="Marie Dupont"
                        className="pl-10"
                        value={signupForm.name}
                        onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="marie@example.com"
                        className="pl-10"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram">Nom d'utilisateur Instagram</Label>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="instagram"
                        placeholder="@fashionista_marie"
                        className="pl-10"
                        value={signupForm.instagram}
                        onChange={(e) => setSignupForm({ ...signupForm, instagram: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-10"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={signupForm.terms}
                      onCheckedChange={(checked) => setSignupForm({ ...signupForm, terms: !!checked })}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm">
                      J'accepte les{" "}
                      <Link href="/terms" className="text-pink-600 hover:underline">
                        conditions d'utilisation
                      </Link>{" "}
                      et la{" "}
                      <Link href="/privacy" className="text-pink-600 hover:underline">
                        politique de confidentialité
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Création en cours..."
                    ) : (
                      <>
                        Créer mon compte
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Déjà un compte ?{" "}
                    <button onClick={() => setActiveTab("login")} className="text-pink-600 hover:underline font-medium">
                      Se connecter
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Se connecter</CardTitle>
                <CardDescription>Accédez à votre dashboard Instagram2Shop</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="marie@example.com"
                        className="pl-10"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        className="pl-10"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={loginForm.remember}
                        onCheckedChange={(checked) => setLoginForm({ ...loginForm, remember: !!checked })}
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Se souvenir de moi
                      </Label>
                    </div>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-pink-600 hover:underline"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Connexion..."
                    ) : (
                      <>
                        Se connecter
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Pas encore de compte ?{" "}
                    <button
                      onClick={() => setActiveTab("signup")}
                      className="text-pink-600 hover:underline font-medium"
                    >
                      S'inscrire gratuitement
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Social Proof */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Déjà 2,500+ créateurs nous font confiance</p>
          <div className="flex justify-center items-center gap-4 text-xs text-gray-400">
            <span>✨ Setup en 2 minutes</span>
            <span>•</span>
            <span>🔒 100% sécurisé</span>
            <span>•</span>
            <span>💰 Premiers revenus sous 24h</span>
          </div>
        </div>
      </div>
    </div>
  )
}
