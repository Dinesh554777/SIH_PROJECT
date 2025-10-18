import { GoogleGenAI } from "@google/genai";
import type { ChatMessage } from '../types';

let aiInstance: GoogleGenAI | null = null;

const G_API_ERROR_MESSAGE = "Sorry, the AI service is currently unavailable. Please try again later.";

/**
 * Lazily initializes and returns the GoogleGenAI instance.
 * Prevents the app from crashing if the API key is not set.
 */
const getAI = (): GoogleGenAI | null => {
    if (aiInstance) {
        return aiInstance;
    }
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API_KEY environment variable not set. AI functions will return an error message.");
        return null;
    }
    aiInstance = new GoogleGenAI({ apiKey });
    return aiInstance;
};

/**
 * Sends the entire chat history to the Gemini API for a conversational response.
 * @param history - Array of chat messages.
 * @returns The AI's response text.
 */
export const getChatbotResponse = async (history: ChatMessage[]): Promise<string> => {
    const ai = getAI();
    if (!ai) return G_API_ERROR_MESSAGE;
    
    try {
        const model = 'gemini-2.5-flash';
        
        // The history from the component includes an initial AI greeting.
        // The API requires the conversation to start with a user message, so we slice off the initial greeting.
        const apiHistory = history.slice(1);

        if (apiHistory.length === 0) {
            return "Please ask a question to start the conversation.";
        }

        const contents = apiHistory.map(msg => ({
            role: msg.sender === 'ai' ? 'model' : 'user',
            parts: [{ text: msg.text }],
        }));

        const response = await ai.models.generateContent({
            model,
            contents: contents,
            config: {
                systemInstruction: "You are a friendly and helpful AI Tutor for college students, part of the EduVators platform. Keep your responses helpful and clear.",
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Gemini API call failed (getChatbotResponse):", error);
        return G_API_ERROR_MESSAGE;
    }
};


/**
 * Sends text to the Gemini API to be summarized.
 * @param text - The text to summarize.
 * @returns An HTML string with the summary.
 */
export const getSummary = async (text: string): Promise<string> => {
    const ai = getAI();
    if (!ai) return G_API_ERROR_MESSAGE;

    try {
        const model = 'gemini-2.5-flash';
        const prompt = `Summarize the following text into key points. Format the output as clean HTML using <h3>, <ul>, and <li> tags. Do not include markdown like \`\`\`html. Text: "${text}"`;
        
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Gemini API call failed (getSummary):", error);
        return G_API_ERROR_MESSAGE;
    }
};

/**
 * Sends audio data to the Gemini API to be converted into notes.
 * @param audioBase64 - The base64 encoded audio data.
 * @param mimeType - The MIME type of the audio file.
 * @returns An HTML string with the generated notes.
 */
export const getNotesFromAudio = async (audioBase64: string, mimeType: string): Promise<string> => {
    const ai = getAI();
    if (!ai) return G_API_ERROR_MESSAGE;

    try {
        // Use a more powerful model for complex multimodal tasks
        const model = 'gemini-2.5-pro'; 
        
        const audioPart = {
            inlineData: {
                data: audioBase64,
                mimeType,
            },
        };
        const textPart = {
            text: `Transcribe this lecture audio and generate structured, easy-to-read notes. The output should be clean HTML. Use tags like <h2> for the main topic, <h3> for key concepts, <ul> and <li> for bullet points, and <strong> for important definitions. Do not include markdown like \`\`\`html.`,
        };

        const response = await ai.models.generateContent({
            model,
            contents: { parts: [audioPart, textPart] },
        });

        return response.text;
    } catch (error) {
        console.error("Gemini API call failed (getNotesFromAudio):", error);
        return G_API_ERROR_MESSAGE;
    }
};

/**
 * Sends text to the Gemini API for translation.
 * @param text - The text to translate.
 * @param targetLang - The target language.
 * @returns The translated text.
 */
export const translateText = async (text: string, targetLang: string): Promise<string> => {
    const ai = getAI();
    if (!ai) return G_API_ERROR_MESSAGE;

    try {
        const model = 'gemini-2.5-flash';
        const prompt = `Translate the following English text to ${targetLang}: "${text}"`;
        
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        
        return response.text;
    } catch (error) {
        console.error("Gemini API call failed (translateText):", error);
        return G_API_ERROR_MESSAGE;
    }
};