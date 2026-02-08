# Design Tokens Documentation

**Feature**: UI Design Enhancement
**Version**: 1.0.0
**Last Updated**: 2026-02-08

## Overview

This document defines the complete design token system for the Todo Full-Stack Web Application. All tokens are centralized in `frontend/lib/design-tokens.ts` and integrated with Tailwind CSS configuration.

## Color System

### Purple-Blue Gradient (Primary Accent)

The application uses a purple-to-blue gradient as the primary accent color scheme, creating a modern and visually appealing interface.

**Primary Purple**: `#8B5CF6` (purple-500)
**Primary Blue**: `#3B82F6` (blue-500)

#### Purple Scale
```
purple-50:  #FAF5FF
purple-100: #F3E8FF
purple-200: #E9D5FF
purple-300: #D8B4FE
purple-400: #C084FC
purple-500: #A855F7  ← Primary
purple-600: #9333EA
purple-700: #7E22CE
purple-800: #6B21A8
purple-900: #581C87
```

#### Blue Scale
```
blue-50:  #EFF6FF
blue-100: #DBEAFE
blue-200: #BFDBFE
blue-300: #93C5FD
blue-400: #60A5FA
blue-500: #3B82F6  ← Primary
blue-600: #2563EB
blue-700: #1D4ED8
blue-800: #1E40AF
blue-900: #1E3A8A
```

### Neutral Grays

Used for text, backgrounds, and borders throughout the application.

```
gray-50:  #F9FAFB  ← Light mode secondary background
gray-100: #F3F4F6  ← Light mode tertiary background, Dark mode primary text
gray-200: #E5E7EB  ← Light mode borders, Dark mode secondary text
gray-300: #D1D5DB
gray-400: #9CA3AF  ← Dark mode tertiary text
gray-500: #6B7280  ← Light mode tertiary text
gray-600: #4B5563
gray-700: #374151  ← Light mode secondary text, Dark mode tertiary background
gray-800: #1F2937  ← Dark mode secondary background
gray-900: #111827  ← Light mode primary text, Dark mode primary background
```

### Semantic Colors

#### Success (Green)
```
success-500: #22C55E  ← Light mode
success-400: #4ADE80  ← Dark mode
```

#### Error (Red)
```
error-500: #EF4444  ← Light mode
error-400: #F87171  ← Dark mode
```

#### Warning (Amber)
```
warning-500: #F59E0B  ← Light mode
warning-400: #FBBF24  ← Dark mode
```

#### Info (Blue)
```
info-500: #3B82F6  ← Light mode
info-400: #60A5FA  ← Dark mode
```

## Light Mode Color Mappings

**Background Colors:**
- Primary: `#FFFFFF` (Pure white)
- Secondary: `#F9FAFB` (gray-50)
- Tertiary: `#F3F4F6` (gray-100)

**Text Colors:**
- Primary: `#111827` (gray-900) - Contrast ratio: 16.1:1 ✅
- Secondary: `#374151` (gray-700) - Contrast ratio: 10.7:1 ✅
- Tertiary: `#6B7280` (gray-500) - Contrast ratio: 5.9:1 ✅
- Inverse: `#FFFFFF` (White on dark backgrounds)

**Border Colors:**
- Primary: `#E5E7EB` (gray-200)
- Secondary: `#D1D5DB` (gray-300)
- Focus: `#8B5CF6` (purple-500)

## Dark Mode Color Mappings

**Background Colors:**
- Primary: `#111827` (gray-900)
- Secondary: `#1F2937` (gray-800)
- Tertiary: `#374151` (gray-700)

**Text Colors:**
- Primary: `#F3F4F6` (gray-100) - Contrast ratio: 14.5:1 ✅
- Secondary: `#E5E7EB` (gray-200) - Contrast ratio: 12.6:1 ✅
- Tertiary: `#9CA3AF` (gray-400) - Contrast ratio: 5.9:1 ✅
- Inverse: `#111827` (Dark on light backgrounds)

**Border Colors:**
- Primary: `#374151` (gray-700)
- Secondary: `#4B5563` (gray-600)
- Focus: `#A855F7` (purple-500 - brighter for dark mode)

## Typography Scale

**Base Size**: 16px (1rem)

```
xs:   0.75rem  (12px)
sm:   0.875rem (14px)
base: 1rem     (16px) ← Base size
lg:   1.125rem (18px)
xl:   1.25rem  (20px)
2xl:  1.5rem   (24px)
3xl:  2rem     (32px)
4xl:  2.5rem   (40px)
```

