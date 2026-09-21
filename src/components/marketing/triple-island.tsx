"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Timer as TimerIcon } from "lucide-react";
import { CONTENT, type IslandPhaseContent } from "./island";

/* ------------------------------------------------------------------ */
/*  Triple Island — iOS 27.1 style                                     */
/*  Main capsule flanked by two detached satellite bubbles, mirroring  */
/*  the app's SYMMETRICAL TripleLayoutStyle row:                       */
/*  [36dp bubble] — 8dp — [main capsule] — 8dp — [36dp bubble]         */
/* ------------------------------------------------------------------ */

type Act = "timer" | "music" | "nav";

interface Beat {
  /** Activity driving the main capsule ("idle" = quiet island). */
  main: Act | "idle";
  /** Main capsule is expanded — satellites absorb into it. */
  expanded?: boolean;
  /** Left satellite bubble activity (absent = no bubble). */
  left?: Act;
  /** Right satellite bubble activity (absent = no bubble). */
  right?: Act;
  /** How long this beat holds, in ms. */
  hold: number;
}

const MAIN_PHASE: Record<Act | "idle", IslandPhaseContent> = {
  idle: "idle",
  music: "music",
  timer: "timer",
  nav: "navigation",
};

const EXPANDED_PHASE: Record<Act, IslandPhaseContent> = {
  music: "expandedMusic",
  timer: "expandedTimer",
  nav: "expandedNav",
};

const B = 36; // bubble diameter (matches the app's 36dp DetachedBubble)
const GAP = 8; // detached gap (matches the app's 8dp spacer)

/** Shared capsule spring — bubbles use the identical spring so they track the capsule edge in lock-step. */
const CAPSULE_SPRING = { type: "spring", stiffness: 420, damping: 30 } as const;
/** Bubble pop spring — a touch bouncier for the "pop in" moment. */
const POP_SPRING = { type: "spring", stiffness: 520, damping: 22 } as const;

/** Hero story: solo → join → full triple → swap → focus-expand → restore → swap → clear. */
export const TRIPLE_BEATS: Beat[] = [
  { main: "music", hold: 3000 },
  { main: "music", left: "timer", hold: 2600 },
  { main: "music", left: "timer", right: "nav", hold: 3400 },
  { main: "timer", left: "music", right: "nav", hold: 2700 },
  { main: "timer", expanded: true, hold: 3800 },
  { main: "timer", left: "music", right: "nav", hold: 2400 },
  { main: "nav", left: "music", right: "timer", hold: 2700 },
  { main: "idle", hold: 2300 },
];

/** Compact story for feature cards — no expanded beat. */
export const TRIPLE_BEATS_COMPACT: Beat[] = [
  { main: "music", hold: 3200 },
  { main: "music", left: "timer", hold: 2900 },
  { main: "music", left: "timer", right: "nav", hold: 3600 },
  { main: "timer", left: "music", right: "nav", hold: 2900 },
  { main: "nav", left: "music", right: "timer", hold: 2900 },
  { main: "idle", hold: 2400 },
];

/** Compact 3-bar waveform for the detached music bubble — mirrors EqualizerWaveformMini. */
function MiniEqualizer() {
  return (
    <div className="flex items-center gap-[2px]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="eq-bar w-[2px] rounded-full bg-white"
          style={{
            height: 9,
            animationDelay: `${i * 0.17}s`,
            animationDuration: `${0.62 + i * 0.09}s`,
          }}
        />
      ))}
    </div>
  );
}

function BubbleContent({ act }: { act: Act }) {
  if (act === "timer") {
    return <TimerIcon className="h-[15px] w-[15px] text-white" />;
  }
  if (act === "nav") {
    return <ArrowUp className="h-[15px] w-[15px] rotate-90 text-white" />;
  }
  return <MiniEqualizer />;
}

