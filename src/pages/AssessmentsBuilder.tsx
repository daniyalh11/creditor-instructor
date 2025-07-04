import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Eye, Edit, Trash2, FileText, Clock, CheckCircle, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AssessmentCreator from '@/components/courses/AssessmentCreator';
import AssessmentPreview from '@/components/courses/AssessmentPreview';
import AssessmentLearnerPreview from '@/components/courses/AssessmentLearnerPreview';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Assessment {
  id: string;
  title: string;
  description: string;
  type: string;
  status: 'draft' | 'published';
  duration: string;
  blocks?: any[];
  instructions?: any[];
  settings?: {
    title: string;
    description: string;
    timeLimitMinutes: number;
    passingScore: number;
    attemptsAllowed: number;
    shuffleQuestions: boolean;
  };
  createdAt?: string;
  moduleId?: string;
}

// Type for AssessmentCreator compatibility
interface AssessmentCreatorData {
  id: string;
  title: string;
  description: string;
  assessmentType: string;
  category: string;
  passingScore: number;
  attemptsAllowed: number;
  questions: any[];
  timeLimitMinutes: number;
  status: 'draft' | 'published';
  createdAt: string;
}

// Type for AssessmentPreview compatibility
interface AssessmentPreviewData {
  id: number;
  title: string;
  description: string;
  assessmentType: string;
  questions: {
    id: string;
    type: string;
    question: string;
    options?: string[];
    correctAnswer?: string | string[];
    points: number;
    timeLimit?: number;
    explanation?: string;
  }[];
  timeLimitMinutes: number;
  status: 'draft' | 'published';
  category?: string;
  passingScore?: number;
  attemptsAllowed?: number;
  createdAt?: string;
}

