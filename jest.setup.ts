/// <reference types="jest" />

// Shared native module mocks for StyleQuest test suite.
// See .cursor/skills/mobile-testing/SKILL.md for conventions.

// AsyncStorage — official mock
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

// Reanimated — use official test setup (must run after mock registration)
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("react-native-reanimated").setUpTests();

// React Navigation — lightweight stubs
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      reset: jest.fn(),
      setOptions: jest.fn(),
    }),
    useRoute: () => ({
      key: "test-route",
      name: "Test",
      params: {},
    }),
  };
});

// Gesture Handler — passthrough root + stubbed Gesture API
jest.mock("react-native-gesture-handler", () => {
  const React = require("react");
  const { View } = require("react-native");

  const createGestureStub = () => ({
    onBegin: jest.fn().mockReturnThis(),
    onStart: jest.fn().mockReturnThis(),
    onUpdate: jest.fn().mockReturnThis(),
    onEnd: jest.fn().mockReturnThis(),
    onFinalize: jest.fn().mockReturnThis(),
    enabled: jest.fn().mockReturnThis(),
    runOnJS: jest.fn().mockReturnThis(),
  });

  return {
    GestureHandlerRootView: ({ children }: { children: unknown }) =>
      React.createElement(View, null, children),
    GestureDetector: ({ children }: { children: unknown }) =>
      React.createElement(View, null, children),
    Gesture: {
      Pan: createGestureStub,
      Tap: createGestureStub,
      Race: (...gestures: unknown[]) => gestures[0],
      Simultaneous: (...gestures: unknown[]) => gestures[0],
    },
  };
});
