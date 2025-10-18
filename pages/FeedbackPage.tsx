import React, { useState } from 'react';
import Card from '../components/Card';
import StarRating from '../components/StarRating';
import { FEEDBACK_ITEMS, FEATURES } from '../constants';
import { Send, MessageSquare } from 'lucide-react';

const FeedbackPage: React.FC = () => {
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="space-y-16">
            <div className="text-center">
                <h1 className="text-4xl font-bold font-heading text-text-primary mb-2">Share Your Feedback</h1>
                <p className="text-lg text-text-secondary">Your insights help us improve EduVators for everyone.</p>
            </div>
            
            <div className="max-w-3xl mx-auto">
                 <Card className="!p-8">
                    {submitted ? (
                        <div className="text-center py-12">
                            <h2 className="text-2xl font-bold font-heading text-accent mb-2">Thank you!</h2>
                            <p className="text-text-secondary">Your feedback has been submitted successfully.</p>
                             <button onClick={() => { setSubmitted(false); setRating(0); }} className="mt-6 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
                                Submit Another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-2xl font-bold font-heading text-text-primary text-center">How would you rate your experience?</h2>
                            <div className="flex justify-center">
                                <StarRating value={rating} onChange={setRating} />
                            </div>
                            
                            <div>
                                <label htmlFor="module" className="block text-sm font-medium text-text-secondary mb-1">Which module needs improvement?</label>
                                <select id="module" required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 border-white/20 text-text-primary">
                                    <option value="">Select a module</option>
                                    {FEATURES.map(f => <option key={f.title} value={f.title}>{f.title}</option>)}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="comment" className="block text-sm font-medium text-text-secondary mb-1">Your feedback</label>
                                <textarea id="comment" rows={5} placeholder="Tell us what you liked or what could be better..." required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 border-white/20 text-text-primary"></textarea>
                            </div>
                            
                            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors">
                                <Send size={20} /> Submit Feedback
                            </button>
                        </form>
                    )}
                </Card>
            </div>

            {/* Latest Feedbacks Section */}
            <section>
                <h2 className="text-3xl font-bold font-heading text-center text-text-primary mb-12">What Others Are Saying</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {FEEDBACK_ITEMS.map(item => (
                        <Card key={item.id}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="font-bold text-text-primary">{item.author}</div>
                                <div className="flex">
                                    <StarRating value={item.rating} onChange={() => {}} />
                                </div>
                            </div>
                             <p className="text-sm font-semibold text-accent mb-2">{item.module}</p>
                            <div className="flex gap-3">
                                <MessageSquare size={20} className="text-text-secondary mt-1 shrink-0" />
                                <p className="text-text-secondary italic">"{item.comment}"</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FeedbackPage;