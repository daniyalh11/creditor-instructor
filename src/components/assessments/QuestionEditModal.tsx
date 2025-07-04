import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, X, CaseSensitive } from 'lucide-react';

interface QuestionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: any;
  onSave: (updatedQuestion: any) => void;
}

export const QuestionEditModal = ({ isOpen, onClose, question, onSave }: QuestionEditModalProps) => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number | number[]>(0);
  const [points, setPoints] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(['']);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [leftColumn, setLeftColumn] = useState<string[]>(['']);
  const [rightColumn, setRightColumn] = useState<string[]>(['']);
  const [correctPairs, setCorrectPairs] = useState<{[key: string]: string}>({});
  const [oneWordAnswer, setOneWordAnswer] = useState('');
  const [minWords, setMinWords] = useState(50);
  const [maxWords, setMaxWords] = useState(500);

  useEffect(() => {
    if (question) {
      setQuestionText(question.content.question || '');
      setOptions(question.content.options || []);
      setCorrectAnswer(question.content.correctAnswer || (question.type === 'mcq' ? [0] : 0));
      setPoints(question.content.points || 1);
      setCorrectAnswers(question.content.correctAnswers || ['']);
      setCaseSensitive(question.content.caseSensitive || false);
      setLeftColumn(question.content.leftColumn || ['Item 1', 'Item 2']);
      setRightColumn(question.content.rightColumn || ['Match A', 'Match B']);
      setCorrectPairs(question.content.correctPairs || {'0': '0', '1': '1'});
      setOneWordAnswer(question.content.correctAnswer || '');
      setMinWords(question.content.minWords || 50);
      setMaxWords(question.content.maxWords || 500);
    }
  }, [question]);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      
      if (question.type === 'mcq') {
        const correctAnswerArray = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
        const updatedCorrectAnswers = correctAnswerArray
          .filter(answerIndex => answerIndex !== index)
          .map(answerIndex => answerIndex > index ? answerIndex - 1 : answerIndex);
        setCorrectAnswer(updatedCorrectAnswers);
      } else if (typeof correctAnswer === 'number' && correctAnswer >= index && correctAnswer > 0) {
        setCorrectAnswer(correctAnswer - 1);
      }
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addCorrectAnswer = () => {
    setCorrectAnswers([...correctAnswers, '']);
  };

  const removeCorrectAnswer = (index: number) => {
    if (correctAnswers.length > 1) {
      setCorrectAnswers(correctAnswers.filter((_, i) => i !== index));
    }
  };

  const updateCorrectAnswer = (index: number, value: string) => {
    const newAnswers = [...correctAnswers];
    newAnswers[index] = value;
    setCorrectAnswers(newAnswers);
  };

  const addLeftItem = () => {
    const newIndex = leftColumn.length;
    setLeftColumn([...leftColumn, '']);
    setRightColumn([...rightColumn, '']);
    setCorrectPairs({
      ...correctPairs,
      [newIndex.toString()]: newIndex.toString()
    });
  };

  const removeMatchingPair = (index: number) => {
    if (leftColumn.length > 2) {
      const newLeftColumn = leftColumn.filter((_, i) => i !== index);
      const newRightColumn = rightColumn.filter((_, i) => i !== index);
      
      const newCorrectPairs: {[key: string]: string} = {};
      Object.entries(correctPairs).forEach(([leftIdx, rightIdx]) => {
        const leftIdxNum = parseInt(leftIdx);
        const rightIdxNum = parseInt(rightIdx);
        
        if (leftIdxNum !== index && rightIdxNum !== index) {
          const newLeftIdx = leftIdxNum > index ? leftIdxNum - 1 : leftIdxNum;
          const newRightIdx = rightIdxNum > index ? rightIdxNum - 1 : rightIdxNum;
          newCorrectPairs[newLeftIdx.toString()] = newRightIdx.toString();
        }
      });
      
      setLeftColumn(newLeftColumn);
      setRightColumn(newRightColumn);
      setCorrectPairs(newCorrectPairs);
    }
  };

  const updateLeftItem = (index: number, value: string) => {
    const newLeftColumn = [...leftColumn];
    newLeftColumn[index] = value;
    setLeftColumn(newLeftColumn);
  };

  const updateRightItem = (index: number, value: string) => {
    const newRightColumn = [...rightColumn];
    newRightColumn[index] = value;
    setRightColumn(newRightColumn);
  };

  const updateCorrectPair = (leftIndex: number, rightIndex: string) => {
    setCorrectPairs({
      ...correctPairs,
      [leftIndex.toString()]: rightIndex
    });
  };

  const handleCorrectAnswerChange = (index: number, isChecked?: boolean) => {
    if (question.type === 'mcq') {
      const currentCorrectAnswers = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
      
      if (isChecked) {
        if (!currentCorrectAnswers.includes(index)) {
          setCorrectAnswer([...currentCorrectAnswers, index]);
        }
      } else {
        setCorrectAnswer(currentCorrectAnswers.filter(answerIndex => answerIndex !== index));
      }
    } else {
      setCorrectAnswer(index);
    }
  };

  const handleSave = () => {
    let finalCorrectAnswer;
    
    if (question.type === 'mcq') {
      finalCorrectAnswer = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
    } else if (question.type === 'truefalse') {
      finalCorrectAnswer = correctAnswer === 1;
    } else if (question.type === 'oneword') {
      finalCorrectAnswer = oneWordAnswer;
    } else {
      finalCorrectAnswer = correctAnswer;
    }

    const updatedQuestion = {
      ...question,
      content: {
        ...question.content,
        question: questionText,
        options: ['mcq', 'scq'].includes(question.type) ? options : question.content.options,
        correctAnswer: question.type === 'fillup' || question.type === 'matching' || question.type === 'assignment' ? undefined : finalCorrectAnswer,
        correctAnswers: question.type === 'fillup' ? correctAnswers.filter(answer => answer.trim()) : undefined,
        caseSensitive: ['fillup', 'oneword'].includes(question.type) ? caseSensitive : undefined,
        leftColumn: question.type === 'matching' ? leftColumn.filter(item => item.trim()) : undefined,
        rightColumn: question.type === 'matching' ? rightColumn.filter(item => item.trim()) : undefined,
        correctPairs: question.type === 'matching' ? correctPairs : undefined,
        minWords: question.type === 'descriptive' ? minWords : undefined,
        maxWords: question.type === 'descriptive' ? maxWords : undefined,
        points: points
      }
    };

    onSave(updatedQuestion);
    onClose();
  };

  const getQuestionTypeLabel = () => {
    switch (question?.type) {
      case 'mcq': return 'Multiple Choice Question';
      case 'scq': return 'Single Choice Question';
      case 'truefalse': return 'True/False Question';
      case 'fillup': return 'Fill in the Blank';
      case 'matching': return 'Matching Question';
      case 'oneword': return 'One Word Answer';
      case 'descriptive': return 'Descriptive Question';
      case 'assignment': return 'Assignment Question';
      default: return 'Question';
    }
  };

  const isCorrectAnswer = (index: number) => {
    if (question?.type === 'mcq') {
      const correctAnswerArray = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
      return correctAnswerArray.includes(index);
    } else {
      return correctAnswer === index;
    }
  };

  if (!question) return null;

  // For assignment questions, show only simplified form
  if (question.type === 'assignment') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Assignment Question</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Text
              </label>
              <Textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter your assignment question here..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points
              </label>
              <Input
                type="number"
                min="1"
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value) || 1)}
                className="w-24"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {getQuestionTypeLabel()}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Text
            </label>
            <Textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter your question here..."
              className="min-h-[100px]"
            />
          </div>

          {(['mcq', 'scq'].includes(question.type)) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer Options {question.type === 'mcq' && <span className="text-blue-600">(Multiple answers allowed)</span>}
                {question.type === 'scq' && <span className="text-green-600">(Single answer only)</span>}
              </label>
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type={question.type === 'mcq' ? 'checkbox' : 'radio'}
                      name={question.type === 'mcq' ? `correct-${index}` : 'correct-answer'}
                      checked={isCorrectAnswer(index)}
                      onChange={(e) => handleCorrectAnswerChange(index, e.target.checked)}
                      className="mt-1"
                    />
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                    />
                    {options.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(index)}
                        className="flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addOption}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
            </div>
          )}

          {question.type === 'truefalse' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Answer
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tf-answer"
                    checked={correctAnswer === 1}
                    onChange={() => setCorrectAnswer(1)}
                  />
                  <span>True</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="tf-answer"
                    checked={correctAnswer === 0}
                    onChange={() => setCorrectAnswer(0)}
                  />
                  <span>False</span>
                </label>
              </div>
            </div>
          )}

          {question.type === 'fillup' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correct Answers
                </label>
                <div className="space-y-3">
                  {correctAnswers.map((answer, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Input
                        value={answer}
                        onChange={(e) => updateCorrectAnswer(index, e.target.value)}
                        placeholder={`Correct answer ${index + 1}`}
                        className="flex-1"
                      />
                      {correctAnswers.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCorrectAnswer(index)}
                          className="flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addCorrectAnswer}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Answer
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="case-sensitive"
                  checked={caseSensitive}
                  onCheckedChange={setCaseSensitive}
                />
                <Label htmlFor="case-sensitive" className="flex items-center gap-2">
                  <CaseSensitive className="h-4 w-4" />
                  Case Sensitive
                </Label>
              </div>
            </div>
          )}

          {question.type === 'oneword' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correct Answer
                </label>
                <Input
                  value={oneWordAnswer}
                  onChange={(e) => setOneWordAnswer(e.target.value)}
                  placeholder="Enter the correct one-word answer"
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="case-sensitive-oneword"
                  checked={caseSensitive}
                  onCheckedChange={setCaseSensitive}
                />
                <Label htmlFor="case-sensitive-oneword" className="flex items-center gap-2">
                  <CaseSensitive className="h-4 w-4" />
                  Case Sensitive
                </Label>
              </div>
            </div>
          )}

          {question.type === 'descriptive' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Words
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={minWords}
                    onChange={(e) => setMinWords(parseInt(e.target.value) || 50)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Words
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={maxWords}
                    onChange={(e) => setMaxWords(parseInt(e.target.value) || 500)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {question.type === 'matching' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matching Pairs
                </label>
                <div className="space-y-3">
                  {leftColumn.map((leftItem, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 items-center">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Left Column</label>
                        <Input
                          value={leftItem}
                          onChange={(e) => updateLeftItem(index, e.target.value)}
                          placeholder={`Item ${index + 1}`}
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-xs text-gray-500 mb-1">matches with</label>
                          <Input
                            value={rightColumn[index] || ''}
                            onChange={(e) => updateRightItem(index, e.target.value)}
                            placeholder={`Match ${String.fromCharCode(65 + index)}`}
                          />
                        </div>
                        {leftColumn.length > 2 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMatchingPair(index)}
                            className="flex-shrink-0 mt-5"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addLeftItem}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Matching Pair
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Points
            </label>
            <Input
              type="number"
              min="1"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value) || 1)}
              className="w-24"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
