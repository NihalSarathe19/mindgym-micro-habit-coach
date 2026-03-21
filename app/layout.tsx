import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "MindGym – The Micro-Habit Coach",
  description: "Build tiny 2-minute habits that last with a calm, product-focused micro-habit coach."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-mindgym-gradient text-slate-50">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
