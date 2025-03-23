
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ChatInterface from '@/components/ChatInterface';
import PageTransition from '@/components/ui-components/PageTransition';

const PatientChat = () => {
  return (
    <DashboardLayout userType="patient">
      <PageTransition>
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-2xl font-semibold mb-6">Healthcare Assistant</h1>
          <p className="text-gray-500 mb-6">
            Chat with our virtual assistant to get quick answers and support.
          </p>
          
          <ChatInterface userType="patient" />
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default PatientChat;
