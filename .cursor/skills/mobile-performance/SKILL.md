---
name: mobile-performance
description: Enforces strict mobile memory management, render optimization, and list performance standards. Use when writing React Native components, hooks, lists, or optimizing re-renders.
paths:
  - "**/*.tsx"
  - "src/hooks/**/*.ts"
---

# Mobile Performance & Memory Management

Apply these standards whenever writing React Native components, custom hooks, or list UIs in StyleQuest.

## FlashList for Complex Lists

Use `@shopify/flash-list` instead of `FlatList` for any list that meets one or more of these criteria:

- 20 or more items
- Variable or dynamic row heights
- Nested scroll containers
- Frequent insert/update/delete operations

Every FlashList implementation must include:

- `estimatedItemSize` set to the approximate row height in pixels
- A stable `keyExtractor` referencing a unique record ID
- A memoized `renderItem` defined with `useCallback` outside JSX
- Row components wrapped in `React.memo`

`FlatList` is acceptable only for trivial static lists with fewer than 10 items and fixed row height.

```typescript
// BAD — FlatList with inline renderItem and anonymous handler
<FlatList
  data={bookings}
  renderItem={({ item }) => (
    <Pressable onPress={() => navigate("Booking", { bookingId: item.id })}>
      <Text>{item.scheduledAt}</Text>
    </Pressable>
  )}
/>

// GOOD — FlashList with memoized row and stable callbacks
import { FlashList, type ListRenderItemInfo } from "@shopify/flash-list";

const BookingRow = React.memo(
  ({ item, onPress }: BookingRowProps): React.JSX.Element => (
    <Pressable onPress={onPress}>
      <Text>{item.scheduledAt}</Text>
    </Pressable>
  ),
);

const BookingList = ({ bookings }: BookingListProps): React.JSX.Element => {
  const navigation = useNavigation<AppTabNavigation>();

  const handlePress = useCallback(
    (bookingId: string) => {
      navigation.navigate("Booking", { bookingId });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Booking>) => (
      <BookingRow item={item} onPress={() => handlePress(item.id)} />
    ),
    [handlePress],
  );

  return (
    <FlashList
      data={bookings}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      estimatedItemSize={72}
    />
  );
};
```

## No Inline JSX Closures or Object Literals

Do not declare anonymous functions or inline object/array literals directly in JSX props. Each render creates new references, defeating memoization and increasing GC pressure.

Forbidden patterns in JSX props:

- `onPress={() => doSomething()}`
- `style={{ padding: 16 }}`
- `renderItem={({ item }) => <Row item={item} />}`
- `contentContainerStyle={{ gap: 8 }}`

Hoist handlers with `useCallback`, derived styles with `useMemo`, and list renderers with `useCallback`.

```typescript
// BAD — new function and object every render
<PrimaryButton
  label="Confirm"
  onPress={() => submitBooking(bookingId)}
  style={{ marginTop: 16 }}
/>

// GOOD — stable references
const handleConfirm = useCallback(() => {
  submitBooking(bookingId);
}, [bookingId]);

const buttonStyle = useMemo(
  () => [styles.button, { marginTop: theme.spacing.md }],
  [theme.spacing.md],
);

<PrimaryButton label="Confirm" onPress={handleConfirm} style={buttonStyle} />
```

## Selective Memoization

Apply memoization where re-renders carry measurable cost — do not blanket-memo every component.

- Wrap **list row components** and **deeply nested leaf renders** in `React.memo`
- Use `useMemo` for expensive derived data (filtered lists, merged theme styles, computed totals)
- Use `useCallback` for every handler passed to a memoized child, `FlashList`/`FlatList` `renderItem`, or `keyExtractor`
- Do not memoize top-level screen shells unless profiling shows benefit

## Hook Closure Leak Prevention

Custom hooks must clean up all side effects on unmount.

Every hook that registers listeners, starts timers, or initiates async work must:

1. Return a cleanup function from `useEffect`
2. Remove native listeners (`AppState`, `Dimensions`, `Keyboard`, `NetInfo`)
3. Clear intervals and timeouts
4. Cancel in-flight async requests via `AbortController` or a mounted ref guard
5. Avoid capturing stale closures in long-lived callbacks — list dependencies explicitly

```typescript
// BAD — listener leak, stale closure, no abort
export function useBookingPolling(providerId: string) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getBookings(providerId);
      setBookings(data);
    }, 5000);
    // missing cleanup
  }, []);

  return bookings;
}

// GOOD — cleanup, abort, dependency correctness
export function useBookingPolling(providerId: string): Booking[] {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    const poll = async (): Promise<void> => {
      try {
        const data = await getBookings(providerId);
        if (active) setBookings(data);
      } catch {
        // ApiError handled at service layer
      }
    };

    const interval = setInterval(poll, 5000);
    void poll();

    return () => {
      active = false;
      controller.abort();
      clearInterval(interval);
    };
  }, [providerId]);

  return bookings;
}
```

## Verification Checklist

Before finishing performance-sensitive work:

- [ ] Complex lists use FlashList with `estimatedItemSize`
- [ ] No inline functions or object literals in JSX props passed to memoized children
- [ ] List rows are `React.memo` wrapped with stable `useCallback` handlers
- [ ] Custom hooks return effect cleanup for listeners, timers, and async work
