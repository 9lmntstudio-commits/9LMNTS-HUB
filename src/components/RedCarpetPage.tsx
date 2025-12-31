import { useState } from 'react';
import { ArrowLeft, Star, Camera, Heart, MessageSquare, Users, Award, Sparkles } from 'lucide-react';

interface RedCarpetPageProps {
  onNavigate: (page: string) => void;
}

export function RedCarpetPage({ onNavigate }: RedCarpetPageProps) {
  const [activeSection, setActiveSection] = useState('gallery');
  const [fanVotes, setFanVotes] = useState(8742);

  const features = [
    {
      icon: Camera,
      title: 'Photo Booth Integration',
      description: 'Professional photo booth with custom frames and filters'
    },
    {
      icon: Star,
      title: 'Fan Voting',
      description: 'Real-time audience voting for best dressed and performances'
    },
    {
      icon: MessageSquare,
      title: 'Social Media Wall',
      description: 'Live social media feed with event hashtag tracking'
    },
    {
      icon: Users,
      title: 'Celebrity Interactions',
      description: 'Scheduled meet-and-greet sessions with VIP access'
    },
    {
      icon: Heart,
      title: 'Charity Integration',
      description: 'Live donation tracking and charitable giving features'
    },
    {
      icon: Award,
      title: 'Awards Ceremony',
      description: 'Digital awards presentation and recognition system'
    }
  ];

  const celebrities = [
    { name: 'Emma Stone', category: 'Best Dressed', votes: 2341 },
    { name: 'Ryan Gosling', category: 'Best Actor', votes: 1876 },
    { name: 'Margot Robbie', category: 'Breakout Star', votes: 2103 },
    { name: 'Christopher Nolan', category: 'Best Director', votes: 1422 }
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => window.close()}
            className="mb-8 flex items-center gap-2 text-[#FF9800] hover:text-[#FF9800]/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Event OS Selection
          </button>
          
          <div className="text-center mb-12">
            <div className="mb-6">
              <span className="px-4 py-2 bg-[#222222] border border-[#FF9800]/30 rounded-full text-[#FF9800] text-sm">
                ENTERTAINMENT & MEDIA
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              <span className="font-graffiti text-[#FF9800]">Red Carpet Experience</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Create Hollywood-style experiences for premieres, galas, and 
              celebrity events with interactive fan engagement and social media integration.
            </p>
          </div>

          {/* Live Event Stats */}
          <div className="bg-[#222222] rounded-lg border border-[#FF9800]/20 p-8">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl text-[#FF9800] font-bold mb-2">{fanVotes.toLocaleString()}</div>
                <div className="text-gray-400">Fan Votes Cast</div>
              </div>
              <div>
                <div className="text-3xl text-[#FF9800] font-bold mb-2">450</div>
                <div className="text-gray-400">Media Credentials</div>
              </div>
              <div>
                <div className="text-3xl text-[#FF9800] font-bold mb-2">28</div>
                <div className="text-gray-400">Celebrities</div>
              </div>
              <div>
                <div className="text-3xl text-[#FF9800] font-bold mb-2">2.1M</div>
                <div className="text-gray-400">Social Reach</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Celebrity Voting */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-white text-center mb-12">
            <span className="font-futuristic">Fan Choice</span> <span className="font-graffiti text-[#FF9800]">Awards</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {celebrities.map((celebrity, index) => (
              <div 
                key={index}
                className="bg-[#222222] rounded-lg p-6 border border-[#FF9800]/20 hover:border-[#FF9800] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-white">{celebrity.name}</h3>
                  <Star className="w-5 h-5 text-[#FF9800]" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-[#FF9800]">{celebrity.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Votes:</span>
                    <span className="text-white font-bold">{celebrity.votes.toLocaleString()}</span>
                  </div>
                  <button className="w-full mt-4 py-2 bg-[#FF9800] text-[#1A1A1A] rounded hover:bg-[#FF9800]/90 transition-all">
                    Vote Now
                  </button>
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
            <span className="font-futuristic">Red Carpet</span> <span className="font-graffiti text-[#FF9800]">Features</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-[#222222] rounded-lg p-6 border border-[#FF9800]/20 hover:border-[#FF9800] transition-all">
                  <div className="w-12 h-12 bg-[#FF9800]/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-[#FF9800]" size={24} />
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
            <span className="font-futuristic">Create Your</span><br />
            <span className="font-graffiti text-[#FF9800]">Red Carpet Moment</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Transform your next event into a star-studded Hollywood experience
          </p>
          <button
            onClick={() => onNavigate('start-project')}
            className="px-8 py-4 bg-[#FF9800] text-[#1A1A1A] rounded-lg hover:bg-[#FF9800]/90 transition-all transform hover:scale-105"
          >
            Get Red Carpet Experience
          </button>
        </div>
      </section>
    </div>
  );
}