const AssessmentsBuilder = () => {
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();
  
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLearnerPreviewOpen, setIsLearnerPreviewOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentPreviewData | null>(null);
  const [editingAssessment, setEditingAssessment] = useState<AssessmentCreatorData | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assessmentToDelete, setAssessmentToDelete] = useState<Assessment | null>(null);

  // Load assessments from localStorage on mount
  useEffect(() => {
    const loadAssessments = () => {
      const savedAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
      console.log('Loading assessments from localStorage:', savedAssessments);
      
      // Filter assessments for this specific module or show all if no specific filtering needed
      const filteredAssessments = savedAssessments.filter((assessment: Assessment) => {
        // If assessment has moduleId, match it, otherwise include all
        return !assessment.moduleId || assessment.moduleId === moduleId;
      });
      
      console.log('Filtered assessments for module:', moduleId, filteredAssessments);
      setAssessments(filteredAssessments);
    };

    loadAssessments();

    // Set up an interval to check for updates every second
    const interval = setInterval(loadAssessments, 1000);

    return () => clearInterval(interval);
  }, [moduleId]);

  const getAssessmentTypeColor = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'quiz': 'bg-blue-100 text-blue-800',
      'assignment': 'bg-green-100 text-green-800',
      'survey': 'bg-yellow-100 text-yellow-800',
      'essay': 'bg-purple-100 text-purple-800',
      'debate': 'bg-red-100 text-red-800',
      'Multiple Choice Quiz': 'bg-blue-100 text-blue-800',
      'True/False Test': 'bg-green-100 text-green-800',
      'Fill in the Blanks': 'bg-yellow-100 text-yellow-800',
      'Essay Writing': 'bg-purple-100 text-purple-800',
      'Assignment Upload': 'bg-orange-100 text-orange-800',
      'Project Submission': 'bg-red-100 text-red-800',
      'Live Proctored Exam': 'bg-indigo-100 text-indigo-800'
    };
    return typeMap[type] || 'bg-gray-100 text-gray-800';
  };

  const handleAddAssessment = () => {
    // Navigate to the Assessment Creator page
    navigate(`/courses/builder/${courseId}/modules/${moduleId}/assessments/creator`);
  };

  const handleEditAssessment = (assessment: Assessment) => {
    navigate(`/courses/builder/${courseId}/modules/${moduleId}/assessments/creator/${assessment.id}`);
  };

  const transformAssessmentForPreview = (assessment: Assessment): AssessmentPreviewData => {
    return {
      id: parseInt(assessment.id.replace(/\D/g, '')) || 0,
      title: assessment.title,
      description: assessment.description,
      assessmentType: assessment.type,
      questions: assessment.blocks?.map(block => ({
        id: block.id,
        type: block.type,
        question: block.content?.question || '',
        options: block.content?.options || [],
        correctAnswer: block.content?.correctAnswer,
        points: block.content?.points || 1,
        explanation: block.content?.explanation
      })) || [],
      timeLimitMinutes: assessment.settings?.timeLimitMinutes || 30,
      status: assessment.status,
      passingScore: assessment.settings?.passingScore || 70,
      attemptsAllowed: assessment.settings?.attemptsAllowed || 3,
      createdAt: assessment.createdAt
    };
  };

  const handlePreviewAssessment = (assessment: Assessment) => {
    const previewData = transformAssessmentForPreview(assessment);
    setSelectedAssessment(previewData);
    setIsPreviewOpen(true);
  };

  const handleLearnerPreview = (assessment: Assessment) => {
    const previewData = transformAssessmentForPreview(assessment);
    setSelectedAssessment(previewData);
    setIsLearnerPreviewOpen(true);
  };

  const handleDeleteAssessment = (assessment: Assessment) => {
    setAssessmentToDelete(assessment);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteAssessment = () => {
    if (assessmentToDelete) {
      const savedAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
      const updatedAssessments = savedAssessments.filter((a: Assessment) => a.id !== assessmentToDelete.id);
      localStorage.setItem('assessments', JSON.stringify(updatedAssessments));
      
      // Update local state
      setAssessments(prev => prev.filter(a => a.id !== assessmentToDelete.id));
      
      toast({
        title: "Assessment Deleted",
        description: `"${assessmentToDelete.title}" has been removed.`,
      });
      setAssessmentToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleSaveAssessment = (assessmentCreatorData: AssessmentCreatorData) => {
    // Transform AssessmentCreator data to Assessment data structure
    const assessment: Assessment = {
      id: assessmentCreatorData.id.toString(),
      title: assessmentCreatorData.title,
      description: assessmentCreatorData.description,
      type: assessmentCreatorData.assessmentType,
      status: assessmentCreatorData.status,
      duration: `${assessmentCreatorData.timeLimitMinutes} min`,
      blocks: assessmentCreatorData.questions?.map((q, index) => ({
        id: q.id || `question_${index}`,
        type: q.type,
        content: {
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          points: q.points || 1,
          explanation: q.explanation
        },
        order: index
      })) || [],
      instructions: [],
      settings: {
        title: assessmentCreatorData.title,
        description: assessmentCreatorData.description,
        timeLimitMinutes: assessmentCreatorData.timeLimitMinutes,
        passingScore: assessmentCreatorData.passingScore,
        attemptsAllowed: assessmentCreatorData.attemptsAllowed,
        shuffleQuestions: false
      },
      createdAt: assessmentCreatorData.createdAt || new Date().toISOString(),
      moduleId: moduleId
    };

    const savedAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    let updatedAssessments;
    
    if (editingAssessment) {
      // Update existing assessment
      updatedAssessments = savedAssessments.map((a: Assessment) => a.id === editingAssessment.id.toString() ? assessment : a);
    } else {
      // Add new assessment
      updatedAssessments = [...savedAssessments, assessment];
    }
    
    localStorage.setItem('assessments', JSON.stringify(updatedAssessments));
    
    // Update local state
    const filteredAssessments = updatedAssessments.filter((a: Assessment) => 
      !a.moduleId || a.moduleId === moduleId
    );
    setAssessments(filteredAssessments);
    
    setIsCreatorOpen(false);
    setEditingAssessment(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalPoints = (blocks: any[]) => {
    if (!blocks) return 0;
    return blocks.reduce((sum, block) => sum + (block.content?.points || 1), 0);
  };

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate(`/courses/builder/${courseId}`)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Assessments Builder</h1>
            <p className="text-muted-foreground">Module {moduleId} - Create and manage assessments</p>
          </div>
        </div>
        <Button onClick={handleAddAssessment} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Assessment
        </Button>
      </div>

      {/* Assessment Type Sections */}
      {assessments.length > 0 ? (
        <div className="space-y-8">
          {/* Group assessments by type */}
          {['quiz', 'assignment', 'survey', 'essay', 'debate'].map(type => {
            const typeAssessments = assessments.filter(assessment => 
              assessment.type.toLowerCase() === type || 
              (type === 'quiz' && ['Multiple Choice Quiz', 'True/False Test', 'Fill in the Blanks'].includes(assessment.type))
            );
            
            if (typeAssessments.length === 0) return null;
            
            return (
              <div key={type} className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold capitalize">{type} Section</h2>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {typeAssessments.length} items
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {typeAssessments.map((assessment, index) => (
                    <Card 
                      key={assessment.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer group border border-gray-200"
                      onClick={() => handleEditAssessment(assessment)}
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Header with icon and badge */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                <FileText className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="text-sm text-blue-600 font-medium">
                                {assessment.type}
                              </span>
                            </div>
                            <Badge className={assessment.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {assessment.status === 'published' ? 'Published' : 'Draft'}
                            </Badge>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {assessment.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-gray-600">
                            {assessment.description || 'No description provided'}
                          </p>

                          {/* Created date */}
                          {assessment.createdAt && (
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar className="h-4 w-4" />
                              <span>Created {formatDate(assessment.createdAt)}</span>
                            </div>
                          )}

                          {/* Stats */}
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center gap-4">
                              <span>Questions: {assessment.blocks?.length || 0}</span>
                              <span>Time: {assessment.settings?.timeLimitMinutes || 30}m</span>
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center justify-between pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLearnerPreview(assessment);
                              }}
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-3 w-3" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditAssessment(assessment);
                              }}
                              className="flex items-center gap-1"
                            >
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAssessment(assessment);
                              }}
                              className="flex items-center gap-1 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No assessments yet</h3>
            <p className="text-muted-foreground mb-4">Create your first assessment to evaluate student learning.</p>
            <Button onClick={handleAddAssessment} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create First Assessment
            </Button>
          </CardContent>
        </Card>
      )}

      <AssessmentCreator
        open={isCreatorOpen}
        onOpenChange={setIsCreatorOpen}
        onSave={handleSaveAssessment}
        editingAssessment={editingAssessment}
      />

      <AssessmentPreview
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        assessment={selectedAssessment}
      />

      <AssessmentLearnerPreview
        open={isLearnerPreviewOpen}
        onOpenChange={setIsLearnerPreviewOpen}
        assessment={selectedAssessment}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Assessment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{assessmentToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteAssessment} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AssessmentsBuilder;
