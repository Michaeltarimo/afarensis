"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    available: "bg-lime-400/10 text-lime-400 border-lime-400/20",
    coming: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    removed: "bg-red-400/10 text-red-400 border-red-400/20",
  };

  const statusText = {
    available: "Available",
    coming: "Coming Soon",
    removed: "Removed",
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "px-2 py-1 rounded-full text-[10px] font-medium border",
        statusStyles[status]
      )}
    >
      {statusText[status]}
    </motion.span>
  );
};

export default function ProviderCard({ name, logo, status = "available" }) {
  return (
    <div className="bg-background-elevated-dark rounded-lg p-6 hover:bg-white/5 transition-colors cursor-pointer group">
      <div className="flex flex-col space-y-6">
        {/* Logo */}
        <div className="h-12 w-full relative flex items-center justify-center">
          <div className="h-12 w-12 relative">
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex items-center justify-between w-full">
          <h3 className="text-sm font-medium text-text-dark-primary group-hover:text-lime-400 transition-colors">
            {name}
          </h3>
          <StatusBadge status={status} />
        </div>
      </div>
    </div>
  );
} 