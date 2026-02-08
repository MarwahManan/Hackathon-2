# Card Component Documentation

**Component**: `Card`
**Location**: `frontend/components/ui/Card.tsx`
**Version**: 1.0.0

## Overview

A flexible container component with consistent styling and dark mode support. Provides visual grouping and elevation for content sections. Includes sub-components for structured card layouts.

## Features

- 3 visual variants (default, outlined, elevated)
- 4 padding options (none, sm, md, lg)
- Hoverable state for interactive cards
- Click handler support
- Keyboard accessible when interactive
- Dark mode support
- Sub-components for structured layouts

## API

### Main Card Component

```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  variant?: 'default' | 'outlined' | 'elevated';
  hoverable?: boolean;
  onClick?: () => void;
}
```

### Sub-Components

- **CardHeader**: Container for card header content
- **CardTitle**: Styled heading for card title
- **CardContent**: Container for main card content
- **CardFooter**: Container for card footer with top border

## Variants

### Default
- **Style**: White background with medium shadow and subtle border
- **Usage**: Standard content containers

```tsx
<Card variant="default">
  <p>Default card content</p>
</Card>
```

### Outlined
- **Style**: 2px border with no shadow
- **Usage**: Subtle containers, secondary content

```tsx
<Card variant="outlined">
  <p>Outlined card content</p>
</Card>
```

### Elevated
- **Style**: White background with large shadow
- **Usage**: Prominent content, featured sections

```tsx
<Card variant="elevated">
  <p>Elevated card content</p>
</Card>
```

## Padding Options

### None
- **Padding**: 0
- **Usage**: Custom padding, full-bleed content

```tsx
<Card padding="none">
  <img src="..." alt="..." className="w-full" />
</Card>
```

### Small (sm)
- **Padding**: 16px
- **Usage**: Compact cards, tight spaces

```tsx
<Card padding="sm">
  <p>Compact content</p>
</Card>
```

### Medium (md) - Default
- **Padding**: 24px
- **Usage**: Standard cards, most common use case

```tsx
<Card padding="md">
  <p>Standard content</p>
</Card>
```

### Large (lg)
- **Padding**: 32px
- **Usage**: Spacious cards, important content

```tsx
<Card padding="lg">
  <p>Spacious content</p>
</Card>
```

## Usage Examples

### Basic Card

```tsx
import { Card } from '@/components/ui/Card';

<Card>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

### Structured Card with Sub-Components

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>Task Details</CardTitle>
  </CardHeader>
  <CardContent>
    <p>This is the main content of the card.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Interactive Card

```tsx
<Card
  hoverable
  onClick={() => navigate('/details')}
>
  <h3>Click me</h3>
  <p>This card is clickable</p>
</Card>
```

### Card with Custom Styling

```tsx
<Card
  variant="elevated"
  padding="lg"
  className="max-w-md mx-auto"
>
  <h2>Featured Content</h2>
  <p>This card stands out with elevated styling</p>
</Card>
```

### Form Card

```tsx
<Card padding="lg">
  <h1 className="text-3xl font-bold mb-6">Sign In</h1>
  <form onSubmit={handleSubmit}>
    <Input label="Email" type="email" />
    <Input label="Password" type="password" />
    <Button type="submit" fullWidth>Sign In</Button>
  </form>
</Card>
```

### Grid of Cards

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card hoverable>
    <h3>Feature 1</h3>
    <p>Description</p>
  </Card>
  <Card hoverable>
    <h3>Feature 2</h3>
    <p>Description</p>
  </Card>
  <Card hoverable>
    <h3>Feature 3</h3>
    <p>Description</p>
  </Card>
</div>
```

## States

### Default
- Normal appearance
- No hover effects unless `hoverable` or `onClick` is set

### Hover (when hoverable or onClick)
- Increased shadow (shadow-xl)
- Slight scale increase (scale-[1.02])
- Purple border highlight
- Smooth transition

### Focus (when onClick)
- Keyboard focusable (tabIndex={0})
- Visible focus indicator
- Activatable with Enter or Space

### Interactive
- Cursor: pointer
- Role: button
- Keyboard accessible

## Sub-Components

### CardHeader

Container for card header content with bottom margin.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <p className="text-sm text-gray-500">Subtitle</p>
  </CardHeader>
  <CardContent>
    Main content
  </CardContent>
