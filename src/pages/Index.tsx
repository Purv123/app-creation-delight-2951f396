
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Smartphone, Clock, Users, Brain } from 'lucide-react';
import { SurveyWizard } from '@/components/SurveyWizard';
import { ResultsScreen } from '@/components/ResultsScreen';
import { ConsultationBooking } from '@/components/ConsultationBooking';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'survey' | 'results' | 'consultation'>('home');
  const [surveyAnswers, setSurveyAnswers] = useState<Record<number, string>>({});
  const [screenTimeData, setScreenTimeData] = useState({
    totalHours: 8.5,
    socialMedia: 4.2,
    gaming: 1.8,
    entertainment: 2.5
  });

  const handleSurveyComplete = (answers: Record<number, string>) => {
    setSurveyAnswers(answers);
    setCurrentScreen('results');
  };

  const renderHomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <div className="flex items-center justify-center mb-4">
            <Smartphone className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Phone Addiction Analyzer</h1>
          <p className="text-gray-600">Understand your digital wellness</p>
        </div>

        {/* Screen Time Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Last 30 Days Usage
            </CardTitle>
            <CardDescription>Your screen time breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{screenTimeData.totalHours}h</div>
              <div className="text-sm text-gray-500">Daily Average</div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Social Media</span>
                  <span>{screenTimeData.socialMedia}h</span>
                </div>
                <Progress value={(screenTimeData.socialMedia / screenTimeData.totalHours) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Gaming</span>
                  <span>{screenTimeData.gaming}h</span>
                </div>
                <Progress value={(screenTimeData.gaming / screenTimeData.totalHours) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Entertainment</span>
                  <span>{screenTimeData.entertainment}h</span>
                </div>
                <Progress value={(screenTimeData.entertainment / screenTimeData.totalHours) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-lg font-semibold">Mental</div>
              <div className="text-sm text-gray-600">Health Check</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-semibold">Expert</div>
              <div className="text-sm text-gray-600">Consultation</div>
            </CardContent>
          </Card>
        </div>

        {/* Begin Survey Button */}
        <Button 
          onClick={() => setCurrentScreen('survey')}
          className="w-full py-6 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700"
        >
          Begin Assessment
        </Button>

        {/* Navigation */}
        <div className="flex justify-center space-x-4 pt-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentScreen('consultation')}
            className="flex-1"
          >
            Book Consultation
          </Button>
        </div>
      </div>
    </div>
  );

  if (currentScreen === 'survey') {
    return <SurveyWizard onComplete={handleSurveyComplete} onBack={() => setCurrentScreen('home')} />;
  }

  if (currentScreen === 'results') {
    return (
      <ResultsScreen 
        answers={surveyAnswers} 
        screenTimeData={screenTimeData}
        onBack={() => setCurrentScreen('home')}
        onConsultation={() => setCurrentScreen('consultation')}
      />
    );
  }

  if (currentScreen === 'consultation') {
    return <ConsultationBooking onBack={() => setCurrentScreen('home')} />;
  }

  return renderHomeScreen();
};

export default Index;
