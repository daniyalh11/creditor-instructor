
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Image as ImageIcon,
  Undo,
  Redo
} from 'lucide-react';

interface WelcomePopupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WelcomePopupDialog = ({ open, onOpenChange }: WelcomePopupDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleSave = () => {
    toast({
      title: "Welcome pop-up created",
      description: "Welcome pop-up for learners has been successfully created",
      duration: 3000,
    });
    onOpenChange(false);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContent(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col">
          {/* Title Field */}
          <div className="p-4 border-b">
            <Label htmlFor="title" className="text-sm font-medium mb-2 block">Title:</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter popup title"
              className="w-full"
            />
          </div>

          {/* Content Label */}
          <div className="px-4 py-2 border-b">
            <Label className="text-sm font-medium">Content:</Label>
          </div>
          
          {/* Toolbar */}
          <div className="bg-gray-50 p-3 border-b">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <select className="px-2 py-1 border rounded text-sm">
                <option>File</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>Edit</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>View</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>Insert</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>Format</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>Tools</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>Table</option>
              </select>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="ghost" size="sm">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Redo className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              
              <select className="px-2 py-1 border rounded text-sm">
                <option>Paragraph</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>Poppins</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>12pt</option>
              </select>
              
              <Separator orientation="vertical" className="h-6" />
              
              <Button variant="ghost" size="sm">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Underline className="h-4 w-4" />
              </Button>
              
              <Separator orientation="vertical" className="h-6" />
              
              <Button variant="ghost" size="sm">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <AlignRight className="h-4 w-4" />
              </Button>
              
              <Separator orientation="vertical" className="h-6" />
              
              <Button variant="ghost" size="sm">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-4 bg-white">
            <textarea
              className="w-full h-full border-none outline-none resize-none text-lg"
              placeholder="Start typing your welcome message content..."
              value={content}
              onChange={handleContentChange}
            />
          </div>

          {/* Footer */}
          <div className="border-t p-3 flex items-center justify-between bg-gray-50">
            <div className="text-sm text-gray-600">
              P
            </div>
            <div className="text-sm text-gray-600">
              {wordCount} WORDS
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 p-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopupDialog;
