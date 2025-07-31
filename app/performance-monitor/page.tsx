"use client"

import { PerformanceMonitor } from "@/components/testing/performance-monitor"
import { AppLayout } from "@/components/layouts/app-layout"

export default function PerformanceMonitorPage() {
  return (
    <AppLayout title="Monitoring des performances" breadcrumbItems={[{ label: "Tests" }, { label: "Performance" }]}>
      <PerformanceMonitor />
    </AppLayout>
  )
}
