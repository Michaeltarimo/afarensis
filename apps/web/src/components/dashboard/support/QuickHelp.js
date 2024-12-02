"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const faqs = [
  {
    id: 'deploy',
    question: "How to deploy my first GPU instance?",
    answer: `To deploy your first GPU instance:
    1. Navigate to the Deploy page
    2. Select your preferred GPU model
    3. Choose a provider
    4. Configure your instance settings
    5. Click Deploy to launch your instance`,
    relatedTopics: [
      "Understanding instance types",
      "Provider selection guide",
      "SSH key configuration"
    ]
  },
  {
    id: 'billing',
    question: "Billing and payment methods",
    answer: `We support various payment methods:
    • Credit/Debit Cards
    • Wire Transfer
    • Crypto payments
    
    Billing is handled on a per-minute basis, and you can set spending limits to control costs.`,
    relatedTopics: [
      "Setting spending limits",
      "Usage monitoring",
      "Invoice generation"
    ]
  },
  {
    id: 'ssh',
    question: "SSH key configuration",
    answer: `SSH keys are required for secure instance access:
    1. Go to your Profile settings
    2. Navigate to SSH Keys section
    3. Download or generate your keys
    4. Use these keys when deploying instances`,
    relatedTopics: [
      "Key management",
      "Security best practices",
      "Instance access guide"
    ]
  },
  {
    id: 'providers',
    question: "Provider selection guide",
    answer: `Choose the right provider based on:
    • Location and latency requirements
    • GPU availability
    • Pricing
    • Specific workload needs
    
    Each provider has unique advantages for different use cases.`,
    relatedTopics: [
      "Provider comparison",
      "Regional availability",
      "Performance benchmarks"
    ]
  }
];

const QuestionDetail = ({ faq, onBack }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-text-dark-secondary hover:text-lime-400 transition-colors text-sm"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to questions
    </button>

    <div>
      <h3 className="text-base font-medium text-text-dark-primary mb-4">
        {faq.question}
      </h3>
      <div className="text-sm text-text-dark-secondary whitespace-pre-line mb-6">
        {faq.answer}
      </div>

      {faq.relatedTopics.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-text-dark-secondary mb-3">
            Related Topics
          </h4>
          <div className="space-y-2">
            {faq.relatedTopics.map((topic) => (
              <button
                key={topic}
                className="w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-text-dark-secondary hover:text-lime-400 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  </motion.div>
);

export default function QuickHelp() {
  const [selectedFaq, setSelectedFaq] = useState(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-background-elevated-dark rounded-lg p-6"
    >
      <h3 className="text-sm font-medium text-text-dark-secondary mb-4">
        Common Questions
      </h3>

      <AnimatePresence mode="wait">
        {selectedFaq ? (
          <QuestionDetail 
            key="detail"
            faq={faqs.find(f => f.id === selectedFaq)} 
            onBack={() => setSelectedFaq(null)}
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {faqs.map((faq) => (
              <button
                key={faq.id}
                onClick={() => setSelectedFaq(faq.id)}
                className="p-4 bg-white/5 rounded-lg text-left hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-text-dark-secondary group-hover:text-lime-400 transition-colors">
                    {faq.question}
                  </span>
                  <ChevronRight className="h-4 w-4 text-text-dark-secondary group-hover:text-lime-400 transition-colors" />
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 