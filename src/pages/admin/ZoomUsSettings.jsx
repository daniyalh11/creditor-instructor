import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ZoomUsSettings = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [integration, setIntegration] = useState("disabled");

  return (
    <div className="space-y-6">
      <PageHeader 
        title="ZoomUS API" 
        description="Configure Zoom meeting integration settings"
        icon={<Video className="h-6 w-6 text-primary" />}
      />
      
      <Card className="border-t-0 rounded-t-none">
        <CardContent className="p-0">
          <div className="flex border-b">
            <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
              <TabsList className="h-12 p-0 bg-transparent w-full justify-start">
                {[
                  { value: 'summary', label: 'Summary' },
                  { value: 'settings', label: 'Settings' },
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
                      ZoomUS API is not currently configured
                    </AlertDescription>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Alert>
                
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => setActiveTab("settings")}
                >
                  Configure
                </Button>
              </div>
            )}
            
            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium">ZoomUS API</h2>
                <p className="text-muted-foreground">Please enter the Client ID, Client secret and Account ID for Zoom.</p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientId">Client ID</Label>
                    <Input id="clientId" placeholder="Enter your Zoom Client ID" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="clientSecret">Client secret</Label>
                    <Input id="clientSecret" type="password" placeholder="Enter your Client secret" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accountId">Account ID</Label>
                    <Input id="accountId" placeholder="Enter your Account ID" />
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

export default ZoomUsSettings;