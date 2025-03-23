
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageTransition from '@/components/ui-components/PageTransition';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui-components/GlassCard';
import { Send, Loader2, AlertCircle, List, Brain, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'system' | 'bot';
  timestamp: Date;
};

type SymptomResult = {
  disease: string;
  probability: number;
  description: string;
  recommendations: string[];
};

const mockDiseaseResults: Record<string, SymptomResult[]> = {
  'fever headache': [
    {
      disease: 'Common Cold',
      probability: 0.75,
      description: 'A viral infectious disease of the upper respiratory tract that primarily affects the nose.',
      recommendations: ['Rest', 'Stay hydrated', 'Over-the-counter pain relievers']
    },
    {
      disease: 'Influenza',
      probability: 0.62,
      description: 'A viral infection that attacks your respiratory system — your nose, throat, and lungs.',
      recommendations: ['Antiviral medications', 'Rest', 'Fluids', 'Pain relievers']
    }
  ],
  'cough chest pain': [
    {
      disease: 'Bronchitis',
      probability: 0.82,
      description: 'Inflammation of the lining of your bronchial tubes, which carry air to and from your lungs.',
      recommendations: ['Rest', 'Drink fluids', 'Use a humidifier', 'Avoid lung irritants']
    },
    {
      disease: 'Pneumonia',
      probability: 0.58,
      description: 'Infection that inflames air sacs in one or both lungs, which may fill with fluid.',
      recommendations: ['Antibiotics for bacterial pneumonia', 'Cough medicine', 'Fever reducers', 'Rest']
    }
  ],
  'rash itching': [
    {
      disease: 'Contact Dermatitis',
      probability: 0.88,
      description: 'A red, itchy rash caused by direct contact with a substance or an allergic reaction to it.',
      recommendations: ['Avoid irritant', 'Apply anti-itch cream', 'Use cool, wet compresses', 'Take antihistamines']
    },
    {
      disease: 'Eczema',
      probability: 0.67,
      description: 'A condition where patches of skin become inflamed, itchy, red, cracked, and rough.',
      recommendations: ['Moisturize regularly', 'Identify and avoid triggers', 'Use mild soaps', 'Take antihistamines for itching']
    }
  ]
};

const SymptomChecker = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello doctor, describe the patient\'s symptoms, and I\'ll help identify possible diagnoses.',
      role: 'bot',
      timestamp: new Date()
    }
  ]);
  const [symptomInput, setSymptomInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<SymptomResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSendSymptoms = () => {
    if (!symptomInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: symptomInput,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Find matching symptoms or use default
      const lowerCaseInput = symptomInput.toLowerCase();
      const matchedResults = Object.keys(mockDiseaseResults).find(key => 
        lowerCaseInput.includes(key)
      );
      
      const analysisResults = matchedResults 
        ? mockDiseaseResults[matchedResults]
        : [
            {
              disease: 'Unknown Condition',
              probability: 0.5,
              description: 'Based on the symptoms provided, we couldn\'t make a confident diagnosis. Please consult with a specialist for further examination.',
              recommendations: ['Detailed physical examination', 'Laboratory tests', 'Specialist consultation']
            }
          ];
      
      setResults(analysisResults);
      
      // Add bot response
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I\'ve analyzed the symptoms and have some potential diagnoses to consider. Please review the results.',
        role: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setShowResults(true);
      setSymptomInput('');
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendSymptoms();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <DashboardLayout userType="doctor">
      <PageTransition>
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-2xl font-semibold mb-2">Symptom Analyzer</h1>
          <p className="text-gray-500 mb-6">
            Input patient symptoms to receive AI-powered diagnostic suggestions
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <GlassCard className="p-0 overflow-hidden flex flex-col h-[calc(100vh-240px)]">
                <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white">
                  <Brain className="h-5 w-5 text-healthcare-600" />
                  <h3 className="font-medium text-gray-900">AI Symptom Analyzer</h3>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  <div className="space-y-4">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={cn(
                            "flex",
                            message.role === 'user' ? "justify-end" : "justify-start"
                          )}
                        >
                          <div 
                            className={cn(
                              "max-w-[85%] rounded-2xl px-4 py-2 break-words",
                              message.role === 'user' 
                                ? "bg-healthcare-600 text-white rounded-tr-none" 
                                : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                            )}
                          >
                            <p>{message.content}</p>
                            <p className={cn(
                              "text-xs mt-1",
                              message.role === 'user' ? "text-healthcare-100" : "text-gray-400"
                            )}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {isAnalyzing && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-white rounded-2xl rounded-tl-none px-5 py-3 border border-gray-200">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-healthcare-600" />
                            <span className="text-gray-600">Analyzing symptoms...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-100 bg-white">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <Input
                        value={symptomInput}
                        onChange={(e) => setSymptomInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Describe patient symptoms..."
                        className="pr-12 bg-gray-50 focus-visible:ring-healthcare-500"
                        disabled={isAnalyzing}
                      />
                      
                      <Button 
                        size="icon" 
                        className="absolute right-1 top-1 rounded-full h-8 w-8 p-0 bg-healthcare-500 hover:bg-healthcare-600"
                        onClick={handleSendSymptoms}
                        disabled={symptomInput.trim() === '' || isAnalyzing}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
            
            <div className="lg:col-span-5">
              <AnimatePresence>
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <GlassCard className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <Stethoscope className="h-5 w-5 text-healthcare-600" />
                        <h3 className="text-lg font-medium">Diagnostic Results</h3>
                      </div>
                      
                      <div className="space-y-6">
                        {results.map((result, index) => (
                          <div 
                            key={index}
                            className="p-4 rounded-lg border border-gray-200 bg-white"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-900">{result.disease}</h4>
                              <div className="px-2 py-1 bg-healthcare-100 text-healthcare-700 rounded-full text-xs font-medium">
                                {Math.round(result.probability * 100)}% match
                              </div>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-3">{result.description}</p>
                            
                            <div>
                              <h5 className="font-medium text-gray-700 text-sm mb-2 flex items-center gap-1">
                                <List className="h-4 w-4" />
                                Recommendations
                              </h5>
                              <ul className="list-disc list-inside text-sm text-gray-600 pl-1 space-y-1">
                                {result.recommendations.map((rec, i) => (
                                  <li key={i}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                        <p className="text-xs text-gray-500">
                          These results are AI-generated suggestions based on the symptoms provided. 
                          Always use professional medical judgment and follow proper diagnostic protocols.
                        </p>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default SymptomChecker;
