
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import GlassCard from '@/components/ui-components/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, EyeOff, User, Lock, Bell, Shield, Upload, Building, MapPin, Plus } from 'lucide-react';
import WorkspacesInput from '@/components/WorkspacesInput';
import PageTransition from '@/components/ui-components/PageTransition';
import { toast } from 'sonner';

interface Workspace {
  id: string;
  name: string;
  address: string;
}

const DoctorSettings = () => {
  // Profile
  const [firstName, setFirstName] = useState('Dr. Michael');
  const [lastName, setLastName] = useState('Wilson');
  const [email, setEmail] = useState('dr.wilson@example.com');
  const [phone, setPhone] = useState('(123) 456-7890');
  const [specialization, setSpecialization] = useState('Cardiology');
  const [licenseNumber, setLicenseNumber] = useState('ML123456');
  
  // Workspaces
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: '1',
      name: 'City General Hospital',
      address: '123 Medical Dr, New York, NY'
    },
    {
      id: '2',
      name: 'Wilson Health Clinic',
      address: '456 Health St, New York, NY'
    }
  ]);
  
  // Password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [patientUpdates, setPatientUpdates] = useState(true);
  const [appointmentNotifications, setAppointmentNotifications] = useState(true);
  
  // Save handlers
  const handleSaveProfile = () => {
    toast.success('Profile updated successfully');
  };
  
  const handleSaveWorkspaces = () => {
    toast.success('Workspaces updated successfully');
  };
  
  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill all password fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    toast.success('Password changed successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  const handleSaveNotifications = () => {
    toast.success('Notification preferences updated');
  };

  return (
    <DashboardLayout userType="doctor">
      <PageTransition>
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl font-semibold mb-2">Account Settings</h1>
          <p className="text-gray-500 mb-6">
            Manage your account preferences and information
          </p>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="workspaces" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>Workspaces</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <GlassCard className="p-6">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex flex-col items-center gap-3">
                    <Avatar className="h-24 w-24 border-2 border-healthcare-100">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-2xl bg-healthcare-100 text-healthcare-700">
                        MW
                      </AvatarFallback>
                    </Avatar>
                    
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Upload className="h-3 w-3" />
                      <span>Upload</span>
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input
                        id="specialization"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Medical License Number</Label>
                      <Input
                        id="licenseNumber"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      className="bg-healthcare-600 hover:bg-healthcare-700 mt-2"
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
            
            <TabsContent value="workspaces">
              <GlassCard className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="h-5 w-5 text-healthcare-600" />
                    <h3 className="text-lg font-medium">Manage Workspaces</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-500">
                      Add and manage the locations where you provide healthcare services.
                    </p>
                    
                    <WorkspacesInput
                      value={workspaces}
                      onChange={setWorkspaces}
                    />
                    
                    <Button 
                      className="bg-healthcare-600 hover:bg-healthcare-700 mt-4"
                      onClick={handleSaveWorkspaces}
                    >
                      Save Workspaces
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
            
            <TabsContent value="security">
              <GlassCard className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-5 w-5 text-healthcare-600" />
                    <h3 className="text-lg font-medium">Password & Security</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pr-10"
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
                    
                    <Button 
                      className="bg-healthcare-600 hover:bg-healthcare-700 mt-2"
                      onClick={handleChangePassword}
                    >
                      Change Password
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
            
            <TabsContent value="notifications">
              <GlassCard className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Bell className="h-5 w-5 text-healthcare-600" />
                    <h3 className="text-lg font-medium">Notification Preferences</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive email updates about your practice</p>
                      </div>
                      <Switch 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Get text messages for urgent matters</p>
                      </div>
                      <Switch 
                        checked={smsNotifications} 
                        onCheckedChange={setSmsNotifications} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">Patient Updates</p>
                        <p className="text-sm text-gray-500">Get notified when patients submit new information</p>
                      </div>
                      <Switch 
                        checked={patientUpdates} 
                        onCheckedChange={setPatientUpdates} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">Appointment Notifications</p>
                        <p className="text-sm text-gray-500">Notifications about scheduled appointments</p>
                      </div>
                      <Switch 
                        checked={appointmentNotifications} 
                        onCheckedChange={setAppointmentNotifications} 
                      />
                    </div>
                    
                    <Button 
                      className="bg-healthcare-600 hover:bg-healthcare-700 mt-2"
                      onClick={handleSaveNotifications}
                    >
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default DoctorSettings;
