import { useState, useRef, useEffect, PointerEvent } from 'react';
import { LayoutGrid, Download, Sliders, Play, Settings, RefreshCw, Layers } from 'lucide-react';

interface HudElement {
  id: string;
  name: string;
  label: string;
  x: number; // Percentage positions
  y: number;
  width: number;
  height: number;
  enabled: boolean;
  value: string;
}

const defaultElements: HudElement[] = [
  { id: 'keystrokes', name: 'Keystrokes Overlay', label: 'W A S D', x: 80, y: 70, width: 140, height: 100, enabled: true, value: 'Keystrokes' },
  { id: 'fps_counter', name: 'FPS Meter', label: 'FPS: 450', x: 5, y: 5, width: 100, height: 32, enabled: true, value: '450 FPS' },
  { id: 'cps_meter', name: 'CPS Counters', label: 'CPS: 14 | 16', x: 5, y: 15, width: 120, height: 32, enabled: true, value: 'CPS: 12 / 15' },
  { id: 'ping_tracker', name: 'Sleek Ping Log', label: 'Ping: 14ms', x: 5, y: 25, width: 110, height: 32, enabled: false, value: 'MS: 14' },
  { id: 'armor_status', name: 'Armor Monitor', label: 'Helmet: 98% [D]', x: 92, y: 5, width: 130, height: 96, enabled: true, value: 'Armor Info' },
  { id: 'speedometer', name: 'Speedometer', label: 'Speed: 8.5 m/s', x: 45, y: 85, width: 140, height: 32, enabled: false, value: '8.4 m/s' },
];

