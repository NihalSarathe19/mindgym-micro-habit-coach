import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

// Load local Geist fonts from the public folder
const GeistSans = localFont({
  src: "/fonts/Geist-Regular.woff2",
  variable: "--font-geist-sans",
});

const GeistMono = localFont({
  src: "/fonts/Geist-Mono.woff2",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "MindGym – The Micro-Habit Coach",
  description:
    "Build tiny 2-minute habits that last with a calm, product-focused micro-habit coach.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
      <body className="bg-mindgym-gradient text-slate-50">
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}