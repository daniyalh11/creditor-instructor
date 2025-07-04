
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type SidebarContextType = {
  isMainOpen: boolean;
  toggleMain: () => void;
  closeMain: () => void;
  
  isAdminSectionActive: boolean;
  setAdminSectionActive: (active: boolean) => void;
  isMainCollapsed: boolean;
  setMainCollapsed: (collapsed: boolean) => void;
  isAdminSidebarOpen: boolean;
  toggleAdminSidebar: () => void;
  setAdminSidebarOpen: (open: boolean) => void;
  openAdminPanel: () => void;
  closeAdminPanel: () => void;

  isGroupSectionActive: boolean;
  setGroupSectionActive: (active: boolean) => void;
  isGroupSidebarOpen: boolean;
  toggleGroupSidebar: () => void;
  setGroupSidebarOpen: (open: boolean) => void;
  openGroupPanel: (groupId: string) => void;
  closeGroupPanel: () => void;
  activeGroupId: string | null;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isMainOpen, setIsMainOpen] = useState(true);
  const [isMainCollapsed, setIsMainCollapsed] = useState(false);
  
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);
  const [isAdminSectionActive, setIsAdminSectionActive] = useState(false);

  const [isGroupSidebarOpen, setIsGroupSidebarOpen] = useState(false);
  const [isGroupSectionActive, setIsGroupSectionActive] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

  const location = useLocation();
  
  useEffect(() => {
    const isInAdminSection = location.pathname.startsWith('/admin');
    const groupViewRegex = /^\/groups\/view\/([^/]+)/;
    const groupMatch = location.pathname.match(groupViewRegex);
    const isInGroupSection = !!groupMatch;
    const currentGroupId = groupMatch ? groupMatch[1] : null;
    
    const courseViewRegex = /^\/courses\/view\/([^/]+)/;
    const isCourseSection = location.pathname.match(courseViewRegex);

    // Only set one section active at a time
    if (isInAdminSection) {
      setIsAdminSectionActive(true);
      setIsGroupSectionActive(false);
      // Close group sidebar if navigating to admin
      setIsGroupSidebarOpen(false);
    } else if (isInGroupSection) {
      setIsGroupSectionActive(true);
      setIsAdminSectionActive(false);
      setActiveGroupId(currentGroupId);
      // Close admin sidebar if navigating to group
      setIsAdminSidebarOpen(false);
    } else {
      // If not in a specific section, close all contextual sidebars
      if (!isCourseSection) {
        setIsAdminSidebarOpen(false);
        setIsGroupSidebarOpen(false);
        setIsAdminSectionActive(false);
        setIsGroupSectionActive(false);
        setActiveGroupId(null);
        setIsMainCollapsed(false); // Expand main when no contextual sidebar
      }
    }
  }, [location.pathname]);
  
  const toggleMain = () => setIsMainOpen(!isMainOpen);
  const closeMain = () => setIsMainOpen(false);
  
  const toggleAdminSidebar = () => {
    const newState = !isAdminSidebarOpen;
    setIsAdminSidebarOpen(newState);
    if (newState) {
      // Close other contextual sidebars when opening admin sidebar
      setIsGroupSidebarOpen(false);
      setIsGroupSectionActive(false);
      setIsMainCollapsed(true); // Collapse main sidebar when admin is open
    } else {
      setIsAdminSectionActive(false); // If closing, also deactivate
      // Only expand main if no other sidebar is open
      setIsMainCollapsed(false);
    }
  };
  
  const openAdminPanel = () => {
    setIsMainCollapsed(true);
    setIsAdminSidebarOpen(true);
    setIsAdminSectionActive(true);
    // Close all other contextual sidebars when opening admin
    setIsGroupSidebarOpen(false);
    setIsGroupSectionActive(false);
  };
  
  const closeAdminPanel = () => {
    setIsAdminSidebarOpen(false);
    setIsAdminSectionActive(false);
    setIsMainCollapsed(false); // Expand main when closing admin panel
  };

  const toggleGroupSidebar = () => {
    const newState = !isGroupSidebarOpen;
    setIsGroupSidebarOpen(newState);
    if (newState) {
      // Close other contextual sidebars when opening group sidebar
      setIsAdminSidebarOpen(false);
      setIsAdminSectionActive(false);
      setIsMainCollapsed(true);
    } else {
      setIsGroupSectionActive(false);
      setIsMainCollapsed(false); // Expand main when closing group sidebar
    }
  };

  const openGroupPanel = (groupId: string) => {
    setActiveGroupId(groupId);
    setIsMainCollapsed(true);
    setIsGroupSidebarOpen(true);
    setIsGroupSectionActive(true);
    // Close all other contextual sidebars when opening group
    setIsAdminSidebarOpen(false);
    setIsAdminSectionActive(false);
  };

  const closeGroupPanel = () => {
    setIsGroupSidebarOpen(false);
    setIsGroupSectionActive(false);
    setActiveGroupId(null);
    setIsMainCollapsed(false); // Expand main when closing group panel
  };

  return (
    <SidebarContext.Provider 
      value={{ 
        isMainOpen, 
        toggleMain, 
        closeMain, 
        
        isAdminSectionActive,
        setAdminSectionActive: setIsAdminSectionActive,
        isMainCollapsed,
        setMainCollapsed: setIsMainCollapsed,
        isAdminSidebarOpen,
        toggleAdminSidebar,
        setAdminSidebarOpen: setIsAdminSidebarOpen,
        openAdminPanel,
        closeAdminPanel,

        isGroupSectionActive,
        setGroupSectionActive: setIsGroupSectionActive,
        isGroupSidebarOpen,
        toggleGroupSidebar,
        setGroupSidebarOpen: setIsGroupSidebarOpen,
        openGroupPanel,
        closeGroupPanel,
        activeGroupId
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
