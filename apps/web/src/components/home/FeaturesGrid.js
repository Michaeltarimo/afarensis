import { Cpu, Zap, Shield, BarChart3 } from 'lucide-react';

const FeaturesGrid = () => {
  return (
    <section className="py-24 bg-background-elevated-light dark:bg-background-elevated-dark">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need for GPU Computing
          </h2>
          <p className="text-text-secondary dark:text-text-dark-secondary max-w-2xl mx-auto">
            Powerful features to help you manage and scale your GPU workloads efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Cpu className="h-6 w-6" />,
              title: 'Instant Access',
              description: 'Deploy GPU instances in seconds with our streamlined provisioning system'
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: 'Auto-scaling',
              description: 'Automatically scale your resources based on workload demands'
            },
            {
              icon: <Shield className="h-6 w-6" />,
              title: 'Enterprise Security',
              description: 'Bank-grade security with end-to-end encryption and compliance'
            },
            {
              icon: <BarChart3 className="h-6 w-6" />,
              title: 'Advanced Analytics',
              description: 'Real-time monitoring and insights for your GPU instances'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-800 hover:border-lime-400/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-lime-400/10 flex items-center justify-center text-lime-400 mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-secondary dark:text-text-dark-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid; 