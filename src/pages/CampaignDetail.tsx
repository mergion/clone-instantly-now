
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, Pause, Play, Users, Clock, 
  Settings, ListChecks, Search, Plus, Upload, 
  CalendarClock, MoreHorizontal, ArrowRight, File,
  Trash2, Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type Lead = {
  id: number;
  email: string;
  name?: string;
  status: 'lead' | 'contacted' | 'replied' | 'completed';
  step: number;
};

type Sequence = {
  id: number;
  title: string;
  content: string;
  waitDays: number;
};

const CampaignDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState<Lead[]>([
    { id: 1, email: 'rockin1bright@gmail.com', name: '-', status: 'contacted', step: 1 },
    { id: 2, email: 'rockinggram62@gmail.com', name: '-', status: 'lead', step: 1 }
  ]);
  const [sequences, setSequences] = useState<Sequence[]>([
    { id: 1, title: 'Initial Outreach', content: 'Hi {{name}},\n\nI hope this email finds you well. I wanted to reach out about...', waitDays: 0 },
    { id: 2, title: 'Follow-up #1', content: 'Hi {{name}},\n\nI just wanted to follow up on my previous email...', waitDays: 2 },
    { id: 3, title: 'Final Follow-up', content: 'Hi {{name}},\n\nJust checking in one last time regarding...', waitDays: 3 }
  ]);
  
  const [openSequenceDialog, setOpenSequenceDialog] = useState(false);
  const [editingSequence, setEditingSequence] = useState<boolean>(false);
  const [selectedSequence, setSelectedSequence] = useState<Sequence | null>(null);
  const [newSequence, setNewSequence] = useState<Partial<Sequence>>({
    title: '',
    content: '',
    waitDays: 2
  });
  
  const [openLeadDialog, setOpenLeadDialog] = useState(false);
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadName, setNewLeadName] = useState('');

  const handleAddSequence = () => {
    if (!newSequence.title || !newSequence.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingSequence && selectedSequence) {
      // Update existing sequence
      const updatedSequences = sequences.map(seq => 
        seq.id === selectedSequence.id 
          ? { ...seq, title: newSequence.title!, content: newSequence.content!, waitDays: newSequence.waitDays || 0 } 
          : seq
      );
      setSequences(updatedSequences);
      toast.success('Sequence updated successfully');
    } else {
      // Add new sequence
      const sequence: Sequence = {
        id: sequences.length + 1,
        title: newSequence.title!,
        content: newSequence.content!,
        waitDays: newSequence.waitDays || 0
      };
      setSequences([...sequences, sequence]);
      toast.success('Sequence step added successfully');
    }

    setNewSequence({
      title: '',
      content: '',
      waitDays: 2
    });
    setEditingSequence(false);
    setSelectedSequence(null);
    setOpenSequenceDialog(false);
  };

  const handleEditSequence = (sequence: Sequence) => {
    setSelectedSequence(sequence);
    setNewSequence({
      title: sequence.title,
      content: sequence.content,
      waitDays: sequence.waitDays
    });
    setEditingSequence(true);
    setOpenSequenceDialog(true);
  };

  const handleDeleteSequence = (id: number) => {
    setSequences(sequences.filter(seq => seq.id !== id));
    toast.success('Sequence step deleted successfully');
  };

  const handleAddLead = () => {
    if (!newLeadEmail || !newLeadEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    const lead: Lead = {
      id: leads.length + 1,
      email: newLeadEmail,
      name: newLeadName || '-',
      status: 'lead',
      step: 1
    };

    setLeads([...leads, lead]);
    setNewLeadEmail('');
    setNewLeadName('');
    setOpenLeadDialog(false);
    toast.success('Lead added successfully');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/campaigns" className="hover:text-instantly-blue">Campaigns</Link>
        <ChevronRight size={16} />
        <span className="font-medium text-instantly-dark">Spotify</span>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-instantly-dark">Spotify</h1>
          <p className="text-gray-500">Campaign details and management</p>
        </div>
        <div>
          <Button variant="outline" className="flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700 border-gray-700">
            <Pause size={16} />
            <span>Pause Campaign</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-instantly-blue/10 flex items-center justify-center">
              <Users className="text-instantly-blue" size={20} />
            </div>
            <div>
              <p className="font-medium">Total Leads</p>
              <p className="text-2xl font-bold text-instantly-dark">3080</p>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Contacted: 1972</span>
            <span>To Contact: 1108</span>
          </div>
        </div>
        
        <div className="col-span-1 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <Play className="text-green-500" size={20} />
            </div>
            <div>
              <p className="font-medium">Active Step</p>
              <p className="text-2xl font-bold text-instantly-dark">Step 3</p>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Total Steps: 3</span>
            <span>Next: Step 1</span>
          </div>
        </div>
        
        <div className="col-span-1 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Clock className="text-orange-500" size={20} />
            </div>
            <div>
              <p className="font-medium">Next Scheduled</p>
              <p className="text-2xl font-bold text-instantly-dark">Today</p>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Pending: 128</span>
            <span>Time: 2:00 PM</span>
          </div>
        </div>
        
        <div className="col-span-1 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Settings className="text-purple-500" size={20} />
            </div>
            <div>
              <p className="font-medium">Email Account</p>
              <p className="text-lg font-bold text-instantly-dark truncate">john.doe@gmail.com</p>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Sent Today: 125</span>
            <span>Limit: 500</span>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="leads" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full bg-gray-100 p-0 h-12">
          <TabsTrigger 
            value="leads" 
            className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none h-full"
          >
            <Users size={16} className="mr-2" />
            Leads
          </TabsTrigger>
          <TabsTrigger 
            value="sequences" 
            className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none h-full"
          >
            <ListChecks size={16} className="mr-2" />
            Sequences
          </TabsTrigger>
          <TabsTrigger 
            value="schedule" 
            className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none h-full"
          >
            <CalendarClock size={16} className="mr-2" />
            Schedule
          </TabsTrigger>
          <TabsTrigger 
            value="options" 
            className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-none rounded-none h-full"
          >
            <Settings size={16} className="mr-2" />
            Options
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="leads" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text" 
                placeholder="Search leads..." 
                className="pl-10 bg-white"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Upload size={16} />
                <span>Import Leads</span>
              </Button>
              
              <Dialog open={openLeadDialog} onOpenChange={setOpenLeadDialog}>
                <DialogTrigger asChild>
                  <Button className="instantly-btn-primary flex items-center gap-2">
                    <Plus size={16} />
                    <span>Add Lead</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Lead</DialogTitle>
                    <DialogDescription>
                      Add a new contact to this campaign
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter email address" 
                        value={newLeadEmail}
                        onChange={(e) => setNewLeadEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name (Optional)</Label>
                      <Input 
                        id="name" 
                        placeholder="Enter name" 
                        value={newLeadName}
                        onChange={(e) => setNewLeadName(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenLeadDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddLead}>Add Lead</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <div className="flex gap-4">
                <Badge className="bg-blue-500">Total Leads: {leads.length}</Badge>
                <Badge variant="outline">Lead: {leads.filter(l => l.status === 'lead').length}</Badge>
                <Badge variant="outline">Contacted: {leads.filter(l => l.status === 'contacted').length}</Badge>
                <Badge variant="outline">Replied: {leads.filter(l => l.status === 'replied').length}</Badge>
              </div>
              <Button variant="outline" size="sm">
                Verify Leads
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase w-12">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead Status</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="px-5 py-4 font-medium">
                        {lead.email}
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span>Step {lead.step}</span>
                          {lead.step > 1 && <ArrowRight size={12} />}
                          {lead.step > 1 && <span>Step {lead.step-1}</span>}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <Badge 
                          className={`${
                            lead.status === 'contacted' 
                              ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                              : lead.status === 'lead' 
                              ? 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
                              : lead.status === 'replied'
                              ? 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
                              : 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20'
                          }`}
                        >
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">{lead.name}</td>
                      <td className="px-5 py-4 text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sequences" className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Email Sequence Steps</h3>
            <Dialog open={openSequenceDialog} onOpenChange={setOpenSequenceDialog}>
              <DialogTrigger asChild>
                <Button className="instantly-btn-primary flex items-center gap-2">
                  <Plus size={16} />
                  <span>Add Step</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{editingSequence ? 'Edit Sequence Step' : 'Add Sequence Step'}</DialogTitle>
                  <DialogDescription>
                    {editingSequence ? 'Update existing email sequence step' : 'Create a new email for your sequence'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Step Title</Label>
                    <Input 
                      id="title" 
                      placeholder="E.g. Initial Outreach" 
                      value={newSequence.title}
                      onChange={(e) => setNewSequence({...newSequence, title: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="waitDays">Wait Days</Label>
                    <Select 
                      value={newSequence.waitDays?.toString()} 
                      onValueChange={(value) => setNewSequence({...newSequence, waitDays: parseInt(value)})}
                    >
                      <SelectTrigger id="waitDays">
                        <SelectValue placeholder="Select wait time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Send immediately (0 days)</SelectItem>
                        <SelectItem value="1">Wait 1 day</SelectItem>
                        <SelectItem value="2">Wait 2 days</SelectItem>
                        <SelectItem value="3">Wait 3 days</SelectItem>
                        <SelectItem value="5">Wait 5 days</SelectItem>
                        <SelectItem value="7">Wait 7 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">Time to wait after previous email before sending this one</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content">Email Content</Label>
                    <Textarea 
                      id="content" 
                      placeholder="Write your email content here..." 
                      className="min-h-[200px]"
                      value={newSequence.content}
                      onChange={(e) => setNewSequence({...newSequence, content: e.target.value})}
                    />
                    <p className="text-xs text-gray-500">
                      Use {{name}} to personalize with the recipient's name
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    setOpenSequenceDialog(false);
                    setEditingSequence(false);
                    setSelectedSequence(null);
                    setNewSequence({
                      title: '',
                      content: '',
                      waitDays: 2
                    });
                  }}>Cancel</Button>
                  <Button onClick={handleAddSequence}>{editingSequence ? 'Update' : 'Add'} Sequence Step</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="space-y-4">
            {sequences.map((sequence, index) => (
              <div key={sequence.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-instantly-blue/10 flex items-center justify-center">
                      <File className="text-instantly-blue" size={18} />
                    </div>
                    <div>
                      <p className="font-medium">Step {index + 1}: {sequence.title}</p>
                      <p className="text-sm text-gray-500">
                        {sequence.waitDays === 0 
                          ? 'Sent immediately' 
                          : `Wait ${sequence.waitDays} day${sequence.waitDays > 1 ? 's' : ''} after previous step`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleEditSequence(sequence)}
                    >
                      <Edit size={14} />
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-instantly-red flex items-center gap-1"
                      onClick={() => handleDeleteSequence(sequence.id)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 text-sm whitespace-pre-line">
                  {sequence.content}
                </div>
              </div>
            ))}
            
            {sequences.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <File className="mx-auto mb-2" size={24} />
                <p className="text-gray-500">No sequence steps created yet</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => setOpenSequenceDialog(true)}
                >
                  Add First Step
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Campaign Schedule</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Daily Send Limit</Label>
                  <div className="flex gap-2 mt-1">
                    <Input type="number" defaultValue={100} />
                    <span className="flex items-center text-gray-500">emails/day</span>
                  </div>
                </div>
                
                <div>
                  <Label>Send Window</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <Label className="text-xs">Start Time</Label>
                      <Select defaultValue="9">
                        <SelectTrigger>
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8">8:00 AM</SelectItem>
                          <SelectItem value="9">9:00 AM</SelectItem>
                          <SelectItem value="10">10:00 AM</SelectItem>
                          <SelectItem value="11">11:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">End Time</Label>
                      <Select defaultValue="17">
                        <SelectTrigger>
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="16">4:00 PM</SelectItem>
                          <SelectItem value="17">5:00 PM</SelectItem>
                          <SelectItem value="18">6:00 PM</SelectItem>
                          <SelectItem value="19">7:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Days of Week</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                      <Badge 
                        key={day} 
                        variant="outline" 
                        className="bg-instantly-blue/10 text-instantly-blue border-instantly-blue/20 hover:bg-instantly-blue/20"
                      >
                        {day}
                      </Badge>
                    ))}
                    {['Sat', 'Sun'].map((day) => (
                      <Badge 
                        key={day} 
                        variant="outline" 
                        className="bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200"
                      >
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Campaign Status</Label>
                  <Select defaultValue="running">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button>Save Schedule</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="options" className="mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Campaign Options</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Campaign Name</Label>
                  <Input className="mt-1" defaultValue="Spotify" />
                </div>
                
                <div>
                  <Label>Email Account</Label>
                  <Select defaultValue="john">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select email account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">john.doe@gmail.com</SelectItem>
                      <SelectItem value="marketing">marketing@company.com</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Track Opens and Clicks</Label>
                  <Select defaultValue="yes">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select tracking option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes - Track all activities</SelectItem>
                      <SelectItem value="opens">Track opens only</SelectItem>
                      <SelectItem value="clicks">Track clicks only</SelectItem>
                      <SelectItem value="no">No - Don't track</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Send as Plain HTML</Label>
                  <Select defaultValue="no">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select HTML option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes - Send as HTML</SelectItem>
                      <SelectItem value="no">No - Send as plain text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Reply Handling</Label>
                  <Select defaultValue="stop">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select reply option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stop">Stop sequence on reply</SelectItem>
                      <SelectItem value="continue">Continue sequence after reply</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button>Save Options</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignDetail;

