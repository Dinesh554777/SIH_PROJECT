import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { EVENTS_DATA } from '../constants';
import { Calendar, Clock, Video, Mic } from 'lucide-react';

const useCountdown = (targetDate: string) => {
    const countDownDate = new Date(targetDate).getTime();
    const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);
        return () => clearInterval(interval);
    }, [countDownDate]);

    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
};

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{String(value).padStart(2, '0')}</div>
        <div className="text-sm text-text-secondary uppercase tracking-wider">{label}</div>
    </div>
);

const EventsPage: React.FC = () => {
    const upcomingEvents = EVENTS_DATA.filter(e => !e.isPast);
    const pastEvents = EVENTS_DATA.filter(e => e.isPast);
    const nextEvent = upcomingEvents[0];
    const countdown = useCountdown(nextEvent.date);

    return (
        <div className="space-y-20">
            <div className="text-center">
                <h1 className="text-4xl font-bold font-heading text-text-primary mb-2">Events & Workshops</h1>
                <p className="text-lg text-text-secondary">Join our live sessions, workshops, and hackathons to boost your skills.</p>
            </div>

            {/* Next Event Countdown */}
            {nextEvent && (
                <section>
                    <Card className="!p-8 bg-gradient-to-br from-primary/20 to-navy">
                        <div className="text-center mb-6">
                            <span className="bg-accent text-navy font-bold text-sm px-4 py-1 rounded-full">{nextEvent.type}</span>
                            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-text-primary mt-4">{nextEvent.title}</h2>
                            <p className="text-text-secondary mt-2 max-w-2xl mx-auto">{nextEvent.description}</p>
                        </div>
                        <div className="flex justify-center items-center gap-6 sm:gap-12 my-8">
                           <CountdownUnit value={countdown.days} label="Days" />
                           <CountdownUnit value={countdown.hours} label="Hours" />
                           <CountdownUnit value={countdown.minutes} label="Minutes" />
                           <CountdownUnit value={countdown.seconds} label="Seconds" />
                        </div>
                        <div className="text-center">
                            <button className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-lg font-semibold text-lg hover:scale-105 transition-transform transform shadow-lg">
                                Register Now
                            </button>
                        </div>
                    </Card>
                </section>
            )}

            {/* Other Upcoming Events */}
            <section>
                <h2 className="text-3xl font-bold font-heading text-center text-text-primary mb-12">More Upcoming Events</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {upcomingEvents.slice(1).map(event => (
                        <Card key={event.id} className="flex flex-col">
                            <div className="flex-grow">
                                <span className="text-sm font-semibold text-accent">{event.type}</span>
                                <h3 className="text-2xl font-bold font-heading text-text-primary mt-1 mb-2">{event.title}</h3>
                                <div className="flex items-center gap-2 text-text-secondary text-sm mb-3">
                                    <Calendar size={16} />
                                    <span>{new Date(event.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <p className="text-text-secondary">{event.description}</p>
                            </div>
                            <button className="mt-6 w-full bg-white/10 text-text-primary py-2 rounded-lg font-semibold hover:bg-white/20 flex items-center justify-center gap-2 transition-colors">
                                <Mic size={18} /> Learn More & Register
                            </button>
                        </Card>
                    ))}
                </div>
            </section>
            
            {/* Past Events */}
             <section>
                <h2 className="text-3xl font-bold font-heading text-center text-text-primary mb-12">Past Event Recordings</h2>
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {pastEvents.map(event => (
                        <Card key={event.id}>
                            <h3 className="text-xl font-bold font-heading text-text-primary mb-2">{event.title}</h3>
                            <p className="text-sm text-text-secondary mb-4">{event.description}</p>
                            <a href={event.recordingUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-700 text-text-secondary py-2 rounded-lg font-semibold hover:bg-slate-600 flex items-center justify-center gap-2 transition-colors">
                               <Video size={18} /> Watch Recording
                            </a>
                        </Card>
                     ))}
                 </div>
            </section>
        </div>
    );
};

export default EventsPage;