function Bubble({
  act,
  side,
  x,
  bubbleSize,
  reduced,
}: {
  act: Act;
  side: "left" | "right";
  /** Centred x-offset from the island's centre. */
  x: number;
  bubbleSize: number;
  reduced: boolean;
}) {
  return (
    <AnimatePresence>
      {act && (
        <motion.div
          key={side}
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, x }}
          exit={{
            scale: 0,
            opacity: 0,
            x: x + (side === "left" ? -14 : 14), // absorbed toward the capsule
            transition: { ...CAPSULE_SPRING, opacity: { duration: 0.16 } },
          }}
          transition={POP_SPRING}
          className="absolute top-1/2 left-1/2 z-0 flex items-center justify-center rounded-full bg-black shadow-[0_10px_28px_-10px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
          style={{
            width: bubbleSize,
            height: bubbleSize,
            marginLeft: -bubbleSize / 2,
            marginTop: -bubbleSize / 2,
            originX: side === "left" ? 1 : 0,
            originY: 0.5,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={act}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <BubbleContent act={act} />
            </motion.span>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Live Triple Island demo. Cycles through a choreographed set of beats:
 * satellites pop in as activities arrive, swap with the main capsule in
 * one heartbeat, and get absorbed while the main capsule is expanded.
 */
export function TripleIsland({
  beats = TRIPLE_BEATS,
  scale = 1,
  className = "",
  compact = false,
}: {
  beats?: Beat[];
  scale?: number;
  className?: string;
  compact?: boolean;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  const activeBeats = useMemo(
    () => (compact ? beats.filter((b) => !b.expanded) : beats),
    [beats, compact]
  );

  // Reduced motion: settle on the fullest, quietest beat (the triple row).
  const staticBeat = useMemo(
    () => activeBeats.find((b) => b.left && b.right) ?? activeBeats[0],
    [activeBeats]
  );
  const beat = reduced
    ? staticBeat
    : activeBeats[index % activeBeats.length];

  // Fixed stage sized to the widest/tallest beat — zero layout shift.
  const stage = useMemo(() => {
    let w = 0;
    let h = 0;
    for (const b of activeBeats) {
      const phase = b.expanded ? EXPANDED_PHASE[b.main as Act] : MAIN_PHASE[b.main];
      const cap = CONTENT[phase];
      const total =
        cap.w + (b.left ? GAP + B : 0) + (b.right ? GAP + B : 0);
      if (total > w) w = total;
      if (cap.h > h) h = cap.h;
    }
    return { w: (w + 8) * scale, h: h * scale };
  }, [activeBeats, scale]);

  // Hold-based beat advance; freezes while the tab is hidden.
  useEffect(() => {
    if (reduced || activeBeats.length <= 1) return;
    let cancelled = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (cancelled) return;
      if (typeof document !== "undefined" && document.hidden) {
        t = setTimeout(tick, 1000);
        return;
      }
      setIndex((i) => (i + 1) % activeBeats.length);
    };
    t = setTimeout(tick, beat.hold);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [beat, reduced, activeBeats]);

  const phase = beat.expanded
    ? EXPANDED_PHASE[beat.main as Act]
    : MAIN_PHASE[beat.main];
  const { w, h, r, node } = CONTENT[phase];

  const bubbleSize = B * scale;
  const leftX = -(w / 2 + GAP * scale + bubbleSize / 2);
  const rightX = w / 2 + GAP * scale + bubbleSize / 2;

  return (
    <div
      aria-hidden
      className={`relative ${className}`}
      style={{ width: stage.w, height: stage.h }}
    >
      <Bubble
        act={beat.left as Act}
        side="left"
        x={leftX}
        bubbleSize={bubbleSize}
        reduced={!!reduced}
      />
      <Bubble
        act={beat.right as Act}
        side="right"
        x={rightX}
        bubbleSize={bubbleSize}
        reduced={!!reduced}
      />

      {/* Main capsule — stays glued to the centre, morphs around it. */}
      <motion.div
        animate={{
          width: w * scale,
          height: h * scale,
          borderRadius: r * scale,
        }}
        transition={
          reduced ? { duration: 0 } : CAPSULE_SPRING
        }
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
