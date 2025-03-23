
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthLayout from '@/components/layout/AuthLayout';
import { Eye, EyeOff, ChevronLeft, Loader2 } from 'lucide-react';
import WorkspacesInput from '@/components/WorkspacesInput';
import { toast } from 'sonner';

interface Workspace {
  id: string;
  name: string;
  address: string;
}

const RegisterDoctor = () => {
  const navigate = useNavigate();
  
  // Personal info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Professional info
  const [licenseNumber, setLicenseNumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  
  // Account
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentTab, setCurrentTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (!licenseNumber) {
      toast.error('Please enter your license number');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Registration successful! You can now log in.');
      navigate('/');
    }, 1500);
  };

  return (
    <AuthLayout title="Register as a Doctor" subtitle="Create your healthcare provider account">
      <Tabs 
        value={currentTab} 
        onValueChange={setCurrentTab}
        className="relative"
      >
        <div className="px-6 pt-6">
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-4 top-4 flex items-center text-gray-500 hover:text-gray-700"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          
          <TabsList className="grid grid-cols-3 mb-6 mt-6">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
        </div>
        
        <form onSubmit={handleSubmit}>
          <TabsContent value="personal" className="p-6 space-y-4 mt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(123) 456-7890"
              />
            </div>
            
            <Button
              type="button"
              onClick={() => setCurrentTab('professional')}
              className="w-full bg-healthcare-600 hover:bg-healthcare-700 mt-4"
            >
              Next Step
            </Button>
          </TabsContent>
          
          <TabsContent value="professional" className="p-6 space-y-4 mt-0">
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">Medical License Number *</Label>
              <Input
                id="licenseNumber"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="ML123456"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="Cardiology, Family Medicine, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label>Workspaces (Hospitals/Clinics)</Label>
              <WorkspacesInput 
                value={workspaces}
                onChange={setWorkspaces}
              />
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentTab('personal')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => setCurrentTab('account')}
                className="flex-1 bg-healthcare-600 hover:bg-healthcare-700"
              >
                Next Step
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="account" className="p-6 space-y-4 mt-0">
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="dr.johndoe"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentTab('professional')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-healthcare-600 hover:bg-healthcare-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            </div>
          </TabsContent>
        </form>
      </Tabs>
    </AuthLayout>
  );
};

export default RegisterDoctor;
