
import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AddEmailAccountDialog } from '@/components/email-accounts/AddEmailAccountDialog';
import { ImportLeadsDialog } from '@/components/email-accounts/ImportLeadsDialog';
import { EmailAccountList } from '@/components/email-accounts/EmailAccountList';
import { SearchBar } from '@/components/email-accounts/SearchBar';
import { EmailAccount } from '@/components/email-accounts/types';

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
  
  const [addAccountDialogOpen, setAddAccountDialogOpen] = useState(false);
  const [importLeadsDialogOpen, setImportLeadsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddAccount = (newAccount: EmailAccount) => {
    setEmailAccounts([...emailAccounts, newAccount]);
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-instantly-dark">Email Accounts</h1>
          <p className="text-gray-500">Manage your connected email accounts</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setImportLeadsDialogOpen(true)}
          >
            <Download size={16} />
            <span>Import Leads</span>
          </Button>

          <Button 
            className="instantly-btn-primary flex items-center gap-2"
            onClick={() => setAddAccountDialogOpen(true)}
          >
            <Plus size={16} />
            <span>Add Email Account</span>
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4 items-center">
        <SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      
      <EmailAccountList 
        accounts={emailAccounts}
        searchTerm={searchTerm}
        onToggleSelect={handleToggleSelect}
        onDeleteAccount={handleDeleteAccount}
        onAddAccount={() => setAddAccountDialogOpen(true)}
      />

      <AddEmailAccountDialog 
        open={addAccountDialogOpen}
        setOpen={setAddAccountDialogOpen}
        onAccountAdded={handleAddAccount}
      />

      <ImportLeadsDialog 
        open={importLeadsDialogOpen}
        setOpen={setImportLeadsDialogOpen}
      />
    </div>
  );
};

export default EmailAccounts;
