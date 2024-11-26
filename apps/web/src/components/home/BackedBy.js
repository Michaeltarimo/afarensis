"use client";
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Brain, Cpu, Database, Cloud, Layers, Code, Server, Network, Shield, Workflow } from 'lucide-react';

const companies = [
  {
    name: "Sequoia Capital",
    brandColor: "#C53030", // Sequoia's red
    logo: "/logos/sequoia.svg",
    width: 120,
    bgClass: "bg-red-50 dark:bg-red-950/30",
    borderClass: "border-red-200 dark:border-red-800",
    hoverBorderClass: "hover:border-red-400"
  },
  {
    name: "Andreessen Horowitz",
    brandColor: "#1A365D", // a16z's navy
    logo: "/logos/a16z.svg",
    width: 110,
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    borderClass: "border-blue-200 dark:border-blue-800",
    hoverBorderClass: "hover:border-blue-400"
  },
  {
    name: "Y Combinator",
    brandColor: "#F97316", // YC's orange
    logo: "/logos/yc.svg",
    width: 100,
    bgClass: "bg-orange-50 dark:bg-orange-950/30",
    borderClass: "border-orange-200 dark:border-orange-800",
    hoverBorderClass: "hover:border-orange-400"
  },
  {
    name: "NVIDIA Inception",
    brandColor: "#76B900", // NVIDIA's green
    logo: "/logos/nvidia.svg",
    width: 110,
    bgClass: "bg-green-50 dark:bg-green-950/30",
    borderClass: "border-green-200 dark:border-green-800",
    hoverBorderClass: "hover:border-green-400"
  },
  {
    name: "AWS Activate",
    brandColor: "#FF9900", // AWS orange
    logo: "/logos/aws.svg",
    width: 100,
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    borderClass: "border-amber-200 dark:border-amber-800",
    hoverBorderClass: "hover:border-amber-400"
  }
];

const investors = [
  {
    name: "Dr. John Chen",
    role: "Former CTO",
    company: "NVIDIA",
    icon: Brain,
    color: "text-purple-400"
  },
  {
    name: "Sarah Williams",
    role: "AI Research Lead",
    company: "Google Brain",
    icon: Cpu,
    color: "text-blue-400"
  },
  {
    name: "Michael Zhang",
    role: "Founder & CEO",
    company: "TechVentures",
    icon: Database,
    color: "text-green-400"
  },
  {
    name: "Emily Brown",
    role: "Research Scientist",
    company: "DeepMind",
    icon: Cloud,
    color: "text-cyan-400"
  },
  {
    name: "David Kim",
    role: "Co-founder",
    company: "Scale AI",
    icon: Layers,
    color: "text-pink-400"
  },
  {
    name: "Lisa Wang",
    role: "Director",
    company: "Tesla AI",
    icon: Code,
    color: "text-red-400"
  },
  {
    name: "James Wilson",
    role: "Head of ML",
    company: "Meta AI",
    icon: Server,
    color: "text-indigo-400"
  },
  {
    name: "Anna Martinez",
    role: "Principal Scientist",
    company: "Amazon AI",
    icon: Network,
    color: "text-amber-400"
  },
  {
    name: "Robert Park",
    role: "VP Engineering",
    company: "Microsoft",
    icon: Shield,
    color: "text-teal-400"
  },
  {
    name: "Grace Liu",
    role: "AI Architect",
    company: "IBM Research",
    icon: Workflow,
    color: "text-violet-400"
  }
];

const BackedBy = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const newScrollPosition = 
        scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-background-light dark:bg-background-dark">
      <div className="max-w-5xl mx-auto px-4">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-lg md:text-xl font-medium text-right mb-8">
            Backed by world-class investors and industry leaders
          </h2>

          {/* Companies - Scrollable Row */}
          <div className="relative mb-10">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent z-10" />
            
            {/* Scroll Buttons */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background-elevated-light dark:bg-background-elevated-dark border border-gray-200 dark:border-gray-800 hover:border-lime-400/50 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-text-secondary dark:text-text-dark-secondary" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background-elevated-light dark:bg-background-elevated-dark border border-gray-200 dark:border-gray-800 hover:border-lime-400/50 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-text-secondary dark:text-text-dark-secondary" />
            </button>

            {/* Scrollable Container for Companies */}
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide relative flex gap-4 pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {companies.map((company, index) => (
                <div 
                  key={company.name}
                  className={`flex-shrink-0 w-60 h-16 ${company.bgClass} border ${company.borderClass} ${company.hoverBorderClass} rounded-lg flex items-center justify-center px-6 group transition-all duration-300 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <div className="font-bold text-sm" style={{ color: company.brandColor }}>
                      {company.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Investors - Scrollable Row */}
          <div className="relative">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent z-10" />
            
            {/* Scroll Buttons */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background-elevated-light dark:bg-background-elevated-dark border border-gray-200 dark:border-gray-800 hover:border-lime-400/50 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-text-secondary dark:text-text-dark-secondary" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background-elevated-light dark:bg-background-elevated-dark border border-gray-200 dark:border-gray-800 hover:border-lime-400/50 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-text-secondary dark:text-text-dark-secondary" />
            </button>

            {/* Scrollable Container for Investors */}
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide relative flex gap-4 pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {investors.map((investor, index) => {
                const IconComponent = investor.icon;
                return (
                  <div 
                    key={investor.name}
                    className={`flex-shrink-0 w-72 h-16 bg-background-elevated-light dark:bg-background-elevated-dark border border-gray-200 dark:border-gray-800 rounded-lg flex items-center px-4 group hover:border-lime-400/50 transition-all duration-300 ${
                      inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Animated Icon */}
                    <div className={`relative w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform ${investor.color}`}>
                      <IconComponent className="w-5 h-5 group-hover:animate-pulse" />
                    </div>
                    
                    {/* Investor Info */}
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary dark:text-text-dark-primary">
                        {investor.name}
                      </span>
                      <div className="text-sm text-text-secondary dark:text-text-dark-secondary">
                        <span>{investor.role}</span>
                        <span className="mx-1.5 text-lime-400/30">|</span>
                        <span className="text-lime-400/80">{investor.company}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackedBy; 