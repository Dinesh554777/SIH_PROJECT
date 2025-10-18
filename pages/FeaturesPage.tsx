import React, { useState } from 'react';
import { FEATURES } from '../constants';
import type { Feature } from '../types';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { CheckCircle, XCircle } from 'lucide-react';

const featureCategories = ['All', 'AI', 'Accessibility', 'Multilingual', 'Career'];

const FeaturesPage: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredFeatures = activeFilter === 'All' 
    ? FEATURES 
    : FEATURES.filter(f => f.category === activeFilter);

  return (
    <div className="space-y-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-heading text-text-primary mb-2">Platform Features</h1>
        <p className="text-lg text-text-secondary">Discover the powerful AI tools designed to enhance your learning experience.</p>
      </div>

      {/* Feature Filters */}
      <div className="flex justify-center flex-wrap gap-3">
        {featureCategories.map(category => (
          <button 
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors ${
              activeFilter === category 
                ? 'bg-primary text-white shadow' 
                : 'bg-white/10 text-text-secondary hover:bg-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFeatures.map((feature) => (
          <Card key={feature.title} className="flex flex-col text-center">
            <div className="flex-grow">
              <div className="bg-primary/20 p-4 rounded-full inline-block mb-4">
                <feature.icon className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold font-heading text-text-primary mb-2">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
            <button
              onClick={() => setSelectedFeature(feature)}
              className="mt-6 font-semibold text-accent hover:underline"
            >
              Learn More
            </button>
          </Card>
        ))}
      </div>
      
      {/* Comparison Chart */}
      <section>
          <h2 className="text-3xl font-bold font-heading text-center text-text-primary mb-8">Traditional vs. EduVators</h2>
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/10">
              <div className="grid grid-cols-3">
                  <div className="p-4 font-bold text-lg font-heading text-text-primary">Feature</div>
                  <div className="p-4 font-bold text-lg font-heading text-text-primary bg-white/5 text-center">Traditional Learning</div>
                  <div className="p-4 font-bold text-lg font-heading text-white bg-primary text-center">EduVators Smart Learning</div>
              </div>
              {[
                  { feature: 'Doubt Solving', traditional: 'Limited to class hours', eduvators: '24/7 AI Tutor' },
                  { feature: 'Note Taking', traditional: 'Manual, time-consuming', eduvators: 'Automated Lecture-to-Notes' },
                  { feature: 'Language', traditional: 'Primarily English', eduvators: 'Multilingual Support' },
                  { feature: 'Pacing', traditional: 'One-size-fits-all', eduvators: 'Personalized Learning Paths' },
                  { feature: 'Accessibility', traditional: 'Requires constant internet', eduvators: 'Offline & Low-Bandwidth Mode' },
              ].map(item => (
                   <div key={item.feature} className="grid grid-cols-3 border-t border-white/10 items-center">
                      <div className="p-4 font-semibold text-text-primary">{item.feature}</div>
                      <div className="p-4 text-text-secondary bg-white/5 flex items-center justify-center gap-2 h-full"><XCircle size={20} className="text-red-400"/><span>{item.traditional}</span></div>
                      <div className="p-4 text-text-primary flex items-center justify-center gap-2 h-full"><CheckCircle size={20} className="text-success"/><span>{item.eduvators}</span></div>
                  </div>
              ))}
          </div>
      </section>

      <Modal 
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        title={selectedFeature?.title || ''}
      >
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            {selectedFeature && (
              <div className="bg-primary/20 p-4 rounded-full">
                <selectedFeature.icon className="h-12 w-12 text-accent" />
              </div>
            )}
          </div>
          <p className="text-text-secondary text-lg">{selectedFeature?.longDescription}</p>
        </div>
      </Modal>
    </div>
  );
};

export default FeaturesPage;