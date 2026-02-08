---
name: auth-skill
description: Implement secure authentication flows including Signup, Signin, JWT tokens, password hashing, and Better Auth integration.
---

# Auth Skill – Secure Authentication & Identity

## Instructions

1. **User Signup**
   - Collect email and password
   - Validate input fields
   - Hash password before saving (bcrypt, argon2, or scrypt)
   - Store user securely in database
   - Ensure proper error handling and feedback

2. **User Signin**
   - Verify email exists
   - Compare hashed password
   - Handle invalid credentials gracefully
   - Return auth response with tokens
   - Prevent user enumeration through consistent responses

3. **Password Handling**
   - Always hash passwords with per-user salts
   - Never store or log plain-text passwords
   - Use strong, modern hashing algorithms (bcrypt, argon2, scrypt)

4. **JWT Token Management**
   - Issue access and refresh tokens on signin
   - Include user ID, role, and claims in payload
   - Set short-lived token expiration
   - Implement token rotation and revocation strategies
   - Validate tokens on every protected request
   - Ensure refresh tokens are securely stored (httpOnly, secure cookies)

5. **Better Auth Integration**
   - Configure Better Auth according to official best practices
   - Integrate providers, sessions, and token handling securely
   - Connect with the database for persistence
   - Secure cookies and tokens with httpOnly, Secure, and SameSite flags
   - Ensure proper token lifecycle management and logout handling

6. **Session and Transport Security**
   - Use secure, httpOnly cookies for sensitive tokens
   - Enforce HTTPS and secure cookie flags
   - Implement logout and token invalidation properly
   - Apply rate limiting to authentication endpoints
   - Protect against replay attacks and brute-force attempts

7. **Endpoint Protection**
   - Apply authentication and authorization middleware
   - Enforce role- and permission-based access where required
   - Protect all private routes and sensitive endpoints
   - Validate and sanitize input at API boundaries

## Best Practices

* Follow OWASP Authentication and Session Management guidelines
* Always hash passwords
* Use HTTPS only for all communication
* Set short token expiration and implement refresh token rotation
* Store secrets and keys in environment variables
* Protect private routes and sensitive data
* Validate JWT signature, issuer, audience, and expiration
* Implement proper logging for auth events without storing sensitive data
* Prevent brute-force, credential stuffing, replay attacks
* Do not expose detailed authentication errors to clients
* Ensure secure cookie handling and session management

## Example Flow

```ts
// Signup
user --> validate input --> hash password --> save user
POST /api/auth/signup

// Signin
user --> verify password --> generate JWT
POST /api/auth/signin

// Token refresh
POST /api/auth/refresh

// Logout
POST /api/auth/logout

// Protected route
request --> verify JWT --> allow access
GET /api/profile
Authorization: Bearer <access_token>
