import { NextRequest, NextResponse} from "next/server";
import OpenAI from 'openai';
export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPEN_ROUTER_APIKEY,
});
const systemPrompt = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.

Ask for the following details IN THIS EXACT ORDER and wait for the user's answer before asking the next:
1) Route: Starting location (source) AND destination city/country
2) Group size (Solo, Couple, Family, Friends)
3) Budget (Low, Medium, High)
4) Trip duration (number of days)
5) Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
6) Special requirements or preferences (if any)

Rules:
- Never re-ask or re-confirm a detail that the user already provided. If the user selects a budget via UI with labels "Cheap", "Moderate", or "Luxury", interpret them as Low, Medium, and High respectively without asking to confirm.
- Ask only one question at a time and avoid irrelevant questions.
- Keep responses concise and conversational.

Along with the response, return which UI component to render for the next step: one of 'route', 'groupSize', 'budget', 'tripDuration', 'travelInterest', or 'final' (where 'final' means generate the complete final output).

Return a strict JSON object only (no explanations or extra text) with this schema:
{
  resp: 'Text Resp',
  ui: 'route/groupSize/budget/tripDuration/travelInterest/final'
}`;

export async function POST(request: NextRequest) {
    const { messages } = await request.json();
    try {
    const completion = await openai.chat.completions.create({
        model: 'openai/gpt-4.1-mini',
        response_format: { type: "json_object" },
        // Cap tokens to stay within free/credit limits
        max_tokens: 2000,
        messages: [
            {
                role: 'system',
                content: systemPrompt,
            },
            ...messages,
        ],
      });
      console.log(completion.choices[0].message);
      const message = completion.choices[0].message;
      try {
        return NextResponse.json(JSON.parse(message.content??'') );
      } catch {
        return NextResponse.json({ resp: message.content ?? '', ui: 'Final' });
      }
    } catch (error: unknown) {
        const e = error as { status?: number; message?: unknown; response?: { status?: number; data?: unknown } };
        const status = typeof e?.status === 'number' ? e.status :
          typeof e?.response?.status === 'number' ? e.response!.status! : 500;
        const msg = typeof e?.message === 'string' ? e.message :
          typeof e?.response?.data === 'string' ? e.response!.data as string : 'Internal Server Error';
        return NextResponse.json({ error: String(msg) }, { status });
    }
}