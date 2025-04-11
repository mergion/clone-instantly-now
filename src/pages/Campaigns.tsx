
import React from 'react';
import { 
  Plus, Search, Filter, Mail, Clock, Calendar, 
  MoreHorizontal, ChevronDown, Settings, 
  Play, Pause, Trash2, Edit, Copy, Eye  
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const campaignsData = [
  {
    id: 1,
    name: 'Sales Outreach Q2',
    status: 'active',
    progress: 78,
    sent: 450,
    total: 600,
    opened: 312,
    replies: 56,
    scheduled: null,
    created: 'Apr 12, 2025'
  },
  {
    id: 2,
    name: 'Demo Request Follow-up',
    status: 'active',
    progress: 42,
    sent: 124,
    total: 300,
    opened: 86,
    replies: 21,
    scheduled: null,
    created: 'Apr 15, 2025'
  },
  {
    id: 3,
    name: 'Product Launch Announcement',
    status: 'scheduled',
    progress: 0,
    sent: 0,
    total: 1200,
    opened: 0,
    replies: 0,
    scheduled: 'May 15, 2025',
    created: 'Apr 18, 2025'
  },
  {
    id: 4,
    name: 'Newsletter - Monthly Update',
    status: 'draft',
    progress: 0,
    sent: 0,
    total: 5400,
    opened: 0,
    replies: 0,
    scheduled: null,
    created: 'Apr 20, 2025'
  },
  {
    id: 5,
    name: 'Q1 Customer Feedback Survey',
    status: 'completed',
    progress: 100,
    sent: 875,
    total: 875,
    opened: 543,
    replies: 218,
    scheduled: null,
    created: 'Mar 05, 2025'
  }
];

const Campaigns = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-instantly-dark">Campaigns</h1>
          <p className="text-gray-500">Manage and monitor your email campaigns</p>
        </div>
        <div>
          <Button className="instantly-btn-primary flex items-center gap-2">
            <Plus size={16} />
            <span>New Campaign</span>
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="text" 
            placeholder="Search campaigns..." 
            className="pl-10 max-w-md bg-white"
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            <span>Filter</span>
            <ChevronDown size={14} />
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Settings size={16} />
            <span>Columns</span>
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opens</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Replies</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaignsData.map((campaign) => (
                <tr key={campaign.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-instantly-blue/10 flex items-center justify-center">
                        {campaign.status === 'scheduled' ? (
                          <Clock className="text-instantly-blue" size={16} />
                        ) : campaign.status === 'draft' ? (
                          <Edit className="text-instantly-blue" size={16} />
                        ) : (
                          <Mail className="text-instantly-blue" size={16} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-instantly-dark">{campaign.name}</p>
                        {campaign.scheduled && (
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={12} />
                            <span>Scheduled for {campaign.scheduled}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge 
                      className={`${
                        campaign.status === 'active' 
                          ? 'bg-instantly-green/10 text-instantly-green hover:bg-instantly-green/20' 
                          : campaign.status === 'scheduled' 
                          ? 'bg-instantly-orange/10 text-instantly-orange hover:bg-instantly-orange/20'
                          : campaign.status === 'completed'
                          ? 'bg-instantly-blue/10 text-instantly-blue hover:bg-instantly-blue/20'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 w-40">
                      <Progress value={campaign.progress} className="h-2" />
                      <span className="text-xs text-gray-500">{campaign.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm">
                    {campaign.sent}/{campaign.total}
                  </td>
                  <td className="px-5 py-4 text-sm">
                    {campaign.opened} ({campaign.sent > 0 ? Math.round((campaign.opened / campaign.sent) * 100) : 0}%)
                  </td>
                  <td className="px-5 py-4 text-sm">
                    {campaign.replies} ({campaign.sent > 0 ? Math.round((campaign.replies / campaign.sent) * 100) : 0}%)
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">
                    {campaign.created}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye size={16} />
                      </Button>
                      
                      {campaign.status === 'active' && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Pause size={16} />
                        </Button>
                      )}
                      
                      {(campaign.status === 'scheduled' || campaign.status === 'draft') && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Play size={16} />
                        </Button>
                      )}
                      
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
