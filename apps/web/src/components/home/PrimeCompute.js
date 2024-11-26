"use client";
import { ArrowRight, Cpu, Server, Network, Zap } from 'lucide-react';
import { PinContainer } from '../ui/3d-pin';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    // Characters to use (numbers, operators, and brackets for computation feel)
    const chars = '01∑∫∂√πΔ∇∞∝∈∉+−×÷=≠<>[]{}()'.split('');
    const columns = Math.floor(width / 20); // Character width
    const drops = Array(columns).fill(1);
    
    ctx.font = '15px "GeistMono"';
    
    const matrix = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      // Green text with our lime theme
      ctx.fillStyle = '#84cc16';
      
      // Loop over drops
      drops.forEach((y, i) => {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw the character
        const x = i * 20;
        ctx.fillText(char, x, y * 20);
        
        // Reset drop or move it down
        if (y * 20 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };

    // Animation loop
    const interval = setInterval(matrix, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
    />
  );
};

const FloatingIcons = () => {
  return (
    <div className="relative w-full h-full">
      {[Cpu, Server, Network, Zap].map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: `${20 + index * 20}%`,
            left: `${20 + index * 20}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          <Icon className="w-6 h-6 text-lime-400/60" />
        </motion.div>
      ))}
    </div>
  );
};

const PrimeCompute = () => {
  return (
    <section id="compute-section" className="py-16 bg-background-light dark:bg-background-dark">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-lg">
              <h3 className="text-sm font-mono text-lime-400 tracking-wide mb-2">
                PRIME COMPUTE
              </h3>
              <h2 className="text-2xl font-bold mb-2">
                Scalable. Cheap. Fast.
              </h2>
              <h2 className="text-2xl font-bold mb-4">
                Introducing Prime Compute.
              </h2>
              <p className="text-base text-text-secondary dark:text-text-dark-secondary mb-6">
                Develop, train, and scale AI models. In one cloud that aggregates all clouds, 
                and enables efficient decentralized training.
              </p>
              
              <Link href="/sign-up" className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-lime-400 hover:bg-lime-500 text-black font-medium transition-colors">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Content - 3D Pin Animation */}
          <div className="hidden lg:block w-full lg:w-1/2 h-[400px] relative">
            <PinContainer title="GPU Computing Power">
              <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 w-[24rem] h-[24rem]">
                <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-lime-400">
                  Prime Compute
                </h3>
                <div className="text-base !m-0 !p-0 font-normal">
                  <span className="text-slate-500">
                    Unified GPU Cloud Platform
                  </span>
                </div>
                <div className="flex flex-1 w-full rounded-lg mt-4 bg-background-elevated-dark relative overflow-hidden">
                  <MatrixRain />
                  <FloatingIcons />
                </div>
              </div>
            </PinContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrimeCompute; 