import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, Users, FileText, MessageSquare } from 'lucide-react';

const sectionData = {
  quiz: {
    title: 'Quiz Section',
    icon: BarChart3,
    description: 'Performance across all quiz assessments',
    color: 'bg-blue-100',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800'
  },
  essay: {
    title: 'Essay Section',
    icon: FileText,
    description: 'Performance across all essay assessments',
    color: 'bg-purple-100',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800'
  },
  assignment: {
    title: 'Assignment Section',
    icon: Users,
    description: 'Performance across all assignment assessments',
    color: 'bg-green-100',
    borderColor: 'border-green-200',
    textColor: 'text-green-800'
  },
  debate: {
    title: 'Debate Section',
    icon: MessageSquare,
    description: 'Performance across all debate assessments',
    color: 'bg-orange-100',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-800'
  }
};

export const SectionScores = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  
  const sectionInfo = sectionData[section] || {
    title: 'Section Not Found',
    description: 'The requested section does not exist',
    color: 'bg-gray-100',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-800'
  };
  
  const Icon = sectionInfo.icon || FileText;

  return (
    <div className="p-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to All Scores
      </Button>
      
      <Card className={`${sectionInfo.borderColor} border-2`}>
        <CardHeader className={`${sectionInfo.color} ${sectionInfo.textColor}`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-white bg-opacity-30">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl">{sectionInfo.title}</CardTitle>
              <p className="text-sm">{sectionInfo.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Add your section-specific content here */}
          <p className="text-gray-600">Detailed performance metrics for {sectionInfo.title.toLowerCase()} will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SectionScores;
