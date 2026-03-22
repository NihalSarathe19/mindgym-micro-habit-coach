"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[56px] w-full rounded-2xl border border-slate-700/60 bg-slate-900/70 px-4 py-3 text-sm placeholder:text-slate-500 shadow-inner-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 resize-none",
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
