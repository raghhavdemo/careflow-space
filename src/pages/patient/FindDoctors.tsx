
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import GlassCard from '@/components/ui-components/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Search, Heart } from 'lucide-react';
import PageTransition from '@/components/ui-components/PageTransition';
import { toast } from 'sonner';

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Emma Wilson',
    specialty: 'Cardiologist',
    hospital: 'City General Hospital',
    address: '123 Medical Dr, New York, NY',
    distance: '1.2 miles away',
    rating: 4.9,
    reviews: 142,
    saved: false,
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    hospital: 'Westside Medical Center',
    address: '456 Health Ave, New York, NY',
    distance: '2.5 miles away',
    rating: 4.7,
    reviews: 89,
    saved: false,
  },
  {
    id: 3,
    name: 'Dr. Sarah Johnson',
    specialty: 'Neurologist',
    hospital: 'Metropolitan Hospital',
    address: '789 Wellness Blvd, New York, NY',
    distance: '3.8 miles away',
    rating: 4.8,
    reviews: 113,
    saved: true,
  },
  {
    id: 4,
    name: 'Dr. James Rodriguez',
    specialty: 'Orthopedic Surgeon',
    hospital: 'Harbor View Medical Center',
    address: '321 Healthcare St, New York, NY',
    distance: '4.1 miles away',
    rating: 4.6,
    reviews: 78,
    saved: false,
  },
  {
    id: 5,
    name: 'Dr. Lisa Wang',
    specialty: 'Pediatrician',
    hospital: 'Children\'s General Hospital',
    address: '567 Child Care Ave, New York, NY',
    distance: '1.8 miles away',
    rating: 4.9,
    reviews: 156,
    saved: false,
  },
];

const FindDoctors = () => {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');

  const toggleSaved = (id: number) => {
    setDoctors(doctors.map(doctor => 
      doctor.id === id 
        ? { ...doctor, saved: !doctor.saved } 
        : doctor
    ));
    
    const doctor = doctors.find(d => d.id === id);
    if (doctor) {
      toast.success(
        doctor.saved 
          ? `Removed Dr. ${doctor.name.split(' ')[1]} from saved doctors` 
          : `Added Dr. ${doctor.name.split(' ')[1]} to saved doctors`
      );
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = specialty ? doctor.specialty === specialty : true;
    
    return matchesSearch && matchesSpecialty;
  });

  const uniqueSpecialties = Array.from(new Set(doctors.map(d => d.specialty)));

  return (
    <DashboardLayout userType="patient">
      <PageTransition>
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-2xl font-semibold mb-2">Find Doctors</h1>
          <p className="text-gray-500 mb-6">
            Search for healthcare providers in your area
          </p>
          
          <GlassCard className="p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search Doctors</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="Doctor name, specialty, or hospital"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Specialties</SelectItem>
                    {uniqueSpecialties.map(specialty => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Your Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="location"
                    placeholder="Enter your location"
                    defaultValue="New York, NY"
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
          
          <div className="space-y-4">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`
                            ${doctor.saved 
                              ? 'text-red-500 hover:text-red-600 hover:bg-red-50' 
                              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}
                          `}
                          onClick={() => toggleSaved(doctor.id)}
                        >
                          <Heart className={`h-5 w-5 ${doctor.saved ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      
                      <p className="text-gray-600 mt-1">{doctor.hospital}</p>
                      
                      <div className="mt-3 flex items-center gap-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {doctor.address}
                        </div>
                        <div className="text-sm text-gray-500">
                          {doctor.distance}
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
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No doctors found matching your search criteria.</p>
                <Button 
                  variant="link" 
                  className="mt-2 text-healthcare-600"
                  onClick={() => {
                    setSearchTerm('');
                    setSpecialty('');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default FindDoctors;
