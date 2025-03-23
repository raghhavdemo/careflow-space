
import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../ui-components/Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-tr from-healthcare-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-healthcare-100 filter blur-[120px] opacity-60"></div>
        <div className="absolute top-[60%] -right-[5%] w-[30%] h-[40%] rounded-full bg-healthcare-200 filter blur-[90px] opacity-50"></div>
        <motion.div 
          className="absolute bottom-[10%] left-[20%] w-2 h-2 bg-healthcare-400 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-[15%] right-[30%] w-3 h-3 bg-healthcare-300 rounded-full"
          animate={{ y: [0, -30, 0] }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div 
          className="absolute top-[45%] left-[15%] w-4 h-4 bg-healthcare-200 rounded-full"
          animate={{ y: [0, -25, 0] }}
          transition={{ 
            duration: 4.5, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Main content */}
      <div className="w-full max-w-md z-10">
        <div className="mb-8 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo size="lg" className="mb-6" />
          </motion.div>
          
          <motion.h1 
            className="text-2xl font-semibold text-gray-900 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p 
              className="mt-2 text-gray-500 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div 
          className="bg-white backdrop-blur-lg bg-opacity-70 rounded-xl shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
