
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ConsultationBookingProps {
  onBack: () => void;
}

const professionals = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    type: "Clinical Psychologist",
    speciality: "Digital Wellness & Addiction",
    experience: "12 years",
    rating: 4.9,
    price: "$120/session"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    type: "Psychiatrist",
    speciality: "Behavioral Addiction",
    experience: "8 years",
    rating: 4.8,
    price: "$150/session"
  },
  {
    id: 3,
    name: "Dr. Emma Williams",
    type: "Mental Health Coach",
    speciality: "Digital Detox & Mindfulness",
    experience: "6 years",
    rating: 4.9,
    price: "$80/session"
  }
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

export const ConsultationBooking = ({ onBack }: ConsultationBookingProps) => {
  const [selectedProfessional, setSelectedProfessional] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    concerns: ''
  });

  const handleBooking = () => {
    if (!selectedProfessional || !selectedDate || !selectedTime || !formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Consultation Booked!",
      description: "You'll receive a confirmation email shortly.",
    });

    // Here you would typically send the booking data to your backend
    console.log('Booking data:', {
      professional: professionals.find(p => p.id === selectedProfessional),
      date: selectedDate,
      time: selectedTime,
      client: formData
    });
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Book Consultation</h1>
          <div className="w-10" />
        </div>

        {/* Select Professional */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Choose Professional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {professionals.map((professional) => (
              <div
                key={professional.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedProfessional === professional.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedProfessional(professional.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{professional.name}</h3>
                    <p className="text-sm text-gray-600">{professional.type}</p>
                    <p className="text-sm text-purple-600">{professional.speciality}</p>
                    <p className="text-xs text-gray-500">{professional.experience} experience</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">{professional.price}</div>
                    <div className="text-sm text-yellow-600">⭐ {professional.rating}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Select Date & Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="date">Select Date</Label>
              <Input
                id="date"
                type="date"
                min={getTomorrowDate()}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="time">Select Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <Label htmlFor="concerns">Specific Concerns (Optional)</Label>
              <Textarea
                id="concerns"
                value={formData.concerns}
                onChange={(e) => setFormData(prev => ({ ...prev, concerns: e.target.value }))}
                placeholder="Tell us about your specific concerns or goals for the session"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Book Button */}
        <Button 
          onClick={handleBooking}
          className="w-full py-6 text-lg font-semibold bg-purple-600 hover:bg-purple-700"
        >
          Book Consultation
        </Button>
      </div>
    </div>
  );
};
