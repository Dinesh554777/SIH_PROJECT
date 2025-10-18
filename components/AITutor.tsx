import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';

const AITutor: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'ai', text: "Hello! I'm your AI Tutor. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);
    const recognitionRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

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

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        const userMessage: ChatMessage = { sender: 'user', text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);
        const aiResponse = await getChatbotResponse(newMessages);
        setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
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
                                <p>{msg.text}</p>
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
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask me anything..." className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 border-white/20 placeholder:text-text-secondary text-text-primary"/>
                {isSpeechSupported && (<button onClick={handleMicClick} className={`p-3 rounded-full transition-all ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-white/10 text-accent hover:bg-white/20'}`}><Mic size={24} /></button>)}
                <button onClick={handleSend} disabled={isLoading || isListening} className="bg-primary text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-slate-600 transition-all"><Send size={24} /></button>
            </div>
        </div>
    );
};

export default AITutor;