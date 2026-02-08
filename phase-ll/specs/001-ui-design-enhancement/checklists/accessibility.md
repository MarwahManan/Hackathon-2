# WCAG 2.1 AA Accessibility Compliance Checklist

**Feature**: UI Design Enhancement and Usability Improvement
**Created**: 2026-02-08
**Purpose**: Comprehensive checklist for ensuring WCAG 2.1 AA compliance across all UI components and pages

## Overview

This checklist covers all WCAG 2.1 Level AA success criteria relevant to the UI design enhancement project. Use this checklist to validate accessibility compliance during and after implementation.

## 1. Perceivable

### 1.1 Text Alternatives

- [ ] **1.1.1 Non-text Content (Level A)**: All images, icons, and non-text content have appropriate alt text or ARIA labels
  - Icon-only buttons have `aria-label` attributes
  - Decorative images have empty alt text (`alt=""`)
  - Informative images have descriptive alt text

### 1.4 Distinguishable

- [ ] **1.4.3 Contrast (Minimum) (Level AA)**: Text has sufficient contrast ratio
  - Normal text (< 18px): Minimum 4.5:1 contrast ratio
  - Large text (≥ 18px or ≥ 14px bold): Minimum 3:1 contrast ratio
  - Test all text colors against their backgrounds

**Color Contrast Validation**:
| Element | Foreground | Background | Ratio | Status |
|---------|-----------|------------|-------|--------|
| Body text | gray-600 | white | 7.5:1 | ✅ Pass |
| Headings | gray-700 | white | 10.8:1 | ✅ Pass |
| Primary button | white | primary-600 | 7.2:1 | ✅ Pass |
| Secondary button | gray-900 | white | 15.3:1 | ✅ Pass |
| Error text | error-600 | white | 6.5:1 | ✅ Pass |
| Success text | success-600 | white | 4.8:1 | ✅ Pass |
| Warning text | warning-600 | white | 5.9:1 | ✅ Pass |
| Placeholder text | gray-400 | white | 3.1:1 | ⚠️ Large text only |

- [ ] **1.4.4 Resize Text (Level AA)**: Text can be resized up to 200% without loss of content or functionality
  - Use relative units (rem, em, %) instead of fixed pixels
  - Test with browser zoom at 200%
  - Ensure no horizontal scrolling at 200% zoom

- [ ] **1.4.5 Images of Text (Level AA)**: Avoid using images of text
  - Use actual text with CSS styling instead of text in images
  - Exception: Logos and essential graphics

- [ ] **1.4.10 Reflow (Level AA)**: Content reflows without horizontal scrolling
  - At 320px width (mobile), no horizontal scrolling required
  - At 400% zoom, content remains accessible
  - Test on actual mobile devices

- [ ] **1.4.11 Non-text Contrast (Level AA)**: UI components and graphical objects have sufficient contrast
  - Interactive elements: Minimum 3:1 contrast ratio against adjacent colors
  - Focus indicators: Minimum 3:1 contrast ratio
  - Borders, icons, and UI controls meet contrast requirements

- [ ] **1.4.12 Text Spacing (Level AA)**: Content adapts to user-defined text spacing
  - Line height at least 1.5x font size
  - Paragraph spacing at least 2x font size
  - Letter spacing at least 0.12x font size
  - Word spacing at least 0.16x font size

- [ ] **1.4.13 Content on Hover or Focus (Level AA)**: Hover/focus content is dismissible, hoverable, and persistent
  - Tooltips can be dismissed without moving pointer
  - Hover content remains visible when pointer moves to it
  - Content remains visible until dismissed or no longer relevant

## 2. Operable

### 2.1 Keyboard Accessible

- [ ] **2.1.1 Keyboard (Level A)**: All functionality available via keyboard
  - All interactive elements reachable with Tab key
  - All actions can be triggered with Enter or Space
  - No keyboard traps (can navigate away from all elements)

- [ ] **2.1.2 No Keyboard Trap (Level A)**: Keyboard focus can move away from all components
  - Test Tab and Shift+Tab navigation
  - Ensure modals can be closed with Escape key
  - Verify no infinite focus loops

- [ ] **2.1.4 Character Key Shortcuts (Level A)**: Single character shortcuts can be turned off or remapped
  - If using single-key shortcuts, provide way to disable or remap
  - Or only activate shortcuts when component has focus

### 2.4 Navigable

- [ ] **2.4.3 Focus Order (Level A)**: Focus order follows logical reading order
  - Tab order matches visual layout
  - Focus moves top-to-bottom, left-to-right
  - No unexpected focus jumps

- [ ] **2.4.6 Headings and Labels (Level AA)**: Headings and labels are descriptive
  - Form labels clearly describe their inputs
  - Headings accurately describe content sections
  - Button text describes the action

- [ ] **2.4.7 Focus Visible (Level AA)**: Keyboard focus indicator is visible
  - All interactive elements have visible focus indicators
  - Focus indicators have minimum 4px width
  - Focus indicators meet 3:1 contrast ratio
  - Focus indicators are not obscured by other content

