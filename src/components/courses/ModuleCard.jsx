import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Edit, Trash2, List, MoreVertical, Lock, CheckCircle, FileText } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import EditModuleDialog from './EditModuleDialog';

const ModuleCard = ({ module, onDelete, onUpdate, onComplete, courseType = 'open' }) => {
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${module.title}"?`)) {
      onDelete(module.id);
    }
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleUnitsClick = () => {
    if (module.locked && courseType === 'sequential') {
      return; // Don't navigate if module is locked
    }
    // Navigate to a new page for units
    navigate(`/courses/modules/${module.id}/units`);
  };

  const handleAssessmentsClick = () => {
    if (module.locked && courseType === 'sequential') {
      return; // Don't navigate if module is locked
    }
    // Navigate to assessments page
    navigate(`/courses/modules/${module.id}/assessments`);
  };

  const handleCompleteModule = () => {
    if (onComplete) {
      onComplete(module.id);
    }
  };

  const isLocked = module.locked && courseType === 'sequential';

  return (
    <>
      <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${isLocked ? 'opacity-60' : ''}`}>
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
          <img 
            src="/placeholder.svg" 
            alt={module.title} 
            className="w-full h-full object-cover"
          />
          {isLocked && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-white rounded-full p-3">
                <Lock className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white" disabled={isLocked}>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border shadow-md">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Module
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Module
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {module.completed && (
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            </div>
          )}
        </div>
        
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            {module.title}
            {isLocked && <Lock className="h-4 w-4 text-gray-400 ml-auto" />}
          </CardTitle>
          <p className="text-sm text-gray-600">{module.description}</p>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {module.units} units
            </Badge>
            <Badge variant="outline">
              {module.assessments} assessments
            </Badge>
            <Badge variant="outline">
              {module.duration}
            </Badge>
            {courseType === 'sequential' && (
              <Badge variant="outline" className="text-blue-600 border-blue-300">
                Sequential
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 gap-3">
            <Button 
              onClick={handleUnitsClick}
              variant="outline" 
              className="w-full justify-start hover:bg-blue-50 transition-colors duration-200"
              disabled={isLocked}
            >
              <List className="h-4 w-4 mr-2" />
              View Lessons
              {isLocked && <Lock className="h-3 w-3 ml-auto" />}
            </Button>

            <Button 
              onClick={handleAssessmentsClick}
              variant="outline" 
              className="w-full justify-start hover:bg-green-50 transition-colors duration-200"
              disabled={isLocked}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Assessments
              {isLocked && <Lock className="h-3 w-3 ml-auto" />}
            </Button>

            {!module.completed && !isLocked && courseType === 'sequential' && (
              <Button 
                onClick={handleCompleteModule}
                className="w-full bg-ca-primary hover:bg-ca-secondary text-white transition-colors duration-200"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Complete
              </Button>
            )}
          </div>

          {isLocked && (
            <div className="mt-3 p-2 bg-yellow-50 rounded-md">
              <p className="text-xs text-yellow-700 text-center">
                Complete the previous module to unlock this one
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <EditModuleDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        module={module}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default ModuleCard;