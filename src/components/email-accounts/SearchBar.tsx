
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <Input 
        type="text" 
        placeholder="Search email accounts..." 
        className="pl-10 max-w-md bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
