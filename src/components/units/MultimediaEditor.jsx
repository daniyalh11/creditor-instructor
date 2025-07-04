import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Mic, Save } from 'lucide-react';

export const MultimediaEditor = ({ open, onOpenChange, content, onSave }) => {
  const [title, setTitle] = useState(content?.title || '');
  const [description, setDescription] = useState(content?.description || '');
  const [url, setUrl] = useState(content?.url || '');
  const [embeddedCode, setEmbeddedCode] = useState(content?.embeddedCode || '');
  const [isRecording, setIsRecording] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        setUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRecordAudio = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsRecording(true);
        console.log('Recording started...');
        setTimeout(() => {
          setIsRecording(false);
          stream.getTracks().forEach(track => track.stop());
          console.log('Recording stopped');
        }, 5000);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    } else {
      setIsRecording(false);
    }
  };

  const handleSave = () => {
    const updatedContent = {
      ...content,
      title,
      description,
      url: content?.multimediaType === 'embedded' ? embeddedCode : url,
      embeddedCode: content?.multimediaType === 'embedded' ? embeddedCode : undefined
    };
    onSave(updatedContent);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit {content?.multimediaType || 'Media'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div>
            <Label htmlFor="description">Add Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
            />
          </div>

          {content?.multimediaType === 'embedded' ? (
            <div>
              <Label htmlFor="embedded-code">Embedded Content</Label>
              <Textarea
                id="embedded-code"
                value={embeddedCode}
                onChange={(e) => setEmbeddedCode(e.target.value)}
                placeholder="Paste URL or iframe code here..."
                rows={4}
              />
            </div>
          ) : (
            <div>
              <Label>Upload</Label>
              <div className="relative">
                <input
                  type="file"
                  accept={
                    content?.multimediaType === 'audio'
                      ? 'audio/*'
                      : content?.multimediaType === 'video'
                      ? 'video/*'
                      : '*/*'
                  }
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="file-upload"
                />
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload {content?.multimediaType || 'File'}
                </Button>
              </div>
            </div>
          )}

          {content?.multimediaType === 'audio' && (
            <div>
              <Label>Record Audio</Label>
              <Button
                variant="outline"
                className={`w-full ${isRecording ? 'bg-red-50 border-red-300' : ''}`}
                onClick={handleRecordAudio}
              >
                <Mic className={`w-4 h-4 mr-2 ${isRecording ? 'text-red-600' : ''}`} />
                {isRecording ? 'Recording... (Click to stop)' : 'Record Audio'}
              </Button>
            </div>
          )}

          {((content?.multimediaType !== 'embedded' && url) ||
            (content?.multimediaType === 'embedded' && embeddedCode)) && (
            <div>
              <Label>Preview</Label>
              <div className="bg-gray-50 p-3 rounded border">
                <p className="text-sm text-gray-600">
                  {content?.multimediaType === 'embedded'
                    ? 'Embedded content added successfully'
                    : 'File uploaded successfully'}
                </p>
              </div>
            </div>
          )}

          <Button onClick={handleSave} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
