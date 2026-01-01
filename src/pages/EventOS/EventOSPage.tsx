import { useState } from 'react';
import { Mic2, Users, Trophy, Calendar, Music, Heart, Star, Zap, Gamepad2, Crown, Sparkles, ExternalLink, X, Play, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

interface EventOSPageProps {
  onNavigate: (page: string, plan?: string) => void;
}

export function EventOSPage({ onNavigate }: EventOSPageProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'loa', text: 'Hi! I\'m LOA, your AI event assistant. I can help you customize any Event OS template!' }
  ]);

  const eventOSTemplates = [
    {
      id: 1,
      icon: Mic2,
      title: 'Sound Clash OS',
      category: 'NIGHTLIFE & ENTERTAINMENT',
      description: 'Turn the crowd into the judge. A real-time voting engine for DJ battles, rap battles, and dance-offs.',
      color: '#E91E63',
      cyberColor: 'cyber-pink',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMGJhdHRsZSUyMGRqJTIwY29udGVzdHxlbnwxfDB8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Live "Hype" Meter', 'Song Request Line', 'VIP Bottle Service Upgrades'],
      path: 'sound-clash',
      demoUrl: '/clash/index.html',
      price: 750,
      deploymentTime: '24 hours'
    },
    {
      id: 2,
      icon: Heart,
      title: 'The Union: Wedding OS',
      category: 'LIFESTYLE & EVENTS',
      description: 'Modernize the reception. No more clinking glasses—guests complete challenges to unlock rewards.',
      color: '#FF7A00',
      cyberColor: 'cyber-purple',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmVjZXB0aW9ufGVufDF8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Digital Guestbook', 'Buy the Couple a Round', 'Photo Scavenger Hunt'],
      path: 'wedding-os',
      demoUrl: '/romeo/index.html',
      price: 1250,
      deploymentTime: '24 hours'
    },
    {
      id: 3,
      icon: Trophy,
      title: 'Corporate Clash',
      category: 'BUSINESS & TECH',
      description: 'Gamify the boardroom. Perfect for startup pitch competitions, town halls, and internal hackathons.',
      color: '#00D4FF',
      cyberColor: 'cyber-blue',
      image: 'https://images.unsplash.com/photo-1515378791036-06c8a3ac77ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBtZWV0aW5nfGVufDF8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Real-time Investment Simulation', 'Networking "Who\'s Here" Grid', 'Audience Q&A Upvoting'],
      path: 'corporate-clash',
      demoUrl: '/pitch/index.html',
      price: 2500,
      deploymentTime: '48 hours'
    },
    {
      id: 4,
      icon: Music,
      title: 'Festival Flow',
      category: 'MUSIC & ARTS',
      description: 'Complete festival management system. From ticketing to crowd engagement, all in one platform.',
      color: '#9C27B0',
      cyberColor: 'cyber-purple',
      image: 'https://images.unsplash.com/photo-1459749411171-048521df5e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsfGVufDF8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Interactive Schedule', 'Artist Discovery', 'Social Media Integration'],
      path: 'festival-flow',
      demoUrl: '/culture/index.html',
      price: 2000,
      deploymentTime: '72 hours'
    },
    {
      id: 5,
      icon: Gamepad2,
      title: 'Game Night Pro',
      category: 'GAMING & ESPORTS',
      description: 'Tournament management platform for gaming events, esports competitions, and game nights.',
      color: '#4CAF50',
      cyberColor: 'cyber-green',
      image: 'https://images.unsplash.com/photo-1542751371-fc1841d1e5eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2Ftc2luZyUyMGZlc3RpdmljZXMlMjBtZWV0aW5nfGVufDF8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Live Score Tracking', 'Team Registration', 'Prize Distribution'],
      path: 'game-night-pro',
      demoUrl: '/wagers/index.html',
      price: 1500,
      deploymentTime: '48 hours'
    },
    {
      id: 6,
      icon: Calendar,
      title: 'Conference Connect',
      category: 'PROFESSIONAL EVENTS',
      description: 'Professional conference management with networking, scheduling, and engagement tools.',
      color: '#FF9800',
      cyberColor: 'vip-gold',
      image: 'https://images.unsplash.com/photo-1540575161846-63b2affb1947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwY29uZmVyZW5jZSUyMG1ldmljZXMlMjBtZWV0aW5nfGVufDF8fHx8MTc2NDcxODYyMHww&ixlib=rb-4.1.0&q=80&w=1080',
      features: ['Session Scheduling', 'Networking Hub', 'Live Polling'],
      path: 'conference-connect',
      demoUrl: '/trinity/index.html',
      price: 3000,
      deploymentTime: '72 hours'
    }
  ];

  const openPreviewModal = (template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  const sendMessage = (message) => {
    const newMessage = { sender: 'user', text: message };
    setChatMessages([...chatMessages, newMessage]);
    
    // Simulate LOA response
    setTimeout(() => {
      const loaResponse = { 
        sender: 'loa', 
        text: `Great question about ${selectedTemplate.title}! This template includes ${selectedTemplate.features.join(', ')}. Would you like me to customize it for your specific event type?` 
      };
      setChatMessages(prev => [...prev, loaResponse]);
    }, 1000);
  };

  const startProject = () => {
    onNavigate('start-project', selectedTemplate.path);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-cyan-500/10 to-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <Zap className="text-cyber-blue mr-3" size={48} />
              <h1 className="text-5xl font-black text-white font-futuristic">
                Choose Your <span className="text-cyber-blue">Event OS</span> Template
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              AI-powered event platforms ready in 24h. Each template is fully customizable with LOA AI assistance.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="glass px-6 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Star className="text-vip-gold" size={20} />
                  <span className="text-white font-medium">Premium Templates</span>
                </div>
              </div>
              <div className="glass px-6 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Crown className="text-cyber-green" size={20} />
                  <span className="text-white font-medium">24h Deployment</span>
                </div>
              </div>
              <div className="glass px-6 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Sparkles className="text-cyber-purple" size={20} />
                  <span className="text-white font-medium">AI Customization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventOSTemplates.map((template, index) => {
            const Icon = template.icon;
            return (
              <div 
                key={template.id}
                className={`glass border-${template.cyberColor} hover:scale-105 transition-all duration-300 cursor-pointer fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openPreviewModal(template)}
              >
                {/* Template Header */}
                <div className="relative">
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-${template.cyberColor} text-black text-xs font-bold`}>
                    ${template.category}
                  </div>
                  <div className="h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={template.image} 
                      alt={template.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                </div>

                {/* Template Content */}
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Icon className={`text-${template.cyberColor} mr-3`} size={24} />
                    <h3 className={`text-xl font-bold text-${template.cyberColor}`}>{template.title}</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-4 line-clamp-2">{template.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {template.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-400">
                        <div className="w-2 h-2 bg-cyber-green rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">${template.price}</div>
                      <div className="text-sm text-gray-400">{template.deploymentTime}</div>
                    </div>
                    <button 
                      className={`btn-glow bg-${template.cyberColor} text-black text-sm px-4 py-2`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openPreviewModal(template);
                      }}
                    >
                      <Play size={16} className="mr-2" />
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview Modal */}
      {isModalOpen && selectedTemplate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white font-futuristic">
                {selectedTemplate.title} - Live Preview
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row h-[80vh]">
              {/* Left Side - Live Preview (70%) */}
              <div className="lg:w-[70%] p-6 border-r border-glass-border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-cyber-blue">Interactive Demo</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 glass border border-glass-border rounded text-sm text-white hover:bg-cyber-blue transition-colors">
                      Desktop
                    </button>
                    <button className="px-3 py-1 glass border border-glass-border rounded text-sm text-white hover:bg-cyber-blue transition-colors">
                      Mobile
                    </button>
                  </div>
                </div>
                <div className="h-full bg-gray-800 rounded-lg overflow-hidden">
                  <iframe 
                    src={selectedTemplate.demoUrl}
                    className="w-full h-full"
                    title={`${selectedTemplate.title} Preview`}
                    frameBorder="0"
                  />
                </div>
              </div>

              {/* Right Side - LOA AI Chat (30%) */}
              <div className="lg:w-[30%] p-6 flex flex-col">
                <div className="flex-1 glass border border-cyber-green rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-4">
                    <Crown className="text-cyber-green mr-2" size={20} />
                    <h3 className="text-lg font-bold text-cyber-green">LOA AI Assistant</h3>
                  </div>
                  
                  <div className="h-64 overflow-y-auto mb-4 space-y-3">
                    {chatMessages.map((message, index) => (
                      <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-cyber-blue text-black' 
                            : 'bg-glass-bg text-white'
                        }`}>
                          {message.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 glass border border-glass-border rounded text-sm text-white hover:bg-cyber-green transition-colors text-left">
                      How much does this cost?
                    </button>
                    <button className="w-full px-3 py-2 glass border border-glass-border rounded text-sm text-white hover:bg-cyber-green transition-colors text-left">
                      Can I customize the features?
                    </button>
                    <button className="w-full px-3 py-2 glass border border-glass-border rounded text-sm text-white hover:bg-cyber-green transition-colors text-left">
                      How fast can I deploy?
                    </button>
                  </div>
                </div>

                <button 
                  onClick={startProject}
                  className="btn-glow bg-vip-gold text-black font-bold w-full"
                >
                  <Crown size={16} className="mr-2" />
                  Start This Project - ${selectedTemplate.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
