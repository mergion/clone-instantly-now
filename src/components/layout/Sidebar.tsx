
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Mail, FileText, Users, 
  Settings, Inbox, FileClock, 
  Timer, MailQuestion, AtSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SidebarLink = ({ 
  to, 
  icon: Icon, 
  label, 
  active = false,
  subItem = false
}: { 
  to: string, 
  icon: React.ElementType, 
  label: string,
  active?: boolean, 
  subItem?: boolean
}) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "instantly-sidebar-item",
        active && "active",
        subItem && "ml-6 text-sm"
      )}
    >
      <Icon size={subItem ? 16 : 20} />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="h-screen w-60 flex flex-col bg-instantly-blue">
      <div className="p-5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-instantly-blue font-bold">I</span>
          </div>
          <h1 className="text-white font-bold text-xl">Instantly</h1>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-1 overflow-y-auto p-3">
        <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" active={true} />
        
        <div className="mt-4 mb-2 px-4">
          <p className="text-white/70 text-xs uppercase font-medium">Email Campaigns</p>
        </div>
        <SidebarLink to="/campaigns" icon={Mail} label="Campaigns" />
        <SidebarLink to="/contacts" icon={Users} label="Contacts" />
        <SidebarLink to="/email-accounts" icon={AtSign} label="Email Accounts" />
        
        <div className="mt-4 mb-2 px-4">
          <p className="text-white/70 text-xs uppercase font-medium">Inbox</p>
        </div>
        <SidebarLink to="/inbox" icon={Inbox} label="Received" />
        <SidebarLink to="/scheduled" icon={FileClock} label="Scheduled" />
        <SidebarLink to="/follow-ups" icon={Timer} label="Follow-ups" />
        <SidebarLink to="/bounced" icon={MailQuestion} label="Bounced" />
      </div>
      
      <div className="p-3 border-t border-white/10">
        <SidebarLink to="/settings" icon={Settings} label="Settings" />
      </div>

      <div className="p-4 flex items-center gap-3 border-t border-white/10">
        <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-instantly-blue font-medium">JD</span>
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-medium">John Doe</p>
          <p className="text-white/70 text-xs">Pro Plan</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
