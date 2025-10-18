import React, { useState, useRef, useEffect } from 'react';
import { Bot, FileText, Mic, BarChart4, User, Send, Upload, Languages, Bookmark, X, Search, Trash2, Eye, Hourglass, HelpCircle, FilePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import AITutor from '../components/AITutor';
import Modal from '../components/Modal';
import Card from '../components/Card';
import { getSummary, getNotesFromAudio, translateText } from '../services/geminiService';
import { SAVED_NOTES_DATA, TIME_SPENT_DATA, TOOL_USAGE_DATA } from '../constants';
import type { SavedNote } from '../types';

type Tool = 'tutor' | 'notes' | 'summarizer' | 'translator' | 'history' | 'analytics';

const ToolWrapper: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 h-full p-6 overflow-y-auto">
        <h3 className="text-xl font-bold font-heading text-text-primary mb-6">{title}</h3>
        {children}
    </div>
);

const fileToBase64 = (file: File): Promise<string> => 
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });

const NotesGenerator: React.FC = () => {
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFileName(file.name); setIsLoading(true); setNotes(''); setError('');
            try {
                const audioBase64 = await fileToBase64(file);
                const generatedNotes = await getNotesFromAudio(audioBase64, file.type);
                setNotes(generatedNotes);
            } catch (err) {
                console.error("Error generating notes:", err);
                setError("Failed to generate notes. Please try another file.");
            } finally {
                setIsLoading(false);
            }
        }
    };
    return (<ToolWrapper title="Lecture-to-Notes Converter"><div className="space-y-6"><div className="relative border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-accent transition-colors"><Upload className="mx-auto h-12 w-12 text-text-secondary" /><h3 className="mt-2 text-lg font-medium text-text-primary">Upload lecture audio</h3><p className="mt-1 text-sm text-text-secondary">MP3, WAV, M4A</p><input type="file" accept="audio/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" /></div>{fileName && <p className="text-center font-medium">Processing: <span className="text-accent">{fileName}</span></p>}{isLoading && <div className="text-center text-text-secondary flex items-center justify-center gap-2"><Hourglass size={16} className="animate-spin" /> Generating notes...</div>}{error && <p className="text-center text-red-400">{error}</p>}{notes && <div className="prose prose-invert max-w-none text-text-secondary p-4 bg-navy rounded-lg" dangerouslySetInnerHTML={{ __html: notes }} />}</div></ToolWrapper>);
};

