import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Mic, FileText, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChatMessage, Resource } from '../types';
import { getChatbotResponse, indexDocument } from '../services/geminiService';

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const processLine = (line: string) => {
    return line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-slate-800 text-accent px-1.5 py-0.5 rounded-md font-mono">$1</code>');
  };

  const html = content.split('\n\n').map(paragraph => {
    // Code blocks
    if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
      const code = paragraph.substring(3, paragraph.length - 3).trim();
      return `<pre class="bg-navy rounded-md p-4 my-2 text-sm whitespace-pre-wrap"><code class="font-mono">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
    }
    
    const lines = paragraph.split('\n');
    
    // Check for lists
    const isUl = lines.every(line => /^\s*[-*]\s/.test(line));
    const isOl = lines.every(line => /^\s*\d+\.\s/.test(line));

    if (isUl) {
      return `<ul class="list-disc list-inside space-y-1 my-2">${lines.map(line => `<li>${processLine(line.replace(/^\s*[-*]\s/, ''))}</li>`).join('')}</ul>`;
    }
    if (isOl) {
      return `<ol class="list-decimal list-inside space-y-1 my-2">${lines.map(line => `<li>${processLine(line.replace(/^\s*\d+\.\s/, ''))}</li>`).join('')}ol>`;
    }
    
    // It's a paragraph
    return `<p class="my-2">${lines.map(processLine).join('<br/>')}</p>`;
  }).join('');

  return (
    <div 
      className="prose prose-invert prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-pre:my-2" 
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};


const AITutor: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'ai', text: "Hello! I'm your AI Tutor. Index some documents from the Resources page, or upload a text file directly here and ask me questions about it." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);
    const recognitionRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsSpeechSupported(true);
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.onresult = (event: any) => setInput(prev => `${prev} ${event.results[event.results.length - 1][0].transcript.trim()}`);
            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => setIsListening(false);
            recognitionRef.current = recognition;
        }
    }, []);

    const handleMicClick = () => {
        if (!recognitionRef.current) return;
        if (isListening) {
            recognitionRef.current.stop();
        } else { 
            recognitionRef.current.start(); 
            setIsListening(true); 
        }
    };
    
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        e.target.value = ''; // Reset input to allow re-uploading the same file

        setIsLoading(true);
        setMessages(prev => [...prev, { sender: 'ai', text: `Indexing "${file.name}"...` }]);

        try {
            const fileContent = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsText(file);
            });

            const newResource: Resource = {
                id: Date.now(),
                title: file.name,
                description: `User-uploaded document on ${new Date().toLocaleDateString()}`,
                category: 'CSE', // Default category
                fileType: 'Notes',
                icon: FileText,
                isIndexed: false,
                fullText: fileContent,
            };

            await indexDocument(newResource);
            
            setMessages(prev => {
                const updatedMessages = [...prev];
                const lastMessage = updatedMessages[updatedMessages.length - 1];
                if (lastMessage.sender === 'ai' && lastMessage.text.startsWith('Indexing')) {
                    lastMessage.text = `Successfully indexed "${file.name}". You can now ask me questions about it.`;
                }
                return updatedMessages;
            });

        } catch (error) {
            console.error("Error indexing document:", error);
            setMessages(prev => {
                const updatedMessages = [...prev];
                const lastMessage = updatedMessages[updatedMessages.length - 1];
                if (lastMessage.sender === 'ai' && lastMessage.text.startsWith('Indexing')) {
                    lastMessage.text = `Sorry, I couldn't index "${file.name}". Please try again with a valid text file.`;
                }
                return updatedMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        const userMessage: ChatMessage = { sender: 'user', text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);
        const { response, source } = await getChatbotResponse(newMessages);
        setMessages(prev => [...prev, { sender: 'ai', text: response, source }]);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-full bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10">
            <div className="p-4 border-b border-white/10">
                <h3 className="text-xl font-bold font-heading text-text-primary flex items-center gap-2"><Bot size={24} className="text-accent"/> AI Tutor</h3>
            </div>
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className={`flex items-start gap-3 my-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                        >
                            {msg.sender === 'ai' && <div className="bg-primary text-white rounded-full p-2 shrink-0"><Bot size={20} /></div>}
                            <div className={`max-w-xl p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary/80 text-white rounded-br-none' : 'bg-slate-700/50 text-text-primary rounded-bl-none'}`}>
                                {msg.sender === 'ai' ? <MarkdownRenderer content={msg.text} /> : <p>{msg.text}</p>}
                                {msg.source && (
                                    <div className="mt-3 pt-2 border-t border-white/10 text-xs text-accent flex items-center gap-1.5">
                                        <FileText size={14} />
                                        <span>Source: {msg.source}</span>
                                    </div>
                                )}
                            </div>
                            {msg.sender === 'user' && <div className="bg-slate-600 text-text-primary rounded-full p-2 shrink-0"><User size={20} /></div>}
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isLoading && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-start gap-3 my-4"
                    >
                        <div className="bg-primary text-white rounded-full p-2 animate-pulse"><Bot size={20} /></div>
                        <div className="p-3 rounded-2xl bg-slate-700/50">
                            <div className="flex items-center gap-1">
                                <span className="h-2 w-2 bg-slate-500 rounded-full animate-pulse delay-75"></span>
                                <span className="h-2 w-2 bg-slate-500 rounded-full animate-pulse delay-150"></span>
                                <span className="h-2 w-2 bg-slate-500 rounded-full animate-pulse delay-300"></span>
                            </div>
                        </div>
                    </motion.div>
                )}
                 <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-white/10 flex items-center gap-2 sm:gap-4">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".txt,.md,.json,.csv"
                />
                <button onClick={handleUploadClick} disabled={isLoading} className="p-3 rounded-full bg-white/10 text-accent hover:bg-white/20 disabled:opacity-50 transition-all" aria-label="Upload document">
                    <Paperclip size={24} />
                </button>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about your indexed documents..." className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 border-white/20 placeholder:text-text-secondary text-text-primary"/>
                {isSpeechSupported && (<button onClick={handleMicClick} className={`p-3 rounded-full transition-all ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-white/10 text-accent hover:bg-white/20'}`}><Mic size={24} /></button>)}
                <button onClick={handleSend} disabled={isLoading || isListening} className="bg-primary text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-slate-600 transition-all"><Send size={24} /></button>
            </div>
        </div>
    );
};

export default AITutor;