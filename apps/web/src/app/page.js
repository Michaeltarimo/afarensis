"use client";
import HeroSection from '@/components/home/HeroSection';
import FeaturesGrid from '@/components/home/FeaturesGrid';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesGrid />
      {/* Add other sections as we build them */}
    </div>
  );
};

export default HomePage;