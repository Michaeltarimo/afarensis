"use client";
import { useEffect, useState } from 'react';

const availabilityData = [
  { 
    id: 1,
    region: "us-east-1",
    name: "N. Virginia",
    gpu: "NVIDIA A100",
    instance: "p4d.24xlarge",
    price: "32.77",
    availability: "On-Demand",
    latency: "23ms"
  },
  { 
    id: 2,
    region: "eu-west-1",
    name: "Ireland",
    gpu: "NVIDIA A10G",
    instance: "g5.24xlarge",
    price: "12.24",
    availability: "Spot Available",
    latency: "18ms"
  },
  { 
    id: 3,
    region: "ap-northeast-1",
    name: "Tokyo",
    gpu: "NVIDIA V100",
    instance: "p3.16xlarge",
    price: "24.48",
    availability: "Reserved",
    latency: "15ms"
  },
  { 
    id: 4,
    region: "us-west-2",
    name: "Oregon",
    gpu: "NVIDIA T4",
    instance: "g4dn.12xlarge",
    price: "3.91",
    availability: "On-Demand",
    latency: "28ms"
  }
];

const AvailabilityRibbon = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % availabilityData.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const current = availabilityData[currentIndex];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-background-elevated-dark/95 via-lime-950/30 to-background-elevated-dark/95 backdrop-blur-sm border-b border-lime-400/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center h-8">
          <div
            className={`font-mono text-sm transition-opacity duration-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Mobile View (xs to sm) */}
            <div className="flex lg:hidden items-center space-x-2">
              <span className="text-lime-400">●</span>
              <span className="text-lime-400/80">{current.gpu}</span>
              <span className="text-text-dark-secondary/60">${current.price}</span>
            </div>

            {/* Tablet View (md) */}
            <div className="hidden md:flex lg:hidden items-center space-x-4">
              <div className="flex items-center">
                <span className="text-lime-400">●</span>
                <span className="text-text-dark-secondary ml-2">
                  {current.name}
                </span>
              </div>
              <div className="text-text-dark-secondary">
                <span className="text-lime-400/80">{current.gpu}</span>
                <span className="mx-2 text-lime-400/30">|</span>
                <span className="text-lime-400/80">${current.price}</span>
              </div>
            </div>

            {/* Desktop View (lg and up) */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center">
                <span className="text-lime-400">●</span>
                <span className="text-text-dark-secondary ml-2">
                  {current.name}
                </span>
              </div>

              <div className="text-text-dark-secondary">
                <span className="text-lime-400/80">{current.gpu}</span>
                <span className="mx-2 text-lime-400/30">|</span>
                <span className="text-lime-400/60">{current.instance}</span>
              </div>

              <div className="text-text-dark-secondary">
                <span className="text-lime-400/80">${current.price}</span>
                <span className="text-text-dark-secondary/60">/hour</span>
              </div>

              <div className="text-text-dark-secondary">
                <span className={`${
                  current.availability === 'On-Demand' ? 'text-lime-400' :
                  current.availability === 'Spot Available' ? 'text-yellow-400' :
                  'text-blue-400'
                }`}>
                  {current.availability}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityRibbon; 