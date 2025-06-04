
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SurveyWizardProps {
  onComplete: (answers: Record<number, string>) => void;
  onBack: () => void;
}

const questions = [
  {
    id: 1,
    question: "Are you a heavy user of social media applications like Facebook, Instagram, TikTok, X, Snapchat, Pinterest, YouTube?",
    options: ["Yes", "No"]
  },
  {
    id: 2,
    question: "How many hours per day do you spend on browsing social media?",
    options: ["< 1 hr", "2-5 hr", "> 5hr"]
  },
  {
    id: 3,
    question: "Do you feel the urge to constantly check social media, even when you're not expecting any notifications?",
    options: ["Yes", "No"]
  },
  {
    id: 4,
    question: "Do you take your phone to rest room and end up spending more than 5 minutes on taking nature's call?",
    options: ["Yes", "No"]
  },
  {
    id: 5,
    question: "Do you feel agitated when your phone is misplaced?",
    options: ["Yes", "No"]
  },
  {
    id: 6,
    question: "Do you feel urge to check your phone on any notification?",
    options: ["Yes", "No"]
  },
  {
    id: 7,
    question: "Do you experience withdrawal symptoms (irritability, anxiety, restlessness) when you're unable to access social media?",
    options: ["Yes", "No"]
  },
  {
    id: 8,
    question: "Do you also use smart watch with notifications enabled?",
    options: ["Yes", "No"]
  },
  {
    id: 9,
    question: "Do you use your phone in front of your kids?",
    options: ["Yes", "No"]
  },
  {
    id: 10,
    question: "Do you sleep with your phone next to your bed?",
    options: ["Yes", "No"]
  }
];

export const SurveyWizard = ({ onComplete, onBack }: SurveyWizardProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const currentAnswer = answers[questions[currentQuestion].id];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <Button variant="ghost" onClick={handlePrevious} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <div className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</div>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg leading-relaxed">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={currentAnswer || ""} onValueChange={handleAnswer}>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="text-base cursor-pointer flex-1 py-2"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            className="flex-1"
          >
            {currentQuestion === 0 ? 'Back to Home' : 'Previous'}
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!currentAnswer}
            className="flex-1"
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            {currentQuestion < questions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
