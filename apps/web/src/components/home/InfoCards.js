"use client";
import { 
  Search, 
  Box, 
  CloudLightning,
  Zap,
  Container,
  CreditCard,
  CloudCog,
  Shield,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

const LineChart = () => {
  // Price data points for different providers
  const data = [
    { provider: 'AWS', points: [90, 85, 95, 88, 92, 85] },
    { provider: 'GCP', points: [80, 75, 85, 78, 82, 75] },
    { provider: 'Afarensis', points: [60, 55, 58, 52, 55, 50] },
  ];

  const maxPrice = 100;
  const width = 100;
  const height = 50;

  return (
    <div className="w-full h-24 flex flex-col justify-center p-2">
      <div className="relative h-full">
        {data.map((provider, providerIndex) => (
          <motion.div
            key={provider.provider}
            className="absolute inset-0"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 2, delay: providerIndex * 0.5 }}
          >
            <svg className="w-full h-full">
              <motion.path
                d={`M 0,${height - (provider.points[0] / maxPrice) * height} ${provider.points
                  .map((point, i) => `L ${(i + 1) * (width / 5)},${height - (point / maxPrice) * height}`)
                  .join(' ')}`}
                fill="none"
                stroke={
                  provider.provider === 'Afarensis' 
                    ? '#84cc16' 
                    : provider.provider === 'AWS' 
                      ? '#f97316' 
                      : '#60a5fa'
                }
                strokeWidth="2"
                className={`${provider.provider === 'Afarensis' ? 'stroke-2' : 'stroke-1'}`}
              />
            </svg>
          </motion.div>
        ))}
        {/* Price labels */}
        <div className="absolute -right-2 top-0 text-[10px] text-text-secondary dark:text-text-dark-secondary">$100/h</div>
        <div className="absolute -right-2 bottom-0 text-[10px] text-text-secondary dark:text-text-dark-secondary">$50/h</div>
      </div>
    </div>
  );
};

const ContainerShip = () => {
  return (
    <div className="w-full h-24 flex items-center justify-center overflow-hidden">
      <motion.div
        className="relative w-full h-16"
        initial={{ x: -100 }}
        animate={{ x: 100 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Water waves */}
        <motion.div
          className="absolute bottom-0 w-full h-6 bg-gradient-to-r from-cyan-400/20 via-cyan-400/30 to-cyan-400/20"
          animate={{
            y: [0, -2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Container ship */}
        <motion.div className="absolute bottom-4 w-20 h-8">
          <div className="w-full h-full bg-slate-700 rounded-sm" />
          <div className="absolute top-0 w-full flex justify-around">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-5 h-5 bg-gradient-to-br from-lime-400 to-lime-500 rounded-sm"
                initial={{ y: 0 }}
                animate={{ y: [0, -1, 0] }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const CloudManagement = () => {
  return (
    <div className="w-full h-24 flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Central Platform */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-lg bg-lime-400/10 border border-lime-400/30 flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(132, 204, 22, 0.2)",
              "0 0 0 10px rgba(132, 204, 22, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="text-lime-400 text-xs font-mono">GPU</div>
        </motion.div>

        {/* Orbiting Cloud Providers */}
        {[0, 72, 144, 216, 288].map((degree, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2 w-8 h-8"
            style={{
              originX: 0,
              originY: 0,
            }}
            animate={{
              rotate: [degree, degree + 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className="w-6 h-6 -ml-3 -mt-3 rounded-full bg-background-dark/80 border border-lime-400/30 flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.4,
              }}
            >
              <div className="text-lime-400/80 text-[8px] font-mono">
                {['AWS', 'GCP', 'Azure', 'Lambda', 'RunPod'][index]}
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.circle
            cx="50%"
            cy="50%"
            r="30"
            fill="none"
            stroke="rgba(132, 204, 22, 0.2)"
            strokeWidth="1"
            strokeDasharray="3 3"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              transformOrigin: 'center',
            }}
          />
        </svg>
      </div>
    </div>
  );
};

const InfoCards = () => {
  const cards = [
    {
      title: "Find the Best GPUs",
      description: "Compare GPU prices and availability across all clouds based on reliability and speed.",
      icons: [
        { icon: Search, color: "text-blue-400" },
        { icon: Zap, color: "text-yellow-400" },
        { icon: BarChart3, color: "text-purple-400" }
      ],
      visualization: <LineChart />
    },
    {
      title: "Ready to Use Containers",
      description: "Deploy any docker image and pre-built ones. No extra fees. Pay as much as going direct to the clouds.",
      icons: [
        { icon: Container, color: "text-cyan-400" },
        { icon: Box, color: "text-pink-400" },
        { icon: CreditCard, color: "text-green-400" }
      ],
      visualization: <ContainerShip />
    },
    {
      title: "Less Lock In, More Savings",
      description: "Manage your GPUs across many clouds in a single platform. Each cloud is scored on reliability and speed.",
      icons: [
        { icon: CloudCog, color: "text-indigo-400" },
        { icon: CloudLightning, color: "text-orange-400" },
        { icon: Shield, color: "text-teal-400" }
      ],
      visualization: <CloudManagement />
    }
  ];

  return (
    <div className="w-full bg-background-light dark:bg-background-dark py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-background-elevated-light dark:bg-background-elevated-dark rounded-lg p-6 border border-gray-200 dark:border-gray-800 hover:border-lime-400/50 transition-all duration-300"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icons Row */}
                <div className="flex items-center space-x-3 mb-4">
                  {card.icons.map((IconItem, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-lg bg-background-dark/5 dark:bg-background-light/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    >
                      <IconItem.icon className={`w-5 h-5 ${IconItem.color}`} />
                    </div>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-3 text-text-primary dark:text-text-dark-primary">
                  {card.title}
                </h3>

                {/* Visualization */}
                {card.visualization}

                {/* Description */}
                <p className="text-sm text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCards; 