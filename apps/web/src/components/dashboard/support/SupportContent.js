"use client";
import { motion } from "framer-motion";
import { MessageSquare, Mail, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ChatModal from './chat/ChatModal';
import QuickHelp from './QuickHelp';

export default function SupportContent() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="w-full space-y-6">
      {/* Support Options Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Chat Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background-elevated-dark rounded-lg p-6"
        >
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-lime-400/10 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-5 w-5 text-lime-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-medium text-text-dark-primary mb-1">Live Chat Support</h2>
              <p className="text-sm text-text-dark-secondary mb-4">
                Get instant help from our support team. We typically respond within 2 hours.
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-lime-400 hover:bg-lime-500 text-black rounded-lg transition-colors text-sm font-medium"
                >
                  Start Chat
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 text-xs text-text-dark-secondary">
                  <Clock className="h-4 w-4" />
                  <span>Response in ~2h</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Email Support Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-background-elevated-dark rounded-lg p-6"
        >
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
              <Mail className="h-5 w-5 text-text-dark-secondary" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-medium text-text-dark-primary mb-1">Email Support</h2>
              <p className="text-sm text-text-dark-secondary mb-4">
                Send us a detailed message and we&apos;ll get back to you within 24 hours.
              </p>
              <a 
                href="mailto:contact@afarensis.com"
                className="inline-flex items-center gap-2 text-sm text-text-dark-secondary hover:text-lime-400 transition-colors"
              >
                contact@afarensis.com
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Help Section */}
      <QuickHelp />

      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
} 