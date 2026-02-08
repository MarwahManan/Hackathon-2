# Component Responsive Testing Checklist

**Date**: 2026-02-08
**Task**: T022-T024 - Responsive testing for all upgraded components
**Status**: Ready for manual testing

---

## Testing Instructions

This document provides a comprehensive checklist for testing all upgraded components across mobile, tablet, and desktop viewports. Each component should be tested at the specified breakpoints to ensure proper responsive behavior.

---

## Test Environment Setup

### Browser DevTools Setup
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Select "Responsive" mode
4. Test at each specified width

### Test Viewports

**Mobile (320px-639px):**
- 320px - Smallest mobile (iPhone SE)
- 375px - Standard mobile (iPhone 12/13)
- 414px - Large mobile (iPhone 12 Pro Max)

**Tablet (640px-1023px):**
- 640px - Large mobile / Small tablet
- 768px - Standard tablet (iPad portrait)

**Desktop (1024px+):**
- 1024px - Tablet landscape / Small laptop
- 1280px - Standard laptop
- 1920px - Full HD desktop

---

## Component Testing Checklist

### 1. Input Component (`components/ui/Input.tsx`)

#### Mobile (320px-639px)
- [ ] **320px**: Input renders without horizontal scroll
- [ ] **320px**: Label text doesn't wrap awkwardly
- [ ] **320px**: Touch target is ≥44px height
- [ ] **320px**: Icons don't overlap with text
- [ ] **320px**: Error messages display properly
- [ ] **375px**: Layout improves from 320px
- [ ] **375px**: Padding is appropriate
- [ ] **414px**: No awkward spacing

**Expected Behavior:**
- Height: h-11 (44px) for sm, h-12 (48px) for md, h-14 (56px) for lg
- Full width by default
- Icons positioned correctly (left-4 for md)
- Error/success messages below input
- Placeholder text readable (gray-500)

**Issues to Watch For:**
- Icon overlapping with long text
- Label wrapping awkwardly
- Error messages too small to read
- Touch target below 44px

---

#### Tablet (640px-1023px)
- [ ] **640px**: Responsive classes take effect (sm:)
- [ ] **640px**: Spacing increases appropriately
- [ ] **768px**: Layout adapts well
- [ ] **768px**: Icons scale properly

**Expected Behavior:**
- Same as mobile but with more breathing room
- No layout changes (Input is full-width by default)

---

#### Desktop (1024px+)
- [ ] **1024px**: Full desktop layout active
- [ ] **1024px**: Hover states work properly
- [ ] **1280px**: No excessive width (should be constrained by parent)
- [ ] **1920px**: Maintains proper proportions

**Expected Behavior:**
- Hover: shadow-md appears
- Focus: shadow-lg and ring-4
- Cursor changes to text cursor

---

### 2. Button Component (`components/ui/Button.tsx`)

#### Mobile (320px-639px)
- [ ] **320px**: Button renders without wrapping
- [ ] **320px**: Touch target is ≥44px (h-11 for sm)
- [ ] **320px**: Text is readable
- [ ] **320px**: Icons display properly
- [ ] **375px**: Full-width buttons work correctly
- [ ] **414px**: Button spacing is appropriate

**Expected Behavior:**
- Height: h-11 (44px) for sm, h-12 (48px) for md, h-14 (56px) for lg
- Text doesn't wrap (whitespace-nowrap)
- Loading spinner displays correctly
- Icons positioned with proper gaps

**Issues to Watch For:**
- Text wrapping on small screens
- Touch target below 44px
- Button too wide on mobile
- Loading spinner misaligned

---

#### Tablet (640px-1023px)
- [ ] **640px**: Button sizing appropriate
- [ ] **768px**: Hover effects work on touch devices

**Expected Behavior:**
- Same as mobile
- Hover effects should work with touch simulation

---

#### Desktop (1024px+)
- [ ] **1024px**: Hover states visible
- [ ] **1024px**: Shadow effects work
- [ ] **1280px**: Focus ring visible
- [ ] **1920px**: Button doesn't stretch excessively

**Expected Behavior:**
- Hover: shadow-xl for primary/danger
- Focus: ring-4 with appropriate color
- Cursor: pointer

---

### 3. Card Component (`components/ui/Card.tsx`)

#### Mobile (320px-639px)
- [ ] **320px**: Card renders without horizontal scroll
- [ ] **320px**: Padding is appropriate (p-4 sm, p-6 md, p-8 lg)
- [ ] **320px**: Content doesn't overflow
- [ ] **375px**: Responsive padding takes effect
- [ ] **414px**: Card looks balanced

