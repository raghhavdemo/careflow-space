
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className,
  hover = true
}) => {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-md border border-white/20 shadow-md',
        hover && 'transition-all duration-300 hover:shadow-lg hover:bg-white/90',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
