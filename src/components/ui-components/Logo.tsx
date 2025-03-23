
import React from 'react';
import { cn } from '../../lib/utils';
import { Activity } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };
  
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <div className={cn('flex items-center gap-2 font-medium', sizes[size], className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-healthcare-500 rounded-full opacity-20 animate-pulse-gentle"></div>
        <Activity className={cn('text-healthcare-600', iconSizes[size])} />
      </div>
      <span>CareFlow</span>
    </div>
  );
};

export default Logo;
