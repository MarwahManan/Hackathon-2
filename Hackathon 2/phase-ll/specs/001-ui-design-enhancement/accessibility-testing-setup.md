# Accessibility Testing Tools Setup

**Date**: 2026-02-08
**Task**: T002 - Install accessibility testing tools

## Overview

This document outlines the accessibility testing tools and workflow for validating WCAG 2.1 AA compliance throughout the UI enhancement project.

---

## 1. Browser Extensions (Manual Installation Required)

### 1.1 axe DevTools

**Purpose**: Automated accessibility testing and issue detection

**Installation**:
- Chrome: https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/
- Edge: Available in Chrome Web Store (Edge supports Chrome extensions)

**Usage**:
1. Open browser DevTools (F12)
2. Navigate to "axe DevTools" tab
3. Click "Scan ALL of my page"
4. Review violations by severity (Critical, Serious, Moderate, Minor)
5. Export results for documentation

**Key Features**:
- Automated WCAG 2.1 Level A & AA testing
- Color contrast analysis
- Keyboard navigation detection
- ARIA attribute validation
- Detailed remediation guidance

---

### 1.2 WAVE (Web Accessibility Evaluation Tool)

**Purpose**: Visual accessibility feedback and issue highlighting

**Installation**:
- Chrome: https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/wave-accessibility-tool/
- Edge: Available in Chrome Web Store

**Usage**:
1. Navigate to page to test
2. Click WAVE extension icon
3. Review visual indicators on page:
   - Red icons: Errors
   - Yellow icons: Alerts
   - Green icons: Features
   - Blue icons: Structural elements
4. Click "Details" tab for full report

**Key Features**:
- Visual overlay of accessibility issues
- Color contrast checker
- Structural element visualization
- ARIA landmark identification
- Alternative text validation

---

### 1.3 Lighthouse (Built into Chrome DevTools)

**Purpose**: Comprehensive performance and accessibility auditing

**Usage**:
1. Open Chrome DevTools (F12)
2. Navigate to "Lighthouse" tab
3. Select "Accessibility" category
4. Click "Analyze page load"
5. Review score and recommendations

**Key Features**:
- Accessibility score (0-100)
- Performance metrics
- Best practices validation
- SEO analysis
- Progressive Web App checks

---

## 2. Color Contrast Checkers

### 2.1 WebAIM Contrast Checker

**URL**: https://webaim.org/resources/contrastchecker/

**Usage**:
1. Enter foreground color (text)
2. Enter background color
3. Review contrast ratio
4. Verify WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)