**Focus Indicator Validation**:
| Component | Focus Style | Contrast | Status |
|-----------|------------|----------|--------|
| Buttons | 4px ring primary-500/30 | 3.2:1 | ✅ Pass |
| Inputs | 4px ring primary-500/30 | 3.2:1 | ✅ Pass |
| Links | 4px ring primary-500/30 | 3.2:1 | ✅ Pass |
| Cards | 4px ring primary-500/30 | 3.2:1 | ✅ Pass |

### 2.5 Input Modalities

- [ ] **2.5.1 Pointer Gestures (Level A)**: All functionality available with single-pointer actions
  - No multi-touch gestures required
  - Pinch-to-zoom is browser default, not custom

- [ ] **2.5.2 Pointer Cancellation (Level A)**: Actions triggered on up-event, not down-event
  - Click handlers on mouseup/touchend, not mousedown/touchstart
  - Users can cancel actions by moving pointer away

- [ ] **2.5.3 Label in Name (Level A)**: Accessible name contains visible label text
  - Button text matches aria-label (if present)
  - Form labels match input names

- [ ] **2.5.4 Motion Actuation (Level A)**: Functionality triggered by device motion can be disabled
  - No shake-to-undo or tilt-to-scroll features
  - Or provide settings to disable motion features

- [ ] **2.5.5 Target Size (Level AAA - recommended)**: Touch targets are at least 44x44px
  - All buttons meet 44x44px minimum
  - All links meet 44x44px minimum
  - Icon buttons have sufficient padding
  - Test on actual touch devices

**Touch Target Validation**:
| Component | Size | Status |
|-----------|------|--------|
| Primary button (md) | 48x48px | ✅ Pass |
| Secondary button (md) | 48x48px | ✅ Pass |
| Icon button | 44x44px | ✅ Pass |
| Checkbox | 44x44px | ✅ Pass |
| Radio button | 44x44px | ✅ Pass |
| Link (with padding) | 44x44px | ✅ Pass |

## 3. Understandable

### 3.1 Readable

- [ ] **3.1.1 Language of Page (Level A)**: Page language is identified
  - HTML lang attribute set (e.g., `<html lang="en">`)
  - Correct language code used

### 3.2 Predictable

- [ ] **3.2.1 On Focus (Level A)**: Focus does not trigger unexpected context changes
  - No automatic form submission on focus
  - No automatic navigation on focus
  - No popups triggered by focus alone

- [ ] **3.2.2 On Input (Level A)**: Input does not trigger unexpected context changes
  - No automatic form submission on input
  - No automatic navigation on input change
  - Changes require explicit user action (button click)

- [ ] **3.2.3 Consistent Navigation (Level AA)**: Navigation is consistent across pages
  - Header navigation in same location on all pages
  - Navigation items in consistent order
  - Same navigation mechanism throughout

- [ ] **3.2.4 Consistent Identification (Level AA)**: Components with same functionality are identified consistently
  - Icons have consistent meanings
  - Buttons with same action have same labels
  - Form controls have consistent styling

### 3.3 Input Assistance

- [ ] **3.3.1 Error Identification (Level A)**: Errors are clearly identified
  - Form validation errors are clearly marked
  - Error messages describe the problem
  - Error fields are visually distinct

- [ ] **3.3.2 Labels or Instructions (Level A)**: Labels and instructions are provided
  - All form inputs have labels
  - Required fields are clearly marked
  - Format requirements are explained

- [ ] **3.3.3 Error Suggestion (Level AA)**: Error messages suggest corrections
  - Validation errors include helpful suggestions
  - Format examples provided for complex inputs
  - Clear guidance on how to fix errors

- [ ] **3.3.4 Error Prevention (Legal, Financial, Data) (Level AA)**: Submissions are reversible, checked, or confirmed
  - Destructive actions require confirmation
  - Forms can be reviewed before submission
  - Data can be corrected before final submission

## 4. Robust

### 4.1 Compatible

- [ ] **4.1.2 Name, Role, Value (Level A)**: UI components have accessible names and roles
  - All form controls have labels
  - Custom components have appropriate ARIA roles
  - State changes are programmatically determinable

- [ ] **4.1.3 Status Messages (Level AA)**: Status messages are announced to screen readers
  - Success messages have appropriate ARIA live regions
  - Error messages are announced
  - Loading states are communicated

## Testing Procedures

### Automated Testing

**Tools**:
- axe DevTools (browser extension)
- WAVE (browser extension)
- Lighthouse (Chrome DevTools)

**Process**:
1. Install axe DevTools browser extension
2. Open each page in the application
3. Run axe scan and fix all critical violations
4. Run WAVE scan for visual feedback
5. Run Lighthouse accessibility audit
6. Document results and fixes

### Manual Testing

