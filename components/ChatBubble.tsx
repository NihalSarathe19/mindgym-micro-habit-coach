"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Role = "user" | "assistant";

interface ChatBubbleProps {
  role: Role;
  content: string;
  isTyping?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  role,
  content,
  isTyping
}) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 md:gap-4 w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="h-9 w-9 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shadow-md shadow-sky-500/30">
            <span className="text-xs font-semibold tracking-wide text-sky-100">
              MG
            </span>
          </div>
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] md:max-w-[70%] px-4 py-3 md:px-5 md:py-3.5 text-sm leading-relaxed",
          "transition-transform duration-200 ease-out",
          isUser
            ? "rounded-2xl rounded-br-md bg-sky-500 text-slate-950 shadow-md shadow-sky-500/40"
            : "glass-bubble rounded-2xl rounded-bl-md text-slate-100"
        )}
      >
        {isTyping ? (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400/90 animate-typing-dot-1" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400/90 animate-typing-dot-2" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400/90 animate-typing-dot-3" />
            <span className="sr-only">MindGym is typing…</span>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{content}</p>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-2xl bg-slate-700/60 border border-slate-500/50 flex items-center justify-center">
            <span className="text-[11px] font-semibold text-slate-100">You</span>
          </div>
        </div>
      )}
    </div>
  );
};
