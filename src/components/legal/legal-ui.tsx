import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/marketing/footer";

/**
 * Shared rendering toolkit for the legal pages (/privacy, /terms).
 *
 * These are plain server-compatible components: no hooks, no client bundle
 * beyond the Footer itself. Legal copy is authored once in English (the
 * governing language) and rendered in the site's dark design system.
 */

export function LegalShell({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-black/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
            aria-label="Trisle — back to home"
          >
            <span className="relative flex h-7 w-12 items-center justify-center rounded-full bg-black ring-1 ring-white/15">
              <span className="h-[7px] w-[7px] rounded-full bg-[#1c1c1c] ring-1 ring-white/20" />
              <span className="absolute right-2 h-[3px] w-[3px] rounded-full bg-white/50" />
            </span>
            <span className="text-[15px] font-bold tracking-tight text-white">
              Trisle
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-[12.5px] font-semibold text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            trisle-app.github.io
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 pb-24 pt-14">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-[13px] text-zinc-500">
            Last updated: {updated}
          </p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-[14.5px] leading-relaxed text-zinc-300">
              {intro}
            </p>
          </div>
          <div className="mt-4">{children}</div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

/** Short summary box used at the top of each major section. */
export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
      <p className="text-[13.5px] leading-relaxed text-zinc-400">{children}</p>
    </div>
  );
}

export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-14 scroll-mt-24 text-[22px] font-bold tracking-tight text-white"
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 text-[16px] font-bold tracking-tight text-zinc-100">
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">{children}</p>
  );
}

export function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-zinc-400 marker:text-zinc-600">
      {children}
    </ul>
  );
}

/** Left-aligned by design — never justify list items (readability rule). */
export function LI({ children }: { children: React.ReactNode }) {
  return <li className="pl-1">{children}</li>;
}

export function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-zinc-200">{children}</strong>;
}

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-zinc-200 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-zinc-400"
    >
      {children}
    </a>
  );
}

export function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-white/[0.08]">
      <table className="w-full min-w-[560px] text-left text-[13.5px]">
        <thead>
          <tr className="bg-white/[0.04]">
            {headers.map((h) => (
              <th
                key={h}
                scope="col"
                className="whitespace-nowrap border-b border-white/10 px-4 py-3 font-semibold text-zinc-200"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="align-top">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border-b border-white/[0.06] px-4 py-3 leading-relaxed text-zinc-400"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