</Card>
```

### CardTitle

Styled heading (h3) for card titles.

```tsx
<CardTitle>My Card Title</CardTitle>
```

**Styling:**
- Font size: 20px (text-xl)
- Font weight: Bold (700)
- Color: gray-900 (light mode), gray-100 (dark mode)

### CardContent

Container for main card content with appropriate text color.

```tsx
<CardContent>
  <p>This is the main content area.</p>
</CardContent>
```

**Styling:**
- Color: gray-700 (light mode), gray-300 (dark mode)

### CardFooter

Container for card footer with top border and padding.

```tsx
<CardFooter>
  <div className="flex gap-2">
    <Button variant="primary">Save</Button>
    <Button variant="secondary">Cancel</Button>
  </div>
</CardFooter>
```

**Styling:**
- Top border: gray-200 (light mode), gray-700 (dark mode)
- Top margin: 16px
- Top padding: 16px

## Accessibility

### WCAG 2.1 AA Compliance

**Contrast Ratios:**
- Card background: white on gray-50 (sufficient contrast)
- Dark mode: gray-800 on gray-900 (sufficient contrast)
- Text colors meet minimum 4.5:1 ratio

**Keyboard Navigation:**
- Interactive cards are focusable (tabIndex={0})
- Activatable with Enter or Space
- Visible focus indicator

**Semantic HTML:**
- Uses `<div>` by default
- Adds `role="button"` when interactive
- Proper keyboard event handlers

### Best Practices

1. **Interactive cards**: Always set `onClick` or `hoverable` for clickable cards
2. **Keyboard support**: Interactive cards automatically support keyboard navigation
3. **Focus indicators**: Visible focus ring for keyboard users
4. **Semantic structure**: Use sub-components for consistent structure

## Dark Mode Support

All card variants automatically adapt to dark mode:

**Background:**
- Light mode: white
- Dark mode: gray-800

**Border:**
- Light mode: gray-200 (default), gray-300 (outlined)
- Dark mode: gray-700 (default), gray-600 (outlined)

**Shadow:**
- Shadows work in both modes with appropriate opacity

**Hover:**
- Light mode: purple-300 border
- Dark mode: purple-600 border

## Responsive Design

Cards are responsive by default and work well in grid layouts:

```tsx
{/* Single column on mobile, 2 on tablet, 3 on desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>Content 1</Card>
  <Card>Content 2</Card>
  <Card>Content 3</Card>
</div>
```

## Common Patterns

### Task Card

```tsx
<Card hoverable>
  <div className="flex items-start gap-4">
    <input type="checkbox" />
    <div className="flex-1">
      <h3 className="font-semibold">Task Title</h3>
      <p className="text-sm text-gray-600">Task description</p>
    </div>
    <Button size="sm" variant="danger">Delete</Button>
  </div>
</Card>
```

### Feature Card

```tsx
<Card hoverable>
  <CardContent className="text-center">
    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100">
      <Icon />
    </div>
    <h3 className="text-lg font-bold mb-2">Feature Name</h3>
    <p className="text-gray-600">Feature description</p>
  </CardContent>
</Card>
```

### Empty State Card

```tsx
<Card padding="lg" className="text-center">
  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-purple-100">
    <EmptyIcon />
  </div>
  <h2 className="text-2xl font-bold mb-2">No items yet</h2>
  <p className="text-gray-600 mb-8">Get started by creating your first item</p>
  <Button variant="primary">Create Item</Button>
</Card>
```

### Auth Form Card

```tsx
<Card padding="lg" className="max-w-md mx-auto">
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
    <p className="text-gray-600">Sign in to continue</p>
  </div>
  <form>
    <Input label="Email" type="email" />
    <Input label="Password" type="password" />
    <Button type="submit" fullWidth>Sign In</Button>
  </form>
</Card>
```

## Testing Checklist

- [ ] All variants render correctly
- [ ] All padding options work
- [ ] Hover state works when hoverable or onClick is set
- [ ] Interactive cards are keyboard accessible
- [ ] Focus indicator is visible
- [ ] Dark mode colors have proper contrast
- [ ] Sub-components render correctly
- [ ] Cards work in grid layouts
- [ ] Responsive behavior is correct
- [ ] Shadows display properly

## Migration Guide

**Before:**
```tsx
<div className="bg-white rounded-lg shadow-md p-6">
  <h2>Title</h2>
  <p>Content</p>
</div>
```

**After:**
```tsx
<Card>
  <CardTitle>Title</CardTitle>
  <CardContent>
    <p>Content</p>
  </CardContent>
</Card>
```

## Related Components

- **Button**: Action buttons within cards
- **Input**: Form inputs within cards
- **TaskCard**: Specialized card for tasks
