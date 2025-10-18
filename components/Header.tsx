
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Features', path: '/features' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Career', path: '/career' },
  { name: 'Resources', path: '/resources' },
  { name: 'Community', path: '/community' },
  { name: 'Events', path: '/events' },
  { name: 'Feedback', path: '/feedback' },
  { name: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const activeLinkStyle = {
    color: '#22D3EE', // Accent color
    fontWeight: '600',
  };

  return (
    <header className="bg-navy/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-heading text-text-primary">EduVators</span>
          </NavLink>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="text-text-secondary hover:text-accent transition-colors text-sm font-medium"
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink to="/login">
              <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md text-sm">
                Login
              </button>
            </NavLink>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-text-primary">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-navy/95 backdrop-blur-md"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-text-secondary hover:text-accent transition-colors"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink to="/login">
            <button className="w-full bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
              Login
            </button>
          </NavLink>
        </motion.div>
      )}
    </header>
  );
};

export default Header;