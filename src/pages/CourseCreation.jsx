import React from 'react';
import CourseCreationForm from '@/components/courses/CourseCreationForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseCreation = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => navigate('/courses')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Create New Course</h1>
      </div>
      
      <CourseCreationForm />
    </div>
  );
};

export default CourseCreation;