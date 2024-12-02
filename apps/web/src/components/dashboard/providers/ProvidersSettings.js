"use client";
import ProviderCard from './ProviderCard';

const providers = [
  {
    name: "Prime Intellect",
    logo: "/provider/logos/prime-intellect-logo.svg",
    status: "available"
  },
  {
    name: "RunPod",
    logo: "/provider/logos/runpod-logo.svg",
    status: "available"
  },
  {
    name: "FluidStack",
    logo: "/provider/logos/fluidstack-logo.svg",
    status: "coming"
  },
  {
    name: "Lambda Cloud",
    logo: "/provider/logos/lambdalabs-logo.svg",
    status: "available"
  },
  {
    name: "Hyperstack",
    logo: "/provider/logos/hyperstack-logo.svg",
    status: "available"
  },
  {
    name: "Oblivus",
    logo: "/provider/logos/oblivus-logo.svg",
    status: "available"
  },
  {
    name: "CUDOCOMPUTE",
    logo: "/provider/logos/cudocompute-logo.svg",
    status: "available"
  },
  {
    name: "Scaleway",
    logo: "/provider/logos/scaleway-logo.svg",
    status: "available"
  },
  {
    name: "Tensordock",
    logo: "/provider/logos/tensordock-logo.svg",
    status: "available"
  },
  {
    name: "DATACRUNCH",
    logo: "/provider/logos/datacrunch-logo.svg",
    status: "available"
  },
  {
    name: "Latitude",
    logo: "/provider/logos/latitude-logo.svg",
    status: "available"
  },
  {
    name: "CrusoeCloud",
    logo: "/provider/logos/crusoecloud-logo.svg",
    status: "available"
  }
];

export default function ProvidersSettings() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {providers.map((provider) => (
        <ProviderCard
          key={provider.name}
          name={provider.name}
          logo={provider.logo}
          status={provider.status}
        />
      ))}
    </div>
  );
} 