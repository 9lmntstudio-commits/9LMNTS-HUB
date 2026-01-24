// Inside your EventOSDemo component, replace the top section with this:

<div className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
  {/* LEFT SIDE: THE VISUAL FLYER (70% on Desktop) */}
  <motion.div 
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    className="relative flex-[1.5] min-h-[60vh] lg:min-h-screen bg-cover bg-center flex items-end p-8 lg:p-16"
    style={{ backgroundImage: `linear-gradient(to top, #1A1A1A 0%, transparent 100%), url(${theme.bannerImage || 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98'})` }}
  >
    <div className="relative z-10">
      <motion.div 
        className="inline-block px-3 py-1 rounded text-[10px] font-black tracking-[0.2em] mb-4"
        style={{ backgroundColor: theme.primary, color: '#000' }}
      >
        OS LIVE DEPLOYMENT
      </motion.div>
      <h1 className="font-orbitron text-6xl lg:text-9xl leading-none mb-4 uppercase italic">
        {labels.title}<br/>
        <span style={{ color: theme.primary }}>{labels.subtitle}</span>
      </h1>
      <p className="font-inter text-xl opacity-80 border-l-4 pl-4" style={{ borderColor: theme.primary }}>
        {labels.date} • {labels.venue}
      </p>
    </div>
  </motion.div>

  {/* RIGHT SIDE: THE MONEY ENGINE (Sticky / Scrollable) */}
  <div className="flex-1 bg-[#1A1A1A] border-l border-white/10 p-8 lg:p-12 flex flex-col justify-center">
    <h2 className="font-orbitron text-xl mb-8 flex items-center gap-2">
      <ShoppingBag size={20} style={{ color: theme.primary }} />
      SECURE YOUR ENTRY
    </h2>

    {/* Ticket Tiers directly from your existing Store logic */}
    <div className="space-y-4">
      {storeItems.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center group cursor-pointer"
          onClick={() => window.open(`https://paypal.me/9LMNTSOS/${item.price}`, '_blank')}
        >
          <div>
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-xs opacity-50">{item.desc}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black mb-2">${item.price}</div>
            <div className="text-[10px] text-white/40 group-hover:text-white transition-colors">BUY VIA PAYPAL →</div>
          </div>
        </motion.div>
      ))}
    </div>
    
    <div className="mt-12 p-4 rounded-xl bg-white/5 border border-dashed border-white/20 text-center">
        <p className="text-[10px] uppercase tracking-widest opacity-40">Scan QR Code to pay on mobile</p>
        {/* You can put a generated QR here later */}
    </div>
  </div>
</div>
