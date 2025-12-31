import { useState } from 'react';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Event OS', id: 'event-os' },
    { name: 'Payments', id: 'payments' },
    { name: 'Emergency NYE', id: 'emergency-nye' },
    { name: 'About', id: 'about' },
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-[#FF7A00]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center group"
          >
         <img src="/logo-clean.png" alt="9LMNTS Studio" className="h-12 w-auto" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`transition-colors ${
                  currentPage === link.id
                    ? 'text-[#FF7A00]'
                    : 'text-white hover:text-[#FF7A00]'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            {/* Event OS Dropdown */}
            <div className="relative">
              <button
                onClick={() => setEventDropdownOpen(!eventDropdownOpen)}
                onMouseEnter={() => setEventDropdownOpen(true)}
                onMouseLeave={() => setEventDropdownOpen(false)}
                className="flex items-center text-white hover:text-[#FF7A00] transition-colors px-3 py-2 rounded-lg hover:bg-[#222222]"
              >
                Event OS
                <ChevronDown className={`ml-1 transition-transform ${eventDropdownOpen ? 'rotate-180' : ''}`} size={16} />
              </button>
              
              {eventDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-96 bg-[#222222] border border-[#FF7A00]/20 rounded-lg shadow-xl z-50"
                  onMouseEnter={() => setEventDropdownOpen(true)}
                  onMouseLeave={() => setEventDropdownOpen(false)}
                >
                  <div className="p-4">
                    <h3 className="text-[#FF7A00] font-semibold mb-3">Event Operating Systems</h3>
                    <div className="space-y-1">
                      {eventOSApps.map((app, index) => (
                        <a
                          key={index}
                          href={app.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1A1A1A] transition-all hover:scale-[1.02] group cursor-pointer"
                        >
                          <div className="flex-1">
                            <div className="text-white font-medium group-hover:text-[#FF7A00] transition-colors flex items-center">
                              <span className="w-2 h-2 bg-[#FF7A00] rounded-full mr-2"></span>
                              {app.name}
                            </div>
                            <div className="text-gray-400 text-sm ml-4">
                              {app.description}
                            </div>
                          </div>
                          <ExternalLink className="text-gray-400 group-hover:text-[#FF7A00] transition-colors" size={16} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={() => onNavigate('start-project')}
              className="px-6 py-2 bg-[#FF7A00] text-[#1A1A1A] rounded hover:bg-[#FF7A00]/90 transition-colors"
            >
              Start Project
            </button>
            <button
              onClick={() => onNavigate('master-admin')}
              className="px-4 py-2 bg-transparent border border-[#FF7A00]/30 text-[#FF7A00] rounded hover:bg-[#FF7A00]/10 transition-colors text-sm"
            >
              Admin
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A] border-t border-[#FF7A00]/20">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                  currentPage === link.id
                    ? 'text-[#FF7A00] bg-[#222222]'
                    : 'text-white hover:bg-[#222222]'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            {/* Mobile Event OS Section */}
            <div className="pt-4 border-t border-[#FF7A00]/20">
              <div className="text-[#FF7A00] font-semibold mb-3">Event Operating Systems</div>
              <div className="space-y-1">
                {eventOSApps.map((app, index) => (
                  <a
                    key={index}
                    href={app.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-3 py-2 rounded text-white hover:bg-[#222222] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{app.name}</div>
                        <div className="text-xs text-gray-400">{app.description}</div>
                      </div>
                      <ExternalLink size={14} className="text-gray-400" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => {
                onNavigate('start-project');
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 px-6 py-2 bg-[#FF7A00] text-[#1A1A1A] rounded hover:bg-[#FF7A00]/90 transition-colors"
            >
              Start Project
            </button>
            <button
              onClick={() => {
                onNavigate('master-admin');
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 px-6 py-2 bg-transparent border border-[#FF7A00]/30 text-[#FF7A00] rounded hover:bg-[#FF7A00]/10 transition-colors"
            >
              Admin Panel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
