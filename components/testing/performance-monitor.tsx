"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Activity, Zap, Clock, Smartphone, Monitor, Wifi, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"

interface PerformanceMetric {
  name: string
  value: number
  unit: string
  status: "good" | "needs-improvement" | "poor"
  threshold: { good: number; poor: number }
}

export function PerformanceMonitor() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([
    {
      name: "First Contentful Paint",
      value: 0,
      unit: "ms",
      status: "good",
      threshold: { good: 1800, poor: 3000 },
    },
    {
      name: "Largest Contentful Paint",
      value: 0,
      unit: "ms",
      status: "good",
      threshold: { good: 2500, poor: 4000 },
    },
    {
      name: "First Input Delay",
      value: 0,
      unit: "ms",
      status: "good",
      threshold: { good: 100, poor: 300 },
    },
    {
      name: "Cumulative Layout Shift",
      value: 0,
      unit: "",
      status: "good",
      threshold: { good: 0.1, poor: 0.25 },
    },
    {
      name: "Time to Interactive",
      value: 0,
      unit: "ms",
      status: "good",
      threshold: { good: 3800, poor: 7300 },
    },
    {
      name: "Total Blocking Time",
      value: 0,
      unit: "ms",
      status: "good",
      threshold: { good: 200, poor: 600 },
    },
  ])

  const [deviceMetrics, setDeviceMetrics] = useState({
    memory: 0,
    connection: "unknown",
    deviceType: "desktop",
  })

  useEffect(() => {
    // Simuler la collecte de métriques de performance
    if (isMonitoring) {
      const interval = setInterval(() => {
        setMetrics((prev) =>
          prev.map((metric) => {
            const randomValue = Math.random()
            let newValue: number

            switch (metric.name) {
              case "First Contentful Paint":
                newValue = 800 + randomValue * 2000
                break
              case "Largest Contentful Paint":
                newValue = 1200 + randomValue * 3000
                break
              case "First Input Delay":
                newValue = randomValue * 200
                break
              case "Cumulative Layout Shift":
                newValue = randomValue * 0.3
                break
              case "Time to Interactive":
                newValue = 2000 + randomValue * 4000
                break
              case "Total Blocking Time":
                newValue = randomValue * 800
                break
              default:
                newValue = randomValue * 1000
            }

            const status =
              newValue <= metric.threshold.good
                ? "good"
                : newValue <= metric.threshold.poor
                  ? "needs-improvement"
                  : "poor"

            return { ...metric, value: Math.round(newValue), status }
          }),
        )

        // Simuler les métriques de l'appareil
        setDeviceMetrics({
          memory: Math.round((4 + Math.random() * 12) * 100) / 100,
          connection: ["4g", "3g", "wifi", "slow-2g"][Math.floor(Math.random() * 4)],
          deviceType: ["desktop", "mobile", "tablet"][Math.floor(Math.random() * 3)],
        })
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isMonitoring])

  const startMonitoring = () => {
    setIsMonitoring(true)
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600 bg-green-100"
      case "needs-improvement":
        return "text-yellow-600 bg-yellow-100"
      case "poor":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "needs-improvement":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "poor":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getPerformanceScore = () => {
    const goodMetrics = metrics.filter((m) => m.status === "good").length
    const totalMetrics = metrics.length
    return Math.round((goodMetrics / totalMetrics) * 100)
  }

  const performanceScore = getPerformanceScore()

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-600" />
                Monitoring des performances
              </CardTitle>
              <CardDescription>Surveillance en temps réel des métriques de performance</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {isMonitoring ? (
                <Button onClick={stopMonitoring} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Arrêter
                </Button>
              ) : (
                <Button
                  onClick={startMonitoring}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Démarrer
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{performanceScore}</div>
              <div className="text-sm text-gray-600">Score global</div>
              <Progress value={performanceScore} className="mt-2 h-2" />
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {metrics.filter((m) => m.status === "good").length}
              </div>
              <div className="text-sm text-gray-600">Métriques bonnes</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {metrics.filter((m) => m.status === "needs-improvement").length}
              </div>
              <div className="text-sm text-gray-600">À améliorer</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{metrics.filter((m) => m.status === "poor").length}</div>
              <div className="text-sm text-gray-600">Problématiques</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métriques détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{metric.name}</CardTitle>
                {getStatusIcon(metric.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold">
                    {metric.value.toFixed(metric.name === "Cumulative Layout Shift" ? 3 : 0)}
                  </span>
                  <span className="text-gray-500 text-sm">{metric.unit}</span>
                </div>

                <Badge className={getStatusColor(metric.status)}>
                  {metric.status === "good"
                    ? "Bon"
                    : metric.status === "needs-improvement"
                      ? "À améliorer"
                      : "Problématique"}
                </Badge>

                <div className="text-xs text-gray-500">
                  <div>
                    Bon: &lt;= {metric.threshold.good}
                    {metric.unit}
                  </div>
                  <div>
                    Problématique: &gt; {metric.threshold.poor}
                    {metric.unit}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Informations sur l'appareil */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Informations de l'appareil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Monitor className="w-8 h-8 text-gray-600" />
              <div>
                <div className="font-medium">Type d'appareil</div>
                <div className="text-sm text-gray-600 capitalize">{deviceMetrics.deviceType}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Zap className="w-8 h-8 text-gray-600" />
              <div>
                <div className="font-medium">Mémoire</div>
                <div className="text-sm text-gray-600">{deviceMetrics.memory} GB</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Wifi className="w-8 h-8 text-gray-600" />
              <div>
                <div className="font-medium">Connexion</div>
                <div className="text-sm text-gray-600 uppercase">{deviceMetrics.connection}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommandations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommandations d'optimisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics
              .filter((m) => m.status !== "good")
              .map((metric, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="font-medium">{metric.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {metric.name === "First Contentful Paint" &&
                          "Optimisez le chargement des ressources critiques et réduisez la taille des fichiers CSS/JS."}
                        {metric.name === "Largest Contentful Paint" &&
                          "Optimisez les images et utilisez un CDN pour améliorer le temps de chargement."}
                        {metric.name === "First Input Delay" &&
                          "Réduisez le JavaScript bloquant et utilisez le code splitting."}
                        {metric.name === "Cumulative Layout Shift" &&
                          "Définissez des dimensions explicites pour les images et évitez l'injection de contenu."}
                        {metric.name === "Time to Interactive" &&
                          "Réduisez le JavaScript non critique et optimisez les ressources tierces."}
                        {metric.name === "Total Blocking Time" &&
                          "Divisez les tâches longues et optimisez l'exécution JavaScript."}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {metrics.every((m) => m.status === "good") && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">Excellentes performances !</div>
                    <div className="text-sm text-green-600">Toutes vos métriques sont dans les seuils recommandés.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
