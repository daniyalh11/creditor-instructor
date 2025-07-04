
import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, Image, Archive, RotateCcw, Plus, FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface CourseOptionsMenuProps {
  courseId: number;
  courseName: string;
  onEdit?: (courseId: number, courseName: string) => void;
  onArchive?: (courseId: number, courseName: string) => void;
  onDelete?: (courseId: number, courseName: string) => void;
  onRestore?: (courseId: number, courseName: string) => void;
  onAddToCatalog?: (courseId: number, courseName: string, catalogName: string) => void;
  isDeleted?: boolean;
}

export const CourseOptionsMenu = ({ 
  courseId, 
  courseName, 
  onEdit, 
  onArchive, 
  onDelete, 
  onRestore,
  onAddToCatalog,
  isDeleted = false 
}: CourseOptionsMenuProps) => {
  const navigate = useNavigate();
  const [catalogDialogOpen, setCatalogDialogOpen] = useState(false);
  const [newCatalogDialogOpen, setNewCatalogDialogOpen] = useState(false);
  const [newCatalogName, setNewCatalogName] = useState('');

  // Updated existing catalogs to match the new comprehensive list
  const existingCatalogs = [
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Data Science' },
    { id: 3, name: 'Mobile Development' },
    { id: 4, name: 'DevOps' },
    { id: 5, name: 'Cybersecurity' },
    { id: 6, name: 'Database Management' }
  ];

  const handleUpdate = () => {
    if (onEdit) {
      onEdit(courseId, courseName);
    } else {
      navigate(`/courses/edit/${courseId}`);
      toast({
        title: "Edit Course",
        description: `Opening edit page for ${courseName}`,
      });
    }
  };

  const handleUpdateImage = () => {
    toast({
      title: "Update Image",
      description: `Opening image editor for ${courseName}`,
    });
  };

  const handleArchive = () => {
    if (onArchive && window.confirm(`Are you sure you want to archive "${courseName}"?`)) {
      onArchive(courseId, courseName);
    }
  };

  const handleDelete = () => {
    if (onDelete && window.confirm(`Are you sure you want to delete "${courseName}"?`)) {
      onDelete(courseId, courseName);
    }
  };

  const handleRestore = () => {
    if (onRestore && window.confirm(`Are you sure you want to restore "${courseName}"?`)) {
      onRestore(courseId, courseName);
    }
  };

  const handleAddToCatalog = () => {
    setCatalogDialogOpen(true);
  };

  const handleAddToExistingCatalog = (catalogName: string) => {
    if (onAddToCatalog) {
      onAddToCatalog(courseId, courseName, catalogName);
    }
    setCatalogDialogOpen(false);
  };

  const handleCreateNewCatalog = () => {
    setCatalogDialogOpen(false);
    setNewCatalogDialogOpen(true);
  };

  const handleCreateCatalog = () => {
    if (newCatalogName.trim()) {
      if (onAddToCatalog) {
        onAddToCatalog(courseId, courseName, newCatalogName);
      }
      setNewCatalogDialogOpen(false);
      setNewCatalogName('');
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white border shadow-md">
          {isDeleted ? (
            <DropdownMenuItem onClick={handleRestore} className="text-green-600">
              <RotateCcw className="mr-2 h-4 w-4" />
              Restore Course
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem onClick={handleUpdate}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Course
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleUpdateImage}>
                <Image className="mr-2 h-4 w-4" />
                Update Image
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleAddToCatalog}>
                <Plus className="mr-2 h-4 w-4" />
                Add to Catalog
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleArchive}>
                <Archive className="mr-2 h-4 w-4" />
                Archive Course
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Course
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Catalog Selection Dialog */}
      <Dialog open={catalogDialogOpen} onOpenChange={setCatalogDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add "{courseName}" to Catalog</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Choose existing catalog:</Label>
              <div className="space-y-2">
                {existingCatalogs.map((catalog) => (
                  <Button
                    key={catalog.id}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleAddToExistingCatalog(catalog.name)}
                  >
                    {catalog.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleCreateNewCatalog}
            >
              <FolderPlus className="mr-2 h-4 w-4" />
              Create New Catalog
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Catalog Creation Dialog */}
      <Dialog open={newCatalogDialogOpen} onOpenChange={setNewCatalogDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Catalog</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="catalogName">Catalog Name</Label>
              <Input
                id="catalogName"
                value={newCatalogName}
                onChange={(e) => setNewCatalogName(e.target.value)}
                placeholder="Enter catalog name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewCatalogDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCatalog} disabled={!newCatalogName.trim()}>
              Create Catalog
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
