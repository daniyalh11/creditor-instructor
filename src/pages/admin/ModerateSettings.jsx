import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsContent, TabsList, PillTabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ThumbsUp } from 'lucide-react';

const ModerateSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab: activeTabParam } = useParams();
  
  // Default to 'users' tab if no tab is specified in URL or if it's an unknown tab
  const validTabs = ['users']; // Add more valid tabs here if needed in the future
  const activeTab = (activeTabParam && validTabs.includes(activeTabParam)) ? activeTabParam : 'users';

  React.useEffect(() => {
    // If directly navigating to /admin/moderate or an invalid tab, redirect to /admin/moderate/users
    if (location.pathname === '/admin/moderate' || activeTabParam !== activeTab) {
      navigate(`/admin/moderate/users`, { replace: true });
    }
  }, [location.pathname, navigate, activeTabParam, activeTab]);

  const handleTabChange = (value) => {
    navigate(`/admin/moderate/${value}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Moderate" 
        description="Manage reported users and content."
        icon={<ThumbsUp className="h-6 w-6 text-primary" />} 
      />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-4 bg-transparent p-0">
          <PillTabsTrigger value="users">Users</PillTabsTrigger>
          {/* Example: <PillTabsTrigger value="content">Content</PillTabsTrigger> */}
        </TabsList>
        
        <TabsContent value="users">
          <div>
            <h2 className="text-xl font-semibold mb-4">User reports</h2>
            <p className="text-muted-foreground">No users are currently reported.</p>
            {/* Future content for user reports can go here */}
          </div>
        </TabsContent>
        {/* Example: 
        <TabsContent value="content">
          <div>
            <h2 className="text-xl font-semibold mb-4">Reported Content</h2>
            <p className="text-muted-foreground">No content is currently reported.</p>
          </div>
        </TabsContent> 
        */}
      </Tabs>
    </div>
  );
};

export default ModerateSettings;