import { useState } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Zap, Crown, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Studio', id: 'studio', icon: Sparkles },
    { name: 'EVENT OS', id: 'event-os', icon: Zap, isPrimary: true },
    { name: 'LOA AI', id: 'loa-ai', icon: Crown },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Case Studies', id: 'case-studies' },
    { name: 'Deploy Now', id: 'deploy-now', isCTA: true },
  ];

  const eventOSApps = [
    { name: 'LOA Event OS', path: '/loa/index.html', description: 'Live Event Operating System' },
    { name: 'Pitch Battle', path: '/pitch/index.html', description: 'Corporate Pitch Competition' },
    { name: 'Culture Clash', path: '/culture/index.html', description: 'Cultural Event Platform' },
    { name: 'Sound Clash', path: '/clash/index.html', description: 'DJ Battle System' },
    { name: 'Wedding OS', path: '/romeo/index.html', description: 'Wedding Management' },
    { name: 'Fashion OS', path: '/fashion/index.html', description: 'Fashion Event Platform' },
    { name: 'Sports OS', path: '/wagers/index.html', description: 'Sports Betting Platform' },
    { name: 'Love Match', path: '/love/index.html', description: 'Dating Event System' },
    { name: 'Trinity', path: '/trinity/index.html', description: 'Multi-Event Hub' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center group transition-all hover:scale-105"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-cyan-500 rounded-xl flex items-center justify-center font-black text-2xl text-black mr-3">
              9
            </div>
            <div className="text-left">
              <div className="text-xl font-black text-white font-futuristic">9LMNTS</div>
              <div className="text-xs text-cyber-green font-medium">TRINITY V2</div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`nav-item flex items-center space-x-2 ${
                    currentPage === link.id ? 'active' : ''
                  } ${link.isPrimary ? 'text-cyber-blue font-bold' : ''}`}
                >
                  {Icon && <Icon size={16} />}
                  <span>{link.name}</span>
                  {link.isPrimary && (
                    <span className="daily-income-badge text-xs">LIVE</span>
                  )}
                </button>
              );
            })}
            
            {/* Event OS Dropdown */}
            <div className="relative">
              <button
                onClick={() => setEventDropdownOpen(!eventDropdownOpen)}
                onMouseEnter={() => setEventDropdownOpen(true)}
                onMouseLeave={() => setEventDropdownOpen(false)}
                className="nav-item flex items-center space-x-2 text-cyber-blue font-bold"
              >
                <Zap size={16} />
                <span>EVENT OS</span>
                <ChevronDown className={`transition-transform ${eventDropdownOpen ? 'rotate-180' : ''}`} size={16} />
                <span className="daily-income-badge text-xs">9 TEMPLATES</span>
              </button>
              
              {eventDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-96 glass border border-cyber-blue rounded-xl shadow-2xl z-50 fade-in"
                  onMouseEnter={() => setEventDropdownOpen(true)}
                  onMouseLeave={() => setEventDropdownOpen(false)}
                >
                  <div className="p-4">
                    <h3 className="text-cyber-blue font-bold mb-3 font-futuristic">Event Operating Systems</h3>
                    <div className="space-y-2">
                      {eventOSApps.map((app, index) => (
                        <a
                          key={index}
                          href={app.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 glass border border-glass-border rounded-lg hover:border-cyber-green transition-all hover:scale-[1.02] group cursor-pointer"
                        >
                          <div className="flex-1">
                            <div className="text-white font-medium group-hover:text-cyber-green transition-colors flex items-center">
                              <div className="w-2 h-2 bg-cyber-green rounded-full mr-2 pulse"></div>
                              {app.name}
                            </div>
                            <div className="text-gray-400 text-sm ml-4">
                              {app.description}
                            </div>
                          </div>
                          <ExternalLink className="text-gray-400 group-hover:text-cyber-green transition-colors" size={16} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={() => onNavigate('start-project')}
              className="btn-glow bg-vip-gold text-black font-bold"
            >
              <Crown size={16} className="mr-2" />
              Start Project
            </button>
            <button
              onClick={() => onNavigate('master-admin')}
              className="px-4 py-2 glass border border-cyber-purple text-cyber-purple rounded-lg hover:bg-cyber-purple hover:text-black transition-all text-sm font-medium"
            >
              Admin
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-cyber-blue transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-glass-border">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full text-left px-4 py-3 glass border border-glass-border rounded-lg transition-all ${
                    currentPage === link.id
                      ? 'text-cyber-blue border-cyber-blue'
                      : 'text-white hover:text-cyber-blue hover:border-cyber-blue'
                  }`}
                >
                  {Icon && <Icon size={18} />}
                  <span className="font-medium">{link.name}</span>
                  {link.isPrimary && (
                    <span className="daily-income-badge text-xs ml-auto">LIVE</span>
                  )}
                </button>
              );
            })}
            
            {/* Mobile Event OS Section */}
            <div className="pt-4 border-t border-glass-border">
              <div className="text-cyber-blue font-bold mb-3 font-futuristic">Event Operating Systems</div>
              <div className="space-y-2">
                {eventOSApps.map((app, index) => (
                  <a
                    key={index}
                    href={app.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 glass border border-glass-border rounded-lg hover:border-cyber-green transition-all hover:scale-[1.02] group cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex-1">
                      <div className="text-white font-medium group-hover:text-cyber-green transition-colors flex items-center">
                        <div className="w-2 h-2 bg-cyber-green rounded-full mr-2 pulse"></div>
                        {app.name}
                      </div>
                      <div className="text-gray-400 text-sm ml-4">
                        {app.description}
                      </div>
                    </div>
                    <ExternalLink className="text-gray-400 group-hover:text-cyber-green transition-colors" size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
