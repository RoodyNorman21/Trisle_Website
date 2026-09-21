import type { MetadataRoute } from "next";

// Required for `output: "export"` — the sitemap is written once at build time.
export const dynamic = "force-static";

/** Single-page site — one canonical entry. Static export writes /sitemap.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://trisle-app.github.io/Trisle_Website",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
