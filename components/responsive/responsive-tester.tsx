"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RotateCcw, Smartphone, Tablet, Monitor, Tv } from "lucide-react"

interface Device {
  name: string
  width: number
  height: number
  category: "mobile" | "tablet" | "desktop" | "large"
}

const devices: Device[] = [
  // Mobile
  { name: "iPhone SE", width: 375, height: 667, category: "mobile" },
  { name: "iPhone 12/13/14", width: 390, height: 844, category: "mobile" },
  { name: "iPhone 14 Plus", width: 428, height: 926, category: "mobile" },
  { name: "iPhone 14 Pro Max", width: 430, height: 932, category: "mobile" },
  { name: "Samsung Galaxy S21", width: 384, height: 854, category: "mobile" },
  { name: "Google Pixel 6", width: 393, height: 851, category: "mobile" },

  // Tablet
  { name: "iPad Mini", width: 768, height: 1024, category: "tablet" },
  { name: "iPad", width: 820, height: 1180, category: "tablet" },
  { name: "iPad Air", width: 834, height: 1194, category: "tablet" },
  { name: 'iPad Pro 11"', width: 834, height: 1194, category: "tablet" },
  { name: 'iPad Pro 12.9"', width: 1024, height: 1366, category: "tablet" },
  { name: "Samsung Galaxy Tab", width: 800, height: 1280, category: "tablet" },

  // Desktop
  { name: "MacBook Air", width: 1280, height: 832, category: "desktop" },
  { name: 'MacBook Pro 13"', width: 1440, height: 900, category: "desktop" },
  { name: 'MacBook Pro 16"', width: 1728, height: 1117, category: "desktop" },
  { name: "Desktop 1080p", width: 1920, height: 1080, category: "desktop" },
  { name: "Desktop 1440p", width: 2560, height: 1440, category: "desktop" },

  // Large screens
  { name: "4K Monitor", width: 3840, height: 2160, category: "large" },
  { name: "5K iMac", width: 5120, height: 2880, category: "large" },
  { name: "Ultrawide", width: 3440, height: 1440, category: "large" },
]

const pages = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Ma Boutique", path: "/shop" },
  { name: "Analytics", path: "/analytics" },
  { name: "Notifications", path: "/notifications" },
  { name: "Support", path: "/support" },
  { name: "Facturation", path: "/billing" },
  { name: "Parrainage", path: "/referral" },
  { name: "Templates", path: "/templates" },
  { name: "Administration", path: "/admin" },
  { name: "Paramètres", path: "/settings" },
]

export function ResponsiveTester() {
  const [selectedDevice, setSelectedDevice] = useState<Device>(devices[0])
  const [isRotated, setIsRotated] = useState(false)
  const [currentPage, setCurrentPage] = useState("/dashboard")

  const getBreakpoint = (width: number) => {
    if (width < 640) return { name: "SM", color: "bg-red-100 text-red-700" }
    if (width < 768) return { name: "MD", color: "bg-orange-100 text-orange-700" }
    if (width < 1024) return { name: "LG", color: "bg-yellow-100 text-yellow-700" }
    if (width < 1280) return { name: "XL", color: "bg-green-100 text-green-700" }
    return { name: "2XL", color: "bg-blue-100 text-blue-700" }
  }

  const currentWidth = isRotated ? selectedDevice.height : selectedDevice.width
  const currentHeight = isRotated ? selectedDevice.width : selectedDevice.height
  const breakpoint = getBreakpoint(currentWidth)

  const scale = Math.min(1, Math.min(1200 / currentWidth, 800 / currentHeight))

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      case "desktop":
        return <Monitor className="h-4 w-4" />
      case "large":
        return <Tv className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Test Responsive</h1>
        <p className="text-gray-600">Testez l'application sur différents appareils et tailles d'écran</p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Page à tester</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={currentPage} onValueChange={setCurrentPage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pages.map((page) => (
                  <SelectItem key={page.path} value={page.path}>
                    {page.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Appareil sélectionné</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{selectedDevice.name}</span>
              <Badge className={breakpoint.color}>{breakpoint.name}</Badge>
            </div>
            <p className="text-sm text-gray-500">
              {currentWidth} × {currentHeight}px
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Contrôles</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setIsRotated(!isRotated)}
              variant="outline"
              className="w-full"
              disabled={selectedDevice.category === "desktop" || selectedDevice.category === "large"}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {isRotated ? "Portrait" : "Paysage"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Device Selection */}
      <Tabs defaultValue="mobile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Mobile
          </TabsTrigger>
          <TabsTrigger value="tablet" className="flex items-center gap-2">
            <Tablet className="h-4 w-4" />
            Tablette
          </TabsTrigger>
          <TabsTrigger value="desktop" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Desktop
          </TabsTrigger>
          <TabsTrigger value="large" className="flex items-center gap-2">
            <Tv className="h-4 w-4" />
            Large
          </TabsTrigger>
        </TabsList>

        {["mobile", "tablet", "desktop", "large"].map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {devices
                .filter((device) => device.category === category)
                .map((device) => (
                  <Button
                    key={device.name}
                    variant={selectedDevice.name === device.name ? "default" : "outline"}
                    className="h-auto p-3 flex flex-col items-start"
                    onClick={() => {
                      setSelectedDevice(device)
                      setIsRotated(false)
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {getCategoryIcon(device.category)}
                      <span className="font-medium text-sm">{device.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {device.width} × {device.height}
                    </span>
                  </Button>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Aperçu - {selectedDevice.name}</CardTitle>
              <CardDescription>
                {currentWidth} × {currentHeight}px • Breakpoint: {breakpoint.name}
              </CardDescription>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              {getCategoryIcon(selectedDevice.category)}
              {selectedDevice.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-4 bg-gray-100 rounded-lg">
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden border"
              style={{
                width: currentWidth * scale,
                height: currentHeight * scale,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <iframe
                src={currentPage}
                width={currentWidth}
                height={currentHeight}
                className="border-0"
                title={`Preview ${selectedDevice.name}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakpoints Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Guide des Breakpoints Tailwind</CardTitle>
          <CardDescription>Comprendre les points de rupture responsive</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <Badge className="bg-red-100 text-red-700 mb-2">SM</Badge>
              <p className="text-sm font-medium">Mobile</p>
              <p className="text-xs text-gray-500">&lt; 640px</p>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <Badge className="bg-orange-100 text-orange-700 mb-2">MD</Badge>
              <p className="text-sm font-medium">Tablette</p>
              <p className="text-xs text-gray-500">640px - 767px</p>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <Badge className="bg-yellow-100 text-yellow-700 mb-2">LG</Badge>
              <p className="text-sm font-medium">Desktop</p>
              <p className="text-xs text-gray-500">768px - 1023px</p>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <Badge className="bg-green-100 text-green-700 mb-2">XL</Badge>
              <p className="text-sm font-medium">Large</p>
              <p className="text-xs text-gray-500">1024px - 1279px</p>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <Badge className="bg-blue-100 text-blue-700 mb-2">2XL</Badge>
              <p className="text-sm font-medium">Extra Large</p>
              <p className="text-xs text-gray-500">≥ 1280px</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