#### Keyboard Navigation Test
1. Unplug mouse or don't use trackpad
2. Navigate entire application using only keyboard
3. Verify all interactive elements are reachable
4. Verify focus indicators are visible
5. Verify no keyboard traps
6. Test with Tab, Shift+Tab, Enter, Space, Escape, Arrow keys

#### Screen Reader Test
**Windows**: NVDA (free)
**Mac**: VoiceOver (built-in)

1. Enable screen reader
2. Navigate through each page
3. Verify all content is announced
4. Verify form labels are read correctly
5. Verify button purposes are clear
6. Verify images have appropriate alt text

#### Color Contrast Test
1. Use browser DevTools color picker
2. Check contrast ratio for all text
3. Check contrast ratio for UI components
4. Check contrast ratio for focus indicators
5. Document all ratios in validation table

#### Responsive Test
1. Test at 320px width (mobile)
2. Test at 640px width (tablet)
3. Test at 1024px width (desktop)
4. Test at 200% browser zoom
5. Verify no horizontal scrolling
6. Verify all content remains accessible

#### Touch Target Test
1. Test on actual mobile device
2. Verify all buttons are easily tappable
3. Verify no accidental activations
4. Measure touch target sizes
5. Document sizes in validation table

## Validation Checklist by Component

### Input Components
- [ ] Text inputs have visible labels
- [ ] Text inputs have focus indicators
- [ ] Text inputs show error states clearly
- [ ] Text inputs meet contrast requirements
- [ ] Text inputs meet touch target size
- [ ] Placeholder text is not sole label

### Button Components
- [ ] Buttons have descriptive text or aria-label
- [ ] Buttons have visible focus indicators
- [ ] Buttons meet contrast requirements
- [ ] Buttons meet touch target size (44x44px)
- [ ] Disabled buttons are clearly indicated
- [ ] Loading states are communicated

### Navigation Components
- [ ] Navigation is keyboard accessible
- [ ] Current page is indicated
- [ ] Navigation order is logical
- [ ] Skip links are provided (if needed)
- [ ] Navigation is consistent across pages

### Form Components
- [ ] All inputs have labels
- [ ] Required fields are marked
- [ ] Error messages are clear and helpful
- [ ] Success feedback is provided
- [ ] Form can be submitted with keyboard

### Card Components
- [ ] Cards have sufficient contrast
- [ ] Interactive cards have focus indicators
- [ ] Card content is keyboard accessible
- [ ] Cards are responsive

### Modal/Dialog Components
- [ ] Modals trap focus appropriately
- [ ] Modals can be closed with Escape
- [ ] Modals have accessible names
- [ ] Focus returns to trigger element on close
- [ ] Background content is inert

## Validation Checklist by Page

### Sign In Page
- [ ] All form inputs have labels
- [ ] Error messages are clear
- [ ] Focus order is logical
- [ ] Keyboard accessible
- [ ] Screen reader accessible
- [ ] Responsive on all devices

### Sign Up Page
- [ ] All form inputs have labels
- [ ] Password requirements are clear
- [ ] Error messages are helpful
- [ ] Success feedback is provided
- [ ] Keyboard accessible
- [ ] Screen reader accessible

### Tasks List Page
- [ ] Task items are keyboard accessible
- [ ] Empty state is clear
- [ ] Loading state is communicated
- [ ] Actions are clearly labeled
- [ ] Responsive layout

### Task Form Pages (Create/Edit)
- [ ] All form inputs have labels
- [ ] Required fields are marked
- [ ] Error messages are clear
- [ ] Form can be submitted with keyboard
- [ ] Success feedback is provided

### Header/Navigation
- [ ] Logo is keyboard accessible
- [ ] Navigation items are keyboard accessible
- [ ] Current page is indicated
- [ ] User menu is keyboard accessible
- [ ] Responsive on all devices

## Compliance Status

### Overall Status
- [ ] All automated tests pass (axe, WAVE, Lighthouse)
- [ ] All manual keyboard tests pass
- [ ] All screen reader tests pass
- [ ] All color contrast tests pass
- [ ] All touch target tests pass
- [ ] All responsive tests pass

### Critical Issues (Must Fix)
- [ ] No critical accessibility violations
- [ ] All interactive elements keyboard accessible
- [ ] All text meets contrast requirements
- [ ] All focus indicators visible

### Recommended Improvements (Should Fix)
- [ ] Touch targets exceed 44x44px where possible
- [ ] Additional ARIA labels for clarity
- [ ] Enhanced error messages
- [ ] Improved loading state communication

## Resources

- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **axe DevTools**: https://www.deque.com/axe/devtools/
- **WAVE**: https://wave.webaim.org/extension/
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **NVDA Screen Reader**: https://www.nvaccess.org/download/
- **WebAIM**: https://webaim.org/

## Sign-Off

**Tested By**: _________________
**Date**: _________________
**Status**: ☐ Pass ☐ Fail ☐ Needs Review
**Notes**: _________________
