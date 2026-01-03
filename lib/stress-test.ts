import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runStressTest(startupName: string, description: string, scenario: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a "Startup Crisis Simulator."
          Given a startup and a disaster scenario, predict if they survive.
          
          Return JSON:
          {
            "survival_score": number (0-100),
            "outcome": "string (Short, dramatic narrative of what happens. Max 20 words.)",
            "reason": "string (One sentence explanation)"
          }`
        },
        {
          role: "user",
          content: `Startup: ${startupName}. Description: ${description}. Scenario: ${scenario}`
        }
      ],
      temperature: 0.8, // High temperature for creative outcomes
    });

    const text = response.choices[0].message.content;
    const jsonStr = text?.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    return JSON.parse(jsonStr || '{}');
  } catch (error) {
    return { survival_score: 50, outcome: "Simulation Failed", reason: "AI Overload" };
  }
}