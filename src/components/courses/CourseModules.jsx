import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import AddModuleDialog from './AddModuleDialog';
import ModuleCard from './ModuleCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CourseModules = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const courseType = searchParams.get('type') || 'open';
  
  const [modules, setModules] = useState([]);
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);
  const [isPublishedCourse, setIsPublishedCourse] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load modules data based on courseId
  useEffect(() => {
    const loadModulesData = () => {
      setLoading(true);
      
      // Check if this is a published course from localStorage
      const publishedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      const publishedCourse = publishedCourses.find(course => course.id === courseId);
      
      if (publishedCourse) {
        setIsPublishedCourse(true);
        
        if (publishedCourse.modules && publishedCourse.modules.length > 0) {
          // Load published course modules with their actual units and assessments
          const courseModules = publishedCourse.modules.map((module, index) => ({
            id: module.id,
            title: module.title,
            description: module.description,
            units: module.units?.length || 0,
            assessments: module.assessments?.length || 0,
            duration: module.duration || `${Math.max(1, (module.units?.length || 0) + (module.assessments?.length || 0))} hours`,
            completed: false,
            locked: courseType === 'sequential' && index > 0,
          }));
          setModules(courseModules);
        } else {
          // No modules created for this published course
          setModules([]);
        }
      } else {
        setIsPublishedCourse(false);
        // Load default modules for existing courses (predefined courses)
        const defaultModules = [
          {
            id: 1,
            title: "Introduction to Business Trust",
            description: "Understanding the fundamentals of business trust structures and their applications in modern commerce.",
            units: 3,
            assessments: 1,
            duration: "2 hours",
            completed: false,
            locked: false,
          },
          {
            id: 2,
            title: "Kick-off: Why Digital Marketing Matters for Your Side Hustle",
            description: "Get an engaging, image-rich overview of how digital marketing fuels a side hustle's growth.",
            units: 7,
            assessments: 2,
            duration: "4 hours",
            completed: false,
            locked: courseType === 'sequential',
          },
          {
            id: 3,
            title: "Creating Magnetic Content and Social Presence",
            description: "Using storyboard exercises and visual templates, you'll practice crafting on-brand content",
            units: 5,
            assessments: 1,
            duration: "3 hours",
            completed: false,
            locked: courseType === 'sequential',
          },
          {
            id: 4,
            title: "Advanced Marketing Strategies",
            description: "Dive deep into advanced marketing techniques and automation tools",
            units: 4,
            assessments: 1,
            duration: "3 hours",
            completed: false,
            locked: courseType === 'sequential',
          },
          {
            id: 5,
            title: "Analytics and Performance Tracking",
            description: "Learn to measure and optimize your marketing performance using data-driven insights",
            units: 6,
            assessments: 2,
            duration: "4 hours",
            completed: false,
            locked: courseType === 'sequential',
          }
        ];
        setModules(defaultModules);
      }
      
      setLoading(false);
    };

    loadModulesData();
  }, [courseId, courseType]);

  const handleAddModule = () => {
    setIsAddModuleDialogOpen(true);
  };

  const handleModuleAdd = (newModule) => {
    setModules(prev => [...prev, newModule]);
  };

  const handleModuleDelete = (moduleId) => {
    setModules(prev => prev.filter(module => module.id !== moduleId));
    toast.success('Module deleted successfully');
  };

  const handleModuleUpdate = (updatedModule) => {
    setModules(prev => prev.map(module => 
      module.id === updatedModule.id ? updatedModule : module
    ));
  };

  const handleModuleComplete = (moduleId) => {
    setModules(prev => prev.map((module, index) => {
      if (module.id === moduleId) {
        const nextModule = prev[index + 1];
        const updatedModules = [...prev];
        
        // Mark current module as completed
        updatedModules[index] = { ...module, completed: true };
        
        // Unlock next module in sequential mode
        if (nextModule && courseType === 'sequential') {
          updatedModules[index + 1] = { ...nextModule, locked: false };
        }
        
        return updatedModules[index];
      }
      return module;
    }));
    
    toast.success('Module completed! Next module unlocked.');
  };

  if (loading) {
    return (
      <div className="p-6 animate-fade-in">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Loading modules...</span>
        </div>
      </div>
    );
  }

  // Show empty state for published courses with no modules
  if (isPublishedCourse && modules.length === 0) {
    return (
      <div className="p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate('/courses')} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Course Modules</h1>
              <p className="text-gray-600">No modules found for this course</p>
            </div>
          </div>
          <Button onClick={handleAddModule} className="bg-ca-primary hover:bg-ca-secondary">
            <Plus className="h-4 w-4 mr-2" />
            Add Module
          </Button>
        </div>

        <Card className="max-w-md mx-auto mt-8">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 bg-gray-100 rounded-full p-6 w-20 h-20 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <CardTitle className="text-xl">No Modules Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              This course doesn't have any modules yet. Create your first module to get started.
            </p>
            <Button onClick={handleAddModule} className="w-full bg-ca-primary hover:bg-ca-secondary">
              <Plus className="h-4 w-4 mr-2" />
              Create First Module
            </Button>
          </CardContent>
        </Card>

        <AddModuleDialog
          open={isAddModuleDialogOpen}
          onOpenChange={setIsAddModuleDialogOpen}
          onModuleAdd={handleModuleAdd}
        />
      </div>
    );
  }

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate('/courses')} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Course Modules</h1>
            <p className="text-gray-600">
              {courseType === 'sequential' 
                ? 'Complete modules in order to unlock the next one' 
                : 'Access modules in any order'}
              {isPublishedCourse && ' • Published Course'}
            </p>
          </div>
        </div>
        <Button onClick={handleAddModule} className="bg-ca-primary hover:bg-ca-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onDelete={handleModuleDelete}
            onUpdate={handleModuleUpdate}
            onComplete={handleModuleComplete}
            courseType={courseType}
          />
        ))}
      </div>

      <AddModuleDialog
        open={isAddModuleDialogOpen}
        onOpenChange={setIsAddModuleDialogOpen}
        onModuleAdd={handleModuleAdd}
      />
    </div>
  );
};

export default CourseModules;