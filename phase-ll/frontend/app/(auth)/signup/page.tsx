
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/context/AuthContext"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card } from "@/components/ui/Card"


export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Client-side validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): boolean => {
    return password.length >= 8
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Client-side validation
    if (!name.trim()) {
      setError("Name is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Invalid email format")
      return
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters")
      return
    }

    setLoading(true)

    try {
      await signup({ name, email, password, confirmPassword: password })

      // Redirect to tasks page after successful signup
      router.push("/tasks")
    } catch (err: any) {
      // Handle error and display error message
      const errorMessage = err.error || err.message || "Signup failed. Please try again."

      if (errorMessage.includes("already exists") || errorMessage.includes("already registered")) {
        setError("Email already registered")
      } else {
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-primary-50/20 to-secondary-50/20 dark:from-gray-900 dark:via-primary-900/10 dark:to-secondary-900/10 px-6 sm:px-8 md:px-10 lg:px-12 py-12 sm:py-14 md:py-16">
      <div className="w-full max-w-md">
        <Card padding="lg" variant="elevated" className="backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 mb-6 shadow-lg">
              <svg className="w-10 h-10 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight leading-tight">
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              Sign up to get started with your tasks
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div
              className="mb-10 p-5 rounded-xl bg-error-50 dark:bg-error-900/20 border-2 border-error-200 dark:border-error-800 shadow-sm"
              role="alert"
            >
              <div className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 text-error-500 dark:text-error-400 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm font-medium text-error-800 dark:text-error-200">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <Input
              id="name"
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              size="md"
            />

            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              size="md"
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              size="md"
              helperText="Must be at least 8 characters"
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={loading}
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 via-primary-600 to-secondary-600 hover:from-purple-700 hover:via-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2 rounded"
              >
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
