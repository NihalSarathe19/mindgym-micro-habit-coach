"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Flame, Info } from "lucide-react";
import { ChatBubble } from "@/components/ChatBubble";
import { HabitRing } from "@/components/HabitRing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ChatRole = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

interface HabitState {
  name: string;
  streak: number;
  lastCompleted: string | null; // ISO date
}

const HABIT_STORAGE_KEY = "mindgym-habit-v1";

const todayISO = () => new Date().toISOString().slice(0, 10);

function loadHabitFromStorage(): HabitState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(HABIT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as HabitState;
    if (!parsed.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveHabitToStorage(habit: HabitState | null) {
  if (typeof window === "undefined") return;
  if (!habit) {
    window.localStorage.removeItem(HABIT_STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(HABIT_STORAGE_KEY, JSON.stringify(habit));
}

export default function ChatPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [habitNameInput, setHabitNameInput] = useState("");
  const [habit, setHabit] = useState<HabitState | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // hydrate habit from localStorage
  useEffect(() => {
    const stored = loadHabitFromStorage();
    if (stored) {
      setHabit(stored);
      setHabitNameInput(stored.name);
    }
  }, []);

  // persist habit
  useEffect(() => {
    saveHabitToStorage(habit);
  }, [habit]);

  const hasCompletedToday = useMemo(() => {
    if (!habit?.lastCompleted) return false;
    return habit.lastCompleted === todayISO();
  }, [habit]);

  const handleSetHabit = () => {
    const trimmed = habitNameInput.trim();
    if (!trimmed) {
      setError("Give your habit a short, specific name.");
      return;
    }
    setError(null);
    setHabit((prev) => ({
      name: trimmed,
      streak: prev?.streak ?? 0,
      lastCompleted: prev?.lastCompleted ?? null
    }));
  };

  const handleMarkComplete = () => {
    if (!habit) return;
    const today = todayISO();
    if (habit.lastCompleted === today) return;

    setHabit((prev) => {
      if (!prev) return null;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayISO = yesterday.toISOString().slice(0, 10);

      const continuedStreak =
        prev.lastCompleted === yesterdayISO ? prev.streak + 1 : (prev.streak || 0) + 1;

      return {
        ...prev,
        streak: continuedStreak,
        lastCompleted: today
      };
    });
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    setError(null);

    const newUserMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed
    };

    const nextMessages = [...messages, newUserMessage];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content
          })),
          habit: habit
            ? {
                name: habit.name,
                streak: habit.streak,
                lastCompleted: habit.lastCompleted
              }
            : null
        })
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const data: { reply: string } = await response.json();

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while talking to your coach. Please try again in a moment."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const showEmptyState = messages.length === 0;

  return (
    <main className="flex-1 page-fade">
      <div className="relative min-h-screen px-3 py-3 md:px-6 md:py-6">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-44 left-0 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl animate-pulse-soft" />
          <div className="absolute -bottom-52 right-0 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl animate-pulse-soft" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-4 md:gap-6 h-[calc(100vh-1.5rem)]">
          {/* Top bar */}
          <header className="flex items-center justify-between gap-3">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </button>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end text-[11px] text-slate-400">
                <span>MindGym – The Micro-Habit Coach</span>
                <span className="text-slate-500">
                  Only habits, micro-actions, and behavior change. Nothing else.
                </span>
              </div>
              <div className="h-9 w-9 rounded-2xl bg-slate-900/80 border border-sky-400/50 flex items-center justify-center shadow-md shadow-sky-500/30">
                <span className="text-[11px] font-semibold tracking-wide text-sky-100">
                  MG
                </span>
              </div>
            </div>
          </header>

          {/* Main grid */}
          <section className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Chat column */}
            <div className="flex-[3] glass-card flex flex-col overflow-hidden">
              {/* Chat header */}
              <div className="border-b border-slate-800/70 px-4 py-3 md:px-5 md:py-4 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-400">
                    Chat with your coach
                  </p>
                  <p className="text-sm text-slate-300">
                    Tell me one habit you want to build. I&apos;ll make it tiny.
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Focused on micro-habits only</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-3 md:px-4 py-4 md:py-5 space-y-4">
                {showEmptyState ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="max-w-md text-center space-y-4">
                      <div className="inline-flex items-center justify-center rounded-full bg-slate-900/70 border border-slate-700/70 px-3 py-1 text-[11px] text-slate-300 gap-2">
                        <Info className="h-3.5 w-3.5 text-sky-300" />
                        MindGym specializes in 2-minute habits only.
                      </div>
                      <h2 className="text-lg md:text-xl font-semibold text-slate-50">
                        Tell me a habit you want to build. I&apos;ll make it tiny.
                      </h2>
                      <p className="text-sm text-slate-400">
                        Example prompts:
                        <br />
                        “I want to start reading.”
                        <br />
                        “Help me move more, I sit all day.”
                        <br />
                        “I keep failing at meditation.”
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {messages.map((m) => (
                      <ChatBubble
                        key={m.id}
                        role={m.role}
                        content={m.content}
                      />
                    ))}
                    {isSending && (
                      <ChatBubble
                        role="assistant"
                        content=""
                        isTyping
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Error state */}
              {error && (
                <div className="px-4 pb-1 text-[11px] text-rose-300 bg-rose-900/30 border-t border-rose-500/40">
                  {error}
                </div>
              )}

              {/* Input */}
              <div className="border-t border-slate-800/70 px-3 md:px-4 py-3 md:py-3.5">
                <div className="flex items-end gap-2">
                  <Textarea
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe one habit, situation, or struggle. MindGym will reply with a single 2-minute action."
                  />
                  <Button
                    type="button"
                    onClick={() => void sendMessage()}
                    disabled={!input.trim() || isSending}
                    size="lg"
                    className="h-[52px] px-4"
                  >
                    {isSending ? "Coaching…" : "Send"}
                  </Button>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500">
                  MindGym only answers questions about habits, micro-actions,
                  motivation through small wins, and behavior change.
                </p>
              </div>
            </div>

            {/* Habit / streak column */}
            <aside className="flex-[2] glass-card flex flex-col px-4 py-4 md:px-5 md:py-5 gap-4 md:gap-5">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-400">
                    Your micro-habit
                  </p>
                  <p className="text-sm text-slate-200">
                    Lock in one tiny habit, track streaks calmly.
                  </p>
                </div>
                {habit?.streak ? (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/60 border border-slate-700/70 px-2.5 py-1 text-[11px] text-slate-300">
                    <Flame className="h-3.5 w-3.5 text-amber-300" />
                    <span>{habit.streak}-day streak</span>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                <HabitRing streak={habit?.streak ?? 0} />

                <div className="flex-1 space-y-3">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="habit-name"
                      className="text-xs text-slate-300"
                    >
                      Habit name
                    </label>
                    <Input
                      id="habit-name"
                      placeholder="e.g. Open my book and read one page"
                      value={habitNameInput}
                      onChange={(e) => setHabitNameInput(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="subtle"
                      size="sm"
                      onClick={handleSetHabit}
                    >
                      Save habit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={!habit || hasCompletedToday}
                      onClick={handleMarkComplete}
                      className="gap-1.5"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                      {hasCompletedToday ? "Today logged" : "Mark today complete"}
                    </Button>
                  </div>

                  <div className="text-[11px] text-slate-400 space-y-1.5">
                    {habit?.name ? (
                      <>
                        <p className="text-slate-300">
                          Current focus:{" "}
                          <span className="text-sky-300">{habit.name}</span>
                        </p>
                        <p>
                          Tap “Mark today complete” once you finish your
                          2-minute version. If you miss a day, your coach will
                          help you restart gently, not perfectly.
                        </p>
                      </>
                    ) : (
                      <p>
                        Use a short, behavior-focused name like “open notes and
                        study 2 minutes” or “fill one line in my journal”. MindGym
                        will keep coaching around this micro-habit.
                      </p>
                    )}
                    {habit?.lastCompleted && (
                      <p className="text-slate-500">
                        Last completion: {habit.lastCompleted}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </main>
  );
}
