import { Sparkles, Youtube, Github, MessageSquare, ExternalLink, Mail, User } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[#050505] pt-20 pb-10 z-10 overflow-hidden">
      {/* Absolute background visual details */}
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Block: Client Branding */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/30">
                <Sparkles className="w-4.5 h-4.5 text-[#a855f7]" />
              </div>
              <h2 className="font-display font-black italic tracking-widest text-lg text-white uppercase">
                NOVA CLIENT
              </h2>
            </div>
            <p className="text-sm text-gray-400 font-sans tracking-wide leading-relaxed max-w-sm">
              The ultimate 1.8.9 Forge-supported PvP client built to optimize chunk loadings, boost frame latency, and customize interfaces dynamically.
            </p>
          </div>

          {/* Center Column: Owner/Developer details */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">CREDITS</span>
            <div className="flex flex-col gap-2 font-display">
              <span className="text-sm font-semibold text-white flex flex-wrap items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>Created & Maintained By</span>
                <span className="text-glow-purple text-[#a855f7] font-black italic">Taimbarakat & Venom Dray</span>
              </span>
              <a
                href="https://youtube.com/@iiam.taaaim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 mt-1 group"
              >
                <Youtube className="w-4 h-4 text-rose-500" />
                <span>Subscribe to <strong className="text-rose-400 font-bold font-sans">iiam.taaaim</strong> on YouTube</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Right Column: Social channels */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Social Connections</span>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#5865F2] hover:bg-[#5865F2]/10 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:-translate-y-0.5"
                title="Join Discord"
              >
                <MessageSquare className="w-4.5 h-4.5" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#a855f7] hover:bg-[#a855f7]/10 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:-translate-y-0.5"
                title="View GitHub"
              >
                <Github className="w-4.5 h-4.5" />
              </a>

              <a
                href="mailto:taimbarakat2023@gmail.com"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#a855f7] hover:bg-[#a855f7]/10 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:-translate-y-0.5"
                title="Email Support"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>
            <span className="text-[10px] font-mono text-gray-500">Contact: taimbarakat2023@gmail.com</span>
          </div>

        </div>

        {/* Bottom copyright list */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-gray-500">
          <span>&copy; {currentYear} Nova Client. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors">Privacy Agreement</span>
            <span className="hover:text-white transition-colors">Terms of Use</span>
          </div>
          <span className="text-gray-650 text-[10px] uppercase tracking-wide">NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG.</span>
        </div>

      </div>
    </footer>
  );
}
