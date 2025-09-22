import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("[FALLBACK] Chat fallback API called");
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "No API key" }, { status: 500 });
    }
    
    const { message } = await req.json();
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a helpful female assistant for AIIMS OPD registration in Hindi. Be compassionate and patient. Help users with their registration in a step-by-step manner. Use simple language and ask one question at a time.

Current step: Language selection
Ask the user: "AIIMS OPD पंजीकरण में आपका स्वागत है। कृपया अपनी पसंदीदा भाषा बताएं - हिंदी या अंग्रेजी?"

Respond in a caring, maternal tone.`
          },
          {
            role: "user",
            content: message || "नमस्ते"
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("[FALLBACK] OpenAI error:", error);
      return NextResponse.json({ error: "OpenAI API error", details: error }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;
    
    console.log("[FALLBACK] Chat response:", reply);
    
    return NextResponse.json({ 
      success: true, 
      message: reply,
      type: "text"
    });
    
  } catch (error) {
    console.error("[FALLBACK] Error:", error);
    return NextResponse.json({ 
      error: "Fallback API error", 
      details: error.message 
    }, { status: 500 });
  }
}