**Colors to Validate**:
- Purple-600 (#9333EA) on white (#FFFFFF)
- Blue-600 (#2563EB) on white (#FFFFFF)
- Gray-600 (#4B5563) on white (body text)
- Gray-400 (#9CA3AF) on white (placeholder text)
- Success-600 (#16A34A) on white
- Error-600 (#DC2626) on white
- Warning-600 (#D97706) on white
- All dark mode combinations

---

### 2.2 Colour Contrast Analyser (Desktop App)

**URL**: https://www.tpgi.com/color-contrast-checker/

**Features**:
- Eyedropper tool for sampling colors from screen
- Real-time contrast ratio calculation
- WCAG 2.1 Level AA & AAA validation
- Color blindness simulation

---

## 3. Screen Reader Testing

### 3.1 NVDA (Windows)

**Download**: https://www.nvaccess.org/download/

**Basic Commands**:
- Start/Stop: Ctrl + Alt + N
- Read next item: Down Arrow
- Read previous item: Up Arrow
- Read all: Insert + Down Arrow
- Stop reading: Ctrl

**Testing Checklist**:
- [ ] All interactive elements are announced
- [ ] Form labels are properly associated
- [ ] Error messages are announced
- [ ] Dynamic content changes are announced
- [ ] Navigation landmarks are identified

---

### 3.2 VoiceOver (macOS)

**Activation**: Cmd + F5

**Basic Commands**:
- Start/Stop: Cmd + F5
- Read next item: VO + Right Arrow
- Read previous item: VO + Left Arrow
- Interact with element: VO + Space
- Read all: VO + A

---

## 4. Keyboard Navigation Testing

### 4.1 Manual Testing Procedure

**Test Sequence**:
1. **Tab Navigation**
   - Press Tab to move forward through interactive elements
   - Press Shift + Tab to move backward
   - Verify focus indicators are visible (4px ring, 3:1 contrast)
   - Verify logical tab order

2. **Button Activation**
   - Press Enter or Space on focused buttons
   - Verify action is triggered
   - Verify focus remains or moves appropriately

3. **Link Navigation**
   - Press Enter on focused links
   - Verify navigation occurs

4. **Form Interaction**
   - Tab through form fields
   - Enter data in inputs
   - Verify validation messages are accessible
   - Submit form with Enter key

5. **Modal/Dialog Interaction**
   - Open modal with keyboard
   - Verify focus is trapped within modal
   - Close modal with Escape key
   - Verify focus returns to trigger element

**Keyboard Testing Checklist**:
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible on all elements
- [ ] Tab order is logical and intuitive
- [ ] No keyboard traps exist
- [ ] Escape key closes modals/dialogs
- [ ] Enter/Space activates buttons
- [ ] Arrow keys work in custom controls

---

## 5. Touch Target Testing

### 5.1 Measurement Tool

**Browser DevTools Method**:
1. Open DevTools (F12)
2. Select element with inspector
3. View computed dimensions in Styles panel
4. Verify width and height ≥ 44px

**Manual Measurement**:
1. Take screenshot of interface
2. Use image editor to measure interactive elements
3. Verify minimum 44x44px for all touch targets

**Elements to Measure**:
- [ ] All buttons (primary, secondary, tertiary, danger)
- [ ] All form inputs (text, email, password, textarea)
- [ ] Checkboxes and radio buttons
- [ ] Links in navigation
- [ ] Icon-only buttons
- [ ] Close buttons on modals
- [ ] Dropdown triggers

---

## 6. Responsive Design Testing

### 6.1 Browser DevTools Device Emulation

**Chrome DevTools**:
1. Open DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl + Shift + M)
3. Select device or enter custom dimensions
4. Test at key breakpoints:
   - 320px (small mobile)
   - 375px (mobile)
   - 640px (large mobile)
   - 768px (tablet)
   - 1024px (desktop)
   - 1280px (large desktop)
   - 1920px (full HD)

**Testing Checklist**:
- [ ] Layout adapts appropriately at each breakpoint
- [ ] Text remains readable (no overflow or wrapping issues)
- [ ] Images scale properly
- [ ] Navigation is accessible on mobile
- [ ] Touch targets are adequate on mobile
- [ ] No horizontal scrolling (except intentional)
- [ ] Content hierarchy is maintained

---

### 6.2 Real Device Testing (Recommended)

**Devices to Test**:
- iPhone (iOS Safari)
- Android phone (Chrome)
- iPad (iOS Safari)
- Android tablet (Chrome)

**Testing Focus**:
- Touch interactions
- Gesture support
- Viewport rendering
- Font rendering
- Performance

---

## 7. Testing Workflow

### 7.1 Per-Component Testing

**When**: After upgrading each component

**Steps**:
1. Run axe DevTools scan on page containing component
2. Fix any critical or serious violations
3. Validate color contrast with WebAIM checker
4. Test keyboard navigation
5. Verify touch targets meet 44x44px minimum
6. Test on mobile viewport (375px)
7. Document results

---

### 7.2 Per-Page Testing

**When**: After improving each page layout

**Steps**:
1. Run axe DevTools full page scan
2. Run WAVE scan for visual feedback
3. Run Lighthouse accessibility audit
4. Test complete keyboard navigation flow
5. Test with screen reader (NVDA or VoiceOver)
6. Test responsive behavior at all breakpoints
7. Capture screenshots for documentation
8. Document improvements and metrics

---

### 7.3 Final Validation

**When**: After completing all improvements

**Steps**:
1. Run axe DevTools on all pages
2. Run WAVE on all pages
3. Run Lighthouse on all pages
4. Complete keyboard navigation testing
5. Complete screen reader testing
6. Validate all color contrasts
7. Verify all touch targets
8. Test on real devices
9. Generate final accessibility report
10. Document compliance status

---

## 8. Issue Tracking Template

### Issue Format

```markdown
## Accessibility Issue: [Brief Description]

**Severity**: Critical | Serious | Moderate | Minor
**WCAG Criterion**: [e.g., 1.4.3 Contrast (Minimum)]
**Component/Page**: [e.g., Button component, Sign In page]
**Tool**: [e.g., axe DevTools, Manual testing]

**Description**:
[Detailed description of the issue]

**Current State**:
[What is currently happening]

**Expected State**:
[What should happen to meet WCAG 2.1 AA]

**Remediation**:
[Steps to fix the issue]

**Verification**:
- [ ] Issue fixed
- [ ] Retested with tool
- [ ] Manually verified
- [ ] Documented in before/after
```

---

## 9. Documentation Requirements

### Per-Component Documentation

**Location**: `specs/001-ui-design-enhancement/before-after/components/`

**Content**:
- Before screenshot
- After screenshot
- List of accessibility improvements
- Contrast ratio measurements
- Touch target measurements
- axe DevTools scan results

---

### Per-Page Documentation

**Location**: `specs/001-ui-design-enhancement/before-after/pages/`

**Content**:
- Before screenshot (desktop and mobile)
- After screenshot (desktop and mobile)
- List of layout improvements
- Accessibility improvements
- Lighthouse scores (before and after)
- Keyboard navigation notes

---

## 10. Success Criteria

### Component-Level Success

- [ ] Zero critical violations in axe DevTools
- [ ] All color contrasts meet WCAG 2.1 AA (4.5:1 for text, 3:1 for UI)
- [ ] All touch targets ≥ 44x44px
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible (4px ring, 3:1 contrast)
- [ ] Proper ARIA labels on icon-only buttons
- [ ] Semantic HTML used correctly

---

### Page-Level Success

- [ ] Zero critical violations in axe DevTools
- [ ] Lighthouse accessibility score ≥ 95
- [ ] Complete keyboard navigation flow works
- [ ] Screen reader announces all content correctly
- [ ] Responsive design works at all breakpoints (320px-2560px)
- [ ] No layout shifts or visual bugs
- [ ] All forms are accessible and usable

---

### Application-Level Success

- [ ] All pages pass accessibility validation
- [ ] Comprehensive documentation complete
- [ ] Before/after comparisons documented
- [ ] Design system documentation created
- [ ] Testing workflow established
- [ ] Compliance checklist completed

---

## 11. Resources

### Official Guidelines
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/

### Testing Tools
- axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

### Learning Resources
- WebAIM: https://webaim.org/
- A11y Project: https://www.a11yproject.com/
- MDN Accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility

---

**Status**: ✅ Setup documentation complete
**Next Step**: Install browser extensions and begin testing workflow
