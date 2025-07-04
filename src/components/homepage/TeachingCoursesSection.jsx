import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Calendar, Copy, ChevronRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TeachingCoursesSection() {
  const navigate = useNavigate();
  
  const courses = [
    {
      id: 1,
      title: 'Advanced React Development',
      code: 'CS-401',
      students: 24,
      progress: 75,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-100'
    },
    {
      id: 2,
      title: 'Node.js Backend Fundamentals',
      code: 'CS-402',
      students: 18,
      progress: 45,
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-100'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      code: 'DS-201',
      students: 15,
      progress: 90,
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-100'
    }
  ];

  const handleCreateCourse = () => {
    navigate('/courses/new');
  };

  const handleViewAllCourses = () => {
    navigate('/courses');
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Teaching Courses</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleViewAllCourses}>
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
          <Button size="sm" onClick={handleCreateCourse}>
            <Plus className="h-4 w-4 mr-1" /> Create Course
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {courses.map((course) => (
              <div key={course.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${course.color}`}>
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.code}</p>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {course.progress}% Complete
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{course.students}</span>
                    </div>
                    <Calendar className="h-4 w-4 cursor-pointer hover:text-blue-500 transition-colors" />
                    <Copy className="h-4 w-4 cursor-pointer hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default TeachingCoursesSection;