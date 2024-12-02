"use client";
import { useState } from 'react';
import { Gpu, Server, Gauge } from 'lucide-react';

const gpuTypes = [
  {
    id: 'a100',
    name: 'NVIDIA A100',
    vram: '80GB',
    performance: 'Highest',
    useCase: 'Large Language Models, Research',
    maxInstances: 10
  },
  {
    id: 'a6000',
    name: 'NVIDIA A6000',
    vram: '48GB',
    performance: 'High',
    useCase: 'Computer Vision, ML Training',
    maxInstances: 20
  },
  {
    id: '4090',
    name: 'NVIDIA RTX 4090',
    vram: '24GB',
    performance: 'Medium',
    useCase: 'Development, Testing',
    maxInstances: 50
  }
];

const computePreferences = [
  {
    id: 'performance',
    name: 'Performance Optimized',
    description: 'Highest performance, premium pricing'
  },
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Good performance at reasonable cost'
  },
  {
    id: 'cost',
    name: 'Cost Optimized',
    description: 'Best pricing, may wait for availability'
  }
];

export default function GPUConfigurations({ onChange, value }) {
  const [selectedGPUs, setSelectedGPUs] = useState(value?.gpus || []);
  const [computePreference, setComputePreference] = useState(value?.computePreference || 'balanced');

  const handleGPUToggle = (gpuId) => {
    const newSelection = selectedGPUs.includes(gpuId)
      ? selectedGPUs.filter(id => id !== gpuId)
      : [...selectedGPUs, gpuId];
    
    setSelectedGPUs(newSelection);
    onChange?.({ gpus: newSelection, computePreference });
  };

  const handleComputePreference = (prefId) => {
    setComputePreference(prefId);
    onChange?.({ gpus: selectedGPUs, computePreference: prefId });
  };

  return (
    <div className="space-y-8">
      {/* GPU Selection */}
      <div>
        <h3 className="text-base font-medium text-text-dark-primary mb-4 flex items-center gap-2">
          <Gpu className="h-5 w-5 text-lime-400" />
          GPU Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gpuTypes.map((gpu) => (
            <button
              key={gpu.id}
              onClick={() => handleGPUToggle(gpu.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedGPUs.includes(gpu.id)
                  ? 'border-lime-400 bg-lime-400/5'
                  : 'border-white/10 hover:bg-white/5'
              }`}
            >
              <div className="text-sm font-medium text-text-dark-primary mb-2">
                {gpu.name}
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-xs text-text-dark-secondary">
                  <span className="w-20">VRAM:</span>
                  <span className="font-medium">{gpu.vram}</span>
                </div>
                <div className="flex items-center text-xs text-text-dark-secondary">
                  <span className="w-20">Performance:</span>
                  <span className="font-medium">{gpu.performance}</span>
                </div>
                <div className="flex items-center text-xs text-text-dark-secondary">
                  <span className="w-20">Max Units:</span>
                  <span className="font-medium">{gpu.maxInstances}</span>
                </div>
              </div>
              <div className="text-xs text-lime-400/80 mt-3">
                {gpu.useCase}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Compute Preferences */}
      <div>
        <h3 className="text-base font-medium text-text-dark-primary mb-4 flex items-center gap-2">
          <Gauge className="h-5 w-5 text-lime-400" />
          Compute Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {computePreferences.map((pref) => (
            <button
              key={pref.id}
              onClick={() => handleComputePreference(pref.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                computePreference === pref.id
                  ? 'border-lime-400 bg-lime-400/5'
                  : 'border-white/10 hover:bg-white/5'
              }`}
            >
              <div className="text-sm font-medium text-text-dark-primary mb-1">
                {pref.name}
              </div>
              <div className="text-xs text-text-dark-secondary">
                {pref.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Settings */}
      <div>
        <h3 className="text-base font-medium text-text-dark-primary mb-4 flex items-center gap-2">
          <Server className="h-5 w-5 text-lime-400" />
          Advanced Settings
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-white/10">
            <label className="text-sm text-text-dark-secondary block mb-2">
              Max Concurrent Instances
            </label>
            <input
              type="number"
              min="1"
              max="100"
              className="w-full bg-transparent border border-white/10 rounded px-3 py-2 text-text-dark-primary focus:border-lime-400 outline-none"
              placeholder="Enter limit"
            />
          </div>
          <div className="p-4 rounded-lg border border-white/10">
            <label className="text-sm text-text-dark-secondary block mb-2">
              Instance Timeout (hours)
            </label>
            <input
              type="number"
              min="1"
              max="720"
              className="w-full bg-transparent border border-white/10 rounded px-3 py-2 text-text-dark-primary focus:border-lime-400 outline-none"
              placeholder="Enter timeout"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 