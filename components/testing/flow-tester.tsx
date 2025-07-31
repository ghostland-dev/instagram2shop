"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, CheckCircle, XCircle, Clock, AlertTriangle, RotateCcw, Download } from "lucide-react"
import { toast } from "sonner"

interface TestStep {
  id: string
  name: string
  description: string
  action: () => Promise<boolean>
  status: "pending" | "running" | "passed" | "failed" | "skipped"
  duration?: number
  error?: string
}

interface TestFlow {
  id: string
  name: string
  description: string
  steps: TestStep[]
  status: "pending" | "running" | "passed" | "failed"
  progress: number
}

export function FlowTester() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentFlow, setCurrentFlow] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<Record<string, any>>({})

  // Simulation des actions de test
  const simulateUserAction = async (action: string, duration = 1000): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, duration))
    // Simuler un taux de succès de 95%
    return Math.random() > 0.05
  }

  const [testFlows, setTestFlows] = useState<TestFlow[]>([
    {
      id: "onboarding",
      name: "Parcours d'inscription complet",
      description: "Test du flux d'inscription depuis la landing page jusqu'au dashboard",
      progress: 0,
      status: "pending",
      steps: [
        {
          id: "landing-visit",
          name: "Visite landing page",
          description: "Vérifier le chargement de la page d'accueil",
          action: () => simulateUserAction("visit-landing"),
          status: "pending",
        },
        {
          id: "signup-click",
          name: "Clic inscription",
          description: 'Cliquer sur le bouton "Commencer"',
          action: () => simulateUserAction("click-signup"),
          status: "pending",
        },
        {
          id: "form-fill",
          name: "Remplissage formulaire",
          description: "Remplir le formulaire d'inscription",
          action: () => simulateUserAction("fill-form", 2000),
          status: "pending",
        },
        {
          id: "form-submit",
          name: "Soumission formulaire",
          description: "Soumettre le formulaire d'inscription",
          action: () => simulateUserAction("submit-form"),
          status: "pending",
        },
        {
          id: "onboarding-start",
          name: "Début onboarding",
          description: "Redirection vers la page d'onboarding",
          action: () => simulateUserAction("start-onboarding"),
          status: "pending",
        },
        {
          id: "instagram-connect",
          name: "Connexion Instagram",
          description: "Connecter le compte Instagram",
          action: () => simulateUserAction("connect-instagram", 3000),
          status: "pending",
        },
        {
          id: "shopify-create",
          name: "Création boutique",
          description: "Créer la boutique Shopify",
          action: () => simulateUserAction("create-shop", 4000),
          status: "pending",
        },
        {
          id: "dashboard-redirect",
          name: "Redirection dashboard",
          description: "Accéder au dashboard principal",
          action: () => simulateUserAction("redirect-dashboard"),
          status: "pending",
        },
      ],
    },
    {
      id: "product-management",
      name: "Gestion des produits",
      description: "Test des fonctionnalités de gestion des produits",
      progress: 0,
      status: "pending",
      steps: [
        {
          id: "dashboard-access",
          name: "Accès dashboard",
          description: "Naviguer vers le dashboard",
          action: () => simulateUserAction("access-dashboard"),
          status: "pending",
        },
        {
          id: "instagram-scan",
          name: "Scan Instagram",
          description: "Lancer le scan des posts Instagram",
          action: () => simulateUserAction("scan-instagram", 5000),
          status: "pending",
        },
        {
          id: "products-view",
          name: "Visualisation produits",
          description: "Voir les produits détectés",
          action: () => simulateUserAction("view-products"),
          status: "pending",
        },
        {
          id: "product-edit",
          name: "Modification produit",
          description: "Modifier les détails d'un produit",
          action: () => simulateUserAction("edit-product", 2000),
          status: "pending",
        },
        {
          id: "shopify-sync",
          name: "Synchronisation Shopify",
          description: "Synchroniser avec la boutique Shopify",
          action: () => simulateUserAction("sync-shopify", 3000),
          status: "pending",
        },
      ],
    },
    {
      id: "sales-flow",
      name: "Processus de vente",
      description: "Test du parcours d'achat client",
      progress: 0,
      status: "pending",
      steps: [
        {
          id: "shop-visit",
          name: "Visite boutique",
          description: "Accéder à la boutique publique",
          action: () => simulateUserAction("visit-shop"),
          status: "pending",
        },
        {
          id: "product-browse",
          name: "Navigation produits",
          description: "Parcourir les produits disponibles",
          action: () => simulateUserAction("browse-products", 2000),
          status: "pending",
        },
        {
          id: "add-to-cart",
          name: "Ajout panier",
          description: "Ajouter des produits au panier",
          action: () => simulateUserAction("add-to-cart"),
          status: "pending",
        },
        {
          id: "checkout-process",
          name: "Processus commande",
          description: "Procéder au checkout",
          action: () => simulateUserAction("checkout", 4000),
          status: "pending",
        },
        {
          id: "payment-process",
          name: "Paiement",
          description: "Traitement du paiement",
          action: () => simulateUserAction("payment", 3000),
          status: "pending",
        },
        {
          id: "order-confirmation",
          name: "Confirmation commande",
          description: "Confirmation de la commande",
          action: () => simulateUserAction("order-confirmation"),
          status: "pending",
        },
      ],
    },
    {
      id: "analytics-reporting",
      name: "Analytics et rapports",
      description: "Test des fonctionnalités d'analyse",
      progress: 0,
      status: "pending",
      steps: [
        {
          id: "analytics-access",
          name: "Accès analytics",
          description: "Naviguer vers la page analytics",
          action: () => simulateUserAction("access-analytics"),
          status: "pending",
        },
        {
          id: "data-refresh",
          name: "Actualisation données",
          description: "Actualiser les données analytics",
          action: () => simulateUserAction("refresh-data", 3000),
          status: "pending",
        },
        {
          id: "period-change",
          name: "Changement période",
          description: "Changer la période d'analyse",
          action: () => simulateUserAction("change-period"),
          status: "pending",
        },
        {
          id: "export-data",
          name: "Export données",
          description: "Exporter les données en CSV",
          action: () => simulateUserAction("export-data", 2000),
          status: "pending",
        },
        {
          id: "view-details",
          name: "Détails produits",
          description: "Voir les détails par produit",
          action: () => simulateUserAction("view-details"),
          status: "pending",
        },
      ],
    },
    {
      id: "settings-management",
      name: "Gestion des paramètres",
      description: "Test de la configuration utilisateur",
      progress: 0,
      status: "pending",
      steps: [
        {
          id: "settings-access",
          name: "Accès paramètres",
          description: "Naviguer vers les paramètres",
          action: () => simulateUserAction("access-settings"),
          status: "pending",
        },
        {
          id: "profile-update",
          name: "Mise à jour profil",
          description: "Modifier les informations du profil",
          action: () => simulateUserAction("update-profile", 2000),
          status: "pending",
        },
        {
          id: "notifications-config",
          name: "Configuration notifications",
          description: "Configurer les préférences de notification",
          action: () => simulateUserAction("config-notifications"),
          status: "pending",
        },
        {
          id: "integrations-manage",
          name: "Gestion intégrations",
          description: "Gérer les intégrations externes",
          action: () => simulateUserAction("manage-integrations", 3000),
          status: "pending",
        },
        {
          id: "privacy-settings",
          name: "Paramètres confidentialité",
          description: "Configurer la confidentialité",
          action: () => simulateUserAction("privacy-settings"),
          status: "pending",
        },
      ],
    },
    {
      id: "support-flow",
      name: "Support client",
      description: "Test du système de support",
      progress: 0,
      status: "pending",
      steps: [
        {
          id: "support-access",
          name: "Accès support",
          description: "Naviguer vers le support",
          action: () => simulateUserAction("access-support"),
          status: "pending",
        },
        {
          id: "faq-search",
          name: "Recherche FAQ",
          description: "Rechercher dans la FAQ",
          action: () => simulateUserAction("search-faq"),
          status: "pending",
        },
        {
          id: "ticket-create",
          name: "Création ticket",
          description: "Créer un ticket de support",
          action: () => simulateUserAction("create-ticket", 2000),
          status: "pending",
        },
        {
          id: "ticket-submit",
          name: "Soumission ticket",
          description: "Soumettre le ticket",
          action: () => simulateUserAction("submit-ticket"),
          status: "pending",
        },
        {
          id: "tickets-view",
          name: "Visualisation tickets",
          description: "Voir les tickets existants",
          action: () => simulateUserAction("view-tickets"),
          status: "pending",
        },
      ],
    },
  ])

  const runSingleFlow = async (flowId: string) => {
    const flow = testFlows.find((f) => f.id === flowId)
    if (!flow) return

    setCurrentFlow(flowId)
    setIsRunning(true)

    // Mettre à jour le statut du flow
    setTestFlows((prev) => prev.map((f) => (f.id === flowId ? { ...f, status: "running", progress: 0 } : f)))

    let passedSteps = 0
    const totalSteps = flow.steps.length

    for (let i = 0; i < flow.steps.length; i++) {
      const step = flow.steps[i]
      setCurrentStep(step.id)

      // Mettre à jour le statut de l'étape
      setTestFlows((prev) =>
        prev.map((f) =>
          f.id === flowId
            ? {
                ...f,
                steps: f.steps.map((s) => (s.id === step.id ? { ...s, status: "running" } : s)),
              }
            : f,
        ),
      )

      const startTime = Date.now()

      try {
        const success = await step.action()
        const duration = Date.now() - startTime

        if (success) {
          passedSteps++
          setTestFlows((prev) =>
            prev.map((f) =>
              f.id === flowId
                ? {
                    ...f,
                    steps: f.steps.map((s) => (s.id === step.id ? { ...s, status: "passed", duration } : s)),
                    progress: Math.round((passedSteps / totalSteps) * 100),
                  }
                : f,
            ),
          )
          toast.success(`✅ ${step.name} - Réussi`)
        } else {
          setTestFlows((prev) =>
            prev.map((f) =>
              f.id === flowId
                ? {
                    ...f,
                    steps: f.steps.map((s) =>
                      s.id === step.id ? { ...s, status: "failed", duration, error: "Test échoué" } : s,
                    ),
                    status: "failed",
                  }
                : f,
            ),
          )
          toast.error(`❌ ${step.name} - Échec`)
          break
        }
      } catch (error) {
        const duration = Date.now() - startTime
        setTestFlows((prev) =>
          prev.map((f) =>
            f.id === flowId
              ? {
                  ...f,
                  steps: f.steps.map((s) =>
                    s.id === step.id
                      ? {
                          ...s,
                          status: "failed",
                          duration,
                          error: error instanceof Error ? error.message : "Erreur inconnue",
                        }
                      : s,
                  ),
                  status: "failed",
                }
              : f,
          ),
        )
        toast.error(`❌ ${step.name} - Erreur`)
        break
      }

      // Petite pause entre les étapes
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    // Finaliser le statut du flow
    const finalStatus = passedSteps === totalSteps ? "passed" : "failed"
    setTestFlows((prev) => prev.map((f) => (f.id === flowId ? { ...f, status: finalStatus } : f)))

    setCurrentFlow(null)
    setCurrentStep(null)
    setIsRunning(false)

    if (finalStatus === "passed") {
      toast.success(`🎉 Flow "${flow.name}" terminé avec succès !`)
    } else {
      toast.error(`💥 Flow "${flow.name}" a échoué`)
    }
  }

  const runAllFlows = async () => {
    for (const flow of testFlows) {
      await runSingleFlow(flow.id)
      // Pause entre les flows
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  const resetFlow = (flowId: string) => {
    setTestFlows((prev) =>
      prev.map((f) =>
        f.id === flowId
          ? {
              ...f,
              status: "pending",
              progress: 0,
              steps: f.steps.map((s) => ({ ...s, status: "pending", duration: undefined, error: undefined })),
            }
          : f,
      ),
    )
    toast.info(`Flow "${testFlows.find((f) => f.id === flowId)?.name}" réinitialisé`)
  }

  const resetAllFlows = () => {
    setTestFlows((prev) =>
      prev.map((f) => ({
        ...f,
        status: "pending",
        progress: 0,
        steps: f.steps.map((s) => ({ ...s, status: "pending", duration: undefined, error: undefined })),
      })),
    )
    toast.info("Tous les flows réinitialisés")
  }

  const exportResults = () => {
    const results = {
      timestamp: new Date().toISOString(),
      flows: testFlows.map((flow) => ({
        id: flow.id,
        name: flow.name,
        status: flow.status,
        progress: flow.progress,
        steps: flow.steps.map((step) => ({
          id: step.id,
          name: step.name,
          status: step.status,
          duration: step.duration,
          error: step.error,
        })),
      })),
    }

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `test-results-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)

    toast.success("Résultats exportés !")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Clock className="w-4 h-4 text-blue-500 animate-spin" />
      case "passed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "skipped":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-blue-500">En cours</Badge>
      case "passed":
        return <Badge className="bg-green-500">Réussi</Badge>
      case "failed":
        return <Badge className="bg-red-500">Échec</Badge>
      case "skipped":
        return <Badge className="bg-yellow-500">Ignoré</Badge>
      default:
        return <Badge variant="secondary">En attente</Badge>
    }
  }

  const totalTests = testFlows.reduce((acc, flow) => acc + flow.steps.length, 0)
  const passedTests = testFlows.reduce(
    (acc, flow) => acc + flow.steps.filter((step) => step.status === "passed").length,
    0,
  )
  const failedTests = testFlows.reduce(
    (acc, flow) => acc + flow.steps.filter((step) => step.status === "failed").length,
    0,
  )

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-6 h-6 text-blue-600" />
                Testeur de flux utilisateur
              </CardTitle>
              <CardDescription>Tests automatisés de tous les parcours utilisateur de A à Z</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={runAllFlows}
                disabled={isRunning}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Tests en cours...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Lancer tous les tests
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetAllFlows} disabled={isRunning}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Réinitialiser
              </Button>
              <Button variant="outline" onClick={exportResults}>
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalTests}</div>
              <div className="text-sm text-gray-600">Tests totaux</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{passedTests}</div>
              <div className="text-sm text-gray-600">Réussis</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{failedTests}</div>
              <div className="text-sm text-gray-600">Échoués</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0}%
              </div>
              <div className="text-sm text-gray-600">Taux de réussite</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des flows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testFlows.map((flow) => (
          <Card
            key={flow.id}
            className={`${
              flow.status === "running"
                ? "border-blue-500 bg-blue-50/30"
                : flow.status === "passed"
                  ? "border-green-500 bg-green-50/30"
                  : flow.status === "failed"
                    ? "border-red-500 bg-red-50/30"
                    : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(flow.status)}
                    {flow.name}
                  </CardTitle>
                  <CardDescription>{flow.description}</CardDescription>
                </div>
                {getStatusBadge(flow.status)}
              </div>
              {flow.status === "running" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span>{flow.progress}%</span>
                  </div>
                  <Progress value={flow.progress} className="h-2" />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {flow.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      step.status === "running"
                        ? "bg-blue-50 border-blue-200"
                        : step.status === "passed"
                          ? "bg-green-50 border-green-200"
                          : step.status === "failed"
                            ? "bg-red-50 border-red-200"
                            : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white border text-xs font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{step.name}</div>
                        <div className="text-xs text-gray-500">{step.description}</div>
                        {step.error && <div className="text-xs text-red-600 mt-1">❌ {step.error}</div>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {step.duration && <span className="text-xs text-gray-500">{step.duration}ms</span>}
                      {getStatusIcon(step.status)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <Button
                  size="sm"
                  onClick={() => runSingleFlow(flow.id)}
                  disabled={isRunning}
                  className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                >
                  {currentFlow === flow.id ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      En cours...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Lancer
                    </>
                  )}
                </Button>
                <Button size="sm" variant="outline" onClick={() => resetFlow(flow.id)} disabled={isRunning}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <div className="ml-auto text-sm text-gray-500">
                  {flow.steps.filter((s) => s.status === "passed").length}/{flow.steps.length} étapes
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Détails du test en cours */}
      {currentFlow && currentStep && (
        <Card className="border-blue-500 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600 animate-spin" />
              Test en cours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div>
                <div className="font-medium">{testFlows.find((f) => f.id === currentFlow)?.name}</div>
                <div className="text-sm text-gray-600">
                  Étape: {testFlows.find((f) => f.id === currentFlow)?.steps.find((s) => s.id === currentStep)?.name}
                </div>
              </div>
              <div className="ml-auto">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
