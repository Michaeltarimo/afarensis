"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Building2, Mail, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const resourceOptions = [
  {
    id: 'basic',
    label: 'Basic',
    specs: {
      gpuLimit: '5 GPUs',
      storage: '100GB',
      support: 'Standard'
    },
    recommended: 'For small ML teams'
  },
  {
    id: 'professional',
    label: 'Professional',
    specs: {
      gpuLimit: '20 GPUs',
      storage: '500GB',
      support: 'Priority'
    },
    recommended: 'For research teams'
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    specs: {
      gpuLimit: 'Unlimited',
      storage: '2TB+',
      support: '24/7 Dedicated'
    },
    recommended: 'For large organizations'
  }
];

const billingOptions = [
  {
    id: 'pay-as-you-go',
    label: 'Pay As You Go',
    description: 'Pay only for what you use'
  },
  {
    id: 'prepaid',
    label: 'Prepaid Credits',
    description: 'Buy credits in advance at a discount'
  },
  {
    id: 'enterprise',
    label: 'Enterprise Agreement',
    description: 'Custom billing with committed spend'
  }
];

const providerPreferences = {
  preferred: ['AWS', 'GCP', 'Azure', 'Lambda', 'RunPod', 'Vast.ai'],
  regions: ['US-East', 'US-West', 'EU-West', 'EU-Central', 'Asia-Pacific', 'South America']
};

export default function CreateTeamForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    logo: '',
    description: '',
    size: 'small',
    resourcePlan: 'basic',
    billingType: 'pay-as-you-go',
    providers: [],
    regions: []
  });

  const [logoPreview, setLogoPreview] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setFormData(prev => ({ ...prev, logo: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const toggleProvider = (provider) => {
    setFormData(prev => ({
      ...prev,
      providers: prev.providers.includes(provider)
        ? prev.providers.filter(p => p !== provider)
        : [...prev.providers, provider]
    }));
  };

  const toggleRegion = (region) => {
    setFormData(prev => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter(r => r !== region)
        : [...prev.regions, region]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-background-elevated-dark rounded-lg p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Logo Upload Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative group cursor-pointer mb-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="cursor-pointer"
              >
                <div className="h-24 w-24 rounded-2xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center group-hover:border-lime-400 transition-colors">
                  {logoPreview ? (
                    <Image
                      src={logoPreview}
                      alt="Team logo"
                      width={96}
                      height={96}
                      className="rounded-2xl object-cover"
                    />
                  ) : (
                    <Upload className="h-6 w-6 text-text-dark-secondary group-hover:text-lime-400 transition-colors" />
                  )}
                </div>
              </label>
              <p className="text-xs text-text-dark-secondary text-center mt-2">
                Upload team logo
              </p>
            </div>
          </div>

          {/* Team Details */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-text-dark-secondary mb-2">
                  Team Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-2.5 text-text-dark-primary focus:border-lime-400 outline-none pl-10"
                    placeholder="Enter team name"
                    required
                  />
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-text-dark-secondary" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-text-dark-secondary mb-2">
                  Team Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-2.5 text-text-dark-primary focus:border-lime-400 outline-none pl-10"
                    placeholder="team@company.com"
                    required
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-text-dark-secondary" />
                </div>
                <p className="text-xs text-text-dark-secondary mt-1.5">
                  This email will be used for billing and important notifications
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm text-text-dark-secondary mb-2">
                Team Size
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'small', label: 'Small Team', desc: '1-10 members' },
                  { id: 'medium', label: 'Medium Team', desc: '11-50 members' },
                  { id: 'enterprise', label: 'Enterprise', desc: '50+ members' }
                ].map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, size: size.id }))}
                    className={`p-4 rounded-lg border-2 text-left hover:bg-white/5 transition-all ${
                      formData.size === size.id
                        ? 'border-lime-400 bg-lime-400/5'
                        : 'border-white/10'
                    }`}
                  >
                    <Users className={`h-5 w-5 mb-2 ${
                      formData.size === size.id ? 'text-lime-400' : 'text-text-dark-secondary'
                    }`} />
                    <div className="text-sm font-medium text-text-dark-primary">
                      {size.label}
                    </div>
                    <div className="text-xs text-text-dark-secondary mt-1">
                      {size.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-text-dark-secondary mb-2">
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-2.5 text-text-dark-primary focus:border-lime-400 outline-none min-h-[100px] resize-none"
                placeholder="Brief description of your team"
              />
            </div>
          </div>

          {/* Resource Allocation */}
          <div>
            <h3 className="text-base font-medium text-text-dark-primary mb-4">
              Resource Allocation
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {resourceOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, resourcePlan: option.id }))}
                  className={`p-6 rounded-lg border-2 text-left hover:bg-white/5 transition-all ${
                    formData.resourcePlan === option.id
                      ? 'border-lime-400 bg-lime-400/5'
                      : 'border-white/10'
                  }`}
                >
                  <div className="text-sm font-medium text-text-dark-primary mb-2">
                    {option.label}
                  </div>
                  <div className="space-y-2">
                    {Object.entries(option.specs).map(([key, value]) => (
                      <div key={key} className="flex items-center text-xs text-text-dark-secondary">
                        <span className="w-20">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-lime-400 mt-4">
                    {option.recommended}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Billing Preferences */}
          <div>
            <h3 className="text-base font-medium text-text-dark-primary mb-4">
              Billing Setup
            </h3>
            <div className="space-y-4">
              {billingOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, billingType: option.id }))}
                  className={`w-full p-4 rounded-lg border text-left hover:bg-white/5 transition-all ${
                    formData.billingType === option.id
                      ? 'border-lime-400'
                      : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-text-dark-primary">
                        {option.label}
                      </div>
                      <div className="text-xs text-text-dark-secondary mt-1">
                        {option.description}
                      </div>
                    </div>
                    {/* Add pricing info or other relevant details */}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Provider Preferences */}
          <div>
            <h3 className="text-base font-medium text-text-dark-primary mb-4">
              Provider Preferences
            </h3>
            <div className="space-y-6">
              {/* Preferred Providers */}
              <div>
                <label className="text-sm text-text-dark-secondary mb-2 block">
                  Preferred Providers
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {providerPreferences.preferred.map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => toggleProvider(provider)}
                      className={`p-3 border rounded-lg transition-all ${
                        formData.providers.includes(provider)
                          ? 'border-lime-400 bg-lime-400/5 text-lime-400'
                          : 'border-white/10 hover:bg-white/5 text-text-dark-secondary'
                      }`}
                    >
                      <span className="text-sm">
                        {provider}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Regions */}
              <div>
                <label className="text-sm text-text-dark-secondary mb-2 block">
                  Preferred Regions
                </label>
                <div className="flex flex-wrap gap-3">
                  {providerPreferences.regions.map((region) => (
                    <button
                      key={region}
                      type="button"
                      onClick={() => toggleRegion(region)}
                      className={`px-3 py-1.5 border rounded-lg text-xs transition-all ${
                        formData.regions.includes(region)
                          ? 'border-lime-400 bg-lime-400/5 text-lime-400'
                          : 'border-white/10 hover:bg-white/5 text-text-dark-secondary'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6">
            <button
              type="button"
              className="px-4 py-2 text-sm text-text-dark-secondary hover:text-lime-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-lime-400 hover:bg-lime-500 text-black rounded-lg transition-colors text-sm font-medium"
            >
              Create Team
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 