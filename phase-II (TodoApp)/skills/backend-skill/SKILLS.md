---
name: backend-skill
description: Generate backend routes, handle requests/responses, and connect to databases for web applications.
---

# Backend Skill – Route Handling, Database Integration & Business Logic

## Instructions

1. **Route Generation**
   - Create REST or GraphQL endpoints for web applications
   - Structure routes logically (e.g., by resource or module)
   - Implement route parameters, query parameters, and request validation
   - Ensure consistent and meaningful URL patterns

2. **Request & Response Handling**
   - Parse and validate incoming requests
   - Serialize responses in JSON or appropriate formats
   - Handle errors gracefully with proper status codes and messages
   - Implement middleware for authentication, logging, and error handling
   - Support pagination, filtering, and sorting for list endpoints

3. **Database Integration**
   - Connect endpoints to databases (SQL/NoSQL) using ORM or query builders
   - Perform CRUD operations securely and efficiently
   - Ensure transactional correctness for multi-step operations
   - Validate data before writing to the database
   - Optimize queries and indexing for performance

4. **Authentication & Authorization**
   - Integrate authentication flows (JWT, OAuth, or session-based)
   - Enforce role-based or permission-based access to routes
   - Protect sensitive endpoints and private data

5. **Middleware & Utilities**
   - Implement logging, rate limiting, and request validation middleware
   - Use caching strategies where appropriate to improve performance
   - Handle async operations and background tasks safely

6. **Business Logic**
   - Separate business logic from routes (controllers/services)
   - Keep code clean, modular, and reusable
   - Handle async operations properly with error handling
   - Ensure business rules are consistently applied across endpoints

## Best Practices
- Follow consistent naming and route conventions
- Validate all inputs and sanitize outputs
- Use environment variables for configuration and secrets
- Keep business logic separate from controllers/routes
- Optimize for performance and scalability
- Ensure proper error handling and monitoring
- Write reusable, testable, and maintainable code

## Example Structure

```ts
// Express.js example - Routes
import express from "express";
import { getUser, createUser } from "./controllers/userController";
import { authMiddleware } from "./middlewares/auth";

const router = express.Router();
router.post("/users", authMiddleware, createUser);
router.get("/users/:id", authMiddleware, getUser);
export default router;

// Controller example
export const getUser = async (req, res) => {
  try {
    const user = await db.users.findUnique({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Service example (Business Logic)
export const createUserService = async (userData) => {
  // Validate and process input
  const hashedPassword = await hashPassword(userData.password);
  return await db.users.create({ data: { ...userData, password: hashedPassword } });
};
