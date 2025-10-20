import React from 'react';
import Card from '../components/Card';
import { CAREER_PATHS, SKILLS_DATA } from '../constants';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { BadgeCheck, PlusCircle, Check, Map, Download } from 'lucide-react';

const CareerGuidancePage: React.FC = () => {
  const skills = ['Python', 'Data Analysis', 'Communication', 'React'];
  
  return (
    <div className="space-y-20">
      <section>
        <h1 className="text-4xl font-bold font-heading text-center text-text-primary mb-4">Your Personalized Career Path</h1>
        <p className="text-lg text-text-secondary text-center max-w-3xl mx-auto">
          Discover career opportunities tailored to your skills and get a personalized roadmap to achieve your goals.
        </p>
      </section>

      {/* Skills & Analysis */}
      <section className="grid lg:grid-cols-2 gap-8 items-center">
        <Card className="h-[450px]">
          <h2 className="text-2xl font-bold font-heading text-text-primary mb-4 text-center">Skill Gap Analysis</h2>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILLS_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8' }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: 'none' }}/>
              <Radar name="Your Skills" dataKey="A" stroke="#2563EB" fill="#2563EB" fillOpacity={0.6} />
              <Radar name="Industry Standard" dataKey="B" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.6} />
              <Legend wrapperStyle={{color: '#F8FAFC'}}/>
            </RadarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="!p-8">
          <h2 className="text-2xl font-bold font-heading text-text-primary mb-4">Your Current Skills</h2>
          <p className="text-text-secondary mb-6">Add or remove skills to help our AI create the perfect roadmap for you. AI suggests you might be missing: <span className="font-semibold text-accent">SQL, Machine Learning.</span></p>
          <div className="flex flex-wrap gap-3 mb-6">
            {skills.map(skill => (
                <span key={skill} className="bg-primary/30 text-accent font-semibold px-4 py-2 rounded-full flex items-center gap-2">
                    <Check size={18} /> {skill}
                </span>
            ))}
             <button className="bg-white/10 text-text-secondary font-semibold px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20">
                <PlusCircle size={18} /> Add Skill
            </button>
          </div>
           <div className="bg-navy p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-text-primary">Progress Bar (Data Science Path)</h3>
                <div className="w-full bg-slate-700 rounded-full h-4">
                    <div className="bg-success h-4 rounded-full" style={{width: '60%'}}></div>
                </div>
                <p className="text-sm text-right mt-1 text-text-secondary">60% Complete</p>
            </div>
             <div className="mt-4 text-center bg-primary/20 p-3 rounded-lg flex items-center justify-center gap-3">
              <BadgeCheck size={24} className="text-accent" />
              <p className="text-text-secondary text-sm">Complete your learning path to earn the <span className="font-bold text-accent">Pathfinder Badge</span>!</p>
            </div>
        </Card>
      </section>
      
      {/* Learning Path */}
      <section>
        <h2 className="text-3xl font-bold font-heading text-center text-text-primary mb-12">Personalized Learning Path</h2>
        <div className="relative max-w-4xl mx-auto">
            <div className="absolute top-4 left-4 w-0.5 h-full bg-white/10"></div>
            <div className="space-y-8">
              {[
                { title: 'Master Advanced Python', description: 'Complete courses on Pandas, NumPy, and Scikit-learn.', completed: true },
                { title: 'Deepen Machine Learning Knowledge', description: 'Study classification, regression, and clustering algorithms.', completed: true },
                { title: 'Learn Advanced SQL', description: 'Focus on window functions and complex joins.', completed: false },
                { title: 'Build Portfolio Projects', description: 'Create 2-3 projects with real-world datasets.', completed: false },
              ].map(step => (
                <div key={step.title} className="relative pl-12">
                  <div className={`absolute top-2 left-4 -translate-x-1/2 rounded-full h-5 w-5 flex items-center justify-center border-2 ${step.completed ? 'bg-success border-success' : 'bg-slate-700 border-slate-500'}`}>
                    {step.completed && <Check className="text-white" size={14} />}
                  </div>
                  <h3 className="font-bold text-lg text-text-primary">{step.title}</h3>
                  <p className="text-text-secondary">{step.description}</p>
                </div>
              ))}
            </div>
            <button className="mt-8 flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 shadow">
              <Download size={20} /> Download Career Plan
            </button>
        </div>
      </section>

      {/* Recommended Careers */}
      <section>
        <h2 className="text-3xl font-bold font-heading text-center text-text-primary mb-8">Recommended Career Paths</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {CAREER_PATHS.map((path) => (
            <Card key={path.title} className="!p-0 flex flex-col">
              <div className="p-6 flex-grow">
                <h3 className="text-2xl font-bold font-heading text-text-primary mb-2">{path.title}</h3>
                <p className="text-text-secondary mb-4">{path.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {path.requiredSkills.map(skill => (
                    <span key={skill} className="bg-primary/20 text-accent text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 px-6 py-4 rounded-b-2xl flex justify-between items-center mt-auto">
                <span className="font-semibold text-lg text-text-primary">Average Salary</span>
                <span className="font-bold text-xl text-accent">{path.avgSalary}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CareerGuidancePage;