---
name: graphite-theme
description: Graphite color token reference for StyleQuest. Provides token lookup, correct useTheme() usage patterns, and do-not-hardcode checklist. Use when adding UI, styling components, picking colors, or reviewing any color-related code in src/.
disable-model-invocation: true
---

# Graphite Theme — Color Token Guide

The app runs a single **Graphite** theme. All colors flow through `useTheme()` from `src/hooks/useTheme.ts`. The source of truth for all token values is `src/config/theme.ts` (`midnightEdgeTokens`).

---

## Access pattern

```typescript
import { useTheme } from "@/hooks/useTheme";

const MyComponent = (): React.JSX.Element => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.depth.background,
      borderColor: theme.colors.border.level1,
    },
    title: { color: theme.colors.text.primary },
    subtitle: { color: theme.colors.text.secondary },
  });

  return <View style={styles.container}>...</View>;
};
```

For static screens where the theme never changes, `useMemo` the stylesheet:

```typescript
const styles = useMemo(() => StyleSheet.create({
  card: { backgroundColor: theme.colors.depth.level1 },
}), [theme]);
```

---

## Token lookup by use-case

### Backgrounds

| Use | Token path | Hex |
|---|---|---|
| Screen root | `depth.background` | `#111111` |
| Deepest bg / modals | `depth.level0` | `#0D0D0D` |
| Cards, nav bar | `depth.level1` | `#141414` |
| Elevated cards, inputs | `depth.level2` | `#1C1C1C` |

### Text

| Use | Token path | Hex |
|---|---|---|
| Headings, body | `text.primary` | `#F5F5F5` |
| Subtitles, captions | `text.secondary` | `#B0B0B0` |
| Disabled labels | `text.disabled` | `#3D3D3D` |
| On white/primary bg | `text.onPrimary` | `#0D0D0D` |

### Interactive (buttons, highlights)

| Use | Token path | Hex |
|---|---|---|
| Primary CTA fill | `primary.default` | `#F5F5F5` |
| Secondary / ghost | `primary.dim` | `#B0B0B0` |
| Pressed state | `primary.active` | `#E0E0E0` |

### Borders & dividers

| Use | Token path | Hex |
|---|---|---|
| Default border | `border.level1` | `#2E2E2E` |

### Accent

| Use | Token path | Hex |
|---|---|---|
| Premium CTA, gold | `accent.amber` | `#D4AF37` |
| Success / badges | `gamification.emerald` | `#4EDEA3` |

### Semantic states

| Use | Token path | Hex |
|---|---|---|
| Success | `semantic.success` | `#4EDEA3` |
| Warning | `semantic.warning` | `#D4AF37` |
| Error / destructive | `semantic.error` | `#F87171` |

### Navigation (tab bar)

| Use | Token path | Hex |
|---|---|---|
| Tab bar background | `nav.surface` | `#141414` |
| Tab bar top border | `nav.border` | `#2E2E2E` |
| Inactive tab | `nav.inactive` | `#555555` |
| Active tab | `nav.active` | `#F5F5F5` |

### Effects

| Use | Token path | Value |
|---|---|---|
| Input focus ring | `focus.glow` | `rgba(245,245,245,0.15)` |
| Glass card border | `glass.border` | `rgba(245,245,245,0.08)` |
| Nav scrim | `nav.surfaceScrim` | `rgba(20,20,20,0.92)` |
| Active tab glow | `nav.iconGlow` | `rgba(245,245,245,0.2)` |
| Premium gradient | `gradient.premium` | `["#F5F5F5","#B0B0B0"]` |

---

## Gradient usage

```typescript
import LinearGradient from "react-native-linear-gradient"; // or expo-linear-gradient

<LinearGradient
  colors={[...theme.colors.gradient.premium]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.premiumBadge}
/>
```

---

## Focus glow & nav scrim helpers

`src/config/theme.ts` exports two convenience functions — prefer them over manual shadow/color declarations:

```typescript
import { focusGlowStyle, navSurfaceStyle } from "@/config/theme";

// Input focus ring
const inputFocused = isFocused
  ? focusGlowStyle(theme)   // { shadowColor, shadowOffset, shadowOpacity, shadowRadius }
  : {};

// Nav bar scrim background
const navBg = navSurfaceStyle(theme); // { backgroundColor: "rgba(20,20,20,0.92)" }
```

---

## Do-not-hardcode checklist

Before finishing any UI task, verify:

- [ ] No raw hex strings in `StyleSheet.create` or inline styles
- [ ] No old Midnight Edge values: `#7C3AED`, `#0A0A0F`, `#FFB95F`, `#CCC3D8`, `#1F1F25`, `#D2BBFF`
- [ ] `text.onPrimary` (`#0D0D0D`) used for any text/icon on a white primary surface — not `text.primary`
- [ ] Gradient arrays spread from `theme.colors.gradient.premium`, not hardcoded strings
- [ ] `focusGlowStyle(theme)` used for focus rings instead of manual `shadowColor`
- [ ] New color decisions map to an existing token; if none fits, flag for a new token addition in `src/config/theme.ts` and `tailwind.config.js` together
