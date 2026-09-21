"use client";

import { Battery, Signal, Wifi } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { AndroidHome } from "./android-home";

type PhoneVideo = {
  src: string;
  poster: string;
  label: string;
};

/**
 * Minimal Android device mockup — dark bezel, ambient wallpaper,
 * status bar, and the island window centered at the top.
 *
 * When `video` is set, the simulated screen is replaced by a real
 * device recording that fills the same bezel (the recording carries
 * its own status bar and island, so none of those are drawn).
 */
export function PhoneFrame({
  children,
  className = "",
  video,
}: {
  children?: ReactNode;
  className?: string;
  video?: PhoneVideo;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      {/* Ambient glow behind device */}
      <div
        aria-hidden
        className="absolute -inset-10 rounded-[64px] bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)] blur-2xl"
      />

      <div className="relative rounded-[44px] border border-white/10 bg-[#0b0b0c] p-[10px] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.04)_inset]">
        <div className="relative h-[560px] w-[272px] overflow-hidden rounded-[36px] bg-[#050506] sm:h-[600px] sm:w-[290px]">
          {video ? (
            <>
              {/* Real-device recording — fills the screen edge to edge */}
              <video
                className="absolute inset-0 h-full w-full object-cover object-top"
                src={video.src}
                poster={video.poster}
                aria-label={video.label}
                title={video.label}
                autoPlay={!reduce}
                muted
                loop
                playsInline
                controls={Boolean(reduce)}
                preload="metadata"
              />
              {/* Screen floor reflection */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-inset ring-white/10"
              />
            </>
          ) : (
            <>
              {/* Wallpaper — soft monochrome aurora */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(255,255,255,0.09),transparent_60%),radial-gradient(80%_50%_at_85%_100%,rgba(255,255,255,0.05),transparent_65%)]"
              />
              <div aria-hidden className="bg-grid absolute inset-0 opacity-20" />

              {/* Home screen — app grid + dock behind the island */}
              <AndroidHome />

              {/* Status bar */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-3.5 text-white">
                <span className="font-mono text-[11px] font-semibold tracking-wide">
                  9:41
                </span>
                <div className="flex items-center gap-1.5 text-white/85">
                  <Signal className="h-3 w-3" />
                  <Wifi className="h-3 w-3" />
                  <Battery className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Island slot — child renders the actual island */}
              <div className="absolute inset-x-0 top-[13px] flex justify-center">
                {children}
              </div>

              {/* Screen floor reflection */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-inset ring-white/5"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
