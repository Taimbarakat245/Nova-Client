import { useState, ReactNode } from 'react';
import { Eye, ShieldAlert, Sparkles, Trophy, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface MockSlide {
  id: string;
  title: string;
  category: string;
  tag: string;
  description: string;
  renderComponent: () => ReactNode;
}

export default function Screenshots() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slides: MockSlide[] = [
    {
      id: 'main_menu',
      title: 'Cinematic Main Menu',
      category: 'Main Menu',
      tag: 'LAUNCH INTERFACE',
      description: 'Stunning cosmic login layout loading smoothly with beautiful customized backdrops, quick multiplayer links, and simple cosmetics wardrobe controls.',
      renderComponent: () => (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0c051a] via-[#020204] to-[#12051f] relative overflow-hidden text-center">
          {/* Subtle cosmic circle glowing dots */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#a855f7]/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl" />
          
          <div className="mb-4 text-glow-purple flex items-center gap-1.5 justify-center">
            <span className="font-display font-extrabold text-white text-3xl tracking-widest">NOVA</span>
            <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded bg-[#a855f7]/20 border border-[#a855f7]/35 text-[#d9b8ff]">V3.2</span>
          </div>
          <p className="text-xs font-mono text-gray-400 tracking-wide mb-8 max-w-sm">
            Developed by TaimBarakat245 • Premium Minecraft Client
          </p>

          <div className="flex flex-col gap-3 w-64 uppercase font-sans tracking-widest text-[#d9b8ff] text-xs font-bold font-display relative z-10">
            <button className="py-2.5 rounded bg-white/[0.03] border border-white/[0.08] hover:border-[#a855f7]/60 hover:bg-[#a855f7]/5 hover:text-white transition-all">Singleplayer</button>
            <button className="py-2.5 rounded bg-white/[0.03] border border-[#a855f7]/35 bg-[#a855f7]/5 text-white hover:border-[#a855f7] transition-all relative overflow-hidden">
              <span className="relative z-10 font-bold">Multiplayer</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/10 to-[#6366f1]/10 filter blur-xs" />
            </button>
            <button className="py-2.5 rounded bg-white/[0.03] border border-white/[0.08] hover:border-[#a855f7]/60 hover:bg-[#a855f7]/5 hover:text-white transition-all">My Wardrobe</button>
            <button className="py-2.5 rounded bg-white/[0.03] border border-white/[0.08] hover:border-[#a855f7]/65 hover:bg-white/[0.04] text-gray-400 transition-all">Settings</button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-gray-500">
            <span>Minecraft 1.8.9 Forge</span>
            <span>Online Status: Linked Account</span>
          </div>
        </div>
      )
    },
    {
      id: 'click_gui',
      title: 'Glassmorphic ClickGUI Configurator',
      category: 'ClickGUI',
      tag: 'HUD CONTROLS',
      description: 'Quickly toggle or optimize modular settings using a beautiful full-screen GUI. Features instant searching, smart category tabs, and real-time color customizers.',
      renderComponent: () => (
        <div className="w-full h-full flex p-6 bg-[#040406]/95 relative overflow-hidden">
          {/* Side menu bars */}
          <div className="w-1/4 border-r border-white/[0.05] pr-4 flex flex-col gap-2 font-display text-xs font-semibold text-gray-400 uppercase tracking-widest">
            <span className="text-[10px] font-mono text-gray-500 mb-2 uppercase">Categories</span>
            <span className="p-2 rounded bg-white/[0.03] text-white border-l-2 border-[#a855f7]">All Modules</span>
            <span className="p-2 rounded hover:bg-white/[0.02] hover:text-white transition-colors cursor-pointer">Performance</span>
            <span className="p-2 rounded hover:bg-white/[0.02] hover:text-white transition-colors cursor-pointer">PvP Animations</span>
            <span className="p-2 rounded hover:bg-white/[0.02] hover:text-white transition-colors cursor-pointer">HUD Overlays</span>
          </div>
          {/* Main settings section */}
          <div className="w-3/4 pl-6 flex flex-col gap-4 font-sans relative">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-2">
              <span className="text-sm font-bold text-white uppercase tracking-widest font-display">ClickGUI Configurator</span>
              <span className="text-[10px] font-mono text-[#a855f7] font-bold">8 Mods Enabled</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[220px] pr-2">
              {[
                { name: '1.7 Blockhit', enabled: true },
                { name: 'CPS Side Counter', enabled: true },
                { name: 'Dynamic Motion Blur', enabled: true },
                { name: 'Armor Status HUD', enabled: true },
                { name: 'FPS Multiplier Optimizer', enabled: true },
              ].map(feat => (
                <div key={feat.name} className="p-3 rounded-lg bg-white/[0.01] border border-white/[0.04] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white">{feat.name}</span>
                    <span className="text-[9px] font-mono text-gray-500">Click to tweak options</span>
                  </div>
                  <button className={`w-8 h-4.5 rounded-full transition-colors relative cursor-pointer ${
                    feat.enabled ? 'bg-[#a855f7]' : 'bg-gray-700'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                      feat.enabled ? 'translate-x-3.5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'hud_editor',
      title: 'Interactive HUD Layout Designer',
      category: 'HUD Editor',
      tag: 'ARRANGE OVERLAYS',
      description: 'Arrange coordinates of standard elements (keystrokes, armor displays, coordinate gauges, multi-cps logs) dynamically. Pixel perfect alignment enabled by grid snapping.',
      renderComponent: () => (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-r from-slate-950 to-indigo-950 relative overflow-hidden">
          {/* Backing stylized sky block */}
          <div className="absolute inset-0 bg-[#090514]/90" />
          
          {/* Coordinate Snapping Grid layout */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none" 
            style={{
              backgroundImage: 'linear-gradient(to right, #a855f7 2px, transparent 2px), linear-gradient(to top, #a855f7 2px, transparent 2px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative text-center max-w-sm mb-6 z-10">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#d9b8ff] mb-2">Grid Editor Engaged</h4>
            <p className="text-[11px] text-gray-400">Click and drag HUD items seamlessly. Turn on snaps and scales with real-time feedback coordinates layout.</p>
          </div>

          <div className="relative w-full flex items-center justify-around z-10 px-8">
            <div className="px-3 py-1.5 rounded border border-[#a855f7] bg-black/85 text-[10px] font-mono font-bold text-[#a855f7]">
              [450 FPS] Snapped to X: 5% Y: 5%
            </div>
            
            <div className="px-3 py-1.5 rounded border border-[#a855f7] bg-black/85 text-[10px] font-mono font-bold text-[#a855f7]">
              [CPS: 14 / 16] Snapped to X: 5% Y: 12%
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'gameplay_mod',
      title: 'Cinematic PvP Gameplay HUD Overlay',
      category: 'Gameplay',
      tag: 'IN-GAME ACTION',
      description: 'Clean, performance-optimized, high-FPS in-game overlay featuring lag-free hit effects, customized hitboxes, and microsecond keystrokes rendering accuracy.',
      renderComponent: () => (
        <div className="w-full h-full bg-[#0a0518]/95 p-6 relative flex flex-col justify-between overflow-hidden">
          {/* Mock gameplay UI overlays */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1 text-[11px] font-mono">
              <span className="text-[#a855f7] font-bold">Nova Client v3.2</span>
              <span className="text-emerald-400 font-semibold">[FPS]: 540 • [MS]: 12ms</span>
              <span className="text-gray-400">[Coord]: X: 110.4 Y: 64.0 Z: -412.5</span>
            </div>
            <div className="p-2 rounded bg-black/60 border border-white/5 flex gap-1 items-center font-mono text-[10px] text-gray-300">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span>Current Streak: 14 Kills</span>
            </div>
          </div>

          {/* Centered combat splash indicator */}
          <div className="text-center transform scale-95 opacity-80 my-2">
            <span className="text-rose-500 font-display font-extrabold text-2xl tracking-widest text-shadow uppercase">Combat Tagged</span>
            <p className="text-[9px] font-mono text-gray-400">Survival time remaining: 15s</p>
          </div>

          <div className="flex items-end justify-between font-mono text-[10px]">
            <div className="flex flex-col gap-0.5 text-gray-300 bg-black/50 p-2 rounded border border-white/5">
              <span>🛡️ Armor Health [Excellent]</span>
              <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden mt-1">
                <div className="w-4/5 h-full bg-emerald-500" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 bg-black/50 p-2 rounded border border-white/5">
              <span className="text-[8px] text-gray-500 uppercase tracking-wide">Movement</span>
              <div className="flex gap-1">
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">W</span>
                <span className="px-1.5 py-0.5 rounded bg-[#a855f7] text-white">Shift</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="screenshots" className="py-24 relative overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-black italic tracking-tighter uppercase mb-4 text-white animate-fade-in">
            Stunning <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#a855f7]">Client Aesthetics</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400 leading-relaxed">
            Take a look inside the client. Nova completely upgrades standard Minecraft interfaces with glassmorphic layouts, high contrast HUD graphics, and smooth animations.
          </p>
        </div>

        {/* Carousel controls with high UI styling */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          
          {/* Left Block description details (4 columns) */}
          <div className="lg:w-5/12 flex flex-col justify-center text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#a855f7] mb-4 border border-[#a855f7]/30 bg-[#a855f7]/10 px-3 py-1 rounded-full w-fit">
              {slides[activeSlideIndex].tag}
            </span>
            <h3 className="text-2xl sm:text-3.5xl font-display font-black italic uppercase text-white mb-4 transition-all duration-300">
              {slides[activeSlideIndex].title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-sans mb-8 transition-all duration-300">
              {slides[activeSlideIndex].description}
            </p>

            {/* Quick selector buttons list */}
            <div className="flex flex-col gap-2.5 mb-8">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`text-left p-3.5 rounded-xl border font-display text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                    activeSlideIndex === idx
                      ? 'bg-[#a855f7]/15 border-[#a855f7] text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="text-xs text-gray-500 font-mono mr-2">0{idx + 1}</span>
                  {s.category}
                </button>
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#a855f7] hover:text-white text-gray-400 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#a855f7] hover:text-white text-gray-400 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Block graphic interactive view (7 columns) */}
          <div className="lg:w-7/12 w-full relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#a855f7]/35 to-indigo-500/35 rounded-3xl blur-xl opacity-30 group-hover:opacity-45 transition-opacity" />
            <div className="relative rounded-2xl border border-white/10 bg-[#07070a] shadow-2xl h-[330px] sm:h-[400px] overflow-hidden">
              {slides[activeSlideIndex].renderComponent()}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
