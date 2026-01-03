# 🎨 Velox-Grade Premium Membership App

A modern, innovative "Área de Membros" app with premium iOS-like glass design, streaming dynamics, and Velox-grade aesthetic finish.

---

## ✨ What's New

### Complete Premium Refactor
This project has been completely refactored with:
- **Velox design system**: Deep green/teal atmosphere, premium glass surfaces
- **iOS-like frosted acrylic**: Modern glass with realistic blur and subtle noise
- **Streaming UI dynamics**: Hero-led home, Netflix-style posters, chip tabs
- **Product-grade components**: Reusable, type-safe, optimized
- **Enhanced navigation**: Stack-based routing with proper back behavior
- **Improved onboarding**: 3-step quiz with localStorage persistence

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open your browser to the URL shown in the terminal (usually `http://localhost:5173`).

---

## 📱 Key Screens

### 1. **Onboarding (First-time users)**
   - 3-step quiz: Goal, Budget, Experience
   - Glass card selection with ring focus
   - Progress indicator
   - Saves to localStorage (never shows again)

### 2. **Home V4 (Main screen)**
   - Large hero banner with integrated progress
   - TubeMate-style chip tabs
   - Compact Continue Watching section
   - Netflix-style vertical poster grid
   - Highlighted offers with glow
   - Text-first article cards

### 3. **Store V2**
   - Quick actions grid (2x2)
   - Featured products (2-column grid)
   - Premium upgrade banner with purple CTA
   - Conversion-optimized layout

### 4. **Bottom Tab Bar**
   - iOS-like frosted glass with heavy blur
   - 5 tabs: Home, Explore, Library, Store, Profile
   - Active indicator with dot
   - Centered on desktop (max 480px)

---

## 🎨 Design System

### Core Components

All components located in `src/components/design-system/`:

1. **GlassSurface** - iOS-like frosted acrylic container
2. **Button** - Primary, secondary, ghost, and purchase variants
3. **IconButton** - Glass icon buttons with hover states
4. **ChipTabs** - Horizontal scrolling filter tabs
5. **Badge** - Status indicators (locked, discount, primary, etc.)
6. **Progress** - Animated progress bars
7. **PosterCard** - 2:3 ratio Netflix-style posters
8. **ContinueWatchingCard** - Compact watch history cards
9. **ArticleCard** - Text-first article preview cards
10. **SectionHeader** - Consistent section titles

### Color Palette (Velox Reference)

```css
/* Primary Accent - Soft Green */
--accent-primary: #49dc7a;

/* Secondary Accent - Teal */
--accent-secondary: #22f2ef;

/* Purchase CTA - Purple (ONLY for checkout) */
--accent-purchase: #c923f8;

/* Background - Deep green/teal tint */
--app-bg: #040a0a;

/* Glass Surfaces */
--glass-surface-1: rgba(255, 255, 255, 0.03);
--glass-surface-2: rgba(255, 255, 255, 0.05);
--glass-surface-3: rgba(255, 255, 255, 0.08);
```

### Typography Scale

```
xs:   12px
sm:   14px
base: 16px
lg:   18px
xl:   20px
2xl:  24px
3xl:  30px
```

### Spacing Rhythm

```
xs:  8px
sm:  12px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
3xl: 64px
```

---

## 🏗️ Architecture

### Project Structure

```
src/
├── app/
│   ├── screens/
│   │   ├── HomeV4.tsx          (Main home screen)
│   │   └── OnboardingV2.tsx    (Onboarding quiz)
│   ├── components/
│   │   └── AppBottomTabBarV2.tsx
│   ├── navigation/
│   │   └── NavigationContext.tsx
│   ├── StoreV2.tsx
│   ├── Profile.tsx
│   ├── Settings.tsx
│   ├── VideoLesson.tsx
│   ├── ArticleReader.tsx
│   └── App.tsx
├── components/
│   ├── design-system/          (Reusable UI components)
│   │   ├── GlassSurface.tsx
│   │   ├── Button.tsx
│   │   ├── ChipTabs.tsx
│   │   ├── Badge.tsx
│   │   ├── Progress.tsx
│   │   ├── PosterCard.tsx
│   │   ├── ContinueWatchingCard.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── SectionHeader.tsx
│   │   └── index.ts
│   └── layout/
│       ├── AppContainer.tsx
│       └── DesktopLayout.tsx
├── lib/
│   ├── cn.ts                   (Tailwind merge utility)
│   └── mockData.ts             (Test data)
├── styles/
│   ├── theme.css               (Velox design tokens)
│   ├── index.css
│   └── fonts.css
└── main.tsx
```

### Navigation Flow

