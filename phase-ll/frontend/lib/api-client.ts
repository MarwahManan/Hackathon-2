// lib/api-client.ts
import axios from "axios"
import { ErrorResponse, ErrorCode } from "@/types/api"

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

// ✅ No auth-client, no token, no session
apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const errorResponse: ErrorResponse = error.response.data

      switch (errorResponse.statusCode) {
        case 401:
          if (typeof window !== "undefined") {
            window.location.href = "/signin"
          }
          break

        case 404:
          console.warn("Resource not found:", errorResponse)
          break

        case 500:
          console.error("Server error:", errorResponse)
          break
      }

      return Promise.reject(errorResponse)
    }

    if (error.request) {
      const networkError: ErrorResponse = {
        error: "Network error. Please check your connection.",
        code: ErrorCode.NETWORK_ERROR,
        statusCode: 0,
      }

      return Promise.reject(networkError)
    }

    const unknownError: ErrorResponse = {
      error: "An unexpected error occurred",
      code: ErrorCode.INTERNAL_ERROR,
      statusCode: 0,
    }

    return Promise.reject(unknownError)
  }
)

export default apiClient



// import { authClient } from "./auth-client"

// export async function apiRequest(
//   endpoint: string,
//   options: RequestInit = {}
// ) {
//   // Get current session
//   const session = await authClient.getSession()

//   // Add Authorization header if authenticated
//   const headers: HeadersInit = {
//     "Content-Type": "application/json",
//     ...options.headers,
//   }


  
//   if (session?.token) {
//     headers["Authorization"] = `Bearer ${session.token}`
//   }

//   // Make request to backend
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
//     {
//       ...options,
//       headers,
//     }
//   )

//   // Handle token expiration (T035, T036)
//   if (response.status === 401) {
//     try {
//       const errorData = await response.json()
//       if (errorData.code === "TOKEN_EXPIRED") {
//         // Token expired - redirect to signin page
//         if (typeof window !== "undefined") {
//           window.location.href = "/signin"
//         }
//       }
//     } catch (e) {
//       // If response is not JSON, still redirect on 401
//       if (typeof window !== "undefined") {
//         window.location.href = "/signin"
//       }
//     }
//   }

//   return response
// }

