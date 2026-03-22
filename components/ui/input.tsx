"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-full border border-slate-700/60 bg-slate-900/70 px-4 text-sm placeholder:text-slate-500 shadow-inner-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
