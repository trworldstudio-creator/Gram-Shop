import React, { useState } from 'react';
import { AnimalCategory } from '../data/translations';

interface AnimalImageProps {
  src: string;
  alt: string;
  category: Exclude<AnimalCategory, 'all'>;
  className?: string;
}

export const AnimalImage: React.FC<AnimalImageProps> = ({
  src,
  alt,
  category,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F2EFE9] text-[#525854] p-6 select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          className="w-12 h-12 stroke-[#1B5E3A]/60 mb-2"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {category === 'cow' || category === 'buffalo' ? (
            <>
              <path d="M12 5c-3.5 0-6 2.5-6 6v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-5c0-3.5-2.5-6-6-6Z" />
              <path d="M6 8C4 7 3 5 3 3c2 0 4 1 5 3" />
              <path d="M18 8c2-1 3-3 3-5-2 0-4 1-5 3" />
              <circle cx="9.5" cy="11.5" r="1" />
              <circle cx="14.5" cy="11.5" r="1" />
            </>
          ) : (
            <>
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </>
          )}
        </svg>
        <span className="text-xs font-medium text-center line-clamp-1 max-w-[90%]">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
