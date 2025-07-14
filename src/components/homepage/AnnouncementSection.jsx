import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

export function AnnouncementSection() {
  const navigate = useNavigate();
  
  const announcements = [
    {
      id: 1,
      title: 'New React Course Module',
      source: 'Instructor',
      time: '2 hours ago',
      content: 'Advanced React Hooks module has been added to the React Development course.',
    },
    {
      id: 2,
      title: 'Office Hours This Week',
      source: 'Instructor',
      time: '1 day ago',
      content: 'Office hours will be held Tuesday and Thursday from 2-4 PM.',
    },
    {
      id: 3,
      title: 'ML Assignment Deadline',
      source: 'Instructor',
      time: '3 days ago',
      content: 'Machine Learning final project is due next Friday.',
    },
  ];

  const handleViewAllAnnouncements = () => {
    navigate('/announcements');
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-4 bg-slate-50 border-b border-gray-100">
        <CardTitle className="text-lg font-semibold text-slate-700">Announcements</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-slate-200 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notification settings</span>
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <ScrollArea className="h-[220px] pr-3">
          {announcements.length > 0 ? (
            <div className="space-y-3 mt-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-white p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-sm text-slate-700">{announcement.title}</h3>
                    <span className="text-xs text-gray-500">{announcement.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{announcement.source}</p>
                  <p className="text-xs text-gray-700 line-clamp-2">{announcement.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-24 text-gray-500">
              <p className="text-sm">No announcements</p>
            </div>
          )}
        </ScrollArea>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4 hover:bg-slate-50 transition-colors border-gray-200"
          onClick={handleViewAllAnnouncements}
        >
          View All Announcements
        </Button>
      </CardContent>
    </Card>
  );
}