
import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Settings, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TurnitinSettings = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [integration, setIntegration] = useState("disabled");

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Turnitin" 
        description="Configure Turnitin integration settings"
        icon={<FileText className="h-6 w-6 text-primary" />}
      />
      
      <Card className="border-t-0 rounded-t-none">
        <CardContent className="p-0">
          <div className="flex border-b">
            <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
              <TabsList className="h-12 p-0 bg-transparent w-full justify-start">
                {[
                  { value: 'summary', label: 'Summary' },
                  { value: 'configure', label: 'Configure' },
                ].map((tab) => (
                  <TabsTrigger 
                    key={tab.value} 
                    value={tab.value}
                    className="px-8 py-3 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary font-medium"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          <div className="p-6">
            {activeTab === "summary" && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium">Status</h2>
                
                <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                  <div className="flex justify-between items-center">
                    <AlertDescription className="text-base">
                      Your Turnitin integration is disabled.
                    </AlertDescription>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Alert>
                
                <Button className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configure
                </Button>
              </div>
            )}
            
            {activeTab === "configure" && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium">Credentials</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountId">Account ID</Label>
                    <Input id="accountId" placeholder="Enter your Turnitin account ID" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sharedSecret">Shared secret</Label>
                    <Input id="sharedSecret" type="password" placeholder="Enter your shared secret" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Use UK version</Label>
                    <RadioGroup defaultValue="no" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="uk-yes" />
                        <Label htmlFor="uk-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="uk-no" />
                        <Label htmlFor="uk-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Button className="mt-4">Save</Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TurnitinSettings;
