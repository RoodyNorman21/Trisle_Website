"use client";

import {
  BatteryLow,
  BellOff,
  Bluetooth,
  Fingerprint,
  Gauge,
  Layers,
  ShieldCheck,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import { CollapsedMusic, CollapsedNavigation, CollapsedTimer } from "./island";
import { Reveal, SectionLabel } from "./reveal";
import { TRIPLE_BEATS_COMPACT, TripleIsland } from "./triple-island";
import { useI18n } from "@/i18n/context";

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0b0c] transition-colors duration-300 hover:border-white/[0.14] ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div>
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
        <Icon className="h-4 w-4 text-zinc-200" />
      </div>
      <h3 className="text-[15px] font-semibold text-white">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">{desc}</p>
    </div>
  );
}

/** Small standalone island pill used inside feature cards. */
function MiniPill({
  children,
  width,
}: {
  children: React.ReactNode;
  width: number;
}) {
  return (
    <div
      className="flex h-9 items-center overflow-hidden rounded-full bg-black ring-1 ring-white/10"
      style={{ width }}
    >
      {children}
    </div>
  );
}

export function Features() {
  const { t } = useI18n();

  return (
    <section id="features" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>{t("features.label")}</SectionLabel>
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("features.title1")}
            <span className="text-zinc-500">{t("features.title2")}</span>
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-zinc-400">
            {t("features.desc")}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {/* Live Activities — wide card */}
          <Reveal className="lg:col-span-2">
            <Card className="h-full p-7">
              <div className="flex h-full flex-col justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-sm">
                  <CardHeader
                    icon={Layers}
                    title={t("features.live.title")}
                    desc={t("features.live.desc")}
                  />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <MiniPill width={170}>
                    <CollapsedMusic />
                  </MiniPill>
                  <MiniPill width={150}>
                    <CollapsedTimer />
                  </MiniPill>
                  <MiniPill width={160}>
                    <CollapsedNavigation />
                  </MiniPill>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* Alerts */}
          <Reveal delay={0.08}>
            <Card className="h-full p-7">
              <CardHeader
                icon={Zap}
                title={t("features.alerts.title")}
                desc={t("features.alerts.desc")}
              />
              <div className="mt-6 grid grid-cols-2 gap-2.5">
                {[
                  { icon: Zap, label: t("features.alerts.charging") },
                  { icon: BatteryLow, label: t("features.alerts.battery") },
                  { icon: BellOff, label: t("features.alerts.silent") },
                  { icon: Bluetooth, label: t("features.alerts.paired") },
                ].map((a) => (
                  <div
                    key={a.label}
                    className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-[11px] font-medium text-zinc-400"
                  >
                    <a.icon className="h-3.5 w-3.5 shrink-0 text-zinc-300" />
                    {a.label}
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          {/* Triple island */}
          <Reveal delay={0.04}>
            <Card className="h-full p-7">
              <CardHeader
                icon={Layers}
                title={t("features.triple.title")}
                desc={t("features.triple.desc")}
              />
              <div className="mt-6 flex justify-center">
                <TripleIsland beats={TRIPLE_BEATS_COMPACT} compact scale={0.92} />
              </div>
            </Card>
          </Reveal>

          {/* Customization */}
          <Reveal delay={0.08}>
            <Card className="h-full p-7">
              <CardHeader
                icon={SlidersHorizontal}
                title={t("features.tuned.title")}
                desc={t("features.tuned.desc")}
              />
              <div className="mt-7 flex flex-wrap gap-2">
                {["style.morph", "style.elastic", "style.unfold", "style.fade", "style.bubble"].map(
                  (s, i) => (
                    <span
                      key={s}
                      className={`rounded-full border px-3 py-1.5 text-[11px] font-medium ${
                        i === 0
                          ? "border-white/20 bg-white text-black"
                          : "border-white/[0.08] bg-white/[0.03] text-zinc-400"
                      }`}
                    >
                      {t(s)}
                    </span>
                  )
                )}
              </div>
            </Card>
          </Reveal>

          {/* Performance + privacy combined */}
          <Reveal delay={0.12}>
            <Card className="h-full p-7">
              <CardHeader
                icon={Gauge}
                title={t("features.quiet.title")}
                desc={t("features.quiet.desc")}
              />
              <div className="mt-7 space-y-2.5">
                <div className="flex items-center gap-2.5 text-[12px] text-zinc-400">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-zinc-300" />
                  {t("features.quiet.ondevice")}
                </div>
                <div className="flex items-center gap-2.5 text-[12px] text-zinc-400">
                  <Fingerprint className="h-4 w-4 shrink-0 text-zinc-300" />
                  {t("features.quiet.redacted")}
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
