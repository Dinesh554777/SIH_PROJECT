import type { ChatMessage, Resource } from '../types';

// In-memory store to simulate a vector database like Pinecone.
let indexedDocuments: Map<number, { title: string, content: string }> = new Map();

// Mock delay to simulate network latency
const mockApiCall = <T>(data: T, delay = 500): Promise<T> =>
    new Promise(resolve => setTimeout(() => resolve(data), delay));

/**
 * Simulates indexing a document in a vector database.
 * In a real app, this would involve sending the document to a backend.
 * @param resource - The resource to be indexed.
 */
export const indexDocument = async (resource: Resource): Promise<void> => {
    console.log(`Indexing document: ${resource.title}`);
    indexedDocuments.set(resource.id, { title: resource.title, content: resource.fullText });
    return mockApiCall(undefined, 1000);
};

// A small list of common English stop words to improve search relevance.
const STOP_WORDS = new Set(['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now']);

/**
 * Cleans and tokenizes text by converting to lowercase, removing punctuation, 
 * splitting into words, and filtering out stop words.
 * @param text The input string.
 * @returns A set of meaningful words (tokens).
 */
const tokenize = (text: string): Set<string> => {
    if (!text) return new Set();
    const cleanedText = text.toLowerCase().replace(/[.,?!()]/g, '');
    const words = cleanedText.split(/\s+/);
    return new Set(words.filter(word => word.length > 1 && !STOP_WORDS.has(word)));
};


/**
 * Simulates a vector search using a more sophisticated relevance scoring.
 * This mock version calculates a similarity score based on overlapping keywords 
 * (after removing common stop words) to find the most relevant document.
 * @param query - The user's question.
 * @returns The most relevant document chunk or null.
 */
const vectorSearch = async (query: string): Promise<{ title: string; content: string } | null> => {
    const queryTokens = tokenize(query);
    if (queryTokens.size === 0) return mockApiCall(null, 300);

    let bestMatch: { title: string; content: string } | null = null;
    let maxScore = 0;

    for (const [_, doc] of indexedDocuments) {
        const docTokens = tokenize(doc.content);
        
        // Calculate similarity score as the number of overlapping unique keywords
        let currentScore = 0;
        for (const token of queryTokens) {
            if (docTokens.has(token)) {
                currentScore++;
            }
        }

        if (currentScore > maxScore) {
            maxScore = currentScore;
            bestMatch = doc;
        }
    }

    // Only return a match if there's a meaningful overlap (at least one significant keyword match)
    if (maxScore > 0) {
        console.log(`Found relevant context in: ${bestMatch!.title} with a score of ${maxScore}`);
        return mockApiCall(bestMatch, 300);
    }
    
    console.log("No relevant context found in indexed documents.");
    return mockApiCall(null, 300);
};

/**
 * Mocks a chatbot response using a Retrieval-Augmented Generation (RAG) approach.
 * It first searches for context in the simulated vector DB and then generates a response.
 * @param history - Array of chat messages.
 * @returns An AI response object, possibly with a source document.
 */
export const getChatbotResponse = async (history: ChatMessage[]): Promise<{ response: string; source?: string; }> => {
    const userMessage = history[history.length - 1]?.text;
    if (!userMessage) {
        return { response: "I'm sorry, I didn't get that. Could you repeat?" };
    }

    const normalizedMessage = userMessage.trim().toLowerCase().replace(/[.,?!]/g, '');

    // Handle common conversational phrases
    const conversationalTriggers: { [key: string]: string } = {
        'hello': "Hello! How can I assist you today? You can ask me questions about the documents you've indexed.",
        'hi': "Hi there! How can I help you learn today?",
        'hey': "Hey! What's on your mind?",
        'how are you': "I'm an AI, so I'm always ready to learn! How can I help you?",
        'thank you': "You're welcome! Is there anything else I can assist with?",
        'thanks': "You're welcome! Do you have any other questions?",
        'bye': "Goodbye! Happy learning!",
    };

    if (conversationalTriggers[normalizedMessage]) {
        return mockApiCall({ response: conversationalTriggers[normalizedMessage] });
    }

    // A broader check for greetings like "hello there"
    for (const trigger in conversationalTriggers) {
        if (normalizedMessage.startsWith(trigger)) {
            return mockApiCall({ response: conversationalTriggers[trigger] });
        }
    }

    const context = await vectorSearch(userMessage);

    let response;
    if (context) {
        // RAG pattern: provide context to the "AI" to generate an answer.
        response = `Based on **"${context.title}"**, I found the following information:\n\n*   **Topic:** ${context.content.split(' ').slice(0, 5).join(' ')}...\n*   **Key Idea:** ${context.content.split('.').slice(0,1)[0]}.\n\nLet me know if you want me to elaborate on any of these points!`;
    } else {
        // Improved fallback for non-greeting queries if no context is found.
        response = `I couldn't find specific information in your indexed documents about \`"${userMessage}"\`. \n\nCould you try one of these options?\n1. Rephrase your question.\n2. Upload a relevant document using the paperclip icon.`;
    }
    
    return mockApiCall({ response, source: context?.title }, 1000);
};


/**
 * Mocks a summary generation without calling any API.
 * @param text - The text to summarize.
 * @returns An HTML string with a mock summary.
 */
export const getSummary = async (text: string): Promise<string> => {
    if (!text.trim()) {
        return "<p>Please enter some text to summarize.</p>";
    }
    const mockSummary = `
### Mock Summary
* This is the first key point from the provided text.
* This is another important concept that was extracted.
* Finally, this is a concluding summary point.

This summary was generated locally for demonstration purposes.
    `;
    return mockApiCall(mockSummary, 1500);
};

/**
 * Mocks note generation from audio without calling any API.
 * @param audioBase64 - The base64 encoded audio data (unused in mock).
 * @param mimeType - The MIME type of the audio file (unused in mock).
 * @returns An HTML string with mock generated notes.
 */
export const getNotesFromAudio = async (audioBase64: string, mimeType: string): Promise<string> => {
    const mockNotes = `
### Mock Lecture Notes
**Introduction to Topic**
* This is a transcribed point from the mock audio lecture.
* Another key concept discussed was about the core principles of the subject.

**Key Definition:**
This section would contain an important definition transcribed from the audio. Example code:
\`\`\`
function example() {
  console.log("Hello, World!");
}
\`\`\`
    `;
    return mockApiCall(mockNotes, 2500);
};

/**
 * Mocks text translation without calling any API.
 * @param text - The text to translate.
 * @param targetLang - The target language.
 * @returns The mock translated text.
 */
export const translateText = async (text: string, targetLang: string): Promise<string> => {
     if (!text.trim()) {
        return "Please enter text to translate.";
    }
    const mockTranslation = `(Mock translation to ${targetLang}) ${text}`;
    return mockApiCall(mockTranslation, 800);
};