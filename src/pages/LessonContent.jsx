import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, FileText, Video, Headphones, ArrowLeft, Edit, Save, X, Trash2, BookOpen } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ImmersiveReader } from '@/components/shared/ImmersiveReader';

const LessonContent = () => {
  const { courseId, moduleId, unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showImmersiveReader, setShowImmersiveReader] = useState(false);

  // Mock lesson data - in real app this would come from API based on lessonId
  const [lesson, setLesson] = useState({
    id: lessonId,
    title: 'Introduction to Business Trust Fundamentals',
    type: 'text',
    content: `Business trusts are legal entities that hold and manage assets for the benefit of beneficiaries. They operate under specific legal frameworks and provide various advantages for business operations.

Key Concepts:
- Legal Structure: Business trusts are formed under state law and provide a flexible structure for business operations
- Fiduciary Duties: Trustees have legal obligations to manage assets in the best interests of beneficiaries
- Tax Advantages: Business trusts can provide certain tax benefits depending on their structure and jurisdiction
- Asset Protection: Properly structured trusts can offer protection from creditors and legal claims

Applications in Modern Commerce:
Business trusts are commonly used in various industries including real estate investment, equipment leasing, and natural resource development. They provide a means for multiple investors to pool resources while maintaining professional management oversight.

The regulatory framework governing business trusts varies by jurisdiction, with some states providing more favorable legal environments than others. Understanding these regulatory differences is crucial for anyone considering the formation or investment in a business trust.`,
    duration: '15 minutes',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    audioUrl: '',
    description: 'Comprehensive overview of business trust concepts and their practical applications in modern commerce.'
  });

  const [editForm, setEditForm] = useState({
    title: lesson.title,
    type: lesson.type,
    content: lesson.content,
    duration: lesson.duration,
    description: lesson.description,
    videoUrl: lesson.videoUrl,
    audioUrl: lesson.audioUrl
  });

  // Update lesson content based on lessonId
  React.useEffect(() => {
    if (lessonId) {
      const lessonData = {
        '1': {
          title: 'Introduction to Business Trust Fundamentals',
          type: 'text',
          content: lesson.content,
          duration: '15 minutes',
          videoUrl: '',
          audioUrl: '',
          description: 'Comprehensive overview of business trust concepts and their applications in modern commerce.'
        },
        '2': {
          title: 'Digital Marketing Video Tutorial',
          type: 'video',
          content: `This comprehensive video tutorial covers the essential aspects of digital marketing, from strategy development to execution.

Key Topics Covered:
• Social Media Marketing: Learn how to leverage platforms like Facebook, Instagram, Twitter, and LinkedIn
• Content Creation: Develop engaging content that resonates with your target audience
• SEO Optimization: Understand search engine optimization techniques to improve visibility
• Performance Measurement: Track and analyze campaign effectiveness using various metrics

The video demonstrates real-world examples and case studies from successful digital marketing campaigns. You'll see step-by-step implementations of various strategies and learn how to adapt them for different business models and industries.`,
          duration: '25 minutes',
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          audioUrl: '',
          description: 'Visual explanation of digital marketing strategies and implementation techniques.'
        },
        '3': {
          title: 'Legal Framework Audio Lecture',
          type: 'audio',
          content: `Welcome to this comprehensive audio lecture on the legal framework governing modern business operations.

TRANSCRIPT:

Introduction (0:00 - 2:30)
In today's complex business environment, understanding the legal landscape is crucial for any organization. This lecture explores the fundamental legal concepts that every business professional should understand.

Regulatory Compliance (2:30 - 8:45)
Compliance with federal, state, and local regulations is not optional. We'll discuss:
- Industry-specific regulations
- Data protection and privacy laws
- Employment law requirements
- Environmental compliance standards

Risk Management (8:45 - 15:20)
Legal risk management involves identifying potential legal issues before they become problems:
- Contract review and negotiation
- Intellectual property protection
- Liability assessment and mitigation
- Insurance considerations

Contract Law Fundamentals (15:20 - 22:10)
Understanding contract basics is essential for business operations:
- Elements of a valid contract
- Common contract terms and clauses
- Breach of contract remedies
- Best practices for contract management

Intellectual Property Protection (22:10 - 28:50)
Protecting your intellectual assets:
- Trademark registration and maintenance
- Copyright considerations
- Trade secret protection
- Patent basics for business

Conclusion (28:50 - 30:00)
Legal compliance is an ongoing process that requires continuous attention and expertise.`,
          duration: '30 minutes',
          videoUrl: '',
          audioUrl: '/placeholder-audio.mp3',
          description: 'Audio lecture covering the legal aspects and regulatory framework of business operations.'
        }
      };

      const selectedLessonData = lessonData[lessonId] || lessonData['1'];
      setLesson(prev => ({ ...prev, ...selectedLessonData, id: lessonId }));
      setEditForm(prev => ({ ...prev, ...selectedLessonData }));
    }
  }, [lessonId]);

  const handleSave = () => {
    setLesson(prev => ({ ...prev, ...editForm }));
    setIsEditing(false);
    toast({
      title: "Lesson Updated",
      description: "Lesson content has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditForm({
      title: lesson.title,
      type: lesson.type,
      content: lesson.content,
      duration: lesson.duration,
      description: lesson.description,
      videoUrl: lesson.videoUrl,
      audioUrl: lesson.audioUrl
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      toast({
        title: "Lesson Deleted",
        description: "Lesson has been deleted successfully.",
      });
      navigate(`/courses/modules/${moduleId}/units`);
    }
  };

  const renderContent = () => {
    if (lesson.type === 'text') {
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Text Content</h3>
            <Button
              onClick={() => setShowImmersiveReader(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Immersive Reader
            </Button>
          </div>
          
          <div className="prose prose-slate max-w-none">
            {isEditing ? (
              <Textarea
                value={editForm.content}
                onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                className="min-h-[400px] w-full"
                placeholder="Enter lesson content..."
              />
            ) : (
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-base bg-gray-50 p-4 rounded-lg">
                {lesson.content}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (lesson.type === 'video') {
      return (
        <div className="space-y-4">
          <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
            {lesson.videoUrl ? (
              <video 
                controls 
                className="w-full h-full"
                poster="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop&auto=format"
              >
                <source src={lesson.videoUrl} type="video/mp4" />
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <Video className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500">AI-Generated Video Content</p>
                  <p className="text-sm text-slate-400 mt-2">Duration: {lesson.duration}</p>
                </div>
              </div>
            )}
          </div>
          
          {isEditing && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Video URL:</label>
              <Input
                value={editForm.videoUrl}
                onChange={(e) => setEditForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                placeholder="Enter video URL"
              />
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Video Description & Transcript:</h4>
            {lesson.content && (
              <Button
                onClick={() => setShowImmersiveReader(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Read Description
              </Button>
            )}
          </div>
          
          {isEditing ? (
            <Textarea
              value={editForm.content}
              onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
              className="min-h-[200px]"
              placeholder="Enter video description and transcript..."
            />
          ) : (
            <div className="text-slate-700 bg-gray-50 p-4 rounded-lg">
              <p className="whitespace-pre-wrap">{lesson.content}</p>
            </div>
          )}
        </div>
      );
    }

    if (lesson.type === 'audio') {
      return (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full">
                  <Headphones className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">Audio Lesson</h4>
                  <p className="text-sm text-slate-600">Duration: {lesson.duration}</p>
                </div>
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
              
              {lesson.audioUrl && (
                <div className="mt-4">
                  <audio controls className="w-full">
                    <source src={lesson.audioUrl} type="audio/mpeg" />
                    <source src="/placeholder-audio.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          {isEditing && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Audio URL:</label>
              <Input
                value={editForm.audioUrl}
                onChange={(e) => setEditForm(prev => ({ ...prev, audioUrl: e.target.value }))}
                placeholder="Enter audio URL"
              />
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Audio Transcript:</h4>
            {lesson.content && (
              <Button
                onClick={() => setShowImmersiveReader(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Read Transcript
              </Button>
            )}
          </div>
          
          {isEditing ? (
            <Textarea
              value={editForm.content}
              onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
              className="min-h-[300px]"
              placeholder="Enter audio transcript and notes..."
            />
          ) : (
            <div className="text-slate-700 bg-gray-50 p-4 rounded-lg">
              <p className="whitespace-pre-wrap">{lesson.content}</p>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const getTypeIcon = () => {
    switch (lesson.type) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Volume2 className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (lesson.type) {
      case 'text': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'audio': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate(`/courses/modules/${moduleId}/units`)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            {isEditing ? (
              <Input
                value={editForm.title}
                onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                className="text-2xl font-bold border-none p-0 h-auto focus-visible:ring-0"
              />
            ) : (
              <h1 className="text-2xl font-bold">{lesson.title}</h1>
            )}
            <div className="flex items-center gap-2 mt-2">
              {isEditing ? (
                <Select value={editForm.type} onValueChange={(value) => setEditForm(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge className={getTypeColor()}>
                  {getTypeIcon()}
                  <span className="ml-1 capitalize">{lesson.type}</span>
                </Badge>
              )}
              {isEditing ? (
                <Input
                  value={editForm.duration}
                  onChange={(e) => setEditForm(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-32"
                  placeholder="Duration"
                />
              ) : (
                <Badge variant="outline">
                  {lesson.duration}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button onClick={handleDelete} variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {renderContent()}
        </CardContent>
      </Card>

      <ImmersiveReader
        content={lesson.content}
        isOpen={showImmersiveReader}
        onClose={() => setShowImmersiveReader(false)}
        title={lesson.title}
      />
    </div>
  );
};

export default LessonContent;