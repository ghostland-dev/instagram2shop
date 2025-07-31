"use client"

import { AccessibilityChecker } from "@/components/testing/accessibility-checker"
import { AppLayout } from "@/components/layouts/app-layout"

export default function AccessibilityCheckerPage() {
  return (
    <AppLayout title="Vérificateur d'accessibilité" breadcrumbItems={[{ label: "Tests" }, { label: "Accessibilité" }]}>
      <AccessibilityChecker />
    </AppLayout>
  )
}
