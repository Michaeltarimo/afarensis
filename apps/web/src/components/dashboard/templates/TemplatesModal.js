"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Check } from 'lucide-react';
import Image from 'next/image';

const templates = [
  {
    id: 'ubuntu-22-cuda-12',
    logo: 'ubuntu-logo.svg',
    name: 'UBUNTU 22, CUDA 12',
    description: 'Base image running Ubuntu 22 and CUDA 12. Ideal for devs who prefer to customize their environment. Fastest spin up times.',
    tag: 'base_image'
  },
  {
    id: 'pytorch-2-2',
    logo: 'pytorch-logo.svg',
    name: 'CUDA 12.1, Pytorch 2.2',
    description: 'Docker image with PyTorch 2.2.2 and CUDA 12.1, ready for PyTorch model development.',
    tag: 'pytorch/pytorch:2.2.2-cuda12.1-cudnn8-runtime'
  },
  {
    id: 'pytorch-2-1',
    logo: 'pytorch-logo.svg',
    name: 'CUDA 11.8, Pytorch 2.1',
    description: 'Docker image with PyTorch 2.1.2 and CUDA 11.8, ready for PyTorch model development.',
    tag: 'pytorch/pytorch:2.1.2-cuda11.8-cudnn8-runtime'
  },
  {
    id: 'pytorch-2-3',
    logo: 'pytorch-logo.svg',
    name: 'CUDA 12.1, Pytorch 2.3',
    description: 'Docker image with PyTorch 2.3.1 and CUDA 12.1, ready for PyTorch model development.',
    tag: 'pytorch/pytorch:2.3.1-cuda12.1-cudnn8-runtime'
  },
  {
    id: 'pytorch-2-4',
    logo: 'pytorch-logo.svg',
    name: 'CUDA 12.1, Pytorch 2.4',
    description: 'Docker image with PyTorch 2.4.0 and CUDA 12.1, ready for PyTorch model development.',
    tag: 'pytorch/pytorch:2.4.0-cuda12.1-cudnn8-runtime'
  },
  {
    id: 'pytorch-2-4-cuda',
    logo: 'pytorch-logo.svg',
    name: 'CUDA 12.4, Pytorch 2.4',
    description: 'Docker image with PyTorch 2.4.0 and CUDA 12.4.1, ready for PyTorch model development.',
    tag: 'pytorch/pytorch:2.4.0-cuda12.4.1-cudnn8-runtime'
  },
  {
    id: 'stable-diffusion',
    logo: 'a1111-logo.svg',
    name: 'Stable Diffusion Web UI',
    description: 'Docker image running Stable Diffusion Web UI to immediately start generating stunning generative AI images.',
    tag: 'primeintellect/stable-diffusion'
  },
  {
    id: 'flux-comfy',
    logo: 'black-forst-labs-logo.svg',
    name: 'Flux ComfyUI',
    description: 'Docker image running Flux ComfyUI to immediately start generating state-of-the-art AI images.',
    tag: 'primeintellect/flux',
    comingSoon: true
  },
  {
    id: 'axolotl',
    logo: 'ubuntu-logo.svg',
    name: 'Axolotl',
    description: 'Docker Image running Axolotl, the best library to start fine-tuning various AI models.',
    tag: 'winglian/axolotl'
  },
  {
    id: 'bittensor',
    logo: 'bittensor-logo.svg',
    name: 'Bittensor',
    description: 'Docker Image running the Bittensor CLI to immediately start mining or validating on the Bittensor network.',
    tag: 'opentensorfdn/bittensor'
  },
  {
    id: 'open-diloco',
    logo: 'prime-logo-light.svg',
    name: 'Prime Intellect - OpenDiLoCo',
    description: 'Join the Prime Intellect distributed low-communication (DiLoCo) training with this Docker image.',
    tag: 'primeintellect/open_diloco',
    comingSoon: true
  },
  {
    id: 'llama-petals',
    logo: 'prime-logo-light.svg',
    name: 'Prime Intellect - Petals Llama 400B',
    description: 'Join the Prime Intellect distributed Petals Swarms for the inference of Meta\'s latest Llama 400B model.',
    tag: 'primeintellect/llama-3-405b-petal',
    comingSoon: true
  },
  {
    id: 'vllm-llama-8b',
    logo: 'prime-logo-light.svg',
    name: 'VLLM Inference of Llama-3.1-8B-Instruct',
    description: 'Deploy your personal API instance of Llama3.1 8B Instruct via the VLLM inference library.',
    tag: 'primeintellect/vllm-llama-3-1-8b-instruct'
  },
  {
    id: 'vllm-llama-70b',
    logo: 'prime-logo-light.svg',
    name: 'VLLM Inference of Llama-3.1-70B-Instruct',
    description: 'Deploy your personal API instance of Llama3.1 70B Instruct via the VLLM inference library.',
    tag: 'primeintellect/vllm-llama-3-1-70b-instruct'
  },
  {
    id: 'vllm-llama-405b',
    logo: 'prime-logo-light.svg',
    name: 'VLLM Inference of Llama-3.1-405B-Instruct',
    description: 'Deploy your personal API instance of Llama3.1 405B Instruct via the VLLM inference library.',
    tag: 'primeintellect/vllm-llama-3-1-405b-instruct'
  },
  {
    id: 'intellect-1',
    logo: 'prime-logo-light.svg',
    name: 'INTELLECT-1',
    description: 'Join the first globally distributed training of a 10B parameter model to advance open-source AI. Note: Your profile information will be visible on the public dashboard.',
    tag: 'primeintellect/intellect-1'
  }
];

