
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Plus, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type MessageType = {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'bot';
};

interface ChatInterfaceProps {
  userType: 'patient' | 'doctor';
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ userType }) => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: userType === 'patient' 
        ? 'Hello! How can I help you today?' 
        : 'Hi doctor! You can review your patient conversations here.',
      timestamp: new Date(),
      sender: 'bot'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      timestamp: new Date(),
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate a response after a delay
    setTimeout(() => {
      const responseMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: getRandomResponse(inputValue),
        timestamp: new Date(),
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getRandomResponse = (message: string): string => {
    const responses = [
      "I understand your concern. Let me help you with that.",
      "Thank you for sharing that information. Is there anything else you'd like to add?",
      "I've noted that down. Let me check what we can do about it.",
      "That's good to know. Please tell me more about your situation.",
      "I see. Have you experienced this before?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[calc(100vh-132px)]">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-healthcare-100">
            <AvatarImage src="" />
            <AvatarFallback className="bg-healthcare-100 text-healthcare-700">
              {userType === 'patient' ? 'HC' : 'P'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-gray-900">
              {userType === 'patient' ? 'Healthcare Assistant' : 'Patient Conversation'}
            </h3>
            <p className="text-xs text-gray-500">
              {userType === 'patient' ? 'Always here to help' : 'Direct patient communication'}
            </p>
          </div>
        </div>
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
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div 
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2 break-words",
                    message.sender === 'user' 
                      ? "bg-healthcare-600 text-white rounded-tr-none" 
                      : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                  )}
                >
                  <p>{message.content}</p>
                  <p className={cn(
                    "text-xs mt-1",
                    message.sender === 'user' ? "text-healthcare-100" : "text-gray-400"
                  )}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 border border-gray-200">
                <div className="flex space-x-1 items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-150"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-300"></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon" className="rounded-full">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="pr-12 bg-gray-50 rounded-full focus-visible:ring-healthcare-500"
            />
            
            <Button 
              size="icon" 
              className="absolute right-1 top-1 rounded-full h-8 w-8 p-0 bg-healthcare-500 hover:bg-healthcare-600"
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ''}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
