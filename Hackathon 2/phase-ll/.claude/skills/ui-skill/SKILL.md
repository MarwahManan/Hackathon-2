````md
---
name: ui-skill
description: Improve UI aesthetic quality and usability through well-structured components, design principles, and consistent visual systems.
---

# UI Skill – Aesthetic & Usability Driven Interface Design

## Instructions

1. **Component Groups**
   - Design and improve **input controls** (buttons, inputs, selects, checkboxes, toggles, forms)
   - Design and improve **navigational components** (navbars, sidebars, tabs, breadcrumbs, pagination)
   - Design and improve **informational components** (cards, alerts, badges, modals, tooltips, tables, empty states)
   - Design and improve **container components** (layouts, sections, panels, grids, wrappers)

2. **Structure & Reusability**
   - Build well-structured, reusable, and composable components
   - Keep components visually and behaviorally consistent across the application
   - Define clear component APIs (props, slots, variants, sizes, and states)

3. **Design Principles**
   - Apply **consistency** across colors, spacing, typography, and component behavior
   - Use **contrast** to highlight primary actions, status, and important information
   - Apply visual **hierarchy** using size, spacing, alignment, and color
   - Maintain proper alignment and spacing systems

4. **Usability & Accessibility**
   - Ensure clear affordances for interactive elements
   - Design visible focus, hover, active, and disabled states
   - Support keyboard navigation and screen readers
   - Maintain accessible color contrast and readable font sizes

5. **Aesthetic Quality**
   - Use balanced color palettes and modern visual styles
   - Apply consistent border radius, shadows, and elevation patterns
   - Improve visual clarity and reduce UI clutter
   - Ensure visual rhythm through spacing and layout patterns

6. **Responsive & Adaptive Design**
   - Design components that adapt to mobile, tablet, and desktop
   - Ensure containers and layouts scale correctly across breakpoints
   - Preserve hierarchy and usability on small screens

## Best Practices
- Group components into input, navigation, informational, and container categories
- Keep a single source of truth for colors, spacing, and typography (design tokens)
- Prefer reusable variants over custom one-off components
- Always design for accessibility (WCAG contrast, focus states, semantics)
- Test components in real layouts and real content
- Avoid visual noise and unnecessary decorative elements

## Example Structure

```html
<!-- Container -->
<section class="ui-section">
  <!-- Navigation -->
  <nav class="navbar">
    <a class="nav-item active">Dashboard</a>
    <a class="nav-item">Settings</a>
  </nav>

  <!-- Informational component -->
  <div class="card">
    <h2 class="card-title">Account Overview</h2>
    <p class="card-text">Your current plan and usage details.</p>

    <!-- Input controls -->
    <div class="form-group">
      <label>Email</label>
      <input class="input" type="email" />
      <button class="btn-primary">Save</button>
    </div>
  </div>
</section>
````
