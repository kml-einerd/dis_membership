# 🛠️ Quick Commands Reference

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Clear onboarding (for testing)
# Run this in browser console:
localStorage.clear()
```

---

## Testing Flows

### Test Onboarding
```bash
# In browser console:
localStorage.clear()
# Then refresh the page
```

### Test Specific Screen
```bash
# In browser console:
localStorage.setItem('onboarding_complete', 'true')
# Then navigate to the screen you want to test
```

---

## Common Tasks

### Add New Mock Content
Edit `src/lib/mockData.ts`

### Change Colors
Edit `src/styles/theme.css` (look for Velox design tokens section)

### Create New Component
```bash
# Create in src/components/design-system/
# Follow existing pattern (TypeScript, forwardRef, cn utility)
# Export from index.ts
```

### Add New Screen
```bash
# 1. Create screen in src/app/screens/
# 2. Import in src/app/App.tsx
# 3. Add case in renderScreen() switch
# 4. Add route type in NavigationContext.tsx if needed
```

---

## File Locations

| What | Where |
|------|-------|
| Design tokens | `src/styles/theme.css` |
| UI components | `src/components/design-system/` |
| Screens | `src/app/screens/` |
| Navigation | `src/app/navigation/NavigationContext.tsx` |
| Mock data | `src/lib/mockData.ts` |
| Main app | `src/app/App.tsx` |
| Tab bar | `src/app/components/AppBottomTabBarV2.tsx` |

---

## Quick Fixes

### Build Errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check types without building
npx tsc --noEmit
```

### Tailwind Not Working
```bash
# Verify tailwind.config exists and src/styles/index.css has @import
# Restart dev server
```

---

## Browser DevTools

### Check Velox Colors
```javascript
// In console:
getComputedStyle(document.documentElement).getPropertyValue('--accent-primary')
// Should return: #49dc7a

getComputedStyle(document.documentElement).getPropertyValue('--app-bg')
// Should return: #040a0a
```

### Check Glass Blur
```javascript
// Inspect any glass surface element
// Look for: backdrop-filter: blur(24px)
```

### Check localStorage
```javascript
// See onboarding status
localStorage.getItem('onboarding_complete')

// See onboarding answers
JSON.parse(localStorage.getItem('onboarding_answers'))
```

---

## Production Deployment

```bash
# 1. Build
npm run build

# 2. Preview locally
npx vite preview

# 3. Deploy dist/ folder to your hosting
# (Vercel, Netlify, etc.)
```

---

## Git Workflow (Recommended)

```bash
# Create feature branch
git checkout -b feature/velox-refactor

# Stage changes
git add .

# Commit
git commit -m "feat: Complete Velox-grade premium refactor

- Add Velox design tokens and glass system
- Implement HomeV4 with streaming dynamics
- Create OnboardingV2 with quiz flow
- Refactor StoreV2 with conversion optimization
- Update bottom tab bar with iOS-like glass
- Add comprehensive design system components"

# Push
git push origin feature/velox-refactor

# Create PR (if using GitHub/GitLab)
```

---

## Troubleshooting

### Images Not Loading
- Check CORS policy
- Verify Unsplash URLs are accessible
- Replace with local images in production

### Glass Effect Not Working
- Check browser support (Safari <15 may not support backdrop-filter)
- Verify CSS variable is defined
- Check if parent has position/overflow that breaks backdrop-filter

### Navigation Stuck
- Check NavigationContext state in React DevTools
- Verify route exists in App.tsx switch statement
- Clear localStorage and try again

### Tailwind Classes Not Applying
- Check if class name is correct
- Verify Tailwind config includes the file
- Restart dev server
- Check for typos in custom CSS variables

---

## Performance Optimization

### Reduce Bundle Size
```bash
# Analyze bundle
npm run build
# Check dist/ folder size

# If too large, consider:
# - Code splitting
# - Lazy loading routes
# - Removing unused dependencies
```

### Optimize Images
```bash
# Use WebP format
# Implement lazy loading
# Add width/height attributes
# Use responsive images (srcset)
```

---

## Need Help?

1. **Check documentation**: `REFACTOR_SUMMARY.md`, `README_VELOX_REFACTOR.md`
2. **Review QA**: `QA_CHECKLIST.md`
3. **Inspect code**: All components are documented with TypeScript types
4. **Browser console**: Check for errors or warnings

---

**Quick Reference Created**: 2025-12-30
