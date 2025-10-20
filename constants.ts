
import { BookText, Bot, Briefcase, Languages, Mic, FileText, Award, Zap, Rocket, File, Video, BookOpen, MessageSquare, Star, Notebook, BrainCircuit, Trophy, Sparkles } from 'lucide-react';
import type { Feature, TeamMember, CareerPath, Testimonial, TimelineEvent, Achievement, Resource, CommunityPost, TopLearner, Event, FeedbackItem, SavedNote, TimeSpentData, ToolUsageData, Badge } from './types';

export const FEATURES: Feature[] = [
  {
    icon: Bot,
    title: 'AI Tutor Chatbot',
    description: '24/7 AI assistant to answer questions and clarify doubts instantly.',
    longDescription: 'Our AI Tutor is powered by advanced language models, providing contextual and accurate answers based on your uploaded study materials. It helps you understand complex topics at your own pace, anytime, anywhere.',
    category: 'AI',
  },
  {
    icon: Mic,
    title: 'Lecture-to-Notes',
    description: 'Convert recorded audio lectures into structured, easy-to-read notes.',
    longDescription: 'Simply upload your recorded lectures, and our AI will transcribe the speech to text, summarize key points, and organize them into well-structured notes. Never miss a detail again.',
    category: 'AI',
  },
  {
    icon: FileText,
    title: 'Smart Summarizer',
    description: 'Summarize lengthy PDFs and documents into concise key points.',
    longDescription: 'Overwhelmed with reading material? Our Smart Summarizer condenses long textbooks, research papers, and articles into bite-sized summaries, helping you grasp the core concepts faster.',
    category: 'AI',
  },
  {
    icon: Languages,
    title: 'Multilingual Learning',
    description: 'Access content in regional Indian languages like Tamil, Hindi, and Telugu.',
    longDescription: 'Breaking language barriers in education. Our platform supports multiple regional languages, ensuring that every student can learn comfortably in their native tongue.',
    category: 'Multilingual',
  },
  {
    icon: Briefcase,
    title: 'Career Guidance',
    description: 'AI-driven career suggestions and personalized learning paths.',
    longDescription: 'Receive personalized career recommendations based on your skills and interests. Our platform analyzes skill gaps and suggests a tailored learning path to help you achieve your career goals.',
    category: 'Career',
  },
  {
    icon: BookText,
    title: 'Offline Access',
    description: 'Learn on the go, even with unstable or no internet connection.',
    longDescription: 'Our low-bandwidth and offline modes ensure that your learning is never interrupted. Previously accessed notes, summaries, and lectures are cached for access anytime.',
    category: 'Accessibility',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
    { name: 'DHARSHIKA G', role: 'Team Member', email: 'dharshikag2006@gmail.com', imageUrl: 'https://picsum.photos/seed/dharshika/400/400', linkedin: 'https://www.linkedin.com/in/dharshika-g' },
    { name: 'DINESH D', role: 'Team Member', email: 'dinesh3212001@gmail.com', imageUrl: 'https://picsum.photos/seed/dinesh/400/400', linkedin: 'https://www.linkedin.com/in/dinesh--d' },
    { name: 'KEERTHANA R', role: 'Team Member', email: 'keerthana5705897@gmail.com', imageUrl: 'https://picsum.photos/seed/keerthana/400/400', linkedin: 'https://www.linkedin.com/in/keerthana-ravikumar' },
    { name: 'ABISHEK R', role: 'Team Member', email: 'abishekr2303@gmail.com', imageUrl: 'https://picsum.photos/seed/abhishek/400/400', linkedin: 'https://www.linkedin.com/in/abishekrajendran' },
    { name: 'DEVESH K', role: 'Team Member', email: 'deveshkrishnan2007@gmail.com', imageUrl: 'https://picsum.photos/seed/devesh/400/400', linkedin: 'https://www.linkedin.com/in/devesh-krishnan-off' },
    { name: 'ASHWATH S', role: 'Team Member', email: 'ashwath0714@gmail.com', imageUrl: 'https://picsum.photos/seed/ashwath/400/400', linkedin: 'https://www.linkedin.com/in/ashwath-s-' },
];

export const CAREER_PATHS: CareerPath[] = [
    {
        title: 'Data Scientist',
        description: 'Analyze complex data to help organizations make better decisions.',
        requiredSkills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
        avgSalary: '₹10 LPA',
    },
    {
        title: 'Full Stack Developer',
        description: 'Build and maintain both the front-end and back-end of web applications.',
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'Databases', 'HTML/CSS'],
        avgSalary: '₹8 LPA',
    },
    {
        title: 'Cloud Engineer',
        description: 'Design, implement, and manage cloud-based systems for businesses.',
        requiredSkills: ['AWS/Azure/GCP', 'Docker', 'Kubernetes', 'Networking'],
        avgSalary: '₹9 LPA',
    },
    {
        title: 'AI/ML Engineer',
        description: 'Develop intelligent systems and models to solve real-world problems.',
        requiredSkills: ['Python', 'TensorFlow/PyTorch', 'NLP', 'Computer Vision'],
        avgSalary: '₹12 LPA',
    }
];

