import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getMarketPosition(name: string, description: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or gpt-4 if you have access
      messages: [
        {
          role: "system",
          content: `You are a Gartner Analyst. Analyze the startup based on its description. 
          Return a JSON object with two numbers between 0 and 100:
          "x" (Execution Ability) and "y" (Innovation/Vision).
          Also determine if it is a "Leader", "Visionary", "Challenger", or "Niche Player".
          ONLY return the JSON.`
        },
        {
          role: "user",
          content: `Startup: ${name}. Description: ${description}`
        }
      ],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content;
    // Simple parser to ensure we get valid JSON
    const jsonStr = text?.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    return JSON.parse(jsonStr || '{"x": 80, "y": 80}');
  } catch (error) {
    console.error("OpenAI Error:", error);
    return { x: 75, y: 75 }; // Fallback if API fails
  }
}