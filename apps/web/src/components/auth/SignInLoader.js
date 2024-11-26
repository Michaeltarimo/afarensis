"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Key, Shield, Gauge } from 'lucide-react';
import { useEffect, useState } from 'react';

const steps = [
  {
    title: "Authenticating",
    description: "Verifying your credentials",
    icon: Key,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20"
  },
  {
    title: "Securing Session",
    description: "Establishing secure connection",
    icon: Shield,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/20"
  },
  {
    title: "Loading Dashboard",
    description: "Preparing your workspace",
    icon: Gauge,
    color: "text-lime-400",
    bgColor: "bg-lime-400/10",
    borderColor: "border-lime-400/20"
  }
];

const SignInLoader = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
      } else {
        onComplete?.();
      }
    }, 1500); // Each step takes 1.5 seconds (slightly faster than signup)

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-sm"
    >
      <div className="bg-background-elevated-dark p-8 rounded-2xl border border-gray-800 shadow-xl w-full max-w-md">
        {/* Progress Bar */}
        <div className="relative h-1 bg-gray-800 rounded-full mb-8">
          <motion.div
            className="absolute left-0 top-0 h-full bg-lime-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            const Icon = step.icon;

            return (
              <div key={step.title} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div 
                    className={`absolute left-6 top-12 w-0.5 h-12 ${
                      isCompleted ? 'bg-lime-400/30' : 'bg-gray-800'
                    }`}
                  />
                )}

                <div className="relative flex items-start">
                  {/* Icon Container */}
                  <div 
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isCompleted ? 'bg-lime-400/20' : 
                      isActive ? step.bgColor : 
                      'bg-gray-800'
                    } ${
                      isCompleted ? 'border-lime-400/30' :
                      isActive ? step.borderColor :
                      'border-gray-700'
                    } border`}
                  >
                    <AnimatePresence mode="wait">
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="text-lime-400"
                        >
                          <Check className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className={isActive ? step.color : "text-gray-600"}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Text Content */}
                  <div className="ml-4 flex-1">
                    <motion.div
                      animate={{
                        color: isCompleted ? "#84cc16" : 
                               isActive ? "#ffffff" : 
                               "#6b7280"
                      }}
                      className="font-medium mb-1"
                    >
                      {step.title}
                    </motion.div>
                    <motion.div
                      animate={{
                        color: isActive ? "#9ca3af" : "#6b7280"
                      }}
                      className="text-sm"
                    >
                      {step.description}
                    </motion.div>
                  </div>

                  {/* Loading Indicator for Active Step */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute right-0 top-1/2 -translate-y-1/2"
                    >
                      <svg className="animate-spin h-5 w-5 text-lime-400" viewBox="0 0 24 24">
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                          fill="none"
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default SignInLoader; 