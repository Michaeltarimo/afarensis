"use client";
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('@/components/globe/Globe'), {
  ssr: false,
  loading: () => null
});

const HeroSection = () => {
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
              <button className="w-full sm:w-auto auth-button-animate px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-white font-medium min-w-[160px] text-sm sm:text-base">
                Get Started
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg border-2 border-lime-400/20 hover:border-lime-400 text-text-primary dark:text-text-dark-primary transition-colors text-sm sm:text-base">
                View Pricing
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-8 mt-12 sm:mt-16 lg:mt-20">
              {[
                { label: 'Available GPUs', value: '1000+' },
                { label: 'Active Users', value: '50K+' },
                { label: 'Cloud Providers', value: '3' },
                { label: 'Cost Savings', value: '40%' },
              ].map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-lime-400 mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-text-secondary dark:text-text-dark-secondary">{stat.label}</div>
                </div>
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