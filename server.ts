import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  app.post("/api/analyze", async (req, res) => {
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

Your task is to analyze the provided legal text and extract the most critical data points regarding user privacy. 

CRITICAL INSTRUCTIONS:
1. Be objective, accurate, and cut through legal jargon.
2. If the text does not explicitly mention a point, state "غير مذكور صراحة" (Not explicitly mentioned) instead of guessing.
3. You MUST format your entire response strictly as a valid JSON object according to the schema. Do not include any markdown formatting, preamble, or conversational text outside the JSON structure.

Output the JSON using the defined schema, translating all string values and brief details into Arabic so they can be displayed directly on the user interface.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: text,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              privacy_score: {
                type: Type.INTEGER,
                description: "Score from 0 to 100 where 100 means excellent privacy and 0 means predatory practices.",
              },
              collected_data: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: "Array of strings (maximum 4 items) listing the most sensitive or critical data points collected (e.g., 'الموقع الجغرافي', 'سجلات التصفح').",
              },
              key_red_flags: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: "Array of strings (maximum 3 items) listing major privacy concerns or predatory clauses (e.g., 'تتبع النشاط خارج التطبيق', 'بيع البيانات لجهات خارجية').",
              },
              is_data_sold: {
                type: Type.OBJECT,
                properties: {
                  status: {
                    type: Type.STRING,
                    description: "'نعم', 'لا', or 'غير واضح'",
                  },
                  brief_detail: {
                    type: Type.STRING,
                    description: "Maximum 10 words explaining who it is shared with or sold to.",
                  },
                },
              },
              third_party_sharing: {
                type: Type.OBJECT,
                properties: {
                  status: {
                    type: Type.STRING,
                    description: "'نعم', 'لا', or 'غير واضح'",
                  },
                  brief_detail: {
                    type: Type.STRING,
                    description: "Maximum 10 words explaining third-party sharing (excluding selling).",
                  },
                },
              },
              used_for_ai_training: {
                type: Type.OBJECT,
                properties: {
                  status: {
                    type: Type.STRING,
                    description: "'نعم', 'لا', or 'غير واضح'",
                  },
                  brief_detail: {
                    type: Type.STRING,
                    description: "Maximum 10 words explaining if user data trains their AI models.",
                  },
                },
              },
              location_tracking: {
                type: Type.OBJECT,
                properties: {
                  status: {
                    type: Type.STRING,
                    description: "'نعم', 'لا', or 'غير واضح'",
                  },
                  brief_detail: {
                    type: Type.STRING,
                    description: "Maximum 10 words explaining location tracking policies.",
                  },
                },
              },
              cookies_and_tracking: {
                type: Type.OBJECT,
                properties: {
                  status: {
                    type: Type.STRING,
                    description: "'نعم', 'لا', or 'غير واضح'",
                  },
                  brief_detail: {
                    type: Type.STRING,
                    description: "Maximum 10 words explaining cookies and tracking.",
                  },
                },
              },
              data_deletion_right: {
                type: Type.OBJECT,
                properties: {
                  status: {
                    type: Type.STRING,
                    description: "'نعم', 'لا', or 'غير واضح'",
                  },
                  brief_detail: {
                    type: Type.STRING,
                    description: "Maximum 10 words explaining data deletion rights.",
                  },
                },
              },
              data_security: {
                type: Type.OBJECT,
                properties: {
                  status: {
                    type: Type.STRING,
                    description: "'نعم', 'لا', or 'غير واضح'",
                  },
                  brief_detail: {
                    type: Type.STRING,
                    description: "Maximum 10 words explaining data security measures.",
                  },
                },
              },
              breach_notifications: {
                type: Type.OBJECT,
                properties: {
                  status: {
                    type: Type.STRING,
                    description: "'نعم', 'لا', or 'غير واضح'",
                  },
                  brief_detail: {
                    type: Type.STRING,
                    description: "Maximum 10 words explaining breach notifications.",
                  },
                },
              },
              minor_protection: {
                type: Type.OBJECT,
                properties: {
                  status: {
                    type: Type.STRING,
                    description: "'نعم', 'لا', or 'غير واضح'",
                  },
                  brief_detail: {
                    type: Type.STRING,
                    description: "Maximum 10 words explaining protection for minors/children.",
                  },
                },
              },
              policy_updates: {
                type: Type.OBJECT,
                properties: {
                  status: {
                    type: Type.STRING,
                    description: "'نعم', 'لا', or 'غير واضح'",
                  },
                  brief_detail: {
                    type: Type.STRING,
                    description: "Maximum 10 words explaining how users are notified of policy updates.",
                  },
                },
              },
              data_retention: {
                type: Type.STRING,
                description: "How long is user data kept? (e.g. 'سنة واحدة', 'إلى الأبد', 'غير مذكور صراحة')",
              },
              age_restriction: {
                type: Type.STRING,
                description: "Minimum age required to use the service (e.g. '13 عاماً', '18 عاماً', 'غير مذكور').",
              },
              user_rights: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: "Array of strings listing explicit user rights (e.g. 'الحق في حذف الحساب', 'الحق في تحميل البيانات').",
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
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
         return res.status(500).json({ error: "Failed to generate analysis." });
      }

      res.json(JSON.parse(responseText));
    } catch (error: any) {
      console.error("API Error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
