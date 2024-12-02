"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Search, MapPin, Shield, Check, ChevronDown, ChevronUp,
  Globe, Flag, Rocket, Terminal, Sparkles
} from "lucide-react";
import { GB, US, SG, JP, DE, ZA, BR, AU, IN, AE, HK } from 'country-flag-icons/react/3x2';
import GPUCard from '@/components/dashboard/gpu/GPUCard';
import TemplatesModal from '@/components/dashboard/templates/TemplatesModal';
import Switch from '@/components/ui/Switch';
import Image from 'next/image';

const FilterDropdown = ({ isOpen, options, onSelect, selectedValue, onClose, position = 'absolute' }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <div className="fixed inset-0 z-40" onClick={onClose} />
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`${position} top-full left-0 right-0 mt-2 bg-background-elevated-dark border border-white/10 rounded-lg shadow-lg overflow-hidden z-50`}
          style={{
            position: position
          }}
        >
          <div className="py-1 max-h-[320px] overflow-y-auto scrollbar-hide">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => onSelect(option)}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 transition-colors group"
              >
                <div className="flex-shrink-0">
                  {option.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm text-text-dark-primary group-hover:text-lime-400 transition-colors">
                    {option.label}
                  </div>
                  {option.description && (
                    <div className="text-xs text-text-dark-secondary mt-0.5">
                      {option.description}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const availabilityOptions = [
  { 
    value: 'all', 
    label: 'Show All', 
    icon: <Check className="h-4 w-4" />,
    description: 'Show all GPU instances'
  },
  { 
    value: 'available', 
    label: 'Show Available', 
    icon: <Check className="h-4 w-4 text-lime-400" />,
    description: 'Show only available instances'
  }
];

const gpuOptions = [
  {
    id: 'h100',
    model: 'H100',
    vram: '80 GB',
    socket: 'PCIe, SXM5',
    prices: {
      community: '1.55',
      secure: '2.49'
    }
  },
  {
    id: 'a100-80',
    model: 'A100',
    vram: '80 GB',
    socket: 'PCIe, SXM4',
    prices: {
      community: '0.95',
      secure: '1.35'
    }
  },
  {
    id: 'a100-40',
    model: 'A100',
    vram: '40 GB',
    socket: 'PCIe, SXM4',
    prices: {
      community: '0.75',
      secure: '1.29'
    }
  },
  {
    id: 'rtx6000-ada',
    model: 'RTX6000 Ada',
    vram: '48 GB',
    socket: 'PCIe',
    prices: {
      community: '0.70',
      secure: '0.88'
    }
  },
  {
    id: 'a6000',
    model: 'A6000',
    vram: '48 GB',
    socket: 'PCIe',
    prices: {
      community: '0.20',
      secure: '0.50'
    }
  },
  {
    id: 'rtx3090',
    model: 'RTX3090',
    vram: '24 GB',
    socket: 'PCIe',
    prices: {
      community: '0.20',
      secure: '0.43'
    }
  },
  {
    id: 'rtx5000-ada',
    model: 'RTX5000 Ada',
    vram: '32 GB',
    socket: 'PCIe',
    prices: {
      community: '0.49',
      secure: null
    }
  },
  {
    id: 'v100-32',
    model: 'V100',
    vram: '32 GB',
    socket: 'SXM2',
    prices: {
      community: '0.33',
      secure: null
    }
  },
  {
    id: 'v100-16',
    model: 'V100',
    vram: '16 GB',
    socket: 'PCIe, SXM2',
    prices: {
      community: '0.17',
      secure: '0.39'
    }
  },
  {
    id: 'a10',
    model: 'A10',
    vram: '24 GB',
    socket: 'PCIe',
    prices: {
      community: null,
      secure: '0.75'
    }
  },
  {
    id: 'a40',
    model: 'A40',
    vram: '48 GB',
    socket: 'PCIe',
    prices: {
      community: null,
      secure: '0.39'
    }
  },
  {
    id: 'l40',
    model: 'L40',
    vram: '48 GB',
    socket: 'PCIe',
    prices: {
      community: '1.05',
      secure: '0.99'
    }
  },
  {
    id: 'a5000',
    model: 'A5000',
    vram: '24 GB',
    socket: 'PCIe',
    prices: {
      community: '0.21',
      secure: '0.36'
    }
  },
  {
    id: 'l4',
    model: 'L4',
    vram: '24 GB',
    socket: 'PCIe',
    prices: {
      community: null,
      secure: '0.43'
    }
  },
  {
    id: 'rtx4000-ada',
    model: 'RTX4000 Ada',
    vram: '20 GB',
    socket: 'PCIe',
    prices: {
      community: '0.20',
      secure: '0.38'
    }
  },
  {
    id: 'a4500',
    model: 'A4500',
    vram: '20 GB',
    socket: 'PCIe',
    prices: {
      community: '0.19',
      secure: '0.34'
    }
  },
  {
    id: 'a4000',
    model: 'A4000',
    vram: '16 GB',
    socket: 'PCIe',
    prices: {
      community: '0.09',
      secure: '0.32'
    }
  },
  {
    id: 'rtx3080-ti',
    model: 'RTX3080 Ti',
    vram: '12 GB',
    socket: 'PCIe',
    prices: {
      community: '0.18',
      secure: null
    }
  },
  {
    id: 'rtx3080',
    model: 'RTX3080',
    vram: '10 GB',
    socket: 'PCIe',
    prices: {
      community: '0.17',
      secure: null
    }
  },
  {
    id: 'rtx3070',
    model: 'RTX3070',
    vram: '8 GB',
    socket: 'PCIe',
    prices: {
      community: null,
      secure: '1.08'
    }
  },
  {
    id: 'cpu',
    model: 'CPU Node',
    vram: '0 GB',
    socket: 'PCIe',
    prices: {
      community: null,
      secure: '0.24'
    }
  }
];

const baseImages = [
  {
    id: 'ubuntu-22-cuda-12',
    icon: <Terminal className="h-5 w-5 text-violet-400" />,
    name: 'UBUNTU 22, CUDA 12',
    description: 'Base image running Ubuntu 22 and CUDA 12. Ideal for devs who prefer to customize their environment. Fastest spin up times.',
    tag: 'base_image'
  },
  {
    id: 'pytorch-cuda-12',
    icon: <Rocket className="h-5 w-5 text-red-400" />,
    name: 'CUDA 12.1, Pytorch 2.2',
    description: 'Docker image with PyTorch 2.2.2 and CUDA 12.1, ready for PyTorch model development.',
    tag: 'pytorch/pytorch:2.2.2-cuda12.1-cudnn8-runtime'
  },
  {
    id: 'pytorch-cuda-12-4',
    icon: <Rocket className="h-5 w-5 text-red-400" />,
    name: 'CUDA 12.4, Pytorch 2.4',
    description: 'Docker image with PyTorch 2.4.0 and CUDA 12.4.1, ready for PyTorch model development.',
    tag: 'pytorch/pytorch:2.4.0-cuda12.4.1-cudnn8-runtime'
  },
  {
    id: 'stable-diffusion',
    icon: <Sparkles className="h-5 w-5 text-pink-400" />,
    name: 'Stable Diffusion Web UI',
    description: 'Docker image running Stable Diffusion Web UI to immediately start generating stunning generative AI images.',
    tag: 'primeintellect/stable-diffusion'
  },
  {
    id: 'flux-comfy',
    icon: <Sparkles className="h-5 w-5 text-gray-400" />,
    name: 'Flux ComfyUI',
    description: 'Docker image running Flux ComfyUI to immediately start generating state-of-the-art AI images.',
    tag: 'primeintellect/flux',
    comingSoon: true
  },
  {
    id: 'axolotl',
    icon: <Terminal className="h-5 w-5 text-orange-400" />,
    name: 'Axolotl',
    description: 'Docker Image running Axolotl, the best library to start fine-tuning various AI models.',
    tag: 'winglian/axolotl'
  }
];

const DashboardPage = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState({ value: 'any', label: 'Any Location' });
  const [selectedSecurity, setSelectedSecurity] = useState({ value: 'any', label: 'Any Security' });
  const [selectedAvailability, setSelectedAvailability] = useState({ value: 'all', label: 'Show All' });
  const [selectedGPU, setSelectedGPU] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);

  const locations = [
    { 
      value: 'any', 
      label: 'Any Location', 
      icon: <Globe className="h-4 w-4" />
    },
    { 
      value: 'us-east-1',
      label: 'N. Virginia',
      region: "US East",
      icon: <US className="h-3 w-4" />,
      provider: "AWS",
      specs: "A100, V100, T4 GPUs"
    },
    { 
      value: 'eu-west-1',
      label: 'Ireland',
      region: "EU West",
      icon: <GB className="h-3 w-4" />,
      provider: "AWS",
      specs: "A100, T4 GPUs"
    },
    { 
      value: 'ap-northeast-1',
      label: 'Tokyo',
      region: "Asia Pacific",
      icon: <JP className="h-3 w-4" />,
      provider: "AWS",
      specs: "V100, T4 GPUs"
    },
    { 
      value: 'ap-southeast-1',
      label: 'Singapore',
      region: "Asia Pacific",
      icon: <SG className="h-3 w-4" />,
      provider: "AWS",
      specs: "V100, T4 GPUs"
    },
    { 
      value: 'eu-central-1',
      label: 'Frankfurt',
      region: "EU Central",
      icon: <DE className="h-3 w-4" />,
      provider: "AWS",
      specs: "A100, V100 GPUs"
    },
    { 
      value: 'af-south-1',
      label: 'Cape Town',
      region: "Africa",
      icon: <ZA className="h-3 w-4" />,
      provider: "AWS",
      specs: "V100, T4 GPUs"
    },
    { 
      value: 'sa-east-1',
      label: 'São Paulo',
      region: "South America",
      icon: <BR className="h-3 w-4" />,
      provider: "AWS",
      specs: "A100, T4 GPUs"
    },
    { 
      value: 'ap-southeast-2',
      label: 'Sydney',
      region: "Asia Pacific",
      icon: <AU className="h-3 w-4" />,
      provider: "AWS",
      specs: "V100, T4 GPUs"
    },
    { 
      value: 'ap-south-1',
      label: 'Mumbai',
      region: "Asia Pacific",
      icon: <IN className="h-3 w-4" />,
      provider: "GCP",
      specs: "A100, V100 GPUs"
    },
    { 
      value: 'me-south-1',
      label: 'Dubai',
      region: "Middle East",
      icon: <AE className="h-3 w-4" />,
      provider: "AWS",
      specs: "T4 GPUs"
    },
    { 
      value: 'ap-east-1',
      label: 'Hong Kong',
      region: "Asia Pacific",
      icon: <HK className="h-3 w-4" />,
      provider: "AWS",
      specs: "A100, V100 GPUs"
    }
  ];

  const securityStandards = [
    { 
      value: 'any', 
      label: 'Any Security', 
      icon: <Shield className="h-4 w-4" />,
      description: 'Show all providers regardless of security level'
    },
    { 
      value: 'secure', 
      label: 'Secure Cloud', 
      icon: <Shield className="h-4 w-4 text-lime-400" />,
      description: 'Enterprise-grade security with compliance standards'
    },
    { 
      value: 'community', 
      label: 'Community Cloud', 
      icon: <Shield className="h-4 w-4 text-text-dark-secondary" />,
      description: 'Community-driven providers with basic security'
    }
  ];

  const handleGPUSelect = (gpuId) => {
    setSelectedGPU(gpuId === selectedGPU ? null : gpuId);
  };

  const handleReset = () => {
    setSelectedGPU(null);
    setSelectedLocation({ value: 'any', label: 'Any Location', icon: <Globe className="h-4 w-4" /> });
    setSelectedSecurity({ value: 'any', label: 'Any Security', icon: <Shield className="h-4 w-4" /> });
    setSelectedAvailability({ value: 'all', label: 'Show All' });
    setSelectedImage(null);
    setQuantities({});
    // Add any other state resets needed
  };

  return (
    <div className="min-h-full bg-background-dark">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
        <div>
          <h1 className="text-xl font-medium text-text-dark-primary mb-1">
            Create new GPU Cluster
          </h1>
          <p className="text-sm text-text-dark-secondary">
            Choose your cluster for your GPU workload. Prices update in realtime.
          </p>
        </div>

        <motion.button
          disabled={!selectedGPU}
          whileHover={selectedGPU ? { scale: 1.02 } : {}}
          whileTap={selectedGPU ? { scale: 0.98 } : {}}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            selectedGPU 
              ? 'bg-lime-400 hover:bg-lime-500 text-black font-medium cursor-pointer'
              : 'bg-white/5 text-text-dark-secondary cursor-not-allowed'
          }`}
          title={!selectedGPU ? "Select a GPU to continue" : undefined}
        >
          {selectedGPU ? 'Continue to Results' : 'Select GPU first'}
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>

      {/* GPU Selection Container */}
      <div className="border-b border-white/5">
        <div className="flex">
          {/* Left Sidebar for GPU */}
          <div className="w-64 min-w-[16rem] border-r border-white/5 p-6">
            <div className="space-y-1">
              <h2 className="text-base font-medium text-text-dark-primary">
                Select your GPU type
              </h2>
              <p className="text-sm text-text-dark-secondary">
                Customize your cluster for optimal performance and scalability
              </p>
            </div>
          </div>

          {/* GPU Content */}
          <div className="flex-1 p-6">
            {/* Search, Filters, GPU Grid */}
            <div className="space-y-4 w-full">
              {/* Search */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-background-elevated-dark border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-text-dark-primary placeholder:text-text-dark-secondary focus:border-lime-400 outline-none"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-dark-secondary" />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-3 gap-4 w-full">
                {/* Location */}
                <div className="relative w-full">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'location' ? null : 'location')}
                    className={`w-full flex items-center justify-between px-3 py-2 bg-background-elevated-dark border rounded-lg transition-colors ${
                      activeDropdown === 'location'
                        ? 'border-lime-400 text-lime-400'
                        : 'border-white/10 text-text-dark-secondary hover:text-text-dark-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{selectedLocation.label}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      activeDropdown === 'location' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  <FilterDropdown
                    isOpen={activeDropdown === 'location'}
                    options={locations}
                    selectedValue={selectedLocation}
                    onSelect={(option) => {
                      setSelectedLocation(option);
                      setActiveDropdown(null);
                    }}
                    onClose={() => setActiveDropdown(null)}
                  />
                </div>

                {/* Security Standards */}
                <div className="relative w-full">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'security' ? null : 'security')}
                    className={`w-full flex items-center justify-between px-3 py-2 bg-background-elevated-dark border rounded-lg transition-colors ${
                      activeDropdown === 'security'
                        ? 'border-lime-400 text-lime-400'
                        : 'border-white/10 text-text-dark-secondary hover:text-text-dark-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm">{selectedSecurity.label}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      activeDropdown === 'security' ? 'rotate-180' : ''
                    }`} />
                  </button>

                  <FilterDropdown
                    isOpen={activeDropdown === 'security'}
                    options={securityStandards}
                    selectedValue={selectedSecurity}
                    onSelect={(option) => {
                      setSelectedSecurity(option);
                      setActiveDropdown(null);
                    }}
                    onClose={() => setActiveDropdown(null)}
                  />
                </div>

                {/* Availability Dropdown */}
                <div className="relative w-full">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'availability' ? null : 'availability')}
                    className={`w-full flex items-center justify-between px-3 py-2 bg-background-elevated-dark border rounded-lg transition-colors ${
                      activeDropdown === 'availability'
                        ? 'border-lime-400 text-lime-400'
                        : 'border-white/10 text-text-dark-secondary hover:text-text-dark-primary'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">{selectedAvailability.label}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      activeDropdown === 'availability' ? 'rotate-180' : ''
                    }`} />
                  </button>

                  <FilterDropdown
                    isOpen={activeDropdown === 'availability'}
                    options={availabilityOptions}
                    selectedValue={selectedAvailability}
                    onSelect={(option) => {
                      setSelectedAvailability(option);
                      setActiveDropdown(null);
                    }}
                    onClose={() => setActiveDropdown(null)}
                  />
                </div>
              </div>

              {/* GPU Grid */}
              <div className="space-y-4">
                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  layout
                >
                  <AnimatePresence mode="popLayout">
                    {gpuOptions.slice(0, isExpanded ? undefined : 4).map((gpu, index) => (
                      <motion.div
                        key={gpu.id}
                        layout
                        initial={index >= 4 ? { opacity: 0, scale: 0.8 } : false}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ 
                          duration: 0.2,
                          delay: index >= 4 ? (index - 4) * 0.05 : 0
                        }}
                      >
                        <GPUCard
                          {...gpu}
                          isSelected={selectedGPU === gpu.id}
                          onSelect={() => handleGPUSelect(gpu.id)}
                          quantity={quantities[gpu.id] || 1}
                          onQuantityChange={(value) => 
                            setQuantities(prev => ({ ...prev, [gpu.id]: value }))
                          }
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Show More/Less Button */}
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full mt-4 py-3 bg-background-elevated-dark border border-white/10 rounded-lg text-sm text-text-dark-secondary hover:text-text-dark-primary hover:border-white/20 transition-all group"
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    {isExpanded ? (
                      <>
                        <span>Show fewer GPUs</span>
                        <ChevronUp className="h-4 w-4 text-text-dark-secondary group-hover:text-text-dark-primary transition-colors" />
                      </>
                    ) : (
                      <>
                        <span>Show {gpuOptions.length - 4} more GPUs</span>
                        <ChevronDown className="h-4 w-4 text-text-dark-secondary group-hover:text-text-dark-primary transition-colors" />
                      </>
                    )}
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Base Image Container */}
      <div>
        <div className="flex">
          {/* Left Sidebar for Base Image */}
          <div className="w-64 min-w-[16rem] border-r border-white/5 p-6">
            <div className="space-y-1">
              <h2 className="text-base font-medium text-text-dark-primary">
                Cluster base image
              </h2>
              <p className="text-sm text-text-dark-secondary">
                Select a pre-configured cluster setup tailored to your specific needs, requiring no extra configurations and ready to integrate with your codebase immediately.
              </p>
            </div>
          </div>

          {/* Base Image Content */}
          <div className="flex-1 p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {baseImages.slice(0, 6).map((image) => (
                  <motion.button
                    key={image.id}
                    onClick={() => setSelectedImage(image.id === selectedImage ? null : image.id)}
                    className={`relative p-4 bg-background-elevated-dark rounded-lg text-left transition-all ${
                      selectedImage === image.id 
                        ? 'border-2 border-lime-400 bg-lime-400/[0.03]' 
                        : 'border border-white/10 hover:border-lime-400/50 hover:bg-white/[0.02]'
                    }`}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <div className="absolute top-4 right-4">
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center
                        transition-all duration-200
                        ${selectedImage === image.id 
                          ? 'bg-lime-400 border-2 border-lime-400' 
                          : 'bg-white/5 border border-white/10'
                        }
                      `}>
                        <motion.div
                          initial={false}
                          animate={{
                            scale: selectedImage === image.id ? 1 : 0.5,
                            opacity: selectedImage === image.id ? 1 : 0
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className={`h-3.5 w-3.5 ${
                            selectedImage === image.id 
                              ? 'text-black' 
                              : 'text-text-dark-secondary/20'
                          }`} />
                        </motion.div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pr-8">
                      <div className="flex-shrink-0 mt-1">
                        {image.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium text-text-dark-primary">
                            {image.name}
                          </h3>
                          {image.comingSoon && (
                            <span className="px-2 py-0.5 text-[10px] font-medium bg-white/5 text-text-dark-secondary rounded">
                              COMING SOON
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-text-dark-secondary">
                          {image.description}
                        </p>
                        <div className="mt-3 px-3 py-2 bg-black/20 rounded text-xs font-mono text-text-dark-secondary">
                          {image.tag}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Browse More Templates Button */}
              <motion.button
                onClick={() => setIsTemplatesModalOpen(true)}
                className="w-full mt-4 py-3 bg-background-elevated-dark border border-white/10 rounded-lg text-sm text-text-dark-secondary hover:text-text-dark-primary hover:border-white/20 transition-all group"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                <span>Browse more templates</span>
              </motion.button>

              {/* Templates Modal */}
              <TemplatesModal
                isOpen={isTemplatesModalOpen}
                onClose={() => setIsTemplatesModalOpen(false)}
                selectedTemplate={selectedImage}
                onSelect={(templateId) => {
                  setSelectedImage(templateId);
                  setIsTemplatesModalOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Container */}
      <div className="border-t border-white/5">
        <div className="flex">
          {/* Left Sidebar for Summary */}
          <div className="w-64 min-w-[16rem] border-r border-white/5 p-6">
            <div className="space-y-1">
              <h2 className="text-base font-medium text-text-dark-primary">
                Summary
              </h2>
              <p className="text-sm text-text-dark-secondary">
                Review your GPU selection and configuration details.
              </p>
            </div>
          </div>

          {/* Summary Content */}
          <div className="flex-1 p-6">
            <div className="space-y-6">
              {/* GPU Selection */}
              <div>
                <label className="block text-sm text-text-dark-secondary mb-2">GPU</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === 'summary-gpu' ? null : 'summary-gpu')}
                      className={`w-full flex items-center justify-between px-4 py-2 bg-background-elevated-dark border rounded-lg transition-colors ${
                        activeDropdown === 'summary-gpu'
                          ? 'border-lime-400 text-lime-400'
                          : 'border-white/10 text-text-dark-secondary hover:text-text-dark-primary'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src="/provider/logos/nvidia-logo.svg"
                          alt="NVIDIA"
                          width={16}
                          height={16}
                          className="object-contain"
                        />
                        <span className="text-sm">
                          {selectedGPU ? gpuOptions.find(g => g.id === selectedGPU)?.model : 'Select GPU'} {selectedGPU && gpuOptions.find(g => g.id === selectedGPU)?.vram}
                        </span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${
                        activeDropdown === 'summary-gpu' ? 'rotate-180' : ''
                      }`} />
                    </button>

                    <div className={`absolute top-full left-0 right-0 mt-2 bg-background-elevated-dark border border-white/10 rounded-lg shadow-lg overflow-hidden z-50 ${
                      activeDropdown === 'summary-gpu' ? 'block' : 'hidden'
                    }`}>
                      <div className="py-1 max-h-[320px] overflow-y-auto scrollbar-hide">
                        {gpuOptions.map((gpu) => (
                          <button
                            key={gpu.id}
                            onClick={() => {
                              handleGPUSelect(gpu.id);
                              setActiveDropdown(null);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 transition-colors group"
                          >
                            <Image
                              src="/provider/logos/nvidia-logo.svg"
                              alt="NVIDIA"
                              width={16}
                              height={16}
                              className="object-contain"
                            />
                            <div className="flex-1 text-left">
                              <span className="text-sm text-text-dark-primary group-hover:text-lime-400 transition-colors">
                                {gpu.model} {gpu.vram}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <select
                      value={quantities[selectedGPU] || 1}
                      onChange={(e) => setQuantities(prev => ({ ...prev, [selectedGPU]: parseInt(e.target.value) }))}
                      className="bg-background-elevated-dark border border-white/10 rounded-lg px-4 py-2 text-sm text-text-dark-primary appearance-none cursor-pointer hover:border-white/20 transition-colors"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>4</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Socket Selection */}
              <div>
                <label className="block text-sm text-text-dark-secondary mb-2">Socket</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="px-4 py-2 bg-violet-500/20 text-violet-400 text-sm rounded-lg border border-violet-500/20">
                    All
                  </button>
                  <button className="px-4 py-2 bg-background-elevated-dark text-text-dark-secondary text-sm rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                    PCIe
                  </button>
                  <button className="px-4 py-2 bg-background-elevated-dark text-text-dark-secondary text-sm rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                    SXM5
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="relative">
                <label className="block text-sm text-text-dark-secondary mb-2">Location</label>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'summary-location' ? null : 'summary-location')}
                  className={`w-full flex items-center justify-between px-4 py-2 bg-background-elevated-dark border rounded-lg transition-colors ${
                    activeDropdown === 'summary-location'
                      ? 'border-lime-400 text-lime-400'
                      : 'border-white/10 text-text-dark-secondary hover:text-text-dark-primary'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {selectedLocation.icon}
                    <span className="text-sm">{selectedLocation.label}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    activeDropdown === 'summary-location' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                <FilterDropdown
                  isOpen={activeDropdown === 'summary-location'}
                  options={locations}
                  selectedValue={selectedLocation}
                  onSelect={(option) => {
                    setSelectedLocation(option);
                    setActiveDropdown(null);
                  }}
                  onClose={() => setActiveDropdown(null)}
                  position="relative"
                />
              </div>

              {/* Security Standards */}
              <div>
                <label className="block text-sm text-text-dark-secondary mb-2">Security Standards</label>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'summary-security' ? null : 'summary-security')}
                  className={`w-full flex items-center justify-between px-4 py-2 bg-background-elevated-dark border rounded-lg transition-colors ${
                    activeDropdown === 'summary-security'
                      ? 'border-lime-400 text-lime-400'
                      : 'border-white/10 text-text-dark-secondary hover:text-text-dark-primary'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {selectedSecurity.icon}
                    <span className="text-sm">{selectedSecurity.label}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    activeDropdown === 'summary-security' ? 'rotate-180' : ''
                  }`} />
                </button>

                <FilterDropdown
                  isOpen={activeDropdown === 'summary-security'}
                  options={securityStandards}
                  selectedValue={selectedSecurity}
                  onSelect={(option) => {
                    setSelectedSecurity(option);
                    setActiveDropdown(null);
                  }}
                  onClose={() => setActiveDropdown(null)}
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm text-text-dark-secondary mb-2">Image</label>
                <button
                  onClick={() => setIsTemplatesModalOpen(true)}
                  className="w-full flex items-center justify-between px-4 py-2 bg-background-elevated-dark border border-white/10 rounded-lg text-sm text-text-dark-secondary hover:text-text-dark-primary hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4" />
                    <span>PyTorch 2.2</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {/* Compute Types */}
              <div>
                <label className="block text-sm text-text-dark-secondary mb-2">Compute types</label>
                <div className="flex items-center justify-between px-4 py-2 bg-background-elevated-dark border border-white/10 rounded-lg">
                  <span className="text-sm text-text-dark-secondary">Show Spot Instances</span>
                  <Switch />
                </div>
              </div>

              {/* Price Summary */}
              <div className="mt-8 p-4 bg-background-elevated-dark rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-dark-secondary">Lowest GPU Price</span>
                  <div>
                    <span className="text-lg font-medium text-lime-400">$1.55</span>
                    <span className="text-sm text-text-dark-secondary">/hr</span>
                  </div>
                </div>
                <div className="text-xs text-text-dark-secondary text-right">
                  ~$37.30 per day
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-4 mt-8">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-background-elevated-dark text-text-dark-secondary hover:text-text-dark-primary border border-white/10 hover:border-white/20 rounded-lg transition-colors text-sm"
                >
                  Reset
                </button>

                <button
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-lime-400 hover:bg-lime-500 text-black rounded-lg transition-colors text-sm font-medium"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
