# MindGym – The Micro-Habit Coach

MindGym is a focused chatbot that helps you build durable habits through tiny, 2-minute actions instead of big, overwhelming plans. It combines behavioral design, micro-habits, and streak tracking into a calm coaching experience.

## Why Micro-Habits?

Research on micro-habits shows that small, low-friction actions are more sustainable than ambitious resolutions because they are easy to start and repeat daily.[web:2][web:10][web:14] Techniques like the “two-minute rule” emphasize shrinking every new habit to a version that can be started in under two minutes, so you perfect the act of showing up first.[web:1][web:13] Over time these tiny, consistent reps rewire behavior and lead to meaningful change.

## Product Principles

MindGym is deliberately narrow:

- **Single domain** – conversation is strictly about habits, routines, behavior change, motivation through small wins, and streaks.
- **Tiny actions only** – every reply includes one clearly labeled micro-action (“Tiny action: …”) that usually takes about two minutes or less.
- **Identity and streaks** – progress is framed as “you showed up today” rather than “you hit a huge target”, reinforcing the identity of someone who follows through.
- **Calm, rational tone** – no hustle quotes, no guilt. Just grounded, coach-like nudges.

If the user goes off-topic (news, coding, medical, finance, gossip, etc.), the bot politely declines and invites them back to a habit conversation.

## Feature Set

### 1. Landing Page

- Tagline: **“MindGym – Build Tiny Habits that Last”** on a calming dark gradient.
- Floating **glassmorphic hero card** with:
  - Short explanation of micro-habits.
  - Preview of a coach-style reply.
  - Primary CTA: **“Start Your Habit Journey”** linking to `/chat`.
- Subtle ambient orbs and soft shadows to keep the mood focused but not flashy.

### 2. Chat UI

- **Glassmorphism chat surface** with rounded, blurred cards and soft borders.
- Clear **coach avatar** (“MG”) and user badge to differentiate roles.
- **Typing indicator** rendered as three animated dots inside an assistant bubble.
- **Empty state** message:
  - “Tell me a habit you want to build. I’ll make it tiny.”
  - Concrete example prompts.
- Smooth transitions on page load and new messages, plus clear error states if the API fails.

### 3. Habit Tracking (localStorage)

- Lightweight tracker stored in `localStorage` under `mindgym-habit-v1`:
  - `habit name`
  - `streak days`
  - `last completed date`
- **HabitRing** (`components/HabitRing.tsx`):
  - SVG progress ring with gradient stroke and smooth animation.
  - Center content shows current streak and a conceptual target (e.g. 21 days).
- Side panel lets users:
  - Name their current habit.
  - Mark today as complete (streak logic handles breaks and restarts).
  - See last completion date and a calm description of how to use the micro-habit.

### 4. Chatbot Rules (via `lib/chat.ts`)

- System prompt enforces:
  - Habits-only domain.
  - One micro-action per message, clearly labeled.
  - Short, structured replies (3–6 small paragraphs or lines).
  - Polite refusal for anything outside micro-habits / behavior.
- Habit context (name + streak) is passed from the client to:
  - Celebrate streaks.
  - Frame responses like “Day X of showing up for [habit name].”
- Uses OpenAI’s Chat Completions API by default, with model configurable via `OPENAI_MODEL`.

## Tech Stack

- **Framework**: Next.js 14 App Router + TypeScript
- **Styling**: Tailwind CSS + glassmorphism tokens
- **UI Primitives**: ShadCN-style `Button`, `Input`, `Textarea`
- **AI**: OpenAI SDK (pluggable to Perplexity if desired)
- **State**: React hooks + `localStorage` for habit streaks
- **Deployment**: Vercel

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set your API key
cp .env.example .env.local
# then edit .env.local

# 3. Run the dev server
npm run dev
# visit http://localhost:3000
