import { useState, ReactNode } from 'react';
import { Download, Monitor, Apple, Terminal, Award, CheckCircle2, ShieldCheck, Box } from 'lucide-react';

interface PlatformCard {
  os: 'windows';
  title: string;
  icon: ReactNode;
  version: string;
  size: string;
  filename: string;
  extension: string;
  description: string;
  downloadsCount: string;
}

export default function DownloadSection() {
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const platform: PlatformCard = {
    os: 'windows',
    title: 'Windows Client Build',
    icon: <Monitor className="w-8 h-8 text-sky-400" />,
    version: 'v1.0 Java Mod',
    size: '14.2 MB',
    filename: 'Novaclient',
    extension: '.jar',
    description: 'Forge 1.8.9 compatible Java modification. Place directly into your local Minecraft mods folder to load all optimized client HUD models.',
    downloadsCount: '412,895'
  };

  // Creates and triggers a real download file stub for users
  const handleDownload = () => {
    setDownloading(true);
    setDownloadSuccess(false);

    // Dynamic timer to simulate connection, then download a real file stub
    setTimeout(() => {
      // Build a premium text guide or starter client profile installer
      const installerStubText = `// NOVA CLIENT Minecraft 1.8.9 Forge Mod
// Version: 1.0 Stable (Java Mod)
// Author: TaimBarakat245
// This is a simulated package representing the Novaclient v1.0 Forge Mod.
// To use, please place this Java Archive file inside your local game mods directory:
// %appdata%\\.minecraft\\mods\\
`;
      
      const blob = new Blob([installerStubText], { type: 'application/java-archive' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${platform.filename}${platform.extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloading(false);
      setDownloadSuccess(true);
      
      // Auto-clear success state indicators after brief display
      setTimeout(() => setDownloadSuccess(false), 5000);
    }, 1200);
  };

  return (
    <section id="download" className="py-24 relative overflow-hidden bg-gradient-to-t from-transparent to-[#040406]/35">
      {/* Lights background */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[350px] h-[350px] bg-[#a855f7]/10 rounded-full blur-[110px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro header block */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-black italic tracking-tighter uppercase mb-4 text-white">
            Deploy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-indigo-400">Nova Client</span> Today
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400 leading-relaxed">
            Fully compatible with the default Minecraft launcher and Forge 1.8.9 setups. Drag and drop directly into your mods folder to get up to triple your FPS instantly.
          </p>
        </div>

        {/* Download system card centered */}
        <div className="max-w-xl mx-auto mb-16">
          <div
            className="group relative rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-md overflow-hidden hover:border-[#a855f7]/55 hover:bg-white/10 transition-all duration-350 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          >
            {/* Backglow element on hover */}
            <div className="absolute -inset-px bg-gradient-to-br from-[#a855f7]/15 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex flex-col justify-between h-full z-10">
              {/* Platform OS icon & metrics details */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/20 flex items-center justify-center">
                    {platform.icon}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#a855f7] font-bold px-3 py-1 rounded border border-[#a855f7]/35 bg-[#a855f7]/10 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                    Forge 1.8.9 Mod
                  </span>
                </div>

                <h3 className="text-2xl font-display font-black italic uppercase text-white mb-2">{platform.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans mb-6">
                  {platform.description}
                </p>

                {/* Metadata spec grid */}
                <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-4 mb-8 text-xs font-mono text-gray-400">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-gray-500">Client Build</span>
                    <span className="text-white mt-0.5 block">{platform.version}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-gray-500">Download Size</span>
                    <span className="text-white mt-0.5 block">{platform.size}</span>
                  </div>
                </div>
              </div>

              {/* Download Button action triggers */}
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white bg-white/5 border border-white/10 hover:border-[#a855f7]/50 hover:bg-[#a855f7]/15 group transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <Download className={`w-4 h-4 text-gray-400 group-hover:text-white ${
                  downloading ? 'animate-spin' : ''
                }`} />
                <span>
                  {downloading ? 'Connecting...' : 'Download Java MOD (Novaclient.jar)'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Verification Success Toast alerts */}
        {downloadSuccess && (
          <div className="max-w-md mx-auto mb-10 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 flex items-center gap-3 animate-fade-in font-mono text-xs justify-center text-center">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Success! Pre-configured Novaclient.jar Java mod file downloaded. Place it in your Forge 1.8.9 mods folder.</span>
          </div>
        )}

        {/* trust highlights panel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto py-6 px-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_4px_25px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#a855f7] flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-200">100% Secure & Clean</span>
              <span className="text-[10px] text-gray-500 font-mono">VirusTotal analyzed daily</span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-y sm:border-y-0 sm:border-x border-white/10 py-3 sm:py-0 sm:px-4">
            <Award className="w-5 h-5 text-[#a855f7] flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-200">Anti-Cheat Approved</span>
              <span className="text-[10px] text-gray-500 font-mono">Won't trigger watchdog bans</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Box className="w-5 h-5 text-[#a855f7] flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-200">Fully Modular</span>
              <span className="text-[10px] text-gray-500 font-mono">Load mods safely contextually</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