export const SKILLS_DATA = [
  { subject: 'Programming', A: 85, B: 110, fullMark: 150 },
  { subject: 'Mathematics', A: 90, B: 130, fullMark: 150 },
  { subject: 'Communication', A: 75, B: 130, fullMark: 150 },
  { subject: 'Data Analysis', A: 99, B: 100, fullMark: 150 },
  { subject: 'Problem Solving', A: 85, B: 90, fullMark: 150 },
  { subject: 'Project Management', A: 65, B: 85, fullMark: 150 },
];

export const PROGRESS_DATA = [
  { name: 'Week 1', progress: 20 },
  { name: 'Week 2', progress: 45 },
  { name: 'Week 3', progress: 50 },
  { name: 'Week 4', progress: 78 },
  { name: 'Week 5', progress: 85 },
];

export const TESTIMONIALS: Testimonial[] = [
    { quote: "EduVators' lecture-to-notes feature saved me hours of work. I can finally focus on understanding the concepts instead of just transcribing.", name: 'Sunita Devi', role: 'Student, Rural Arts College', imageUrl: 'https://picsum.photos/seed/sunita/100/100'},
    { quote: "The AI Tutor is like having a personal teacher available 24/7. It explains complex topics in my native language, which is a huge help.", name: 'Rajesh Kumar', role: 'Student, Govt. Polytechnic', imageUrl: 'https://picsum.photos/seed/rajesh/100/100'},
    { quote: "Thanks to the career guidance tool, I now have a clear path to becoming a software developer. It's incredibly motivating!", name: 'Pooja Singh', role: 'B.Sc. Computer Science Student', imageUrl: 'https://picsum.photos/seed/pooja/100/100'},
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
    { date: 'June 2024', title: 'Idea Conception', description: 'The concept for EduVators was born from the SIH problem statement.' },
    { date: 'July 2024', title: 'Team Formation', description: 'A passionate team of four assembled to bring the vision to life.' },
    { date: 'August 2024', title: 'Prototype Development', description: 'Began building the core AI modules and platform architecture.' },
    { date: 'October 2024', title: 'SIH Submission', description: 'Submitted the initial prototype for the Smart India Hackathon.' },
];

export const ACHIEVEMENTS: Achievement[] = [
    { icon: Award, title: 'Selected for SIH 2025', description: 'Recognized for our innovative approach to solving rural education challenges.' },
    { icon: Zap, title: 'AI-First Design', description: 'Leveraging cutting-edge AI to deliver a personalized and effective learning experience.'},
    { icon: Rocket, title: 'Built for Rural India', description: 'Optimized for low-bandwidth and multilingual use to ensure accessibility for all.'},
];

export const RESOURCES_DATA: Resource[] = [
    { id: 1, title: 'Introduction to Neural Networks', description: 'A comprehensive PDF explaining the basics of neural networks.', category: 'AI', fileType: 'PDF', icon: File, fullText: 'Neural networks are a set of algorithms, modeled loosely after the human brain, that are designed to recognize patterns. Key components include neurons, layers (input, hidden, output), weights, and biases. They learn by processing examples, each of which contains a known input and output.' },
    { id: 2, title: 'Digital Logic Design Lecture', description: 'A recorded video lecture on DLD concepts.', category: 'Electronics', fileType: 'Video', icon: Video, fullText: 'Digital Logic Design (DLD) is the foundation of digital computers. This lecture covers boolean algebra, logic gates (AND, OR, NOT, XOR), combinational and sequential circuits, and Karnaugh maps for logic simplification.' },
    { id: 3, title: 'Data Structures in Python', description: 'Class notes covering all major data structures.', category: 'CSE', fileType: 'Notes', icon: BookOpen, fullText: 'This document covers fundamental data structures implemented in Python. We discuss lists, tuples, dictionaries, sets, stacks (LIFO), and queues (FIFO). We also touch upon the time and space complexity of their operations.' },
    { id:4, title: 'Thermodynamics Basics', description: 'An introductory guide to thermodynamics for mechanical engineers.', category: 'Mechanical', fileType: 'PDF', icon: File, fullText: 'Thermodynamics is the branch of physics that deals with heat, work, and temperature, and their relation to energy. The four laws of thermodynamics govern how these quantities behave. The First Law is about the conservation of energy.' },
    { id: 5, title: 'Advanced Algorithms', description: 'In-depth notes on complex algorithms and their analysis.', category: 'CSE', fileType: 'Notes', icon: BookOpen, fullText: "This guide explores advanced algorithms beyond basic data structures. Topics include Dijkstra's shortest path algorithm, dynamic programming concepts like the Fibonacci sequence optimization, and the divide-and-conquer strategy used in Merge Sort." },
    { id: 6, title: 'Machine Learning with Scikit-Learn', description: 'Video tutorial series on practical machine learning.', category: 'AI', fileType: 'Video', icon: Video, fullText: 'This tutorial demonstrates how to use the Scikit-Learn library in Python for machine learning tasks. We will build a linear regression model to predict housing prices and a support vector machine (SVM) for classification.' },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
    { id: 1, title: 'Best way to summarize long lectures?', author: 'Amit Singh', authorImageUrl: 'https://picsum.photos/seed/amit/40/40', category: 'AI Tools', replies: 12, views: 156, time: '2h ago' },
    { id: 2, title: 'AI projects for final year students?', author: 'Priya Patel', authorImageUrl: 'https://picsum.photos/seed/priya_p/40/40', category: 'Career Guidance', replies: 8, views: 201, time: '5h ago' },
    { id: 3, title: 'Need help with Python recursion.', author: 'Karan Sharma', authorImageUrl: 'https://picsum.photos/seed/karan/40/40', category: 'Programming', replies: 5, views: 89, time: '1d ago' },
];

