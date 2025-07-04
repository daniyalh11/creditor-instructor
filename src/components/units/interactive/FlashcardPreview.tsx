
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

type FlashcardPreviewProps = {
  flashcards: Array<{
    front: string;
    back: string;
    frontImage?: string;
    backImage?: string;
    frontType?: 'text' | 'image';
    backType?: 'text' | 'image';
  }>;
};

export const FlashcardPreview = ({ flashcards }: FlashcardPreviewProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-500">No flashcards configured</p>
      </div>
    );
  }

  const card = flashcards[currentCard];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const renderCardSide = (side: 'front' | 'back') => {
    const type = side === 'front' ? (card.frontType || 'text') : (card.backType || 'text');
    const text = side === 'front' ? card.front : card.back;
    const image = side === 'front' ? card.frontImage : card.backImage;

    return (
      <>
        <div className="text-xs text-gray-500 mb-2 uppercase">
          {side === 'front' ? 'FRONT' : 'BACK'}
        </div>
        {type === 'image' && image ? (
          <img 
            src={image} 
            alt={`${side} side`} 
            className="w-full max-w-sm h-32 object-cover rounded-lg mb-2"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <p className="text-lg font-medium">{text || `${side} side content`}</p>
        )}
      </>
    );
  };

  return (
    <div className="space-y-4">
      {/* Card Counter */}
      <div className="text-center text-sm text-gray-500">
        Card {currentCard + 1} of {flashcards.length}
      </div>

      {/* Flashcard */}
      <div className="relative h-64">
        <Card 
          className="w-full h-full cursor-pointer transition-all duration-300 hover:shadow-lg"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center space-y-4">
            {!isFlipped ? renderCardSide('front') : renderCardSide('back')}
          </CardContent>
        </Card>
        
        {/* Flip indicator */}
        <div className="absolute top-2 right-2">
          <Button size="sm" variant="ghost" onClick={() => setIsFlipped(!isFlipped)}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={prevCard} disabled={flashcards.length <= 1}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        
        <Button variant="outline" onClick={() => setIsFlipped(!isFlipped)}>
          {isFlipped ? 'Show Front' : 'Show Back'}
        </Button>
        
        <Button variant="outline" onClick={nextCard} disabled={flashcards.length <= 1}>
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
