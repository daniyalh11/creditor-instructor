
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AssessmentBlocksSidebar } from '@/components/assessments/AssessmentBlocksSidebar';
import { AssessmentEditor } from '@/components/assessments/AssessmentEditor';
import { AssessmentPreviewModal } from '@/components/assessments/AssessmentPreviewModal';
import { AssessmentSettingsTab } from '@/components/assessments/AssessmentSettingsTab';
import { UnsavedChangesModal } from '@/components/assessments/UnsavedChangesModal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { useSidebar } from '@/contexts/SidebarContext';
import { useCourseSidebar } from '@/contexts/CourseSidebarContext';

type AssessmentBlock = {
  id: string;
  type: string;
  content: any;
  order: number;
};

type Assessment = {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  duration: string;
  blocks: AssessmentBlock[];
  instructions: any[];
  settings: {
    title: string;
    description: string;
    timeLimitMinutes: number;
    passingScore: number;
    attemptsAllowed: number;
    shuffleQuestions: boolean;
  };
};

const AssessmentCreator = () => {
  const navigate = useNavigate();
  const { courseId, moduleId, assessmentId } = useParams();
  const [activeTab, setActiveTab] = useState('types');
  const [showPreview, setShowPreview] = useState(false);
  const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
  const [pendingTypeSwitch, setPendingTypeSwitch] = useState<string | null>(null);
  const [assessmentTitle, setAssessmentTitle] = useState('New Assessment');
  const [selectedAssessmentType, setSelectedAssessmentType] = useState<string | null>(null);
  const [assessmentSettings, setAssessmentSettings] = useState({
    title: 'New Assessment',
    description: 'Assessment description',
    timeLimitMinutes: 30,
    passingScore: 70,
    attemptsAllowed: 3,
    shuffleQuestions: false
  });
  const [blocks, setBlocks] = useState<AssessmentBlock[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [instructions, setInstructions] = useState<any[]>([]);
  const [hasBeenSaved, setHasBeenSaved] = useState(false); // Track if assessment has been saved
  const { setMainCollapsed } = useSidebar();
  const { setCourseSidebarOpen } = useCourseSidebar();

  // Force collapse main sidebar and close course sidebar
  useEffect(() => {
    console.log('AssessmentCreator mounted, forcing main sidebar collapse');
    setMainCollapsed(true);
    setCourseSidebarOpen(false);
    
    const timer = setTimeout(() => {
      setMainCollapsed(true);
    }, 100);
    
    return () => {
      console.log('AssessmentCreator unmounted, expanding main sidebar');
      clearTimeout(timer);
      setMainCollapsed(false);
    };
  }, [setMainCollapsed, setCourseSidebarOpen]);

  // Check if we're editing an existing assessment
  useEffect(() => {
    if (assessmentId && assessmentId !== 'creator') {
      const savedAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
      const existingAssessment = savedAssessments.find((assessment: Assessment) => assessment.id === assessmentId);
      
      if (existingAssessment) {
        setAssessmentTitle(existingAssessment.title);
        setAssessmentSettings(existingAssessment.settings);
        setBlocks(existingAssessment.blocks);
        setInstructions(existingAssessment.instructions || []);
        setSelectedAssessmentType(existingAssessment.type);
        setIsEditing(true);
        setHasBeenSaved(true);
        setActiveTab('questions');
      }
    }
  }, [assessmentId]);

  // Check if instructions have been added - used to control Questions tab availability
  const hasInstructions = instructions.length > 0;

  // Check if there are unsaved changes (blocks or instructions exist)
  const hasUnsavedChanges = () => {
    return blocks.length > 0 || instructions.length > 0;
  };

  const handleSaveAssessment = (assessmentBlocks: AssessmentBlock[], title: string) => {
    setBlocks(assessmentBlocks);
    
    // Only create/update assessment if it hasn't been saved yet or we're editing
    if (!hasBeenSaved || isEditing) {
      const assessmentData: Assessment = {
        id: isEditing ? assessmentId! : `assessment_${Date.now()}`,
        title: title,
        description: assessmentSettings.description,
        type: selectedAssessmentType || 'quiz',
        status: 'draft',
        duration: `${assessmentSettings.timeLimitMinutes} min`,
        blocks: assessmentBlocks,
        instructions: instructions,
        settings: {
          ...assessmentSettings,
          title: title
        }
      };

      const savedAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
      
      if (isEditing) {
        const updatedAssessments = savedAssessments.map((assessment: Assessment) => 
          assessment.id === assessmentId ? assessmentData : assessment
        );
        localStorage.setItem('assessments', JSON.stringify(updatedAssessments));
      } else {
        // Check if assessment with same title already exists to prevent duplicates
        const existingIndex = savedAssessments.findIndex((assessment: Assessment) => 
          assessment.title === title && assessment.type === selectedAssessmentType
        );
        
        if (existingIndex >= 0) {
          // Update existing assessment instead of creating duplicate
          savedAssessments[existingIndex] = assessmentData;
        } else {
          // Add new assessment
          savedAssessments.push(assessmentData);
        }
        
        localStorage.setItem('assessments', JSON.stringify(savedAssessments));
        setHasBeenSaved(true);
      }

      if (assessmentBlocks.length > 0) {
        toast({
          title: isEditing ? "Assessment Updated" : "Assessment Saved as Draft",
          description: isEditing ? "Your changes have been saved." : "Your assessment has been saved as a draft.",
        });
      }
    }
  };

  const handlePublishAssessment = () => {
    // Only create/update assessment if it hasn't been saved yet or we're editing
    if (!hasBeenSaved || isEditing) {
      const assessmentData: Assessment = {
        id: isEditing ? assessmentId! : `assessment_${Date.now()}`,
        title: assessmentTitle,
        description: assessmentSettings.description,
        type: selectedAssessmentType || 'quiz',
        status: 'published',
        duration: `${assessmentSettings.timeLimitMinutes} min`,
        blocks: blocks,
        instructions: instructions,
        settings: {
          ...assessmentSettings,
          title: assessmentTitle
        }
      };

      const savedAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
      
      if (isEditing) {
        const updatedAssessments = savedAssessments.map((assessment: Assessment) => 
          assessment.id === assessmentId ? assessmentData : assessment
        );
        localStorage.setItem('assessments', JSON.stringify(updatedAssessments));
      } else {
        // Check if assessment with same title already exists to prevent duplicates
        const existingIndex = savedAssessments.findIndex((assessment: Assessment) => 
          assessment.title === assessmentTitle && assessment.type === selectedAssessmentType
        );
        
        if (existingIndex >= 0) {
          // Update existing assessment instead of creating duplicate
          savedAssessments[existingIndex] = assessmentData;
        } else {
          // Add new assessment
          savedAssessments.push(assessmentData);
        }
        
        localStorage.setItem('assessments', JSON.stringify(savedAssessments));
        setHasBeenSaved(true);
      }

      toast({
        title: "Assessment Published",
        description: "Your assessment has been published successfully and is now available in the Assessments Builder.",
      });
    }
    
    navigate(`/courses/builder/${courseId}/modules/${moduleId}/assessments`);
  };

  const handlePreview = () => {
    console.log('Preview clicked - Instructions:', instructions);
    console.log('Preview clicked - Blocks:', blocks);
    console.log('Preview clicked - Settings:', assessmentSettings);
    setShowPreview(true);
  };

  const updateAssessmentSettings = (newSettings: any) => {
    setAssessmentSettings(prev => ({ ...prev, ...newSettings }));
    if (newSettings.title) {
      setAssessmentTitle(newSettings.title);
    }
  };

  const getCurrentAssessmentData = () => {
    const currentData = {
      title: assessmentTitle,
      description: assessmentSettings.description,
      blocks: blocks,
      instructions: instructions,
      settings: assessmentSettings
    };
    console.log('Getting current assessment data:', currentData);
    return currentData;
  };

  const handleAssessmentTypeSelect = (type: string) => {
    // If user already has content and is switching to a different type, show warning
    if (selectedAssessmentType && selectedAssessmentType !== type && hasUnsavedChanges()) {
      setPendingTypeSwitch(type);
      setShowUnsavedChangesModal(true);
      return;
    }

    // Normal type selection without warning
    setSelectedAssessmentType(type);
    if (type === 'quiz' || type === 'assignment' || type === 'survey' || type === 'essay' || type === 'debate') {
      setActiveTab('questions');
    } else {
      setActiveTab('instructions');
    }
  };

  const handleUnsavedChangesCancel = () => {
    setShowUnsavedChangesModal(false);
    setPendingTypeSwitch(null);
  };

  const handlePublishAndSwitch = () => {
    // First publish the current assessment
    handlePublishAssessment();
    
    // Then switch to the new type
    if (pendingTypeSwitch) {
      setSelectedAssessmentType(pendingTypeSwitch);
      if (pendingTypeSwitch === 'quiz' || pendingTypeSwitch === 'assignment' || pendingTypeSwitch === 'survey' || pendingTypeSwitch === 'essay' || pendingTypeSwitch === 'debate') {
        setActiveTab('questions');
      } else {
        setActiveTab('instructions');
      }
      
      // Reset state for new assessment
      setBlocks([]);
      setInstructions([]);
      setAssessmentTitle('New Assessment');
      setAssessmentSettings({
        title: 'New Assessment',
        description: 'Assessment description',
        timeLimitMinutes: 30,
        passingScore: 70,
        attemptsAllowed: 3,
        shuffleQuestions: false
      });
      setHasBeenSaved(false);
    }
    
    setShowUnsavedChangesModal(false);
    setPendingTypeSwitch(null);
  };

  return (
    <div className="h-screen w-full flex bg-gray-50 overflow-hidden">
      {/* Assessment Blocks Sidebar */}
      <div className="fixed left-16 top-16 w-80 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-4rem)] z-10 shadow-lg">
        <div className="p-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Assessment Builder</h2>
          <p className="text-sm text-gray-600">Create and manage your assessment</p>
        </div>
        
        <div className="border-b border-gray-100 flex-shrink-0">
          <div className="flex">
            <button
              onClick={() => setActiveTab('types')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'types' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Types
            </button>
            {(selectedAssessmentType === 'quiz' || selectedAssessmentType === 'assignment' || selectedAssessmentType === 'survey' || selectedAssessmentType === 'essay' || selectedAssessmentType === 'debate') && (
              <button
                onClick={() => setActiveTab('questions')}
                disabled={!hasInstructions}
                className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'questions' 
                    ? 'border-blue-500 text-blue-600' 
                    : hasInstructions
                      ? 'border-transparent text-gray-500 hover:text-gray-700'
                      : 'border-transparent text-gray-300 cursor-not-allowed'
                }`}
                title={!hasInstructions ? "Please add at least one instruction before accessing questions" : ""}
              >
                Questions
              </button>
            )}
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'settings' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <AssessmentBlocksSidebar 
            activeTab={activeTab}
            selectedType={selectedAssessmentType}
            onTypeSelect={handleAssessmentTypeSelect}
            settings={assessmentSettings}
            onUpdateSettings={updateAssessmentSettings}
          />
        </ScrollArea>
      </div>

      {/* Secondary Navigation Bar */}
      <div className="fixed top-16 left-96 right-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(`/courses/builder/${courseId}/modules/${moduleId}/assessments`)}
            className="hover:bg-gray-100 flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 min-w-0">
            <input 
              type="text"
              value={assessmentTitle}
              onChange={(e) => setAssessmentTitle(e.target.value)}
              className="text-lg font-semibold bg-transparent border-none outline-none focus:bg-gray-50 px-2 py-1 rounded w-full"
              style={{ color: '#3b82f6' }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={() => handleSaveAssessment(blocks, assessmentTitle)}
            className="px-4 py-2 text-sm font-medium"
            size="sm"
          >
            Save as Draft
          </Button>
          <Button 
            variant="outline" 
            onClick={handlePreview}
            className="px-4 py-2 text-sm font-medium"
            size="sm"
          >
            Preview
          </Button>
          <Button 
            onClick={handlePublishAssessment}
            className="px-4 py-2 text-sm font-medium"
            size="sm"
            style={{ backgroundColor: '#3b82f6' }}
          >
            {isEditing ? 'Update' : 'Publish'}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden ml-96 mt-16">
        <ScrollArea className="flex-1 pt-4">
          <AssessmentEditor 
            onSave={handleSaveAssessment}
            onPreview={handlePreview}
            settings={assessmentSettings}
            initialBlocks={blocks}
            assessmentTitle={assessmentTitle}
            onTitleChange={setAssessmentTitle}
            selectedType={selectedAssessmentType}
            onTypeSelect={handleAssessmentTypeSelect}
            activeTab={activeTab}
            instructions={instructions}
            onUpdateInstructions={setInstructions}
          />
        </ScrollArea>
      </div>

      <AssessmentPreviewModal 
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        assessmentData={getCurrentAssessmentData()}
      />

      <UnsavedChangesModal
        isOpen={showUnsavedChangesModal}
        onClose={() => setShowUnsavedChangesModal(false)}
        currentType={selectedAssessmentType || ''}
        newType={pendingTypeSwitch || ''}
        onCancel={handleUnsavedChangesCancel}
        onPublishAndSwitch={handlePublishAndSwitch}
      />
    </div>
  );
};

export default AssessmentCreator;
