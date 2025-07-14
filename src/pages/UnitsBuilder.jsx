import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Plus, FileText, Package } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { UnitViewer } from '@/components/units/UnitViewer';
import { PreviewModal } from '@/components/units/PreviewModal';
import { UnitCard } from '@/components/units/UnitCard';
import { useSidebar } from '@/contexts/SidebarContext';
import { ScormUploadDialog } from '@/components/units/ScormUploadDialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const UnitsBuilder = () => {
  const navigate = useNavigate();
  const { courseId, moduleId, action, unitId } = useParams();
  const [units, setUnits] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUnit, setPreviewUnit] = useState(null);
  const [showScormDialog, setShowScormDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newLessonData, setNewLessonData] = useState({
    title: '',
    description: '',
    lessonNumber: ''
  });
  const { setMainCollapsed } = useSidebar();

  // Collapse main sidebar when entering units builder
  useEffect(() => {
    setMainCollapsed(true);
    
    // Cleanup: expand sidebar when leaving
    return () => {
      setMainCollapsed(false);
    };
  }, [setMainCollapsed]);

  // If we're in view mode, show the UnitViewer
  if (action === 'view' && unitId) {
    return <UnitViewer />;
  }

  // Load units from localStorage on component mount
  useEffect(() => {
    const savedUnits = JSON.parse(localStorage.getItem('units') || '[]');
    setUnits(savedUnits);
  }, []);

  const handleAddUnit = () => {
    // Calculate the next lesson number
    const lessonNumbers = units
      .filter(u => u.type === 'lesson')
      .map(u => parseInt(u.settings.lessonNumber) || 0);
    
    const nextLessonNumber = lessonNumbers.length > 0 
      ? Math.max(...lessonNumbers) + 1 
      : 1;

    setNewLessonData({
      title: '',
      description: '',
      lessonNumber: nextLessonNumber.toString()
    });
    setShowCreateDialog(true);
  };

  const handleCreateLesson = () => {
  if (!newLessonData.title.trim()) {
    toast({
      title: "Title Required",
      description: "Please enter a title for your lesson.",
      variant: "destructive",
    });
    return;
  }

  if (!newLessonData.lessonNumber.trim() || isNaN(newLessonData.lessonNumber)) {
    toast({
      title: "Lesson Number Required",
      description: "Please enter a valid lesson number.",
      variant: "destructive",
    });
    return;
  }

  // Create a basic unit structure with the provided title and description
  const newUnit = {
    id: `unit_${Date.now()}`,
    title: newLessonData.title,
    description: newLessonData.description,
    type: 'lesson',
    status: 'draft',
    duration: '0 min',
    blocks: [],
    settings: {
      title: newLessonData.title,
      description: newLessonData.description,
      lessonNumber: newLessonData.lessonNumber,
      theme: 'Modern',
      fontFamily: 'Inter',
      primaryColor: '#3b82f6'
    }
  };

  // Save to localStorage
  const savedUnits = JSON.parse(localStorage.getItem('units') || '[]');
  const updatedUnits = [...savedUnits, newUnit];
  localStorage.setItem('units', JSON.stringify(updatedUnits));

  // Update state
  setUnits(updatedUnits);

  // Navigate to the creator with the new unit ID
  navigate(`/courses/builder/${courseId}/modules/${moduleId}/units/creator/${newUnit.id}`);
};
  const handleEditUnit = (unitId) => {
    navigate(`/courses/builder/${courseId}/modules/${moduleId}/units/creator/${unitId}`);
  };

  const handleDeleteUnit = (unitId) => {
    if (window.confirm('Are you sure you want to delete this unit?')) {
      const updatedUnits = units.filter(u => u.id !== unitId);
      setUnits(updatedUnits);
      localStorage.setItem('units', JSON.stringify(updatedUnits));
      
      toast({
        title: "Unit Deleted",
        description: "Unit has been removed from this module.",
      });
    }
  };

  const handlePreviewUnit = (unitId, event) => {
    event.stopPropagation();
    const unit = units.find(u => u.id === unitId);
    if (unit) {
      setPreviewUnit(unit);
      setShowPreview(true);
    }
  };

  const handleViewUnit = (unitId) => {
    navigate(`/courses/builder/${courseId}/modules/${moduleId}/units/creator/${unitId}`);
  };

  const handleScormUpload = (scormData) => {
    // Create a new SCORM unit
    const newScormUnit = {
      id: `scorm_${Date.now()}`,
      title: scormData.name,
      description: `SCORM package: ${scormData.file.name}`,
      type: 'scorm',
      status: 'draft',
      duration: 'Variable',
      blocks: [{
        id: 'scorm-content',
        type: 'scorm',
        content: {
          fileName: scormData.file.name,
          size: scormData.file.size,
          extractedPath: `/scorm-packages/${scormData.name}/`,
          manifestUrl: `/scorm-packages/${scormData.name}/imsmanifest.xml`
        },
        order: 0
      }],
      settings: {
        title: scormData.name,
        description: `SCORM package: ${scormData.file.name}`,
        lessonNumber: '',
        theme: 'Modern',
        fontFamily: 'Inter',
        primaryColor: '#3b82f6'
      }
    };

    // Add to units array
    const updatedUnits = [...units, newScormUnit];
    setUnits(updatedUnits);
    
    // Save to localStorage
    const savedUnits = JSON.parse(localStorage.getItem('units') || '[]');
    savedUnits.push(newScormUnit);
    localStorage.setItem('units', JSON.stringify(savedUnits));

    toast({
      title: "SCORM Package Added",
      description: `${scormData.name} has been added as a new unit.`,
    });

    setShowScormDialog(false);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Fixed Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate(`/courses/builder/${courseId}`)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Lessons Builder</h1>
            <p className="text-muted-foreground">Module {moduleId} - Create and manage learning lessons</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleAddUnit} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Lesson
          </Button>
          <Button 
            onClick={() => setShowScormDialog(true)} 
            variant="outline"
            className="border-orange-200 text-orange-700 hover:bg-orange-50"
          >
            <Package className="h-4 w-4 mr-2" />
            Add SCORM Package
          </Button>
        </div>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="w-full max-w-6xl mx-auto py-6 px-6 space-y-6">
          {units.length > 0 ? (
            <div className="grid gap-4 w-full">
              {units.map((unit, index) => (
                <UnitCard
                  key={unit.id}
                  unit={unit}
                  index={index}
                  onEdit={handleEditUnit}
                  onDelete={handleDeleteUnit}
                  onPreview={handlePreviewUnit}
                  onView={handleViewUnit}
                />
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 w-full">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No lessons created yet</h3>
                <p className="text-muted-foreground mb-4 text-center">Start building your module by creating your first learning lesson.</p>
                <Button onClick={handleAddUnit} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Lesson
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>

      {/* Preview Modal */}
      <PreviewModal 
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        unitData={previewUnit}
      />

      {/* SCORM Upload Dialog */}
      <ScormUploadDialog
        isOpen={showScormDialog}
        onClose={() => setShowScormDialog(false)}
        onUpload={handleScormUpload}
      />

      {/* Create Lesson Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Lesson</DialogTitle>
            <DialogDescription>
              Enter details for your new lesson. You can change these later in the lesson settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lessonNumber" className="text-right">
                Lesson Number
              </Label>
              <Input
                id="lessonNumber"
                type="number"
                min="1"
                value={newLessonData.lessonNumber}
                onChange={(e) => setNewLessonData({...newLessonData, lessonNumber: e.target.value})}
                placeholder="Lesson number"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newLessonData.title}
                onChange={(e) => setNewLessonData({...newLessonData, title: e.target.value})}
                placeholder="Lesson title"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newLessonData.description}
                onChange={(e) => setNewLessonData({...newLessonData, description: e.target.value})}
                placeholder="Brief description of the lesson"
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateLesson}>
              Create Lesson
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UnitsBuilder;