import { useState } from 'react';
import { ArrowLeft, Music, Calendar, MapPin, Users, Ticket, Clock, Star } from 'lucide-react';

interface FestivalFlowPageProps {
  onNavigate: (page: string) => void;
}

export function FestivalFlowPage({ onNavigate }: FestivalFlowPageProps) {
  const [selectedStage, setSelectedStage] = useState('main');
  const [attendees, setAttendees] = useState(15420);

  const features = [
    {
      icon: Ticket,
      title: 'Smart Ticketing',
      description: 'QR code tickets with real-time validation'
    },
    {
      icon: Calendar,
      title: 'Interactive Schedule',
      description: 'Live schedule updates and personalized recommendations'
    },
    {
      icon: MapPin,
      title: 'Venue Navigation',
      description: 'Interactive maps with real-time crowd tracking'
    },
    {
      icon: Users,
      title: 'Artist Discovery',
      description: 'Connect with artists and discover new music'
    },
    {
      icon: Music,
      title: 'Live Streaming',
      description: 'Stream performances to virtual attendees'
    },
    {
      icon: Clock,
      title: 'Set Time Reminders',
      description: 'Never miss your favorite artists'
    }
  ];

  const stages = [
    { name: 'Main Stage', capacity: 5000, currentArtist: 'The Weeknd' },
    { name: 'Electronic Arena', capacity: 3000, currentArtist: 'Deadmau5' },
    { name: 'Hip-Hop Tent', capacity: 2000, currentArtist: 'Kendrick Lamar' },
    { name: 'Indie Stage', capacity: 1500, currentArtist: 'Tame Impala' }
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => window.close()}
            className="mb-8 flex items-center gap-2 text-[#9C27B0] hover:text-[#9C27B0]/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Event OS Selection
          </button>
          
          <div className="text-center mb-12">
            <div className="mb-6">
              <span className="px-4 py-2 bg-[#222222] border border-[#9C27B0]/30 rounded-full text-[#9C27B0] text-sm">
                MUSIC & ARTS
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              <span className="font-graffiti text-[#9C27B0]">Festival Flow</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Complete festival management system. From ticketing to crowd engagement, 
              all in one platform for the ultimate music experience.
            </p>
          </div>

          {/* Live Festival Stats */}
          <div className="bg-[#222222] rounded-lg border border-[#9C27B0]/20 p-8">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl text-[#9C27B0] font-bold mb-2">{attendees.toLocaleString()}</div>
                <div className="text-gray-400">Total Attendees</div>
              </div>
              <div>
                <div className="text-3xl text-[#9C27B0] font-bold mb-2">4</div>
                <div className="text-gray-400">Active Stages</div>
              </div>
              <div>
                <div className="text-3xl text-[#9C27B0] font-bold mb-2">47</div>
                <div className="text-gray-400">Artists Performing</div>
              </div>
              <div>
                <div className="text-3xl text-[#9C27B0] font-bold mb-2">3 Days</div>
                <div className="text-gray-400">Festival Duration</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stage Management */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-white text-center mb-12">
            <span className="font-futuristic">Live Stage</span> <span className="font-graffiti text-[#9C27B0]">Management</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {stages.map((stage, index) => (
              <div 
                key={index}
                onClick={() => setSelectedStage(stage.name)}
                className={`bg-[#222222] rounded-lg p-6 border cursor-pointer transition-all ${
                  selectedStage === stage.name 
                    ? 'border-[#9C27B0]' 
                    : 'border-[#9C27B0]/20 hover:border-[#9C27B0]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-white">{stage.name}</h3>
                  <Star className={`w-5 h-5 ${selectedStage === stage.name ? 'text-[#9C27B0]' : 'text-gray-500'}`} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Capacity:</span>
                    <span className="text-white">{stage.capacity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Now Playing:</span>
                    <span className="text-[#9C27B0]">{stage.currentArtist}</span>
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
            <span className="font-futuristic">Platform</span> <span className="font-graffiti text-[#9C27B0]">Features</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-[#222222] rounded-lg p-6 border border-[#9C27B0]/20 hover:border-[#9C27B0] transition-all">
                  <div className="w-12 h-12 bg-[#9C27B0]/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-[#9C27B0]" size={24} />
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
            <span className="font-graffiti text-[#9C27B0]">Festival Experience</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Let Festival Flow elevate your event to unforgettable heights
          </p>
          <button
            onClick={() => onNavigate('start-project')}
            className="px-8 py-4 bg-[#9C27B0] text-[#1A1A1A] rounded-lg hover:bg-[#9C27B0]/90 transition-all transform hover:scale-105"
          >
            Get Festival Flow
          </button>
        </div>
      </section>
    </div>
  );
}
