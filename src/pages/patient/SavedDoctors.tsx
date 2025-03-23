
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import GlassCard from '@/components/ui-components/GlassCard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';
import PageTransition from '@/components/ui-components/PageTransition';

// Mock data for saved doctors
const savedDoctors = [
  {
    id: 1,
    name: 'Dr. Emma Wilson',
    specialty: 'Cardiologist',
    hospital: 'City General Hospital',
    address: '123 Medical Dr, New York, NY',
    phone: '(555) 123-4567',
    email: 'dr.wilson@example.com',
    rating: 4.9,
    reviews: 142,
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    hospital: 'Westside Medical Center',
    address: '456 Health Ave, New York, NY',
    phone: '(555) 987-6543',
    email: 'dr.chen@example.com',
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 3,
    name: 'Dr. Sarah Johnson',
    specialty: 'Neurologist',
    hospital: 'Metropolitan Hospital',
    address: '789 Wellness Blvd, New York, NY',
    phone: '(555) 456-7890',
    email: 'dr.johnson@example.com',
    rating: 4.8,
    reviews: 113,
  },
];

const SavedDoctors = () => {
  return (
    <DashboardLayout userType="patient">
      <PageTransition>
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-2xl font-semibold mb-2">Saved Doctors</h1>
          <p className="text-gray-500 mb-6">
            Your list of favorite healthcare providers
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {savedDoctors.map((doctor) => (
              <GlassCard key={doctor.id} className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 border-2 border-healthcare-100">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg bg-healthcare-100 text-healthcare-700">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
                        <p className="text-healthcare-600 font-medium text-sm">{doctor.specialty}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Heart className="h-5 w-5 fill-current" />
                      </Button>
                    </div>
                    
                    <p className="text-gray-600 mt-1">{doctor.hospital}</p>
                    
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {doctor.address}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {doctor.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {doctor.email}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-yellow-500 flex items-center">
                          <span className="mr-1">★</span>
                          <span className="font-medium">{doctor.rating}</span>
                        </div>
                        <span className="mx-1 text-gray-400">•</span>
                        <span className="text-gray-500 text-sm">{doctor.reviews} reviews</span>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="bg-healthcare-600 hover:bg-healthcare-700"
                      >
                        Schedule Visit
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default SavedDoctors;
