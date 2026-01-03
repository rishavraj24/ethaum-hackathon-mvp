import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askOracle(startupName: string, description: string, question: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are the "EthAum Oracle", a wise VC advisor for the startup "${startupName}".
          
          Context on Startup:
          ${description}
          
          Your Goal:
          Answer the founder's strategic questions. Be concise, actionable, and encouraging.
          If they ask about valuation, Series A, or growth, give specific advice based on their description.
          Keep answers under 50 words.`
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Oracle Error:", error);
    return "The Oracle is meditating. Please try again.";
  }
}