import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

// Use Google-hosted Geist fonts
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MindGym – The Micro-Habit Coach",
  description:
    "Build tiny 2-minute habits that last with a calm, product-focused micro-habit coach.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(geistSans.variable, geistMono.variable)}>
      <body className="bg-mindgym-gradient text-slate-50">
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}