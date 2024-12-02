"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, MessageSquare, Send, X } from 'lucide-react';
import Image from 'next/image';
import ChatInterface from './ChatInterface';

const ChatHome = ({ onStartChat }) => (
  <div className="flex flex-col h-full">
    <div className="flex-1 p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-10 w-10 rounded-full bg-lime-400 flex items-center justify-center">
          <span className="text-sm font-medium text-black">JD</span>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text-dark-primary">Johannes</h3>
          <p className="text-xs text-text-dark-secondary">Customer Support</p>
        </div>
      </div>

      <h2 className="text-lg font-medium text-text-dark-primary mb-2">Hi there 👋</h2>
      <p className="text-sm text-text-dark-secondary mb-6">
        How can we help you succeed?
      </p>

      <button
        onClick={onStartChat}
        className="w-full flex items-center justify-center gap-2 py-3 bg-lime-400 hover:bg-lime-500 text-black rounded-lg transition-colors"
      >
        <MessageSquare className="h-4 w-4" />
        <span className="text-sm font-medium">Send us a message</span>
      </button>

      <p className="text-xs text-text-dark-secondary text-center mt-4">
        We typically reply within 2 hours
      </p>
    </div>
  </div>
);

const ChatMessages = () => {
  const [isChattingStarted, setIsChattingStarted] = useState(false);

  if (isChattingStarted) {
    return <ChatInterface onBack={() => setIsChattingStarted(false)} />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6">
        <h2 className="text-base font-medium text-text-dark-primary mb-6">Messages</h2>
        
        <div className="flex flex-col items-center justify-center h-[300px] text-center">
          <MessageSquare className="h-12 w-12 text-text-dark-secondary/20 mb-4" />
          <p className="text-sm text-text-dark-secondary mb-1">No messages</p>
          <p className="text-xs text-text-dark-secondary/60 mb-6">
            Messages from the team will be shown here
          </p>
          <button 
            onClick={() => setIsChattingStarted(true)}
            className="flex items-center gap-2 px-4 py-2 bg-lime-400/10 hover:bg-lime-400/20 text-lime-400 rounded-lg transition-colors text-sm"
          >
            <Send className="h-4 w-4" />
            <span>Send us a message</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
      isActive 
        ? 'text-lime-400' 
        : 'text-text-dark-secondary hover:text-lime-400'
    }`}
  >
    <Icon className="h-5 w-5" />
    <span className="text-xs">{label}</span>
  </button>
);

export default function ChatModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('home');
  const [isStartingChat, setIsStartingChat] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 w-[380px] bg-background-elevated-dark rounded-xl shadow-2xl border border-white/5 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 relative">
                <Image
                  src="/logo.svg"
                  alt="Afarensis Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-text-dark-primary">
                Afarensis Support
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-text-dark-secondary hover:text-lime-400 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="h-[400px]">
            {activeTab === 'home' ? (
              <ChatHome onStartChat={() => setActiveTab('messages')} />
            ) : (
              <ChatMessages />
            )}
          </div>

          {/* Navigation */}
          <div className="flex border-t border-white/5">
            <NavItem
              icon={Home}
              label="Home"
              isActive={activeTab === 'home'}
              onClick={() => setActiveTab('home')}
            />
            <NavItem
              icon={MessageSquare}
              label="Messages"
              isActive={activeTab === 'messages'}
              onClick={() => setActiveTab('messages')}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 