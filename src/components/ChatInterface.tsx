
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Send, 
  Plus, 
  Paperclip, 
  Image, 
  FileText, 
  Smile, 
  ThumbsUp, 
  Heart, 
  Clock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type MessageReaction = 'like' | 'love' | null;

type MessageType = {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'bot';
  attachment?: {
    type: 'image' | 'document';
    name: string;
    url: string;
  };
  reaction?: MessageReaction;
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [attachmentType, setAttachmentType] = useState<'image' | 'document' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
      sender: 'user',
      attachment: attachmentType ? {
        type: attachmentType,
        name: `${attachmentType}-${Date.now()}.${attachmentType === 'image' ? 'jpg' : 'pdf'}`,
        url: `https://placeholder.com/${attachmentType === 'image' ? '150' : 'document'}`,
      } : undefined
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);
    setAttachmentType(null);
    setIsExpanded(false);
    
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
      
      toast({
        title: "New message",
        description: "You've received a new message",
      });
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachment = (type: 'image' | 'document') => {
    setAttachmentType(type);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    
    toast({
      title: `${type === 'image' ? 'Image' : 'Document'} selected`,
      description: "Your attachment is ready to send",
    });
  };
  
  const handleReaction = (messageId: string, reaction: MessageReaction) => {
    setMessages(prev => 
      prev.map(message => 
        message.id === messageId
          ? { ...message, reaction: message.reaction === reaction ? null : reaction }
          : message
      )
    );
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
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-xs">History</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View conversation history</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
                    "max-w-[80%] rounded-2xl px-4 py-2 break-words relative group",
                    message.sender === 'user' 
                      ? "bg-healthcare-600 text-white rounded-tr-none" 
                      : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                  )}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  
                  {message.attachment && (
                    <div className="mt-2 p-2 rounded-lg bg-black/5 flex items-center gap-2 text-sm">
                      {message.attachment.type === 'image' ? (
                        <Image className="h-4 w-4" />
                      ) : (
                        <FileText className="h-4 w-4" />
                      )}
                      <span>{message.attachment.name}</span>
                    </div>
                  )}
                  
                  <div className={cn(
                    "flex justify-between items-center mt-1",
                    message.sender === 'user' ? "text-healthcare-100" : "text-gray-400"
                  )}>
                    <span className="text-xs">{formatTime(message.timestamp)}</span>
                    
                    {message.sender === 'bot' && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 ml-2">
                        <button 
                          onClick={() => handleReaction(message.id, 'like')}
                          className={cn(
                            "p-1 rounded-full hover:bg-gray-100 transition-colors",
                            message.reaction === 'like' ? "text-blue-500" : "text-gray-400"
                          )}
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </button>
                        <button 
                          onClick={() => handleReaction(message.id, 'love')}
                          className={cn(
                            "p-1 rounded-full hover:bg-gray-100 transition-colors",
                            message.reaction === 'love' ? "text-red-500" : "text-gray-400"
                          )}
                        >
                          <Heart className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
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
        {isExpanded ? (
          <Tabs defaultValue="message" className="mb-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="message">Message</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
            </TabsList>
            <TabsContent value="message">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="min-h-[100px] bg-gray-50 rounded-lg focus-visible:ring-healthcare-500 resize-none"
              />
            </TabsContent>
            <TabsContent value="attachments">
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => handleAttachment('image')}
                  className="p-4 border border-dashed border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-2"
                >
                  <Image className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Image</span>
                </button>
                <button 
                  onClick={() => handleAttachment('document')}
                  className="p-4 border border-dashed border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-2"
                >
                  <FileText className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Document</span>
                </button>
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                accept={attachmentType === 'image' ? 'image/*' : 'application/pdf'}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full"
                    onClick={() => setIsExpanded(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Expand editor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full"
                    onClick={() => handleAttachment('image')}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add attachment</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
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
        )}
        
        {isExpanded && (
          <div className="flex justify-between items-center mt-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsExpanded(false)}
              className="text-gray-500"
            >
              Cancel
            </Button>
            
            <Button 
              size="sm" 
              className="bg-healthcare-500 hover:bg-healthcare-600"
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ''}
            >
              <Send className="h-4 w-4 mr-1" />
              Send
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
