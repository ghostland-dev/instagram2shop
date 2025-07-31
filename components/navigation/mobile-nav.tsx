"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  Menu,
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
  Store,
} from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
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

  const isAdmin = true

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-2 p-4 border-b">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Instagram2Shop
            </span>
          </div>

          {/* User Info */}
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

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              if (item.adminOnly && !isAdmin) return null
              const Icon = item.icon
              return (
                <Link key={item.name} href={item.href} onClick={() => setOpen(false)}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      item.current
                        ? "bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 border border-pink-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
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
                    {item.adminOnly && (
                      <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                        Admin
                      </Badge>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t space-y-2">
            <Link href="/settings" onClick={() => setOpen(false)}>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                <Settings className="h-5 w-5 flex-shrink-0" />
                <span>Paramètres</span>
              </div>
            </Link>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer">
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span>Déconnexion</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
