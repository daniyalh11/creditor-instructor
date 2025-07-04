
import React from 'react';
import { Activity } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const ActivitySettings = () => {
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Activity display settings updated successfully."
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Activity Display Settings" 
        description="Configure activity indicators and display options"
      />

      <Card>
        <CardHeader>
          <CardTitle>General Activity Display</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="home-enrolled">Display animated activity indicators on tiles in Home/Enrolled</Label>
              <Switch id="home-enrolled" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="home-teaching">Display animated activity indicators on tiles in Home/Teaching</Label>
              <Switch id="home-teaching" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="home-groups">Display animated activity indicators on tiles in Home/Groups</Label>
              <Switch id="home-groups" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Courses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Note that even if the activity widget is enabled for all courses, they can still be disabled individually.
          </p>
          
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="instructor-view">Enable the activity widget in the instructor view of all courses</Label>
              <Switch id="instructor-view" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="learner-view">Enable the activity widget in the learner view of all courses</Label>
              <Switch id="learner-view" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Groups</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Note that even if the activity widget is enabled for all groups, they can still be disabled individually.
          </p>
          
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="all-groups">Enable the activity widget in all groups</Label>
              <Switch id="all-groups" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default ActivitySettings;
