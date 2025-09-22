import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("[TEST] Testing OpenAI API key...");
    
    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "No API key found" }, { status: 500 });
    }
    
    console.log("[TEST] API key found, testing with models endpoint...");
    
    // Test with a simple API call first
    const response = await fetch("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
    
    console.log("[TEST] Models API response status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("[TEST] Models API error:", errorData);
      return NextResponse.json({
        error: "API key test failed",
        details: errorData,
        status: response.status
      }, { status: 500 });
    }
    
    const models = await response.json();
    const hasGPT4 = models.data?.some((model: any) => model.id.includes('gpt-4'));
    const hasRealtime = models.data?.some((model: any) => model.id.includes('realtime'));
    
    console.log("[TEST] API key is valid");
    console.log("[TEST] Has GPT-4 models:", hasGPT4);
    console.log("[TEST] Has Realtime models:", hasRealtime);
    
    return NextResponse.json({
      success: true,
      apiKeyValid: true,
      hasGPT4,
      hasRealtime,
      message: "API key is working!"
    });
    
  } catch (error) {
    console.error("[TEST] Error:", error);
    return NextResponse.json({
      error: "Test failed",
      details: error.message
    }, { status: 500 });
  }
}


