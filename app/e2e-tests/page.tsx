"use client"

import { E2ETestRunner } from "@/components/testing/e2e-test-runner"
import { AppLayout } from "@/components/layouts/app-layout"

export default function E2ETestsPage() {
  return (
    <AppLayout title="Tests End-to-End" breadcrumbItems={[{ label: "Tests" }, { label: "E2E" }]}>
      <E2ETestRunner />
    </AppLayout>
  )
}
