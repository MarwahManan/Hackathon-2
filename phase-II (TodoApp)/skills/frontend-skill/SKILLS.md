---
name: frontend-skill
description: Build responsive pages, components, layouts, and styling for web applications.
---

# Frontend Skill – Pages, Components & Layouts

## Instructions

1. **Page & Layout Structure**
   - Define the overall page layout (header, main content, footer)
   - Create reusable layouts for multiple pages
   - Ensure responsive design across devices
   - Use grid or flexbox systems for structure

2. **Component Design**
   - Build modular and reusable UI components
   - Follow component-driven architecture (atoms, molecules, organisms)
   - Handle state, props, and events effectively
   - Ensure accessibility (a11y) compliance in components

3. **Styling**
   - Apply consistent styling using CSS, Sass, Tailwind, or CSS-in-JS
   - Use theme variables for colors, fonts, and spacing
   - Ensure responsive typography, spacing, and sizing
   - Optimize performance by minimizing unnecessary re-renders or style recalculations

4. **Interactions & Behavior**
   - Implement event handling (click, hover, form inputs)
   - Handle animations and transitions where needed
   - Validate forms and user inputs on the frontend
   - Integrate client-side routing with frameworks like Next.js or React Router

5. **Integration**
   - Connect components/pages with backend APIs
   - Fetch and display dynamic data efficiently
   - Use state management libraries if needed (Redux, Zustand, Context API)

6. **Layout & Styling**
   - Use **Flexbox and Grid** for building layouts
   - Ensure **responsive design** for mobile, tablet, and desktop
   - Maintain **consistent spacing, colors, and typography**
   - Follow design tokens or theme variables for consistency

## Best Practices
- Follow component-driven design principles
- Keep components small, reusable, and testable
- Ensure accessibility and semantic HTML usage
- Use responsive design and mobile-first approach
- Optimize assets (images, fonts, scripts) for performance
- Document components and pages with props, usage examples, and styling guidelines
- Maintain consistent layout and visual hierarchy across pages

## Example Structure

```jsx
// Page layout example (React/Next.js)
export default function HomePage() {
  return (
    <Layout>
      <Header title="Welcome" />
      <MainContent>
        <HeroSection headline="Your Headline" description="Supporting text" />
        <CTAButton label="Get Started" />
      </MainContent>
      <Footer />
    </Layout>
  );
}

// Component example
export function HeroSection({ headline, description }) {
  return (
    <section className="hero min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="animate-fade-in text-4xl font-bold">{headline}</h1>
      <p className="animate-fade-in-delay mt-4 text-lg">{description}</p>
    </section>
  );
}

// Layout & Styling (Tailwind CSS)
<section className="hero min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
