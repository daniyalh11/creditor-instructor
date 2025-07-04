import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/shared/PageHeader';
import { Pencil, Globe } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AboutSettings = () => {
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your about settings have been updated successfully."
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="About Settings" 
        description="Manage institution information and details"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Institution Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative max-w-md mx-auto md:mx-0">
                <div className="bg-blue-600 h-24 rounded-t-lg flex items-center justify-center">
                  <div className="text-white text-xl font-bold">Creditor Academy</div>
                </div>
                <div className="border border-t-0 rounded-b-lg p-4">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gray-200 rounded-lg w-24 h-24 flex items-center justify-center -mt-16 border-4 border-white">
                      <div className="text-2xl font-bold text-blue-600">CA</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-blue-600 font-medium">
                      <a href="https://www.creditoracademy.com" className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        creditoracademy.com
                      </a>
                      <div className="text-xs text-muted-foreground">(original url)</div>
                    </div>
                    <Button size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <span className="font-medium">Portal ID:</span>
                  <span className="ml-2">30389</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Info</h3>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" defaultValue="English (US)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time zone</Label>
                  <Input id="timezone" defaultValue="(GMT-08:00) Pacific Time (US & Canada)" />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="font-semibold">Contact</h3>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter contact email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fax">Fax</Label>
                  <Input id="fax" placeholder="Enter fax number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="WA, United States" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Administrators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Edtech Support', 'Farah Javed', 'PaulMichael Rowland', 'Samir Kumar', 'counselor Creditor'].map((admin, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="font-medium text-sm">
                        {admin.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{admin}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutSettings;