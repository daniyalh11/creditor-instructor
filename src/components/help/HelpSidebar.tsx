
import React from 'react';
import { cn } from '@/lib/utils';
import { FileText, MessageSquare, BookOpen, Ticket } from 'lucide-react';

interface HelpSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const helpSections = [
  { id: 'faqs', label: 'FAQs', icon: FileText },
  { id: 'contact', label: 'Contact Support', icon: MessageSquare },
  { id: 'guides', label: 'User Guides', icon: BookOpen },
  { id: 'ticket', label: 'Support Ticket', icon: Ticket },
];

export const HelpSidebar = ({ activeSection, onSectionChange }: HelpSidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Help & Support</h2>
      </div>
      <nav className="p-2">
        {helpSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors",
                activeSection === section.id
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{section.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
