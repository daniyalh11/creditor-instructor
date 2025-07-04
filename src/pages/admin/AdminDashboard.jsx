import React from 'react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { PageHeader } from '@/components/shared/PageHeader';

const AdminDashboardPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Dashboard" 
        description="Configure dashboard settings and preferences"
      />
      
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardPage;