/// <reference types="jest" />

// Shared native module mocks for StyleQuest test suite.
// See .cursor/skills/mobile-testing/SKILL.md for conventions.

// AsyncStorage — official mock
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

// react-native-maps — View stubs for Jest
jest.mock("react-native-maps", () => {
  const React = require("react");
  const { View } = require("react-native");

  const MapView = React.forwardRef(
    ({ children }: { children?: React.ReactNode }, _ref: React.Ref<unknown>) =>
      React.createElement(View, null, children),
  );
  const Marker = ({ children }: { children?: React.ReactNode }) =>
    React.createElement(View, null, children);
  const Circle = () => React.createElement(View, null);

  return {
    __esModule: true,
    default: MapView,
    Marker,
    Circle,
    PROVIDER_GOOGLE: "google",
  };
});

jest.mock("expo-location", () => ({
  PermissionStatus: {
    UNDETERMINED: "undetermined",
    GRANTED: "granted",
    DENIED: "denied",
  },
  Accuracy: {
    Balanced: 3,
  },
  getForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({
      status: "granted",
      granted: true,
      canAskAgain: true,
      expires: "never",
    }),
  ),
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({
      status: "granted",
      granted: true,
      canAskAgain: true,
      expires: "never",
    }),
  ),
  hasServicesEnabledAsync: jest.fn(() => Promise.resolve(true)),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: 9.057637514710933,
        longitude: 76.60201525949192,
        altitude: 0,
        accuracy: 10,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0,
      },
      timestamp: Date.now(),
    }),
  ),
}));

// Reanimated — lightweight stub (avoids worklets native init in Jest)
jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");

  return {
    __esModule: true,
    default: {
      call: () => {},
      createAnimatedComponent: (component: typeof View) => component,
    },
    useSharedValue: <T,>(initial: T) => ({ value: initial }),
    useAnimatedStyle: (updater: () => object) => updater(),
    withSpring: <T,>(value: T) => value,
    withTiming: <T,>(value: T) => value,
  };
});

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
