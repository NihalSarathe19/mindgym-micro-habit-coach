"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HabitRingProps {
  streak: number;
  target?: number; // conceptual goal (e.g. 21-day streak)
  className?: string;
}

export const HabitRing: React.FC<HabitRingProps> = ({
  streak,
  target = 21,
  className
}) => {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;

  const clamped = Math.max(0, Math.min(streak, target));
  const progress = clamped / target;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        "w-36 h-36 md:w-40 md:h-40"
      )}
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full -rotate-90 drop-shadow-[0_0_24px_rgba(56,189,248,0.4)]"
      >
        <defs>
          <linearGradient
            id="mindgym-ring-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="rgba(148,163,184,0.3)"
          strokeWidth="9"
          fill="none"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="url(#mindgym-ring-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
          fill="none"
        />
      </svg>

      <div
        className={cn(
          "absolute inset-6 rounded-full bg-slate-950/70 border border-slate-800/80",
          "flex flex-col items-center justify-center text-center space-y-1"
        )}
      >
        <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
          Current streak
        </span>
        <span className="text-2xl font-semibold text-sky-300">
          {streak}
          <span className="text-xs ml-1 text-slate-400">days</span>
        </span>
        <span className="text-[11px] text-slate-500">
          {clamped >= target ? "Micro-habit locked in" : `${target} day target`}
        </span>
      </div>
    </div>
  );
};
