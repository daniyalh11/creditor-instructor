
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const EmptyStateMessage = ({ 
  icon, 
  heading, 
  description, 
  instruction, 
  instructionDetail 
}: { 
  icon: React.ReactNode,
  heading: string,
  description: string,
  instruction: string,
  instructionDetail: string
}) => (
  <div className="mt-8">
    <p className="text-base text-gray-700 mb-2">{heading}</p>
    <p className="text-base text-gray-700 mb-6">{description}</p>
    
    <Card className="border border-gray-200 rounded-lg overflow-hidden mb-6">
      <CardContent className="flex p-4">
        <div className="mx-auto w-64 py-8 flex items-center justify-center">
          {icon}
        </div>
      </CardContent>
    </Card>
    
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600 font-medium">
        1
      </div>
      <p className="text-gray-700">
        {instruction} 
        <span className="mx-1 px-1 py-0.5 bg-gray-100 rounded text-gray-600">
          <Info className="h-4 w-4 inline mr-1" />
        </span> 
        {instructionDetail}
      </p>
    </div>
    
    <div className="flex">
      <Button variant="outline" className="flex items-center gap-2 ml-10">
        <Edit className="h-4 w-4" />
        Edit
      </Button>
    </div>
  </div>
);

const SettingsTab = () => (
  <div className="space-y-6">
    <div className="p-6 bg-white rounded-md border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Feature</h3>
      <div className="flex items-start gap-3">
        <Checkbox id="displayLogo" defaultChecked />
        <label htmlFor="displayLogo" className="text-sm font-normal cursor-pointer">
          Display logo of user's organization in the upper-right of their dashboard
        </label>
      </div>
    </div>
  </div>
);

const EnrolledTab = () => (
  <EmptyStateMessage
    icon={
      <div className="flex space-x-4">
        <div className="w-16 h-16 rounded-md bg-yellow-400"></div>
        <div className="w-16 h-16 rounded-md bg-cyan-400"></div>
      </div>
    }
    heading="The following is displayed in the 'Enrollments' section if a learner is not enrolled in any courses:"
    description="You are not currently enrolled in any courses."
    instruction="To enroll in a course, click"
    instructionDetail=", then click Enroll."
  />
);

const TeachingTab = () => (
  <EmptyStateMessage
    icon={
      <div className="relative w-32 h-24 border-2 border-gray-300 rounded-md flex items-center justify-center">
        <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-cyan-400 rounded-md flex items-center justify-center text-white font-bold">
          +
        </div>
        <div className="grid grid-cols-2 gap-1 p-2">
          <div className="h-4 bg-cyan-200 rounded"></div>
          <div className="h-4 bg-cyan-200 rounded"></div>
          <div className="h-4 bg-pink-200 rounded"></div>
          <div className="h-4 bg-yellow-200 rounded"></div>
        </div>
      </div>
    }
    heading="The following is displayed in the 'Teaching' section if a instructor is not teaching in any courses:"
    description="You are not currently teaching any courses."
    instruction="To create a course, click"
    instructionDetail=", then click Add."
  />
);

const GroupsTab = () => (
  <EmptyStateMessage
    icon={
      <div className="flex">
        <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center relative overflow-hidden">
          <div className="absolute w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-white font-bold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 16.016V14a6 6 0 0 0-12 0v2.016" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="w-6 h-6 rounded-full bg-yellow-300"></div>
            <div className="w-6 h-6 rounded-full bg-cyan-300"></div>
            <div className="w-6 h-6 rounded-full bg-pink-300"></div>
            <div className="w-6 h-6 rounded-full bg-purple-300"></div>
          </div>
        </div>
      </div>
    }
    heading="The following is displayed in the 'Groups' section if a user is not a member of any groups:"
    description="You are not a member of any group."
    instruction="To add a group, click"
    instructionDetail=", then click Add."
  />
);

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("settings");

  return (
    <div className="space-y-6">
      <div className="bg-white p-0 rounded-lg shadow-sm">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b border-gray-200">
            <TabsList className="bg-transparent h-auto p-0 w-full justify-start">
              <TabsTrigger 
                value="settings" 
                className="py-3 px-6 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-600 data-[state=active]:shadow-none font-medium"
              >
                Settings
              </TabsTrigger>
              <TabsTrigger 
                value="enrolled" 
                className="py-3 px-6 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-600 data-[state=active]:shadow-none font-medium"
              >
                Enrolled
              </TabsTrigger>
              <TabsTrigger 
                value="teaching" 
                className="py-3 px-6 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-600 data-[state=active]:shadow-none font-medium"
              >
                Teaching
              </TabsTrigger>
              <TabsTrigger 
                value="groups" 
                className="py-3 px-6 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-600 data-[state=active]:shadow-none font-medium"
              >
                Groups
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="p-6">
            <TabsContent value="settings" className="m-0">
              <SettingsTab />
            </TabsContent>
            <TabsContent value="enrolled" className="m-0">
              <EnrolledTab />
            </TabsContent>
            <TabsContent value="teaching" className="m-0">
              <TeachingTab />
            </TabsContent>
            <TabsContent value="groups" className="m-0">
              <GroupsTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
