import type { MetadataRoute } from "next";

// Static export writes /manifest.webmanifest at build time. Icon and start
// URLs include the GitHub Pages project basePath because manifest files are
// not rewritten by next/font-style base path handling.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Trisle — The Dynamic Island for Android",
    short_name: "Trisle",
    description:
      "iPhone-style Dynamic Island for Android. Real Live Activities, smart alerts and fluid spring animations — 100% on-device. €5.99 one-time purchase.",
    start_url: "/Trisle_Website/",
    display: "browser",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/Trisle_Website/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
