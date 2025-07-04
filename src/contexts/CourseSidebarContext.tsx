
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from './SidebarContext';

type CourseActionType = 'catalog' | 'list' | 'enroll' | 'add' | 'none';

type CourseSidebarContextType = {
  isCourseSection: boolean;
  setIsCourseSection: (value: boolean) => void;
  isCourseSidebarOpen: boolean;
  setCourseSidebarOpen: (open: boolean) => void;
  openCourseSidebar: (courseId: string, title: string) => void;
  closeCourseSidebar: () => void;
  activeCourseId: string | null;
  courseTitle: string;
  setCourseTitle: (title: string) => void;
  courseAction: CourseActionType;
  setCourseAction: (action: CourseActionType) => void;
  isEnrollDialogOpen: boolean;
  setEnrollDialogOpen: (open: boolean) => void;
  isAddCourseDialogOpen: boolean;
  setAddCourseDialogOpen: (open: boolean) => void;
};

const CourseSidebarContext = createContext<CourseSidebarContextType | undefined>(undefined);

export function CourseSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCourseSection, setIsCourseSection] = useState(false);
  const [isCourseSidebarOpen, setCourseSidebarOpen] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [courseTitle, setCourseTitle] = useState('Course');
  const [courseAction, setCourseAction] = useState<CourseActionType>('none');
  const [isEnrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [isAddCourseDialogOpen, setAddCourseDialogOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { setMainCollapsed, setAdminSidebarOpen, setGroupSidebarOpen } = useSidebar();
  
  useEffect(() => {
    const courseViewRegex = /^\/courses\/view\/([^/]+)/;
    const courseMatch = location.pathname.match(courseViewRegex);
    const isInCourseSection = !!courseMatch;
    const currentCourseId = courseMatch ? courseMatch[1] : null;

    // Only update state if there's an actual change
    if (isInCourseSection !== isCourseSection) {
      setIsCourseSection(isInCourseSection);
    }
    
    if (isInCourseSection && currentCourseId) {
      // Only update if course ID changed
      if (currentCourseId !== activeCourseId) {
        setActiveCourseId(currentCourseId);
      }
      
      // Only open sidebar if it's not already open
      if (!isCourseSidebarOpen) {
        setCourseSidebarOpen(true);
        setMainCollapsed(true);
        
        // Close other contextual sidebars
        setAdminSidebarOpen(false);
        setGroupSidebarOpen(false);
      }
    } else if (!isInCourseSection && isCourseSection) {
      // Only close and expand main sidebar if we're completely leaving the course section
      setCourseSidebarOpen(false);
      setActiveCourseId(null);
      setMainCollapsed(false);
    }
  }, [location.pathname, isCourseSection, activeCourseId, isCourseSidebarOpen, setMainCollapsed, setAdminSidebarOpen, setGroupSidebarOpen]);

  const openCourseSidebar = (courseId: string, title: string) => {
    setActiveCourseId(courseId);
    setCourseTitle(title);
    setIsCourseSection(true);
    
    // Use a small delay to ensure state updates are processed
    setTimeout(() => {
      setCourseSidebarOpen(true);
      setMainCollapsed(true);
      
      // Close other contextual sidebars
      setAdminSidebarOpen(false);
      setGroupSidebarOpen(false);
      
      navigate(`/courses/view/${courseId}/modules`);
    }, 50);
  };

  const closeCourseSidebar = () => {
    setCourseSidebarOpen(false);
    setIsCourseSection(false);
    setActiveCourseId(null);
    setMainCollapsed(false);
    navigate('/courses');
  };

  return (
    <CourseSidebarContext.Provider
      value={{
        isCourseSection,
        setIsCourseSection,
        isCourseSidebarOpen,
        setCourseSidebarOpen,
        openCourseSidebar,
        closeCourseSidebar,
        activeCourseId,
        courseTitle,
        setCourseTitle,
        courseAction,
        setCourseAction,
        isEnrollDialogOpen,
        setEnrollDialogOpen,
        isAddCourseDialogOpen,
        setAddCourseDialogOpen
      }}
    >
      {children}
    </CourseSidebarContext.Provider>
  );
}

export function useCourseSidebar() {
  const context = useContext(CourseSidebarContext);
  if (context === undefined) {
    throw new Error('useCourseSidebar must be used within a CourseSidebarProvider');
  }
  return context;
}
