import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  longDescription: string;
  category: 'AI' | 'Accessibility' | 'Multilingual' | 'Career';
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  linkedin: string;
  email?: string;
}

export interface CareerPath {
    title: string;
    description: string;
    requiredSkills: string[];
    avgSalary: string;
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
    source?: string;
}

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
    imageUrl: string;
}

export interface TimelineEvent {
    date: string;
    title: string;
    description: string;
}

export interface Achievement {
    icon: LucideIcon;
    title: string;
    description: string;
}

export interface Resource {
    id: number;
    title: string;
    description: string;
    category: 'AI' | 'Electronics' | 'CSE' | 'Mechanical';
    fileType: 'PDF' | 'Video' | 'Notes';
    icon: LucideIcon;
    isIndexed?: boolean;
    fullText: string;
}

export interface CommunityPost {
    id: number;
    title: string;
    author: string;
    authorImageUrl: string;
    category: string;
    replies: number;
    views: number;
    time: string;
}

export interface TopLearner {
    name: string;
    imageUrl: string;
    points: number;
}

export interface Event {
    id: number;
    title: string;
    date: string;
    type: 'Workshop' | 'Webinar' | 'Contest';
    description: string;
    isPast?: boolean;
    recordingUrl?: string;
}

export interface FeedbackItem {
    id: number;
    author: string;
    module: string;
    rating: number;
    comment: string;
}

export interface SavedNote {
  id: number;
  title: string;
  contentSnippet: string;
  fullContent: string;
  date: string;
  category: 'Notes' | 'Summary' | 'Translation';
}

export interface TimeSpentData {
    subject: string;
    hours: number;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: LucideIcon;
  color: 'gold' | 'silver' | 'bronze' | 'default';
}


// Fix: Add index signature for recharts compatibility to resolve type error with PieChart component.
export interface ToolUsageData {
    name: string;
    value: number;
    [key: string]: any;
}