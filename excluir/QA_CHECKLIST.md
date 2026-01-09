# QA CHECKLIST - Velox-Grade Refactor

## PRE-FLIGHT CHECK

### Installation & Build
- [x] Dependencies installed (`npm install`)
- [x] Production build successful (`npm run build`)
- [ ] Development server runs (`npm run dev`)
- [ ] No console errors on initial load
- [ ] No TypeScript errors

---

## CRITICAL FLOWS TO TEST

### 1. Onboarding Flow
**Path**: First-time user → Onboarding → Home

**Test Steps:**
1. Clear localStorage: `localStorage.clear()` in browser console
2. Refresh page
3. Should see OnboardingV2 screen
4. **Step 1**: Select "Conhecer outros países" → Click "Continuar"
5. **Step 2**: Select "R$ 2.000 - R$ 5.000" → Click "Continuar"
6. **Step 3**: Select "Intermediário - Algumas viagens" → Click "Começar"
7. Should navigate to HomeV4
8. Refresh page - should NOT see onboarding again

**Expected:**
- ✅ Smooth progress indicator animation
- ✅ Ring focus on selected option (primary accent)
- ✅ "Começar" button on final step
- ✅ localStorage saves `onboarding_complete: "true"`
- ✅ Skip button works (top-right)

**Visual Check:**
- Glass surface cards with proper blur
- Primary accent ring (green, not purple)
- Emoji icons display correctly
- Button states (disabled when nothing selected)

---

### 2. Home V4 Screen
**Path**: Home tab (bottom navigation)

**Test Steps:**
1. Navigate to Home
2. Scroll through all sections
3. Test chip tabs (click each filter)
4. Click on Continue Watching cards
5. Click on Featured posters
6. Click on Offers
7. Click on Article cards

**Expected:**
- ✅ Hero banner displays with image
- ✅ "Olá, {{contact.first_name}}" shows literally (not replaced)
- ✅ Chip tabs scroll horizontally
- ✅ Active chip has green glow
- ✅ Continue Watching shows progress bars
- ✅ Posters have 2:3 aspect ratio
- ✅ Locked items show lock badge
- ✅ Offers have discount badges
- ✅ Articles have "Ler mais →" arrow

**Visual Check:**
- Deep green/teal background (NOT purple)
- Glass surfaces with blur effect
- Subtle noise texture on glass (barely visible)
- No harsh gradients or neon colors
- Typography feels comfortable, not cramped
- Spacing feels premium, not cluttered

---

### 3. Store V2 Screen
**Path**: Home → Store tab OR any "Ver loja" link

**Test Steps:**
1. Navigate to Store
2. Click Quick Actions (Chrome Extension, Alertas, etc.)
3. Click chip filter tabs
4. Click product posters
5. Scroll to Premium Upgrade banner
6. Click "Fazer upgrade" button

**Expected:**
- ✅ Back button appears if navigated from elsewhere
- ✅ ShoppingBag icon in header
- ✅ Quick actions in 2x2 grid
- ✅ Chip filters work
- ✅ Products in 2-column grid
- ✅ Premium banner has purple glow (accent-purchase)
- ✅ "Fazer upgrade" button is purple (NOT green)

**Visual Check:**
- Grid layout doesn't stretch awkwardly
- Icon backgrounds use accent-primary-soft
- Premium banner stands out (but not garish)
- Discount badges on relevant items

---

### 4. Bottom Tab Bar
**Path**: Always visible on main tabs

**Test Steps:**
1. Click each tab: Home, Explore, Library, Store, Profile
2. Observe active state changes
3. Look for visual glitches

**Expected:**
- ✅ Tab icons change color to primary accent when active
- ✅ Small dot appears below active icon
- ✅ Inactive tabs are muted color
- ✅ Glass background with heavy blur
- ✅ Border-top is subtle
- ✅ Tap feedback (slight scale)

**Visual Check:**
- Bar is fixed at bottom, doesn't scroll
- Max width 480px on desktop (centered)
- Frosted glass effect visible
- Icons are lucide-react (should be sharp)
- Labels are 10px, readable but not huge

---

### 5. Navigation Stack
**Path**: Various nested routes

**Test Steps:**
1. Home → Click Continue Watching → Should go to VideoLesson
2. VideoLesson → Should have back button → Click back → Returns to Home
3. Home → Click locked poster → Should go to LockedContentPreview
4. Store → Click product → Should go to SalesVideoScreen
5. Profile → EditProfile → Settings → Back through all

**Expected:**
- ✅ Back button appears when canGoBack is true
- ✅ Back button navigates to previous screen
- ✅ Tab bar hides on detail screens
- ✅ Tab bar shows on main tabs
- ✅ No broken navigation loops

---

## DESIGN SYSTEM COMPONENTS CHECK

### GlassSurface
- [ ] Blur effect works (test on Chrome, Safari, Firefox)
- [ ] Border is subtle, not harsh
- [ ] Background opacity looks correct
- [ ] Noise texture is very subtle (not obvious)
- [ ] Glow prop works on offers

### Button
- [ ] Primary variant: green with glow
- [ ] Purchase variant: purple with glow (ONLY on purchase CTAs)
- [ ] Secondary variant: glass with border
- [ ] Ghost variant: transparent until hover
- [ ] Active scale feedback on click
- [ ] Disabled state has 50% opacity

### ChipTabs
- [ ] Active tab has green glow
- [ ] Inactive tabs are glass
- [ ] Horizontal scroll works
- [ ] No scrollbar visible
- [ ] Touch/click works on all tabs

