import { createAuthClient } from "better-auth/client"

// Better Auth runs on the frontend (port 3000), not the backend
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
})
