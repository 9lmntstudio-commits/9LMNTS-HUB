import { Mic2, Users, Trophy, Calendar, Music, Heart, Star, Zap, Gamepad2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventOSSelectionPageProps {
  onNavigate: (page: string, plan?: string) => void;
}

export function EventOSSelectionPage({ onNavigate }: EventOSSelectionPageProps) {
  const eventOSPlatforms = [
    {
      icon: Mic2,
      title: 'Sound Clash OS',
      category: 'NIGHTLIFE & ENTERTAINMENT',
      description: 'Turn the crowd into the judge. A real-time voting engine for DJ battles, rap battles, and dance-offs.',
      color: '#E91E63',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMGJhdHRsZSUyMGRqJTIwY29udGVzdHxlbnwxfDB8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Live "Hype" Meter', 'Song Request Line', 'VIP Bottle Service Upgrades'],
      path: 'sound-clash'
    },
    {
      icon: Heart,
      title: 'The Union: Wedding OS',
      category: 'LIFESTYLE & EVENTS',
      description: 'Modernize the reception. No more clinking glasses—guests complete challenges to unlock rewards.',
      color: '#FF7A00',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9ufGVufDF8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Digital Guestbook', 'Buy the Couple a Round', 'Photo Scavenger Hunt'],
      path: 'wedding-os'
    },
    {
      icon: Trophy,
      title: 'Corporate Clash',
      category: 'BUSINESS & TECH',
      description: 'Gamify the boardroom. Perfect for startup pitch competitions, town halls, and internal hackathons.',
      color: '#00D4FF',
      image: 'https://images.unsplash.com/photo-1515378791036-06c8a3ac77ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBtZWV0aW5nfGVufDF8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Real-time Investment Simulation', 'Networking "Who\'s Here" Grid', 'Audience Q&A Upvoting'],
      path: 'corporate-clash'
    },
    {
      icon: Music,
      title: 'Festival Flow',
      category: 'MUSIC & ARTS',
      description: 'Complete festival management system. From ticketing to crowd engagement, all in one platform.',
      color: '#9C27B0',
      image: 'https://images.unsplash.com/photo-1459749411171-048521df5e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsfGVufDF8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Interactive Schedule', 'Artist Discovery', 'Social Media Integration'],
      path: 'festival-flow'
    },
    {
      icon: Gamepad2,
      title: 'Game Night Pro',
      category: 'GAMING & ENTERTAINMENT',
      description: 'Transform any space into an interactive gaming arena with leaderboards and live scoring.',
      color: '#4CAF50',
      image: 'https://images.unsplash.com/photo-1511512548044-fd29d0cd5f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb25zb2xlfGVufDF8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Multiplayer Support', 'Tournament Brackets', 'Live Streaming'],
      path: 'game-night-pro'
    },
    {
      icon: Calendar,
      title: 'Conference Connect',
      category: 'PROFESSIONAL EVENTS',
      description: 'Elevate your conference experience with networking, sessions, and engagement tools.',
      color: '#2196F3',
      image: 'https://images.unsplash.com/photo-1540575137065-6a9a8cdcd387?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwcm9vbXxlbnwxfDB8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Session Tracking', 'Business Card Exchange', 'Live Polling'],
      path: 'conference-connect'
    },
    {
      icon: Star,
      title: 'Red Carpet Experience',
      category: 'ENTERTAINMENT & MEDIA',
      description: 'Create Hollywood-style experiences for premieres, galas, and celebrity events.',
      color: '#FF9800',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6b6cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBjYXJwZXQlMjBldmVudHxlbnwxfDB8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Photo Booth Integration', 'Fan Voting', 'Social Media Wall'],
      path: 'red-carpet'
    },
    {
      icon: Zap,
      title: 'Sports Arena OS',
      category: 'SPORTS & FITNESS',
      description: 'Revolutionize live sports with real-time stats, fan engagement, and interactive experiences.',
      color: '#F44336',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtfGVufDF8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Live Score Updates', 'Fan Cam Integration', 'In-Arena Challenges'],
      path: 'sports-arena'
    },
    {
      icon: Users,
      title: 'Community Hub',
      category: 'SOCIAL & NETWORKING',
      description: 'Build stronger communities with event management, member engagement, and collaboration tools.',
      color: '#607D8B',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklyMBldmVudHxlbnwxfDB8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Member Directory', 'Event Calendar', 'Discussion Forums'],
      path: 'community-hub'
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="px-4 py-2 bg-[#222222] border border-[#FF7A00]/30 rounded-full text-[#FF7A00] text-sm">
              Event Operating Systems
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            <span className="font-futuristic">Choose Your</span><br />
            <span className="font-graffiti text-[#FF7A00">Event Experience</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Each OS is engineered for specific event types, 
            delivering unforgettable interactive experiences
          </p>
        </div>
      </section>

      {/* Event OS Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventOSPlatforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <div
                  key={index}
                  onClick={() => {
                    // Navigate to individual Event OS pages
                    const pageMap: { [key: string]: string } = {
                      'sound-clash': '/sound-clash-os',
                      'wedding-os': '/wedding-os',
                      'corporate-clash': '/corporate-clash-os',
                      'festival-flow': '/festival-flow',
                      'game-night-pro': '/game-night-pro',
                      'conference-connect': '/conference-connect',
                      'red-carpet': '/red-carpet',
                      'sports-arena': '/portfolio', // Temporarily link to portfolio
                      'community-hub': '/portfolio'  // Temporarily link to portfolio
                    };
                    
                    const url = pageMap[platform.path];
                    if (url && url !== '/portfolio') {
                      window.open(url, '_blank');
                    } else {
                      // For platforms not yet created, navigate to portfolio
                      onNavigate('portfolio');
                    }
                  }}
                  className="group bg-[#222222] rounded-lg border border-[#FF7A00]/20 hover:border-[#FF7A00] transition-all hover:transform hover:scale-105 cursor-pointer overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={platform.image}
                      alt={platform.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-[#222222]/50 to-transparent"></div>
                    
                    {/* Icon Overlay */}
                    <div className="absolute top-4 right-4 p-3 bg-[#FF7A00] rounded-lg group-hover:scale-110 transition-transform">
                      <Icon className="text-[#1A1A1A]" size={24} />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs text-[#FF7A00] font-semibold">
                        {platform.category}
                      </span>
                    </div>
                    <h3 className="text-white text-xl mb-3 group-hover:text-[#FF7A00] transition-colors">
                      {platform.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {platform.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {platform.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs text-gray-500 bg-[#1A1A1A] px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sound Clash OS Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl text-white mb-6">
                <span className="font-graffiti text-[#E91E63]">Sound Clash OS:</span><br />
                <span className="font-futuristic">The Ultimate Battle Platform</span>
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Transform any venue into an interactive battleground where the crowd decides the winner. 
                Real-time voting, live hype meters, and seamless integration with existing sound systems.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Live Real-Time Voting System',
                  'Dynamic "Hype" Energy Meter',
                  'Song Request & Dedication Platform',
                  'VIP Bottle Service Integration',
                  'Social Media Sharing Tools',
                ].map((item, index) => (
                  <li key={index} className="text-gray-400 flex items-start">
                    <span className="text-[#E91E63] mr-3 text-xl">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.open('/event-os/sound-clash', '_blank')}
                className="px-8 py-4 bg-[#E91E63] text-[#1A1A1A] rounded-lg hover:bg-[#E91E63]/90 transition-all"
              >
                Explore Sound Clash OS
              </button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#E91E63]/30">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMGJhdHRsZSUyMGRqJTIwY29udGVzdHxlbnwxfDB8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Sound Clash OS Showcase"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E91E63]/20 rounded-lg blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#E91E63]/20 rounded-lg blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl text-white mb-4">
              <span className="font-futuristic">Our</span> <span className="font-graffiti text-[#FF7A00]">Process</span>
            </h2>
            <p className="text-gray-400 text-lg">
              From consultation to launch, we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Understanding your event type and needs' },
              { step: '02', title: 'Customization', desc: 'Tailoring the OS to your brand and venue' },
              { step: '03', title: 'Integration', desc: 'Seamless setup with your existing systems' },
              { step: '04', title: 'Launch', desc: 'Go live with training and support' },
            ].map((phase, index) => (
              <div key={index} className="relative">
                <div className="text-6xl text-[#FF7A00]/20 mb-4">{phase.step}</div>
                <h3 className="text-white text-xl mb-2">{phase.title}</h3>
                <p className="text-gray-400">{phase.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-[#FF7A00]/30"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl text-white mb-6">
            <span className="font-futuristic">Ready to Transform</span><br />
            <span className="font-graffiti text-[#FF7A00]">Your Event?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Let's create an unforgettable experience for your guests
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('start-project')}
              className="px-8 py-4 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-all transform hover:scale-105"
            >
              Start Your Project
            </button>
            <button
              onClick={() => onNavigate('portfolio')}
              className="px-8 py-4 bg-transparent border-2 border-[#FF7A00] text-[#FF7A00] rounded-lg hover:bg-[#FF7A00]/10 transition-all"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
