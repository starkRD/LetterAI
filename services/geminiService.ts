import { LetterData, GeneratedLetter } from "../types";

export const generateLetter = async (data: LetterData): Promise<GeneratedLetter> => {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data })
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json?.error || "Failed to generate your letter.");
  return json as GeneratedLetter;
};
