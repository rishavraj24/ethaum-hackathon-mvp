import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function findMatches(startupName: string, description: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an M&A (Mergers and Acquisitions) Matchmaker.
          Given a startup, suggest 3 real-world companies that would be ideal buyers or partners.
          
          Return JSON format:
          {
            "matches": [
              {
                "company": "Company Name",
                "match_score": number (0-100),
                "reason": "Short reason why (max 10 words)"
              }
            ]
          }`
        },
        {
          role: "user",
          content: `Startup: ${startupName}. Description: ${description}`
        }
      ],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content;
    const jsonStr = text?.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    return JSON.parse(jsonStr || '{"matches": []}');
  } catch (error) {
    return { matches: [] };
  }
}