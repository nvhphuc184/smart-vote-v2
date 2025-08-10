"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import UserDashboard from "@/components/dashboards/user-dashboard"
import AdminDashboard from "@/components/dashboards/admin-dashboard"
import CandidateDashboard from "@/components/dashboards/candidate-dashboard"
import Navigation from "@/components/navigation"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {user.role === "user" && <UserDashboard />}
        {user.role === "admin" && <AdminDashboard />}
        {user.role === "candidate" && <CandidateDashboard />}
      </main>
    </div>
  )
}
