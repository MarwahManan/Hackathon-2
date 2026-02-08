import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"

export const auth = betterAuth({
  database: {
    provider: "postgresql",
    url: process.env.DATABASE_URL!,
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  plugins: [
    jwt({
      secret: process.env.BETTER_AUTH_SECRET!,
      expiresIn: "7d", // 7 days
      algorithm: "HS256",
    }),
  ],
  trustedOrigins: [process.env.NEXT_PUBLIC_API_URL!],
})