### PosterCard
- [ ] 2:3 aspect ratio maintained
- [ ] Title overlay on image (not below)
- [ ] Bottom fade is subtle
- [ ] Lock badge appears on locked items
- [ ] Discount badge appears on offers
- [ ] Hover effect (subtle accent overlay)
- [ ] Active scale on tap

### ContinueWatchingCard
- [ ] Compact size (not huge)
- [ ] Thumbnail 24x16 (w-24 h-16)
- [ ] Progress bar on thumbnail bottom
- [ ] Play icon appears on hover
- [ ] Glass surface with light blur
- [ ] Title doesn't overflow

### Badge
- [ ] Primary: green soft background
- [ ] Locked: gray with low opacity
- [ ] Discount: purple background
- [ ] Icons align correctly
- [ ] Padding is comfortable

---

## RESPONSIVE CHECKS

### Mobile (320px - 480px)
- [ ] No horizontal scroll
- [ ] Bottom tab bar doesn't overlap content
- [ ] Chip tabs scroll smoothly
- [ ] Poster carousels scroll smoothly
- [ ] Touch targets are at least 44x44px
- [ ] Text is readable (not too small)

### Tablet (481px - 1024px)
- [ ] Content centers with max-width
- [ ] Tab bar centers
- [ ] No awkward stretching
- [ ] Glass effects still work

### Desktop (>1024px)
- [ ] App container max 480px (mobile view) OR
- [ ] Desktop layout with right rail (if implemented)
- [ ] Tab bar still centered
- [ ] Hover states work on buttons
- [ ] Glass effects still work

---

## VISUAL QUALITY CHECK

### Color & Atmosphere
- [ ] Background is deep green/teal (#040a0a)
- [ ] NO purple in background or main UI
- [ ] Purple ONLY on purchase CTAs
- [ ] Primary accent is soft green (#49dc7a)
- [ ] Secondary accent is teal (#22f2ef)
- [ ] Colors feel restrained, not neon

### Glass & Depth
- [ ] Glass surfaces have realistic blur
- [ ] Borders are subtle (not glowing)
- [ ] Overlays are soft, not harsh
- [ ] Shadows are diffused (not sharp)
- [ ] Noise texture prevents banding

### Typography
- [ ] Headings have proper letter-spacing
- [ ] Line-height feels comfortable
- [ ] Text hierarchy is clear
- [ ] No text hugging edges
- [ ] Labels are readable but not huge

### Spacing
- [ ] Padding feels generous but controlled
- [ ] No cramped sections
- [ ] Sections have clear separation
- [ ] Cards have breathing room
- [ ] Consistent rhythm throughout

### Motion
- [ ] Transitions are smooth (not janky)
- [ ] Active scale is subtle (0.95-0.98)
- [ ] Hover effects are gentle
- [ ] No motion on mobile where inappropriate
- [ ] Progress bars animate width smoothly

---

## ACCESSIBILITY CHECK

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus rings are visible
- [ ] Focus order makes sense
- [ ] Enter/Space activate buttons
- [ ] Escape closes modals (if any)

### Screen Reader
- [ ] Buttons have accessible labels
- [ ] Images have alt text
- [ ] Headings use proper hierarchy (h1, h2, h3)
- [ ] Form inputs have labels
- [ ] ARIA attributes where needed

### Color Contrast
- [ ] White text on dark background: 4.5:1 minimum
- [ ] Primary accent text readable
- [ ] Muted text still readable
- [ ] Disabled states visually distinct

---

## PERFORMANCE CHECK

### Load Time
- [ ] Initial load < 3 seconds
- [ ] Images lazy load
- [ ] No unnecessary re-renders
- [ ] No console warnings about performance

### Bundle Size
- [ ] Check dist/ folder size after build
- [ ] CSS: ~140KB (acceptable for design system)
- [ ] JS: ~300KB (acceptable for React + deps)

---

## BROWSER COMPATIBILITY

### Test On:
- [ ] Chrome/Edge (latest)
- [ ] Safari (latest) - Especially test backdrop-filter
- [ ] Firefox (latest)
- [ ] Safari iOS (if possible)
- [ ] Chrome Android (if possible)

### Known Issues to Check:
- Safari sometimes doesn't support backdrop-filter well - check glass effect
- Firefox has different blur rendering - check consistency

---

## EDGE CASES

### Empty States
- [ ] What happens if continueWatching is empty?
- [ ] What happens if featured is empty?
- [ ] What happens if no articles?

### Long Text
- [ ] Long titles in posters (line-clamp works?)
- [ ] Long article previews (line-clamp works?)
- [ ] Long usernames in header (truncate?)

### Network Issues
- [ ] Images fail to load (show fallback?)
- [ ] Slow network (loading states?)

---

## FINAL CHECKLIST

- [ ] All critical flows work end-to-end
- [ ] Design matches Velox reference aesthetic
- [ ] No purple in main UI (only purchase CTAs)
- [ ] Glass effects are premium iOS-like
- [ ] Typography rhythm feels natural
- [ ] Spacing is generous but controlled
- [ ] Mobile experience is smooth
- [ ] Desktop doesn't look stretched
- [ ] Navigation never gets stuck
- [ ] Build has no errors/warnings

---

## ISSUES TO LOG

If you find issues, note them here:

1. **Issue**: [Description]
   **Screen**: [Which screen]
   **Steps**: [How to reproduce]
   **Expected**: [What should happen]
   **Actual**: [What actually happens]

2. ...

---

**Tested by**: _______________
**Date**: _______________
**Build version**: v0.0.1
**Status**: [ ] PASS [ ] FAIL [ ] NEEDS WORK
