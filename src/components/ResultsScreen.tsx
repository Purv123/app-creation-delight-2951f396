
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ExternalLink, Calendar, TrendingDown, Brain, Heart } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface ResultsScreenProps {
  answers: Record<number, string>;
  screenTimeData: {
    totalHours: number;
    socialMedia: number;
    gaming: number;
    entertainment: number;
  };
  onBack: () => void;
  onConsultation: () => void;
}

export const ResultsScreen = ({ answers, screenTimeData, onBack, onConsultation }: ResultsScreenProps) => {
  // Mental health algorithm
  const calculateAddictionLevel = () => {
    const combinedUsage = screenTimeData.socialMedia + screenTimeData.gaming + screenTimeData.entertainment;
    let score = 0;
    
    // Screen time scoring
    if (combinedUsage > 5) score += 3;
    else if (combinedUsage >= 3) score += 2;
    else score += 1;
    
    // Survey scoring (Yes answers indicate higher addiction)
    const yesAnswers = Object.values(answers).filter(answer => answer === 'Yes').length;
    const socialMediaHours = answers[2];
    
    score += yesAnswers * 0.5;
    
    if (socialMediaHours === '> 5hr') score += 2;
    else if (socialMediaHours === '2-5 hr') score += 1;
    
    // Determine category
    if (score >= 7) return { level: 'Severe', color: 'destructive', percentage: 85 };
    else if (score >= 4) return { level: 'Medium', color: 'default', percentage: 60 };
    else if (score >= 2) return { level: 'Mild', color: 'secondary', percentage: 35 };
    return { level: 'Normal', color: 'default', percentage: 15 };
  };

  const addictionResult = calculateAddictionLevel();
  const combinedUsage = screenTimeData.socialMedia + screenTimeData.gaming + screenTimeData.entertainment;

  const pieData = [
    { name: 'Your Level', value: addictionResult.percentage, color: '#8B5CF6' },
    { name: '1990s Population', value: 100 - addictionResult.percentage, color: '#E5E7EB' }
  ];

  const barData = [
    { category: 'Social Media', hours: screenTimeData.socialMedia, recommended: 1 },
    { category: 'Gaming', hours: screenTimeData.gaming, recommended: 0.5 },
    { category: 'Entertainment', hours: screenTimeData.entertainment, recommended: 1.5 }
  ];

  const recommendations = {
    Severe: [
      "Set strict app time limits using iOS Screen Time",
      "Remove social media apps from your phone",
      "Use grayscale mode to reduce phone appeal",
      "Practice digital detox for 1-2 hours daily",
      "Consider professional counseling"
    ],
    Medium: [
      "Set daily limits for entertainment apps",
      "Turn off non-essential notifications",
      "Create phone-free zones in your home",
      "Practice mindful phone usage",
      "Use focus modes during work/study"
    ],
    Mild: [
      "Be more mindful of your usage patterns",
      "Set boundaries for evening phone use",
      "Try the 20-20-20 rule for eye health",
      "Engage in more offline activities"
    ],
    Normal: [
      "Maintain your current healthy habits",
      "Stay aware of usage patterns",
      "Continue balancing digital and offline life"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Your Results</h1>
          <div className="w-10" />
        </div>

        {/* Addiction Level */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Brain className="h-6 w-6" />
              Addiction Level
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Badge 
              variant={addictionResult.color as any} 
              className="text-lg px-4 py-2"
            >
              {addictionResult.level}
            </Badge>
            <div className="text-sm text-gray-600">
              Combined usage: {combinedUsage.toFixed(1)}h/day
            </div>
          </CardContent>
        </Card>

        {/* Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">vs 1990s Population</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span>Your Level</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                <span>1990s Average</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage vs Recommended */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Usage vs Recommended
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="category" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#8B5CF6" name="Your Usage" />
                  <Bar dataKey="recommended" fill="#10B981" name="Recommended" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations[addictionResult.level as keyof typeof recommendations].map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={onConsultation}
            className="w-full flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
          >
            <Calendar className="h-4 w-4" />
            Book Professional Consultation
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={() => window.open('https://www.getdeaddicted.com', '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
            Visit GetDeaddicted.com
          </Button>
        </div>
      </div>
    </div>
  );
};
