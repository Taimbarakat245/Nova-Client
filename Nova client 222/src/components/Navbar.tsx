import { useState, useEffect, MouseEvent } from 'react';
import { Sparkles, Download, MessageSquare, Shield, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'HUD Customizer', href: '#customizer' },
    { label: 'Screenshots', href: '#screenshots' },
    { label: 'Downloads', href: '#download' },
  ];

  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#050505]/75 backdrop-blur-md border-[#a855f7]/20 py-3'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Branding */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, '#home')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/35 transition-all duration-300 group-hover:border-[#a855f7] overflow-hidden">
              <Sparkles className="w-5 h-5 text-[#a855f7] group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-[#a855f7]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black italic tracking-widest text-lg text-white group-hover:text-[#a855f7] transition-colors duration-300">
                NOVA
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#a855f7]/80">
                Client
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="text-sm font-medium tracking-wide text-gray-400 hover:text-white hover:text-glow-purple transition-all duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#a855f7] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Discord & Download Quick Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://discord.gg/5FeQ7VW5cR"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-300 bg-[#5865F2]/10 border border-[#5865F2]/30 hover:border-[#5865F2] hover:bg-[#5865F2]/20 transition-all duration-300 hover:scale-[1.03]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discord</span>
            </a>
            <a
              href="#download"
              onClick={(e) => handleScrollTo(e, '#download')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-[#a855f7] box-glow-purple hover:box-glow-purple-hover border border-[#a855f7]/40 transition-all duration-300 hover:scale-[1.03]"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-[350px] border-b border-[#a855f7]/15 bg-[#050505]' : 'max-h-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-[#121216] transition-all"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 flex items-center gap-3">
            <a
              href="https://discord.gg/5FeQ7VW5cR"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 bg-[#5865F2]/10 border border-[#5865F2]/30"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discord</span>
            </a>
            <a
              href="#download"
              onClick={(e) => handleScrollTo(e, '#download')}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-[#a855f7]"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
