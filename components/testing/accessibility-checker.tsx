"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  Volume2,
  Keyboard,
  MousePointer,
  Contrast,
  Type,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  RefreshCw,
} from "lucide-react"
import { toast } from "sonner"

interface AccessibilityIssue {
  id: string
  type: "error" | "warning" | "info"
  category: string
  element: string
  description: string
  impact: "critical" | "serious" | "moderate" | "minor"
  wcagLevel: "A" | "AA" | "AAA"
  suggestion: string
}

export function AccessibilityChecker() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [issues, setIssues] = useState<AccessibilityIssue[]>([])
  const [activeTab, setActiveTab] = useState("overview")

  // Simulation d'issues d'accessibilité
  const mockIssues: AccessibilityIssue[] = [
    {
      id: "1",
      type: "error",
      category: "Images",
      element: "img.product-image",
      description: "Image sans attribut alt",
      impact: "critical",
      wcagLevel: "A",
      suggestion: "Ajoutez un attribut alt descriptif à toutes les images",
    },
    {
      id: "2",
      type: "warning",
      category: "Contraste",
      element: ".text-gray-400",
      description: "Contraste insuffisant (3.2:1)",
      impact: "serious",
      wcagLevel: "AA",
      suggestion: "Utilisez une couleur plus foncée pour atteindre un ratio de 4.5:1",
    },
    {
      id: "3",
      type: "error",
      category: "Navigation",
      element: "button.menu-toggle",
      description: "Bouton sans label accessible",
      impact: "serious",
      wcagLevel: "A",
      suggestion: "Ajoutez un aria-label ou un texte visible pour les lecteurs d'écran",
    },
    {
      id: "4",
      type: "warning",
      category: "Formulaires",
      element: "input#email",
      description: "Champ sans label associé",
      impact: "moderate",
      wcagLevel: "A",
      suggestion: "Associez le label au champ avec l'attribut for ou utilisez aria-labelledby",
    },
    {
      id: "5",
      type: "info",
      category: "Structure",
      element: "main",
      description: "Hiérarchie des titres non séquentielle",
      impact: "minor",
      wcagLevel: "AA",
      suggestion: "Utilisez les titres h1, h2, h3... dans l'ordre hiérarchique",
    },
    {
      id: "6",
      type: "error",
      category: "Clavier",
      element: ".dropdown-menu",
      description: "Élément non accessible au clavier",
      impact: "critical",
      wcagLevel: "A",
      suggestion: "Ajoutez la gestion des événements clavier (Enter, Escape, flèches)",
    },
  ]

  const runAccessibilityScan = async () => {
    setIsScanning(true)
    setScanProgress(0)
    setIssues([])

    toast.info("Démarrage du scan d'accessibilité...")

    // Simulation du scan avec progression
    for (let i = 0; i <= 100; i += 10) {
      setScanProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    // Ajouter les issues progressivement
    for (let i = 0; i < mockIssues.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      setIssues((prev) => [...prev, mockIssues[i]])
    }

    setIsScanning(false)
    toast.success(`Scan terminé ! ${mockIssues.length} problèmes détectés.`)
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "info":
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "critical":
        return "bg-red-500 text-white"
      case "serious":
        return "bg-orange-500 text-white"
      case "moderate":
        return "bg-yellow-500 text-white"
      case "minor":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Images":
        return <Eye className="w-4 h-4" />
      case "Contraste":
        return <Contrast className="w-4 h-4" />
      case "Navigation":
        return <MousePointer className="w-4 h-4" />
      case "Formulaires":
        return <Type className="w-4 h-4" />
      case "Clavier":
        return <Keyboard className="w-4 h-4" />
      case "Audio":
        return <Volume2 className="w-4 h-4" />
      default:
        return <CheckCircle className="w-4 h-4" />
    }
  }

  const errorCount = issues.filter((i) => i.type === "error").length
  const warningCount = issues.filter((i) => i.type === "warning").length
  const infoCount = issues.filter((i) => i.type === "info").length

  const getAccessibilityScore = () => {
    if (issues.length === 0) return 100
    const criticalIssues = issues.filter((i) => i.impact === "critical").length
    const seriousIssues = issues.filter((i) => i.impact === "serious").length
    const moderateIssues = issues.filter((i) => i.impact === "moderate").length
    const minorIssues = issues.filter((i) => i.impact === "minor").length

    const penalty = criticalIssues * 25 + seriousIssues * 15 + moderateIssues * 10 + minorIssues * 5
    return Math.max(0, 100 - penalty)
  }

  const accessibilityScore = getAccessibilityScore()

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-6 h-6 text-blue-600" />
                Vérificateur d'accessibilité
              </CardTitle>
              <CardDescription>Analyse automatique de l'accessibilité selon les standards WCAG</CardDescription>
            </div>
            <Button
              onClick={runAccessibilityScan}
              disabled={isScanning}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Scan en cours...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Lancer le scan
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        {isScanning && (
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyse en cours...</span>
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Statistiques */}
      {issues.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div
                className={`text-3xl font-bold ${
                  accessibilityScore >= 90
                    ? "text-green-600"
                    : accessibilityScore >= 70
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {accessibilityScore}
              </div>
              <div className="text-sm text-gray-600">Score global</div>
              <Progress value={accessibilityScore} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600">{errorCount}</div>
              <div className="text-sm text-gray-600">Erreurs</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
              <div className="text-sm text-gray-600">Avertissements</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{infoCount}</div>
              <div className="text-sm text-gray-600">Informations</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-600">{issues.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Détails des problèmes */}
      {issues.length > 0 && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="errors">Erreurs ({errorCount})</TabsTrigger>
            <TabsTrigger value="warnings">Avertissements ({warningCount})</TabsTrigger>
            <TabsTrigger value="info">Informations ({infoCount})</TabsTrigger>
            <TabsTrigger value="categories">Par catégorie</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-4">
              {issues.map((issue) => (
                <Card key={issue.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getIssueIcon(issue.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{issue.description}</h4>
                            <Badge className={getImpactColor(issue.impact)}>{issue.impact}</Badge>
                            <Badge variant="outline">WCAG {issue.wcagLevel}</Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>Élément:</strong> <code className="bg-gray-100 px-1 rounded">{issue.element}</code>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>Catégorie:</strong> {issue.category}
                          </div>
                          <div className="text-sm text-blue-600">
                            <strong>Solution:</strong> {issue.suggestion}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="errors">
            <div className="space-y-4">
              {issues
                .filter((i) => i.type === "error")
                .map((issue) => (
                  <Card key={issue.id} className="border-red-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-red-800 mb-2">{issue.description}</h4>
                          <div className="text-sm text-gray-600 mb-2">
                            <code className="bg-red-50 px-2 py-1 rounded">{issue.element}</code>
                          </div>
                          <div className="text-sm text-red-600">{issue.suggestion}</div>
                        </div>
                        <Badge className="bg-red-500 text-white">{issue.impact}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="warnings">
            <div className="space-y-4">
              {issues
                .filter((i) => i.type === "warning")
                .map((issue) => (
                  <Card key={issue.id} className="border-yellow-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-yellow-800 mb-2">{issue.description}</h4>
                          <div className="text-sm text-gray-600 mb-2">
                            <code className="bg-yellow-50 px-2 py-1 rounded">{issue.element}</code>
                          </div>
                          <div className="text-sm text-yellow-600">{issue.suggestion}</div>
                        </div>
                        <Badge className="bg-yellow-500 text-white">{issue.impact}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="info">
            <div className="space-y-4">
              {issues
                .filter((i) => i.type === "info")
                .map((issue) => (
                  <Card key={issue.id} className="border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-800 mb-2">{issue.description}</h4>
                          <div className="text-sm text-gray-600 mb-2">
                            <code className="bg-blue-50 px-2 py-1 rounded">{issue.element}</code>
                          </div>
                          <div className="text-sm text-blue-600">{issue.suggestion}</div>
                        </div>
                        <Badge className="bg-blue-500 text-white">{issue.impact}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from(new Set(issues.map((i) => i.category))).map((category) => {
                const categoryIssues = issues.filter((i) => i.category === category)
                return (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {getCategoryIcon(category)}
                        {category}
                      </CardTitle>
                      <CardDescription>
                        {categoryIssues.length} problème{categoryIssues.length > 1 ? "s" : ""} détecté
                        {categoryIssues.length > 1 ? "s" : ""}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {categoryIssues.map((issue) => (
                          <div key={issue.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              {getIssueIcon(issue.type)}
                              <span className="text-sm">{issue.description}</span>
                            </div>
                            <Badge className={getImpactColor(issue.impact)} variant="secondary">
                              {issue.impact}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Recommandations générales */}
      {issues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommandations d'amélioration</CardTitle>
            <CardDescription>Actions prioritaires pour améliorer l'accessibilité</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">🚨 Actions critiques</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Ajoutez des attributs alt à toutes les images</li>
                  <li>• Assurez-vous que tous les éléments interactifs sont accessibles au clavier</li>
                  <li>• Fournissez des labels appropriés pour tous les contrôles de formulaire</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">⚠️ Améliorations importantes</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Améliorez le contraste des couleurs (ratio minimum 4.5:1)</li>
                  <li>• Utilisez une hiérarchie de titres logique</li>
                  <li>• Ajoutez des descriptions ARIA pour les éléments complexes</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">💡 Bonnes pratiques</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Testez régulièrement avec des lecteurs d'écran</li>
                  <li>• Implémentez la navigation au clavier dans tous les composants</li>
                  <li>• Utilisez des couleurs ET des icônes pour transmettre l'information</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* État initial */}
      {issues.length === 0 && !isScanning && (
        <Card>
          <CardContent className="py-12 text-center">
            <Eye className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun scan effectué</h3>
            <p className="text-gray-500 mb-6">
              Lancez un scan d'accessibilité pour identifier les problèmes potentiels
            </p>
            <Button
              onClick={runAccessibilityScan}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Play className="w-4 h-4 mr-2" />
              Démarrer le scan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
