import type { MetadataRoute } from "next";

// Required for `output: "export"` — the sitemap is written once at build time.
export const dynamic = "force-static";

const BASE = "https://trisle-app.github.io/Trisle_Website";

/** Marketing page + legal pages. Static export writes /sitemap.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
