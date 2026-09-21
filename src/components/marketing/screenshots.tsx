"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, SectionLabel } from "./reveal";
import { useI18n } from "@/i18n/context";

// Static export (GitHub Pages) serves the site under /Trisle_Website/;
// unoptimized next/image sources don't get the basePath prefix automatically.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const SLIDES = [
  {
    num: "01",
    src: `${BASE}/screenshots/app-position.png`,
    tabKey: "screenshots.s1.tab",
    titleKey: "screenshots.s1.title",
    descKey: "screenshots.s1.desc",
  },
  {
    num: "02",
    src: `${BASE}/screenshots/app-apps.png`,
    tabKey: "screenshots.s2.tab",
    titleKey: "screenshots.s2.title",
    descKey: "screenshots.s2.desc",
  },
  {
    num: "03",
    src: `${BASE}/screenshots/app-appearance.png`,
    tabKey: "screenshots.s3.tab",
    titleKey: "screenshots.s3.title",
    descKey: "screenshots.s3.desc",
  },
  {
    num: "04",
    src: `${BASE}/screenshots/app-alerts.png`,
    tabKey: "screenshots.s4.tab",
    titleKey: "screenshots.s4.title",
    descKey: "screenshots.s4.desc",
  },
] as const;

/**
 * Real-app screenshot gallery. One slide at a time, arrows-only
 * navigation (the track is overflow-hidden — no scrollbars, no swipe);
 * dots jump directly and arrow keys work when the region is focused.
 * Index tracking compares slide centers against the visible center,
 * which stays correct in RTL where scrollLeft goes negative.
 */
export function Screenshots() {
  const { t, dir } = useI18n();
  const [active, setActive] = useState(0);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = useRef(0);

  const isRtl = dir === "rtl";
  const count = SLIDES.length;

  const goTo = useCallback(
    (i: number, behavior: ScrollBehavior = "smooth") => {
      const slide = slideRefs.current[i];
      slide?.scrollIntoView({
        behavior,
        inline: "center",
        block: "nearest",
      });
    },
    []
  );

  const next = useCallback(() => {
    setActive((a) => {
      const target = Math.min(a + 1, count - 1);
      goTo(target);
      return target;
    });
  }, [count, goTo]);

  const prev = useCallback(() => {
    setActive((a) => {
      const target = Math.max(a - 1, 0);
      goTo(target);
      return target;
    });
  }, [goTo]);

  // Track which slide is centered (rAF-throttled, RTL-safe).
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = 0;
      const el = trackRef.current;
      if (!el) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      slideRefs.current.forEach((slide, i) => {
        if (!slide) return;
        const d = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive((a) => (a === best ? a : best));
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (isRtl) prev();
      else next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (isRtl) next();
      else prev();
    }
  };

  return (
    <section
      id="screenshots"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>{t("screenshots.label")}</SectionLabel>
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("screenshots.title1")}
            <span className="text-zinc-500">{t("screenshots.title2")}</span>
          </h2>
          <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-zinc-500">
            {t("screenshots.sub")}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={t("screenshots.label")}
            tabIndex={0}
            onScroll={handleScroll}
            onKeyDown={onKeyDown}
            className="mt-12 flex overflow-hidden rounded-2xl outline-none focus-visible:ring-1 focus-visible:ring-white/25"
          >
            {SLIDES.map((slide, i) => (
              <div
                key={slide.num}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${count}`}
                className="w-full shrink-0 snap-center"
              >
                <div className="grid items-center gap-10 px-2 py-2 md:grid-cols-[1fr_auto] md:px-8 lg:gap-20">
                  {/* Copy — next to the screen on desktop, below it on mobile */}
                  <div className="order-2 md:order-1">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-300">
                        {slide.num}
                        <span aria-hidden className="h-3 w-px bg-white/15" />
                        {t(slide.tabKey)}
                      </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {t(slide.titleKey)}
                    </h3>
                    <p className="mt-4 max-w-md text-[14px] leading-relaxed text-zinc-400">
                      {t(slide.descKey)}
                    </p>
                    <div
                      aria-hidden
                      className="mt-7 font-mono text-[12px] tracking-[0.3em] text-zinc-600"
                    >
                      {slide.num} / 04
                    </div>
                  </div>

                  {/* The real screenshot, framed like a device */}
                  <div className="order-1 flex justify-center md:order-2 md:justify-end">
                    <div className="relative">
                      <div
                        aria-hidden
                        className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-b from-white/[0.05] to-transparent blur-2xl"
                      />
                      <div className="rounded-[2.6rem] border border-white/10 bg-zinc-950 p-2 shadow-[0_40px_80px_-32px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.04]">
                        <Image
                          src={slide.src}
                          alt={t(slide.titleKey)}
                          width={720}
                          height={1560}
                          priority={i === 0}
                          draggable={false}
                          className="h-[400px] w-auto rounded-[2.1rem] sm:h-[460px] lg:h-[520px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-9 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={prev}
              disabled={active === 0}
              aria-label={t("screenshots.prev")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:bg-white/[0.1] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </button>

            <div className="flex items-center gap-2">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.num}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${t("screenshots.label")} — ${i + 1}`}
                  aria-current={active === i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-6 bg-white/70"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              disabled={active === count - 1}
              aria-label={t("screenshots.next")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:bg-white/[0.1] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>

          <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-600">
            {t("screenshots.hint")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
