
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface Workspace {
  id: string;
  name: string;
  address: string;
}

interface WorkspacesInputProps {
  value: Workspace[];
  onChange: (workspaces: Workspace[]) => void;
}

const WorkspacesInput: React.FC<WorkspacesInputProps> = ({ value, onChange }) => {
  const [currentName, setCurrentName] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [error, setError] = useState('');

  const addWorkspace = () => {
    if (!currentName.trim() || !currentAddress.trim()) {
      setError('Please enter both name and address for the workspace');
      return;
    }

    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name: currentName.trim(),
      address: currentAddress.trim(),
    };

    onChange([...value, newWorkspace]);
    setCurrentName('');
    setCurrentAddress('');
    setError('');
  };

  const removeWorkspace = (id: string) => {
    onChange(value.filter(workspace => workspace.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <AnimatePresence>
          {value.map((workspace) => (
            <motion.div
              key={workspace.id}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-2 p-3 bg-healthcare-50 rounded-lg border border-healthcare-100"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-800">{workspace.name}</p>
                <p className="text-sm text-gray-600">{workspace.address}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                onClick={() => removeWorkspace(workspace.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="space-y-3 pt-2">
        <div>
          <Input
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            placeholder="Workspace name (e.g., City Hospital)"
            className="mb-2"
          />
          <Input
            value={currentAddress}
            onChange={(e) => setCurrentAddress(e.target.value)}
            placeholder="Workspace address"
          />
        </div>
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full flex items-center justify-center hover:bg-healthcare-50 hover:text-healthcare-700 hover:border-healthcare-200"
          onClick={addWorkspace}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Workspace
        </Button>
      </div>
    </div>
  );
};

export default WorkspacesInput;
