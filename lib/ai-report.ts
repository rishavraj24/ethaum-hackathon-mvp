import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateStartupReport(name: string, description: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Use GPT-4 for high-quality reasoning
      messages: [
        {
          role: "system",
          content: `You are a top-tier Venture Capital Analyst. 
          Analyze the following startup and provide a report in JSON format containing:
          1. "strengths" (Array of 2 short points)
          2. "weaknesses" (Array of 2 short points)
          3. "roadmap" (One actionable tip to reach Series B)
          4. "investor_sentiment" (A score out of 100)
          
          Return ONLY valid JSON.`
        },
        {
          role: "user",
          content: `Startup: ${name}. Description: ${description}`
        }
      ],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content;
    const jsonStr = text?.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    return JSON.parse(jsonStr || '{}');
  } catch (error) {
    console.error("AI Report Error:", error);
    return null;
  }
}