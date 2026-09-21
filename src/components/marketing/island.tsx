"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  BatteryCharging,
  Bell,
  BellOff,
  Headphones,
  MapPin,
  Music2,
  Navigation,
  Pause,
  Play,
  Phone,
  SkipBack,
  SkipForward,
  Timer as TimerIcon,
  Zap,
} from "lucide-react";
import { useI18n } from "@/i18n/context";

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

/** Animated 4-bar audio waveform — mirrors the in-app equalizer. */
export function Equalizer({
  playing = true,
  className = "",
}: {
  playing?: boolean;
  className?: string;
}) {
  const bars = [0.55, 1, 0.4, 0.75];
  if (!playing) {
    return (
      <div className={`flex items-end gap-[2.5px] ${className}`}>
        {[5, 8, 6, 4].map((h, i) => (
          <span
            key={i}
            className="w-[2.5px] rounded-full bg-zinc-300"
            style={{ height: h }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={`flex items-end gap-[2.5px] ${className}`}>
      {bars.map((scale, i) => (
        <span
          key={i}
          className="eq-bar w-[2.5px] rounded-full bg-zinc-300"
          style={{
            height: 15,
            animationDelay: `${i * 0.13}s`,
            animationDuration: `${0.75 + i * 0.11}s`,
            transform: `scaleY(${scale})`,
          }}
        />
      ))}
    </div>
  );
}

/** Round icon badge used across alert banners. */
function Badge({
  children,
  size = 26,
}: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-zinc-800 text-white"
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Collapsed pill contents                                            */
/* ------------------------------------------------------------------ */

export function CollapsedIdle() {
  return (
    <div className="flex h-full w-full items-center justify-between px-3.5">
      <div className="flex h-[11px] w-[11px] items-center justify-center rounded-full bg-[#141414]">
        <div className="h-1 w-1 rounded-full bg-[#242424]" />
      </div>
      <div className="animate-status-dot h-[5px] w-[5px] rounded-full bg-white/30" />
    </div>
  );
}

export function CollapsedMusic({ playing = true }: { playing?: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-between px-2.5">
      <div className="flex h-[19px] w-[19px] items-center justify-center rounded-[5px] bg-[#1f1f1f]">
        <Music2 className="h-3 w-3 text-white" />
      </div>
      <Equalizer playing={playing} />
    </div>
  );
}

export function CollapsedTimer() {
  return (
    <div className="flex h-full w-full items-center justify-between px-3">
      <TimerIcon className="h-[15px] w-[15px] text-white" />
      <span className="font-mono text-[11px] font-bold tracking-tight text-white">
        02:41
      </span>
    </div>
  );
}

export function CollapsedNavigation() {
  return (
    <div className="flex h-full w-full items-center justify-between px-2.5">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#222]">
        <ArrowUp className="h-3 w-3 rotate-90 text-white" />
      </div>
      <span className="font-mono text-[11px] font-bold tracking-tight text-white">
        350 ft
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Alert banner contents                                              */
/* ------------------------------------------------------------------ */

function AlertShell({
  left,
  right,
}: {
  left: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full items-center justify-between px-3.5">
      <div className="flex items-center gap-2.5">{left}</div>
      {right}
    </div>
  );
}

export function AlertCharging() {
  const { t } = useI18n();
  return (
    <AlertShell
      left={
        <>
          <Badge>
            <Zap className="h-3.5 w-3.5" />
          </Badge>
          <div className="leading-tight">
            <div className="text-[11.5px] font-semibold text-white">
              {t("island.charging.title")}
            </div>
            <div className="text-[9px] text-zinc-400">{t("island.charging.sub")}</div>
          </div>
        </>
      }
      right={
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[12px] font-bold text-white">
            87%
          </span>
          <BatteryCharging className="h-4 w-4 text-white" />
        </div>
      }
    />
  );
}

export function AlertSilent() {
  const { t } = useI18n();
  return (
    <AlertShell
      left={
        <>
          <Badge>
            <BellOff className="h-3.5 w-3.5" />
          </Badge>
          <span className="text-[12px] font-semibold text-white">{t("island.silent.title")}</span>
        </>
      }
      right={<span className="text-[10.5px] text-zinc-400">{t("island.silent.sub")}</span>}
    />
  );
}

export function AlertBluetooth() {
  const { t } = useI18n();
  return (
    <AlertShell
      left={
        <>
          <Badge>
            <Headphones className="h-3.5 w-3.5" />
          </Badge>
          <div className="leading-tight">
            <div className="max-w-[110px] truncate text-[11.5px] font-semibold text-white">
              WH-1000XM5
            </div>
            <div className="text-[9px] text-zinc-400">{t("island.bt.sub")}</div>
          </div>
        </>
      }
    />
  );
}

export function AlertNotification() {
  const { t } = useI18n();
  return (
    <AlertShell
      left={
        <>
          <Badge>
            <Bell className="h-3.5 w-3.5" />
          </Badge>
          <div className="leading-tight">
            <div className="max-w-[130px] truncate text-[11px] font-bold text-white">
              Alessandra
            </div>
            <div className="max-w-[130px] truncate text-[10px] text-zinc-400">
              {t("island.notif.msg")}
            </div>
          </div>
        </>
      }
      right={
        <span className="text-[9px] font-medium text-zinc-500">{t("island.notif.app")}</span>
      }
    />
  );
}

export function AlertBatteryLow() {
  const { t } = useI18n();
  return (
    <AlertShell
      left={
        <>
          <Badge>
            <Zap className="h-3.5 w-3.5" />
          </Badge>
          <span className="text-[11.5px] font-semibold text-white">
            {t("island.battery.title")}
          </span>
        </>
      }
      right={
        <span className="text-[10.5px] font-semibold text-zinc-400">
          {t("island.battery.sub")}
        </span>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Expanded card contents                                             */
/* ------------------------------------------------------------------ */

function MusicCard() {
  const { t } = useI18n();
  return (
    <div className="flex h-full w-full flex-col justify-between px-4 py-3.5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#222]">
          <Music2 className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-[13px] font-bold text-white">
            Blinding Lights
          </div>
          <div className="truncate text-[10.5px] text-zinc-400">
            The Weeknd
          </div>
        </div>
        <Equalizer />
      </div>

      <div className="flex items-center gap-2">
        <span className="font-mono text-[8.5px] text-zinc-500">{t("island.music.time")}</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-800">
          <motion.div
            className="h-full rounded-full bg-zinc-300"
            initial={{ width: "18%" }}
            animate={{ width: ["18%", "42%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <span className="font-mono text-[8.5px] text-zinc-500">{t("island.music.remaining")}</span>
      </div>

      <div className="flex items-center justify-center gap-7">
        <SkipBack className="h-[18px] w-[18px] fill-white text-white" />
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
          <Pause className="h-4 w-4 fill-black text-black" />
        </div>
        <SkipForward className="h-[18px] w-[18px] fill-white text-white" />
      </div>
    </div>
  );
}

function NavigationCard() {
  const { t } = useI18n();
  return (
    <div className="flex h-full w-full flex-col justify-between px-4 py-3.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#242424]">
            <ArrowUp className="h-4.5 w-4.5 rotate-90 text-white" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="text-[13.5px] font-bold text-white">{t("island.nav.turn")}</div>
            <div className="max-w-[130px] truncate text-[10.5px] text-zinc-400">
              {t("island.nav.street")}
            </div>
          </div>
        </div>
        <div className="shrink-0 rounded-md border border-zinc-800 bg-[#1e1e1e] px-2 py-1">
          <span className="whitespace-nowrap text-[9px] font-semibold text-white">
            18 min • 5:24
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-zinc-500" />
          <span className="text-[10px] text-zinc-400">Market St</span>
        </div>
        <div className="flex gap-1.5">
          <div className="rounded-lg bg-[#262626] px-2.5 py-1.5">
            <span className="text-[9.5px] font-medium text-white">
              {t("island.nav.collapse")}
            </span>
          </div>
          <div className="rounded-lg bg-white px-2.5 py-1.5">
            <span className="text-[9.5px] font-bold text-black">{t("island.nav.open")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimerCard() {
  const { t } = useI18n();
  return (
    <div className="flex h-full w-full items-center justify-between px-4">
      <div>
        <div className="text-[10.5px] font-medium text-zinc-400">{t("island.timer.label")}</div>
        <div className="font-mono text-[28px] font-bold leading-none tracking-tight text-white">
          02:41
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#262626]">
          <Navigation className="h-4 w-4 rotate-135 text-white" />
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
          <Play className="h-4 w-4 fill-black text-black" />
        </div>
      </div>
    </div>
  );
}

function CallCard() {
  const { t } = useI18n();
  return (
    <div className="flex h-full w-full items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#262626]">
          <Phone className="h-4.5 w-4.5 text-white" />
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-bold text-white">Daniel Reyes</div>
          <div className="text-[10.5px] text-zinc-400">{t("island.call.status")}</div>
        </div>
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#262626]">
        <Phone className="h-4 w-4 rotate-135 text-white" />
      </div>
    </div>
  );
}

export type IslandPhaseContent =
  | "idle"
  | "music"
  | "charging"
  | "silent"
  | "bluetooth"
  | "notification"
  | "batteryLow"
  | "timer"
  | "navigation"
  | "expandedMusic"
  | "expandedNav"
  | "expandedTimer"
  | "expandedCall";

export const CONTENT: Record<
  IslandPhaseContent,
  { w: number; h: number; r: number; node: React.ReactNode }
> = {
  idle: { w: 135, h: 36, r: 20, node: <CollapsedIdle /> },
  music: { w: 177, h: 36, r: 20, node: <CollapsedMusic /> },
  charging: { w: 240, h: 50, r: 24, node: <AlertCharging /> },
  silent: { w: 190, h: 50, r: 24, node: <AlertSilent /> },
  bluetooth: { w: 218, h: 50, r: 24, node: <AlertBluetooth /> },
  notification: { w: 246, h: 50, r: 24, node: <AlertNotification /> },
  batteryLow: { w: 232, h: 50, r: 24, node: <AlertBatteryLow /> },
  timer: { w: 150, h: 36, r: 20, node: <CollapsedTimer /> },
  navigation: { w: 160, h: 36, r: 20, node: <CollapsedNavigation /> },
  expandedMusic: { w: 264, h: 158, r: 32, node: <MusicCard /> },
  expandedNav: { w: 264, h: 138, r: 32, node: <NavigationCard /> },
  expandedTimer: { w: 264, h: 110, r: 32, node: <TimerCard /> },
  expandedCall: { w: 264, h: 110, r: 32, node: <CallCard /> },
};

/**
 * Static expanded island capsule — used in the Live Activities showcase.
 */
export function ExpandedCapsule({
  type,
  scale = 1,
}: {
  type: "expandedMusic" | "expandedNav" | "expandedTimer" | "expandedCall";
  scale?: number;
}) {
  const { w, h, r, node } = CONTENT[type];
  return (
    <div
      className="relative overflow-hidden bg-black shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
      style={{
        width: w * scale,
        height: h * scale,
        borderRadius: r * scale,
      }}
    >
      {node}
    </div>
  );
}

/**
 * The morphing island capsule. Animates width / height / radius with a
 * spring and cross-fades content — a faithful, self-cycling recreation
 * of the in-app Dynamic Island.
 *
 * Rendering notes (all four fix visible glitches of the naive approach):
 * - The stage is sized to the LARGEST phase in the sequence, so nothing
 *   around the island snaps when the phase changes; the capsule floats
 *   centred inside it.
 * - Content layers are absolutely positioned, so entering and exiting
 *   content never squish each other mid-morph.
 * - Content fades in with a tiny delay so text appears once the capsule
 *   has started growing, not while it is still the old size.
 * - The cycle pauses while the tab is hidden and is disabled for
 *   prefers-reduced-motion users.
 */
export function MorphingIsland({
  sequence,
  interval = 2800,
  className = "",
  scale = 1,
  stiffness = 420,
  damping = 32,
}: {
  sequence: IslandPhaseContent[];
  interval?: number;
  className?: string;
  scale?: number;
  stiffness?: number;
  damping?: number;
}) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  // Fixed stage: largest phase in the sequence, so no layout shift around
  // the island when phases change.
  const stage = useMemo(() => {
    let w = 0;
    let h = 0;
    for (const p of sequence) {
      const c = CONTENT[p];
      if (c.w > w) w = c.w;
      if (c.h > h) h = c.h;
    }
    return { w: w * scale, h: h * scale };
  }, [sequence, scale]);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      // Freeze the cycle while the tab is invisible — avoids burst
      // catch-up jumps when the user comes back.
      if (typeof document !== "undefined" && document.hidden) return;
      setIndex((i) => (i + 1) % sequence.length);
    }, interval);
    return () => clearInterval(id);
  }, [sequence.length, interval, reduced]);

  const phase = sequence[index % sequence.length];
  const { w, h, r, node } = CONTENT[phase];

  const capsuleTransition = reduced
    ? { duration: 0 }
    : { type: "spring", stiffness, damping } as const;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: stage.w, height: stage.h }}
    >
      <motion.div
        animate={{
          width: w * scale,
          height: h * scale,
          borderRadius: r * scale,
        }}
        transition={capsuleTransition}
        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-black shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={phase}
            initial={reduced ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.02,
              transition: { duration: 0.14, ease: "easeIn" },
            }}
            transition={{
              duration: 0.26,
              delay: 0.05,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="absolute inset-0"
          >
            {node}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
