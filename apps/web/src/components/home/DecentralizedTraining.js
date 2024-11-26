"use client";
import { ArrowRight, Network, UserPlus, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const DecentralizedTraining = () => {
  return (
    <section id="research-section" className="py-24 bg-background-light dark:bg-background-dark relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div>
            <h3 className="text-sm font-mono text-lime-400 mb-3">DECENTRALIZED TRAINING</h3>
            <h2 className="text-3xl font-bold mb-6">
              Enabling accessible and scalable compute.
            </h2>
            <p className="text-text-secondary dark:text-text-dark-secondary mb-8">
              Advancing the state of the art of training across multiple clusters. 
              Join us to advance novel decentralized training research.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center px-6 py-3 rounded-lg border-2 border-lime-400/20 hover:border-lime-400/40 text-text-primary dark:text-text-dark-primary transition-colors group">
                <span>Apply as researcher</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center justify-center px-6 py-3 rounded-lg border-2 border-lime-400/20 hover:border-lime-400/40 text-text-primary dark:text-text-dark-primary transition-colors group">
                <span>Signup as provider</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Animation */}
          <div className="relative h-[400px]">
            <div className="absolute inset-0">
              <motion.div 
                className="relative w-full h-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              >
                {/* Network Nodes */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i * Math.PI * 2) / 8;
                  const radius = 150;
                  const x = Math.cos(angle) * radius + radius;
                  const y = Math.sin(angle) * radius + radius;
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-12 h-12 -ml-6 -mt-6 rounded-lg bg-background-elevated-dark border border-lime-400/20"
                      style={{ left: x, top: y }}
                      animate={{
                        scale: [1, 1.1, 1],
                        borderColor: ['rgba(132, 204, 22, 0.2)', 'rgba(132, 204, 22, 0.4)', 'rgba(132, 204, 22, 0.2)']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center text-lime-400/60">
                        {i % 3 === 0 ? <Network className="w-5 h-5" /> : 
                         i % 3 === 1 ? <Brain className="w-5 h-5" /> : 
                         <UserPlus className="w-5 h-5" />}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Center Node */}
                <motion.div
                  className="absolute left-1/2 top-1/2 w-16 h-16 -ml-8 -mt-8 rounded-lg bg-background-elevated-dark border border-lime-400/40 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(132, 204, 22, 0.2)',
                      '0 0 0 10px rgba(132, 204, 22, 0)',
                      '0 0 0 0 rgba(132, 204, 22, 0.2)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                >
                  <div className="text-lime-400 font-mono text-sm">GPU</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DecentralizedTraining; 