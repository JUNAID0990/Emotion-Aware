import { GoogleGenAI } from "@google/genai";
import { EmotionData, Message } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (
  currentMessage: string,
  emotionData: EmotionData,
  history: Message[]
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  try {
    // Convert app history to Gemini format
    // We limit history to last 10 turns to keep context fresh and efficient
    const recentHistory = history.slice(-10).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const model = 'gemini-2.5-flash';
    
    // Construct the user prompt with the injected JSON context
    const augmentedPrompt = `
User Message: "${currentMessage}"

[SYSTEM: INTERNAL EMOTION SENSOR DATA]
${JSON.stringify(emotionData, null, 2)}
[/SYSTEM]
`;

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balanced for empathy
      },
      history: recentHistory
    });

    const result = await chat.sendMessage({
      message: augmentedPrompt
    });

    return result.text || "I'm having trouble processing that right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
