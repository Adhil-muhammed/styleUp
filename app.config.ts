import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "StyleQuest",
  slug: "StyleQuest",
  version: "1.0.0",
  userInterfaceStyle: "automatic",
  platforms: ["ios", "android", "web"],
  android: {
    package: "com.stylequest",
  },
  web: {
    bundler: "metro",
    output: "single",
    favicon: "./src/assets/images/favicon.png",
  },
  plugins: [
    "expo-font",
    "@react-native-community/datetimepicker",
    [
      "expo-location",
      {
        locationWhenInUsePermission:
          "StyleQuest uses your location to show nearby barbers on the map.",
      },
    ],
    [
      "react-native-maps",
      {
        androidGoogleMapsApiKey:
          process.env.EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_API_KEY,
        iosGoogleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY,
      },
    ],
  ],
};

export default config;
