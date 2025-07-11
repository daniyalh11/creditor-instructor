import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, FileText, MessageSquare, ArrowLeft } from 'lucide-react';

const ScoresOverview = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'quiz',
      title: 'Quiz Section',
      icon: BarChart3,
      description: 'View and analyze your quiz performance',
      color: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200'
    },
    {
      id: 'essay',
      title: 'Essay Section',
      icon: FileText,
      description: 'Review your essay submissions and feedback',
      color: 'bg-purple-100',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-200'
    },
    {
      id: 'assignment',
      title: 'Assignment Section',
      icon: Users,
      description: 'Track your assignment submissions and grades',
      color: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200'
    },
    {
      id: 'debate',
      title: 'Debate Section',
      icon: MessageSquare,
      description: 'View your debate performance and feedback',
      color: 'bg-orange-100',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-200'
    }
  ];

  const handleSectionClick = (sectionId) => {
    navigate(`/scores/${sectionId}`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="h-9 w-9 rounded-full border border-gray-200"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Scores Overview</h1>
          <p className="text-gray-600">Select a section to view detailed performance metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card 
              key={section.id}
              className={`${section.borderColor} border-2 hover:shadow-md transition-shadow cursor-pointer`}
              onClick={() => handleSectionClick(section.id)}
            >
              <CardHeader className={`${section.color} ${section.textColor} pb-2`}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <div className="p-2 rounded-md bg-white bg-opacity-30">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">{section.description}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-3 text-blue-600 hover:text-blue-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSectionClick(section.id);
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ScoresOverview;
