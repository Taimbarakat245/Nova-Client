import { useState, ReactNode } from 'react';
import { Sparkles, Eye, Flame, Layout, RefreshCw, Cpu, MonitorPlay } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  category: string;
  icon: ReactNode;
  tags: string[];
}

const featuresList: FeatureCardProps[] = [
  {
    title: '1.7 PvP Animations',
    description: 'Toggle blockhittting, eating, and drinking animations back to the 1.7 design to optimize your PvP reach feeling and timing.',
    category: 'animation',
    icon: <Flame className="w-5 h-5 text-amber-400" />,
    tags: ['HitReg', 'Visuals']
  },
  {
    title: 'Custom Motion Blur',
    description: 'Beautiful native frame-blending motion blur that uses hardware acceleration to keep game looking extremely cinematic and fluid.',
    category: 'animation',
    icon: <Eye className="w-5 h-5 text-emerald-400" />,
    tags: ['Rendering', 'Smooth']
  },
  {
    title: 'Modern Minecraft ClickGUI',
    description: 'An elegant dark-mode HUD overlay loaded with searching, configuration categories, presets, and customized module configurations.',
    category: 'hud',
    icon: <Layout className="w-5 h-5 text-purple-400" />,
    tags: ['Config', 'Sleek']
  },
  {
    title: 'FPS Dynamic Boost',
    description: 'Aggressive chunk pre-loaders, memory garbage cleanup, entity ticking optimization, and texture cache improvements.',
    category: 'performance',
    icon: <Cpu className="w-5 h-5 text-sky-450 text-cyan-400" />,
    tags: ['Engine', 'MaxFPS']
  },
  {
    title: 'Custom HUD System',
    description: 'Dynamic overlays for keystrokes, cps displays, armor durability warning indicators, coordinates, status effects, and active ping logs.',
    category: 'hud',
    icon: <MonitorPlay className="w-5 h-5 text-rose-400" />,
    tags: ['Overlays', 'Drag-Drop']
  },
  {
    title: 'Optimized Block Rendering',
    description: 'Optimized rendering loop to eliminate frame stuttering during rapid block updates and intense build fights.',
    category: 'performance',
    icon: <RefreshCw className="w-5 h-5 text-fuchsia-400" />,
    tags: ['NoLag', 'Smooth']
  },
  {
    title: 'Dark Modern Client Theme',
    description: 'Banish the default clunky gray panels. Enjoy custom rounded sliders, glassmorphic dropdowns, and pulsing dark neon highlights.',
    category: 'hud',
    icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
    tags: ['Premium', 'Aesthetic']
  }
];

export default function Features() {
  const [activeTab, setActiveTab] = useState<'all' | 'performance' | 'animation' | 'hud'>('all');

  const filteredFeatures = featuresList.filter(
    (feat) => activeTab === 'all' || feat.category === activeTab
  );

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#af46ff]/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-black italic tracking-tighter uppercase mb-4 text-white">
            Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-indigo-400">PvP Mods</span> & Enhancements
          </h2>
          <p className="max-w-2xl mx-auto text-base text-gray-400 leading-relaxed">
            Nova Client comes equipped with an extensive suite of built-in clientside mods configured to offer optimal frames, competitive precision, and extreme customization.
          </p>
        </div>

        {/* Tab Selection Filter */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 max-w-xl mx-auto">
          {(['all', 'performance', 'animation', 'hud'] as const).map((tab) => (
            <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 pointer-events-auto border cursor-pointer ${
                 activeTab === tab
                   ? 'bg-[#a855f7] text-white border-transparent shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                   : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
               }`}
            >
              {tab === 'all' ? 'All Mods' : tab}
            </button>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeatures.map((feat) => (
            <div
              key={feat.title}
              className="group relative rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-[#a855f7]/50 hover:bg-white/10 transition-all duration-350 hover:-translate-y-1 backdrop-blur-md overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
            >
              {/* Card glowing hover circle */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#a855f7]/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
              
              {/* Icon layout */}
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5 group-hover:border-[#a855f7]/40 group-hover:bg-[#a855f7]/15 transition-colors">
                {feat.icon}
              </div>

              {/* Title and details */}
              <h3 className="text-lg font-display font-black italic uppercase text-white mb-2 group-hover:text-[#a855f7] transition-colors">
                {feat.title}
              </h3>
              
              <p className="text-sm text-gray-400 font-sans tracking-wide leading-relaxed mb-6">
                {feat.description}
              </p>

              {/* Tags panel */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {feat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.03] text-gray-400 border border-white/[0.05]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
