"use client";
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const Globe = dynamic(() => import('@/components/globe/Globe'), {
  ssr: false,
  loading: () => null
});

// Custom hook for counter animation
const useCounter = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress < 1) {
        const currentCount = Math.floor(progress * (end - start) + start);
        if (currentCount !== countRef.current) {
          countRef.current = currentCount;
          setCount(currentCount);
        }
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start, isAnimating]);

  return [count, setIsAnimating];
};

const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
};

const AnimatedStat = ({ value, label }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const isPercentage = value.includes('%');
  const numberValue = parseInt(value);
  const [count, setIsAnimating] = useCounter(
    numberValue,
    2000,
    0
  );

  useEffect(() => {
    if (inView) {
      setIsAnimating(true);
    }
  }, [inView, setIsAnimating]);

  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="text-2xl sm:text-3xl font-bold text-lime-400 mb-1 sm:mb-2">
        {isPercentage ? `${count}%` : `${formatNumber(count)}+`}
      </div>
      <div className="text-xs sm:text-sm text-text-secondary dark:text-text-dark-secondary">
        {label}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const stats = [
    { value: "1000", label: "Available GPUs" },
    { value: "50000", label: "Active Users" },
    { value: "3", label: "Cloud Providers" },
    { value: "40%", label: "Cost Savings" },
  ];

  return (
    <section className="relative min-h-screen">
      {/* Mobile Globe Background */}
      <div className="lg:hidden absolute inset-0 opacity-30 pointer-events-none">
        <Globe />
      </div>

      {/* Flex Container */}
      <div className="flex flex-col lg:flex-row min-h-screen relative">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 pt-24 lg:pt-32 pb-12 lg:pb-24 px-6 lg:px-12 relative z-10">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent">
              Enterprise-Grade GPU Computing On Demand
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary dark:text-text-dark-secondary mb-6 lg:mb-8">
              Access AWS and GCP GPU resources at competitive prices. Scale your AI and ML workloads effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <Link 
                href="/sign-up"
                className="w-full sm:w-auto auth-button-animate px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-white font-medium min-w-[160px] text-sm sm:text-base"
              >
                Get Started
              </Link>
              <Link 
                href="/pricing"
                className="w-full sm:w-auto flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg border-2 border-lime-400/20 hover:border-lime-400 text-text-primary dark:text-text-dark-primary transition-colors text-sm sm:text-base"
              >
                View Pricing
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              
              
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-8 mt-12 sm:mt-16 lg:mt-20">
              {stats.map((stat, index) => (
                <AnimatedStat 
                  key={index} 
                  value={stat.value} 
                  label={stat.label} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Globe */}
        <div className="hidden lg:block w-1/2 h-screen">
          <Globe />
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 