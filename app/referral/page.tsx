"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Users, Gift, Copy, Twitter, Facebook, Instagram, Mail, TrendingUp, Euro, Crown } from "lucide-react"
import { toast } from "sonner"
import { AppLayout } from "@/components/layouts/app-layout"

export default function ReferralPage() {
  const [referralCode] = useState("MARIE2024")
  const [customMessage, setCustomMessage] = useState(
    "🚀 Découvre Instagram2Shop ! Transforme ton Instagram en boutique en 1 clic et génère jusqu'à 5000€/mois ! Utilise mon code MARIE2024 pour 1 mois gratuit 💰",
  )

  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: "340€",
    monthlyEarnings: "89€",
    conversionRate: "67%",
    nextTier: "Gold",
    progressToNext: 65,
  }

  const referralHistory = [
    {
      name: "Sophie M.",
      email: "sophie@example.com",
      status: "Active",
      joinDate: "15 Jan 2024",
      earnings: "45€",
      plan: "Commission",
    },
    {
      name: "Lucas B.",
      email: "lucas@example.com",
      status: "Active",
      joinDate: "22 Jan 2024",
      earnings: "28€",
      plan: "Abonnement",
    },
    {
      name: "Emma R.",
      email: "emma@example.com",
      status: "Pending",
      joinDate: "01 Fév 2024",
      earnings: "0€",
      plan: "-",
    },
  ]

  const tiers = [
    {
      name: "Bronze",
      minReferrals: 0,
      commission: "10%",
      bonus: "1 mois gratuit",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      name: "Silver",
      minReferrals: 5,
      commission: "15%",
      bonus: "2 mois gratuits + badge",
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
    {
      name: "Gold",
      minReferrals: 15,
      commission: "20%",
      bonus: "3 mois gratuits + support prioritaire",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      name: "Diamond",
      minReferrals: 50,
      commission: "25%",
      bonus: "6 mois gratuits + accès bêta",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
  ]

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    toast.success("Code de parrainage copié !")
  }

  const copyReferralLink = () => {
    const link = `https://instagram2shop.com/signup?ref=${referralCode}`
    navigator.clipboard.writeText(link)
    toast.success("Lien de parrainage copié !")
  }

  const shareOnSocial = (platform: string) => {
    const link = `https://instagram2shop.com/signup?ref=${referralCode}`
    const text = encodeURIComponent(customMessage)

    let shareUrl = ""
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${link}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${link}&quote=${text}`
        break
      case "instagram":
        copyReferralLink()
        toast.success("Lien copié ! Partage-le dans ta story Instagram 📸")
        return
      case "email":
        shareUrl = `mailto:?subject=Découvre Instagram2Shop&body=${text} ${link}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  const getCurrentTier = () => {
    return (
      tiers.find((tier, index) => {
        const nextTier = tiers[index + 1]
        return (
          referralStats.totalReferrals >= tier.minReferrals &&
          (!nextTier || referralStats.totalReferrals < nextTier.minReferrals)
        )
      }) || tiers[0]
    )
  }

  const currentTier = getCurrentTier()

  return (
    <AppLayout title="Programme de Parrainage" breadcrumbItems={[{ label: "Parrainage" }]}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
            <Gift className="w-8 h-8 text-pink-600" />
            Programme de Parrainage
          </h1>
          <p className="text-gray-600">Gagne jusqu'à 25% de commission en parrainant tes amis créateurs</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Parrainages totaux</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referralStats.totalReferrals}</div>
              <p className="text-xs text-green-600">{referralStats.activeReferrals} actifs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gains totaux</CardTitle>
              <Euro className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{referralStats.totalEarnings}</div>
              <p className="text-xs text-green-600">{referralStats.monthlyEarnings} ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referralStats.conversionRate}</div>
              <p className="text-xs text-gray-600">Très bon taux !</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commission actuelle</CardTitle>
              <Crown className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentTier.commission}</div>
              <p className="text-xs text-gray-600">Niveau {currentTier.name}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Referral Code */}
            <Card>
              <CardHeader>
                <CardTitle>Ton code de parrainage</CardTitle>
                <CardDescription>Partage ce code pour gagner des commissions sur chaque inscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg border-2 border-dashed border-pink-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-600 mb-1">{referralCode}</div>
                      <div className="text-sm text-gray-600">Code de parrainage</div>
                    </div>
                  </div>
                  <Button onClick={copyReferralCode} variant="outline" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <Input
                    value={`https://instagram2shop.com/signup?ref=${referralCode}`}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button onClick={copyReferralLink} variant="outline" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Share Options */}
            <Card>
              <CardHeader>
                <CardTitle>Partager sur les réseaux</CardTitle>
                <CardDescription>Personnalise ton message et partage sur tes plateformes préférées</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Message personnalisé</label>
                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full p-3 border rounded-lg resize-none"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    onClick={() => shareOnSocial("twitter")}
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Twitter className="w-4 h-4 text-blue-500" />
                    Twitter
                  </Button>
                  <Button
                    onClick={() => shareOnSocial("facebook")}
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    Facebook
                  </Button>
                  <Button
                    onClick={() => shareOnSocial("instagram")}
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Instagram className="w-4 h-4 text-pink-600" />
                    Instagram
                  </Button>
                  <Button
                    onClick={() => shareOnSocial("email")}
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Mail className="w-4 h-4 text-gray-600" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Referral History */}
            <Card>
              <CardHeader>
                <CardTitle>Tes parrainages</CardTitle>
                <CardDescription>Historique de tes parrainages et gains associés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralHistory.map((referral, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-pink-600">{referral.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{referral.name}</h4>
                          <p className="text-sm text-gray-500">{referral.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold text-green-600">{referral.earnings}</div>
                          <div className="text-xs text-gray-500">{referral.plan}</div>
                        </div>
                        <Badge
                          className={
                            referral.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }
                        >
                          {referral.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress to Next Tier */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-600" />
                  Progression
                </CardTitle>
                <CardDescription>Vers le niveau {referralStats.nextTier}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Parrainages</span>
                    <span>{referralStats.totalReferrals}/15</span>
                  </div>
                  <Progress value={referralStats.progressToNext} className="h-2" />
                </div>
                <p className="text-sm text-gray-600">
                  Plus que {15 - referralStats.totalReferrals} parrainages pour débloquer le niveau Gold !
                </p>
              </CardContent>
            </Card>

            {/* Tiers System */}
            <Card>
              <CardHeader>
                <CardTitle>Niveaux de parrainage</CardTitle>
                <CardDescription>Plus tu parraines, plus tu gagnes !</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {tiers.map((tier, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 ${
                      tier.name === currentTier.name ? "border-pink-200 bg-pink-50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-bold ${tier.color}`}>{tier.name}</span>
                      <span className="text-sm font-medium">{tier.commission}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {tier.minReferrals}+ parrainages • {tier.bonus}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Conseils pour réussir</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-pink-600">•</span>
                  <span>Partage ton expérience personnelle avec Instagram2Shop</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-600">•</span>
                  <span>Montre tes résultats concrets (revenus, boutique)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-600">•</span>
                  <span>Cible les créateurs de contenu et influenceurs</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-600">•</span>
                  <span>Utilise tes stories Instagram pour partager le lien</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
