import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex-1 page-fade">
      <div className="relative h-full min-h-screen overflow-hidden">
        {/* Ambient gradient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl animate-pulse-soft" />
          <div className="absolute -bottom-40 -right-10 h-[22rem] w-[22rem] rounded-full bg-emerald-400/15 blur-3xl animate-pulse-soft" />
        </div>

        <div className="relative z-10 flex h-full min-h-screen items-center justify-center px-4 py-10 md:px-6">
          <div className="max-w-5xl mx-auto flex flex-col gap-10 md:gap-14">
            {/* Brand row */}
            <header className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-2xl bg-slate-900/80 border border-sky-500/40 shadow-md shadow-sky-500/30 flex items-center justify-center">
                  {/* Simple SVG logo */}
                  <svg
                    viewBox="0 0 32 32"
                    aria-label="MindGym logo"
                    className="h-5 w-5 text-sky-300"
                  >
                    <defs>
                      <linearGradient
                        id="mindgym-logo"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="60%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="16"
                      cy="16"
                      r="11"
                      fill="none"
                      stroke="url(#mindgym-logo)"
                      strokeWidth="2"
                    />
                    <path
                      d="M10 18.5C11.5 16 13.5 14.5 16 14.5C18.5 14.5 20.5 16 22 18.5"
                      stroke="url(#mindgym-logo)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="13" cy="13" r="1.3" fill="#38bdf8" />
                    <circle cx="19" cy="13" r="1.3" fill="#38bdf8" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                    MindGym
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Micro-habit coaching, not motivation spam.
                  </p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
                <Sparkles className="h-4 w-4 text-sky-300" />
                <span>Built for tiny, 2-minute wins.</span>
              </div>
            </header>

            {/* Hero glass card */}
            <section className="glass-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-emerald-400/10" />
              <div className="relative px-6 py-8 md:px-10 md:py-12 flex flex-col md:flex-row gap-10 md:gap-14 items-center">
                <div className="flex-1 space-y-6">
                  <p className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 border border-slate-700/70 px-3 py-1 text-[11px] uppercase tracking-[0.26em] text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Build tiny habits that last
                  </p>

                  <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50">
                      MindGym –{" "}
                      <span className="text-sky-300">
                        The Micro-Habit Coach
                      </span>
                    </h1>
                    <p className="text-sm md:text-base text-slate-300 max-w-xl">
                      Tell MindGym the habit you want to build and it will slice
                      it down into calm, 2-minute actions you can actually do
                      today. One tiny rep at a time.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <Link href="/chat" className="inline-flex">
                      <Button size="lg" className="gap-2">
                        Start Your Habit Journey
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>

                    <p className="text-[11px] text-slate-400 max-w-xs">
                      No productivity overwhelm. Just one small, clear action
                      per message, plus streaks that celebrate quiet progress.
                    </p>
                  </div>
                </div>

                {/* Right side mini preview */}
                <div className="w-full max-w-xs md:max-w-sm">
                  <div className="glass-bubble px-4 py-4 md:px-5 md:py-5 space-y-4">
                    <p className="text-xs font-medium text-slate-400">
                      A glimpse of your coach
                    </p>
                    <div className="space-y-3">
                      <div className="flex gap-2 text-[11px]">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300" />
                        <p className="text-slate-200">
                          “Instead of ‘read 30 minutes’, your micro-habit is:
                          sit down, open the book, and read one page.”
                        </p>
                      </div>
                      <div className="flex gap-2 text-[11px]">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <p className="text-slate-300">
                          Streaks, gentle nudges, and realistic 2-minute reps –
                          not guilt or hustle quotes.
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Micro-habit focus</span>
                      <span className="inline-flex items-center gap-1 text-sky-300">
                        2-minute rule
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Micro copy footer */}
            <footer className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-slate-500">
              <p>
                MindGym is deliberately narrow: it only talks about habits,
                behavior change, and tiny routines – nothing else.
              </p>
              <p className="text-slate-600">
                Built with Next.js, Tailwind, and a calm, coach-like voice.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
