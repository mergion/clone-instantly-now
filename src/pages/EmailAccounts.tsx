
import React, { useState } from 'react';
import { 
  Plus, Search, MoreHorizontal, AtSign, 
  Trash2, RefreshCw, Check, X
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

type EmailAccount = {
  id: number;
  email: string;
  provider: 'gmail' | 'outlook' | 'other';
  status: 'connected' | 'failed' | 'pending';
  dailyLimit: number;
  sentToday: number;
  lastSynced: string;
};

const EmailAccounts = () => {
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([
    {
      id: 1,
      email: 'john.doe@gmail.com',
      provider: 'gmail',
      status: 'connected',
      dailyLimit: 500,
      sentToday: 125,
      lastSynced: '1 hour ago'
    },
    {
      id: 2,
      email: 'marketing@company.com',
      provider: 'outlook',
      status: 'connected',
      dailyLimit: 400,
      sentToday: 220,
      lastSynced: '30 minutes ago'
    }
  ]);
  
  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleAddAccount = () => {
    if (!newEmail || !newEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!newPassword) {
      toast.error('Please enter your password');
      return;
    }

    const provider = newEmail.includes('gmail') ? 'gmail' : 
                      newEmail.includes('outlook') ? 'outlook' : 'other';
    
    const newAccount: EmailAccount = {
      id: emailAccounts.length + 1,
      email: newEmail,
      provider: provider,
      status: 'connected',
      dailyLimit: 500,
      sentToday: 0,
      lastSynced: 'Just now'
    };

    setEmailAccounts([...emailAccounts, newAccount]);
    setNewEmail('');
    setNewPassword('');
    setOpen(false);
    toast.success('Email account added successfully');
  };

  const handleDeleteAccount = (id: number) => {
    setEmailAccounts(emailAccounts.filter(account => account.id !== id));
    toast.success('Email account removed successfully');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-instantly-dark">Email Accounts</h1>
          <p className="text-gray-500">Manage your connected email accounts</p>
        </div>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="instantly-btn-primary flex items-center gap-2">
                <Plus size={16} />
                <span>Add Email Account</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Email Account</DialogTitle>
                <DialogDescription>
                  Connect your email account to start sending campaigns.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password or App Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">For Gmail, we recommend using an app password.</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleAddAccount}>Connect Account</Button>
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
            placeholder="Search email accounts..." 
            className="pl-10 max-w-md bg-white"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Daily Limit</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent Today</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Synced</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {emailAccounts.map((account) => (
                <tr key={account.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-instantly-blue/10 flex items-center justify-center">
                        <AtSign className="text-instantly-blue" size={16} />
                      </div>
                      <span className="font-medium">{account.email}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 capitalize">{account.provider}</td>
                  <td className="px-5 py-4">
                    <Badge 
                      className={`${
                        account.status === 'connected' 
                          ? 'bg-instantly-green/10 text-instantly-green hover:bg-instantly-green/20' 
                          : account.status === 'pending' 
                          ? 'bg-instantly-orange/10 text-instantly-orange hover:bg-instantly-orange/20'
                          : 'bg-instantly-red/10 text-instantly-red hover:bg-instantly-red/20'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        {account.status === 'connected' ? <Check size={12} /> : 
                         account.status === 'pending' ? <RefreshCw size={12} /> : <X size={12} />}
                        {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                      </span>
                    </Badge>
                  </td>
                  <td className="px-5 py-4">{account.dailyLimit}</td>
                  <td className="px-5 py-4">
                    <span className={account.sentToday > (account.dailyLimit * 0.8) ? 'text-instantly-orange' : ''}>
                      {account.sentToday} / {account.dailyLimit}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{account.lastSynced}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <RefreshCw size={16} />
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleDeleteAccount(account.id)} className="flex items-center gap-2 cursor-pointer text-instantly-red">
                            <Trash2 size={14} />
                            <span>Remove Account</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
              {emailAccounts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-gray-500">
                    <AtSign className="mx-auto mb-2" size={24} />
                    <p>No email accounts added yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => setOpen(true)}
                    >
                      Add Email Account
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

export default EmailAccounts;