export const TOP_LEARNERS: TopLearner[] = [
    { name: 'Sunita Devi', imageUrl: 'https://picsum.photos/seed/sunita/40/40', points: 1250 },
    { name: 'Rajesh Kumar', imageUrl: 'https://picsum.photos/seed/rajesh/40/40', points: 1100 },
    { name: 'Pooja Singh', imageUrl: 'https://picsum.photos/seed/pooja/40/40', points: 980 },
    { name: 'Amit Sharma', imageUrl: 'https://picsum.photos/seed/amit_s/40/40', points: 850 },
    { name: 'Neha Reddy', imageUrl: 'https://picsum.photos/seed/neha_r/40/40', points: 720 },
];

// Use a future date for the main upcoming event
const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 15);
futureDate.setHours(14, 0, 0, 0);

export const EVENTS_DATA: Event[] = [
    { id: 1, title: 'AI for Beginners Workshop', date: futureDate.toISOString(), type: 'Workshop', description: 'Join us for a hands-on workshop covering the fundamentals of AI and Machine Learning.' },
    { id: 2, title: 'Webinar: Building a Career in Tech', date: '2025-09-20T11:00:00Z', type: 'Webinar', description: 'Industry experts share their journey and tips for starting a career in the tech industry.' },
    { id: 3, title: 'EduVators Hackathon 2025', date: '2025-10-05T09:00:00Z', type: 'Contest', description: 'Compete with peers to build innovative solutions using the EduVators platform.' },
    { id: 4, title: 'Intro to Web Development', date: '2024-07-15T14:00:00Z', type: 'Workshop', description: 'A recorded workshop on the basics of HTML, CSS, and JavaScript.', isPast: true, recordingUrl: '#' },
];

export const FEEDBACK_ITEMS: FeedbackItem[] = [
    { id: 1, author: 'Sunita Devi', module: 'Lecture-to-Notes', rating: 5, comment: 'This feature is a game-changer! It saves me so much time and the notes are surprisingly accurate.' },
    { id: 2, author: 'Rajesh Kumar', module: 'AI Tutor', rating: 4, comment: 'The AI Tutor is very helpful for quick doubts, though sometimes it misunderstands complex questions.' },
    { id: 3, author: 'Anonymous', module: 'Summarizer', rating: 5, comment: 'Perfect for getting the gist of long research papers before an exam. Highly recommend!' },
];

export const SAVED_NOTES_DATA: SavedNote[] = [
    { id: 1, title: 'ML Lecture Summary', date: '2024-08-15', category: 'Summary', contentSnippet: 'Key concepts include supervised, unsupervised, and reinforcement learning...', fullContent: 'Full summary content about machine learning concepts would go here in detail.' },
    { id: 2, title: 'Thermodynamics Notes', date: '2024-08-14', category: 'Notes', contentSnippet: 'The laws of thermodynamics are fundamental principles governing energy...', fullContent: 'Full detailed notes from the thermodynamics lecture would be displayed here.' },
    { id: 3, title: 'Greeting in Hindi', date: '2024-08-13', category: 'Translation', contentSnippet: 'नमस्ते! आप कैसे हैं?', fullContent: 'Source Text: Hello! How are you?\nTranslated Text: नमस्ते! आप कैसे हैं?' },
];

export const TIME_SPENT_DATA: TimeSpentData[] = [
  { subject: 'AI/ML', hours: 12 },
  { subject: 'CSE', hours: 18 },
  { subject: 'Electronics', hours: 8 },
  { subject: 'Mechanical', hours: 5 },
  { subject: 'Physics', hours: 9 },
];

export const TOOL_USAGE_DATA: ToolUsageData[] = [
  { name: 'AI Tutor', value: 45 },
  { name: 'Notes Generator', value: 25 },
  { name: 'Summarizer', value: 20 },
  { name: 'Translator', value: 10 },
];

export const BADGES_DATA: Badge[] = [
  { id: 1, name: 'AI Explorer', description: 'Asked 10 questions to the AI Tutor.', icon: BrainCircuit, color: 'silver' },
  { id: 2, name: 'Note Taker Pro', description: 'Generated 5 sets of notes from lectures.', icon: Notebook, color: 'gold' },
  { id: 3, name: 'Summary Superstar', description: 'Summarized 5 long documents.', icon: Sparkles, color: 'bronze' },
  { id: 4, name: 'Perfect Week', description: 'Used the platform every day for a week.', icon: Trophy, color: 'gold' },
];