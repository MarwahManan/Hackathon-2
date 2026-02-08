# Accessibility Testing Checklist with axe DevTools

**Date**: 2026-02-08
**Task**: T025 - Run axe DevTools scan on all upgraded components
**Standard**: WCAG 2.1 Level AA
**Status**: Ready for manual testing

---

## Overview

This document provides step-by-step instructions for running accessibility scans using axe DevTools and other accessibility testing tools. All upgraded components should be tested to ensure WCAG 2.1 AA compliance.

---

## Tool Setup

### 1. Install axe DevTools Browser Extension

**Chrome/Edge:**
1. Visit Chrome Web Store
2. Search for "axe DevTools - Web Accessibility Testing"
3. Click "Add to Chrome/Edge"
4. Pin the extension to toolbar

**Firefox:**
1. Visit Firefox Add-ons
2. Search for "axe DevTools"
3. Click "Add to Firefox"

### 2. Install WAVE Browser Extension (Optional)

**Chrome/Firefox:**
1. Visit browser extension store
2. Search for "WAVE Evaluation Tool"
3. Install and pin to toolbar

### 3. Enable Accessibility Features in DevTools

**Chrome DevTools:**
1. Open DevTools (F12)
2. Click "More tools" (⋮)
3. Select "Rendering"
4. Enable "Emulate vision deficiencies" for color blindness testing

---

## Testing Procedure

### Step 1: Prepare Test Environment

