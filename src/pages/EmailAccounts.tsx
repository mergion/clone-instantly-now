
import React, { useState } from 'react';
import { 
  Plus, Search, MoreHorizontal, AtSign, 
  Trash2, RefreshCw, Check, X, Download
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from 'sonner';

type EmailAccount = {
  id: number;
  email: string;
  provider: 'gmail' | 'outlook' | 'other';
  status: 'connected' | 'failed' | 'pending';
  dailyLimit: number;
  sentToday: number;
  lastSynced: string;
  selected?: boolean;
  healthScore: number;
};

const EmailAccounts = () => {
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([
    {
      id: 1,
      email: 'john.doe@gmail.com',
      provider: 'gmail',
      status: 'connected',
      dailyLimit: 500,
      sentToday: 0,
      lastSynced: '1 hour ago',
      selected: true,
      healthScore: 96
    },
    {
      id: 2,
      email: 'marketing@company.com',
      provider: 'gmail',
      status: 'connected',
      dailyLimit: 400,
      sentToday: 0,
      lastSynced: '30 minutes ago',
      selected: true,
      healthScore: 100
    }
  ]);
  
  const [open, setOpen] = useState(false);
  const [importLeadsOpen, setImportLeadsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleGoogleAuth = () => {
    // In a real application, this would redirect to Google OAuth
    toast.info('Redirecting to Google authentication...');
    
    // Simulate successful OAuth
    setTimeout(() => {
      const newAccount: EmailAccount = {
        id: emailAccounts.length + 1,
        email: `user${emailAccounts.length + 1}@gmail.com`,
        provider: 'gmail',
        status: 'connected',
        dailyLimit: 500,
        sentToday: 0,
        lastSynced: 'Just now',
        selected: true,
        healthScore: Math.floor(Math.random() * 5) + 95 // Random score between 95-100
      };

      setEmailAccounts([...emailAccounts, newAccount]);
      setOpen(false);
      toast.success('Email account connected successfully');
    }, 1500);
  };

  const handleDeleteAccount = (id: number) => {
    setEmailAccounts(emailAccounts.filter(account => account.id !== id));
    toast.success('Email account removed successfully');
  };

  const handleToggleSelect = (id: number) => {
    setEmailAccounts(emailAccounts.map(account => 
      account.id === id 
        ? { ...account, selected: !account.selected } 
        : account
    ));
  };

  const handleImportLeads = () => {
    // Placeholder for leads import functionality
    setImportLeadsOpen(false);
    toast.success('Leads imported successfully');
  };

  const filteredAccounts = emailAccounts.filter(account => 
    account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCount = emailAccounts.filter(account => account.selected).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-instantly-dark">Email Accounts</h1>
          <p className="text-gray-500">Manage your connected email accounts</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={importLeadsOpen} onOpenChange={setImportLeadsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                <span>Import Leads</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Import Leads</DialogTitle>
                <DialogDescription>
                  Upload your leads CSV file to import contacts.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
                    Upload CSV file
                  </label>
                  <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-instantly-blue hover:text-instantly-blue/80"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">CSV up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setImportLeadsOpen(false)}>Cancel</Button>
                <Button onClick={handleImportLeads}>Import</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
                  Connect your Google Workspace account to start sending campaigns.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button 
                  onClick={handleGoogleAuth}
                  className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 flex items-center justify-center gap-2 p-2 rounded-md"
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                    </g>
                  </svg>
                  <span>Connect with Google</span>
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  We only support Google Workspace accounts for email integration.
                </p>
              </div>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Accounts to Use</h2>
          <p className="text-sm text-gray-500">
            Select one or more accounts to send emails from ({selectedCount} selected)
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Daily Limit</TableHead>
                <TableHead>Daily Utilization</TableHead>
                <TableHead>Health Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account) => (
                <TableRow key={account.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <TableCell>
                    <Checkbox 
                      checked={account.selected} 
                      onCheckedChange={() => handleToggleSelect(account.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-instantly-blue/10 flex items-center justify-center">
                        <AtSign className="text-instantly-blue" size={16} />
                      </div>
                      <span className="font-medium">{account.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{account.provider}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{account.dailyLimit}</TableCell>
                  <TableCell>
                    <span>
                      {account.sentToday}/{account.dailyLimit}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={`${
                        account.healthScore >= 95 
                          ? 'bg-instantly-green/10 text-instantly-green hover:bg-instantly-green/20' 
                          : account.healthScore >= 80 
                          ? 'bg-instantly-orange/10 text-instantly-orange hover:bg-instantly-orange/20'
                          : 'bg-instantly-red/10 text-instantly-red hover:bg-instantly-red/20'
                      }`}
                    >
                      {account.healthScore}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
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
                  </TableCell>
                </TableRow>
              ))}
              {filteredAccounts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="px-5 py-8 text-center text-gray-500">
                    <AtSign className="mx-auto mb-2" size={24} />
                    <p>No email accounts found</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => setOpen(true)}
                    >
                      Add Email Account
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default EmailAccounts;
