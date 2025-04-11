
import React from 'react';
import { 
  Plus, Search, Filter, FileText, ChevronDown, 
  Settings, MoreHorizontal, Edit, Copy, Trash2,
  Tag, ThumbsUp, MessageCircle, Calendar, RefreshCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const templatesData = [
  {
    id: 1,
    name: 'Initial Outreach',
    description: 'First contact with potential clients',
    category: 'Sales',
    tags: ['Cold Outreach', 'Introduction'],
    responseRate: 42,
    lastUsed: 'Apr 10, 2025',
    lastModified: 'Apr 05, 2025'
  },
  {
    id: 2,
    name: 'Follow-up #1',
    description: 'First follow-up after no response',
    category: 'Sales',
    tags: ['Follow-up', 'Reminder'],
    responseRate: 31,
    lastUsed: 'Apr 12, 2025',
    lastModified: 'Mar 29, 2025'
  },
  {
    id: 3,
    name: 'Demo Request',
    description: 'Request for product demonstration',
    category: 'Marketing',
    tags: ['Demo', 'Product'],
    responseRate: 28,
    lastUsed: 'Apr 08, 2025',
    lastModified: 'Apr 01, 2025'
  },
  {
    id: 4,
    name: 'Monthly Newsletter',
    description: 'Regular updates for customers',
    category: 'Newsletter',
    tags: ['Updates', 'Monthly'],
    responseRate: 18,
    lastUsed: 'Apr 01, 2025',
    lastModified: 'Mar 28, 2025'
  },
  {
    id: 5,
    name: 'Meeting Confirmation',
    description: 'Confirm scheduled meetings',
    category: 'Admin',
    tags: ['Meeting', 'Schedule'],
    responseRate: 65,
    lastUsed: 'Apr 15, 2025',
    lastModified: 'Feb 20, 2025'
  },
  {
    id: 6,
    name: 'Post-Demo Follow-up',
    description: 'Follow-up after product demonstration',
    category: 'Sales',
    tags: ['Follow-up', 'Demo'],
    responseRate: 52,
    lastUsed: 'Apr 07, 2025',
    lastModified: 'Mar 15, 2025'
  }
];

const Templates = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-instantly-dark">Templates</h1>
          <p className="text-gray-500">Create and manage your email templates</p>
        </div>
        <div>
          <Button className="instantly-btn-primary flex items-center gap-2">
            <Plus size={16} />
            <span>New Template</span>
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="text" 
            placeholder="Search templates..." 
            className="pl-10 max-w-md bg-white"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            <span>Filter</span>
            <ChevronDown size={14} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Tag size={16} />
                <span>Categories</span>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Sales</DropdownMenuItem>
              <DropdownMenuItem>Marketing</DropdownMenuItem>
              <DropdownMenuItem>Newsletter</DropdownMenuItem>
              <DropdownMenuItem>Admin</DropdownMenuItem>
              <DropdownMenuItem>Other</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Settings size={16} />
            <span>View</span>
            <ChevronDown size={14} />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-5">
        {templatesData.map((template) => (
          <Card key={template.id} className="instantly-card">
            <CardContent className="p-0">
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-instantly-dark">{template.name}</h3>
                    <p className="text-sm text-gray-500">{template.description}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <Edit size={14} />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <Copy size={14} />
                        <span>Duplicate</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-instantly-red">
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-instantly-blue/10 hover:bg-instantly-blue/20 text-instantly-blue">
                    {template.category}
                  </Badge>
                  {template.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-gray-500">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <ThumbsUp className="text-instantly-green" size={15} />
                    <span className="text-gray-500">Response Rate:</span>
                    <span className="font-medium">{template.responseRate}%</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MessageCircle className="text-instantly-blue" size={15} />
                    <span className="text-gray-500">Last Used:</span>
                    <span className="font-medium">{template.lastUsed}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <RefreshCcw className="text-instantly-orange" size={15} />
                    <span className="text-gray-500">Last Modified:</span>
                    <span className="font-medium">{template.lastModified}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex border-t border-gray-100">
                <Button className="flex-1 rounded-none rounded-bl-xl flex items-center justify-center gap-2 py-3" variant="ghost">
                  <Edit size={16} />
                  <span>Edit</span>
                </Button>
                
                <div className="w-px bg-gray-100"></div>
                
                <Button className="flex-1 rounded-none rounded-br-xl flex items-center justify-center gap-2 py-3" variant="ghost">
                  <FileText size={16} />
                  <span>Use</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Templates;
