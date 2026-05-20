import { Sparkles, Download, MessageSquare, ArrowDown, Shield, Award } from 'lucide-react';

interface HeroProps {
  onScrollToFeatures: () => void;
  onScrollToDownload: () => void;
}

export default function Hero({ onScrollToFeatures, onScrollToDownload }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Background radial overlays for cinematic depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#af46ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-5xl mx-auto px-4 z-10 text-center flex flex-col items-center">
        
        {/* Anti-Cheat & Cert banner */}
        <div className="inline-flex items-center gap-2 px-3  py-1.5 rounded-full bg-purple-550/10 bg-purple-500/10 border border-purple-550/20 border-purple-500/20 text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(168,85,247,0.1)] mb-8 hover:border-[#a855f7]/40 transition-all duration-300">
          <Shield className="w-3.5 h-3.5 text-[#a855f7]" />
          <span className="text-[#a855f7]">
            Certified Cheat Protection • Forge 1.8.9 PvP
          </span>
        </div>

        {/* HUGE Nova Client logo layout */}
        <div className="group relative mb-6">
          {/* Subtle logo back-glow */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#a855f7] to-indigo-600 rounded-full blur-2xl opacity-25 group-hover:opacity-45 transition-all duration-1000" />
          
          <div className="relative flex items-center justify-center bg-black/40 p-4 rounded-3xl border border-white/5 backdrop-blur-sm">
            <h1 className="text-6xl sm:text-8xl md:text-9.5xl font-display font-black italic tracking-tighter uppercase mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_35px_rgba(168,85,247,0.3)] leading-none select-none">
              NOVA
            </h1>
            <div className="absolute -top-3 -right-3 px-3 py-1 rounded-md bg-[#a855f7] text-[10px] font-mono font-bold tracking-widest text-black uppercase shadow-lg shadow-[#a855f7]/35">
              V3.2
            </div>
          </div>
        </div>

        {/* Animated Subtitle & Title */}
        <p className="text-xl sm:text-2xl font-display font-bold italic text-glow-purple tracking-wide text-[#e9d5ff] mb-4">
          THE ULTIMATE 1.8.9 PVP EXPERIENCE
        </p>
        
        <p className="max-w-xl text-center text-sm sm:text-base text-gray-400 font-sans tracking-wide leading-relaxed mb-10">
          Unlock maximum performance and ultimate control. Built on <span className="text-purple-400">Forge 1.8.9</span> with premium animations and optimized FPS mechanics.
        </p>

        {/* Button Stack */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-fit">
          <button
            onClick={onScrollToDownload}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.04] transition-all duration-300 shadow-[0_0_30px_rgba(147,51,234,0.4)] group cursor-pointer"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download Now</span>
          </button>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-4 rounded-xl text-sm font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm hover:scale-[1.04] transition-all duration-300"
          >
            <MessageSquare className="w-4 h-4 text-[#a855f7]" />
            <span>Join Discord</span>
          </a>

          <button
            onClick={onScrollToFeatures}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white bg-transparent hover:scale-[1.04] transition-all duration-300"
          >
            <span>View Features</span>
            <ArrowDown className="w-4 h-4 text-[#a855f7] animate-bounce" />
          </button>
        </div>

        {/* Client stats panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl py-6 px-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="flex flex-col items-center sm:border-r border-b sm:border-b-0 border-white/10 pb-4 sm:pb-0">
            <div className="flex items-center gap-2 mb-1 justify-center">
              <Award className="w-4 h-4 text-[#a855f7]" />
              <span className="text-2xl font-display font-black italic text-white">+118%</span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Average FPS Gain</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1 justify-center">
              <Sparkles className="w-4 h-4 text-[#a855f7]" />
              <span className="text-2xl font-display font-black italic text-white">50+</span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Built-in PvP Mods</span>
          </div>
        </div>

      </div>

      {/* Grid pattern overlay at the extreme bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(168, 85, 247, 0.03) 1px, transparent 1px), linear-gradient(to top, rgba(168, 85, 247, 0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </section>
  );
}
