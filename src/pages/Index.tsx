
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/layout/AuthLayout';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }
    
    // In a real app, you would validate credentials against an API
    if (userType === 'patient') {
      navigate('/patient/chat');
    } else {
      navigate('/doctor/chat');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout 
      title="Welcome to CareFlow" 
      subtitle="Sign in to access your healthcare dashboard"
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="flex w-full rounded-lg overflow-hidden">
          <Button
            type="button"
            className={`flex-1 rounded-none ${
              userType === 'patient'
                ? 'bg-healthcare-600 text-white hover:bg-healthcare-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setUserType('patient')}
          >
            Patient
          </Button>
          <Button
            type="button"
            className={`flex-1 rounded-none ${
              userType === 'doctor'
                ? 'bg-healthcare-600 text-white hover:bg-healthcare-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setUserType('doctor')}
          >
            Doctor
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <Button className="w-full bg-healthcare-600 hover:bg-healthcare-700" type="submit">
          Sign In
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Button 
              variant="link" 
              className="text-healthcare-600 hover:text-healthcare-700 p-0 h-auto"
              onClick={() => navigate(`/register-${userType}`)}
            >
              Register as a {userType}
            </Button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Index;
