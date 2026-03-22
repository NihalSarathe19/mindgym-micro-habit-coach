import { ChatCompletionRequestMessage } from "openai";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface HabitContext {
  goal?: string;
  micro?: string;
  mood?: string;
  streak?: number;
}

export async function getCoachResponse(
  messages: ChatMessage[],
  habit: HabitContext | null
) {

  const last = messages[messages.length - 1].content;

  // Custom CatCoach personality
  const basePrompt = `
You are MindGym CatCoach — a soft-spoken micro-habit coach with a playful cat persona.
You NEVER overwhelm the user. You ALWAYS convert habits into a SINGLE 2-minute microscopic action.

Rules:
- reply in calm, gentle, short messages
- include tiny cat-like sounds sometimes ("mrrp~", "purr~", "nyaa~")
- ALWAYS convert user's goal into a 2-minute action
- never hustle culture, no guilt
- reinforce streaks gently
- celebrate small wins
`;

  const habitContext = habit
    ? `The user's current habit: ${habit.goal || "unknown goal"}.
       Micro-step: ${habit.micro || "undefined"}.
       Mood: ${habit.mood || "neutral"}.
       Streak count: ${habit.streak ?? 0}.`
    : "No habit context yet.";

  const input = `
${basePrompt}

${habitContext}

User says: "${last}"

Respond as CatCoach:
`;

  // If you want: connect to OpenAI here
  // For now, return a handcrafted response:

  if (last.toLowerCase().includes("read")) {
    return `mrrp~ okay, tiny step time 📘  
Instead of “read 20 min”, just open the book and read **one page**.  
That’s your whole win for today.`;
  }

  if (last.toLowerCase().includes("gym")) {
    return `purr~ tiny rep coming up 🏋️  
Just put on your shoes and stand near the door.  
If you do only that, it's still a win.`;
  }

  // Default fallback
  return `nyaa~ let's turn that into something tiny.  
Try this: **do the smallest version of your habit for 2 minutes only**.  
Tell me your goal and I’ll shrink it even more.`;
}