
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Bell, Edit, Trash2, Calendar, User, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Announcement {
  id: number;
  title: string;
  content: string;
  source: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  audience: string;
  type: 'general' | 'course' | 'system' | 'event';
}

const AnnouncementManagement = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'New React Course Module Available',
      source: 'Instructor',
      time: '2 hours ago',
      content: 'A comprehensive module on React Hooks has been added to the React Development course.',
      priority: 'high',
      audience: 'React Students',
      type: 'course'
    },
    {
      id: 2,
      title: 'Office Hours This Week',
      source: 'Instructor',
      time: '1 day ago',
      content: 'Office hours will be held every Tuesday and Thursday from 2-4 PM for student consultations.',
      priority: 'medium',
      audience: 'All Students',
      type: 'general'
    },
    {
      id: 3,
      title: 'Machine Learning Assignment Deadline',
      source: 'Instructor',
      time: '3 days ago',
      content: 'Reminder: The final project for Machine Learning course is due next Friday.',
      priority: 'high',
      audience: 'ML Students',
      type: 'course'
    },
    {
      id: 4,
      title: 'Node.js Workshop Registration Open',
      source: 'Instructor',
      time: '1 week ago',
      content: 'Register now for the advanced Node.js workshop scheduled for next month.',
      priority: 'medium',
      audience: 'Node.js Students',
      type: 'event'
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'medium' as const,
    audience: 'All Students',
    type: 'general' as const
  });

  const addAnnouncement = () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const announcement: Announcement = {
      id: Math.max(...announcements.map(a => a.id)) + 1,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      source: 'Instructor',
      time: 'Just now',
      priority: newAnnouncement.priority,
      audience: newAnnouncement.audience,
      type: newAnnouncement.type
    };

    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({ title: '', content: '', priority: 'medium', audience: 'All Students', type: 'general' });
    setIsAddDialogOpen(false);
    toast.success('Announcement posted successfully');
  };

  const updateAnnouncement = () => {
    if (!editingAnnouncement?.title.trim() || !editingAnnouncement?.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setAnnouncements(announcements.map(announcement => 
      announcement.id === editingAnnouncement.id ? editingAnnouncement : announcement
    ));
    setEditingAnnouncement(null);
    toast.success('Announcement updated successfully');
  };

  const deleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    toast.success('Announcement deleted successfully');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'event': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'system': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'general': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const audiences = ['All Students', 'React Students', 'Node.js Students', 'ML Students', 'Specific Course'];
  const priorities = ['high', 'medium', 'low'];
  const types = ['general', 'course', 'system', 'event'];

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          onClick={handleBackToHome}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Announcement Management</h1>
          <p className="text-gray-600 mt-2">Create and manage announcements for your students</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Post New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Announcement title"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
              />
              <Textarea
                placeholder="Announcement content"
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                rows={4}
              />
              <Select value={newAnnouncement.type} onValueChange={(value: any) => setNewAnnouncement({ ...newAnnouncement, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={newAnnouncement.priority} onValueChange={(value: any) => setNewAnnouncement({ ...newAnnouncement, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={newAnnouncement.audience} onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, audience: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Audience" />
                </SelectTrigger>
                <SelectContent>
                  {audiences.map(audience => (
                    <SelectItem key={audience} value={audience}>
                      {audience}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button onClick={addAnnouncement} className="flex-1">Post Announcement</Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            All Announcements ({announcements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-slate-700 mb-1">{announcement.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {announcement.source}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {announcement.time}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{announcement.content}</p>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority} priority
                      </Badge>
                      <Badge className={`text-xs ${getTypeColor(announcement.type)}`}>
                        {announcement.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {announcement.audience}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingAnnouncement(announcement)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAnnouncement(announcement.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Announcement Dialog */}
      <Dialog open={!!editingAnnouncement} onOpenChange={() => setEditingAnnouncement(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
          </DialogHeader>
          {editingAnnouncement && (
            <div className="space-y-4">
              <Input
                placeholder="Announcement title"
                value={editingAnnouncement.title}
                onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
              />
              <Textarea
                placeholder="Announcement content"
                value={editingAnnouncement.content}
                onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })}
                rows={4}
              />
              <Select value={editingAnnouncement.type} onValueChange={(value: any) => setEditingAnnouncement({ ...editingAnnouncement, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={editingAnnouncement.priority} onValueChange={(value: any) => setEditingAnnouncement({ ...editingAnnouncement, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={editingAnnouncement.audience} onValueChange={(value) => setEditingAnnouncement({ ...editingAnnouncement, audience: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {audiences.map(audience => (
                    <SelectItem key={audience} value={audience}>
                      {audience}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button onClick={updateAnnouncement} className="flex-1">Update Announcement</Button>
                <Button variant="outline" onClick={() => setEditingAnnouncement(null)} className="flex-1">Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementManagement;