const TemplateCard = ({ template, isSelected, onSelect }) => (
  <motion.button
    onClick={() => onSelect(template.id)}
    className={`group relative p-4 bg-background-elevated-dark rounded-lg text-left transition-all w-full overflow-hidden ${
      isSelected 
        ? 'border-2 border-lime-400 bg-lime-400/[0.03]' 
        : 'border border-white/10 hover:border-lime-400/50'
    }`}
    whileHover={{ y: -2 }}
    whileTap={{ y: 0 }}
    layout
  >
    {/* Selection Indicator */}
    <div className="absolute top-4 right-4">
      <div className={`
        w-6 h-6 rounded-full flex items-center justify-center
        transition-all duration-200
        ${isSelected 
          ? 'bg-lime-400 border-2 border-lime-400' 
          : 'bg-white/5 border border-white/10'
        }
      `}>
        <motion.div
          initial={false}
          animate={{
            scale: isSelected ? 1 : 0.5,
            opacity: isSelected ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          <Check className={`h-3.5 w-3.5 ${
            isSelected 
              ? 'text-black' 
              : 'text-text-dark-secondary/20'
          }`} />
        </motion.div>
      </div>
    </div>

    {/* Background Glow Effect */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-lime-400/0 via-lime-400/5 to-lime-400/0 opacity-0 group-hover:opacity-100 transition-opacity"
      initial={false}
      animate={{ 
        opacity: isSelected ? 0.1 : 0,
        scale: isSelected ? 1.05 : 1
      }}
      transition={{ duration: 0.3 }}
    />

    <div className="relative flex items-start gap-3">
      {/* Logo */}
      <div className="relative h-10 w-10 flex-shrink-0 rounded-lg bg-white/5 p-2 border border-white/10 group-hover:border-white/20 transition-colors">
        <Image
          src={`/clusterimages/${template.logo}`}
          alt={template.name}
          fill
          className="object-contain p-1"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-text-dark-primary group-hover:text-lime-400 transition-colors">
            {template.name}
          </h3>
          {template.comingSoon && (
            <motion.span 
              className="px-2 py-0.5 text-[10px] font-medium bg-white/5 text-text-dark-secondary rounded-full border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              COMING SOON
            </motion.span>
          )}
        </div>
        <p className="mt-1 text-sm text-text-dark-secondary group-hover:text-text-dark-primary/80 transition-colors">
          {template.description}
        </p>
        <div className="mt-3 px-3 py-2 bg-black/20 rounded-lg text-xs font-mono text-text-dark-secondary/75 border border-white/5 group-hover:border-white/10 transition-colors">
          {template.tag}
        </div>
      </div>
    </div>

    {/* Hover Indicator */}
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ 
        scaleX: isSelected ? 1 : 0,
        opacity: isSelected ? 1 : 0
      }}
      transition={{ duration: 0.2 }}
    />
  </motion.button>
);

export default function TemplatesModal({ isOpen, onClose, onSelect, selectedTemplate }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-8 bg-background-dark rounded-lg border border-white/10 z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-lg font-medium text-text-dark-primary">
                  Find a template to deploy
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-text-dark-secondary" />
                </button>
              </div>

              {/* Search */}
              <div className="p-6 border-b border-white/10">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search templates..."
                    className="w-full bg-background-elevated-dark border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-text-dark-primary placeholder:text-text-dark-secondary focus:border-lime-400 outline-none"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-dark-secondary" />
                </div>
              </div>

              {/* Templates Grid */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <div className="grid grid-cols-2 gap-4">
                  {filteredTemplates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      isSelected={selectedTemplate === template.id}
                      onSelect={onSelect}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 