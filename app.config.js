export default {
  expo: {
    name: "Mappy",
    slug: "myFirstProgram",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/image/LogoSheet.png",
    splash: {
      image: "./assets/Untitled-1.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: [
      "./src/image/backgound.png",
      "./src/image/Logo.png",
      "./src/image/logoAuth.png",
    ],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/image/LogoSheet.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
    ],
  },
};