**Expected Behavior:**
- Padding: p-4 (16px) for sm, p-6 (24px) for md, p-8 (32px) for lg
- Border: border-gray-200
- Shadow: shadow-md for default, shadow-xl for elevated
- Hover: scale-[1.01] translate-y-[-1px] (if hoverable)

**Issues to Watch For:**
- Content overflowing card
- Padding too tight on mobile
- Border not visible
- Hover effect too aggressive

---

#### Tablet (640px-1023px)
- [ ] **640px**: Padding increases (sm: classes)
- [ ] **768px**: Card layout adapts well

**Expected Behavior:**
- Padding increases at sm breakpoint
- Hover effects work on touch

---

#### Desktop (1024px+)
- [ ] **1024px**: Hover effects visible
- [ ] **1024px**: Shadow transitions smooth
- [ ] **1280px**: Card doesn't stretch too wide
- [ ] **1920px**: Max-width constraints work

**Expected Behavior:**
- Hover: shadow-lg, scale-[1.01], translate-y-[-1px]
- Smooth transitions (duration-200)
- Border changes to primary-200 on hover

---

### 4. Header Component (`components/layout/Header.tsx`)

#### Mobile (320px-639px)
- [ ] **320px**: Header renders without horizontal scroll
- [ ] **320px**: Logo doesn't wrap
- [ ] **320px**: Navigation buttons are accessible
- [ ] **320px**: Height is h-16 (64px)
- [ ] **375px**: Layout improves
- [ ] **414px**: User email hidden on mobile (md:flex)

**Expected Behavior:**
- Height: h-16 on mobile, h-20 on sm+
- Logo: text-xl on mobile
- Navigation: Sign In/Sign Up or My Tasks/Logout
- User email: hidden on mobile (md:flex)
- Sticky positioning works

**Issues to Watch For:**
- Logo text wrapping
- Navigation buttons too small
- Header too tall on mobile
- Horizontal scroll

---

#### Tablet (640px-1023px)
- [ ] **640px**: Height increases to h-20 (80px)
- [ ] **640px**: Logo size increases (sm:text-2xl)
- [ ] **768px**: User email displays (md:flex)
- [ ] **768px**: Navigation spacing appropriate

**Expected Behavior:**
- Height: h-20 (80px)
- Logo: text-2xl
- User email: visible with truncation
- "My Tasks" link visible (hidden sm:inline-flex)

---

#### Desktop (1024px+)
- [ ] **1024px**: Full desktop layout
- [ ] **1024px**: All navigation items visible
- [ ] **1280px**: Spacing is generous
- [ ] **1920px**: Content centered with max-w-7xl

**Expected Behavior:**
- Height: h-20 (80px)
- Logo: text-2xl (could be larger on lg+)
- All navigation visible
- Hover effects on links
- User email fully visible

---

### 5. LogoutButton Component (`components/auth/LogoutButton.tsx`)

#### All Viewports
- [ ] **320px**: Button meets touch target (inherits from Button)
- [ ] **768px**: Button sizing appropriate
- [ ] **1024px**: Hover states work

**Expected Behavior:**
- Uses Button component (inherits all responsive behavior)
- Loading state displays correctly
- Error handling works
- aria-label present

---

### 6. TaskForm Component (`components/tasks/TaskForm.tsx`)

#### Mobile (320px-639px)
- [ ] **320px**: Form renders without horizontal scroll
- [ ] **320px**: Input fields are full width
- [ ] **320px**: Textarea height appropriate (min-h-[160px])
- [ ] **320px**: Buttons stack vertically or fit horizontally
- [ ] **375px**: Form spacing improves
- [ ] **414px**: Layout is balanced

**Expected Behavior:**
- Title input: Full width, h-12 (48px)
- Description textarea: Full width, min-h-[160px]
- Buttons: Full width on mobile or side-by-side if space
- Spacing: space-y-6 (24px)
- Labels: font-semibold, text-sm

**Issues to Watch For:**
- Textarea too small on mobile
- Buttons too close together
- Form fields overflowing
- Labels wrapping awkwardly

---

#### Tablet (640px-1023px)
- [ ] **640px**: Form spacing increases (sm:space-y-7)
- [ ] **768px**: Buttons side-by-side if designed
- [ ] **768px**: Textarea comfortable size

**Expected Behavior:**
- Spacing increases at breakpoints
- Buttons may be side-by-side
- More generous padding

---

#### Desktop (1024px+)
- [ ] **1024px**: Form layout optimal
- [ ] **1280px**: Max-width constraints work
- [ ] **1920px**: Form doesn't stretch too wide

**Expected Behavior:**
- Form should be constrained (max-w-2xl or similar)
- Hover states on inputs
- Focus states clear

