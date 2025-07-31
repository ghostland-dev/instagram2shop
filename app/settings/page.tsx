"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Instagram, ShoppingBag, Palette, Trash2, Save, RefreshCw, AlertTriangle } from "lucide-react"
import { AppLayout } from "@/components/layouts/app-layout"
import { toast } from "sonner"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  // Profile settings
  const [profile, setProfile] = useState({
    name: "Marie Dupont",
    email: "marie@example.com",
    instagram: "@fashionista_marie",
    bio: "Créatrice de mode passionnée",
    website: "https://marie-fashion.com",
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailSales: true,
    emailMarketing: false,
    pushSales: true,
    pushMarketing: true,
    smsAlerts: false,
  })

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showStats: false,
    allowAnalytics: true,
  })

  // Theme settings
  const [theme, setTheme] = useState("light")

  // Integration settings
  const [integrations, setIntegrations] = useState({
    instagram: { connected: true, username: "@fashionista_marie" },
    shopify: { connected: true, store: "marie-fashion.myshopify.com" },
    stripe: { connected: false, account: "" },
  })

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Profil mis à jour avec succès !")
    } catch (error) {
      toast.error("Erreur lors de la mise à jour")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveNotifications = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Préférences de notification sauvegardées !")
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSavePrivacy = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Paramètres de confidentialité mis à jour !")
    } catch (error) {
      toast.error("Erreur lors de la mise à jour")
    } finally {
      setIsLoading(false)
    }
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    toast.success(`Thème changé vers ${newTheme}`)
  }

  const handleConnectIntegration = (service: string) => {
    toast.info(`Connexion à ${service}...`)
    // Ici on redirigerait vers l'OAuth du service
  }

  const handleDisconnectIntegration = (service: string) => {
    toast.warning(`${service} déconnecté`)
    setIntegrations({
      ...integrations,
      [service]: { ...integrations[service as keyof typeof integrations], connected: false },
    })
  }

  const handleDeleteAccount = () => {
    toast.error("Suppression de compte - fonctionnalité à implémenter")
  }

  const handleExportData = () => {
    toast.success("Export des données en cours...")
  }

  return (
    <AppLayout title="Paramètres" breadcrumbItems={[{ label: "Paramètres" }]}>
      <div className="max-w-4xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
            <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations du profil</CardTitle>
                <CardDescription>Gérez vos informations personnelles et votre profil public</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={profile.instagram}
                      onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Site web</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de notification</CardTitle>
                <CardDescription>Choisissez comment vous souhaitez être notifié</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Notifications par email</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-sales">Nouvelles ventes</Label>
                        <p className="text-sm text-gray-500">Recevez un email à chaque nouvelle vente</p>
                      </div>
                      <Switch
                        id="email-sales"
                        checked={notifications.emailSales}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailSales: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-marketing">Marketing</Label>
                        <p className="text-sm text-gray-500">Conseils et actualités Instagram2Shop</p>
                      </div>
                      <Switch
                        id="email-marketing"
                        checked={notifications.emailMarketing}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailMarketing: checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Notifications push</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-sales">Nouvelles ventes</Label>
                        <p className="text-sm text-gray-500">Notifications instantanées sur votre appareil</p>
                      </div>
                      <Switch
                        id="push-sales"
                        checked={notifications.pushSales}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, pushSales: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-marketing">Promotions</Label>
                        <p className="text-sm text-gray-500">Offres spéciales et nouveautés</p>
                      </div>
                      <Switch
                        id="push-marketing"
                        checked={notifications.pushMarketing}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, pushMarketing: checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">SMS</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-alerts">Alertes importantes</Label>
                      <p className="text-sm text-gray-500">Problèmes techniques et alertes critiques</p>
                    </div>
                    <Switch
                      id="sms-alerts"
                      checked={notifications.smsAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsAlerts: checked })}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveNotifications}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Confidentialité et sécurité</CardTitle>
                <CardDescription>Contrôlez la visibilité de vos données</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="profile-public">Profil public</Label>
                      <p className="text-sm text-gray-500">Votre profil est visible par les autres utilisateurs</p>
                    </div>
                    <Switch
                      id="profile-public"
                      checked={privacy.profilePublic}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, profilePublic: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-stats">Afficher les statistiques</Label>
                      <p className="text-sm text-gray-500">Vos statistiques de vente sont visibles publiquement</p>
                    </div>
                    <Switch
                      id="show-stats"
                      checked={privacy.showStats}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showStats: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-analytics">Analytics</Label>
                      <p className="text-sm text-gray-500">
                        Autoriser la collecte de données pour améliorer le service
                      </p>
                    </div>
                    <Switch
                      id="allow-analytics"
                      checked={privacy.allowAnalytics}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, allowAnalytics: checked })}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-4">Gestion des données</h4>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleExportData}>
                      Exporter mes données
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleSavePrivacy}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Apparence</CardTitle>
                <CardDescription>Personnalisez l'apparence de votre interface</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Thème</Label>
                  <Select value={theme} onValueChange={handleThemeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un thème" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-4">Aperçu</h4>
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-pink-50 to-orange-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="w-5 h-5 text-pink-600" />
                      <span className="font-medium">Thème {theme}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Voici un aperçu de votre interface avec le thème sélectionné.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Intégrations</CardTitle>
                  <CardDescription>Gérez vos connexions avec les services externes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Instagram */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Instagram className="w-8 h-8 text-pink-600" />
                      <div>
                        <div className="font-medium">Instagram</div>
                        <div className="text-sm text-gray-500">
                          {integrations.instagram.connected ? integrations.instagram.username : "Non connecté"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={integrations.instagram.connected ? "default" : "secondary"}
                        className={integrations.instagram.connected ? "bg-green-500" : "bg-gray-500"}
                      >
                        {integrations.instagram.connected ? "Connecté" : "Déconnecté"}
                      </Badge>
                      {integrations.instagram.connected ? (
                        <Button variant="outline" size="sm" onClick={() => handleDisconnectIntegration("instagram")}>
                          Déconnecter
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleConnectIntegration("Instagram")}
                          className="bg-gradient-to-r from-pink-500 to-orange-500"
                        >
                          Connecter
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Shopify */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-8 h-8 text-green-600" />
                      <div>
                        <div className="font-medium">Shopify</div>
                        <div className="text-sm text-gray-500">
                          {integrations.shopify.connected ? integrations.shopify.store : "Non connecté"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={integrations.shopify.connected ? "default" : "secondary"}
                        className={integrations.shopify.connected ? "bg-green-500" : "bg-gray-500"}
                      >
                        {integrations.shopify.connected ? "Connecté" : "Déconnecté"}
                      </Badge>
                      {integrations.shopify.connected ? (
                        <Button variant="outline" size="sm" onClick={() => handleDisconnectIntegration("shopify")}>
                          Déconnecter
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleConnectIntegration("Shopify")}
                          className="bg-gradient-to-r from-green-500 to-blue-500"
                        >
                          Connecter
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Stripe */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">S</span>
                      </div>
                      <div>
                        <div className="font-medium">Stripe</div>
                        <div className="text-sm text-gray-500">
                          {integrations.stripe.connected ? "Paiements activés" : "Non connecté"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={integrations.stripe.connected ? "default" : "secondary"}
                        className={integrations.stripe.connected ? "bg-green-500" : "bg-gray-500"}
                      >
                        {integrations.stripe.connected ? "Connecté" : "Déconnecté"}
                      </Badge>
                      {integrations.stripe.connected ? (
                        <Button variant="outline" size="sm" onClick={() => handleDisconnectIntegration("stripe")}>
                          Déconnecter
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleConnectIntegration("Stripe")}
                          className="bg-gradient-to-r from-purple-500 to-blue-500"
                        >
                          Connecter
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Zone de danger
                  </CardTitle>
                  <CardDescription>Actions irréversibles sur votre compte</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer mon compte
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
