import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Policy text is required." });
    }

    const systemInstruction = `You are an elite International Data Privacy Lawyer and an AI Ethics Auditor. Your primary objective is to protect citizens from predatory tech practices by translating highly complex, legalistic Privacy Policies and Terms of Service into transparent, actionable, and extremely concise insights.

CRITICAL INSTRUCTIONS:
1. Be objective, accurate, and cut through legal jargon.
2. If the text does not explicitly mention a point, state "غير مذكور صراحة" (Not explicitly mentioned) instead of guessing.
3. You MUST format your entire response strictly as a valid JSON object according to the schema. Do not include any markdown formatting, preamble, or conversational text outside the JSON structure.

Output the JSON using the defined schema, translating all string values and brief details into Arabic so they can be displayed directly on the user interface.`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        privacy_score: {
          type: Type.INTEGER,
          description: "Score from 0 to 100 where 100 means excellent privacy and 0 means predatory practices.",
        },
        collected_data: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Array of strings (maximum 4 items) listing the most sensitive or critical data points collected.",
        },
        key_red_flags: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Array of strings (maximum 3 items) listing major privacy concerns or predatory clauses.",
        },
        is_data_sold: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, description: "'نعم', 'لا', or 'غير واضح'" },
            brief_detail: { type: Type.STRING, description: "Maximum 10 words explaining who it is shared with or sold to." },
          },
        },
        third_party_sharing: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, description: "'نعم', 'لا', or 'غير واضح'" },
            brief_detail: { type: Type.STRING, description: "Maximum 10 words explaining third-party sharing (excluding selling)." },
          },
        },
        used_for_ai_training: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, description: "'نعم', 'لا', or 'غير واضح'" },
            brief_detail: { type: Type.STRING, description: "Maximum 10 words explaining if user data trains their AI models." },
          },
        },
        location_tracking: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, description: "'نعم', 'لا', or 'غير واضح'" },
            brief_detail: { type: Type.STRING, description: "Maximum 10 words explaining location tracking policies." },
          },
        },
        cookies_and_tracking: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, description: "'نعم', 'لا', or 'غير واضح'" },
            brief_detail: { type: Type.STRING, description: "Maximum 10 words explaining cookies and tracking." },
          },
        },
        data_deletion_right: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, description: "'نعم', 'لا', or 'غير واضح'" },
            brief_detail: { type: Type.STRING, description: "Maximum 10 words explaining data deletion rights." },
          },
        },
        data_security: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, description: "'نعم', 'لا', or 'غير واضح'" },
            brief_detail: { type: Type.STRING, description: "Maximum 10 words explaining data security measures." },
          },
        },
        breach_notifications: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, description: "'نعم', 'لا', or 'غير واضح'" },
            brief_detail: { type: Type.STRING, description: "Maximum 10 words explaining breach notifications." },
          },
        },
        minor_protection: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, description: "'نعم', 'لا', or 'غير واضح'" },
            brief_detail: { type: Type.STRING, description: "Maximum 10 words explaining protection for minors/children." },
          },
        },
        policy_updates: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, description: "'نعم', 'لا', or 'غير واضح'" },
            brief_detail: { type: Type.STRING, description: "Maximum 10 words explaining how users are notified of policy updates." },
          },
        },
        data_retention: {
          type: Type.STRING,
          description: "How long is user data kept? (e.g. 'سنة واحدة', 'إلى الأبد', 'غير مذكور صراحة')",
        },
        age_restriction: {
          type: Type.STRING,
          description: "Minimum age required to use the service.",
        },
        user_rights: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Array of strings listing explicit user rights.",
        },
        ethical_risk_level: {
          type: Type.STRING,
          description: "Rate as 'منخفض', 'متوسط', or 'مرتفع' based on international digital governance standards.",
        },
      },
      required: [
        "privacy_score", 
        "collected_data", 
        "key_red_flags", 
        "is_data_sold", 
        "third_party_sharing", 
        "used_for_ai_training", 
        "location_tracking", 
        "cookies_and_tracking",
        "data_deletion_right",
        "data_security",
        "breach_notifications",
        "minor_protection",
        "policy_updates",
        "data_retention", 
        "age_restriction", 
        "user_rights", 
        "ethical_risk_level"
      ],
    };

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: text,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });
    } catch (err: any) {
      console.log("gemini-2.5-flash failed, falling back to gemini-1.5-flash", err.message);
      response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: text,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });
    }

    const responseText = response.text;
    if (!responseText) {
       return res.status(500).json({ error: "Failed to generate analysis." });
    }

    res.json(JSON.parse(responseText));
  } catch (error: any) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred." });
  }
}
