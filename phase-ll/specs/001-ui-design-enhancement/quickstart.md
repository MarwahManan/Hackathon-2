# Design System Quick Start Guide

**Feature**: UI Design Enhancement and Usability Improvement
**Created**: 2026-02-08
**Purpose**: Practical guide for applying design tokens to create consistent, accessible UI components

## Overview

This guide explains how to use the design token system defined in `data-model.md` to create consistent, accessible UI components. All examples use Tailwind CSS utility classes that reference the design tokens.

## Core Principles

1. **Always use design tokens** - Never use arbitrary values like `bg-[#7c3aed]` or `p-[25px]`
2. **Maintain accessibility** - All components must meet WCAG 2.1 AA standards
3. **Responsive by default** - Use responsive utilities (sm:, md:, lg:) for all layouts
4. **Semantic HTML** - Use proper HTML elements (`<button>`, `<nav>`, etc.)
5. **Consistent spacing** - Follow the 4px base grid for all spacing

## Using Design Tokens

### Colors

Always use semantic color tokens from the design system:

✅ **Good** - Using design tokens:
```tsx
<button className="bg-primary-600 text-white hover:bg-primary-700">
  Click me
</button>
```

❌ **Bad** - Using arbitrary values:
```tsx
<button className="bg-[#7c3aed] text-white hover:bg-[#6d28d9]">
  Click me
</button>
```

**Color Usage Guidelines**:
- Primary colors: Main actions, links, brand elements
- Secondary colors: Supporting actions, accents
- Semantic colors: Success (green), warning (orange), error (red), info (blue)
- Neutral colors: Text, borders, backgrounds

### Spacing

Use spacing tokens from the 4px base grid:

✅ **Good** - Using spacing scale:
```tsx
<div className="p-6 mb-4 gap-3">
  Content with consistent spacing
</div>
```

❌ **Bad** - Using arbitrary values:
```tsx
<div className="p-[25px] mb-[15px] gap-[13px]">
  Content with inconsistent spacing
</div>
```

**Spacing Guidelines**:
- Tight spacing: `gap-2`, `p-3`, `m-2` (8-12px)
- Standard spacing: `gap-4`, `p-6`, `m-4` (16-24px)
- Generous spacing: `gap-6`, `p-8`, `m-6` (24-32px)
- Large spacing: `gap-8`, `p-12`, `m-8` (32-48px)

### Typography

Use typography scale tokens for consistent text sizing:

✅ **Good** - Using typography scale:
```tsx
<h1 className="text-3xl font-bold leading-tight">
  Main Heading
</h1>
<p className="text-base font-normal leading-normal">
  Body text with proper sizing
</p>
```

❌ **Bad** - Using arbitrary values:
```tsx
<h1 className="text-[32px] font-[700] leading-[1.2]">
  Main Heading
</h1>
<p className="text-[16px] font-[400] leading-[1.5]">
  Body text with arbitrary sizing
</p>
```

**Typography Guidelines**:
- Headings: `text-2xl` to `text-4xl` with `font-bold` or `font-semibold`
- Body text: `text-base` with `font-normal` and `leading-normal`
- Small text: `text-sm` for labels, captions
- Large text: `text-lg` for emphasis

## Component Patterns

### Input Controls

Standard input pattern with all states:

```tsx
<input
  type="text"
  placeholder="Enter text"
  className="
    h-12 px-5 rounded-xl
    border-2 border-gray-300
    bg-white text-gray-900 placeholder-gray-400
    text-base font-normal
    focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/30
    hover:border-gray-400
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
  "
/>
```

**Input with left icon**:
```tsx
<div className="relative">
  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
    <SearchIcon className="w-5 h-5" />
  </div>
  <input
    type="text"
    placeholder="Search..."
    className="h-12 pl-12 pr-5 rounded-xl border-2 border-gray-300 ..."
  />
</div>
```

**Input with error state**:
```tsx
<input
  type="email"
  className="
    h-12 px-5 rounded-xl
    border-2 border-error-300
    bg-error-50/50 text-gray-900
    focus:border-error-500 focus:ring-4 focus:ring-error-500/30
    ...
  "
/>
<p className="mt-2 text-sm text-error-600 font-medium flex items-start gap-2">
  <ErrorIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
  <span>Please enter a valid email address</span>
</p>
```

### Buttons

**Primary button** (main actions):
```tsx
<button
  className="
    h-12 px-6 rounded-xl
    font-semibold text-base
    bg-gradient-to-r from-primary-600 to-secondary-600
    text-white
    hover:from-primary-700 hover:to-secondary-700
    active:from-primary-800 active:to-secondary-800
    focus:outline-none focus:ring-4 focus:ring-primary-500/30
    disabled:opacity-50 disabled:cursor-not-allowed
    shadow-lg hover:shadow-xl
    transition-all duration-200
    whitespace-nowrap
  "
>
  Primary Action
</button>
```

