import { NextResponse } from "next/server";
import { getCoachResponse, type ChatMessage, type HabitContext } from "@/lib/chat";

interface RequestBody {
  messages: { role: "user" | "assistant"; content: string }[];
  habit?: HabitContext | null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required." },
        { status: 400 }
      );
    }

    const normalizedMessages: ChatMessage[] = body.messages.map((m) => ({
      role: m.role,
      content: m.content
    }));

    const reply = await getCoachResponse(normalizedMessages, body.habit ?? null);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[CHAT_API_ERROR]", error);
    return NextResponse.json(
      {
        error:
          "MindGym had trouble responding. Please refresh and try sending your message again."
      },
      { status: 500 }
    );
  }
}
