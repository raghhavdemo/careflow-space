
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ChatInterface from '@/components/ChatInterface';
import PageTransition from '@/components/ui-components/PageTransition';
import { MessageSquare, Users, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import GlassCard from '@/components/ui-components/GlassCard';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

const DoctorChat = () => {
  return (
    <DashboardLayout userType="doctor">
      <PageTransition>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Patient Communication</h1>
              <p className="text-gray-500">
                Chat with patients and provide virtual consultations
              </p>
            </div>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-healthcare-50 text-healthcare-700 hover:bg-healthcare-100">
                    <Users className="mr-2 h-4 w-4" />
                    Doctor Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/doctor/symptom-checker"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-healthcare-50 to-healthcare-100 p-6 no-underline outline-none focus:shadow-md"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-healthcare-700">
                              Symptom Analyzer
                            </div>
                            <p className="text-sm leading-tight text-healthcare-700/90">
                              Input patient symptoms and get AI-powered diagnostic suggestions to aid your decision-making.
                            </p>
                            <div className="mt-4 flex items-center text-healthcare-700">
                              <span className="text-sm">Try Now</span>
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            href="#"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-healthcare-50 hover:text-healthcare-700 focus:bg-healthcare-50 focus:text-healthcare-700"
                          >
                            <div className="text-sm font-medium leading-none">Patient Records</div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              Access and manage your patients' medical records
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            href="#"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-healthcare-50 hover:text-healthcare-700 focus:bg-healthcare-50 focus:text-healthcare-700"
                          >
                            <div className="text-sm font-medium leading-none">Prescriptions</div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              Create and manage digital prescriptions
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            href="#"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-healthcare-50 hover:text-healthcare-700 focus:bg-healthcare-50 focus:text-healthcare-700"
                          >
                            <div className="text-sm font-medium leading-none">Schedule</div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              Manage your appointments and calendar
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <GlassCard className="p-0 overflow-hidden shadow-md">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-healthcare-100 p-2 rounded-full">
                      <MessageSquare className="h-4 w-4 text-healthcare-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Live Patient Chat</h3>
                      <p className="text-xs text-gray-500">Direct patient communications</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Online
                  </Badge>
                </div>
                
                <ChatInterface userType="doctor" />
              </GlassCard>
            </div>
            
            <div className="hidden xl:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard className="p-5">
                  <h3 className="font-medium text-gray-900 mb-4">Recent Patients</h3>
                  
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map(index => (
                      <div 
                        key={index}
                        className={cn(
                          "p-3 rounded-lg transition-all cursor-pointer",
                          index === 1 
                            ? "bg-healthcare-50 border border-healthcare-100" 
                            : "hover:bg-gray-50 border border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            index === 1 ? "bg-green-500" : "bg-gray-300"
                          )} />
                          <div>
                            <p className="font-medium text-gray-900">Patient {index}</p>
                            <p className="text-xs text-gray-500">
                              {index === 1 ? 'Active now' : `Last active ${index} hour${index > 1 ? 's' : ''} ago`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link 
                      to="/doctor/add-patient"
                      className="text-sm text-healthcare-600 hover:text-healthcare-700 flex items-center justify-center gap-1"
                    >
                      Add New Patient 
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default DoctorChat;
