---
name: mobile-animations
description: Guidelines for implementing high-performance 60fps/120fps UI animations and native gestures with Reanimated and Gesture Handler. Use when building animations, gesture interactions, or UI components in src/components/ui/.
paths:
  - "**/*Animation*.tsx"
  - "**/*Gesture*.tsx"
  - "src/components/ui/**/*.tsx"
---

# Fluid Animations & Gesture Mechanics

Apply these standards when implementing animations, gesture-driven interactions, or UI primitives in StyleQuest.

## Reanimated v3+ Only

Use `react-native-reanimated` for all continuous, frame-driven animations.

- Do not use `Animated` from `react-native` for looping, gesture-driven, or transition animations
- `expo-status-bar` and one-shot layout utilities are exceptions — not continuous UI animation
- Ensure `react-native-reanimated/plugin` is the last Babel plugin in `babel.config.js`
- Ensure `import "react-native-gesture-handler"` is the first import in `index.js`

All animated styles must run on the native UI thread via worklets.

## UI Thread — useSharedValue + useAnimatedStyle

Keep animation state off the React render cycle.

- Store animated values in `useSharedValue`
- Derive styles exclusively through `useAnimatedStyle`
- Bridge to JS thread with `runOnJS` only when triggering React state, navigation, or API calls
- Do not read or write React state directly inside `useAnimatedStyle` worklet bodies

```typescript
// BAD — RN Animated animating layout properties on JS thread
import { Animated } from "react-native";

const SlidePanel = ({ visible }: SlidePanelProps): React.JSX.Element => {
  const height = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(height, {
      toValue: visible ? 200 : 0,
      duration: 300,
      useNativeDriver: false, // layout animation — jank
    }).start();
  }, [visible, height]);

  return <Animated.View style={{ height }}>{/* ... */}</Animated.View>;
};

// GOOD — Reanimated transform + opacity on UI thread
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const SlidePanel = ({ visible }: SlidePanelProps): React.JSX.Element => {
  const progress = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(visible ? 1 : 0, { duration: 300 });
  }, [visible, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 24 }],
  }));

  return (
    <Animated.View style={[styles.panel, animatedStyle]}>
      {/* ... */}
    </Animated.View>
  );
};
```

## Transform and Opacity Only

Do not animate layout-breaking properties during transitions. Animating `width`, `height`, `margin`, `padding`, `top`, or `left` triggers layout recalculation every frame and breaks 60fps targets.

Permitted animated properties:

- `transform`: `translateX`, `translateY`, `scale`, `rotate`
- `opacity`

Simulate size changes with `scale` or clip via `overflow: "hidden"` on a fixed-size container.

## React Native Gesture Handler — Object API

Use the modern object-based Gesture API — not legacy handler components.

- Compose gestures with `Gesture.Race()`, `Gesture.Simultaneous()`, and `Gesture.Exclusive()`
- Wrap interactive subtrees in `GestureDetector`
- Attach composed gestures via `gesture={composedGesture}` prop
- Update shared values inside gesture callbacks; call `runOnJS` for side effects

```typescript
// BAD — legacy PanGestureHandler component API
import { PanGestureHandler, State } from "react-native-gesture-handler";

const SwipeCard = (): React.JSX.Element => (
  <PanGestureHandler
    onHandlerStateChange={(e) => {
      if (e.nativeEvent.state === State.END) {
        dismissCard();
      }
    }}
  >
    <Animated.View>{/* ... */}</Animated.View>
  </PanGestureHandler>
);

// GOOD — Gesture.Pan() with Reanimated shared values
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

interface SwipeCardProps {
  onDismiss: () => void;
}

const SwipeCard = ({ onDismiss }: SwipeCardProps): React.JSX.Element => {
  const translateX = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      if (Math.abs(e.translationX) > 120) {
        runOnJS(onDismiss)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, animatedStyle]}>
        {/* ... */}
      </Animated.View>
    </GestureDetector>
  );
};
```

## Decouple Animated Styles from React State

React state changes re-render the JS thread. Animation frames must not depend on them.

- Sync external state into shared values via `useEffect` or Reanimated `useAnimatedReaction`
- Keep `useAnimatedStyle` bodies pure — only read shared values and constants
- Use `withTiming`, `withSpring`, or `withDecay` for transitions between shared value targets

## Verification Checklist

Before finishing animation or gesture work:

- [ ] All continuous animations use Reanimated shared values and `useAnimatedStyle`
- [ ] Only `transform` and `opacity` are animated — no layout properties
- [ ] Gestures use `Gesture.Pan()` / `Gesture.Tap()` object API inside `GestureDetector`
- [ ] JS-thread side effects (navigation, API, setState) go through `runOnJS`
