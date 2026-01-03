import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { startupName, description, question } = await request.json();

    // 1. Check for API Key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ answer: "Error: OpenAI API Key is missing." }, { status: 500 });
    }

    // 2. Call GPT-4
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are the 'EthAum Oracle', a wise strategic advisor for a startup named ${startupName}.
          
          Startup Context: ${description}
          
          Goal: Answer the founder's questions about strategy, valuation, or growth.
          Tone: Professional, Insightful, Direct. Keep answers under 60 words.`
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.7,
    });

    const answer = response.choices[0].message.content;
    return NextResponse.json({ answer });

  } catch (error) {
    console.error("Oracle Error:", error);
    return NextResponse.json({ answer: "My connection to the ether is blocked. (Check server logs)" }, { status: 500 });
  }
}