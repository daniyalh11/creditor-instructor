
import React from 'react';
import { TeachingCoursesSection } from './TeachingCoursesSection';
import { ZoomClassesSection } from './ZoomClassesSection';
import { WidgetsSection } from './WidgetsSection';
import { TaskListSection } from './TaskListSection';
import { AnnouncementSection } from './AnnouncementSection';
import { CalendarSection } from './CalendarSection';
import { WelcomeSection } from './WelcomeSection';

export function StudentDashboard() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 animate-fade-in max-w-[1400px] mx-auto items-start">
      {/* Main Content */}
      <div className="space-y-6 min-w-0">
        <WelcomeSection />
        <TeachingCoursesSection />
        <ZoomClassesSection />
        <WidgetsSection />
      </div>
      
      {/* Right Column - Optimized width and spacing */}
      <div className="space-y-4 lg:sticky lg:top-20 w-full">
        <TaskListSection />
        <AnnouncementSection />
        <CalendarSection />
      </div>
    </div>
  );
}
