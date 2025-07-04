
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { HelpCircle } from 'lucide-react';

const HelpDeskSettings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Help Desk Settings" 
        description="Configure help desk and support options"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Help Desk Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Configure help desk and support options for users.</p>
          <Button>Save Help Desk Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpDeskSettings;
