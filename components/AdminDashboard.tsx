import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Settings, Search, Bell, Wallet, Layers, 
  PieChart, ArrowUpRight, ArrowDownRight, MoreHorizontal, ChevronRight,
  CreditCard, RefreshCw, Plus, Zap, Crown, Ticket
} from 'lucide-react';
import { 
  AreaChart, Area, ResponsiveContainer, PieChart as RePieChart, 
  Pie, Cell, Tooltip 
} from 'recharts';

// Update stats to reflect Event OS Sales
const eventStats = [
  { title: 'Total Revenue', value: '$2,500.00', change: '+100%', isPositive: true, icon: Wallet, color: '#D4AF37' },
  { title: 'Tickets Sold', value: '42', change: '+12', isPositive: true, icon: Ticket, color: '#00D4FF' },
  { title: 'VIP Tables', value: '3', change: '+1', isPositive: true, icon: Crown, color: '#FF7A00' },
  { title: 'Live Votes', value: '1,204', change: '+842', isPositive: true, icon: Zap, color: '#d946ef' },
];

export function AdminDashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="flex h-screen bg-[#0A0F1E] text-white font-inter overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/5 bg-[#0A0F1E] p-6 hidden lg:flex flex-col">
        <div className="flex items-center gap-3 mb-12 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-8 h-8 bg-[#FF7A00] rounded-lg flex items-center justify-center font-black">9</div>
          <span className="font-orbitron font-bold tracking-tighter">9LMNTS <span className="text-[#FF7A00]">OS</span></span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <SidebarItem icon={LayoutDashboard} label="Event Overview" active />
          <SidebarItem icon={Users} label="Attendee List" />
          <SidebarItem icon={CreditCard} label="Payouts" />
          <SidebarItem icon={Layers} label="OS Settings" />
        </nav>

        <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-[#FF7A00]/20 to-transparent border border-[#FF7A00]/20">
          <p className="text-xs font-bold mb-2 uppercase text-[#FF7A00]">License Status</p>
          <p className="text-[10px] opacity-60 mb-3">Enterprise Event OS active for Sound Clash 2026.</p>
          <button className="w-full py-2 bg-[#FF7A00] text-black text-[10px] font-black rounded-lg">EXTEND LICENSE</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto bg-[#0A0F1E] p-4 lg:p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-orbitron italic uppercase">Command <span className="text-[#FF7A00]">Center</span></h1>
            <p className="text-white/40 text-xs">Real-time telemetry for Sound Clash OS</p>
          </div>
          <div className="flex gap-4">
             <button onClick={() => window.open('https://paypal.com', '_blank')} className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all">
                <Wallet size={20} className="text-[#D4AF37]"/>
             </button>
             <button onClick={() => onNavigate('event-os-demo')} className="bg-[#FF7A00] text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2">
                <Plus size={16}/> New Deployment
             </button>
          </div>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {eventStats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* REVENUE CHART & RECENT SALES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8">
             <div className="flex justify-between items-center mb-8">
                <h3 className="font-orbitron text-sm uppercase italic">Revenue Velocity</h3>
                <select className="bg-transparent border-none text-xs font-bold text-[#FF7A00] outline-none cursor-pointer">
                    <option>LIVE (Last 60 mins)</option>
                    <option>Last 24 Hours</option>
                </select>
             </div>
             <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[{time: 1, v: 20}, {time: 2, v: 45}, {time: 3, v: 30}, {time: 4, v: 90}]}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF7A00" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FF7A00" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke="#FF7A00" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
             <h3 className="font-orbitron text-sm uppercase italic mb-6">Recent Sales</h3>
             <div className="space-y-4">
                <SaleItem name="Alex Rivera" type="VIP Table" amount="+$500.00" time="2m ago" />
                <SaleItem name="Sarah J." type="General Ticket" amount="+$50.00" time="14m ago" />
                <SaleItem name="Marcus T." type="Power Vote (x10)" amount="+$10.00" time="22m ago" />
                <SaleItem name="Unknown" type="General Ticket" amount="+$50.00" time="1h ago" />
             </div>
             <button className="w-full mt-8 py-3 rounded-xl border border-white/10 text-xs font-bold hover:bg-white/5 transition-all uppercase tracking-widest">View Ledger</button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-components for cleaner code
function SidebarItem({ icon: Icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#FF7A00] text-black font-bold shadow-lg shadow-[#FF7A00]/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
      <Icon size={20} />
      <span className="text-sm">{label}</span>
    </div>
  );
}

function StatCard({ title, value, change, isPositive, icon: Icon, color }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-white/20 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform" style={{ color }}>
          <Icon size={24} />
        </div>
        <div className={`flex items-center text-[10px] font-black ${isPositive ? 'text-[#10B981]' : 'text-[#E91E63]'}`}>
          {change} {isPositive ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
        </div>
      </div>
      <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">{title}</p>
      <p className="text-2xl font-black font-orbitron">{value}</p>
    </div>
  );
}

function SaleItem({ name, type, amount, time }: any) {
    return (
        <div className="flex justify-between items-center p-3 rounded-2xl hover:bg-white/5 transition-all">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">{name[0]}</div>
                <div>
                    <p className="text-xs font-bold">{name}</p>
                    <p className="text-[10px] opacity-40">{type}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-xs font-black text-[#10B981]">{amount}</p>
                <p className="text-[9px] opacity-30">{time}</p>
            </div>
        </div>
    );
}
