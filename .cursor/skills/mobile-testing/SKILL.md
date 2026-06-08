---
name: mobile-testing
description: Standards for unit and integration testing with React Native Testing Library and Jest. Use when writing or modifying test files, configuring mocks, or testing user interactions.
paths:
  - "**/__tests__/**/*.[jt]s?(x)"
  - "**/*.test.[jt]s?(x)"
---

# Mobile Testing & Interaction Mocking

Apply these standards when writing or modifying test files in StyleQuest. Jest config lives in `jest.config.js`; shared mocks live in `jest.setup.ts`.

Run tests with `npm run test` or `npm run test:watch`.

## React Native Testing Library — User-Centric Queries

Use `@testing-library/react-native` for all component integration tests.

Query priority (highest to lowest):

1. `screen.getByRole` — buttons, headers, text inputs, switches
2. `screen.getByLabelText` — form fields with accessibility labels
3. `screen.getByText` — visible text content users see
4. `screen.getByPlaceholderText` — inputs located by placeholder
5. `screen.getByTestId` — **last resort only** when semantic queries are impossible

Assert what the user sees and interacts with — not implementation details (internal state, private functions, Zustand store shape).

```typescript
// BAD — implementation detail via testID
import { render, fireEvent } from "@testing-library/react-native";

test("submits booking", () => {
  const { getByTestId } = render(<BookingForm bookingId="bk_1" />);
  fireEvent.press(getByTestId("submit-btn"));
  expect(getByTestId("success-msg")).toBeTruthy();
});

// GOOD — user-centric role and text queries
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";

test("submits booking", async () => {
  render(<BookingForm bookingId="bk_1" />);

  fireEvent.press(screen.getByRole("button", { name: /confirm booking/i }));

  await waitFor(() => {
    expect(screen.getByText(/booking confirmed/i)).toBeTruthy();
  });
});
```

## Centralized Native Module Mocks

Do not duplicate native mocks in individual test files. All shared mocks belong in `jest.setup.ts`.

Pre-configured mocks (do not re-declare in test files):

| Module | Location | Purpose |
|--------|----------|---------|
| `@react-native-async-storage/async-storage` | `jest.setup.ts` | Official async-storage mock |
| `react-native-reanimated` | `jest.setup.ts` | Mock + `setUpTests()` |
| `@react-navigation/native` | `jest.setup.ts` | Stubbed `useNavigation`, `useRoute` |
| `react-native-gesture-handler` | `jest.setup.ts` | Passthrough root + stubbed `Gesture.*` |

If a test requires a module-specific override, use `jest.spyOn` or local mock **only** for that test file's unique behavior — never replace the global setup entirely.

## User Interactions and Async State

Simulate user behavior with `fireEvent` — not by calling component methods or store actions directly.

| Action | API |
|--------|-----|
| Tap button | `fireEvent.press(element)` |
| Type text | `fireEvent.changeText(input, "value")` |
| Scroll | `fireEvent.scroll(flatList, { nativeEvent: { contentOffset: { y: 100 } } })` |

For async state transitions (API responses, Zustand updates, re-renders):

- Use `waitFor(() => { expect(...) })` for assertions that appear after async work
- Use `findBy*` queries (`findByText`, `findByRole`) as shorthand for wait + get
- Do not use arbitrary `setTimeout` delays

```typescript
// BAD — no async wait, races the render cycle
test("shows error on failed fetch", () => {
  render(<ProfileScreen />);
  expect(screen.getByText(/something went wrong/i)).toBeTruthy();
});

// GOOD — waitFor handles async state update
test("shows error on failed fetch", async () => {
  jest.spyOn(bookingService, "getBookings").mockRejectedValueOnce({
    code: "NETWORK_ERROR",
    message: "Something went wrong.",
    statusCode: 0,
  });

  render(<ProfileScreen />);

  await waitFor(() => {
    expect(screen.getByText(/something went wrong/i)).toBeTruthy();
  });
});
```

## Test File Conventions

- Co-locate tests: `ComponentName.test.tsx` next to the component, or under `__tests__/`
- Import `render`, `screen`, `fireEvent`, `waitFor` from `@testing-library/react-native`
- Wrap components in required providers (theme, navigation) using a test helper when needed
- One behavioral concern per test — descriptive `test("...")` names in user language
- Do not snapshot entire screens unless reviewing stable, static markup

## Verification Checklist

Before finishing test work:

- [ ] Queries use `getByRole` / `getByText` before `getByTestId`
- [ ] Async assertions use `waitFor` or `findBy*`
- [ ] No duplicate native module mocks — rely on `jest.setup.ts`
- [ ] Tests assert user-visible behavior, not internal implementation
