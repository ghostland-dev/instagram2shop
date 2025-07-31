"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Clock,
  Monitor,
  Smartphone,
  Tablet,
  Chrome,
  ChromeIcon as Firefox,
  AppleIcon as Safari,
  Download,
  Eye,
} from "lucide-react"
import { toast } from "sonner"

interface TestCase {
  id: string
  name: string
  description: string
  steps: string[]
  status: "pending" | "running" | "passed" | "failed"
  duration?: number
  error?: string
  screenshot?: string
}

interface TestSuite {
  id: string
  name: string
  description: string
  tests: TestCase[]
  browser: "chrome" | "firefox" | "safari"
  device: "desktop" | "mobile" | "tablet"
  status: "pending" | "running" | "passed" | "failed"
  progress: number
}

export function E2ETestRunner() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentSuite, setCurrentSuite] = useState<string | null>(null)
  const [currentTest, setCurrentTest] = useState<string | null>(null)

  const [testSuites, setTestSuites] = useState<TestSuite[]>([
    {
      id: "desktop-chrome",
      name: "Desktop Chrome",
      description: "Tests complets sur navigateur Chrome desktop",
      browser: "chrome",
      device: "desktop",
      status: "pending",
      progress: 0,
      tests: [
        {
          id: "landing-page",
          name: "Page d'accueil",
          description: "Test de la page d'accueil et navigation",
          steps: [
            "Charger la page d'accueil",
            "Vérifier le titre et les éléments principaux",
            "Tester les boutons CTA",
            "Vérifier la navigation",
          ],
          status: "pending",
        },
        {
          id: "signup-flow",
          name: "Inscription utilisateur",
          description: "Processus complet d'inscription",
          steps: [
            'Cliquer sur "S\'inscrire"',
            "Remplir le formulaire",
            "Soumettre l'inscription",
            "Vérifier la redirection",
          ],
          status: "pending",
        },
        {
          id: "onboarding",
          name: "Onboarding",
          description: "Processus d'onboarding complet",
          steps: ["Connexion Instagram", "Configuration boutique", "Finalisation setup", "Accès dashboard"],
          status: "pending",
        },
        {
          id: "dashboard-navigation",
          name: "Navigation dashboard",
          description: "Test de navigation dans le dashboard",
          steps: ["Accéder au dashboard", "Tester la sidebar", "Naviguer entre les pages", "Vérifier les données"],
          status: "pending",
        },
      ],
    },
    {
      id: "mobile-chrome",
      name: "Mobile Chrome",
      description: "Tests sur appareil mobile Chrome",
      browser: "chrome",
      device: "mobile",
      status: "pending",
      progress: 0,
      tests: [
        {
          id: "mobile-landing",
          name: "Page d'accueil mobile",
          description: "Test responsive de la landing page",
          steps: [
            "Charger en mode mobile",
            "Vérifier le menu hamburger",
            "Tester les interactions tactiles",
            "Vérifier l'affichage responsive",
          ],
          status: "pending",
        },
        {
          id: "mobile-shop",
          name: "Boutique mobile",
          description: "Test de la boutique sur mobile",
          steps: ["Accéder à la boutique", "Parcourir les produits", "Tester le panier", "Vérifier le checkout mobile"],
          status: "pending",
        },
      ],
    },
    {
      id: "tablet-safari",
      name: "Tablet Safari",
      description: "Tests sur tablette Safari",
      browser: "safari",
      device: "tablet",
      status: "pending",
      progress: 0,
      tests: [
        {
          id: "tablet-dashboard",
          name: "Dashboard tablette",
          description: "Test du dashboard sur tablette",
          steps: ["Connexion utilisateur", "Navigation dashboard", "Test des graphiques", "Interactions tactiles"],
          status: "pending",
        },
      ],
    },
  ])

  const runTestSuite = async (suiteId: string) => {
    const suite = testSuites.find((s) => s.id === suiteId)
    if (!suite) return

    setCurrentSuite(suiteId)
    setIsRunning(true)

    // Mettre à jour le statut de la suite
    setTestSuites((prev) => prev.map((s) => (s.id === suiteId ? { ...s, status: "running", progress: 0 } : s)))

    let passedTests = 0
    const totalTests = suite.tests.length

    for (let i = 0; i < suite.tests.length; i++) {
      const test = suite.tests[i]
      setCurrentTest(test.id)

      // Mettre à jour le statut du test
      setTestSuites((prev) =>
        prev.map((s) =>
          s.id === suiteId
            ? {
                ...s,
                tests: s.tests.map((t) => (t.id === test.id ? { ...t, status: "running" } : t)),
              }
            : s,
        ),
      )

      const startTime = Date.now()

      try {
        // Simuler l'exécution du test
        const success = await simulateTest(test, suite.browser, suite.device)
        const duration = Date.now() - startTime

        if (success) {
          passedTests++
          setTestSuites((prev) =>
            prev.map((s) =>
              s.id === suiteId
                ? {
                    ...s,
                    tests: s.tests.map((t) =>
                      t.id === test.id
                        ? {
                            ...t,
                            status: "passed",
                            duration,
                            screenshot: `/screenshots/${test.id}-${suite.device}-${suite.browser}.png`,
                          }
                        : t,
                    ),
                    progress: Math.round(((i + 1) / totalTests) * 100),
                  }
                : s,
            ),
          )
          toast.success(`✅ ${test.name} - Réussi`)
        } else {
          setTestSuites((prev) =>
            prev.map((s) =>
              s.id === suiteId
                ? {
                    ...s,
                    tests: s.tests.map((t) =>
                      t.id === test.id
                        ? {
                            ...t,
                            status: "failed",
                            duration,
                            error: "Test échoué - Élément non trouvé",
                            screenshot: `/screenshots/${test.id}-${suite.device}-${suite.browser}-error.png`,
                          }
                        : t,
                    ),
                    status: "failed",
                  }
                : s,
            ),
          )
          toast.error(`❌ ${test.name} - Échec`)
          break
        }
      } catch (error) {
        const duration = Date.now() - startTime
        setTestSuites((prev) =>
          prev.map((s) =>
            s.id === suiteId
              ? {
                  ...s,
                  tests: s.tests.map((t) =>
                    t.id === test.id
                      ? {
                          ...t,
                          status: "failed",
                          duration,
                          error: error instanceof Error ? error.message : "Erreur inconnue",
                        }
                      : t,
                  ),
                  status: "failed",
                }
              : s,
          ),
        )
        toast.error(`❌ ${test.name} - Erreur`)
        break
      }

      // Pause entre les tests
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    // Finaliser le statut de la suite
    const finalStatus = passedTests === totalTests ? "passed" : "failed"
    setTestSuites((prev) => prev.map((s) => (s.id === suiteId ? { ...s, status: finalStatus } : s)))

    setCurrentSuite(null)
    setCurrentTest(null)
    setIsRunning(false)

    if (finalStatus === "passed") {
      toast.success(`🎉 Suite "${suite.name}" terminée avec succès !`)
    } else {
      toast.error(`💥 Suite "${suite.name}" a échoué`)
    }
  }

  const simulateTest = async (test: TestCase, browser: string, device: string): Promise<boolean> => {
    // Simuler différentes durées selon le type de test
    const baseDuration = device === "mobile" ? 3000 : 2000
    const duration = baseDuration + Math.random() * 2000

    await new Promise((resolve) => setTimeout(resolve, duration))

    // Simuler un taux de succès de 90%
    return Math.random() > 0.1
  }

  const runAllSuites = async () => {
    for (const suite of testSuites) {
      await runTestSuite(suite.id)
      // Pause entre les suites
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }

  const getBrowserIcon = (browser: string) => {
    switch (browser) {
      case "chrome":
        return <Chrome className="w-4 h-4 text-blue-500" />
      case "firefox":
        return <Firefox className="w-4 h-4 text-orange-500" />
      case "safari":
        return <Safari className="w-4 h-4 text-blue-600" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "desktop":
        return <Monitor className="w-4 h-4" />
      case "mobile":
        return <Smartphone className="w-4 h-4" />
      case "tablet":
        return <Tablet className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Clock className="w-4 h-4 text-blue-500 animate-spin" />
      case "passed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const exportResults = () => {
    const results = {
      timestamp: new Date().toISOString(),
      suites: testSuites.map((suite) => ({
        id: suite.id,
        name: suite.name,
        browser: suite.browser,
        device: suite.device,
        status: suite.status,
        progress: suite.progress,
        tests: suite.tests.map((test) => ({
          id: test.id,
          name: test.name,
          status: test.status,
          duration: test.duration,
          error: test.error,
        })),
      })),
    }

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `e2e-test-results-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)

    toast.success("Résultats exportés !")
  }

  const totalTests = testSuites.reduce((acc, suite) => acc + suite.tests.length, 0)
  const passedTests = testSuites.reduce(
    (acc, suite) => acc + suite.tests.filter((test) => test.status === "passed").length,
    0,
  )
  const failedTests = testSuites.reduce(
    (acc, suite) => acc + suite.tests.filter((test) => test.status === "failed").length,
    0,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-6 h-6 text-green-600" />
                Tests End-to-End
              </CardTitle>
              <CardDescription>Tests automatisés cross-browser et multi-device</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={runAllSuites}
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

      {/* Test Suites */}
      <div className="space-y-6">
        {testSuites.map((suite) => (
          <Card
            key={suite.id}
            className={`${
              suite.status === "running"
                ? "border-blue-500 bg-blue-50/30"
                : suite.status === "passed"
                  ? "border-green-500 bg-green-50/30"
                  : suite.status === "failed"
                    ? "border-red-500 bg-red-50/30"
                    : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getDeviceIcon(suite.device)}
                    {getBrowserIcon(suite.browser)}
                    {suite.name}
                  </CardTitle>
                  <CardDescription>{suite.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      suite.status === "passed"
                        ? "default"
                        : suite.status === "failed"
                          ? "destructive"
                          : suite.status === "running"
                            ? "secondary"
                            : "outline"
                    }
                    className={
                      suite.status === "passed" ? "bg-green-500" : suite.status === "running" ? "bg-blue-500" : ""
                    }
                  >
                    {suite.status === "pending"
                      ? "En attente"
                      : suite.status === "running"
                        ? "En cours"
                        : suite.status === "passed"
                          ? "Réussi"
                          : "Échec"}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => runTestSuite(suite.id)}
                    disabled={isRunning}
                    className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                  >
                    {currentSuite === suite.id ? (
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
                </div>
              </div>
              {suite.status === "running" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span>{suite.progress}%</span>
                  </div>
                  <Progress value={suite.progress} className="h-2" />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {suite.tests.map((test, index) => (
                  <div
                    key={test.id}
                    className={`p-4 rounded-lg border ${
                      test.status === "running"
                        ? "bg-blue-50 border-blue-200"
                        : test.status === "passed"
                          ? "bg-green-50 border-green-200"
                          : test.status === "failed"
                            ? "bg-red-50 border-red-200"
                            : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(test.status)}
                          <h4 className="font-medium">{test.name}</h4>
                          {test.duration && <span className="text-xs text-gray-500">{test.duration}ms</span>}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{test.description}</p>

                        {test.error && <div className="text-sm text-red-600 mb-2">❌ {test.error}</div>}

                        <div className="text-xs text-gray-500">
                          <strong>Étapes:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {test.steps.map((step, stepIndex) => (
                              <li key={stepIndex}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {test.screenshot && (
                        <Button variant="outline" size="sm" className="ml-4 bg-transparent">
                          <Eye className="w-4 h-4 mr-2" />
                          Screenshot
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Test en cours */}
      {currentSuite && currentTest && (
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
                <div className="font-medium">{testSuites.find((s) => s.id === currentSuite)?.name}</div>
                <div className="text-sm text-gray-600">
                  Test: {testSuites.find((s) => s.id === currentSuite)?.tests.find((t) => t.id === currentTest)?.name}
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
