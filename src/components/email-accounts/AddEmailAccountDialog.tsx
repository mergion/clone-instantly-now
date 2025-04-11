
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { EmailAccount } from './types';

interface AddEmailAccountDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAccountAdded: (account: EmailAccount) => void;
}

export const AddEmailAccountDialog: React.FC<AddEmailAccountDialogProps> = ({
  open,
  setOpen,
  onAccountAdded
}) => {
  const handleGoogleAuth = () => {
    // In a real application, this would redirect to Google OAuth
    toast.info('Redirecting to Google authentication...');
    
    // Simulate successful OAuth
    setTimeout(() => {
      const newAccount: EmailAccount = {
        id: Date.now(),
        email: `user${Date.now()}@gmail.com`,
        provider: 'gmail',
        status: 'connected',
        dailyLimit: 500,
        sentToday: 0,
        lastSynced: 'Just now',
        selected: true,
        healthScore: Math.floor(Math.random() * 5) + 95 // Random score between 95-100
      };

      onAccountAdded(newAccount);
      setOpen(false);
      toast.success('Email account connected successfully');
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
  );
};
