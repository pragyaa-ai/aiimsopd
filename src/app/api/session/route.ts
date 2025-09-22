import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("[API] Session endpoint called");
    
    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      console.error("[API] No OpenAI API key found in environment");
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }
    
    console.log("[API] API key found, length:", process.env.OPENAI_API_KEY.length);
    console.log("[API] Making request to OpenAI Realtime API...");
    
    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-10-01",
        }),
      }
    );
    
    console.log("[API] OpenAI response status:", response.status);
    console.log("[API] OpenAI response headers:", Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    console.log("[API] OpenAI response data:", data);
    
    if (!response.ok) {
      console.error("[API] OpenAI API error:", data);
      return NextResponse.json(data, { status: response.status });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API] Error in /session:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { agentId, extraContext } = await req.json();

    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: agentId,
          extra_context: extraContext,
        }),
      }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
