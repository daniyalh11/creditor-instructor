import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Search } from 'lucide-react';

export const AddCoInstructorsDialog = ({ open, onOpenChange, courseId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [instructorRole, setInstructorRole] = useState('Assistant Instructor');

  const handleAddInstructor = () => {
    console.log('Adding instructor:', { searchTerm, instructorRole, courseId });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Add Instructor to Course</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Search Faculty
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for faculty members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-blue-500 focus:border-blue-600"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Instructor Role *
            </label>
            <Select value={instructorRole} onValueChange={setInstructorRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Assistant Instructor">Assistant Instructor</SelectItem>
                <SelectItem value="Co-Instructor">Co-Instructor</SelectItem>
                <SelectItem value="Lead Instructor">Lead Instructor</SelectItem>
                <SelectItem value="Guest Instructor">Guest Instructor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddInstructor}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Add Instructor
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCoInstructorsDialog;