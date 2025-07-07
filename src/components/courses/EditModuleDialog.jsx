import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const EditModuleDialog = ({
  open,
  onOpenChange,
  module,
  onUpdate
}) => {
  const [title, setTitle] = useState(module.title);
  const [description, setDescription] = useState(module.description);

  useEffect(() => {
    setTitle(module.title);
    setDescription(module.description);
  }, [module]);

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Module title is required",
        variant: "destructive"
      });
      return;
    }

    const updatedModule = {
      ...module,
      title: title.trim(),
      description: description.trim()
    };

    onUpdate(updatedModule);
    onOpenChange(false);
    
    toast({
      title: "Module Updated",
      description: `"${title}" has been updated successfully.`
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Module</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Module Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter module title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter module description"
              rows={3}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModuleDialog;