"use client";
import Link from 'next/link';
import { Mail, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const topLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Documentation', href: '/docs' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
        { name: 'Status', href: '/status' },
      ]
    }
  ];

  const socialLinks = [
    { 
      icon: <Twitter className="h-5 w-5" />, 
      href: 'https://twitter.com/afarensis',
      label: 'Twitter'
    },
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      href: 'https://linkedin.com/company/afarensis',
      label: 'LinkedIn'
    },
    { 
      icon: <Mail className="h-5 w-5" />, 
      href: 'mailto:contact@afarensis.com',
      label: 'Email'
    }
  ];

  return (
    <footer className="bg-background-elevated-light dark:bg-background-elevated-dark border-t border-gray-200 dark:border-gray-800">
      {/* Top Section */}
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {topLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-text-primary dark:text-text-dark-primary mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary dark:text-text-dark-secondary hover:text-lime-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container py-6">
          {/* Mobile Layout - Show only on mobile */}
          <div className="flex flex-col items-center space-y-4 md:hidden">
            {/* Social Icons - First on mobile */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary dark:text-text-dark-secondary hover:text-lime-400 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Copyright - Second on mobile */}
            <span className="text-sm text-center text-text-secondary dark:text-text-dark-secondary">
              © {new Date().getFullYear()} Afarensis. All rights reserved.
            </span>

            {/* System Status - Last on mobile */}
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
              </span>
              <span className="text-sm text-lime-400">All systems operational</span>
            </div>
          </div>

          {/* Desktop Layout - Hidden on mobile, shown on md and up */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-text-secondary dark:text-text-dark-secondary">
                © {new Date().getFullYear()} Afarensis. All rights reserved.
              </span>
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
                </span>
                <span className="text-sm text-lime-400">All systems operational</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary dark:text-text-dark-secondary hover:text-lime-400 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;