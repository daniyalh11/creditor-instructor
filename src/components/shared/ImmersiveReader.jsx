import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Settings, BookOpen, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ImmersiveReader = ({ content, isOpen, onClose, title = "Immersive Reader" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [theme, setTheme] = useState('light');
  const [showSettings, setShowSettings] = useState(false);
  
  const speechSynthRef = useRef(null);
  const intervalRef = useRef(null);
  
  // Clean and split content into words
  const words = content.replace(/\s+/g, ' ').trim().split(' ');
  
  useEffect(() => {
    return () => {
      if (speechSynthRef.current) {
        speechSynthesis.cancel();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handlePlay = () => {
    if (isPlaying) {
      handlePause();
      return;
    }

    setIsPlaying(true);
    
    // Create speech synthesis
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = speed;
    utterance.volume = isMuted ? 0 : volume;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentWordIndex(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    speechSynthRef.current = utterance;
    speechSynthesis.speak(utterance);

    // Simulate word highlighting synchronization
    const wordsPerMinute = 150 * speed; // Average reading speed adjusted by playback speed
    const millisecondsPerWord = (60 / wordsPerMinute) * 1000;
    
    intervalRef.current = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev >= words.length - 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return prev;
        }
        return prev + 1;
      });
    }, millisecondsPerWord);
  };

  const handlePause = () => {
    setIsPlaying(false);
    speechSynthesis.cancel();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleRestart = () => {
    handlePause();
    setCurrentWordIndex(0);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed[0]);
    if (isPlaying) {
      handlePause();
      setTimeout(() => handlePlay(), 100);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
    if (speechSynthRef.current) {
      speechSynthRef.current.volume = isMuted ? 0 : newVolume[0];
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (speechSynthRef.current) {
      speechSynthRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  const renderHighlightedText = () => {
    return words.map((word, index) => (
      <span
        key={index}
        className={`
          ${index === currentWordIndex ? 'bg-blue-200 text-blue-900 font-semibold' : ''}
          ${index < currentWordIndex ? 'text-gray-500' : ''}
          transition-all duration-200
        `}
      >
        {word}{' '}
      </span>
    ));
  };

  const themes = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
    sepia: 'bg-yellow-50 text-yellow-900'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {showSettings && (
          <Card className="mb-4">
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Reading Speed</label>
                  <Slider
                    value={[speed]}
                    onValueChange={handleSpeedChange}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{speed}x</div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Font Size</label>
                  <Slider
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    min={12}
                    max={24}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{fontSize}px</div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Line Height</label>
                  <Slider
                    value={[lineHeight]}
                    onValueChange={(value) => setLineHeight(value[0])}
                    min={1.2}
                    max={2.4}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{lineHeight}</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('light')}
                >
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                >
                  Dark
                </Button>
                <Button
                  variant={theme === 'sepia' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('sepia')}
                >
                  Sepia
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center gap-2 py-2 border-b">
          <Button
            onClick={isPlaying ? handlePause : handlePlay}
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          
          <Button variant="outline" onClick={handleRestart}>
            <RotateCcw className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="sm" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              min={0}
              max={1}
              step={0.1}
              className="w-20"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary">
              {currentWordIndex + 1} / {words.length} words
            </Badge>
            <Badge variant="outline">
              {Math.round((currentWordIndex / words.length) * 100)}%
            </Badge>
          </div>
        </div>

        <div 
          className={`
            flex-1 overflow-y-auto p-6 rounded-lg transition-colors
            ${themes[theme]}
          `}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
            maxHeight: '60vh'
          }}
        >
          <div className="max-w-none prose prose-lg">
            {renderHighlightedText()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};