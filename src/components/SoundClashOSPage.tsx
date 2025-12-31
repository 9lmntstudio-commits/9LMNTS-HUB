import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Volume2, Users, Trophy, Music, Mic2, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { api, Vote } from '../lib/supabase';

interface SoundClashOSPageProps {
  onNavigate: (page: string) => void;
}

export function SoundClashOSPage({ onNavigate }: SoundClashOSPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [hypeLevel, setHypeLevel] = useState(75);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load votes on component mount
  useEffect(() => {
    loadVotes();
  }, []);

  const loadVotes = async () => {
    try {
      // First test if backend is working
      const testResponse = await fetch('/.netlify/functions/test');
      if (!testResponse.ok) {
        console.log('Backend not ready, using demo mode');
        return;
      }
      
      const response = await api.getVotes('sound-clash');
      setVotes(response.data || []);
    } catch (error: any) {
      console.log('Backend not available, using demo mode:', error.message);
      // Set some demo votes for testing
      setVotes([
        { platform: 'sound-clash', user_id: 'demo-1', vote_type: 'dj-shadow' },
        { platform: 'sound-clash', user_id: 'demo-2', vote_type: 'dj-phoenix' }
      ]);
    }
  };

  const handleVote = async (voteType: string) => {
    if (userVote) return; // User already voted
    
    setIsLoading(true);
    try {
      const userId = `user-${Date.now()}`; // Simple user ID for demo
      await api.vote('sound-clash', userId, voteType);
      setUserVote(voteType);
      await loadVotes(); // Reload votes
    } catch (error) {
      console.error('Failed to vote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Users,
      title: 'Live Voting System',
      description: 'Real-time crowd voting with instant results display'
    },
    {
      icon: Zap,
      title: 'Hype Energy Meter',
      description: 'Visual energy tracking that responds to crowd engagement'
    },
    {
      icon: Music,
      title: 'Song Request Line',
      description: 'Digital song requests with priority queue management'
    },
    {
      icon: Trophy,
      title: 'Battle Leaderboard',
      description: 'Live scoring and ranking system for competitions'
    },
    {
      icon: Mic2,
      title: 'DJ Battle Mode',
      description: 'Head-to-head DJ competitions with crowd judging'
    },
    {
      icon: Volume2,
      title: 'Audio Integration',
      description: 'Seamless integration with professional sound systems'
    }
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
              <span className="px-4 py-2 bg-[#222222] border border-[#E91E63]/30 rounded-full text-[#E91E63] text-sm">
                NIGHTLIFE & ENTERTAINMENT
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              <span className="font-graffiti text-[#E91E63]">Sound Clash OS</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Turn the crowd into the judge. A real-time voting engine for DJ battles, 
              rap battles, and dance-offs with live energy tracking.
            </p>
          </div>

          {/* Live Demo Section */}
          <div className="bg-[#222222] rounded-lg border border-[#E91E63]/20 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-white font-graffiti">Live Battle Arena</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">Round {currentRound}</span>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 bg-[#E91E63] rounded-lg hover:bg-[#E91E63]/90 transition-all"
                >
                  {isPlaying ? <Pause className="text-[#1A1A1A]" size={24} /> : <Play className="text-[#1A1A1A]" size={24} />}
                </button>
              </div>
            </div>

            {/* Hype Meter */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">Crowd Hype Level</span>
                <span className="text-[#E91E63] font-bold">{hypeLevel}%</span>
              </div>
              <div className="w-full bg-[#1A1A1A] rounded-full h-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#E91E63] to-[#FF7A00] transition-all duration-500"
                  style={{ width: `${hypeLevel}%` }}
                />
              </div>
            </div>

            {/* Battle Display with Real Voting */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#E91E63]/20">
                <h3 className="text-xl text-white mb-4">DJ Shadow</h3>
                <div className="text-3xl text-[#E91E63] font-bold mb-2">
                  {votes.filter(v => v.vote_type === 'dj-shadow').length}
                </div>
                <div className="text-gray-400 mb-4">Votes</div>
                <button
                  onClick={() => handleVote('dj-shadow')}
                  disabled={!!userVote || isLoading}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    userVote === 'dj-shadow' 
                      ? 'bg-[#E91E63] text-white' 
                      : userVote
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-[#E91E63]/20 text-[#E91E63] hover:bg-[#E91E63]/30'
                  }`}
                >
                  {userVote === 'dj-shadow' ? 'Voted ✓' : userVote ? 'Already Voted' : 'Vote for DJ Shadow'}
                </button>
              </div>
              <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#00D4FF]/20">
                <h3 className="text-xl text-white mb-4">DJ Phoenix</h3>
                <div className="text-3xl text-[#00D4FF] font-bold mb-2">
                  {votes.filter(v => v.vote_type === 'dj-phoenix').length}
                </div>
                <div className="text-gray-400 mb-4">Votes</div>
                <button
                  onClick={() => handleVote('dj-phoenix')}
                  disabled={!!userVote || isLoading}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    userVote === 'dj-phoenix' 
                      ? 'bg-[#00D4FF] text-white' 
                      : userVote
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-[#00D4FF]/20 text-[#00D4FF] hover:bg-[#00D4FF]/30'
                  }`}
                >
                  {userVote === 'dj-phoenix' ? 'Voted ✓' : userVote ? 'Already Voted' : 'Vote for DJ Phoenix'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-white text-center mb-12">
            <span className="font-futuristic">Platform</span> <span className="font-graffiti text-[#E91E63]">Features</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-[#222222] rounded-lg p-6 border border-[#E91E63]/20 hover:border-[#E91E63] transition-all">
                  <div className="w-12 h-12 bg-[#E91E63]/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-[#E91E63]" size={24} />
                  </div>
                  <h3 className="text-xl text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl text-white text-center mb-12">
            <span className="font-futuristic">Perfect For</span> <span className="font-graffiti text-[#E91E63]">Any Battle</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E91E63]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic2 className="text-[#E91E63]" size={32} />
              </div>
              <h3 className="text-xl text-white mb-2">DJ Battles</h3>
              <p className="text-gray-400">Head-to-head DJ competitions with crowd voting</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E91E63]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[#E91E63]" size={32} />
              </div>
              <h3 className="text-xl text-white mb-2">Rap Battles</h3>
              <p className="text-gray-400">MC competitions with real-time audience feedback</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E91E63]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="text-[#E91E63]" size={32} />
              </div>
              <h3 className="text-xl text-white mb-2">Dance Offs</h3>
              <p className="text-gray-400">Dance competitions with energy tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl text-white mb-6">
            <span className="font-futuristic">Ready to Host</span><br />
            <span className="font-graffiti text-[#E91E63]">The Ultimate Battle?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Get Sound Clash OS for your next event and watch the crowd go wild
          </p>
          <button
            onClick={() => onNavigate('start-project')}
            className="px-8 py-4 bg-[#E91E63] text-[#1A1A1A] rounded-lg hover:bg-[#E91E63]/90 transition-all transform hover:scale-105"
          >
            Get Sound Clash OS
          </button>
        </div>
      </section>
    </div>
  );
}
