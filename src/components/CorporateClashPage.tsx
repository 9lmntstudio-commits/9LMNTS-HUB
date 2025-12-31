import { useState } from 'react';
import { ArrowLeft, Trophy, TrendingUp, Users, MessageSquare, DollarSign, Target, Zap } from 'lucide-react';

interface CorporateClashPageProps {
  onNavigate: (page: string) => void;
}

export function CorporateClashPage({ onNavigate }: CorporateClashPageProps) {
  const [activeRound, setActiveRound] = useState('pitch');
  const [totalInvestment, setTotalInvestment] = useState(250000);

  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time Investment Simulation',
      description: 'Live investment tracking with virtual capital allocation'
    },
    {
      icon: Users,
      title: 'Networking "Who\'s Here" Grid',
      description: 'Interactive attendee directory with meeting scheduler'
    },
    {
      icon: MessageSquare,
      title: 'Audience Q&A Upvoting',
      description: 'Crowd-sourced questions with smart prioritization'
    },
    {
      icon: Trophy,
      title: 'Competition Leaderboard',
      description: 'Live scoring and ranking for all participants'
    },
    {
      icon: Target,
      title: 'Pitch Analytics',
      description: 'Real-time feedback and performance metrics'
    },
    {
      icon: DollarSign,
      title: 'Virtual Funding Pool',
      description: 'Simulated investment ecosystem'
    }
  ];

  const rounds = [
    { name: 'Pitch Round', description: '5-minute startup pitches', participants: 12 },
    { name: 'Q&A Battle', description: 'Audience questions & voting', participants: 8 },
    { name: 'Networking Challenge', description: 'Strategic connections game', participants: 24 }
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => window.close()}
            className="mb-8 flex items-center gap-2 text-[#00D4FF] hover:text-[#00D4FF]/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Event OS Selection
          </button>
          
          <div className="text-center mb-12">
            <div className="mb-6">
              <span className="px-4 py-2 bg-[#222222] border border-[#00D4FF]/30 rounded-full text-[#00D4FF] text-sm">
                BUSINESS & TECH
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              <span className="font-graffiti text-[#00D4FF]">Corporate Clash</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Gamify the boardroom. Perfect for startup pitch competitions, 
              town halls, and internal hackathons with real-time engagement.
            </p>
          </div>

          {/* Live Competition Stats */}
          <div className="bg-[#222222] rounded-lg border border-[#00D4FF]/20 p-8">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl text-[#00D4FF] font-bold mb-2">${totalInvestment.toLocaleString()}</div>
                <div className="text-gray-400">Virtual Investment Pool</div>
              </div>
              <div>
                <div className="text-3xl text-[#00D4FF] font-bold mb-2">44</div>
                <div className="text-gray-400">Active Participants</div>
              </div>
              <div>
                <div className="text-3xl text-[#00D4FF] font-bold mb-2">3</div>
                <div className="text-gray-400">Competition Rounds</div>
              </div>
              <div>
                <div className="text-3xl text-[#00D4FF] font-bold mb-2">2.5h</div>
                <div className="text-gray-400">Time Remaining</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Rounds */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-white text-center mb-12">
            <span className="font-futuristic">Competition</span> <span className="font-graffiti text-[#00D4FF]">Rounds</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {rounds.map((round, index) => (
              <div 
                key={index}
                onClick={() => setActiveRound(round.name)}
                className={`bg-[#222222] rounded-lg p-6 border cursor-pointer transition-all ${
                  activeRound === round.name 
                    ? 'border-[#00D4FF]' 
                    : 'border-[#00D4FF]/20 hover:border-[#00D4FF]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-white">{round.name}</h3>
                  <Zap className={`w-5 h-5 ${activeRound === round.name ? 'text-[#00D4FF]' : 'text-gray-500'}`} />
                </div>
                <p className="text-gray-400 mb-3">{round.description}</p>
                <div className="flex items-center gap-2">
                  <Users className="text-gray-500" size={16} />
                  <span className="text-gray-400">{round.participants} participants</span>
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
            <span className="font-futuristic">Platform</span> <span className="font-graffiti text-[#00D4FF]">Features</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-[#222222] rounded-lg p-6 border border-[#00D4FF]/20 hover:border-[#00D4FF] transition-all">
                  <div className="w-12 h-12 bg-[#00D4FF]/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-[#00D4FF]" size={24} />
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
            <span className="font-futuristic">Elevate Your</span><br />
            <span className="font-graffiti text-[#00D4FF]">Corporate Event</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Transform your next corporate event into an engaging competitive experience
          </p>
          <button
            onClick={() => onNavigate('start-project')}
            className="px-8 py-4 bg-[#00D4FF] text-[#1A1A1A] rounded-lg hover:bg-[#00D4FF]/90 transition-all transform hover:scale-105"
          >
            Get Corporate Clash
          </button>
        </div>
      </section>
    </div>
  );
}
