import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Missing GEMINI_API_KEY" });

  const { data } = req.body || {};
  if (!data) return res.status(400).json({ error: "Missing data" });

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
Task: Write a short, deeply personal letter.
Length: Strictly between 70 to 100 words.
Style: 5th-grade vocabulary. Simple, direct, and human.
Language: Use the SAME language the user used in the "Memory/Details" section.

Story Details:
- From ${data.senderName} to ${data.recipientName}
- Occasion: ${data.category}
- Key Memory: ${data.memory}

Instructions:
- DO NOT use AI-sounding words like "delve", "tapestry", "embark", or "testament".
- Keep sentences short.
- If a photo is provided, refer to it naturally.
Return as JSON: {"title":"...","content":"..."}
`;

  const parts: any[] = [{ text: prompt }];

  if (data.photo) {
    const base64Data = String(data.photo).split(",")[1];
    parts.push({
      inlineData: { mimeType: "image/jpeg", data: base64Data }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts },
      config: { responseMimeType: "application/json" }
    });

    const resultText = response.text || "";
    return res.status(200).json(JSON.parse(resultText));
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
