import { authClient } from "./auth-client"

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  // Get current session
  const session = await authClient.getSession()

  // Add Authorization header if authenticated
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (session?.token) {
    headers["Authorization"] = `Bearer ${session.token}`
  }

  // Make request to backend
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  )

  // Handle token expiration (T035, T036)
  if (response.status === 401) {
    try {
      const errorData = await response.json()
      if (errorData.code === "TOKEN_EXPIRED") {
        // Token expired - redirect to signin page
        if (typeof window !== "undefined") {
          window.location.href = "/signin"
        }
      }
    } catch (e) {
      // If response is not JSON, still redirect on 401
      if (typeof window !== "undefined") {
        window.location.href = "/signin"
      }
    }
  }

  return response
}

