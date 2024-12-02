"use client";
import { Cpu, HardDrive } from 'lucide-react';
import Image from 'next/image';

export default function GPUCard({ 
  model, 
  vram, 
  socket, 
  prices, 
  isSelected, 
  onSelect,
  quantity,
  onQuantityChange 
}) {
  return (
    <div 
      onClick={onSelect}
      className={`relative bg-background-elevated-dark rounded-lg p-4 border-2 transition-all cursor-pointer ${
        isSelected 
          ? 'border-lime-400 bg-lime-400/[0.03]' 
          : 'border-white/10 hover:border-lime-400/50 hover:bg-white/[0.02]'
      }`}
    >
      {/* Header with GPU name and quantity */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative h-8 w-8">
          <Image
            src="/provider/logos/nvidia-logo.svg"
            alt="NVIDIA"
            fill
            className="object-contain"
            priority
          />
        </div>
        <span className="text-lg font-medium text-text-dark-primary">{model}</span>
        <div className="ml-auto">
          <select 
            value={quantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value))}
            className="bg-background-dark border border-white/10 rounded px-2 py-1 text-sm text-text-dark-primary appearance-none cursor-pointer hover:border-white/20 transition-colors"
          >
            <option>1</option>
            <option>2</option>
            <option>4</option>
          </select>
        </div>
      </div>

      {/* Specs */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-text-dark-secondary">
          <HardDrive className="h-4 w-4 text-text-dark-secondary/50" />
          <span className="text-text-dark-secondary/50">VRAM:</span>
          <span className="font-medium text-text-dark-secondary">{vram}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-dark-secondary">
          <Cpu className="h-4 w-4 text-text-dark-secondary/50" />
          <span className="text-text-dark-secondary/50">Socket:</span>
          <span className="font-medium text-text-dark-secondary">{socket}</span>
        </div>
      </div>

      {/* Pricing Options */}
      <div className="grid grid-cols-2 gap-2">
        <button 
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors group ${
            prices.community 
              ? 'bg-white/5 hover:bg-white/10' 
              : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!prices.community}
        >
          <span className="text-sm text-text-dark-secondary group-hover:text-text-dark-primary transition-colors">
            Community
          </span>
          {prices.community && (
            <span className="text-sm font-medium text-lime-400">
              ${prices.community}
            </span>
          )}
        </button>
        <button 
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors group ${
            prices.secure 
              ? 'bg-white/5 hover:bg-white/10' 
              : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!prices.secure}
        >
          <span className="text-sm text-text-dark-secondary group-hover:text-text-dark-primary transition-colors">
            Secure
          </span>
          {prices.secure && (
            <span className="text-sm font-medium text-lime-400">
              ${prices.secure}
            </span>
          )}
        </button>
      </div>

      {/* Selection Status */}
      <div className="mt-4">
        <div
          className={`w-full py-2 rounded-lg transition-all text-center ${
            isSelected
              ? 'bg-lime-400/10 text-lime-400 font-medium'
              : 'bg-white/5 text-text-dark-secondary group-hover:text-lime-400'
          }`}
        >
          {isSelected ? 'Selected' : 'Select GPU'}
        </div>
      </div>
    </div>
  );
} 