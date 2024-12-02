"use client";
import React from 'react';
import { useSidebar } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { Github, Linkedin, MessageSquare, Twitter } from "lucide-react";

const StatusDot = () => (
  <div className="relative flex items-center gap-1.5">
    <div className="h-1.5 w-1.5 rounded-full bg-lime-400"></div>
    <motion.div 
      className="absolute h-full w-full bg-lime-400 rounded-full animate-ping"
      style={{ scale: 0.8, opacity: 0.2 }}
    />
    <span className="text-[10px] text-text-dark-secondary">Operational</span>
  </div>
);

const SocialLink = ({ href, icon: Icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-text-dark-secondary hover:text-lime-400 transition-colors"
    aria-label={label}
  >
    <Icon className="h-3.5 w-3.5" />
  </a>
);

const DashboardFooter = () => {
  const { open } = useSidebar();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://github.com/afarensis", icon: Github, label: "GitHub" },
    { href: "https://x.com/afarensis", icon: Twitter, label: "X (Twitter)" },
    { href: "https://linkedin.com/company/afarensis", icon: Linkedin, label: "LinkedIn" },
    { href: "https://discord.gg/afarensis", icon: MessageSquare, label: "Discord" },
  ];

  return (
    <motion.div
      className="border-t border-white/5 bg-background-dark/80 backdrop-blur-sm"
      animate={{
        left: open ? "300px" : "80px",
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut"
      }}
    >
      <div className="px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-text-dark-secondary">
            © {currentYear} Afarensis. All rights reserved.
          </span>
          <div className="h-3 w-px bg-white/5" />
          <StatusDot />
        </div>
        
        <div className="flex items-center gap-4">
          {socialLinks.map((link, index) => (
            <React.Fragment key={link.href}>
              <SocialLink {...link} />
              {index < socialLinks.length - 1 && (
                <div className="h-3 w-px bg-white/5" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardFooter; 