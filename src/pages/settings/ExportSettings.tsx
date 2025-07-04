
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { Download } from 'lucide-react';

const ExportSettings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Export Settings" 
        description="Configure data export options and formats"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Configure data export options and formats.</p>
          <Button>Export Data</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportSettings;
