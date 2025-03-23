
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageTransition from '@/components/ui-components/PageTransition';
import GlassCard from '@/components/ui-components/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPlus, Loader2, Search, Check, X } from 'lucide-react';
import { toast } from 'sonner';

// Mock patient data for search
const mockPatients = [
  {
    id: 1,
    username: 'johndoe123',
    name: 'John Doe',
    age: 34,
    email: 'john.doe@example.com',
  },
  {
    id: 2,
    username: 'sarahsmith',
    name: 'Sarah Smith',
    age: 28,
    email: 'sarah.smith@example.com',
  },
  {
    id: 3,
    username: 'michaeljohnson',
    name: 'Michael Johnson',
    age: 45,
    email: 'michael.j@example.com',
  }
];

const AddPatient = () => {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState<typeof mockPatients>([]);
  const [selectedPatient, setSelectedPatient] = useState<(typeof mockPatients)[0] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!username.trim()) {
      toast.error('Please enter a username to search');
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = mockPatients.filter(patient => 
        patient.username.toLowerCase().includes(username.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
      
      if (results.length === 0) {
        toast.error('No patients found with that username');
      }
    }, 1000);
  };

  const handleSelectPatient = (patient: typeof mockPatients[0]) => {
    setSelectedPatient(patient);
  };

  const handleAddPatient = () => {
    if (!selectedPatient) return;
    
    setIsAdding(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAdding(false);
      toast.success(`${selectedPatient.name} has been added as your patient`);
      
      // Reset form
      setUsername('');
      setSearchResults([]);
      setSelectedPatient(null);
      setHasSearched(false);
    }, 1500);
  };

  return (
    <DashboardLayout userType="doctor">
      <PageTransition>
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl font-semibold mb-2">Add New Patient</h1>
          <p className="text-gray-500 mb-6">
            Add a patient to your care list using their username
          </p>
          
          <GlassCard className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-6">
                <UserPlus className="h-5 w-5 text-healthcare-600" />
                <h3 className="text-lg font-medium">Find Patient by Username</h3>
              </div>
              
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter patient username"
                    className="pl-9"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearch();
                    }}
                  />
                </div>
                
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching || !username.trim()}
                  className="bg-healthcare-600 hover:bg-healthcare-700"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
            </div>
            
            {hasSearched && (
              <>
                {searchResults.length > 0 ? (
                  <div className="space-y-6">
                    <h4 className="font-medium text-gray-700">Search Results</h4>
                    
                    <div className="space-y-4">
                      {searchResults.map((patient) => (
                        <div 
                          key={patient.id}
                          className={`p-4 border rounded-lg transition-all cursor-pointer ${
                            selectedPatient?.id === patient.id
                              ? 'border-healthcare-400 bg-healthcare-50'
                              : 'border-gray-200 hover:border-healthcare-200 hover:bg-gray-50'
                          }`}
                          onClick={() => handleSelectPatient(patient)}
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 border-2 border-healthcare-100">
                              <AvatarImage src="" />
                              <AvatarFallback className="bg-healthcare-100 text-healthcare-700">
                                {patient.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-gray-900">{patient.name}</h5>
                                {selectedPatient?.id === patient.id && (
                                  <Check className="h-5 w-5 text-healthcare-600" />
                                )}
                              </div>
                              <p className="text-gray-500">@{patient.username}</p>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <span>Age: {patient.age}</span>
                                <span>{patient.email}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      className="w-full bg-healthcare-600 hover:bg-healthcare-700"
                      disabled={!selectedPatient || isAdding}
                      onClick={handleAddPatient}
                    >
                      {isAdding ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Adding Patient...
                        </>
                      ) : (
                        "Add Selected Patient"
                      )}
                    </Button>
                  </div>
                ) : (
                  !isSearching && (
                    <div className="text-center py-8">
                      <X className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <h4 className="text-gray-500 font-medium">No patients found</h4>
                      <p className="text-gray-400 text-sm mt-1">
                        Try searching with a different username
                      </p>
                    </div>
                  )
                )}
              </>
            )}
          </GlassCard>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default AddPatient;
