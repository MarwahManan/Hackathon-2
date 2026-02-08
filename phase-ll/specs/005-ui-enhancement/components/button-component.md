# Button Component Documentation

**Component**: `Button`
**Location**: `frontend/components/ui/Button.tsx`
**Version**: 1.0.0

## Overview

A flexible, accessible button component with multiple variants, sizes, and states. Meets WCAG 2.1 AA accessibility standards with proper contrast ratios and focus indicators. Touch targets meet minimum 44x44px requirement on mobile.

## Features

- 4 visual variants (primary, secondary, tertiary, danger)
- 3 size options (sm, md, lg)
- Loading state with spinner
- Disabled state
- Full width option
- Left and right icon support
- Keyboard accessible
- Dark mode support

## API

### Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}
```

### Variants

#### Primary (default)
- **Purpose**: High emphasis actions (submit forms, primary CTAs)
- **Style**: Purple-blue gradient background with white text
- **Usage**: Main action buttons, form submissions

```tsx
<Button variant="primary">Submit</Button>
```

#### Secondary
- **Purpose**: Medium emphasis actions (cancel, alternative actions)
- **Style**: Transparent background with border
- **Usage**: Secondary actions, cancel buttons

```tsx
<Button variant="secondary">Cancel</Button>
```

#### Tertiary
- **Purpose**: Low emphasis actions (links, subtle actions)
- **Style**: Transparent background, purple text
- **Usage**: Text-like buttons, navigation links

```tsx
<Button variant="tertiary">Learn More</Button>
```

#### Danger
- **Purpose**: Destructive actions (delete, remove)
- **Style**: Red background with white text
- **Usage**: Delete buttons, destructive confirmations

```tsx
<Button variant="danger">Delete</Button>
```

### Sizes

#### Small (sm)
- **Height**: 36px
- **Padding**: 8px 16px
- **Font Size**: 14px
- **Usage**: Compact spaces, inline actions

```tsx
<Button size="sm">Small Button</Button>
```

#### Medium (md) - Default
- **Height**: 44px (meets touch target requirement)
- **Padding**: 12px 24px
- **Font Size**: 16px
- **Usage**: Standard buttons, forms

```tsx
<Button size="md">Medium Button</Button>
```

#### Large (lg)
- **Height**: 52px
- **Padding**: 16px 32px
- **Font Size**: 18px
- **Usage**: Hero sections, prominent CTAs

```tsx
<Button size="lg">Large Button</Button>
```

## Usage Examples

### Basic Button

```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="md">
  Click Me
</Button>
```

### Button with Loading State

```tsx
<Button
  variant="primary"
  loading={isSubmitting}
  disabled={isSubmitting}
>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</Button>
```

### Button with Icons

```tsx
<Button
  variant="primary"
  leftIcon={
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  }
>
  Add Task
</Button>
```

### Full Width Button

```tsx
<Button variant="primary" fullWidth>
  Sign In
</Button>
```

### Form Submit Button

```tsx
<form onSubmit={handleSubmit}>
  <Button
    type="submit"
    variant="primary"
    size="md"
    fullWidth
    loading={isSubmitting}
    disabled={isSubmitting}
  >
    Submit Form
  </Button>
</form>
```

## States

### Default
- Normal appearance with hover effect
- Cursor: pointer

### Hover
- Primary: Darker gradient (purple-700 to blue-700)
- Secondary: Light gray background
- Tertiary: Light purple background
- Danger: Darker red background
- Increased shadow on primary and danger variants

### Focus
- 2px purple ring with 2px offset
- Visible keyboard focus indicator
- Meets WCAG 2.1 AA contrast requirements

### Active
- Even darker colors than hover
- Pressed appearance

### Disabled
- 50% opacity
- Cursor: not-allowed
- No hover effects
- Cannot be clicked

### Loading
- Shows spinner animation
- Disabled interaction
- Maintains button size

## Accessibility

### WCAG 2.1 AA Compliance

**Contrast Ratios:**
- Primary variant: White text on gradient background (>7:1)
- Secondary variant: Dark text on light background (>4.5:1)
- Danger variant: White text on red background (>4.5:1)

**Keyboard Navigation:**
- Focusable with Tab key
- Activatable with Enter or Space
- Visible focus indicator (2px purple ring)

**Touch Targets:**
- Minimum 44x44px on mobile (md and lg sizes)
- Adequate spacing between buttons

**Screen Readers:**
- Proper button semantics
- Loading state communicated via disabled attribute
- Icon-only buttons should include aria-label

### Best Practices

1. **Use semantic HTML**: Component renders as `<button>` element
2. **Provide clear labels**: Button text should describe the action
3. **Loading states**: Always disable button when loading
4. **Icon-only buttons**: Include aria-label for accessibility
5. **Form buttons**: Use `type="submit"` for form submissions

## Dark Mode Support

All button variants automatically adapt to dark mode:

**Primary:**
- Light mode: purple-600 to blue-600
- Dark mode: purple-500 to blue-500 (brighter for visibility)

**Secondary:**
- Light mode: gray-300 border, gray-900 text
- Dark mode: gray-600 border, gray-100 text

**Tertiary:**
- Light mode: purple-600 text
- Dark mode: purple-400 text (brighter for contrast)

**Danger:**
- Light mode: error-500 background
- Dark mode: error-600 background

## Responsive Design

Buttons are responsive by default:

```tsx
{/* Stack vertically on mobile, horizontal on desktop */}
<div className="flex flex-col sm:flex-row gap-3">
  <Button variant="primary">Submit</Button>
  <Button variant="secondary">Cancel</Button>
</div>
```

## Common Patterns

### Primary + Secondary Actions

```tsx
<div className="flex gap-3">
  <Button variant="primary" onClick={handleSubmit}>
    Save
  </Button>
  <Button variant="secondary" onClick={handleCancel}>
    Cancel
  </Button>
</div>
```

### Delete Confirmation

```tsx
<Button
  variant="danger"
  onClick={handleDelete}
  loading={isDeleting}
>
  Delete Task
</Button>
```

### Navigation Button

```tsx
<Link href="/tasks/new">
  <Button variant="primary" leftIcon={<PlusIcon />}>
    Add Task
  </Button>
</Link>
```

## Testing Checklist

- [ ] All variants render correctly
- [ ] All sizes meet minimum height requirements
- [ ] Hover states work in both light and dark modes
- [ ] Focus indicators are visible
- [ ] Loading state shows spinner and disables interaction
- [ ] Disabled state prevents clicks
- [ ] Icons display correctly
- [ ] Full width option works
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Touch targets are minimum 44x44px on mobile
- [ ] Contrast ratios meet WCAG 2.1 AA standards

## Migration Guide

If migrating from native `<button>` elements:

**Before:**
```tsx
<button
  className="bg-blue-500 text-white px-4 py-2 rounded"
  onClick={handleClick}
>
  Click Me
</button>
```

**After:**
```tsx
<Button
  variant="primary"
  size="md"
  onClick={handleClick}
>
  Click Me
</Button>
```

## Related Components

- **Input**: Form input component
- **Card**: Container component
- **Link**: Next.js Link component for navigation
