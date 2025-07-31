"use client"

import { FlowTester } from "@/components/testing/flow-tester"
import { AppLayout } from "@/components/layouts/app-layout"

export default function TestFlowsPage() {
  return (
    <AppLayout title="Tests des flux utilisateur" breadcrumbItems={[{ label: "Tests" }, { label: "Flux utilisateur" }]}>
      <FlowTester />
    </AppLayout>
  )
}
