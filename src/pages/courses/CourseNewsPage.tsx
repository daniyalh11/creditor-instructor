
import React from 'react';
import CourseNews from '@/components/courses/CourseNews';
import { useParams } from 'react-router-dom';

const CourseNewsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  
  return (
    <div className="p-4 animate-fade-in">
      <CourseNews />
    </div>
  );
};

export default CourseNewsPage;
