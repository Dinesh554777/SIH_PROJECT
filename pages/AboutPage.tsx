import React from 'react';
import Card from '../components/Card';
import { TEAM_MEMBERS, TIMELINE_EVENTS, ACHIEVEMENTS } from '../constants';
import { Linkedin, Milestone } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-20">
      {/* Mission Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold font-heading text-text-primary mb-4">Our Mission</h1>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          To bridge the education gap between rural and urban students using Artificial Intelligence, low-bandwidth optimization, and multilingual content delivery. We believe in quality education for all, irrespective of geographical and technological barriers.
        </p>
      </section>
      
      {/* SIH Background & Achievements */}
      <section className="grid lg:grid-cols-2 gap-12 items-center">
         <Card className="!p-8">
            <h2 className="text-3xl font-bold font-heading text-center text-text-primary mb-4">Project Background</h2>
            <p className="text-lg text-text-secondary text-center">
              EduVators was conceived for the "Remote Classroom for Rural Colleges" problem statement in the <strong>Smart India Hackathon 2025</strong>. Our goal is to create a robust, scalable, and impactful platform that truly empowers students in underserved regions.
            </p>
         </Card>
         <div className="space-y-6">
            <h2 className="text-3xl font-bold font-heading text-center text-text-primary mb-4">Our Achievements</h2>
            {ACHIEVEMENTS.map(achievement => (
                <div key={achievement.title} className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-full">
                        <achievement.icon className="h-6 w-6 text-accent"/>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-text-primary">{achievement.title}</h3>
                        <p className="text-text-secondary">{achievement.description}</p>
                    </div>
                </div>
            ))}
         </div>
      </section>

      {/* Timeline Section */}
      <section>
        <h2 className="text-3xl font-bold font-heading text-center text-text-primary mb-12">Our Journey</h2>
        <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 w-0.5 h-full bg-white/10 -translate-x-1/2"></div>
            {TIMELINE_EVENTS.map((event, index) => (
                <div key={event.title} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                        <p className="text-accent font-semibold">{event.date}</p>
                        <h3 className="text-lg font-bold font-heading text-text-primary">{event.title}</h3>
                        <p className="text-text-secondary text-sm">{event.description}</p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 bg-navy border-4 border-primary rounded-full p-1.5">
                        <Milestone className="h-5 w-5 text-primary" />
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold font-heading text-center text-text-primary mb-12">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <Card key={member.name} className="text-center">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white/10"
              />
              <h3 className="text-xl font-semibold font-heading text-text-primary">{member.name}</h3>
              <p className="text-accent font-medium mb-3">{member.role}</p>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block text-text-secondary hover:text-accent transition-colors">
                  <Linkedin size={24}/>
              </a>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;