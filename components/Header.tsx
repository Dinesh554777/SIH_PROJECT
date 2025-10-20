
import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, GraduationCap, Flame, Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
];

const LanguageSwitcher: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(languages[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
            >
                <Globe size={18} />
                <span>{selectedLang.name}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-36 bg-slate-800 border border-white/10 rounded-lg shadow-lg z-10"
                    >
                        <ul className="p-1">
                            {languages.map(lang => (
                                <li key={lang.code}>
                                    <button
                                        onClick={() => {
                                            setSelectedLang(lang);
                                            setIsOpen(false);
                                        }}
                                        className="w-full flex items-center justify-between text-left px-3 py-2 text-sm text-text-secondary hover:bg-white/10 hover:text-text-primary rounded-md transition-colors"
                                    >
                                        {lang.name}
                                        {selectedLang.code === lang.code && <Check size={16} className="text-accent" />}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

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
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <div className="h-6 w-px bg-white/10"></div>
              <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-amber-400">
                <Flame size={18} />
                <span>1250 Points</span>
              </div>
              <NavLink to="/login">
                <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md text-sm">
                  Login
                </button>
              </NavLink>
            </div>
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
          <div className="border-t border-white/10 pt-4 mt-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-400">
                  <Flame size={18} />
                  <span>1250 Points</span>
                </div>
                <LanguageSwitcher />
            </div>
            <NavLink to="/login" className="block w-full">
              <button className="w-full bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
                Login
              </button>
            </NavLink>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
