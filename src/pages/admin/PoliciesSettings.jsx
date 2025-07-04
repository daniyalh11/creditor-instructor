import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsContent, TabsList, PillTabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import GeneralPoliciesTab from '@/components/admin/policies/GeneralPoliciesTab';
import AdministratorsPoliciesTab from '@/components/admin/policies/AdministratorsPoliciesTab';
import InstructorsPoliciesTab from '@/components/admin/policies/InstructorsPoliciesTab';
import LearnersPoliciesTab from '@/components/admin/policies/LearnersPoliciesTab';
import ManagersPoliciesTab from '@/components/admin/policies/ManagersPoliciesTab';

const PoliciesSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab: activeTabParam } = useParams();
  
  const validTabs = ['general', 'administrators', 'instructors', 'learners', 'managers'];
  const activeTab = (activeTabParam && validTabs.includes(activeTabParam)) ? activeTabParam : 'general';

  React.useEffect(() => {
    if (location.pathname === '/admin/policies' || (activeTabParam && !validTabs.includes(activeTabParam))) {
      navigate(`/admin/policies/general`, { replace: true });
    } else if (!activeTabParam && location.pathname.startsWith('/admin/policies/')) {
      // Handles cases where /admin/policies/ is accessed without a tab
      const pathSegments = location.pathname.split('/');
      const potentialTab = pathSegments[pathSegments.length -1];
      if (!validTabs.includes(potentialTab)) {
        navigate(`/admin/policies/general`, { replace: true });
      }
    }
  }, [location.pathname, navigate, activeTabParam, validTabs]);

  const handleTabChange = (value) => {
    navigate(`/admin/policies/${value}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Policies" 
        description="Manage system-wide policies and permissions."
        icon={<ShieldCheck className="h-6 w-6 text-primary" />} 
      />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-4 bg-transparent p-0">
          <PillTabsTrigger value="general">General</PillTabsTrigger>
          <PillTabsTrigger value="administrators">Administrators</PillTabsTrigger>
          <PillTabsTrigger value="instructors">Instructors</PillTabsTrigger>
          <PillTabsTrigger value="learners">Learners</PillTabsTrigger>
          <PillTabsTrigger value="managers">Managers</PillTabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <GeneralPoliciesTab />
        </TabsContent>
        <TabsContent value="administrators">
          <AdministratorsPoliciesTab />
        </TabsContent>
        <TabsContent value="instructors">
          <InstructorsPoliciesTab />
        </TabsContent>
        <TabsContent value="learners">
          <LearnersPoliciesTab />
        </TabsContent>
        <TabsContent value="managers">
          <ManagersPoliciesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PoliciesSettings;