"use client";
import HeroSection from '@/components/home/HeroSection';
import BackedBy from '@/components/home/BackedBy';
import PrimeCompute from '@/components/home/PrimeCompute';
import InfoCards from '@/components/home/InfoCards';
import DecentralizedTraining from '@/components/home/DecentralizedTraining';
import Intelligence from '@/components/home/Intelligence';
import Careers from '@/components/home/Careers';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <BackedBy />
      <PrimeCompute />
      <InfoCards />
      <DecentralizedTraining />
      <Intelligence />
      <Careers />
    </div>
  );
};

export default HomePage;