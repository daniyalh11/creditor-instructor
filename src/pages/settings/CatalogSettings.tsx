
import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from '@/lib/utils';
import { Pencil, ImagePlus, Plus } from 'lucide-react';

const CatalogSettings = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [pageSize, setPageSize] = useState("50");
  const [format, setFormat] = useState("Graphic");

  const catalogOptions = [
    { id: "enableSearch", label: "Enable catalog search", checked: true },
    { id: "enableCalendar", label: "Enable catalog calendar", checked: false },
    { id: "enableLocationFiltering", label: "Enable location filtering", checked: false },
  ];

  const advancedOptions = [
    { id: "displayItemsForDefaultOrg", label: "Display items for default organization in all catalogs", checked: true },
    { id: "onlyDisplayDefaultOrgInVisitor", label: "Only display items from default organization in visitor catalog (recommended)", checked: true },
    { id: "dontApplyRulesForSuperAdmins", label: "Don't apply item and category visibility rules to super admins", checked: true },
    { id: "onlyShowOpenEnrollment", label: "Only show open enrollment courses/paths in visitor catalog", checked: false },
    { id: "hideOldCourses", label: "Hide old courses", checked: false },
  ];

  const rightColumnOptions = [
    { id: "showFeaturedItems", label: "Show list of featured items", checked: false },
    { id: "showBoxes", label: "Show boxes", checked: false },
  ];

  const categories = [
    { id: 1, name: "DRAFT", visibilityFilter: "none" },
    { id: 2, name: "General", visibilityFilter: "none" },
    { id: 3, name: "Junior", visibilityFilter: "none" },
    { id: 4, name: "NEW COURSE", visibilityFilter: "none" },
    { id: 5, name: "SOVEREIGNTY 101", visibilityFilter: "none" },
    { id: 6, name: "MODULE 1: Understanding Sovereignty and Government Authority", visibilityFilter: "none" },
    { id: 7, name: "UNIT 1: Sovereignty and Governance", visibilityFilter: "none" },
    { id: 8, name: "UNIT 2: Sovereign Immunity", visibilityFilter: "none" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Catalog Settings" 
        description="Configure the course catalog and display options"
      />
      
      <div className="bg-white border-b">
        <Tabs value={activeTab} className="p-1" onValueChange={setActiveTab}>
          <TabsList className="h-12 p-0 bg-transparent w-full justify-start gap-1 overflow-x-auto">
            <TabsTrigger 
              value="settings"
              className={cn(
                "px-6 py-3 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium",
              )}
            >
              Settings
            </TabsTrigger>
            <TabsTrigger 
              value="categories"
              className={cn(
                "px-6 py-3 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium",
              )}
            >
              Categories
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4 bg-white rounded-lg border">
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-medium mb-4">Introduction</h2>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">None</span>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Pencil className="h-4 w-4 mr-2" /> Edit
                </Button>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Pagination</h2>
              <div className="flex items-center gap-2">
                <span className="w-24">Page size</span>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Options</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-sm">Option</th>
                    <th className="text-right font-medium text-sm">Setting</th>
                  </tr>
                </thead>
                <tbody>
                  {catalogOptions.map((option) => (
                    <tr key={option.id} className="h-10">
                      <td>{option.label}</td>
                      <td className="text-right">
                        <Checkbox id={option.id} checked={option.checked} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Layout</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-sm">Feature</th>
                    <th className="text-right font-medium text-sm">Setting</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-10">
                    <td>Format</td>
                    <td className="text-right">
                      <Select value={format} onValueChange={setFormat}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Graphic">Graphic</SelectItem>
                          <SelectItem value="List">List</SelectItem>
                          <SelectItem value="Grid">Grid</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-sm">Feature</th>
                    <th className="text-right font-medium text-sm">Setting</th>
                  </tr>
                </thead>
                <tbody>
                  {advancedOptions.map((option) => (
                    <tr key={option.id} className="h-10">
                      <td>{option.label}</td>
                      <td className="text-right">
                        <Checkbox id={option.id} checked={option.checked} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Right column</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-sm">Feature</th>
                    <th className="text-right font-medium text-sm">Setting</th>
                  </tr>
                </thead>
                <tbody>
                  {rightColumnOptions.map((option) => (
                    <tr key={option.id} className="h-10">
                      <td>{option.label}</td>
                      <td className="text-right">
                        <Checkbox id={option.id} checked={option.checked} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Boxes</h2>
              <p className="text-muted-foreground">There are no boxes.</p>
              <Button className="mt-4 flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
          </div>
        )}
        
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Categories</h2>
              <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
            
            <Button variant="outline" className="mr-2">Delete</Button>
            
            <table className="w-full mt-4 border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-3 py-2 text-left w-6">
                    <Checkbox id="select-all" />
                  </th>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Visibility filter</th>
                  <th className="px-3 py-2 text-center">Edit</th>
                  <th className="px-3 py-2 text-center">Picture</th>
                  <th className="px-3 py-2 text-center">SEO Metadata</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <Checkbox id={`category-${category.id}`} />
                    </td>
                    <td className="px-3 py-2">{category.name}</td>
                    <td className="px-3 py-2">
                      {category.visibilityFilter}
                      <Button variant="ghost" size="sm" className="ml-2">+</Button>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <Button variant="ghost" size="icon">
                        <ImagePlus className="h-4 w-4" />
                      </Button>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <Button variant="ghost" size="icon">+</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogSettings;
