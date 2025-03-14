"use client";

import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'white';
}

export function Logo({ size = 'medium', variant = 'default' }: LogoProps) {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'h-6';
      case 'large':
        return 'h-12';
      case 'medium':
      default:
        return 'h-9';
    }
  };

  const getColorClass = () => {
    switch (variant) {
      case 'white':
        return 'text-white';
      case 'default':
      default:
        return 'text-red-600';
    }
  };

  // SVG for the Брестский облпотребсоюз logo inspired by the uploaded image
  return (
    <div className={`flex items-center ${getSizeClass()} ${getColorClass()}`}>
      <div className="relative flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 60 60"
          className={`${getSizeClass()} mr-2 fill-current`}
          style={{ minWidth: size === 'small' ? '24px' : '30px' }}
        >
          <path d="M30 5C18.42 5 9 14.42 9 26v22c0 2.76 2.24 5 5 5h32c2.76 0 5-2.24 5-5V26c0-11.58-9.42-21-21-21z" />
          <path d="M30 12c-7.73 0-14 6.27-14 14v17a3 3 0 003 3h22a3 3 0 003-3V26c0-7.73-6.27-14-14-14z" fill="#fff" />
          <path d="M30 17c-5 0-9 4-9 9v12a1 1 0 001 1h16a1 1 0 001-1V26c0-5-4-9-9-9z" />
          <path d="M21.5 26L30 17.5 38.5 26 30 34.5z" fill={variant === 'white' ? '#fff' : '#4CAF50'} />
        </svg>
        <div className="flex flex-col">
          <span className={`font-bold leading-tight ${size === 'small' ? 'text-sm' : 'text-lg'}`}>
            Брестский
          </span>
          <span className={`font-bold leading-tight ${size === 'small' ? 'text-sm' : 'text-lg'}`}>
            облпотребсоюз
          </span>
        </div>
      </div>
    </div>
  );
}