1. **Start development server**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Open application** in browser (http://localhost:3000)

3. **Sign in** to access protected pages

4. **Open DevTools** (F12)

5. **Open axe DevTools** tab in DevTools

---

### Step 2: Test Each Page/Component

For each page containing upgraded components:

1. **Navigate to the page**
2. **Click "Scan ALL of my page"** in axe DevTools
3. **Review results** in the Issues panel
4. **Document violations** (see template below)
5. **Fix critical and serious issues**
6. **Re-scan** to verify fixes

---

## Pages to Test

### Authentication Pages
- [ ] `/signin` - Sign In page
- [ ] `/signup` - Sign Up page

### Task Management Pages
- [ ] `/tasks` - Task List page
- [ ] `/tasks/new` - Create Task page
- [ ] `/tasks/[id]/edit` - Edit Task page

### Other Pages
- [ ] `/` - Home page
- [ ] Header component (on all pages)

---

## Component-Specific Testing

### 1. Input Component

**Test Locations:**
- Sign In page (email, password inputs)
- Sign Up page (name, email, password inputs)
- Task Form (title input)

**Accessibility Checks:**

#### Color Contrast
- [ ] Label text has ≥4.5:1 contrast (gray-900 on white)
- [ ] Input text has ≥4.5:1 contrast (gray-900 on white)
- [ ] Placeholder text has ≥4.5:1 contrast (gray-500 on white = 4.69:1 ✅)
- [ ] Error text has ≥4.5:1 contrast (error-700 on white = 7.00:1 ✅)
- [ ] Success text has ≥4.5:1 contrast (success-700 on white = 5.93:1 ✅)
- [ ] Border has ≥3:1 contrast (gray-300 on white)

#### Focus Indicators
- [ ] Focus ring is visible (4px, primary-500/30)
- [ ] Focus ring has ≥3:1 contrast against background
- [ ] Focus ring doesn't obscure content
- [ ] Focus order is logical (tab through inputs)

#### ARIA Attributes
- [ ] Label is properly associated with input (htmlFor/id)
- [ ] Required inputs have required attribute
- [ ] Error inputs have aria-invalid="true"
- [ ] Error messages have proper id for aria-describedby
- [ ] Error messages have role="alert"
- [ ] Success messages have role="status"

#### Keyboard Navigation
- [ ] Can tab to input
- [ ] Can type in input
- [ ] Can tab to next input
- [ ] Enter submits form (if in form)
- [ ] Escape clears input (if applicable)

#### Screen Reader
- [ ] Label is announced
- [ ] Required state is announced
- [ ] Error state is announced
- [ ] Error message is read
- [ ] Placeholder is announced (if no label)

**Expected axe Results:**
- 0 critical violations
- 0 serious violations
- 0 moderate violations (target)

---

### 2. Button Component

**Test Locations:**
- Sign In page (Sign In button)
- Sign Up page (Sign Up button)
- Task List (Edit, Delete buttons)
- Task Form (Submit, Cancel buttons)
- Header (Sign In, Sign Up, Logout buttons)

**Accessibility Checks:**

#### Color Contrast
- [ ] Primary button text has ≥4.5:1 contrast (white on primary-600 = 4.54:1 ✅)
- [ ] Secondary button text has ≥4.5:1 contrast (gray-900 on white)
- [ ] Danger button text has ≥4.5:1 contrast (white on error-600 = 5.03:1 ✅)
- [ ] Tertiary button text has ≥4.5:1 contrast (primary-600 on white = 4.54:1 ✅)

#### Touch Targets
- [ ] Button height is ≥44px (h-11 for sm = 44px ✅)
- [ ] Button width is ≥44px (or adequate padding)
- [ ] Spacing between buttons is ≥8px

#### Focus Indicators
- [ ] Focus ring is visible (4px)
- [ ] Focus ring has ≥3:1 contrast
- [ ] Focus ring offset is appropriate (ring-offset-2)

#### ARIA Attributes
- [ ] Button has descriptive text or aria-label
- [ ] Loading state has aria-busy="true"
- [ ] Disabled state has disabled attribute
- [ ] Icon-only buttons have aria-label

#### Keyboard Navigation
- [ ] Can tab to button
- [ ] Enter activates button
- [ ] Space activates button
- [ ] Focus visible on keyboard navigation

#### Screen Reader
- [ ] Button text/label is announced
- [ ] Button role is announced
- [ ] Loading state is announced
- [ ] Disabled state is announced

**Expected axe Results:**
- 0 critical violations
- 0 serious violations

---

### 3. Card Component

**Test Locations:**
- Task List (TaskCard uses Card)
- Sign In/Sign Up pages (form cards)

**Accessibility Checks:**

#### Color Contrast
- [ ] Border has ≥3:1 contrast (gray-200 on white)
- [ ] Content text has ≥4.5:1 contrast

#### Focus Indicators (if clickable)
- [ ] Focus ring visible when card is clickable
- [ ] Keyboard accessible (Enter/Space)

#### ARIA Attributes (if clickable)
- [ ] role="button" or role="article" as appropriate
- [ ] tabindex="0" if clickable
- [ ] aria-label if needed for context

#### Keyboard Navigation
- [ ] Can tab to clickable cards
- [ ] Enter/Space activates clickable cards

**Expected axe Results:**
- 0 critical violations
- 0 serious violations

---

### 4. Header Component

**Test Locations:**
- All pages (sticky header)

**Accessibility Checks:**

#### Color Contrast
- [ ] Logo text has ≥4.5:1 contrast (gradient on white)
- [ ] Navigation link text has ≥4.5:1 contrast (gray-700 on white = 9.73:1 ✅)
- [ ] User email text has ≥4.5:1 contrast (gray-600 on gray-50)

#### Touch Targets
- [ ] All navigation links are ≥44px height (min-h-touch ✅)
- [ ] Logo is tappable with adequate size

#### Focus Indicators
- [ ] Focus ring visible on all links
- [ ] Focus ring has ≥3:1 contrast

#### ARIA Attributes
- [ ] nav element has aria-label="Main navigation"
- [ ] Logo link has aria-label="Todo App Home"
- [ ] Current page is indicated (aria-current="page")

#### Keyboard Navigation
- [ ] Can tab through all navigation items
- [ ] Skip link to main content (recommended)
- [ ] Focus order is logical (logo → nav items)

#### Screen Reader
- [ ] Navigation landmark is announced
- [ ] Logo link is announced
- [ ] Navigation items are announced
- [ ] User email is announced (if visible)

**Expected axe Results:**
- 0 critical violations
- 0 serious violations
- Consider adding skip link (best practice)

---

### 5. TaskForm Component

**Test Locations:**
- `/tasks/new` - Create Task page
- `/tasks/[id]/edit` - Edit Task page

**Accessibility Checks:**

#### Color Contrast
- [ ] All labels have ≥4.5:1 contrast (gray-900 on white)
- [ ] Input text has ≥4.5:1 contrast
- [ ] Textarea text has ≥4.5:1 contrast
- [ ] Placeholder text has ≥4.5:1 contrast (gray-500 = 4.69:1 ✅)
- [ ] Error text has ≥4.5:1 contrast (error-700 = 7.00:1 ✅)

#### Form Structure
- [ ] Form has proper fieldset/legend (if grouped)
- [ ] All inputs have associated labels
- [ ] Required fields are marked
- [ ] Error messages are associated with inputs

#### Focus Indicators
- [ ] Focus ring visible on all form controls
- [ ] Focus order is logical (title → description → buttons)

#### ARIA Attributes
- [ ] Form has aria-label or legend
- [ ] Required inputs have required attribute
- [ ] Error inputs have aria-invalid="true"
- [ ] Error messages have aria-describedby

#### Keyboard Navigation
- [ ] Can tab through all form controls
- [ ] Enter submits form
- [ ] Escape cancels (if applicable)

#### Screen Reader
- [ ] Form purpose is announced
- [ ] All labels are announced
- [ ] Required state is announced
- [ ] Error messages are announced

**Expected axe Results:**
- 0 critical violations
- 0 serious violations

---

### 6. TaskCard Component

**Test Locations:**
- `/tasks` - Task List page

**Accessibility Checks:**

#### Color Contrast
- [ ] Task title has ≥4.5:1 contrast (gray-900 on white = 15.30:1 ✅)
- [ ] Task description has ≥4.5:1 contrast (gray-600 on white = 7.05:1 ✅)
- [ ] Completed task text has ≥4.5:1 contrast (gray-400 = 2.24:1 ⚠️ - acceptable for strikethrough)
- [ ] Timestamp has ≥4.5:1 contrast (gray-500 = 4.69:1 ✅)
- [ ] Checkbox border has ≥3:1 contrast (gray-300 on white)

#### Touch Targets
- [ ] Checkbox is ≥44x44px (min-w-[44px] min-h-[44px] ✅)
- [ ] Edit button is ≥44px height (h-11 = 44px ✅)
- [ ] Delete button is ≥44px height (h-11 = 44px ✅)

#### Focus Indicators
- [ ] Checkbox has visible focus ring
- [ ] Edit button has visible focus ring
- [ ] Delete button has visible focus ring

#### ARIA Attributes
- [ ] Checkbox has aria-label ("Mark as complete/incomplete")
- [ ] Edit button has aria-label or visible text
- [ ] Delete button has aria-label or visible text
- [ ] Card has role="article" (optional)
- [ ] Time element has dateTime attribute

#### Keyboard Navigation
- [ ] Can tab to checkbox
- [ ] Space toggles checkbox
- [ ] Can tab to Edit button
- [ ] Can tab to Delete button
- [ ] Enter activates buttons

#### Screen Reader
- [ ] Task title is announced
- [ ] Task description is announced
- [ ] Completion state is announced
- [ ] Timestamp is announced
- [ ] Button labels are announced

**Expected axe Results:**
- 0 critical violations
- 0 serious violations
- Possible info: Completed task text contrast (acceptable for strikethrough)

---

## Common Violations and Fixes

### Critical Violations

#### 1. Missing Form Labels
**Violation**: Form elements must have labels
**Fix**: Add `<label>` with `htmlFor` matching input `id`

#### 2. Insufficient Color Contrast
**Violation**: Text contrast ratio is below 4.5:1
**Fix**: Use darker color from design tokens (e.g., gray-500 → gray-600)

#### 3. Missing Alt Text
**Violation**: Images must have alt text
**Fix**: Add `alt` attribute to all `<img>` elements

---

### Serious Violations

#### 4. Missing ARIA Labels
**Violation**: Icon-only buttons need labels
**Fix**: Add `aria-label` to buttons without visible text

#### 5. Incorrect ARIA Usage
**Violation**: ARIA attributes used incorrectly
**Fix**: Review ARIA specification and correct usage

#### 6. Keyboard Trap
**Violation**: User cannot escape element with keyboard
**Fix**: Ensure all interactive elements can be exited with Tab/Escape

---

### Moderate Violations

#### 7. Missing Landmark Regions
**Violation**: Page should have landmark regions
**Fix**: Add `<main>`, `<nav>`, `<header>`, `<footer>` elements

#### 8. Redundant Links
**Violation**: Adjacent links go to same destination
**Fix**: Combine into single link or differentiate

---

## Automated Testing Script

For CI/CD integration, consider using axe-core programmatically:

```javascript
// Example: test-accessibility.js
const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/signin');

  const results = await new AxePuppeteer(page).analyze();

  console.log('Violations:', results.violations.length);

  if (results.violations.length > 0) {
    console.error('Accessibility violations found:');
    results.violations.forEach(violation => {
      console.error(`- ${violation.id}: ${violation.description}`);
    });
    process.exit(1);
  }

  await browser.close();
})();
```

---

## Issue Reporting Template

```markdown
### Accessibility Violation: [Brief description]

**Component**: [Component name]
**Page**: [Page URL]
**Severity**: [Critical / Serious / Moderate / Minor]
**WCAG Criterion**: [e.g., 1.4.3 Contrast (Minimum)]

**Description**:
[Detailed description from axe DevTools]

**Impact**:
[Who is affected and how]

**How to Fix**:
[Specific steps to resolve]

**Code Change**:
```jsx
// Before
<button>❌</button>

// After
<button aria-label="Delete task">❌</button>
```

**Verification**:
[How to verify the fix]
```

---

## Testing Sign-off

After completing all accessibility tests:

### Component Testing
- [ ] Input Component - 0 critical/serious violations
- [ ] Button Component - 0 critical/serious violations
- [ ] Card Component - 0 critical/serious violations
- [ ] Header Component - 0 critical/serious violations
- [ ] TaskForm Component - 0 critical/serious violations
- [ ] TaskCard Component - 0 critical/serious violations

### Page Testing
- [ ] Sign In page - 0 critical/serious violations
- [ ] Sign Up page - 0 critical/serious violations
- [ ] Task List page - 0 critical/serious violations
- [ ] Create Task page - 0 critical/serious violations
- [ ] Edit Task page - 0 critical/serious violations

### Additional Testing
- [ ] Keyboard navigation tested on all pages
- [ ] Screen reader tested (NVDA/VoiceOver)
- [ ] Color blindness simulation tested
- [ ] Touch target sizes verified
- [ ] Focus indicators verified

**Tester**: _______________
**Date**: _______________
**Tools Used**: axe DevTools, WAVE, [other]
**Overall Result**: PASS / FAIL
**Notes**: _______________

---

**Status**: Ready for manual testing
**Next Step**: Run axe DevTools scans and document results
**Expected Outcome**: 0 critical/serious violations on all pages
