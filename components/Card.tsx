
import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.1), 0 4px 6px -4px rgba(37, 99, 235, 0.1)' }}
      className={`bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden p-6 transition-all shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;