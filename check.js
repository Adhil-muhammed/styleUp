const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const config = getDefaultConfig(__dirname);
const final = withNativeWind(config, { input: "./global.css" });
console.log("transformer keys:", Object.keys(final.transformer || {}));
console.log(
  "transformerPath:",
  final.transformer && final.transformer.babelTransformerPath,
);
