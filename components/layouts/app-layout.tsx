"use client"

import type { ReactNode } from "react"
import { AppHeader } from "@/components/navigation/app-header"
import { Sidebar } from "@/components/navigation/sidebar"
import { MobileNav } from "@/components/navigation/mobile-nav"
import { Breadcrumb } from "@/components/navigation/breadcrumb"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface AppLayoutProps {
  children: ReactNode
  title: string
  breadcrumbItems?: BreadcrumbItem[]
}

export function AppLayout({ children, title, breadcrumbItems = [] }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <div className="p-6">
            <div className="mb-6">
              <Breadcrumb items={breadcrumbItems} />
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{title}</h1>
            </div>
            {children}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
