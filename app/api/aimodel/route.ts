import { NextRequest, NextResponse} from "next/server";
import OpenAI from 'openai';
export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPEN_ROUTER_APIKEY,
});
const systemPrompt = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.  
Only ask questions about the following details in order, and wait for the user's answer before asking the next:  
1. Starting location (source)  
2. Destination city or country  
3. Group size (Solo, Couple, Family, Friends)  
4. Budget (Low, Medium, High)  
5. Trip duration (number of days)  
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)  
7. Special requirements or preferences (if any)  

Do not ask multiple questions at once, and never ask irrelevant questions.  
If any answer is missing or unclear, politely ask the user to clarify before proceeding.  
Always maintain a conversational, interactive style while asking questions.  

Along with response also send which ui component to display for generative UI for example 'budget/groupSize/tripDuration/Final' , where Final means AI generating complete final output  
Once all required information is collected, generate and return a strict JSON response only (no explanations or extra text) with following JSON schema:  
{  
resp:'Text Resp',  
ui:'budget/groupSize/tripDuration/final'  
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