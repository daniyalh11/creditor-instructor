import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Clock, Filter, Search, Plus, Grid, List, Compass, UserPlus, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
import { EnrollCourseDialog } from '@/components/courses/EnrollCourseDialog';
import { CourseOptionsMenu } from '@/components/courses/CourseOptionsMenu';
import { Tabs, TabsList, TabsTrigger, PillTabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';

const Courses = () => {
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const [courseType, setCourseType] = useState('open');
  const [activeTab, setActiveTab] = useState('courses');
  const navigate = useNavigate();

  // Extended mock courses data with comprehensive IT courses
  const mockCourses = [
    {
      id: 1,
      title: "Advanced JavaScript",
      description: "Master modern JavaScript concepts and ES6+ features",
      students: 45,
      duration: "8 weeks",
      level: "Advanced",
      status: "Active",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop&auto=format",
      archived: false,
      deleted: false,
      catalog: "Web Development"
    },
    {
      id: 2,
      title: "React Development",
      description: "Build modern web applications with React",
      students: 62,
      duration: "10 weeks",
      level: "Intermediate",
      status: "Active",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&auto=format",
      archived: false,
      deleted: false,
      catalog: "Web Development"
    },
    {
      id: 3,
      title: "Node.js Backend",
      description: "Server-side development with Node.js and Express",
      students: 38,
      duration: "6 weeks",
      level: "Intermediate",
      status: "Active",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop&auto=format",
      archived: false,
      deleted: false,
      catalog: "Web Development"
    },
    {
      id: 4,
      title: "Python for Data Science",
      description: "Data analysis and machine learning with Python",
      students: 71,
      duration: "12 weeks",
      level: "Beginner",
      status: "Active",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop&auto=format",
      archived: false,
      deleted: false,
      catalog: "Data Science"
    },
    {
      id: 5,
      title: "Machine Learning Fundamentals",
      description: "Introduction to machine learning algorithms and techniques",
      students: 55,
      duration: "10 weeks",
      level: "Intermediate",
      status: "Active",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&auto=format",
      archived: false,
      deleted: false,
      catalog: "Data Science"
    },
    {
      id: 6,
      title: "React Native Development",
      description: "Build cross-platform mobile apps with React Native",
      students: 34,
      duration: "8 weeks",
      level: "Advanced",
      status: "Active",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&auto=format",
      archived: false,
      deleted: false,
      catalog: "Mobile Development"
    },
    {
      id: 7,
      title: "Cloud Computing with AWS",
      description: "Deploy and manage applications on Amazon Web Services",
      students: 42,
      duration: "8 weeks",
      level: "Advanced",
      status: "Active",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&auto=format",
      archived: false,
      deleted: false,
      catalog: "DevOps"
    },
    {
      id: 8,
      title: "Docker & Kubernetes",
      description: "Containerization and orchestration fundamentals",
      students: 39,
      duration: "6 weeks",
      level: "Intermediate",
      status: "Active",
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=300&fit=crop&auto=format",
      archived: false,
      deleted: false,
      catalog: "DevOps"
    },
    {
      id: 9,
      title: "Full Stack Development",
      description: "Complete web development from frontend to backend",
      students: 89,
      duration: "16 weeks",
      level: "Advanced",
      status: "Active",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&auto=format",
      archived: false,
      deleted: false,
      catalog: "Web Development"
    },
    {
      id: 10,
      title: "iOS Development with Swift",
      description: "Build native iOS applications using Swift and Xcode",
      students: 28,
      duration: "12 weeks",
      level: "Intermediate",
      status: "Active",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&auto=format",
      archived: false,
      deleted: false,
      catalog: "Mobile Development"
    },
    {
      id: 11,
      title: "Cybersecurity Fundamentals",
      description: "Learn essential cybersecurity principles and practices",
      students: 67,
      duration: "10 weeks",
      level: "Beginner",
      status: "Active",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=300&fit=crop&auto=format",
      archived: false,
      deleted: false,
      catalog: "Cybersecurity"
    },
    {
      id: 12,
      title: "Database Design & SQL",
      description: "Comprehensive database design and SQL programming",
      students: 52,
      duration: "8 weeks",
      level: "Beginner",
      status: "Active",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop&auto=format",
      archived: false,
      deleted: false,
      catalog: "Database Management"
    }
  ];

  const [courses, setCourses] = useState(mockCourses);

  // Load published courses from localStorage
  useEffect(() => {
    const publishedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    
    // Transform published courses to match the expected format
    const transformedPublishedCourses = publishedCourses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description || 'Published course with comprehensive content',
      students: course.students || 0,
      duration: course.modules?.reduce((total, module) => {
        const moduleDuration = parseInt(module.duration) || 0;
        return total + moduleDuration;
      }, 0) + ' hours' || '0 hours',
      level: 'Intermediate',
      status: course.status || 'Published',
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format",
      archived: false,
      deleted: false,
      catalog: course.category || 'General',
      modules: course.modules || [],
      publishedAt: course.publishedAt
    }));

    // Combine mock courses with published courses
    setCourses(prevCourses => [...prevCourses, ...transformedPublishedCourses]);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'courses') return matchesSearch && !course.archived && !course.deleted;
    if (activeTab === 'archived') return matchesSearch && course.archived && !course.deleted;
    if (activeTab === 'deleted') return matchesSearch && course.deleted;
    
    return matchesSearch;
  });

  const handleCourseClick = (courseId) => {
    navigate(`/courses/view/${courseId}?type=${courseType}`);
  };

  const handleCatalogClick = () => {
    navigate('/catalog');
    toast({
      title: "Catalog",
      description: "Redirecting to course catalog",
    });
  };

  const handleCreateCourse = () => {
    navigate('/courses/create');
  };

  const handleCourseEdit = (courseId, courseName) => {
    navigate(`/courses/edit/${courseId}`);
    toast({
      title: "Edit Course",
      description: `Opening edit page for ${courseName}`,
    });
  };

  const handleCourseArchive = (courseId, courseName) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, archived: true } : course
      )
    );
    toast({
      title: "Course Archived",
      description: `${courseName} has been moved to archived courses.`,
    });
  };

  const handleCourseDelete = (courseId, courseName) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, deleted: true, archived: false } : course
      )
    );
    toast({
      title: "Course Deleted",
      description: `${courseName} has been moved to deleted courses.`,
    });
  };

  const handleCourseRestore = (courseId, courseName) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId ? { ...course, deleted: false, archived: false } : course
      )
    );
    toast({
      title: "Course Restored",
      description: `${courseName} has been restored to active courses.`,
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Published': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground mt-2">
            Manage your course catalog and create new learning experiences
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsEnrollDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Enroll
          </Button>
          <Button onClick={handleCreateCourse}>
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Course Tabs - Templates removed */}
      <div className="flex items-center gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-cyan-50 p-1">
            <PillTabsTrigger value="courses" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white">
              Courses {courses.filter(c => !c.archived && !c.deleted).length}
            </PillTabsTrigger>
            <PillTabsTrigger value="archived" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white">
              Archived {courses.filter(c => c.archived && !c.deleted).length}
            </PillTabsTrigger>
            <PillTabsTrigger value="deleted" className="data-[state=active]:bg-cyan-400 data-[state=active]:text-white">
              Deleted {courses.filter(c => c.deleted).length}
            </PillTabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {/* Catalog Button */}
          <Button 
            variant="outline" 
            onClick={handleCatalogClick}
            className="flex items-center gap-2"
          >
            <Compass className="h-4 w-4" />
            Catalog
          </Button>

          {/* Sequential/Open Toggle */}
          <Tabs value={courseType} onValueChange={(value) => setCourseType(value)}>
            <TabsList className="bg-blue-50">
              <TabsTrigger value="open" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                Open
              </TabsTrigger>
              <TabsTrigger value="sequential" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Sequential
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* View Toggle */}
          <Tabs value={view} onValueChange={(value) => setView(value)}>
            <TabsList>
              <TabsTrigger value="grid" className="flex items-center gap-2">
                <Grid className="h-4 w-4" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer" >
              <div className="h-48 overflow-hidden relative">
                <img 
                 onClick={() => handleCourseClick(course.id)}
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                  <div className="bg-white/90 rounded-md">
                    <CourseOptionsMenu 
                      courseId={course.id} 
                      courseName={course.title}
                      onEdit={handleCourseEdit}
                      onArchive={handleCourseArchive}
                      onDelete={handleCourseDelete}
                      onRestore={handleCourseRestore}
                      isDeleted={course.deleted}
                    />
                  </div>
                </div>
                {/* Course Type Indicator */}
                <div className="absolute top-2 left-2">
                  {courseType === 'sequential' ? (
                    <Badge variant="outline" className="text-orange-600 border-orange-300 bg-white/90">
                      Sequential
                    </Badge>
                  ) : (
                    <Badge className="bg-green-500 text-white border-green-400">
                      Open Access
                    </Badge>
                  )}
                </div>
              </div>
              <CardHeader className="pb-2"  onClick={() => handleCourseClick(course.id)}>
                <CardTitle className="text-lg font-semibold line-clamp-1">
                  {course.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>
              </CardHeader>
              <CardContent onClick={() => handleCourseClick(course.id)}>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {course.catalog}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-medium">Course</th>
                    <th className="text-left p-4 font-medium">Catalog</th>
                    <th className="text-left p-4 font-medium">Students</th>
                    <th className="text-left p-4 font-medium">Duration</th>
                    <th className="text-left p-4 font-medium">Level</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Access Type</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div 
                            className="cursor-pointer"
                            onClick={() => handleCourseClick(course.id)}
                          >
                            <h3 className="font-medium text-blue-600 hover:text-blue-800">
                              {course.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {course.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-xs">
                          {course.catalog}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{course.students}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(course.status)}>
                          {course.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        {courseType === 'sequential' ? (
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            Sequential
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500 text-white border-green-400">
                            Open Access
                          </Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <CourseOptionsMenu 
                          courseId={course.id} 
                          courseName={course.title}
                          onEdit={handleCourseEdit}
                          onArchive={handleCourseArchive}
                          onDelete={handleCourseDelete}
                          onRestore={handleCourseRestore}
                          isDeleted={course.deleted}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <EnrollCourseDialog 
        open={isEnrollDialogOpen} 
        onOpenChange={setIsEnrollDialogOpen} 
      />
    </div>
  );
};

export default Courses;