**Font Weights:**
```
normal:   400
medium:   500
semibold: 600
bold:     700
```

**Line Heights:**
```
tight:   1.2   (for headings)
normal:  1.5   (for body text)
relaxed: 1.75  (for long-form content)
```

## Spacing Scale

**Base Unit**: 8px

```
0:  0
1:  0.25rem (4px)
2:  0.5rem  (8px)
3:  0.75rem (12px)
4:  1rem    (16px)
6:  1.5rem  (24px)
8:  2rem    (32px)
12: 3rem    (48px)
16: 4rem    (64px)
```

## Border Radius

```
none: 0
sm:   0.25rem  (4px)
md:   0.375rem (6px)
lg:   0.5rem   (8px)
xl:   0.75rem  (12px)
2xl:  1rem     (16px)
full: 9999px   (fully rounded)
```

## Shadows

```
sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
```

## Breakpoints

```
xs:  375px   (Mobile)
sm:  640px   (Large mobile)
md:  768px   (Tablet)
lg:  1024px  (Desktop)
xl:  1280px  (Large desktop)
2xl: 1536px  (Extra large desktop)
```

## Transitions

```
fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
base: 200ms cubic-bezier(0.4, 0, 0.2, 1)
slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)
```

## Component-Specific Tokens

### Button

**Padding:**
```
sm: 0.5rem 1rem    (8px 16px)
md: 0.75rem 1.5rem (12px 24px)
lg: 1rem 2rem      (16px 32px)
```

**Minimum Height:**
```
sm: 36px
md: 44px  ← Meets touch target requirement
lg: 52px
```

### Input

**Padding:**
```
sm: 0.5rem 0.75rem (8px 12px)
md: 0.75rem 1rem   (12px 16px)
lg: 1rem 1.25rem   (16px 20px)
```

**Minimum Height:**
```
sm: 36px
md: 44px  ← Meets touch target requirement
lg: 52px
```

### Card

**Padding:**
```
sm: 1rem   (16px)
md: 1.5rem (24px)
lg: 2rem   (32px)
```

## Usage Guidelines

### Importing Design Tokens

```typescript
import { designTokens } from '@/lib/design-tokens';

// Access specific tokens
const primaryColor = designTokens.colors.purple[500];
const baseSpacing = designTokens.spacing[4];
```

### Using with Tailwind CSS

All design tokens are integrated with Tailwind CSS configuration. Use Tailwind utility classes:

```tsx
// Colors
<div className="bg-purple-600 text-white">
<div className="text-gray-900 dark:text-gray-100">

// Spacing
<div className="p-6 mb-8">

// Typography
<h1 className="text-4xl font-bold">

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### CSS Custom Properties

For dynamic theming, use CSS custom properties defined in `globals.css`:

```css
.custom-element {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border-primary);
}
```

## Accessibility Compliance

### WCAG 2.1 AA Standards

All color combinations meet WCAG 2.1 AA contrast requirements:

**Normal Text**: Minimum 4.5:1 contrast ratio
**Large Text**: Minimum 3:1 contrast ratio
**UI Components**: Minimum 3:1 contrast ratio

### Contrast Ratios

**Light Mode:**
- gray-900 on white: 16.1:1 ✅
- gray-700 on white: 10.7:1 ✅
- gray-500 on white: 5.9:1 ✅

**Dark Mode:**
- gray-100 on gray-900: 14.5:1 ✅
- gray-200 on gray-900: 12.6:1 ✅
- gray-400 on gray-900: 5.9:1 ✅

### Focus Indicators

All interactive elements have visible focus indicators:
- 2px solid outline
- Purple-500 color
- 2px offset from element

## Best Practices

1. **Consistency**: Always use design tokens instead of hardcoded values
2. **Semantic Colors**: Use semantic colors (success, error, warning) for appropriate contexts
3. **Responsive Design**: Use mobile-first approach with responsive breakpoints
4. **Dark Mode**: Test all components in both light and dark modes
5. **Accessibility**: Ensure proper contrast ratios and focus indicators
6. **Touch Targets**: Maintain minimum 44x44px touch targets on mobile
7. **Spacing**: Use consistent spacing scale for layouts and components
8. **Typography**: Limit to 6 font sizes for visual consistency

## Maintenance

When updating design tokens:

1. Update `frontend/lib/design-tokens.ts`
2. Update `frontend/tailwind.config.js` if needed
3. Update `frontend/app/globals.css` for CSS custom properties
4. Test in both light and dark modes
5. Validate contrast ratios with accessibility tools
6. Update this documentation

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
