
import React from 'react';
import { AtSign, Check, MoreHorizontal, RefreshCw, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmailAccount } from './types';

interface EmailAccountListProps {
  accounts: EmailAccount[];
  searchTerm: string;
  onToggleSelect: (id: number) => void;
  onDeleteAccount: (id: number) => void;
  onAddAccount: () => void;
}

export const EmailAccountList: React.FC<EmailAccountListProps> = ({
  accounts,
  searchTerm,
  onToggleSelect,
  onDeleteAccount,
  onAddAccount
}) => {
  const filteredAccounts = accounts.filter(account => 
    account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCount = accounts.filter(account => account.selected).length;

  return (
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
                    onCheckedChange={() => onToggleSelect(account.id)}
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
                        <DropdownMenuItem onClick={() => onDeleteAccount(account.id)} className="flex items-center gap-2 cursor-pointer text-instantly-red">
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
                    onClick={onAddAccount}
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
  );
};
