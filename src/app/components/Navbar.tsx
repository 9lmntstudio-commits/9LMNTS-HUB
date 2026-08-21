import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import logoImg from "../../imports/Main_website_logo_9lmnts_studio.png";
const logoImage = logoImg;

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user?: { name: string; email: string; role: string } | null;
  onLogout?: () => void;
}

export function Navbar({
  currentPage,
  onNavigate,
  user,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Pricing", id: "pricing" },
    { name: "EventOS Demo", id: "event-os-demo" },
    { name: "About", id: "about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20 font-['Orbitron']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center group flex-shrink-0"
          >
            <img
              src={logoImage}
              alt="9LMNTS Studio"
              className="h-8 md:h-10 w-auto group-hover:opacity-90 transition-opacity"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-[10px] xl:text-xs uppercase tracking-[0.2em] font-bold transition-colors whitespace-nowrap ${
                  currentPage === link.id
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </button>
            ))}

            <div className="h-4 w-px bg-primary/20 mx-2" />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-none hover:bg-primary/20 transition-colors border border-primary/20"
                >
                  <User size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{user.name}</span>
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-card border border-primary/20 rounded-none shadow-xl z-20 overflow-hidden">
                      <div className="p-4 border-b border-border">
                        <p className="text-sm font-bold text-foreground uppercase tracking-tight">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-sans">
                          {user.email}
                        </p>
                        <p className="text-[9px] text-primary mt-2 uppercase font-black tracking-[0.2em] bg-primary/10 w-fit px-2 py-0.5">
                          {user.role}
                        </p>
                      </div>
                      {user.role === "admin" && (
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            onNavigate("admin");
                          }}
                          className="w-full px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-primary/10 transition-colors border-b border-primary/5"
                        >
                          Terminal Dashboard
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          onLogout?.();
                        }}
                        className="w-full px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
                      >
                        <LogOut size={14} />
                        Terminate Session
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onNavigate("login")}
                  className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate("start-project")}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-none text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors border border-primary shadow-[0_0_15px_rgba(255,69,0,0.3)]"
                >
                  Start Project
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground p-2 hover:bg-primary/10 transition-colors border border-primary/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-primary/20 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-8 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-4 rounded-none transition-all uppercase tracking-[0.2em] text-[10px] font-bold border-b border-primary/5 ${
                  currentPage === link.id
                    ? "text-primary bg-primary/10 border-l-4 border-l-primary pl-6"
                    : "text-foreground hover:bg-primary/5 pl-4"
                }`}
              >
                {link.name}
              </button>
            ))}

            <div className="pt-6 px-4">
              {user ? (
                <div className="space-y-4">
                  <div className="p-4 bg-background border border-primary/10 mb-4">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                      Authenticated Entity
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-sans">
                      {user.email}
                    </p>
                  </div>
                  {user.role === "admin" && (
                    <button
                      onClick={() => {
                        onNavigate("admin");
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-center px-4 py-4 bg-background border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-3"
                    >
                      Terminal Dashboard
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onLogout?.();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-4 bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    Terminate Session
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      onNavigate("login");
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-4 border border-primary/20 text-foreground text-[10px] font-bold uppercase tracking-widest"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("start-project");
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-4 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest border border-primary shadow-[0_0_15px_rgba(255,69,0,0.2)]"
                  >
                    Start Project
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}