**Secondary button** (supporting actions):
```tsx
<button
  className="
    h-12 px-6 rounded-xl
    font-semibold text-base
    bg-white border-2 border-gray-300
    text-gray-900
    hover:bg-gray-50 hover:border-gray-400
    focus:outline-none focus:ring-4 focus:ring-primary-500/30
    shadow-md hover:shadow-lg
    transition-all duration-200
    whitespace-nowrap
  "
>
  Secondary Action
</button>
```

**Danger button** (destructive actions):
```tsx
<button
  className="
    h-12 px-6 rounded-xl
    font-semibold text-base
    bg-error-600 text-white
    hover:bg-error-700
    focus:outline-none focus:ring-4 focus:ring-error-500/30
    shadow-lg hover:shadow-xl
    transition-all duration-200
  "
>
  Delete
</button>
```

**Button sizes**:
```tsx
{/* Small */}
<button className="h-9 px-4 text-sm ...">Small</button>

{/* Medium (default) */}
<button className="h-12 px-6 text-base ...">Medium</button>

{/* Large */}
<button className="h-14 px-8 text-lg ...">Large</button>
```

### Cards

Standard card pattern:

```tsx
<div className="
  p-6 rounded-2xl
  bg-white border border-gray-200
  shadow-md hover:shadow-lg
  transition-shadow duration-200
">
  <h3 className="text-xl font-semibold text-gray-900 mb-2">
    Card Title
  </h3>
  <p className="text-base text-gray-600 leading-relaxed">
    Card content goes here with proper spacing and typography.
  </p>
</div>
```

**Elevated card** (higher prominence):
```tsx
<div className="
  p-8 rounded-2xl
  bg-white
  shadow-xl
  backdrop-blur-sm
">
  Card content
</div>
```

### Alerts

**Success alert**:
```tsx
<div className="
  p-4 rounded-xl
  bg-success-50 border-l-4 border-success-600
  flex items-start gap-3
">
  <CheckCircleIcon className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
  <div>
    <p className="font-semibold text-success-900">Success!</p>
    <p className="text-sm text-success-700">Your changes have been saved.</p>
  </div>
</div>
```

**Error alert**:
```tsx
<div className="
  p-4 rounded-xl
  bg-error-50 border-l-4 border-error-600
  flex items-start gap-3
">
  <XCircleIcon className="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
  <div>
    <p className="font-semibold text-error-900">Error</p>
    <p className="text-sm text-error-700">Something went wrong. Please try again.</p>
  </div>
</div>
```

## Accessibility Guidelines

### Focus Indicators

All interactive elements MUST have visible focus indicators:

```tsx
focus:outline-none focus:ring-4 focus:ring-primary-500/30
```

**Focus indicator requirements**:
- Minimum 4px ring width
- Sufficient contrast (3:1 minimum against background)
- Visible on all interactive elements
- Consistent across all components

### Touch Targets

Ensure minimum 44x44px touch targets for mobile accessibility:

```tsx
{/* Icon button with proper touch target */}
<button className="min-h-[44px] min-w-[44px] flex items-center justify-center">
  <CloseIcon className="w-5 h-5" />
</button>
```

**Touch target guidelines**:
- Minimum 44x44px for all interactive elements
- Use `min-h-[44px] min-w-[44px]` for icon buttons
- Add padding to increase touch area if needed
- Test on actual mobile devices

### Semantic HTML

Always use semantic HTML elements:

✅ **Good** - Semantic HTML:
```tsx
<button onClick={handleClick}>Click me</button>
<nav>
  <a href="/tasks">Tasks</a>
  <a href="/profile">Profile</a>
</nav>
<main>
  <h1>Page Title</h1>
  <article>Content</article>
</main>
```

❌ **Bad** - Non-semantic HTML:
```tsx
<div onClick={handleClick}>Click me</div>
<div>
  <span onClick={navigate}>Tasks</span>
  <span onClick={navigate}>Profile</span>
</div>
<div>
  <div>Page Title</div>
  <div>Content</div>
</div>
```

### ARIA Labels

Add ARIA labels for screen reader accessibility:

```tsx
{/* Icon-only button */}
<button aria-label="Close dialog" onClick={onClose}>
  <XIcon className="w-5 h-5" />
</button>

{/* Navigation landmark */}
<nav aria-label="Main navigation">
  <a href="/tasks">Tasks</a>
</nav>

{/* Form input */}
<label htmlFor="email" className="sr-only">Email address</label>
<input id="email" type="email" aria-describedby="email-help" />
<p id="email-help" className="text-sm text-gray-500">
  We'll never share your email
</p>
```

