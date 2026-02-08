# Design System Documentation

**Version**: 1.0.0
**Date**: 2026-02-08
**Status**: Active
**Branch**: 001-ui-design-enhancement

---

## Overview

This design system provides a comprehensive set of design tokens, components, and patterns for building consistent, accessible, and beautiful user interfaces in the Todo application. All tokens are defined in `tailwind.config.js` and meet WCAG 2.1 AA accessibility standards.

---

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Layout](#layout)
6. [Components](#components)
7. [Accessibility](#accessibility)
8. [Usage Guidelines](#usage-guidelines)

---

## Design Tokens

Design tokens are the visual design atoms of the design system. They are named entities that store visual design attributes. We use them in place of hard-coded values to ensure consistency and maintainability.

### Token Categories

- **Colors**: Brand colors, semantic colors, neutral colors
- **Spacing**: Consistent spacing scale based on 4px grid
- **Typography**: Font sizes, weights, line heights
- **Border Radius**: Rounding values for corners
- **Shadows**: Elevation levels for depth
- **Transitions**: Animation durations and timing functions

---

## Color System

### Primary Colors (Purple)

Our primary brand color is purple, representing creativity and innovation.

```css
primary-50:  #f5f3ff  /* Lightest - backgrounds */
primary-100: #ede9fe  /* Light backgrounds */
primary-200: #ddd6fe  /* Hover backgrounds */
primary-300: #c4b5fd  /* Borders, disabled states */
primary-400: #a78bfa  /* Secondary actions */
primary-500: #8b5cf6  /* Base purple */
primary-600: #7c3aed  /* Brand purple - primary actions ⭐ */
primary-700: #6d28d9  /* Hover states */
primary-800: #5b21b6  /* Active states */
primary-900: #4c1d95  /* Darkest - text on light backgrounds */
```

**Usage:**
- `primary-600`: Primary buttons, links, brand elements
- `primary-700`: Hover states for primary actions
- `primary-50-200`: Light backgrounds, subtle highlights
- `primary-800-900`: Text on light backgrounds

**Accessibility:**
- ✅ primary-600 on white: 4.54:1 (WCAG AA Pass)
- ✅ primary-700 on white: 6.29:1 (WCAG AA Pass)
- ✅ White on primary-600: 4.54:1 (WCAG AA Pass)

---

### Secondary Colors (Blue)

Our secondary brand color is blue, representing trust and reliability.

```css
secondary-50:  #eff6ff
secondary-100: #dbeafe
secondary-200: #bfdbfe
secondary-300: #93c5fd
secondary-400: #60a5fa
secondary-500: #3b82f6
secondary-600: #2563eb  /* Brand blue ⭐ */
secondary-700: #1d4ed8
secondary-800: #1e40af
secondary-900: #1e3a8a
```

**Usage:**
- `secondary-600`: Secondary buttons, complementary brand elements
- Used in gradients with primary colors
- Information states and highlights

**Accessibility:**
- ✅ secondary-600 on white: 5.14:1 (WCAG AA Pass)
- ✅ White on secondary-600: 5.14:1 (WCAG AA Pass)

---

### Semantic Colors

#### Success (Green)

```css
success-50:  #f0fdf4
success-100: #dcfce7
success-200: #bbf7d0
success-300: #86efac
success-400: #4ade80
success-500: #22c55e
success-600: #16a34a  /* Primary success ⭐ */
success-700: #15803d  /* For normal text */
success-800: #166534
success-900: #14532d
```

**Usage:**
- Success messages, confirmations
- Completed states
- Positive feedback

**Accessibility:**
- ⚠️ success-600: 4.07:1 (Use for large text/UI only)
- ✅ success-700: 5.93:1 (Use for normal text)

---

#### Error (Red)

```css
error-50:  #fef2f2
error-100: #fee2e2
error-200: #fecaca
error-300: #fca5a5
error-400: #f87171
error-500: #ef4444
error-600: #dc2626  /* Primary error ⭐ */
error-700: #b91c1c
error-800: #991b1b
error-900: #7f1d1d
```

**Usage:**
- Error messages, validation errors
- Destructive actions
- Critical alerts

**Accessibility:**
- ✅ error-600: 5.03:1 (WCAG AA Pass)
- ✅ error-700: 7.00:1 (WCAG AA Pass)

---

#### Warning (Orange/Yellow)

```css
warning-50:  #fffbeb
warning-100: #fef3c7
warning-200: #fde68a
warning-300: #fcd34d
warning-400: #fbbf24
warning-500: #f59e0b
warning-600: #d97706  /* Primary warning ⭐ */
warning-700: #b45309  /* For normal text */
warning-800: #92400e
warning-900: #78350f
```

**Usage:**
- Warning messages, cautions
- Important notices
- Attention-grabbing elements

**Accessibility:**
- ⚠️ warning-600: 3.18:1 (Use for large text/UI only)
- ✅ warning-700: 4.76:1 (Use for normal text)

---

#### Info (Blue)

Same as secondary colors. Use for informational messages and neutral highlights.

---

### Neutral Colors (Gray)

```css
gray-50:  #f9fafb  /* Lightest backgrounds */
gray-100: #f3f4f6  /* Light backgrounds */
gray-200: #e5e7eb  /* Borders, dividers */
gray-300: #d1d5db  /* Disabled borders */
gray-400: #9ca3af  /* Icons (use with caution) */
gray-500: #6b7280  /* Secondary text ⭐ */
gray-600: #4b5563  /* Body text ⭐ */
gray-700: #374151  /* Headings ⭐ */
gray-800: #1f2937  /* Dark backgrounds */
gray-900: #111827  /* Darkest text */
```

**Usage:**
- `gray-600`: Primary body text (7.05:1 contrast)
- `gray-700`: Headings and emphasized text (9.73:1 contrast)
- `gray-500`: Secondary text, labels (4.69:1 contrast)
- `gray-400`: Decorative icons only (2.24:1 - fails text requirements)
- `gray-200-300`: Borders and dividers
- `gray-50-100`: Light backgrounds

**⚠️ Important:** Do NOT use gray-400 for text. Use gray-500 or darker.

---

## Typography

### Font Families

```css
font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
font-mono: Menlo, Monaco, "Courier New", monospace
```

**Usage:**
- `font-sans`: Default for all text (system font stack for optimal performance)
- `font-mono`: Code snippets, technical content

---

### Font Sizes

```css
text-xs:   0.75rem  (12px)  /* Small labels, captions */
text-sm:   0.875rem (14px)  /* Secondary text, form labels */
text-base: 1rem     (16px)  /* Body text (default) ⭐ */
text-lg:   1.125rem (18px)  /* Large body text, subheadings */
text-xl:   1.25rem  (20px)  /* Small headings */
text-2xl:  1.5rem   (24px)  /* Medium headings */
text-3xl:  1.875rem (30px)  /* Large headings */
text-4xl:  2.25rem  (36px)  /* Extra large headings */
text-5xl:  3rem     (48px)  /* Hero text */
text-6xl:  3.75rem  (60px)  /* Display text */
```

**Usage Guidelines:**
- Use `text-base` (16px) for body text - never smaller
- Use `text-sm` for secondary information, labels
- Use `text-xs` sparingly for captions and metadata
- Scale up for headings: xl → 2xl → 3xl → 4xl
- Use 5xl and 6xl for hero sections and landing pages

---

### Font Weights

```css
font-normal:   400  /* Regular text */
font-medium:   500  /* Emphasized text */
font-semibold: 600  /* Subheadings, buttons ⭐ */
font-bold:     700  /* Headings, strong emphasis */
```

**Usage:**
- `font-normal`: Body text, paragraphs
- `font-medium`: Slightly emphasized text, navigation links
- `font-semibold`: Buttons, form labels, subheadings
- `font-bold`: Main headings, strong emphasis

---

### Line Heights

```css
leading-none:    1      /* Tight, for display text */
leading-tight:   1.25   /* Headings */
leading-snug:    1.375  /* Subheadings */
leading-normal:  1.5    /* Body text (default) ⭐ */
leading-relaxed: 1.625  /* Comfortable reading */
leading-loose:   2      /* Very spacious */
```

**Usage:**
- `leading-normal` (1.5): Default for body text
- `leading-tight` (1.25): Headings
- `leading-relaxed` (1.625): Long-form content

---

## Spacing

### Spacing Scale (4px base grid)

```css
spacing-0:  0       (0px)
spacing-1:  0.25rem (4px)
spacing-2:  0.5rem  (8px)
spacing-3:  0.75rem (12px)
spacing-4:  1rem    (16px)   ⭐
spacing-5:  1.25rem (20px)
spacing-6:  1.5rem  (24px)   ⭐
spacing-7:  1.75rem (28px)
spacing-8:  2rem    (32px)   ⭐
spacing-10: 2.5rem  (40px)
spacing-12: 3rem    (48px)
spacing-14: 3.5rem  (56px)
spacing-16: 4rem    (64px)
spacing-20: 5rem    (80px)
spacing-24: 6rem    (96px)
spacing-32: 8rem    (128px)
```

**Usage Guidelines:**

**Tight Spacing (2-4):**
- Gaps between related elements
- Small padding inside components
- Icon spacing

**Standard Spacing (6-8):**
- Component padding (cards, buttons)
- Margins between sections
- Form field spacing

**Generous Spacing (10-16):**
- Section padding
- Page margins
- Large component spacing

**Large Spacing (20-32):**
- Page sections
- Hero areas
- Major layout divisions

---

## Layout

### Breakpoints

```css
xs:  375px   /* Mobile */
sm:  640px   /* Large mobile */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large desktop */
```

**Usage:**
```jsx
<div className="px-4 sm:px-6 md:px-8 lg:px-12">
  {/* Responsive padding */}
</div>

<h1 className="text-2xl sm:text-3xl md:text-4xl">
  {/* Responsive typography */}
</h1>
```

---

### Container

Use max-width constraints to prevent content from stretching too wide:

```jsx
<div className="max-w-7xl mx-auto px-6">
  {/* Centered container with max width */}
</div>
```

**Max Width Options:**
- `max-w-sm`: 384px (24rem)
- `max-w-md`: 448px (28rem)
- `max-w-lg`: 512px (32rem)
- `max-w-xl`: 576px (36rem)
- `max-w-2xl`: 672px (42rem)
- `max-w-4xl`: 896px (56rem)
- `max-w-6xl`: 1152px (72rem)
- `max-w-7xl`: 1280px (80rem) ⭐ (recommended for main content)

---

## Border Radius

```css
rounded-none: 0       (0px)    /* Sharp corners */
rounded-sm:   0.125rem (2px)   /* Subtle rounding */
rounded:      0.25rem (4px)    /* Small elements */
rounded-md:   0.375rem (6px)   /* Badges, tags */
rounded-lg:   0.5rem  (8px)    /* Cards, panels */
rounded-xl:   0.75rem (12px)   /* Buttons, inputs ⭐ */
rounded-2xl:  1rem    (16px)   /* Large cards, modals ⭐ */
rounded-3xl:  1.5rem  (24px)   /* Hero sections */
rounded-full: 9999px           /* Circular - avatars, pills */
```

**Usage:**
- `rounded-xl`: Interactive elements (buttons, inputs)
- `rounded-2xl`: Containers (cards, modals)
- `rounded-lg`: Smaller containers (alerts, badges)
- `rounded-full`: Avatars, pills, circular buttons

---

## Shadows (Elevation)

```css
shadow-sm:  0 1px 2px 0 rgba(0, 0, 0, 0.05)
shadow:     0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
shadow-xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

**Usage:**
- `shadow-sm`: Subtle hover effects
- `shadow` or `shadow-md`: Standard cards, dropdowns
- `shadow-lg`: Modals, important overlays
- `shadow-xl`: Full-screen dialogs
- `shadow-2xl`: Maximum elevation (use sparingly)

---

## Components

### Buttons

**Primary Button:**
```jsx
<button className="h-12 px-6 rounded-xl font-semibold text-base
                   bg-gradient-to-r from-primary-600 to-secondary-600
                   text-white hover:from-primary-700 hover:to-secondary-700
                   shadow-lg hover:shadow-xl
                   focus:outline-none focus:ring-4 focus:ring-primary-500/30
                   transition-all duration-200">
  Button Text
</button>
```

**Secondary Button:**
```jsx
<button className="h-12 px-6 rounded-xl font-semibold text-base
                   bg-white border-2 border-gray-300
                   text-gray-900 hover:bg-gray-50
                   shadow-md hover:shadow-lg
                   focus:outline-none focus:ring-4 focus:ring-primary-500/30
                   transition-all duration-200">
  Button Text
</button>
```

**Sizes:**
- Small: `h-11 px-4 text-sm` (44px minimum for touch targets)
- Medium: `h-12 px-6 text-base` (default)
- Large: `h-14 px-8 text-lg`

---

### Form Inputs

**Standard Input:**
```jsx
<input className="h-12 px-6 rounded-xl
                  border-2 border-gray-300
                  bg-white text-gray-900
                  placeholder-gray-500
                  focus:border-primary-500 focus:ring-4 focus:ring-primary-500/30
                  transition-all duration-200"
       type="text"
       placeholder="Enter text" />
```

**With Icon:**
```jsx
<div className="relative">
  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
    <Icon className="w-5 h-5" />
  </div>
  <input className="h-12 pl-14 pr-6 rounded-xl ..." />
</div>
```

**Error State:**
```jsx
<input className="... border-error-500 focus:border-error-600
                  focus:ring-error-500/30 bg-error-50/50" />
<p className="mt-2 text-sm text-error-700">Error message</p>
```

---

### Cards

**Standard Card:**
```jsx
<div className="p-6 rounded-2xl bg-white shadow-md
                border border-gray-200
                hover:shadow-lg transition-all duration-200">
  Card content
</div>
```

**Elevated Card:**
```jsx
<div className="p-8 rounded-2xl bg-white shadow-xl
                border border-gray-100">
  Card content
</div>
```

---

## Accessibility

### Focus Indicators

All interactive elements MUST have visible focus indicators:

```css
focus:outline-none focus:ring-4 focus:ring-primary-500/30
```

**Requirements:**
- 4px ring width
- 30% opacity for subtle appearance
- 3:1 contrast ratio minimum
- Visible on all interactive elements

---

### Touch Targets

All interactive elements MUST meet minimum touch target size:

```css
min-h-touch min-w-touch  /* 44x44px minimum */
```

**Requirements:**
- 44x44px minimum (WCAG 2.1 AA)
- 48x48px recommended for primary actions
- Adequate spacing between targets (8px minimum)

---

### Color Contrast

**Text Contrast Requirements:**
- Normal text (< 18px): 4.5:1 minimum
- Large text (≥ 18px): 3:1 minimum
- UI components: 3:1 minimum

**Approved Color Combinations:**
- ✅ gray-600+ on white (body text)
- ✅ gray-500+ on white (secondary text)
- ✅ primary-600+ on white
- ✅ secondary-600+ on white
- ✅ error-600+ on white
- ✅ success-700+ on white (normal text)
- ✅ warning-700+ on white (normal text)

**Avoid:**
- ❌ gray-400 for text (use gray-500+)
- ❌ success-600 for normal text (use success-700+)
- ❌ warning-600 for normal text (use warning-700+)

---

## Usage Guidelines

### Do's ✅

1. **Use design tokens consistently**
   - Always use defined color tokens
   - Use spacing scale values
   - Use typography scale

2. **Follow accessibility standards**
   - Ensure proper color contrast
   - Add focus indicators
   - Meet touch target minimums

3. **Be responsive**
   - Test on mobile, tablet, desktop
   - Use responsive utilities
   - Ensure touch-friendly on mobile

4. **Maintain consistency**
   - Use same patterns across pages
   - Follow established component styles
   - Keep visual hierarchy clear

### Don'ts ❌

1. **Don't use arbitrary values**
   - ❌ `className="text-[15px]"`
   - ✅ `className="text-base"`

2. **Don't ignore accessibility**
   - ❌ Missing focus indicators
   - ❌ Low contrast text
   - ❌ Small touch targets

3. **Don't break responsive design**
   - ❌ Fixed pixel widths
   - ❌ Horizontal scrolling
   - ❌ Tiny text on mobile

4. **Don't mix design systems**
   - ❌ Using both purple-600 and primary-600 inconsistently
   - ✅ Choose one and stick with it

---

## Quick Reference

### Common Patterns

**Centered Container:**
```jsx
<div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
```

**Responsive Spacing:**
```jsx
<div className="space-y-6 sm:space-y-7 md:space-y-8">
```

**Responsive Typography:**
```jsx
<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
```

**Gradient Background:**
```jsx
<div className="bg-gradient-to-r from-primary-600 to-secondary-600">
```

**Focus Ring:**
```jsx
<button className="focus:outline-none focus:ring-4 focus:ring-primary-500/30">
```

---

**Version**: 1.0.0
**Last Updated**: 2026-02-08
**Maintained By**: UI Design Enhancement Team
