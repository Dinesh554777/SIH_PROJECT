import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  count?: number;
  value: number;
  onChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ count = 5, value, onChange }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(count)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              className="sr-only"
              value={ratingValue}
              onClick={() => onChange(ratingValue)}
            />
            <Star
              className="cursor-pointer transition-colors"
              color={ratingValue <= (hover || value) ? '#F59E0B' : '#64748B'}
              fill={ratingValue <= (hover || value) ? '#F59E0B' : 'none'}
              size={32}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;