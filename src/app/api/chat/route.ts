import { NextRequest, NextResponse } from "next/server";
import { industries, getAllInsights } from "@/lib/data/industries";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const allInsights = getAllInsights();

  const systemPrompt = `You are Faultline AI, an industry analysis assistant. You help entrepreneurs find business opportunities by analyzing real government data.

You have access to the following verified industry data from BLS (Bureau of Labor Statistics) and FRED (Federal Reserve Economic Data), covering 2020-2025:

${industries
  .map(
    (ind) => `
## ${ind.name} (NAICS ${ind.naicsCode})
- Market Size: ${ind.marketSize}
- Employment: ${(ind.employmentK / 1000).toFixed(1)}M workers
- Growth: ${ind.employmentChange}
${ind.insights.map((ins) => `- FAULT LINE: ${ins.statement} [${ins.value}] (${ins.source}) — Trend: ${ins.trend}. ${ins.trendDetail}. Opportunity: ${ins.opportunitySignal}`).join("\n")}`
  )
  .join("\n")}

CROSS-INDUSTRY PATTERNS:
- Total nonfarm employment growth decelerated from +5.1% (2021) to +0.07% (2025)
- Real wages grew only 0.6%/year (nominal +30.2%, CPI +25.6%) over 2020-2025
- Monthly quits fell 29% from Great Resignation peak — "Big Stay" phenomenon
- GDP grew 44.7% while employment grew 4.2% — productivity gains not shared with workers
- Healthcare is the only sector with consistent strong growth (+3-5% annually)
- Manufacturing, retail, and trucking are all in decline despite GDP growth

RULES:
1. ALWAYS cite specific numbers and their sources
2. ALWAYS mention the trend direction (improving/worsening/stable)
3. When suggesting business ideas, ground them in the specific data points
4. Be direct and concise — this is for founders, not academics
5. If asked about data you don't have, say so honestly`;

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { content: "DeepSeek API key not configured. Add DEEPSEEK_API_KEY to .env.local." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("DeepSeek API error:", error);
      return NextResponse.json(
        { content: "Failed to get AI response. Check your API key." },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ content: data.choices[0].message.content });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ content: "An error occurred." }, { status: 500 });
  }
}
