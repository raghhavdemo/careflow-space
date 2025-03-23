
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import Logo from '../ui-components/Logo';
import { 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User, 
  MessageSquare, 
  UserPlus, 
  MapPin, 
  Heart 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarLinkProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon: Icon, label, to, isActive, onClick }) => {
  return (
    <Link 
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
        isActive 
        ? 'bg-healthcare-100 text-healthcare-700' 
        : 'text-gray-600 hover:bg-healthcare-50 hover:text-healthcare-600'
      }`}
    >
      <Icon className={`h-5 w-5 ${isActive ? 'text-healthcare-600' : 'text-gray-500 group-hover:text-healthcare-500'}`} />
      <span>{label}</span>
    </Link>
  );
};

interface DashboardLayoutProps {
  userType: 'patient' | 'doctor';
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userType, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would add proper logout logic here
    navigate('/');
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const patientLinks = [
    { icon: MessageSquare, label: 'Chat', to: '/patient/chat' },
    { icon: Heart, label: 'Saved Doctors', to: '/patient/saved-doctors' },
    { icon: MapPin, label: 'Find Doctors', to: '/patient/find-doctors' },
    { icon: Settings, label: 'Settings', to: '/patient/settings' },
  ];

  const doctorLinks = [
    { icon: MessageSquare, label: 'Chat', to: '/doctor/chat' },
    { icon: UserPlus, label: 'Add Patient', to: '/doctor/add-patient' },
    { icon: Settings, label: 'Settings', to: '/doctor/settings' },
  ];

  const links = userType === 'patient' ? patientLinks : doctorLinks;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 z-10">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <Logo />
          </div>
          
          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9 border-2 border-healthcare-100">
              <AvatarImage src="" />
              <AvatarFallback className="bg-healthcare-100 text-healthcare-700">
                {userType === 'patient' ? 'P' : 'D'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex md:w-64 border-r border-gray-100 bg-white flex-col">
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="mb-6 pt-2">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 px-3">
                Menu
              </p>
              <nav className="space-y-1">
                {links.map((link) => (
                  <SidebarLink
                    key={link.label}
                    icon={link.icon}
                    label={link.label}
                    to={link.to}
                  />
                ))}
              </nav>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-100">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeSidebar}
              />
              
              <motion.div 
                className="fixed inset-y-0 left-0 w-64 bg-white z-50 flex flex-col md:hidden shadow-xl"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <Logo />
                  <Button variant="ghost" size="icon" onClick={closeSidebar}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="p-4 flex-1 overflow-y-auto">
                  <div className="mb-6">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 px-3">
                      Menu
                    </p>
                    <nav className="space-y-1">
                      {links.map((link) => (
                        <SidebarLink
                          key={link.label}
                          icon={link.icon}
                          label={link.label}
                          to={link.to}
                          onClick={closeSidebar}
                        />
                      ))}
                    </nav>
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-100">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
