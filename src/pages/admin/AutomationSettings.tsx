import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Trash2, Plus, Workflow } from 'lucide-react';
import { cn } from '@/lib/utils';

const AutomationSettings = () => {
  const { tab = 'courses' } = useParams<{tab?: string}>();
  const navigate = useNavigate();
  
  const handleTabChange = (value: string) => {
    navigate(`/admin/automation/${value}`);
  };
  
  // Courses tab content
  const renderCoursesContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-4">Completion actions</h2>
      <p className="mb-4 text-muted-foreground">Add actions here that should be performed when the course is completed, such as awarding a certificate.</p>
      
      <Table className="bg-white border rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>Added</TableHead>
            <TableHead className="w-[100px]">Edit</TableHead>
            <TableHead className="w-[100px]">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Enroll in course Lesson 1 Understanding Legal Guarantees of Equal Protection</TableCell>
            <TableCell>Apr 11, 2025</TableCell>
            <TableCell><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></TableCell>
            <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Enroll in course Lesson 2: Equal protection laws apply in finance</TableCell>
            <TableCell>Apr 14, 2025</TableCell>
            <TableCell><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></TableCell>
            <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Enroll in course Lesson 3 How to Figure It All Out – Navigating Sovereignty-Related Legal Complexities</TableCell>
            <TableCell>Apr 14, 2025</TableCell>
            <TableCell><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></TableCell>
            <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Enroll in course Lesson 4: How to Figure It All Out – Sovereignty Explained</TableCell>
            <TableCell>Apr 14, 2025</TableCell>
            <TableCell><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></TableCell>
            <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Enroll in course Lesson 5: How Government and God Compete to Provide "Protection"</TableCell>
            <TableCell>Apr 14, 2025</TableCell>
            <TableCell><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></TableCell>
            <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );

  // Modules tab content
  const renderModulesContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-4">Added actions</h2>
      <p className="mb-4 text-muted-foreground">Add actions here that should be performed when a module is added.</p>
      
      <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
        <Plus className="h-4 w-4" /> Add
      </Button>
      
      <h2 className="text-xl font-medium mt-8 mb-4">Completion actions</h2>
      <p className="mb-4 text-muted-foreground">Add actions here that should be performed when the module is completed.</p>
      
      <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
        <Plus className="h-4 w-4" /> Add
      </Button>
      
      <h2 className="text-xl font-medium mt-8 mb-4">Deleted actions</h2>
      <p className="mb-4 text-muted-foreground">Add actions here that should be performed when a module is deleted.</p>
      
      <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
        <Plus className="h-4 w-4" /> Add
      </Button>
    </div>
  );

  // Sections tab content
  const renderSectionsContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-4">Added actions</h2>
      <p className="mb-4 text-muted-foreground">Add actions here that should be performed when a section is added.</p>
      
      <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
        <Plus className="h-4 w-4" /> Add
      </Button>
      
      <h2 className="text-xl font-medium mt-8 mb-4">Completion actions</h2>
      <p className="mb-4 text-muted-foreground">Add actions here that should be performed when the section is completed.</p>
      
      <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
        <Plus className="h-4 w-4" /> Add
      </Button>
      
      <h2 className="text-xl font-medium mt-8 mb-4">Deleted actions</h2>
      <p className="mb-4 text-muted-foreground">Add actions here that should be performed when a section is deleted.</p>
      
      <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
        <Plus className="h-4 w-4" /> Add
      </Button>
    </div>
  );

  // Assessments tab content
  const renderAssessmentsContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-4">Assessment Automation</h2>
      <p className="mb-4 text-muted-foreground">Configure automated grading and feedback for assessments.</p>
      
      <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
        <Plus className="h-4 w-4" /> Add New Rule
      </Button>
    </div>
  );

  // Groups tab content
  const renderGroupsContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-4">Group Management</h2>
      <p className="mb-4 text-muted-foreground">Configure automated group management features.</p>
      
      <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
        <Plus className="h-4 w-4" /> Add New Group Rule
      </Button>
    </div>
  );

  // Resources tab content
  const renderResourcesContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-4">Shared actions</h2>
      <p className="mb-4 text-muted-foreground">Add actions here that should be performed when a resource is shared.</p>
      
      <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
        <Plus className="h-4 w-4" /> Add
      </Button>
      
      <h2 className="text-xl font-medium mt-8 mb-4">Unshared actions</h2>
      <p className="mb-4 text-muted-foreground">Add actions here that should be performed when a resource is unshared.</p>
      
      <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
        <Plus className="h-4 w-4" /> Add
      </Button>
    </div>
  );

  // Forums tab content
  const renderForumsContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-4">Post actions</h2>
      <p className="mb-4 text-muted-foreground">Add actions here that should be performed when a user who is not a moderator posts to the forum.</p>
      
      <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
        <Plus className="h-4 w-4" /> Add
      </Button>
      
      <h2 className="text-xl font-medium mt-8 mb-4">Reply actions</h2>
      <p className="mb-4 text-muted-foreground">Add actions here that should be performed when a user who is not a moderator replies to the forum.</p>
      
      <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
        <Plus className="h-4 w-4" /> Add
      </Button>
    </div>
  );

  const renderContent = () => {
    switch(tab) {
      case 'courses':
        return renderCoursesContent();
      case 'modules':
        return renderModulesContent();
      case 'sections':
        return renderSectionsContent();
      case 'assessments':
        return renderAssessmentsContent();
      case 'groups':
        return renderGroupsContent();
      case 'resources':
        return renderResourcesContent();
      case 'forums':
        return renderForumsContent();
      default:
        return <div>Coming soon...</div>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Automation Settings" 
        description="Configure automated tasks and workflows"
        icon={<Workflow className="h-6 w-6 text-primary" />}
      />
      
      <div className="p-4">
        <Tabs value={tab} className="w-full" onValueChange={handleTabChange}>
          <TabsList className="h-12 p-0 bg-transparent w-full justify-start gap-1 overflow-x-auto">
            {[
              { value: 'courses', label: 'Courses' },
              { value: 'modules', label: 'Modules' },
              { value: 'sections', label: 'Sections' },
              { value: 'assessments', label: 'Assessments' },
              { value: 'groups', label: 'Groups' },
              { value: 'resources', label: 'Resources' },
              { value: 'forums', label: 'Forums' }
            ].map((tabItem) => (
              <TabsTrigger 
                key={tabItem.value} 
                value={tabItem.value}
                className={cn(
                  "px-6 py-3 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium",
                )}
              >
                {tabItem.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default AutomationSettings;
