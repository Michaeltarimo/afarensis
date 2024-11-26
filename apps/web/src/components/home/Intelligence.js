"use client";
import { ArrowRight, Brain, BrainCircuit, FlaskRound, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ModelCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="group relative bg-background-elevated-light dark:bg-background-elevated-dark rounded-lg p-6 border border-gray-200 dark:border-gray-800 hover:border-lime-400/50 transition-all duration-300">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-lime-400/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-lime-400" />
        </div>
        
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <p className="text-text-secondary dark:text-text-dark-secondary text-sm mb-4">
          {description}
        </p>
        
        <button className="flex items-center text-sm text-lime-400 hover:text-lime-300 transition-colors group/btn">
          <span>Contribute</span>
          <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const Intelligence = () => {
  const models = [
    {
      icon: Brain,
      title: "Large language models",
      description: "Training large language models like open source software - with continuous improvements."
    },
    {
      icon: BrainCircuit,
      title: "Agent models",
      description: "Develop open source models with reasoning, interaction and task-completion capabilities to enable intelligent software agents."
    },
    {
      icon: FlaskRound,
      title: "Scientific models",
      description: "Accelerate scientific breakthroughs through training and funding scientific foundation models across different scientific domains."
    }
  ];

  return (
    <section id="intelligence-section" className="py-24 bg-background-light dark:bg-background-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(132,204,22,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl">
          <h3 className="text-sm font-mono text-lime-400 mb-3">INTELLIGENCE</h3>
          <h2 className="text-3xl font-bold mb-4">
            Collectively advancing<br />
            the frontier of co-owned AI models.
          </h2>
        </div>

        {/* Model Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {models.map((model, index) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ModelCard {...model} />
            </motion.div>
          ))}
        </div>

        {/* Apply with your own ideas */}
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <button className="group flex items-center space-x-2 px-6 py-3 rounded-lg border-2 border-lime-400/20 hover:border-lime-400/40 text-text-primary dark:text-text-dark-primary transition-colors">
              <Sparkles className="w-5 h-5 text-lime-400" />
              <span>Apply with your own AI model ideas</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Intelligence; 