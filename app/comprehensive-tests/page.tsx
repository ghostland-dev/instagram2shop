"use client"

import { ComprehensiveTestSuite } from "@/components/testing/comprehensive-test-suite"
import { AppLayout } from "@/components/layouts/app-layout"

export default function ComprehensiveTestsPage() {
  return (
    <AppLayout title="Tests Exhaustifs" breadcrumbItems={[{ label: "Tests" }, { label: "Suite Exhaustive" }]}>
      <ComprehensiveTestSuite />
    </AppLayout>
  )
}
