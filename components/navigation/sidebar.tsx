"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  ShoppingBag,
  LayoutDashboard,
  BarChart3,
  Bell,
  HelpCircle,
  CreditCard,
  Gift,
  Users,
  Palette,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Store,
  TestTube,
  Activity,
  Eye,
  Play,
  Smartphone,
  Bug,
  Rocket,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/dashboard",
    },
    {
      name: "Ma Boutique",
      href: "/shop",
      icon: Store,
      current: pathname === "/shop",
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      current: pathname === "/analytics",
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: Bell,
      current: pathname === "/notifications",
      badge: "3",
    },
    {
      name: "Templates",
      href: "/templates",
      icon: Palette,
      current: pathname === "/templates",
      badge: "Pro",
    },
    {
      name: "Parrainage",
      href: "/referral",
      icon: Gift,
      current: pathname === "/referral",
    },
    {
      name: "Facturation",
      href: "/billing",
      icon: CreditCard,
      current: pathname === "/billing",
    },
    {
      name: "Support",
      href: "/support",
      icon: HelpCircle,
      current: pathname === "/support",
    },
  ]

  const testingNavigation = [
    {
      name: "Tests Exhaustifs",
      href: "/comprehensive-tests",
      icon: Bug,
      current: pathname === "/comprehensive-tests",
      badge: "New",
    },
    {
      name: "Préparation Prod",
      href: "/production-readiness",
      icon: Rocket,
      current: pathname === "/production-readiness",
      badge: "Critical",
    },
    {
      name: "Tests de flux",
      href: "/test-flows",
      icon: TestTube,
      current: pathname === "/test-flows",
    },
    {
      name: "Performance",
      href: "/performance-monitor",
      icon: Activity,
      current: pathname === "/performance-monitor",
    },
    {
      name: "Accessibilité",
      href: "/accessibility-checker",
      icon: Eye,
      current: pathname === "/accessibility-checker",
    },
    {
      name: "Tests E2E",
      href: "/e2e-tests",
      icon: Play,
      current: pathname === "/e2e-tests",
    },
    {
      name: "Test Responsive",
      href: "/responsive-test",
      icon: Smartphone,
      current: pathname === "/responsive-test",
    },
  ]

  const adminNavigation = [
    {
      name: "Administration",
      href: "/admin",
      icon: Users,
      current: pathname === "/admin",
      adminOnly: true,
    },
    {
      name: "Changelog",
      href: "/changelog",
      icon: FileText,
      current: pathname === "/changelog",
    },
  ]

  // Simuler un utilisateur admin
  const isAdmin = true

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Instagram2Shop
            </span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b bg-gradient-to-r from-pink-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">M</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Marie Dupont</p>
              <p className="text-xs text-gray-500 truncate">@fashionista_marie</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1">
          {!collapsed && (
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Principal</div>
          )}
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    item.current
                      ? "bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 border border-pink-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                    collapsed && "justify-center",
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-xs",
                            item.badge === "Pro"
                              ? "bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700",
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* Testing Navigation */}
        <div className="space-y-1 pt-4">
          {!collapsed && (
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tests & QA</div>
          )}
          {testingNavigation.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    item.current
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                    collapsed && "justify-center",
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-xs",
                            item.badge === "New"
                              ? "bg-gradient-to-r from-green-100 to-blue-100 text-green-700"
                              : item.badge === "Critical"
                                ? "bg-gradient-to-r from-red-100 to-orange-100 text-red-700"
                                : "bg-blue-100 text-blue-700",
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* Separator */}
        <div className="border-t my-4" />

        {/* Admin & Other Links */}
        <div className="space-y-1">
          {adminNavigation.map((item) => {
            if (item.adminOnly && !isAdmin) return null
            const Icon = item.icon
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    item.current
                      ? "bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 border border-pink-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                    collapsed && "justify-center",
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.adminOnly && (
                        <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                          Admin
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t space-y-2">
        <Link href="/settings">
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors",
              collapsed && "justify-center",
            )}
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Paramètres</span>}
          </div>
        </Link>
        <div
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer",
            collapsed && "justify-center",
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </div>
      </div>
    </div>
  )
}
