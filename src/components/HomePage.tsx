import { ArrowRight, Sparkles, Zap, Layers, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import soundClashImg from 'figma:asset/f72325e312a920e71b791080254e4f61fa38da20.png';
import weddingImg from 'figma:asset/a083d348fd3f6c8062c56e44479af8ebd9c8d90b.png';
import corporateImg from 'figma:asset/818fc707455adb1fc5f7e10ecda370f2026a8c37.png';

interface HomePageProps {
  onNavigate: (page: string, plan?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredWorks = [
    {
      title: 'Sound Clash OS',
      category: 'Nightlife & Entertainment',
      image: soundClashImg,
      link: '/clash/index.html',
      features: ['Live Voting', 'Power Tips', 'Battle Mode', 'Real-time Chat'],
      external: true
    },
    {
      title: 'The Union: Wedding OS',
      category: 'Lifestyle & Events',
      image: weddingImg,
      link: '/romeo/index.html',
      features: ['Guest Management', 'Live Streaming', 'Digital Invitations', 'Photo Gallery'],
      external: true
    },
    {
      title: 'Corporate Clash',
      category: 'Business & Tech',
      image: corporateImg,
      link: '/pitch/index.html',
      features: ['Pitch Battles', 'Investor Voting', 'Live Analytics', 'Networking Hub'],
      external: true
    },
  ];

  const pricingTiers = [
    {
      name: 'Flow Element',
      price: '$1,500',
      planValue: 'basic',
      features: ['Basic Web Design', '3 Page Website', 'Mobile Responsive', '1 Month Support'],
    },
    {
      name: 'Beat Element',
      price: '$3,000',
      planValue: 'standard',
      features: ['Advanced Design', 'Up to 10 Pages', 'Custom Animations', '3 Months Support', 'SEO Optimization'],
      highlighted: false,
    },
    {
      name: 'Cypher Element',
      price: '$5,000',
      planValue: 'premium',
      features: ['Premium Design', 'Unlimited Pages', 'Full Stack Development', '6 Months Support', 'AI Integration', 'Custom CMS'],
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-[#222222] border border-[#FF7A00]/30 rounded-full text-[#FF7A00] text-sm">
              Welcome to the Future
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl text-white mb-6 tracking-tight">
            <span className="font-futuristic">9LMNTS</span> <span className="font-graffiti text-[#FF7A00]">Studio</span>: Where<br />
            Digital Design Enters the<br />
            <span className="text-[#FF7A00] font-futuristic">CYBER CYPHER</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Blending Hip-Hop culture with cutting-edge AI technology to create 
            unforgettable digital experiences
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('start-project')}
              className="px-8 py-4 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-all transform hover:scale-105 flex items-center justify-center gap-2 group"
            >
              Start Your Project
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="px-8 py-4 bg-transparent border-2 border-[#FF7A00] text-[#FF7A00] rounded-lg hover:bg-[#FF7A00]/10 transition-all"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>

      {/* 9 Elements Concept */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl text-white mb-4">
              The <span className="font-futuristic">9LMNTS</span> <span className="font-graffiti text-[#FF7A00]">Concept</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Just like the 9 elements of Hip-Hop culture, we bring together 
              diverse creative pillars to craft your digital presence
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4 mb-12">
            {[
              { num: 1, label: 'MCing' },
              { num: 2, label: 'DJing' },
              { num: 3, label: 'Graffiti' },
              { num: 4, label: 'Breaking' },
              { num: 5, label: 'Beatboxing' },
              { num: 6, label: 'Knowledge' },
              { num: 7, label: 'Fashion' },
              { num: 8, label: 'Entrepreneurship' },
              { num: 9, label: 'Language' },
            ].map((element) => (
              <div
                key={element.num}
                className="bg-[#222222] border-2 border-[#FF7A00]/30 rounded-lg flex flex-col items-center justify-center group hover:border-[#FF7A00] transition-all hover:scale-105 cursor-pointer p-4"
              >
                <span className="text-3xl sm:text-4xl text-[#FF7A00] group-hover:scale-110 transition-transform mb-2">
                  {element.num}
                </span>
                <span className="text-xs sm:text-sm text-white text-center group-hover:text-[#FF7A00] transition-colors">
                  {element.label}
                </span>
              </div>
            ))}
            <button
              onClick={() => onNavigate('services')}
              className="bg-[#FF7A00] border-2 border-[#FF7A00] rounded-lg flex flex-col items-center justify-center group hover:bg-[#FF7A00]/90 transition-all hover:scale-105 cursor-pointer p-4"
            >
              <ArrowRight className="text-[#1A1A1A] group-hover:scale-110 transition-transform mb-2" size={32} />
              <span className="text-xs sm:text-sm text-[#1A1A1A] text-center font-semibold">
                Let's Begin
              </span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#222222] p-6 rounded-lg border border-[#FF7A00]/20 hover:border-[#FF7A00]/50 transition-all">
              <Sparkles className="text-[#FF7A00] mb-4" size={32} />
              <h3 className="text-white text-xl mb-2">Creative Flow</h3>
              <p className="text-gray-400">
                Each element represents a unique aspect of digital creation, flowing together seamlessly
              </p>
            </div>
            <div className="bg-[#222222] p-6 rounded-lg border border-[#FF7A00]/20 hover:border-[#FF7A00]/50 transition-all">
              <Zap className="text-[#FF7A00] mb-4" size={32} />
              <h3 className="text-white text-xl mb-2">AI-Powered</h3>
              <p className="text-gray-400">
                Leveraging artificial intelligence to enhance every stage of the design process
              </p>
            </div>
            <div className="bg-[#222222] p-6 rounded-lg border border-[#FF7A00]/20 hover:border-[#FF7A00]/50 transition-all">
              <Layers className="text-[#FF7A00] mb-4" size={32} />
              <h3 className="text-white text-xl mb-2">Layered Excellence</h3>
              <p className="text-gray-400">
                Building complex solutions through thoughtful layering of design elements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl text-white mb-4">
              <span className="font-futuristic">Featured</span> <span className="font-graffiti text-[#FF7A00]">Work</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Explore our latest digital masterpieces
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredWorks.map((work, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => {
                  if (work.external) {
                    window.open(work.link, '_blank');
                  } else {
                    onNavigate('portfolio');
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3] bg-[#222222]">
                  <ImageWithFallback
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <div className="flex items-center justify-between">
                      <ArrowRight className="text-[#FF7A00]" size={24} />
                      {work.external && <ExternalLink className="text-[#FF7A00]" size={20} />}
                    </div>
                  </div>
                </div>
                <h3 className="text-white text-xl mb-1">{work.title}</h3>
                <p className="text-gray-400 mb-3">{work.category}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {work.features.map((feature, idx) => (
                    <span key={idx} className="bg-[#FF7A00]/20 text-[#FF7A00] px-2 py-1 rounded text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('portfolio')}
              className="px-8 py-4 bg-transparent border-2 border-[#FF7A00] text-[#FF7A00] rounded-lg hover:bg-[#FF7A00]/10 transition-all inline-flex items-center gap-2"
            >
              View All Projects
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Services Section - The Graffiti Element */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl text-white mb-4">
              The <span className="font-futuristic">Graffiti</span> <span className="font-graffiti text-[#FF7A00]">Element</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our signature services that transform your vision into digital art
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🎨',
                title: 'Brand Identity',
                description: 'Complete brand systems that capture your essence and stand out in the digital landscape'
              },
              {
                icon: '🚀',
                title: 'Web Experiences',
                description: 'Interactive websites that blend cutting-edge technology with artistic vision'
              },
              {
                icon: '📱',
                title: 'Mobile Applications',
                description: 'Native and progressive apps that deliver seamless user experiences'
              },
              {
                icon: '🎮',
                title: 'Event OS Platforms',
                description: 'Custom operating systems for live events with voting, networking, and gamification'
              },
              {
                icon: '🤖',
                title: 'AI Integration',
                description: 'Intelligent systems that enhance user engagement and automate workflows'
              },
              {
                icon: '📊',
                title: 'Data Visualization',
                description: 'Interactive dashboards and analytics that bring your data to life'
              }
            ].map((service, index) => (
              <div key={index} className="bg-[#222222] p-8 rounded-xl border border-[#FF7A00]/20 hover:border-[#FF7A00]/50 transition-all group">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-white text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 inline-block">
                <span className="px-4 py-2 bg-[#222222] border border-[#FF7A00]/30 rounded-full text-[#FF7A00] text-sm">
                  Founder & Creative Director
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl text-white mb-6">
                Meet the <span className="font-futuristic">Visionary</span> <span className="font-graffiti text-[#FF7A00]">Behind 9LMNTS</span>
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Blending years of design expertise with hip-hop culture and cutting-edge technology, 
                our founder has pioneered a new approach to digital experiences that resonates with 
                the modern audience while honoring cultural roots.
              </p>
              <p className="text-gray-300 text-lg mb-8">
                From underground graffiti art to enterprise-level digital platforms, the journey has been 
                about breaking boundaries and creating spaces where creativity meets technology in perfect harmony.
              </p>
              <button
                onClick={() => onNavigate('about')}
                className="px-8 py-4 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-all inline-flex items-center gap-2 transform hover:scale-105"
              >
                Learn More
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-[#222222] rounded-2xl border border-[#FF7A00]/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-[#FF7A00]/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-4xl">🎨</span>
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">Founder Image</h3>
                  <p className="text-gray-400">Professional photography coming soon</p>
                </div>
              </div>
              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#FF7A00]/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#FF7A00]/5 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-5xl text-white mb-4">
              <span className="font-futuristic">Choose Your</span> <span className="font-graffiti text-[#FF7A00]">Element</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Flexible pricing for every stage of your journey
            </p>
          </div>

          <div>
            <button
              onClick={() => onNavigate('pricing')}
              className="px-8 py-4 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-all inline-flex items-center gap-2 transform hover:scale-105"
            >
              View All Plans
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}