---
name: integration-tester-skill
description: Perform end-to-end QA and integration testing for full-stack Todo applications, ensuring feature correctness and seamless integration.
---

# Integration Tester Skill – End-to-End Full-Stack Testing

## Instructions

1. **End-to-End Flow Verification**
   - Test all key user flows: signup, signin, task creation, update, completion, deletion
   - Ensure frontend, backend, and database layers work together correctly
   - Validate UI state updates according to backend responses

2. **API & Backend Testing**
   - Verify all API endpoints return correct responses for valid and invalid inputs
   - Check authentication, authorization, and error handling
   - Confirm database updates and retrievals are correct and consistent

3. **Data Integrity & Edge Cases**
   - Test edge cases and boundary conditions (empty inputs, maximum allowed values, invalid data)
   - Verify data consistency between frontend state, backend, and database
   - Ensure tasks and user data remain accurate after operations

4. **Integration Checks**
   - Validate integration between frontend components and backend services
   - Ensure database queries and transactions execute as expected
   - Test third-party services or external APIs if used

5. **Automation & Reporting**
   - Automate repetitive test flows where applicable
   - Record and report test results clearly with issues highlighted
   - Include screenshots, logs, or reproducible steps for failures

## Best Practices
- Test both successful and failing cases
- Always verify authentication and authorization flows
- Use isolated test data to avoid affecting real users
- Maintain reproducibility and consistency in tests
- Focus on usability, functionality, and integration quality

## Example Structure

```ts
// Example Jest / Supertest integration test
import request from "supertest";
import app from "../app";

describe("Todo App End-to-End Tests", () => {
  it("should signup a new user and create a task", async () => {
    const signupRes = await request(app).post("/api/auth/signup").send({ email: "test@example.com", password: "Test123!" });
    expect(signupRes.status).toBe(201);

    const token = signupRes.body.accessToken;

    const taskRes = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New Task", description: "Task description" });

    expect(taskRes.status).toBe(201);
    expect(taskRes.body.title).toBe("New Task");
  });
});
