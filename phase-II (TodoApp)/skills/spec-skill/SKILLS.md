---
name: spec-skill
description: Focused on creating and refining detailed, spec-driven development documentation for projects using sprc-kit plus.
---

# Spec Skill – Structured Spec-Driven Development Documentation

## Instructions

1. **Spec Creation**
   - Create new specifications for features, components, modules, or workflows
   - Follow the exact project-defined structure in `/specs` folder
   - Include clear sections such as objectives, instructions, constraints, success criteria, and examples
   - Ensure each spec is actionable, detailed, and unambiguous for developers, designers, and QA

2. **Spec Refinement**
   - Review existing specs for clarity, completeness, and adherence to standards
   - Update and improve instructions, success criteria, constraints, and examples
   - Highlight assumptions, dependencies, or limitations
   - Ensure specs remain aligned with project workflows and sprc-kit plus methodology

3. **Structure & Organization**
   - Maintain consistent Markdown formatting (headings, lists, tables, code blocks, links)
   - Use versioned files in the `/specs` folder for traceability
   - Organize specs logically by feature, module, or component hierarchy

4. **Collaboration**
   - Integrate feedback from developers, designers, and other stakeholders
   - Ensure specs reflect both technical and UX/design requirements
   - Communicate dependencies and implementation considerations clearly

5. **Validation**
   - Ensure specs are actionable and testable
   - Confirm all sections are present and complete for spec-driven development
   - Check alignment with project constraints, timelines, and success criteria

## Best Practices
- Follow the exact project-defined structure for all specs
- Keep specs clear, concise, and actionable
- Use consistent Markdown syntax and formatting
- Include examples, code snippets, or diagrams when helpful
- Make specs reusable for future features or modules
- Version and track all spec changes in the `/specs` folder

## Example Structure

```md
/specs/new-feature.md

# Feature: User Profile Update

## Objective
Enable users to update their profile details including name, email, and avatar.

## Instructions
1. Validate input fields (name, email, avatar)
2. Connect to backend API for updates
3. Handle success and error responses

## Success Criteria
- All fields validated and saved correctly
- API errors handled gracefully
- UI updates reflect changes immediately

## Constraints
- Must follow existing UI layout
- Use existing authentication flows

## Examples
- Input: { name: "Alice", email: "alice@example.com" }
- Output: Profile updated successfully

