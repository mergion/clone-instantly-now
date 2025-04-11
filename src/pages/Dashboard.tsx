
import React from 'react';
import { 
  BarChart3, ArrowUp, ArrowDown, Eye, 
  Mail, UserCheck, MessageSquare, 
  BarChart2, Activity, TrendingUp, Zap, Plus,
  FileText // Added this import
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon 
}: { 
  title: string; 
  value: string; 
  change: string; 
  changeType: 'positive' | 'negative' | 'neutral'; 
  icon: React.ElementType; 
}) => {
  return (
    <Card className="instantly-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <Icon className="text-instantly-blue" size={18} />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          {changeType === 'positive' && (
            <div className="text-instantly-green text-sm flex items-center">
              <ArrowUp size={14} />
              <span>{change}</span>
            </div>
          )}
          {changeType === 'negative' && (
            <div className="text-instantly-red text-sm flex items-center">
              <ArrowDown size={14} />
              <span>{change}</span>
            </div>
          )}
          {changeType === 'neutral' && (
            <div className="text-gray-500 text-sm">{change}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-instantly-dark">Dashboard</h1>
          <p className="text-gray-500">Welcome back, John. Here's your campaign performance.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">View Reports</Button>
          <Button className="instantly-btn-primary">New Campaign</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-5">
        <StatsCard 
          title="Open Rate" 
          value="64.5%" 
          change="12.3% from last week" 
          changeType="positive" 
          icon={Eye} 
        />
        <StatsCard 
          title="Response Rate" 
          value="12.8%" 
          change="2.1% from last week" 
          changeType="positive" 
          icon={MessageSquare} 
        />
        <StatsCard 
          title="Sent Emails" 
          value="3,684" 
          change="523 today" 
          changeType="neutral" 
          icon={Mail} 
        />
        <StatsCard 
          title="New Contacts" 
          value="256" 
          change="4.2% from last week" 
          changeType="negative" 
          icon={UserCheck} 
        />
      </div>
      
      <div className="grid grid-cols-3 gap-5">
        <Card className="instantly-card col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Campaign Performance</CardTitle>
            <BarChart3 className="text-instantly-blue" size={20} />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[300px] flex items-center justify-center border border-dashed border-gray-200 rounded-lg">
              <div className="text-center text-gray-500">
                <BarChart2 className="mx-auto mb-2" size={32} />
                <p>Campaign analytics chart will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="instantly-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Active Campaigns</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-instantly-blue">
              View All
            </Button>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Sales Outreach Q2</span>
                  <span className="text-sm text-instantly-green">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={78} className="h-2" />
                  <span className="text-xs text-gray-500">78%</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Sent: 450/600</span>
                  <span>Opened: 312</span>
                  <span>Replies: 56</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Demo Request Follow-up</span>
                  <span className="text-sm text-instantly-green">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={42} className="h-2" />
                  <span className="text-xs text-gray-500">42%</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Sent: 124/300</span>
                  <span>Opened: 86</span>
                  <span>Replies: 21</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Product Launch Announcement</span>
                  <span className="text-sm text-instantly-orange">Scheduled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={0} className="h-2" />
                  <span className="text-xs text-gray-500">0%</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Starting: May 15, 2025</span>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-dashed">
              <Plus size={16} />
              <span>New Campaign</span>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-3 gap-5">
        <Card className="instantly-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
            <Activity className="text-instantly-blue" size={20} />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className="h-8 w-8 rounded-full bg-instantly-blue/10 flex items-center justify-center">
                    <Mail className="text-instantly-blue" size={15} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {["New reply from David Miller", "Sarah Wilson opened your email", "Campaign completed: Q1 Outreach", "New bounce detected"][i - 1]}
                    </p>
                    <p className="text-xs text-gray-500">
                      {["12 minutes ago", "35 minutes ago", "2 hours ago", "4 hours ago"][i - 1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="instantly-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Top Templates</CardTitle>
            <TrendingUp className="text-instantly-blue" size={20} />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-instantly-blue/10 flex items-center justify-center">
                      <FileText className="text-instantly-blue" size={15} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {["Initial Outreach", "Follow-up #1", "Demo Request"][i - 1]}
                      </p>
                      <p className="text-xs text-gray-500">
                        {["42% response rate", "31% response rate", "28% response rate"][i - 1]}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    View
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-dashed">
                <Plus size={16} />
                <span>New Template</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="instantly-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
            <Zap className="text-instantly-blue" size={20} />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3">
              <Button className="instantly-btn-primary h-auto flex-col py-4 rounded-xl">
                <Mail className="mb-2" size={20} />
                <span>Create Campaign</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-4 rounded-xl">
                <FileText className="mb-2" size={20} />
                <span>New Template</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-4 rounded-xl">
                <UserCheck className="mb-2" size={20} />
                <span>Add Contacts</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-4 rounded-xl">
                <BarChart3 className="mb-2" size={20} />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