export default function Customizer() {
  const [elements, setElements] = useState<HudElement[]>(defaultElements);
  const [selectedPreset, setSelectedPreset] = useState<'clean' | 'compact' | 'complete'>('clean');
  const [clientColor, setClientColor] = useState<string>('#a855f7');
  const [showValues, setShowValues] = useState<boolean>(true);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Apply default presets
  const applyPreset = (preset: 'clean' | 'compact' | 'complete') => {
    setSelectedPreset(preset);
    let updated = elements.map(el => {
      if (preset === 'clean') {
        return {
          ...el,
          enabled: el.id === 'keystrokes' || el.id === 'fps_counter',
          x: el.id === 'fps_counter' ? 5 : 82,
          y: el.id === 'fps_counter' ? 5 : 72
        };
      } else if (preset === 'compact') {
        return {
          ...el,
          enabled: el.id !== 'speedometer',
          x: el.id === 'keystrokes' ? 84 : el.id === 'fps_counter' ? 5 : el.id === 'cps_meter' ? 5 : el.id === 'ping_tracker' ? 5 : 88,
          y: el.id === 'keystrokes' ? 74 : el.id === 'fps_counter' ? 5 : el.id === 'cps_meter' ? 12 : el.id === 'ping_tracker' ? 19 : 5
        };
      } else {
        // Complete Preset
        return {
          ...el,
          enabled: true,
          x: el.id === 'keystrokes' ? 82 : el.id === 'fps_counter' ? 5 : el.id === 'cps_meter' ? 5 : el.id === 'ping_tracker' ? 5 : el.id === 'armor_status' ? 88 : 42,
          y: el.id === 'keystrokes' ? 70 : el.id === 'fps_counter' ? 5 : el.id === 'cps_meter' ? 12 : el.id === 'ping_tracker' ? 19 : el.id === 'armor_status' ? 8 : 85
        };
      }
    });
    setElements(updated);
  };

  const handleToggle = (id: string) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, enabled: !el.enabled } : el));
  };

  const resetCustomizer = () => {
    setElements(defaultElements);
    setClientColor('#a855f7');
    applyPreset('clean');
  };

  // Pointer drag math
  const handlePointerDown = (id: string, e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggingId(id);
    (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingId || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    
    // Calculate percentage coordinates relative to target box dimensions
    let xPercent = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    let yPercent = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    // Bound the coordinates inside the screen comfortably
    xPercent = Math.max(2, Math.min(xPercent - 5, 92));
    yPercent = Math.max(2, Math.min(yPercent - 3, 92));

    setElements(prev => prev.map(el => el.id === draggingId ? { ...el, x: xPercent, y: yPercent } : el));
  };

  const handlePointerUp = (id: string, e: PointerEvent<HTMLDivElement>) => {
    setDraggingId(null);
    (e.target as HTMLDivElement).releasePointerCapture(e.pointerId);
  };

  // Compile real customizable configuration profiles as customizable JSON payloads for Nova client
  const triggerDownload = () => {
    const backupData = {
      profileName: `Nova PvP Config - ${selectedPreset.toUpperCase()}`,
      author: 'Nova Client web creator',
      timestamp: new Date().toISOString(),
      clientThemeColor: clientColor,
      forgeVersion: '1.8.9',
      fpsSettings: {
        optimizeCpuTicks: true,
        fastCharBlockRendering: true,
        highContrastParticles: true,
      },
      activeModules: elements.reduce((acc, el) => {
        acc[el.id] = {
          enabled: el.enabled,
          coordinates: { xPercentage: el.x, yPercentage: el.y },
          label: el.label
        };
        return acc;
      }, {} as Record<string, any>)
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `nova_pvp_profile_${selectedPreset}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="customizer" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-[#040406]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#a855f7]/10 border border-[#a855f7]/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#a855f7] mb-4 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            <LayoutGrid className="w-3 h-3" />
            <span>Interactive HUD Editor</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-black italic tracking-tighter uppercase mb-4 text-white">
            Customizable Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#a855f7]">HUD Studio</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400 leading-relaxed">
            Design your gameplay layout directly on our website! Move, toggle, and drag module indicators on top of our real-time renderer, and export your setup config instantly.
          </p>
        </div>

        {/* Workspace Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Box (4-column on lg) */}
          <div className="lg:col-span-4 rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
            <h3 className="text-lg font-display font-black italic uppercase text-white mb-6 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#a855f7]" />
              <span>Studio Controls</span>
            </h3>

            {/* Presets Row */}
            <div className="mb-6">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2.5">
                Client Layout Preset
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['clean', 'compact', 'complete'] as const).map(preset => (
                  <button
                    key={preset}
                    onClick={() => applyPreset(preset)}
                    className={`py-2 rounded-lg text-xs font-bold capitalize border transition-all cursor-pointer ${
                      selectedPreset === preset
                        ? 'bg-[#a855f7]/10 text-[#a855f7] border-[#a855f7]'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Color Preset Selector */}
            <div className="mb-6">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2.5">
                Accent Neon Color
              </label>
              <div className="flex gap-3">
                {[
                  { label: 'Neon Purple', value: '#a855f7' },
                  { label: 'Cyber Blue', value: '#6366f1' },
                  { label: 'Flame Orange', value: '#f97316' },
                  { label: 'Aqua Mint', value: '#10b981' },
                  { label: 'Crimson Rose', value: '#f43f5e' }
                ].map(col => (
                  <button
                    key={col.value}
                    title={col.label}
                    onClick={() => setClientColor(col.value)}
                    style={{ backgroundColor: col.value }}
                    className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer hover:scale-110 ${
                      clientColor === col.value ? 'border-white scale-105' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Module Active Toggles */}
            <div className="border-t border-white/10 pt-6 mb-6">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>Render HUD Modules</span>
              </span>
              <div className="space-y-3.5">
                {elements.map(el => (
                  <div key={el.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                    <span className="text-xs font-medium text-gray-300">{el.name}</span>
                    <button
                      onClick={() => handleToggle(el.id)}
                      className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${
                        el.enabled ? 'bg-purple-500' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                        el.enabled ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Helper Button Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={triggerDownload}
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.03] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(168,85,247,0.35)]"
              >
                <Download className="w-4 h-4" />
                <span>Export Profile Configuration</span>
              </button>
              <button
                onClick={resetCustomizer}
                className="w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white border border-white/15 hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restore Layout Defaults</span>
              </button>
            </div>
          </div>

          {/* Interactive Screen Container (8-column on lg) */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Mock Screen Display Canvas Container */}
            <div className="relative rounded-2xl border border-white/[0.08] bg-[#0c0c11] overflow-hidden aspect-video shadow-2xl group/canvas">
              {/* Backing decorative element */}
              <div 
                className="absolute inset-0 bg-cover bg-center select-none opacity-45 pointer-events-none"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1615715757401-f30e7b27b912?q=80&w=1200&auto=format&fit=crop')`, // modern digital aesthetic background
                  filter: 'hue-rotate(240deg) brightness(0.6)'
                }}
              />
              
              {/* Crosshair indicator in screen center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none opacity-85">
                <div className="w-2.5 h-[1.5px] bg-white absolute" />
                <div className="h-2.5 w-[1.5px] bg-white absolute" />
              </div>

              {/* Real drag area */}
              <div 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full p-4 select-none"
                onPointerMove={handlePointerMove}
              >
                {elements.map(el => {
                  if (!el.enabled) return null;

                  const isDragging = draggingId === el.id;

                  return (
                    <div
                      key={el.id}
                      onPointerDown={(e) => handlePointerDown(el.id, e)}
                      onPointerUp={(e) => handlePointerUp(el.id, e)}
                      style={{
                        left: `${el.x}%`,
                        top: `${el.y}%`,
                        borderColor: isDragging ? clientColor : 'rgba(255, 255, 255, 0.1)',
                        zIndex: isDragging ? 40 : 10
                      }}
                      className="absolute px-3 py-1.5 rounded bg-black/75 cursor-move select-none border border-white/[0.08] hover:border-white/30 backdrop-blur-md active:scale-95 transition-transform duration-75 flex flex-col gap-0.5 pointer-events-auto"
                    >
                      <span className="text-[10px] font-mono text-gray-500 pointer-events-none select-none uppercase tracking-wide">
                        {el.name}
                      </span>
                      {el.id === 'keystrokes' ? (
                        <div className="flex flex-col items-center gap-1 p-1">
                          <div 
                            style={{ borderColor: clientColor }}
                            className="w-7 h-7 bg-white/5 border rounded flex items-center justify-center text-xs font-bold text-white shadow-md shadow-[#a855f7]/10"
                          >
                            W
                          </div>
                          <div className="flex gap-1">
                            <div className="w-7 h-7 bg-white/5 border border-white/15 rounded flex items-center justify-center text-xs font-bold text-gray-300">A</div>
                            <div className="w-7 h-7 bg-white/5 border border-white/15 rounded flex items-center justify-center text-xs font-bold text-gray-300">S</div>
                            <div className="w-7 h-7 bg-white/5 border border-white/15 rounded flex items-center justify-center text-xs font-bold text-gray-300">D</div>
                          </div>
                        </div>
                      ) : el.id === 'armor_status' ? (
                        <div className="flex flex-col gap-1 text-[10px] font-mono text-gray-200 p-1">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-sm bg-indigo-500 shrink-0" />
                            <span>Helmet: 98%</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-sm bg-indigo-500 shrink-0" />
                            <span>Chestplate: 91%</span>
                          </div>
                        </div>
                      ) : (
                        <span 
                          style={{ color: clientColor }}
                          className="text-xs font-bold font-mono tracking-wider transition-colors"
                        >
                          {el.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Drag indicator help bubble */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-[#a855f7]/15 border border-[#a855f7]/35 text-[9px] font-mono uppercase tracking-widest text-[#d9b8ff] pointer-events-none opacity-80 group-hover/canvas:opacity-100 transition-opacity">
                💡 Drag indicators to customize your Forge 1.8.9 layout
              </div>
            </div>

            {/* Config metadata footer readout */}
            <div className="mt-4 px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-ping" />
                <span>Config ID: NOVA-PVPRO-1.0</span>
              </span>
              <span>Coordinates: Percentages relative to display bounding-box</span>
              <span className="text-white font-medium">Auto-generated profile compatible with 1.8.9 PvP</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
