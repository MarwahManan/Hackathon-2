"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "./auth-client"

/**
 * Hook to protect routes - redirects unauthenticated users to signin
 * Use in protected pages like dashboard
 */
export function useProtectedRoute() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const session = await authClient.getSession()
      if (!session) {
        router.push("/signin")
      }
    }
    checkAuth()
  }, [router])
}

/**
 * Hook to redirect authenticated users away from auth pages
 * Use in signin/signup pages
 */
export function useAuthRedirect() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const session = await authClient.getSession()
      if (session) {
        router.push("/dashboard")
      }
    }
    checkAuth()
  }, [router])
}
