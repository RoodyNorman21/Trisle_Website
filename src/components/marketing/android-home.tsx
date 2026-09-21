"use client";

import { useEffect, useState, type ComponentType, type CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Calendar,
  Camera,
  Chrome,
  Clock,
  CloudSun,
  Folder,
  Image as ImageIcon,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Music,
  Phone,
  Play,
  Settings,
  Triangle,
} from "lucide-react";
import { useI18n } from "@/i18n/context";

/* ------------------------------------------------------------------ */
/*  Android home screen                                                */
/*  Populated launcher wallpaper for the device mockup: At-a-Glance    */
/*  widget (locale-aware date), a 4x4 app grid with labels and a       */
/*  blurred dock — everything behind the island stays dim so the       */
/*  triple island remains the hero.                                    */
/* ------------------------------------------------------------------ */

interface AppDef {
  /** i18n key for generic apps that real launchers localize. */
  key?: string;
  /** Literal brand name (never translated, like on a real phone). */
  name?: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Flat background color class (light icons). */
  bg?: string;
  /** Gradient / conic background style (colorful icons). */
  bgStyle?: CSSProperties;
  fg: string;
  /** Notification badge dot. */
  badge?: boolean;
}

const GRID: AppDef[] = [
  {
    key: "apps.photos",
    icon: ImageIcon,
    bgStyle: {
      background:
        "conic-gradient(from 40deg, #fbbf24, #f87171, #c084fc, #60a5fa, #4ade80, #fbbf24)",
    },
    fg: "text-white",
  },
  {
    name: "Play Store",
    icon: Triangle,
    bgStyle: {
      background:
        "conic-gradient(from 220deg, #34d399, #fde047, #fb7185, #818cf8, #34d399)",
    },
    fg: "text-white",
  },
  { name: "Gmail", icon: Mail, bg: "bg-[#f3f3f5]", fg: "text-red-500", badge: true },
  { key: "apps.maps", icon: MapPin, bg: "bg-[#f3f3f5]", fg: "text-red-500" },
  {
    name: "YouTube",
    icon: Play,
    bgStyle: { background: "linear-gradient(160deg, #ff4e45, #d61f1f)" },
    fg: "text-white",
  },
  {
    name: "Instagram",
    icon: Instagram,
    bgStyle: {
      background: "linear-gradient(45deg, #f9ce34, #ee2a7b 55%, #6228d7)",
    },
    fg: "text-white",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    bgStyle: { background: "linear-gradient(160deg, #3fe07c, #0f8a70)" },
    fg: "text-white",
  },
  {
    name: "Spotify",
    icon: Music,
    bgStyle: { background: "linear-gradient(160deg, #1ed760, #12813b)" },
    fg: "text-white",
  },
  {
    key: "apps.clock",
    icon: Clock,
    bgStyle: { background: "linear-gradient(160deg, #2e2e33, #101012)" },
    fg: "text-white",
  },
  { key: "apps.calendar", icon: Calendar, bg: "bg-[#f3f3f5]", fg: "text-zinc-800" },
  {
    key: "apps.settings",
    icon: Settings,
    bgStyle: { background: "linear-gradient(160deg, #878792, #4a4a54)" },
    fg: "text-white",
  },
  {
    key: "apps.files",
    icon: Folder,
    bgStyle: { background: "linear-gradient(160deg, #60a5fa, #2563eb)" },
    fg: "text-white",
  },
];

const DOCK: AppDef[] = [
  {
    icon: Phone,
    bgStyle: { background: "linear-gradient(160deg, #4ade80, #16a34a)" },
    fg: "text-white",
  },
  {
    icon: MessageSquare,
    bgStyle: { background: "linear-gradient(160deg, #60a5fa, #1d4ed8)" },
    fg: "text-white",
  },
  {
    icon: Chrome,
    bgStyle: {
      background:
        "conic-gradient(from 0deg, #ea4335, #fbbc05, #34a853, #4285f4, #ea4335)",
    },
    fg: "text-white",
  },
  {
    icon: Camera,
    bgStyle: { background: "linear-gradient(160deg, #3a3a41, #131316)" },
    fg: "text-white",
  },
];

function AppIcon({
  app,
  label,
  className = "",
}: {
  app: AppDef;
  label?: string;
  className?: string;
}) {
  const Icon = app.icon;
  return (
    <div className={`flex min-w-0 flex-col items-center gap-1.5 ${className}`}>
      <div
        className={`relative flex aspect-square w-full items-center justify-center rounded-[30%] shadow-[0_6px_14px_-6px_rgba(0,0,0,0.9)] ring-1 ring-white/15 transition-transform duration-200 active:scale-95 ${app.bg ?? ""}`}
        style={app.bgStyle}
      >
        <Icon className="h-[52%] w-[52%]" strokeWidth={1.9} />
        {app.badge && (
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[#050506]" />
        )}
      </div>
      {label && (
        <span className="-mx-1.5 w-[calc(100%+12px)] truncate text-center text-[10px] leading-tight font-medium text-white/85 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
          {label}
        </span>
      )}
    </div>
  );
}

export function AndroidHome() {
  const { t, locale } = useI18n();
  const reduce = useReducedMotion();
  // Locale-aware "At a Glance" date. Computed after mount so SSR and
  // hydration always agree (the provider starts in "en" either way).
  const [glance, setGlance] = useState("");

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount Intl formatting: formatting during render would break SSR hydration
      setGlance(
        new Intl.DateTimeFormat(locale, {
          weekday: "short",
          day: "numeric",
          month: "short",
        }).format(new Date())
      );
    } catch {
      setGlance("");
    }
  }, [locale]);

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.035, delayChildren: 0.55 } },
  };
  const item: Variants = reduce
    ? {}
    : {
        hidden: { opacity: 0, y: 10, scale: 0.92 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
        },
      };

  return (
    <div aria-hidden className="absolute inset-0 flex flex-col">
      {/* At a Glance — date + weather */}
      <div className="flex items-end justify-between px-6 pt-[112px]">
        <p className="h-4 max-w-[150px] truncate text-[13px] font-semibold tracking-tight text-white/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
          {glance}
        </p>
        <p className="flex items-center gap-1 text-xs font-medium text-white/70 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
          <CloudSun className="h-3.5 w-3.5" />
          24°
        </p>
      </div>

      {/* App grid */}
      <motion.div
        variants={reduce ? undefined : stagger}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="mt-4 grid grid-cols-4 gap-x-3 gap-y-4 px-5"
      >
        {GRID.map((app) => (
          <motion.div key={app.key ?? app.name} variants={item}>
            <AppIcon app={app} label={app.key ? t(app.key) : app.name} />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex-1" />

      {/* Page indicator */}
      <div className="mb-3 flex items-center justify-center gap-1.5">
        <span className="h-1 w-1 rounded-full bg-white/30" />
        <span className="h-1 w-3.5 rounded-full bg-white/80" />
        <span className="h-1 w-1 rounded-full bg-white/30" />
      </div>

      {/* Dock */}
      <div className="mx-3.5 mb-3 grid h-[74px] grid-cols-4 place-items-center rounded-[26px] bg-white/[0.07] ring-1 ring-white/10 backdrop-blur-md">
        {DOCK.map((app, i) => (
          <AppIcon key={i} app={app} className="w-[46px] px-0" />
        ))}
      </div>

      {/* Gesture bar */}
      <div className="pb-2">
        <div className="mx-auto h-1 w-24 rounded-full bg-white/25" />
      </div>
    </div>
  );
}
