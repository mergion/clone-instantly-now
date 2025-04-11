
export type EmailAccount = {
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
