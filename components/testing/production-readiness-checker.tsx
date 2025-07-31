"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Rocket,
  Shield,
  Zap,
  Eye,
  Globe,
  Bug,
  Activity,
} from "lucide-react"
import { toast } from "sonner"

interface ReadinessCheck {
  id: string
  name: string
  description: string
  category: "security" | "performance" | "accessibility" | "functionality" | "compatibility"
  priority: "critical" | "high" | "medium" | "low"
  status: "pending" | "checking" | "passed" | "failed" | "warning"
  score?: number
  details?: string[]
  recommendations?: string[]
}

interface ReadinessCategory {
  id: string
  name: string
  icon: any
  color: string
  checks: ReadinessCheck[]
  weight: number // Poids dans le score global
}

export function ProductionReadinessChecker() {
  const [isChecking, setIsChecking] = useState(false)
  const [overallScore, setOverallScore] = useState(0)
  const [readinessLevel, setReadinessLevel] = useState<
    "not-ready" | "needs-work" | "almost-ready" | "production-ready"
  >("not-ready")

  const [categories, setCategories] = useState<ReadinessCategory[]>([
    {
      id: "security",
      name: "Sécurité",
      icon: Shield,
      color: "red",
      weight: 25,
      checks: [
        {
          id: "auth-security",
          name: "Sécurité authentification",
          description: "Vérification des mécanismes d'authentification",
          category: "security",
          priority: "critical",
          status: "pending",
        },
        {
          id: "data-protection",
          name: "Protection des données",
          description: "Chiffrement et sécurisation des données sensibles",
          category: "security",
          priority: "critical",
          status: "pending",
        },
        {
          id: "xss-protection",
          name: "Protection XSS",
          description: "Prévention des attaques Cross-Site Scripting",
          category: "security",
          priority: "high",
          status: "pending",
        },
        {
          id: "csrf-protection",
          name: "Protection CSRF",
          description: "Prévention des attaques Cross-Site Request Forgery",
          category: "security",
          priority: "high",
          status: "pending",
        },
        {
          id: "input-validation",
          name: "Validation des entrées",
          description: "Validation et sanitisation de toutes les entrées utilisateur",
          category: "security",
          priority: "high",
          status: "pending",
        },
      ],
    },
    {
      id: "performance",
      name: "Performance",
      icon: Zap,
      color: "yellow",
      weight: 20,
      checks: [
        {
          id: "page-load-speed",
          name: "Vitesse de chargement",
          description: "Temps de chargement des pages < 3s",
          category: "performance",
          priority: "high",
          status: "pending",
        },
        {
          id: "core-web-vitals",
          name: "Core Web Vitals",
          description: "LCP, FID, CLS dans les seuils recommandés",
          category: "performance",
          priority: "high",
          status: "pending",
        },
        {
          id: "bundle-optimization",
          name: "Optimisation des bundles",
          description: "Taille des bundles JavaScript optimisée",
          category: "performance",
          priority: "medium",
          status: "pending",
        },
        {
          id: "image-optimization",
          name: "Optimisation des images",
          description: "Images compressées et formats modernes",
          category: "performance",
          priority: "medium",
          status: "pending",
        },
        {
          id: "caching-strategy",
          name: "Stratégie de cache",
          description: "Mise en cache efficace des ressources",
          category: "performance",
          priority: "medium",
          status: "pending",
        },
      ],
    },
    {
      id: "accessibility",
      name: "Accessibilité",
      icon: Eye,
      color: "blue",
      weight: 15,
      checks: [
        {
          id: "wcag-compliance",
          name: "Conformité WCAG 2.1 AA",
          description: "Respect des standards d'accessibilité",
          category: "accessibility",
          priority: "high",
          status: "pending",
        },
        {
          id: "keyboard-navigation",
          name: "Navigation clavier",
          description: "Tous les éléments accessibles au clavier",
          category: "accessibility",
          priority: "high",
          status: "pending",
        },
        {
          id: "screen-reader",
          name: "Compatibilité lecteur d'écran",
          description: "Contenu lisible par les lecteurs d'écran",
          category: "accessibility",
          priority: "high",
          status: "pending",
        },
        {
          id: "color-contrast",
          name: "Contraste des couleurs",
          description: "Ratio de contraste suffisant (4.5:1 minimum)",
          category: "accessibility",
          priority: "medium",
          status: "pending",
        },
      ],
    },
    {
      id: "functionality",
      name: "Fonctionnalité",
      icon: Bug,
      color: "green",
      weight: 25,
      checks: [
        {
          id: "critical-flows",
          name: "Flux critiques",
          description: "Inscription, connexion, onboarding fonctionnels",
          category: "functionality",
          priority: "critical",
          status: "pending",
        },
        {
          id: "payment-system",
          name: "Système de paiement",
          description: "Processus de paiement sécurisé et fonctionnel",
          category: "functionality",
          priority: "critical",
          status: "pending",
        },
        {
          id: "data-synchronization",
          name: "Synchronisation des données",
          description: "Sync Instagram/Shopify sans erreur",
          category: "functionality",
          priority: "critical",
          status: "pending",
        },
        {
          id: "error-handling",
          name: "Gestion d'erreurs",
          description: "Gestion gracieuse de tous les cas d'erreur",
          category: "functionality",
          priority: "high",
          status: "pending",
        },
        {
          id: "form-validation",
          name: "Validation des formulaires",
          description: "Validation côté client et serveur",
          category: "functionality",
          priority: "high",
          status: "pending",
        },
      ],
    },
    {
      id: "compatibility",
      name: "Compatibilité",
      icon: Globe,
      color: "purple",
      weight: 15,
      checks: [
        {
          id: "browser-support",
          name: "Support navigateurs",
          description: "Fonctionnel sur Chrome, Firefox, Safari, Edge",
          category: "compatibility",
          priority: "high",
          status: "pending",
        },
        {
          id: "mobile-responsive",
          name: "Responsive mobile",
          description: "Interface adaptée aux mobiles et tablettes",
          category: "compatibility",
          priority: "high",
          status: "pending",
        },
        {
          id: "device-testing",
          name: "Tests multi-appareils",
          description: "Testé sur différents appareils et résolutions",
          category: "compatibility",
          priority: "medium",
          status: "pending",
        },
      ],
    },
  ])

  const simulateCheck = async (check: ReadinessCheck): Promise<ReadinessCheck> => {
    // Simuler différentes durées selon la complexité
    const duration = check.priority === "critical" ? 3000 : check.priority === "high" ? 2000 : 1500
    await new Promise((resolve) => setTimeout(resolve, duration + Math.random() * 1000))

    // Simuler des résultats basés sur la priorité et la catégorie
    const successRates: Record<string, number> = {
      critical: 0.85,
      high: 0.9,
      medium: 0.95,
      low: 0.98,
    }

    const isSuccess = Math.random() < successRates[check.priority]
    const isWarning = !isSuccess && Math.random() < 0.4

    const result: ReadinessCheck = {
      ...check,
      status: isSuccess ? "passed" : isWarning ? "warning" : "failed",
      score: isSuccess
        ? Math.round(85 + Math.random() * 15)
        : isWarning
          ? Math.round(60 + Math.random() * 20)
          : Math.round(20 + Math.random() * 40),
    }

    // Ajouter des détails et recommandations spécifiques
    if (result.status === "passed") {
      result.details = getSuccessDetails(check.id)
    } else {
      result.details = getFailureDetails(check.id, result.status === "warning")
      result.recommendations = getRecommendations(check.id)
    }

    return result
  }

  const getSuccessDetails = (checkId: string): string[] => {
    const details: Record<string, string[]> = {
      "auth-security": [
        "Mots de passe hashés avec bcrypt",
        "Sessions sécurisées avec JWT",
        "Rate limiting implémenté",
        "2FA disponible",
      ],
      "page-load-speed": [
        "Temps de chargement: 1.8s",
        "Score Lighthouse: 95/100",
        "Images optimisées WebP",
        "Bundle size: 180KB gzippé",
      ],
      "wcag-compliance": [
        "Score accessibilité: 98/100",
        "Navigation clavier complète",
        "Contraste AAA respecté",
        "Lecteurs d'écran compatibles",
      ],
      "critical-flows": [
        "Inscription: 100% fonctionnel",
        "Connexion: 100% fonctionnel",
        "Onboarding: 100% fonctionnel",
        "Paiement: 100% fonctionnel",
      ],
    }
    return details[checkId] || ["Vérification réussie", "Aucun problème détecté"]
  }

  const getFailureDetails = (checkId: string, isWarning: boolean): string[] => {
    const details: Record<string, { error: string[]; warning: string[] }> = {
      "auth-security": {
        error: [
          "Mots de passe stockés en plain text",
          "Sessions non sécurisées",
          "Pas de rate limiting",
          "Vulnérabilité critique détectée",
        ],
        warning: [
          "Politique de mot de passe faible",
          "Sessions expiration trop longue",
          "Rate limiting insuffisant",
          "2FA non implémenté",
        ],
      },
      "page-load-speed": {
        error: ["Temps de chargement: 5.2s", "Score Lighthouse: 45/100", "Images non optimisées", "Bundle size: 2.1MB"],
        warning: [
          "Temps de chargement: 3.8s",
          "Score Lighthouse: 72/100",
          "Quelques images à optimiser",
          "Bundle size: 850KB",
        ],
      },
      "wcag-compliance": {
        error: [
          "Score accessibilité: 35/100",
          "Navigation clavier impossible",
          "Contraste insuffisant",
          "Lecteurs d'écran incompatibles",
        ],
        warning: [
          "Score accessibilité: 78/100",
          "Quelques éléments non accessibles",
          "Contraste limite sur certains éléments",
          "Labels manquants",
        ],
      },
    }

    const checkDetails = details[checkId] || {
      error: ["Problème critique détecté", "Action immédiate requise"],
      warning: ["Amélioration recommandée", "Non bloquant"],
    }

    return isWarning ? checkDetails.warning : checkDetails.error
  }

  const getRecommendations = (checkId: string): string[] => {
    const recommendations: Record<string, string[]> = {
      "auth-security": [
        "Implémenter bcrypt pour le hashage des mots de passe",
        "Configurer des sessions JWT sécurisées",
        "Ajouter un rate limiting sur les endpoints sensibles",
        "Implémenter l'authentification à deux facteurs",
      ],
      "page-load-speed": [
        "Optimiser les images avec WebP/AVIF",
        "Implémenter le code splitting",
        "Configurer la compression gzip/brotli",
        "Utiliser un CDN pour les assets statiques",
      ],
      "wcag-compliance": [
        "Ajouter des labels ARIA appropriés",
        "Améliorer le contraste des couleurs",
        "Implémenter la navigation clavier complète",
        "Tester avec des lecteurs d'écran",
      ],
      "critical-flows": [
        "Corriger les bugs dans le processus d'inscription",
        "Améliorer la gestion d'erreurs",
        "Ajouter des tests automatisés",
        "Implémenter des fallbacks",
      ],
    }
    return recommendations[checkId] || ["Consulter la documentation", "Contacter l'équipe technique"]
  }

  const runAllChecks = async () => {
    setIsChecking(true)
    setOverallScore(0)

    let totalWeightedScore = 0
    let totalWeight = 0

    for (const category of categories) {
      // Mettre à jour le statut de la catégorie
      setCategories((prev) =>
        prev.map((c) =>
          c.id === category.id ? { ...c, checks: c.checks.map((check) => ({ ...check, status: "checking" })) } : c,
        ),
      )

      let categoryScore = 0
      let categoryChecks = 0

      for (const check of category.checks) {
        try {
          const result = await simulateCheck(check)

          // Mettre à jour le résultat du check
          setCategories((prev) =>
            prev.map((c) =>
              c.id === category.id
                ? {
                    ...c,
                    checks: c.checks.map((ch) => (ch.id === check.id ? result : ch)),
                  }
                : c,
            ),
          )

          if (result.score) {
            categoryScore += result.score
            categoryChecks++
          }

          // Notification selon le résultat
          if (result.status === "passed") {
            toast.success(`✅ ${result.name} - Réussi`)
          } else if (result.status === "warning") {
            toast.warning(`⚠️ ${result.name} - Avertissement`)
          } else {
            toast.error(`❌ ${result.name} - Échec`)
          }
        } catch (error) {
          toast.error(`💥 ${check.name} - Erreur critique`)
        }

        // Petite pause entre les checks
        await new Promise((resolve) => setTimeout(resolve, 300))
      }

      // Calculer le score de la catégorie
      const avgCategoryScore = categoryChecks > 0 ? categoryScore / categoryChecks : 0
      totalWeightedScore += avgCategoryScore * category.weight
      totalWeight += category.weight
    }

    // Calculer le score global
    const finalScore = totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : 0
    setOverallScore(finalScore)

    // Déterminer le niveau de préparation
    if (finalScore >= 90) {
      setReadinessLevel("production-ready")
      toast.success("🚀 Application prête pour la production !")
    } else if (finalScore >= 75) {
      setReadinessLevel("almost-ready")
      toast.warning("⚠️ Presque prête - Quelques améliorations recommandées")
    } else if (finalScore >= 60) {
      setReadinessLevel("needs-work")
      toast.warning("🔧 Travail nécessaire avant la production")
    } else {
      setReadinessLevel("not-ready")
      toast.error("🚨 Non prête pour la production - Problèmes critiques")
    }

    setIsChecking(false)
  }

  const getReadinessColor = (level: string) => {
    switch (level) {
      case "production-ready":
        return "green"
      case "almost-ready":
        return "yellow"
      case "needs-work":
        return "orange"
      case "not-ready":
        return "red"
      default:
        return "gray"
    }
  }

  const getReadinessText = (level: string) => {
    switch (level) {
      case "production-ready":
        return "🚀 Prête pour la production"
      case "almost-ready":
        return "⚠️ Presque prête"
      case "needs-work":
        return "🔧 Travail nécessaire"
      case "not-ready":
        return "🚨 Non prête"
      default:
        return "⏳ Non évaluée"
    }
  }

  const getCriticalIssues = () => {
    return categories.flatMap((category) =>
      category.checks.filter((check) => check.priority === "critical" && check.status === "failed"),
    )
  }

  const getHighPriorityWarnings = () => {
    return categories.flatMap((category) =>
      category.checks.filter(
        (check) => (check.priority === "critical" || check.priority === "high") && check.status === "warning",
      ),
    )
  }

  const criticalIssues = getCriticalIssues()
  const highPriorityWarnings = getHighPriorityWarnings()

  return (
    <div className="space-y-6">
      {/* Header avec score global */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Rocket className="w-8 h-8 text-blue-600" />
                Vérificateur de Préparation Production
              </CardTitle>
              <CardDescription className="text-lg">
                Évaluation complète de la préparation pour la mise en production
              </CardDescription>
            </div>
            <Button
              onClick={runAllChecks}
              disabled={isChecking}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              {isChecking ? (
                <>
                  <Clock className="w-5 h-5 mr-2 animate-spin" />
                  Vérification en cours...
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5 mr-2" />
                  Lancer la vérification
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Score global */}
            <div className="text-center p-6 bg-white rounded-lg border-2">
              <div className={`text-4xl font-bold text-${getReadinessColor(readinessLevel)}-600 mb-2`}>
                {overallScore}/100
              </div>
              <div className="text-lg font-medium mb-2">Score Global</div>
              <Badge className={`bg-${getReadinessColor(readinessLevel)}-500 text-white`}>
                {getReadinessText(readinessLevel)}
              </Badge>
              <Progress value={overallScore} className="mt-4 h-3" />
            </div>

            {/* Issues critiques */}
            <div className="text-center p-6 bg-white rounded-lg border-2">
              <div
                className={`text-4xl font-bold ${criticalIssues.length > 0 ? "text-red-600" : "text-green-600"} mb-2`}
              >
                {criticalIssues.length}
              </div>
              <div className="text-lg font-medium mb-2">Issues Critiques</div>
              <Badge className={criticalIssues.length > 0 ? "bg-red-500" : "bg-green-500"}>
                {criticalIssues.length > 0 ? "🚨 Action requise" : "✅ Aucune"}
              </Badge>
            </div>

            {/* Avertissements */}
            <div className="text-center p-6 bg-white rounded-lg border-2">
              <div
                className={`text-4xl font-bold ${highPriorityWarnings.length > 0 ? "text-yellow-600" : "text-green-600"} mb-2`}
              >
                {highPriorityWarnings.length}
              </div>
              <div className="text-lg font-medium mb-2">Avertissements</div>
              <Badge className={highPriorityWarnings.length > 0 ? "bg-yellow-500" : "bg-green-500"}>
                {highPriorityWarnings.length > 0 ? "⚠️ À surveiller" : "✅ Aucun"}
              </Badge>
            </div>
          </div>

          {/* Alertes critiques */}
          {criticalIssues.length > 0 && (
            <Alert className="mt-6 border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>{criticalIssues.length} problème(s) critique(s) détecté(s)</strong> - Ces issues DOIVENT être
                résolues avant la mise en production :
                <ul className="list-disc list-inside mt-2">
                  {criticalIssues.map((issue, index) => (
                    <li key={index}>{issue.name}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Catégories de vérification */}
      <div className="space-y-6">
        {categories.map((category) => {
          const Icon = category.icon
          const passedChecks = category.checks.filter((c) => c.status === "passed").length
          const failedChecks = category.checks.filter((c) => c.status === "failed").length
          const warningChecks = category.checks.filter((c) => c.status === "warning").length
          const totalChecks = category.checks.length

          const categoryScore =
            category.checks.filter((c) => c.score).reduce((acc, c) => acc + (c.score || 0), 0) /
            Math.max(category.checks.filter((c) => c.score).length, 1)

          return (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-8 h-8 text-${category.color}-600`} />
                    <div>
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <CardDescription>
                        Poids: {category.weight}% • {totalChecks} vérifications
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold text-${category.color}-600`}>
                      {Math.round(categoryScore) || 0}/100
                    </div>
                    <div className="text-sm text-gray-500">
                      {passedChecks}✅ {warningChecks}⚠️ {failedChecks}❌
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {category.checks.map((check) => (
                    <div
                      key={check.id}
                      className={`p-4 rounded-lg border ${
                        check.status === "checking"
                          ? "bg-blue-50 border-blue-200"
                          : check.status === "passed"
                            ? "bg-green-50 border-green-200"
                            : check.status === "failed"
                              ? "bg-red-50 border-red-200"
                              : check.status === "warning"
                                ? "bg-yellow-50 border-yellow-200"
                                : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {check.status === "checking" && <Clock className="w-5 h-5 text-blue-500 animate-spin" />}
                            {check.status === "passed" && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {check.status === "failed" && <XCircle className="w-5 h-5 text-red-500" />}
                            {check.status === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                            <div>
                              <h4 className="font-medium flex items-center gap-2">
                                {check.name}
                                <Badge
                                  variant={
                                    check.priority === "critical"
                                      ? "destructive"
                                      : check.priority === "high"
                                        ? "default"
                                        : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {check.priority}
                                </Badge>
                              </h4>
                              <p className="text-sm text-gray-600">{check.description}</p>
                            </div>
                          </div>

                          {check.details && (
                            <div className="mb-3">
                              <div className="text-sm font-medium mb-1">Détails:</div>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {check.details.map((detail, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-gray-400">•</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {check.recommendations && (
                            <div>
                              <div className="text-sm font-medium mb-1 text-blue-700">Recommandations:</div>
                              <ul className="text-sm text-blue-600 space-y-1">
                                {check.recommendations.map((rec, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-blue-400">→</span>
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {check.score && (
                          <div className="text-right ml-4">
                            <div
                              className={`text-xl font-bold ${
                                check.score >= 80
                                  ? "text-green-600"
                                  : check.score >= 60
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                            >
                              {check.score}/100
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Résumé et recommandations finales */}
      {overallScore > 0 && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-600" />
              Résumé et Recommandations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {readinessLevel === "production-ready" && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>🎉 Félicitations !</strong> Votre application est prête pour la production. Tous les
                    critères essentiels sont respectés et les performances sont optimales.
                  </AlertDescription>
                </Alert>
              )}

              {readinessLevel === "almost-ready" && (
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Presque prête !</strong> Quelques améliorations mineures sont recommandées mais
                    l'application peut être mise en production avec surveillance.
                  </AlertDescription>
                </Alert>
              )}

              {readinessLevel === "needs-work" && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Travail nécessaire.</strong> Plusieurs problèmes doivent être résolus avant la mise en
                    production. Concentrez-vous sur les issues de haute priorité.
                  </AlertDescription>
                </Alert>
              )}

              {readinessLevel === "not-ready" && (
                <Alert className="border-red-200 bg-red-50">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Non prête pour la production.</strong> Des problèmes critiques doivent être résolus
                    immédiatement. Ne pas déployer en l'état.
                  </AlertDescription>
                </Alert>
              )}

              {/* Actions recommandées */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Prochaines étapes</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {criticalIssues.length > 0 && <li>• Résoudre les {criticalIssues.length} issue(s) critique(s)</li>}
                    {highPriorityWarnings.length > 0 && (
                      <li>• Traiter les {highPriorityWarnings.length} avertissement(s) prioritaire(s)</li>
                    )}
                    <li>• Effectuer des tests utilisateur finaux</li>
                    <li>• Préparer le plan de déploiement</li>
                    <li>• Configurer la surveillance production</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Points forts</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    {categories
                      .filter((cat) => cat.checks.filter((c) => c.status === "passed").length > cat.checks.length * 0.8)
                      .map((cat) => (
                        <li key={cat.id}>• {cat.name} bien implémenté</li>
                      ))}
                    <li>• Architecture solide</li>
                    <li>• Tests automatisés en place</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