```
Onboarding (first-time) → Home
├── Home Tab
│   ├── Continue Watching → VideoLesson
│   ├── Featured Poster → VideoLesson or LockedPreview
│   └── Article Card → ArticleReader
├── Explore Tab
├── Library Tab
├── Store Tab
│   └── Product → SalesVideoScreen
└── Profile Tab
    ├── Edit Profile
    └── Settings
```

---

## 🎯 Design Principles

### 1. Velox Atmosphere First
- Deep green/teal base (#040a0a)
- NO purple in main UI (only purchase CTAs)
- Soft, restrained accents

### 2. iOS-Like Glass
- Frosted acrylic with realistic blur (16-32px)
- Subtle noise texture to prevent banding
- Soft borders and shadows

### 3. Typography Rhythm
- Consistent scale (12px → 30px)
- Comfortable leading and letter-spacing
- Clear hierarchy

### 4. Spacing Discipline
- 8px baseline grid
- Generous but controlled padding
- No cramped sections

### 5. Human Touch
- No stocky AI gradients
- Subtle overlays and depth
- Realistic component rhythm

### 6. Mobile-First
- Perfect on iOS (safe areas, tap targets)
- Intentional desktop (not stretched mobile)
- Responsive utilities included

---

## 🧪 Testing

See `QA_CHECKLIST.md` for comprehensive testing instructions.

### Quick Smoke Test

1. **Onboarding**: Clear localStorage → Refresh → Complete 3 steps
2. **Home**: Check hero, chips, posters, continue watching
3. **Store**: Navigate from tab bar → Check grid layout
4. **Navigation**: Click through flows, test back button
5. **Tab Bar**: Click all tabs, check active states

### Browser Compatibility

Tested on:
- ✅ Chrome/Edge (latest)
- ✅ Safari (latest) - backdrop-filter supported
- ✅ Firefox (latest)
- ⚠️ Safari iOS - test manually
- ⚠️ Chrome Android - test manually

---

## 🔧 Configuration

### Theme Customization

Edit `src/styles/theme.css` to change colors, spacing, or other tokens.

```css
:root {
  /* Change primary accent */
  --accent-primary: #49dc7a;

  /* Change background tint */
  --app-bg: #040a0a;

  /* Adjust blur intensity */
  --blur-medium: 24px;
}
```

### Mock Data

Edit `src/lib/mockData.ts` to change content:

```typescript
export const heroContent: Content = {
  id: 'hero-1',
  title: 'Your hero title',
  imageUrl: 'https://...',
  // ...
};
```

---

## 📦 Dependencies

### Core
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **TypeScript** - Type safety

### UI Libraries
- **Radix UI** - Headless components
- **Lucide React** - Icons
- **clsx + tailwind-merge** - Class management

---

## 🚧 What's Next (Remaining Work)

### High Priority
1. **Refactor ArticleReader** - Apply Velox styling
2. **Refactor VideoLesson** - Premium player, glass tabs
3. **Refactor Profile/Settings** - Glass rows, toggles
4. **Refactor Explore & Library** - Design system components
5. **Update LockedContentPreview** - Velox paywall
6. **Update Sales screens** - Conversion-optimized

### Medium Priority
7. **Desktop Right Rail** - Continue Watching / Offers sidebar (>1100px)
8. **Ambient Background** - Subtle animated gradient (desktop)
9. **Image Fallbacks** - Error states for failed images
10. **Accessibility Audit** - ARIA, keyboard nav, focus rings

### Low Priority (Polish)
11. **Motion Refinements** - Page transitions
12. **Loading States** - Skeleton screens everywhere
13. **Empty States** - Friendly messages
14. **Error States** - User-friendly errors

---

## 🐛 Known Issues

1. **Safari backdrop-filter**: Older Safari versions may not support glass effect
2. **Image CORS**: Some placeholder images may not load in production
3. **Onboarding skip**: Currently doesn't save preferences when skipped

---

## 📄 License

This project was generated from a Figma design and refactored with Velox-grade premium finish.

---

## 👥 Credits

- **Design Reference**: Velox Dashboard by Arounda
- **Secondary References**: Streaming app UI patterns
- **Icons**: Lucide React
- **Placeholder Images**: Unsplash

---

## 📞 Support

For issues or questions:
1. Check `REFACTOR_SUMMARY.md` for implementation details
2. Review `QA_CHECKLIST.md` for testing guidance
3. Inspect `src/styles/theme.css` for token reference

---

**Built with attention to premium product design and Velox aesthetic fidelity.**

🎨 **Deep green/teal atmosphere** • 💎 **iOS-like glass** • ⚡ **Streaming dynamics** • 🏆 **Product-grade quality**
