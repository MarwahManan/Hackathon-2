# Input Component Documentation

**Component**: `Input`
**Location**: `frontend/components/ui/Input.tsx`
**Version**: 1.0.0

## Overview

A flexible, accessible input component with validation states, labels, and helper text. Meets WCAG 2.1 AA accessibility standards with proper contrast ratios and focus indicators. Touch targets meet minimum 44x44px requirement on mobile.

## Features

- Label and helper text support
- Validation states (error, success)
- 3 size options (sm, md, lg)
- Left and right icon support
- Full width option (default)
- Keyboard accessible
- Dark mode support
- Auto-generated unique IDs
- ARIA attributes for accessibility

## API

### Props

```typescript
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}
```

### Sizes

#### Small (sm)
- **Height**: 36px
- **Padding**: 8px 12px
- **Font Size**: 14px

#### Medium (md) - Default
- **Height**: 44px (meets touch target requirement)
- **Padding**: 12px 16px
- **Font Size**: 16px

#### Large (lg)
- **Height**: 52px
- **Padding**: 16px 20px
- **Font Size**: 18px

## Usage Examples

### Basic Input

```tsx
import { Input } from '@/components/ui/Input';

<Input
  label="Email Address"
  type="email"
  placeholder="your@email.com"
  required
/>
```

### Input with Error State

```tsx
<Input
  label="Password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  error="Password must be at least 8 characters"
  required
/>
```

### Input with Success State

```tsx
<Input
  label="Username"
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  success="Username is available"
/>
```

### Input with Helper Text

```tsx
<Input
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
  required
/>
```

### Input with Icons

```tsx
<Input
  label="Email"
  type="email"
  leftIcon={
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
  }
/>
```

### Controlled Input

```tsx
const [email, setEmail] = useState('');

<Input
  label="Email Address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <Input
    label="Full Name"
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    error={errors.name}
    required
  />

  <Input
    label="Email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={errors.email}
    required
  />

  <Button type="submit">Submit</Button>
</form>
```

## States

### Default
- Gray border (gray-300 in light mode, gray-600 in dark mode)
- White background (light mode), gray-800 (dark mode)
- Placeholder text in gray-400

### Focus
- Purple border (purple-500)
- Purple ring (2px)
- Smooth transition

### Error
- Red border (error-500)
- Red ring on focus
- Error icon displayed
- Error message below input
- aria-invalid="true"

### Success
- Green border (success-500)
- Green ring on focus
- Success icon displayed
- Success message below input

### Disabled
- 50% opacity
- Cursor: not-allowed
- No interaction

## Validation States

### Error State

```tsx
<Input
  label="Email"
  type="email"
  value={email}
  error="Invalid email format"
/>
```

**Visual Indicators:**
- Red border (error-500)
- Red error icon
- Red error message text
- aria-invalid="true"
- aria-describedby links to error message

### Success State

```tsx
<Input
  label="Username"
  type="text"
  value={username}
  success="Username is available"
/>
```

**Visual Indicators:**
- Green border (success-500)
- Green checkmark icon
- Green success message text

## Accessibility

### WCAG 2.1 AA Compliance

**Contrast Ratios:**
- Label text: gray-900 on white (16.1:1) ✅
- Input text: gray-900 on white (16.1:1) ✅
- Error text: error-600 on white (>4.5:1) ✅
- Dark mode text: gray-100 on gray-900 (14.5:1) ✅

**Keyboard Navigation:**
- Focusable with Tab key
- Visible focus indicator (2px purple ring)
- Label clicks focus input

**Screen Readers:**
- Proper label association (htmlFor/id)
- Required fields marked with asterisk and aria-required
- Error messages linked via aria-describedby
- Validation icons marked as aria-hidden

**Touch Targets:**
- Minimum 44x44px on mobile (md and lg sizes)

### ARIA Attributes

```tsx
<Input
  label="Email"
  type="email"
  required
  error="Invalid email"
/>
```

**Generates:**
```html
<label for="input-xyz">
  Email
  <span aria-label="required">*</span>
</label>
<input
  id="input-xyz"
  type="email"
  required
  aria-invalid="true"
  aria-describedby="input-xyz-error"
/>
<p id="input-xyz-error" role="alert">
  Invalid email
</p>
```

## Dark Mode Support

All input states automatically adapt to dark mode:

**Background:**
- Light mode: white
- Dark mode: gray-800

**Text:**
- Light mode: gray-900
- Dark mode: gray-100

**Border:**
- Light mode: gray-300
- Dark mode: gray-600

**Focus:**
- Both modes: purple-500 (adjusted brightness for dark mode)

## Responsive Design

Inputs are full-width by default and stack vertically on mobile:

```tsx
<div className="space-y-6">
  <Input label="Name" type="text" />
  <Input label="Email" type="email" />
  <Input label="Password" type="password" />
</div>
```

## Common Patterns

### Email Input

```tsx
<Input
  label="Email Address"
  type="email"
  placeholder="your@email.com"
  required
  leftIcon={<EmailIcon />}
/>
```

### Password Input

```tsx
<Input
  label="Password"
  type="password"
  placeholder="Enter your password"
  helperText="Must be at least 8 characters"
  required
  leftIcon={<LockIcon />}
/>
```

### Search Input

```tsx
<Input
  type="search"
  placeholder="Search tasks..."
  leftIcon={<SearchIcon />}
/>
```

### Number Input

```tsx
<Input
  label="Age"
  type="number"
  min="0"
  max="120"
/>
```

## Validation Patterns

### Client-Side Validation

```tsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    setError('Invalid email format');
  } else {
    setError('');
  }
};

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }}
  error={error}
/>
```

### Form Validation

```tsx
const [formData, setFormData] = useState({ name: '', email: '' });
const [errors, setErrors] = useState({});

const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = {};

  if (!formData.name) {
    newErrors.name = 'Name is required';
  }

  if (!formData.email) {
    newErrors.email = 'Email is required';
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    // Submit form
  }
};

<form onSubmit={handleSubmit}>
  <Input
    label="Name"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    error={errors.name}
  />
  <Input
    label="Email"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    error={errors.email}
  />
</form>
```

## Testing Checklist

- [ ] All sizes render correctly
- [ ] Label displays and associates with input
- [ ] Required indicator (*) shows for required fields
- [ ] Error state displays with red border and message
- [ ] Success state displays with green border and message
- [ ] Helper text displays correctly
- [ ] Icons display in correct positions
- [ ] Focus indicator is visible
- [ ] Keyboard navigation works
- [ ] Touch targets are minimum 44x44px on mobile
- [ ] Dark mode colors have proper contrast
- [ ] ARIA attributes are correct
- [ ] Screen reader announces validation messages

## Migration Guide

**Before:**
```tsx
<div>
  <label>Email</label>
  <input type="email" className="..." />
  {error && <span>{error}</span>}
</div>
```

**After:**
```tsx
<Input
  label="Email"
  type="email"
  error={error}
/>
```

## Related Components

- **Button**: Form submission button
- **Card**: Container for forms
- **FormField**: Legacy form field component (deprecated)
