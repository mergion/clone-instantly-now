
import React, { useState } from 'react';
import { 
  Plus, Search, MoreHorizontal, Users, 
  Upload, Download, Trash2, Edit 
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

type ContactList = {
  id: number;
  name: string;
  contacts: number;
  tags: string[];
  created: string;
};

const Contacts = () => {
  const [contactLists, setContactLists] = useState<ContactList[]>([
    {
      id: 1,
      name: 'Sales Prospects Q2',
      contacts: 1250,
      tags: ['sales', 'prospects'],
      created: 'Apr 12, 2025'
    },
    {
      id: 2,
      name: 'Marketing Subscribers',
      contacts: 4820,
      tags: ['marketing', 'newsletter'],
      created: 'Mar 15, 2025'
    }
  ]);
  
  const [open, setOpen] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleAddList = () => {
    if (!newListName) {
      toast.error('Please enter a list name');
      return;
    }

    const newList: ContactList = {
      id: contactLists.length + 1,
      name: newListName,
      contacts: 0,
      tags: [],
      created: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    };

    setContactLists([...contactLists, newList]);
    setNewListName('');
    setOpen(false);
    toast.success('Contact list created successfully');
  };

  const handleDeleteList = (id: number) => {
    setContactLists(contactLists.filter(list => list.id !== id));
    toast.success('Contact list deleted successfully');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-instantly-dark">Contacts</h1>
          <p className="text-gray-500">Manage your lead lists and contacts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload size={16} />
            <span>Import Contacts</span>
          </Button>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="instantly-btn-primary flex items-center gap-2">
                <Plus size={16} />
                <span>New List</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Contact List</DialogTitle>
                <DialogDescription>
                  Create a new list to organize your contacts
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="listName">List Name</Label>
                  <Input 
                    id="listName" 
                    placeholder="Enter list name" 
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleAddList}>Create List</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="text" 
            placeholder="Search contact lists..." 
            className="pl-10 max-w-md bg-white"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">List Name</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contacts</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contactLists.map((list) => (
                <tr key={list.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-instantly-blue/10 flex items-center justify-center">
                        <Users className="text-instantly-blue" size={16} />
                      </div>
                      <span className="font-medium">{list.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">{list.contacts.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {list.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100">
                          {tag}
                        </Badge>
                      ))}
                      {list.tags.length === 0 && <span className="text-gray-400">No tags</span>}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{list.created}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download size={16} />
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <Edit size={14} />
                            <span>Edit List</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <Upload size={14} />
                            <span>Import Contacts</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteList(list.id)} className="flex items-center gap-2 cursor-pointer text-instantly-red">
                            <Trash2 size={14} />
                            <span>Delete List</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
              {contactLists.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-gray-500">
                    <Users className="mx-auto mb-2" size={24} />
                    <p>No contact lists created yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => setOpen(true)}
                    >
                      Create New List
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
