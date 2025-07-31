"use client"

import { ChevronRight, Home } from "lucide-react"
import { useRouter } from "next/navigation"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => handleNavigation("/dashboard")}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Accueil</span>
          </button>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
            {item.href ? (
              <button
                onClick={() => handleNavigation(item.href!)}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-sm font-medium text-gray-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
