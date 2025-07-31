"use client"

import { ProductionReadinessChecker } from "@/components/testing/production-readiness-checker"
import { AppLayout } from "@/components/layouts/app-layout"

export default function ProductionReadinessPage() {
  return (
    <AppLayout
      title="Préparation Production"
      breadcrumbItems={[{ label: "Tests" }, { label: "Préparation Production" }]}
    >
      <ProductionReadinessChecker />
    </AppLayout>
  )
}
