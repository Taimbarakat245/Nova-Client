import { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Particles list
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }> = [];

    // Stars list
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      alpha: number;
      twinkleSpeed: number;
    }> = [];

    // Shooting stars list
    const shootingStars: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }> = [];

    // Track mouse coordinates
    const mouse = { x: -1000, y: -1000, radius: 150 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initial setup of particles / stars
    const initParticles = () => {
      particles.length = 0;
      stars.length = 0;

      // Create static background stars (twinkly)
      const numStars = Math.floor((width * height) / 4000);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random(),
          twinkleSpeed: 0.005 + Math.random() * 0.015,
        });
      }

      // Create interactive purple floating particles
      const numParticles = Math.min(Math.floor((width * height) / 15000), 80);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.3,
          color: Math.random() > 0.4 ? '#a855f7' : '#6366f1', // Purple or indigo
        });
      }
    };

    // Keep resize observer to handle custom dims safely and responsively
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        width = newWidth;
        height = newHeight;
        canvas.width = newWidth;
        canvas.height = newHeight;
        initParticles();
      }
    });

    resizeObserver.observe(container);

    // Trigger one shooting star randomly
    const spawnShootingStar = () => {
      if (Math.random() > 0.98 && shootingStars.filter(s => s.active).length < 2) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.3,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 4,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.1, // around 45 degrees
          opacity: 1,
          active: true,
        });
      }
    };

    // Canvas draw cycle
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw elegant dark background gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, 10,
        width / 2, height / 2, Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#090514'); // subtle dark purple peak
      bgGrad.addColorStop(1, '#020203'); // extreme dark
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw static starry landscape
      for (const star of stars) {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Spawns and draws Shooting Stars
      spawnShootingStar();
      for (const ss of shootingStars) {
        if (!ss.active) continue;
        
        // Advance coordinate
        const dx = Math.cos(ss.angle) * ss.speed;
        const dy = Math.sin(ss.angle) * ss.speed;
        ss.x += dx;
        ss.y += dy;
        ss.opacity -= 0.012; // fade out

        if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
          ss.active = false;
          continue;
        }

        const grad = ctx.createLinearGradient(
          ss.x, ss.y,
          ss.x - Math.cos(ss.angle) * ss.length,
          ss.y - Math.sin(ss.angle) * ss.length
        );
        grad.addColorStop(0, `rgba(168, 85, 247, ${ss.opacity})`);
        grad.addColorStop(0.5, `rgba(99, 102, 241, ${ss.opacity * 0.5})`);
        grad.addColorStop(1, 'rgba(168, 85, 247, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(
          ss.x - Math.cos(ss.angle) * ss.length,
          ss.y - Math.sin(ss.angle) * ss.length
        );
        ctx.stroke();
      }

      // Filter inactive shooting stars
      const activeSS = shootingStars.filter(s => s.active);
      shootingStars.length = 0;
      shootingStars.push(...activeSS);

      // 4. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;

        // Interactive mouse force - subtle repulsion
        if (mouse.x !== -1000) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // push particles away slightly
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow for efficiency

        // 5. Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = (120 - dist) / 120 * 0.18;
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect particles close to mouse
        if (mouse.x !== -1000) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const opacity = (mouse.radius - dist) / mouse.radius * 0.25;
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
