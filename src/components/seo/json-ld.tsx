/**
 * Server-rendered JSON-LD structured data. Rendered once in the root layout
 * so the static export ships it inside the initial HTML (crawlers never run JS).
 * The payload is build-time constant data (English dictionary + price) — no user
 * input ever reaches this sink.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
