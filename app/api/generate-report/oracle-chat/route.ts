import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { startupName, description, question } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ answer: "Error: OpenAI API Key is missing on the server." }, { status: 500 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are the "EthAum Oracle", a wise VC advisor for the startup "${startupName}".
          
          Startup Context: ${description}
          
          Your Goal: Answer the founder's strategic question.
          Tone: Professional, Insightful, Direct. 
          Keep it under 50 words.`
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
    console.error("Oracle API Error:", error);
    return NextResponse.json({ answer: "The Oracle is currently meditating (Server Error)." }, { status: 500 });
  }
}