## Responsive Design

### Breakpoints

Tailwind's default breakpoints (mobile-first):

- **Mobile**: 320px - 639px (default, no prefix)
- **Tablet**: 640px - 1023px (`sm:` prefix)
- **Desktop**: 1024px+ (`md:`, `lg:`, `xl:` prefixes)

### Responsive Patterns

**Responsive padding**:
```tsx
<div className="px-6 sm:px-10 md:px-14 lg:px-20">
  Content with responsive horizontal padding
</div>
```

**Responsive typography**:
```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
  Responsive heading that scales with viewport
</h1>
```

**Responsive grid**:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**Responsive visibility**:
```tsx
{/* Show on mobile, hide on desktop */}
<div className="block md:hidden">Mobile menu</div>

{/* Hide on mobile, show on desktop */}
<div className="hidden md:block">Desktop navigation</div>
```

**Responsive flexbox**:
```tsx
<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## Testing Checklist

Before considering a component complete, verify:

### Design Token Usage
- [ ] No arbitrary values (no `[...]` syntax)
- [ ] Uses semantic color tokens (primary, secondary, semantic)
- [ ] Uses spacing scale from 4px grid
- [ ] Uses typography scale tokens
- [ ] Uses border radius tokens
- [ ] Uses shadow tokens

### Accessibility
- [ ] Has visible focus indicators (4px ring, sufficient contrast)
- [ ] Meets minimum touch target size (44x44px)
- [ ] Uses semantic HTML elements
- [ ] Has appropriate ARIA labels where needed
- [ ] Passes axe DevTools accessibility scan (zero critical violations)
- [ ] Keyboard accessible (Tab, Shift+Tab, Enter, Escape)
- [ ] Contrast ratios meet WCAG 2.1 AA (4.5:1 for text, 3:1 for UI)

### Responsive Design
- [ ] Works on mobile (320px+)
- [ ] Works on tablet (640px+)
- [ ] Works on desktop (1024px+)
- [ ] Uses responsive utilities (sm:, md:, lg:)
- [ ] No horizontal scrolling on any viewport
- [ ] Touch interactions work on mobile devices

### Visual Consistency
- [ ] Matches design system patterns
- [ ] Consistent with other components
- [ ] Proper spacing and alignment
- [ ] Smooth transitions and animations
- [ ] Loading and error states defined

## Common Patterns

### Form Layout

```tsx
<form className="space-y-6">
  {/* Input group */}
  <div>
    <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-3">
      Full Name
      <span className="text-error-500 ml-1.5">*</span>
    </label>
    <input
      id="name"
      type="text"
      required
      className="w-full h-12 px-5 rounded-xl border-2 border-gray-300 ..."
    />
  </div>

  {/* Submit button */}
  <button
    type="submit"
    className="w-full h-12 px-6 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 ..."
  >
    Submit
  </button>
</form>
```

### Loading State

```tsx
<button disabled className="h-12 px-6 rounded-xl ... opacity-50 cursor-not-allowed">
  <svg className="animate-spin -ml-1 mr-2 h-5 w-5" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
  Loading...
</button>
```

### Empty State

```tsx
<div className="text-center py-12">
  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
    <InboxIcon className="w-8 h-8 text-gray-400" />
  </div>
  <h3 className="text-lg font-semibold text-gray-900 mb-2">
    No tasks yet
  </h3>
  <p className="text-base text-gray-600 mb-6">
    Get started by creating your first task
  </p>
  <button className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 ...">
    Create Task
  </button>
</div>
```

## Resources

- **Design Tokens**: See `data-model.md` for complete token reference
- **Accessibility Checklist**: See `checklists/accessibility.md` for WCAG 2.1 AA requirements
- **Tailwind Documentation**: https://tailwindcss.com/docs
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: Browser extension for visual accessibility feedback

## Getting Help

If you're unsure about:
- **Which token to use**: Refer to `data-model.md` for token definitions and usage guidelines
- **Accessibility requirements**: Check `checklists/accessibility.md` for specific criteria
- **Component patterns**: Look at existing components in `frontend/components/ui/` for examples
- **Responsive behavior**: Test on multiple viewport sizes using browser DevTools

## Next Steps

1. Review the design token system in `data-model.md`
2. Study the component patterns in this guide
3. Apply patterns to existing components
4. Test with accessibility tools (axe DevTools, WAVE)
5. Validate responsive behavior across devices
6. Document any new patterns discovered during implementation
