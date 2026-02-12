
import { GoogleGenAI } from "@google/genai";
import { LetterData, GeneratedLetter } from "../types";

export const generateLetter = async (data: LetterData): Promise<GeneratedLetter> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Task: Write a short, deeply personal letter.
    Length: Strictly between 70 to 100 words.
    Style: 5th-grade vocabulary. Simple, direct, and human. 
    Language: Use the SAME language the user used in the "Memory/Details" section (e.g., if they wrote in Hindi, write the letter in Hindi).
    
    Story Details to Focus On:
    - From ${data.senderName} to ${data.recipientName}
    - Occasion: ${data.category}
    - Key Memory: ${data.memory}
    
    Instructions:
    - DO NOT use AI-sounding words like "delve", "tapestry", "embark", or "testament".
    - Speak like a real person sharing a real feeling. 
    - Keep sentences short. 
    - Make the main story the hero of the letter.
    - If a photo is provided, refer to it naturally (e.g., "Looking at this photo reminds me...").

    Return as JSON: {"title": "...", "content": "..."}
  `;

  const contents: any[] = [{ text: prompt }];
  
  if (data.photo) {
    const base64Data = data.photo.split(',')[1];
    contents.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Data
      }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: contents },
      config: {
        responseMimeType: "application/json",
      },
    });

    const resultText = response.text || '';
    return JSON.parse(resultText) as GeneratedLetter;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate your letter. Please try again.");
  }
};
