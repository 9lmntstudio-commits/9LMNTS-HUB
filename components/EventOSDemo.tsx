import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ShoppingBag, 
  Zap, 
  ArrowRight, 
  X, 
  Shield, 
  Check, 
  Music, 
  Crown,
  Calendar,
  MapPin,
  CreditCard
} from 'lucide-react';
import { SOUND_CLASH_DATA, CORPORATE_CLASH_DATA, RECEPTION_OS_DATA, EventOSData } from './EventOSData';

interface EventOSDemoProps {
  onNavigate: (page: string) => void;
}

const THEMES: Record<string, EventOSData> = {
  nightlife: SOUND_CLASH_DATA,
  corporate: CORPORATE_CLASH_DATA,
  wedding: RECEPTION_OS_DATA
};

export function EventOSDemo({ onNavigate }: EventOSDemoProps) {
  const [activeThemeId, setActiveThemeId] = useState<string>('nightlife');
  const [showShop, setShowShop] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  
  const activeData = THEMES[activeThemeId];
  const { theme, labels, storeItems, contestants } = activeData;

  const handleVote = (id: string) => {
    // This is where you connect to Supabase later
    setNotification(`Power Vote Recorded for ${id}!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePurchase = (price: number) => {
    // Instant PayPal Redirect for Cashflow
    window.open(`https://www.paypal.com/paypalme/9LMNTSOS/${price}CAD`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter">
      
      {/* 1. BRANDED FLYER HERO (Split Layout) */}
      <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden border-b border-white/10">
        
        {/* Left Side: The Visual Flyer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative flex-[1.5] min-h-[50vh] lg:min-h-screen flex items-end p-8 lg:p-16 overflow-hidden"
        >
          {/* Background Image with Dynamic Theme Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90" />
          <div 
            className="absolute inset-0 opacity-30" 
            style={{ background: `radial-gradient(circle at 20% 50%, ${theme.primary} 0%, transparent 50%)` }} 
          />

          <div className="relative z-10 max-w-2xl">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black tracking-widest uppercase mb-6"
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.primary }} />
              Active Event OS Deployment
            </motion.div>
            
            <h1 className="font-orbitron text-6xl lg:text-[120px] leading-[0.85] mb-6 italic uppercase tracking-tighter">
              {labels.title}<br/>
              <span style={{ color: theme.primary }}>{labels.subtitle}</span>
            </h1>

            <div className="flex flex-wrap gap-6 text-sm lg:text-lg opacity-80 font-medium">
              <span className="flex items-center gap-2"><Calendar size={18} style={{color: theme.primary}}/> {labels.date}</span>
              <span className="flex items-center gap-2"><MapPin size={18} style={{color: theme.primary}}/> {labels.venue}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: The Ticket & VIP Engine */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex-1 bg-[#121212] p-8 lg:p-16 flex flex-col justify-center border-l border-white/10"
        >
          <div className="mb-10">
            <h2 className="font-orbitron text-2xl mb-2 italic">SECURE ACCESS</h2>
            <p className="text-white/40 text-sm">Funds processed instantly to event licensee balance.</p>
          </div>

          <div className="space-y-4">
            {storeItems.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 5 }}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all cursor-pointer overflow-hidden relative"
                onClick={() => handlePurchase(item.price)}
              >
                {item.popular && (
                  <div className="absolute top-0 right-0 bg-white text-black text-[8px] font-black px-3 py-1 uppercase tracking-tighter">
                    Limited Supply
                  </div>
                )}
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-white transition-colors">{item.name}</h3>
                    <p className="text-xs text-white/40">{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black" style={{ color: item.popular ? theme.primary : 'white' }}>${item.price}</div>
                    <div className="text-[9px] uppercase tracking-widest opacity-30 mt-1">Select →</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Theme Switcher (For Demo Mode Only) */}
          <div className="mt-12 pt-12 border-t border-white/5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 text-center">Switch Deployment Environment</p>
            <div className="flex justify-center gap-2">
              {Object.keys(THEMES).map(id => (
                <button 
                  key={id}
                  onClick={() => setActiveThemeId(id)}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase transition-all ${activeThemeId === id ? 'bg-white text-black' : 'bg-white/5 text-white/40'}`}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. THE LIVE EVENT LAYER (Only visible if scrolled or via toggle) */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="font-orbitron text-4xl italic uppercase mb-4">LIVE <span style={{ color: theme.primary }}>POWER VOTING</span></h2>
            <p className="text-white/50">Support your favorite contender. Every vote contributes to the live leaderboard and increases their prize pool share.</p>
          </div>
          <button 
            onClick={() => onNavigate('admin')}
            className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase py-3 px-6 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all"
          >
            Launch Licensee Admin <ArrowRight size={14}/>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contestants.map((person, idx) => (
            <motion.div 
              key={idx}
              className="group relative rounded-3xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform overflow-hidden">
                   {person.image ? <img src={person.image} className="w-full h-full object-cover"/> : person.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-xl leading-tight">{person.name}</h3>
                  <p className="text-xs opacity-40 uppercase tracking-widest">{person.role || 'Contender'}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs font-black uppercase tracking-tighter">
                  <span>Crowd Support</span>
                  <span style={{ color: theme.primary }}>{person.votes} Votes</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    className="h-full"
                    style={{ backgroundColor: theme.primary }}
                  />
                </div>
              </div>

              <button 
                onClick={() => handleVote(person.name)}
                className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                style={{ backgroundColor: theme.primary, color: 'black' }}
              >
                <Zap size={16} fill="black"/> Cast Power Vote
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-50 px-6 py-3 rounded-full bg-[#1A1A1A] border text-white shadow-2xl flex items-center gap-3"
            style={{ borderColor: theme.primary, boxShadow: `0 0 30px ${theme.primary}4D` }}
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-black" style={{ backgroundColor: theme.primary }}>
              <Check size={12} strokeWidth={4} />
            </div>
            <span className="font-medium text-sm">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
