import { useState } from 'react';
import { ArrowLeft, Calendar, Users, MessageSquare, Clock, MapPin, Video, Award } from 'lucide-react';

interface ConferenceConnectPageProps {
  onNavigate: (page: string) => void;
}

export function ConferenceConnectPage({ onNavigate }: ConferenceConnectPageProps) {
  const [activeSession, setActiveSession] = useState('keynote');
  const [attendees, setAttendees] = useState(1250);

  const features = [
    {
      icon: Calendar,
      title: 'Session Tracking',
      description: 'Personalized schedule with conflict detection'
    },
    {
      icon: Users,
      title: 'Business Card Exchange',
      description: 'Digital networking with smart recommendations'
    },
    {
      icon: MessageSquare,
      title: 'Live Polling',
      description: 'Real-time audience engagement and feedback'
    },
    {
      icon: Video,
      title: 'Hybrid Support',
      description: 'Seamless integration for virtual attendees'
    },
    {
      icon: MapPin,
      title: 'Venue Navigation',
      description: 'Interactive maps with session locations'
    },
    {
      icon: Award,
      title: 'Certification System',
      description: 'Digital certificates and attendance tracking'
    }
  ];

  const sessions = [
    { name: 'Keynote: Future of Tech', time: '9:00 AM', speaker: 'Dr. Sarah Chen', room: 'Main Hall' },
    { name: 'AI Workshop', time: '11:00 AM', speaker: 'Mike Johnson', room: 'Room A' },
    { name: 'Networking Lunch', time: '12:30 PM', speaker: 'All Attendees', room: 'Dining Hall' },
    { name: 'Startup Pitch Session', time: '2:00 PM', speaker: 'Various', room: 'Room B' }
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => window.close()}
            className="mb-8 flex items-center gap-2 text-[#2196F3] hover:text-[#2196F3]/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Event OS Selection
          </button>
          
          <div className="text-center mb-12">
            <div className="mb-6">
              <span className="px-4 py-2 bg-[#222222] border border-[#2196F3]/30 rounded-full text-[#2196F3] text-sm">
                PROFESSIONAL EVENTS
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              <span className="font-graffiti text-[#2196F3]">Conference Connect</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Elevate your conference experience with networking, sessions, and 
              engagement tools designed for professional growth and connection.
            </p>
          </div>

          {/* Live Conference Stats */}
          <div className="bg-[#222222] rounded-lg border border-[#2196F3]/20 p-8">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl text-[#2196F3] font-bold mb-2">{attendees.toLocaleString()}</div>
                <div className="text-gray-400">Total Attendees</div>
              </div>
              <div>
                <div className="text-3xl text-[#2196F3] font-bold mb-2">24</div>
                <div className="text-gray-400">Sessions Today</div>
              </div>
              <div>
                <div className="text-3xl text-[#2196F3] font-bold mb-2">8</div>
                <div className="text-gray-400">Active Rooms</div>
              </div>
              <div>
                <div className="text-3xl text-[#2196F3] font-bold mb-2">156</div>
                <div className="text-gray-400">Connections Made</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Sessions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-white text-center mb-12">
            <span className="font-futuristic">Today's</span> <span className="font-graffiti text-[#2196F3]">Schedule</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {sessions.map((session, index) => (
              <div 
                key={index}
                onClick={() => setActiveSession(session.name)}
                className={`bg-[#222222] rounded-lg p-6 border cursor-pointer transition-all ${
                  activeSession === session.name 
                    ? 'border-[#2196F3]' 
                    : 'border-[#2196F3]/20 hover:border-[#2196F3]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-white">{session.name}</h3>
                  <Calendar className={`w-5 h-5 ${activeSession === session.name ? 'text-[#2196F3]' : 'text-gray-500'}`} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Time:</span>
                    <span className="text-white">{session.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Speaker:</span>
                    <span className="text-[#2196F3]">{session.speaker}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location:</span>
                    <span className="text-white">{session.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-white text-center mb-12">
            <span className="font-futuristic">Platform</span> <span className="font-graffiti text-[#2196F3]">Features</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-[#222222] rounded-lg p-6 border border-[#2196F3]/20 hover:border-[#2196F3] transition-all">
                  <div className="w-12 h-12 bg-[#2196F3]/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-[#2196F3]" size={24} />
                  </div>
                  <h3 className="text-xl text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl text-white mb-6">
            <span className="font-futuristic">Transform Your</span><br />
            <span className="font-graffiti text-[#2196F3]">Conference</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Create meaningful connections and memorable conference experiences
          </p>
          <button
            onClick={() => onNavigate('start-project')}
            className="px-8 py-4 bg-[#2196F3] text-[#1A1A1A] rounded-lg hover:bg-[#2196F3]/90 transition-all transform hover:scale-105"
          >
            Get Conference Connect
          </button>
        </div>
      </section>
    </div>
  );
}
