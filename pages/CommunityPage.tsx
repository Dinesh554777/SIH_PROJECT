import React from 'react';
import Card from '../components/Card';
import { COMMUNITY_POSTS, TOP_LEARNERS } from '../constants';
import { MessageSquare, Eye, Award, Send, ThumbsUp } from 'lucide-react';

const CommunityPage: React.FC = () => {
    return (
        <div className="space-y-16">
            <div className="text-center">
                <h1 className="text-4xl font-bold font-heading text-text-primary mb-2">Community Hub</h1>
                <p className="text-lg text-text-secondary">Ask questions, share knowledge, and connect with fellow learners.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content: Discussions */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="!p-6">
                        <h2 className="text-2xl font-bold font-heading text-text-primary mb-4">Ask a Doubt</h2>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="What's on your mind? Ask the community..."
                                className="flex-grow p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 border-white/20 placeholder:text-text-secondary text-text-primary"
                            />
                            <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 flex items-center justify-center gap-2">
                               <Send size={18} /> Post
                            </button>
                        </div>
                    </Card>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold font-heading text-text-primary">Recent Discussions</h3>
                        {COMMUNITY_POSTS.map(post => (
                            <Card key={post.id} className="!p-4 flex flex-col sm:flex-row items-start gap-4 hover:border-accent/50 transition-colors">
                                <img src={post.authorImageUrl} alt={post.author} className="w-12 h-12 rounded-full" />
                                <div className="flex-grow">
                                    <span className="text-xs font-semibold bg-primary/20 text-accent px-2 py-1 rounded-full">{post.category}</span>
                                    <h4 className="font-bold text-lg text-text-primary mt-1 hover:underline cursor-pointer">{post.title}</h4>
                                    <p className="text-sm text-text-secondary">
                                        Posted by <span className="font-semibold text-text-primary">{post.author}</span> • {post.time}
                                    </p>
                                </div>
                                <div className="flex gap-4 text-sm text-text-secondary shrink-0 mt-2 sm:mt-0">
                                    <div className="flex items-center gap-1.5">
                                        <MessageSquare size={16} /> {post.replies}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Eye size={16} /> {post.views}
                                    </div>
                                    <button className="flex items-center gap-1.5 hover:text-primary"><ThumbsUp size={16} /></button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <h3 className="text-xl font-bold font-heading text-text-primary mb-4 flex items-center gap-2"><Award className="text-accent"/> Top Learners</h3>
                        <ul className="space-y-4">
                            {TOP_LEARNERS.map((learner, index) => (
                                <li key={learner.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={learner.imageUrl} alt={learner.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-semibold text-text-primary">{learner.name}</p>
                                            <p className="text-sm text-text-secondary">{learner.points} points</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-lg text-accent">#{index + 1}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;