const ContentSummarizer: React.FC = () => {
    const [text, setText] = useState(''); const [summary, setSummary] = useState(''); const [isLoading, setIsLoading] = useState(false);
    const handleSummarize = async () => {
        if (!text.trim()) return; setIsLoading(true); setSummary('');
        const result = await getSummary(text); setSummary(result); setIsLoading(false);
    };
    return (<ToolWrapper title="Smart Summarizer"><div className="grid md:grid-cols-2 gap-6 h-full"><div className="space-y-4 flex flex-col"><h4 className="font-semibold text-text-primary">Enter Text</h4><textarea value={text} onChange={e => setText(e.target.value)} rows={15} className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent flex-grow bg-white/5 border-white/20 text-text-primary" placeholder="Paste your text here..."/><button onClick={handleSummarize} disabled={isLoading} className="bg-primary w-full text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-slate-600">{isLoading ? 'Summarizing...' : 'Summarize'}</button></div><div className="bg-navy p-6 rounded-xl h-full overflow-y-auto"><h4 className="font-semibold text-text-primary mb-4">Summary</h4><div className="prose prose-invert max-w-none text-text-secondary">{summary ? <div dangerouslySetInnerHTML={{ __html: summary }} /> : <p className="text-text-secondary">Your summary will appear here.</p>}</div></div></div></ToolWrapper>);
};

const TranslatorTool: React.FC = () => {
    const [input, setInput] = useState(''); const [output, setOutput] = useState('');
    const [targetLang, setTargetLang] = useState('Hindi'); const [isLoading, setIsLoading] = useState(false);
    const languages = ['Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi'];
    const handleTranslate = async () => {
        if (!input.trim()) return; setIsLoading(true); setOutput('');
        const result = await translateText(input, targetLang); setOutput(result); setIsLoading(false);
    };
    return (<ToolWrapper title="Multilingual Translator"><div className="grid md:grid-cols-2 gap-6 h-full"><div className="space-y-4 flex flex-col"><h4 className="font-semibold text-text-primary">Enter Text (English)</h4><textarea value={input} onChange={e => setInput(e.target.value)} rows={15} className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent flex-grow bg-white/5 border-white/20 text-text-primary" placeholder="Type text to translate..." /></div><div className="space-y-4 flex flex-col"><div className="flex justify-between items-center"><h4 className="font-semibold text-text-primary">Translation</h4><select value={targetLang} onChange={e => setTargetLang(e.target.value)} className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 border-white/20 text-text-primary"><option value="">Select Language</option>{languages.map(l => <option key={l} value={l}>{l}</option>)}</select></div><div className="w-full p-4 border rounded-xl flex-grow bg-navy border-white/20 text-text-primary">{isLoading ? 'Translating...' : output || 'Translation will appear here.'}</div></div></div><div className="mt-6"><button onClick={handleTranslate} disabled={isLoading} className="bg-primary w-full text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-slate-600">Translate</button></div></ToolWrapper>);
};

const SavedNotesTool: React.FC = () => {
    const [notes, setNotes] = useState<SavedNote[]>(SAVED_NOTES_DATA);
    const [selectedNote, setSelectedNote] = useState<SavedNote | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const deleteNote = (id: number) => setNotes(notes.filter(n => n.id !== id));
    return (<ToolWrapper title="Saved Notes & History"><div className="space-y-6"><div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" /><input type="text" placeholder="Search notes..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 border-white/20 placeholder:text-text-secondary text-text-primary" /></div><div className="grid md:grid-cols-2 gap-6">{filteredNotes.map(note => (<Card key={note.id} className="!p-0 flex flex-col"><div className="p-4 flex-grow"><span className={`text-xs font-bold px-2 py-1 rounded-full ${note.category === 'Notes' ? 'bg-blue-500/20 text-blue-300' : note.category === 'Summary' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{note.category}</span><h4 className="font-bold text-lg text-text-primary mt-2">{note.title}</h4><p className="text-sm text-text-secondary mt-1">{note.contentSnippet}</p></div><div className="bg-white/5 px-4 py-3 rounded-b-2xl border-t border-white/10 flex justify-between items-center"><p className="text-xs text-text-secondary">{note.date}</p><div className="flex gap-2"><button onClick={() => setSelectedNote(note)} className="p-2 text-text-secondary hover:text-accent"><Eye size={16}/></button><button onClick={() => deleteNote(note.id)} className="p-2 text-text-secondary hover:text-red-400"><Trash2 size={16}/></button></div></div></Card>))}</div></div><Modal isOpen={!!selectedNote} onClose={()=>setSelectedNote(null)} title={selectedNote?.title || ''}><div className="prose prose-invert max-w-none text-text-secondary whitespace-pre-wrap">{selectedNote?.fullContent}</div></Modal></ToolWrapper>);
};

const AnalyticsTool: React.FC = () => {
    const COLORS = ['#2563EB', '#22D3EE', '#22C55E', '#F59E0B'];
    return (<ToolWrapper title="Learning Analytics"><div className="space-y-8"><div className="grid md:grid-cols-3 gap-6 text-center">
        <Card><Hourglass className="h-8 w-8 text-accent mx-auto mb-2"/><p className="text-2xl font-bold font-heading text-text-primary">48 Hours</p><p className="text-text-secondary">Total Study Time</p></Card>
        <Card><HelpCircle className="h-8 w-8 text-accent mx-auto mb-2"/><p className="text-2xl font-bold font-heading text-text-primary">124</p><p className="text-text-secondary">AI Questions Asked</p></Card>
        <Card><FilePlus className="h-8 w-8 text-accent mx-auto mb-2"/><p className="text-2xl font-bold font-heading text-text-primary">32</p><p className="text-text-secondary">Notes Generated</p></Card>
    </div><div className="grid lg:grid-cols-2 gap-8 h-80"><Card><h4 className="font-semibold text-text-primary mb-4 text-center">Time Spent per Subject (Hours)</h4><ResponsiveContainer width="100%" height="90%"><BarChart data={TIME_SPENT_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid stroke="rgba(255, 255, 255, 0.1)" /><XAxis dataKey="subject" stroke="#94A3B8" fontSize={12} /><YAxis stroke="#94A3B8"/><Tooltip contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)' }} cursor={{fill: 'rgba(37, 99, 235, 0.1)'}}/><Bar dataKey="hours" fill="#2563EB" /></BarChart></ResponsiveContainer></Card><Card><h4 className="font-semibold text-text-primary mb-4 text-center">Tool Usage</h4><ResponsiveContainer width="100%" height="90%"><PieChart><Tooltip contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)' }}/><Legend wrapperStyle={{color: '#F8FAFC', fontSize: '14px'}}/><Pie data={TOOL_USAGE_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">{TOOL_USAGE_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie></PieChart></ResponsiveContainer></Card></div></div></ToolWrapper>);
}

const DashboardPage: React.FC = () => {
    const [activeTool, setActiveTool] = useState<Tool>('analytics');
    const [isChatPopoverOpen, setIsChatPopoverOpen] = useState(false);

    const tools = [
        { id: 'analytics' as Tool, name: 'Analytics', icon: BarChart4 },
        { id: 'tutor' as Tool, name: 'AI Tutor', icon: Bot },
        { id: 'notes' as Tool, name: 'Notes Generator', icon: Mic },
        { id: 'summarizer' as Tool, name: 'Summarizer', icon: FileText },
        { id: 'translator' as Tool, name: 'Translator', icon: Languages },
        { id: 'history' as Tool, name: 'Saved Notes', icon: Bookmark },
    ];

    const renderContent = () => {
        switch (activeTool) {
            case 'tutor': return <AITutor />;
            case 'notes': return <NotesGenerator />;
            case 'summarizer': return <ContentSummarizer />;
            case 'translator': return <TranslatorTool />;
            case 'history': return <SavedNotesTool />;
            case 'analytics': return <AnalyticsTool />;
            default: return null;
        }
    };

    return (
        <div className="relative flex flex-col md:flex-row gap-6 h-[calc(100vh-200px)]">
            <aside className="w-full md:w-64 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 p-4 flex flex-col">
                <nav className="flex-grow space-y-2">
                    {tools.map(tool => (
                        <button 
                            key={tool.id} 
                            onClick={() => setActiveTool(tool.id)}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-semibold text-left transition-all relative ${activeTool === tool.id ? 'bg-primary text-white shadow-lg shadow-blue-500/30' : 'text-text-secondary hover:bg-white/10'}`}
                        >
                            <tool.icon size={20} />
                            <span>{tool.name}</span>
                        </button>
                    ))}
                </nav>
            </aside>
            
            <main className="flex-1">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTool}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>

            <AnimatePresence>
            {isChatPopoverOpen && (
                 <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-24 right-6 w-full max-w-md h-[600px] z-50"
                >
                     <div className="relative w-full h-full">
                        <AITutor />
                        <button 
                            onClick={() => setIsChatPopoverOpen(false)}
                            className="absolute top-3 right-3 p-2 bg-slate-800/50 rounded-full text-text-secondary hover:text-text-primary hover:bg-slate-700/50"
                        >
                            <X size={20} />
                        </button>
                     </div>
                </motion.div>
            )}
            </AnimatePresence>


            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChatPopoverOpen(prev => !prev)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-accent text-white w-16 h-16 rounded-full shadow-2xl shadow-blue-500/50 flex items-center justify-center z-50"
                aria-label="Toggle AI Assistant"
            >
                {isChatPopoverOpen ? <X size={32}/> : <Bot size={32} />}
            </motion.button>

        </div>
    );
};

export default DashboardPage;