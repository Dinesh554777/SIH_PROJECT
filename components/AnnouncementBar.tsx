import React, { useState } from 'react';
import { Megaphone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        className="bg-primary text-white text-sm font-medium"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">
          <div className="flex items-center gap-3">
            <Megaphone size={18} />
            <span>Welcome to the new and improved EduVators platform!</span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Dismiss announcement"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBar;
