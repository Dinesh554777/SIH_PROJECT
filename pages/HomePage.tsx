import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { TESTIMONIALS } from '../constants';
import { motion } from 'framer-motion';
import { PlayCircle, Zap, BookOpen, Users } from 'lucide-react';

const StatCard: React.FC<{ icon: React.ElementType, value: string, label: string }> = ({ icon: Icon, value, label }) => (
    <motion.div 
      className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center border border-white/10 transition-all hover:border-white/20 hover:shadow-glow-blue"
      whileHover={{ y: -5 }}
    >
        <Icon className="h-10 w-10 text-accent mx-auto mb-3 animate-pulse"/>
        <p className="text-3xl font-bold font-heading text-text-primary">{value}</p>
        <p className="text-text-secondary">{label}</p>
    </motion.div>
);

const HomePage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center py-12">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold font-heading mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Empowering Rural Minds with AI
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Smart learning, accessible education, and AI mentorship for every rural college.
        </motion.p>
        <motion.div 
          className="flex justify-center flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/dashboard">
            <button className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-lg font-semibold text-lg hover:scale-105 transition-transform transform shadow-lg">
              Get Started →
            </button>
          </Link>
          <Link to="/features">
            <button className="bg-white/10 backdrop-blur-sm text-text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/20 transition-transform transform hover:scale-105 shadow-lg border border-white/10">
              Learn More
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Impact Counter Section */}
      <section className="grid md:grid-cols-3 gap-8">
          <StatCard icon={Users} value="10,000+" label="Students Empowered" />
          <StatCard icon={BookOpen} value="50+" label="Colleges Connected" />
          <StatCard icon={Zap} value="1M+" label="AI Sessions Delivered" />
      </section>

      {/* How It Works Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold font-heading text-text-primary mb-12">A Simple Path to Smart Learning</h2>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-12">
            <svg width="100%" height="2">
              <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="8 8" />
            </svg>
          </div>
          <motion.div variants={itemVariants} className="relative z-10">
            <Card>
              <div className="bg-primary/20 text-accent rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold border-2 border-accent">1</div>
              <h3 className="text-xl font-semibold font-heading mb-2 text-text-primary">Record & Upload</h3>
              <p className="text-text-secondary">Students or faculty upload audio lectures in any format.</p>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants} className="relative z-10">
             <Card>
              <div className="bg-primary/20 text-accent rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold border-2 border-accent">2</div>
              <h3 className="text-xl font-semibold font-heading mb-2 text-text-primary">AI Converts</h3>
              <p className="text-text-secondary">Our AI engine transcribes, summarizes, and translates the content.</p>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants} className="relative z-10">
            <Card>
              <div className="bg-primary/20 text-accent rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold border-2 border-accent">3</div>
              <h3 className="text-xl font-semibold font-heading mb-2 text-text-primary">Learn Smartly</h3>
              <p className="text-text-secondary">Access structured notes, summaries, and ask doubts to the AI Tutor.</p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="bg-slate-900/50 text-white p-12 rounded-2xl text-center border border-white/10">
         <h2 className="text-3xl font-bold font-heading mb-4">See EduVators in Action</h2>
         <p className="max-w-2xl mx-auto mb-8 text-text-secondary">Watch our short demo to see how we are revolutionizing rural education with AI.</p>
         <div className="relative max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl group">
            <img src="https://picsum.photos/seed/video/1280/720" alt="Video thumbnail" className="w-full"/>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <PlayCircle className="h-24 w-24 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform transform"/>
            </div>
         </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 className="text-3xl font-bold font-heading text-center text-text-primary mb-12">From Our Students</h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="h-full flex flex-col">
                <p className="text-text-secondary italic mb-6 flex-grow">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img src={testimonial.imageUrl} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-text-secondary">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;