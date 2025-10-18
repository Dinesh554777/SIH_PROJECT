import React from 'react';
import { GraduationCap, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Career', path: '/career' },
  ];
  
  const helpLinks = [
    { name: 'Community', path: '/community' },
    { name: 'Events', path: '/events' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="bg-slate-900/50 text-text-primary border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 col-span-1 sm:col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-heading">EduVators</span>
            </Link>
            <p className="text-text-secondary">Empowering rural minds with AI-driven education.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-text-secondary hover:text-text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Help</h3>
            <ul className="space-y-2">
              {helpLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-text-secondary hover:text-text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Policies & Social */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Policies</h3>
            <ul className="space-y-2 mb-6">
               <li><Link to="/privacy" className="text-text-secondary hover:text-text-primary transition-colors">Privacy Policy</Link></li>
               <li><Link to="/terms" className="text-text-secondary hover:text-text-primary transition-colors">Terms of Service</Link></li>
            </ul>
            <h3 className="font-semibold text-text-primary mb-4">Social</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-text-secondary hover:text-text-primary transition-colors"><Instagram size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-text-secondary">
          <p>&copy; 2025 EduVators. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;