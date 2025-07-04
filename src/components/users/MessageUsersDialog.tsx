
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { User } from '@/contexts/UserFilterContext';
import { useToast } from '@/hooks/use-toast';

type MessageUsersDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUsers: User[];
  onClearSelection: () => void;
};

export const MessageUsersDialog = ({ open, onOpenChange, selectedUsers, onClearSelection }: MessageUsersDialogProps) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: `Your message has been sent to ${selectedUsers.length} users.`,
        duration: 3000,
      });
      setSubject('');
      setMessage('');
      onClearSelection();
      onOpenChange(false);
      setIsSubmitting(false);
    }, 1000);
  };

  const removeUser = (userId: number) => {
    // This would normally remove from selection
    console.log('Remove user:', userId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>New message</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <div className="flex flex-wrap gap-1 p-2 border rounded-md min-h-[40px] bg-background">
              {selectedUsers.map((user) => (
                <Badge key={user.id} variant="secondary" className="flex items-center gap-1">
                  {user.name}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeUser(user.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {selectedUsers.length > 3 && (
                <Badge variant="outline">
                  +{selectedUsers.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <div className="border rounded-md">
              <div className="border-b p-2 bg-muted/50">
                <div className="flex items-center gap-2 text-sm">
                  <Button type="button" variant="ghost" size="sm" className="h-6 px-2">
                    <strong>B</strong>
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-6 px-2">
                    <em>I</em>
                  </Button>
                  <Button type="button" variant="ghost" size="sm" className="h-6 px-2">
                    <u>U</u>
                  </Button>
                </div>
              </div>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[200px] border-0 focus-visible:ring-0"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!subject || !message || isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
