import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Customizer from './components/Customizer';
import Screenshots from './components/Screenshots';
import DownloadSection from './components/Download';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';

export default function App() {
  const handleScrollToSection = (id: string) => {
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-[#a855f7] selection:text-white overflow-x-hidden scanlines">
      {/* 1. Global Interactive Particle & Cosmic Backdrop backdrop */}
      <ParticlesBackground />

      {/* 2. Ambient global page lights */}
      <div className="absolute top-[30vh] left-[20%] w-[450px] h-[450px] bg-[#a855f7]/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[120vh] right-[15%] w-[550px] h-[550px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[240vh] left-[10%] w-[400px] h-[400px] bg-[#a855f7]/3 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* 3. Sticky header navigation */}
      <Navbar />

      {/* 4. Layered main layout containers */}
      <main className="relative z-10">
        
        {/* Cinematic Landing hero Section */}
        <Hero 
          onScrollToFeatures={() => handleScrollToSection('#features')}
          onScrollToDownload={() => handleScrollToSection('#download')}
        />

        {/* Modular Features showcases */}
        <Features />

        {/* Live HUD customize configuration sandbox */}
        <Customizer />

        {/* Visual Screenshots Carousel display */}
        <Screenshots />

        {/* Detailed Download center lists */}
        <DownloadSection />

      </main>

      {/* 5. Clean footer branding details */}
      <Footer />
    </div>
  );
}
