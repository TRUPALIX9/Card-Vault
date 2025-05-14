import fs from "fs";
import path from "path";

const sourceRoot = "IconKitchen-Output";
const dest = "assets/images";

// Ensure destination exists
fs.mkdirSync(dest, { recursive: true });

// Web icons
const webMap: Record<string, string> = {
  "icon-192.png": "icon.png",
  "icon-512.png": "adaptive-icon.png",
  "favicon.ico": "favicon.png",
  "apple-touch-icon.png": "apple-icon.png",
};

// iOS icons
const iosMap: Record<string, string> = {
  "AppIcon@2x.png": "ios-icon.png",
  "AppIcon~ios-marketing.png": "ios-marketing-icon.png",
};

// Android icons
const mipmapFolder = "android/res/mipmap-xxxhdpi";
const androidMap: Record<string, string> = {
  "ic_launcher.png": "android-icon.png",
  "ic_launcher_foreground.png": "android-foreground.png",
  "ic_launcher_background.png": "android-background.png",
};

function copyIfExists(src: string, destPath: string) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, destPath);
    console.log(`✅ Copied ${src} → ${destPath}`);
  } else {
    console.warn(`⚠️ Skipped: ${src} (not found)`);
  }
}

// Copy web icons
for (const [srcFile, destFile] of Object.entries(webMap)) {
  copyIfExists(
    path.join(sourceRoot, "web", srcFile),
    path.join(dest, destFile)
  );
}

// Copy iOS icons
for (const [srcFile, destFile] of Object.entries(iosMap)) {
  copyIfExists(
    path.join(sourceRoot, "ios", srcFile),
    path.join(dest, destFile)
  );
}

// Copy Android icons
for (const [srcFile, destFile] of Object.entries(androidMap)) {
  copyIfExists(
    path.join(sourceRoot, mipmapFolder, srcFile),
    path.join(dest, destFile)
  );
}

// Update app.json
const appJsonPath = "app.json";
const appJson = JSON.parse(fs.readFileSync(appJsonPath, "utf8"));

appJson.expo = {
  ...appJson.expo,
  icon: "./assets/images/icon.png",
  splash: {
    image: "./assets/images/icon.png", // or splash-icon.png if you have a separate one
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  android: {
    ...appJson.expo.android,
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
  },
  ios: {
    ...appJson.expo.ios,
    supportsTablet: true,
  },
  web: {
    ...appJson.expo.web,
    favicon: "./assets/images/favicon.png",
  },
};

fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
console.log("✅ app.json updated.");