---

### 7. TaskCard Component (`components/tasks/TaskCard.tsx`)

#### Mobile (320px-639px)
- [ ] **320px**: Card renders without horizontal scroll
- [ ] **320px**: Checkbox is ≥44px touch target (min-w-[44px] min-h-[44px])
- [ ] **320px**: Task title readable
- [ ] **320px**: Action buttons visible (opacity-100 on mobile)
- [ ] **320px**: Buttons meet touch target (h-11 from Button)
- [ ] **375px**: Layout improves
- [ ] **414px**: Spacing is appropriate

**Expected Behavior:**
- Checkbox: 24px visual size, 44px touch target
- Task title: text-lg, wraps properly
- Description: text-sm, wraps properly
- Action buttons: Always visible on mobile (opacity-100)
- Buttons: Edit and Delete side-by-side or stacked
- Gap: gap-4 (16px) between elements

**Issues to Watch For:**
- Checkbox too small to tap
- Task title too large on mobile
- Action buttons too small
- Buttons overlapping
- Content overflowing card

---

#### Tablet (640px-1023px)
- [ ] **640px**: Gap increases (sm:gap-5)
- [ ] **640px**: Action buttons hidden until hover (sm:opacity-0)
- [ ] **768px**: Layout adapts well
- [ ] **768px**: Button text visible ("Edit", "Delete")

**Expected Behavior:**
- Gap: gap-5 (20px) at sm+
- Action buttons: Hidden until hover (sm:opacity-0 sm:group-hover:opacity-100)
- Button text: Visible (hidden sm:inline)
- Hover effects work

---

#### Desktop (1024px+)
- [ ] **1024px**: Hover reveals action buttons
- [ ] **1024px**: Checkbox hover effect works
- [ ] **1024px**: Task title hover color changes
- [ ] **1280px**: Layout is balanced
- [ ] **1920px**: Card doesn't stretch too wide

**Expected Behavior:**
- Hover: Action buttons fade in (opacity transition)
- Checkbox: border-primary-400 on hover
- Task title: text-primary-600 on hover (if not completed)
- Smooth transitions (duration-200)

---

## Common Issues to Check

### Layout Issues
- [ ] No horizontal scrolling at any width
- [ ] Content doesn't overflow containers
- [ ] Images/icons scale proportionally
- [ ] Flexbox/Grid layouts adapt properly
- [ ] Z-index stacking is correct

### Typography Issues
- [ ] Font sizes are readable (minimum 16px for body)
- [ ] Line length is appropriate (45-75 characters)
- [ ] Line height is adequate (1.5 for body)
- [ ] No awkward text wrapping
- [ ] Truncation works with ellipsis

### Spacing Issues
- [ ] Adequate padding at all sizes
- [ ] Consistent margins between elements
- [ ] Proper gaps in flex/grid layouts
- [ ] Sufficient whitespace
- [ ] Elements aren't too crowded on mobile

### Interaction Issues
- [ ] Touch targets are ≥44x44px
- [ ] Hover states work on desktop
- [ ] Focus indicators are visible (4px ring)
- [ ] Active states provide feedback
- [ ] Disabled states are clear

---

## Testing Procedure

### For Each Component:

1. **Open the page** containing the component
2. **Set viewport** to 320px width
3. **Check all items** in the mobile checklist
4. **Gradually increase width** to 639px, watching for breaks
5. **Set viewport** to 640px (tablet)
6. **Check all items** in the tablet checklist
7. **Gradually increase width** to 1023px
8. **Set viewport** to 1024px (desktop)
9. **Check all items** in the desktop checklist
10. **Test at 1920px** for ultra-wide displays
11. **Document any issues** found
12. **Fix issues** and re-test

---

## Issue Reporting Template

```markdown
### Issue: [Brief description]

**Component**: [Component name]
**Viewport**: [Width in px]
**Severity**: [Critical / High / Medium / Low]

**Description**:
[Detailed description of the issue]

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happens]

**Screenshot**:
[If applicable]

**Fix**:
[Proposed solution]
```

---

## Sign-off

After completing all tests, sign off on each component:

- [ ] Input Component - Tested and approved
- [ ] Button Component - Tested and approved
- [ ] Card Component - Tested and approved
- [ ] Header Component - Tested and approved
- [ ] LogoutButton Component - Tested and approved
- [ ] TaskForm Component - Tested and approved
- [ ] TaskCard Component - Tested and approved

**Tester**: _______________
**Date**: _______________
**Notes**: _______________

---

**Status**: Ready for manual testing
**Next Step**: Perform manual testing and document results
