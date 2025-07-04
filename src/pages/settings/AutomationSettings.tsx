
import React from 'react';
import { Card, CardContent } from '@/components/ui/card'; // Removed CardHeader, CardTitle
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { Settings, Workflow } from 'lucide-react'; // Settings icon might be unused now
import { useNavigate } from 'react-router-dom';

const AutomationSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Automation Settings" 
        description="Configure automated workflows and triggers"
        icon={<Workflow className="h-6 w-6 text-primary" />}
      />

      <Card>
        {/* CardHeader and CardTitle removed */}
        <CardContent className="space-y-6 pt-6"> {/* Added pt-6 for padding if CardHeader is removed */}
          <p className="text-muted-foreground">Configure automated workflows and triggers for your platform.</p>
          
          <Button onClick={() => navigate('/admin/automation')} variant="default">
            Edit Automation Rules
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationSettings;

