
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ChatInterface from '@/components/ChatInterface';
import PageTransition from '@/components/ui-components/PageTransition';

const DoctorChat = () => {
  return (
    <DashboardLayout userType="doctor">
      <PageTransition>
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-2xl font-semibold mb-6">Patient Communication</h1>
          <p className="text-gray-500 mb-6">
            Chat with patients and provide virtual consultations.
          </p>
          
          <ChatInterface userType="doctor" />
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default DoctorChat;
