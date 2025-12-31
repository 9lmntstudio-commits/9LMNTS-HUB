import { useState } from 'react';
import { ArrowLeft, Heart, Camera, Gift, Users, Music, Star, Sparkles } from 'lucide-react';

interface WeddingOSPageProps {
  onNavigate: (page: string) => void;
}

export function WeddingOSPage({ onNavigate }: WeddingOSPageProps) {
  const [activeTab, setActiveTab] = useState('guestbook');
  const [completedChallenges, setCompletedChallenges] = useState(3);

  const features = [
    {
      icon: Heart,
      title: 'Digital Guestbook',
      description: 'Modern digital guestbook with photos and messages'
    },
    {
      icon: Gift,
      title: 'Buy the Couple a Round',
      description: 'Virtual drink system with custom messages'
    },
    {
      icon: Camera,
      title: 'Photo Scavenger Hunt',
      description: 'Interactive photo challenges for guests'
    },
    {
      icon: Users,
      title: 'Guest Networking',
      description: 'Connect guests with similar interests'
    },
    {
      icon: Music,
      title: 'Song Requests',
      description: 'Dedication system with queue management'
    },
    {
      icon: Star,
      title: 'Live Timeline',
      description: 'Real-time event updates and memories'
    }
  ];

  const challenges = [
    'Share a memory with the couple',
    'Take a photo at the photo booth',
    'Sign the digital guestbook',
    'Dedicate a song to the couple',
    'Complete the wedding quiz',
    'Share your dance moves'
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => window.close()}
            className="mb-8 flex items-center gap-2 text-[#FF7A00] hover:text-[#FF7A00]/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Event OS Selection
          </button>
          
          <div className="text-center mb-12">
            <div className="mb-6">
              <span className="px-4 py-2 bg-[#222222] border border-[#FF7A00]/30 rounded-full text-[#FF7A00] text-sm">
                LIFESTYLE & EVENTS
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              <span className="font-graffiti text-[#FF7A00]">The Union: Wedding OS</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Modernize the reception. No more clinking glasses—guests complete 
              challenges to unlock rewards and create lasting memories.
            </p>
          </div>

          {/* Live Stats */}
          <div className="bg-[#222222] rounded-lg border border-[#FF7A00]/20 p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl text-[#FF7A00] font-bold mb-2">{completedChallenges}/6</div>
                <div className="text-gray-400">Challenges Completed</div>
              </div>
              <div>
                <div className="text-3xl text-[#FF7A00] font-bold mb-2">247</div>
                <div className="text-gray-400">Guests Engaged</div>
              </div>
              <div>
                <div className="text-3xl text-[#FF7A00] font-bold mb-2">89%</div>
                <div className="text-gray-400">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-white text-center mb-12">
            <span className="font-futuristic">Interactive</span> <span className="font-graffiti text-[#FF7A00]">Features</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-[#222222] rounded-lg p-6 border border-[#FF7A00]/20 hover:border-[#FF7A00] transition-all">
                  <div className="w-12 h-12 bg-[#FF7A00]/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-[#FF7A00]" size={24} />
                  </div>
                  <h3 className="text-xl text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-white text-center mb-12">
            <span className="font-futuristic">Guest</span> <span className="font-graffiti text-[#FF7A00]">Challenges</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-[#222222] rounded-lg p-6 border border-[#FF7A00]/20">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < completedChallenges ? 'bg-[#FF7A00]' : 'bg-[#333333]'
                  }`}>
                    {index < completedChallenges && <Sparkles className="text-[#1A1A1A]" size={16} />}
                  </div>
                  <span className={`text-lg ${index < completedChallenges ? 'text-white' : 'text-gray-500'}`}>
                    {challenge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl text-white mb-6">
            <span className="font-futuristic">Create Your</span><br />
            <span className="font-graffiti text-[#FF7A00]">Perfect Wedding</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Let The Union Wedding OS transform your special day into an interactive experience
          </p>
          <button
            onClick={() => onNavigate('start-project')}
            className="px-8 py-4 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-all transform hover:scale-105"
          >
            Get Wedding OS
          </button>
        </div>
      </section>
    </div>
  );
}
