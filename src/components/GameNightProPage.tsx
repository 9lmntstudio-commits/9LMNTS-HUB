import { useState } from 'react';
import { ArrowLeft, Gamepad2, Trophy, Users, Clock, Target, Zap, Star } from 'lucide-react';

interface GameNightProPageProps {
  onNavigate: (page: string) => void;
}

export function GameNightProPage({ onNavigate }: GameNightProPageProps) {
  const [activeGame, setActiveGame] = useState('tournament');
  const [playerCount, setPlayerCount] = useState(28);

  const features = [
    {
      icon: Trophy,
      title: 'Tournament Brackets',
      description: 'Automated bracket generation and management'
    },
    {
      icon: Users,
      title: 'Multiplayer Support',
      description: 'Support for up to 100 simultaneous players'
    },
    {
      icon: Target,
      title: 'Skill-Based Matching',
      description: 'Smart player pairing based on skill level'
    },
    {
      icon: Clock,
      title: 'Live Timing System',
      description: 'Precise game timing and round management'
    },
    {
      icon: Star,
      title: 'Achievement System',
      description: 'Unlock achievements and track progress'
    },
    {
      icon: Zap,
      title: 'Live Streaming',
      description: 'Broadcast games to external platforms'
    }
  ];

  const games = [
    { name: 'Street Fighter Tournament', players: 16, status: 'In Progress' },
    { name: 'Mario Kart Race', players: 8, status: 'Starting Soon' },
    { name: 'Smash Bros Arena', players: 12, status: 'In Progress' },
    { name: 'Rocket League', players: 4, status: 'Completed' }
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => window.close()}
            className="mb-8 flex items-center gap-2 text-[#4CAF50] hover:text-[#4CAF50]/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Event OS Selection
          </button>
          
          <div className="text-center mb-12">
            <div className="mb-6">
              <span className="px-4 py-2 bg-[#222222] border border-[#4CAF50]/30 rounded-full text-[#4CAF50] text-sm">
                GAMING & ENTERTAINMENT
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              <span className="font-graffiti text-[#4CAF50]">Game Night Pro</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Transform any space into an interactive gaming arena with leaderboards, 
              live scoring, and tournament management for unforgettable game nights.
            </p>
          </div>

          {/* Live Gaming Stats */}
          <div className="bg-[#222222] rounded-lg border border-[#4CAF50]/20 p-8">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl text-[#4CAF50] font-bold mb-2">{playerCount}</div>
                <div className="text-gray-400">Active Players</div>
              </div>
              <div>
                <div className="text-3xl text-[#4CAF50] font-bold mb-2">4</div>
                <div className="text-gray-400">Live Games</div>
              </div>
              <div>
                <div className="text-3xl text-[#4CAF50] font-bold mb-2">12</div>
                <div className="text-gray-400">Tournaments</div>
              </div>
              <div>
                <div className="text-3xl text-[#4CAF50] font-bold mb-2">2.5h</div>
                <div className="text-gray-400">Avg Game Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Games */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-white text-center mb-12">
            <span className="font-futuristic">Live Game</span> <span className="font-graffiti text-[#4CAF50]">Arena</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {games.map((game, index) => (
              <div 
                key={index}
                onClick={() => setActiveGame(game.name)}
                className={`bg-[#222222] rounded-lg p-6 border cursor-pointer transition-all ${
                  activeGame === game.name 
                    ? 'border-[#4CAF50]' 
                    : 'border-[#4CAF50]/20 hover:border-[#4CAF50]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-white">{game.name}</h3>
                  <Gamepad2 className={`w-5 h-5 ${activeGame === game.name ? 'text-[#4CAF50]' : 'text-gray-500'}`} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Players:</span>
                    <span className="text-white">{game.players}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`${
                      game.status === 'In Progress' ? 'text-[#4CAF50]' :
                      game.status === 'Starting Soon' ? 'text-yellow-500' :
                      'text-gray-500'
                    }`}>{game.status}</span>
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
            <span className="font-futuristic">Gaming</span> <span className="font-graffiti text-[#4CAF50]">Features</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-[#222222] rounded-lg p-6 border border-[#4CAF50]/20 hover:border-[#4CAF50] transition-all">
                  <div className="w-12 h-12 bg-[#4CAF50]/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-[#4CAF50]" size={24} />
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
            <span className="font-futuristic">Level Up Your</span><br />
            <span className="font-graffiti text-[#4CAF50]">Game Night</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Create epic gaming experiences that bring everyone together
          </p>
          <button
            onClick={() => onNavigate('start-project')}
            className="px-8 py-4 bg-[#4CAF50] text-[#1A1A1A] rounded-lg hover:bg-[#4CAF50]/90 transition-all transform hover:scale-105"
          >
            Get Game Night Pro
          </button>
        </div>
      </section>
    </div>
  );
}
