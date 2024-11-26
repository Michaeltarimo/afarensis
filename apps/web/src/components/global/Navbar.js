"use client";
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import SearchModal from '../search/SearchModal';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import AvailabilityRibbon from './AvailabilityRibbon';

const AnimatedLogo = () => {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsCompact(window.innerWidth < 1024); // Changed from 768px to 1024px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <Link href="/" className="flex items-center">
      {isCompact ? (
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-lime-400/10 group overflow-hidden">
          <span className="text-2xl font-bold text-lime-400 group-hover:scale-110 transition-transform duration-300">
            A
          </span>
          {/* Animated border */}
          <div className="absolute inset-0 border-2 border-lime-400/20 rounded-full group-hover:border-lime-400 transition-colors duration-300"></div>
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-lime-400/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* Animated spin effect */}
          <div className="absolute -inset-1 border-2 border-transparent border-t-lime-400/20 rounded-full group-hover:rotate-180 transition-transform duration-700"></div>
        </div>
      ) : (
        <span className="text-2xl font-bold text-lime-400 hover:text-lime-300 transition-colors duration-300">
          Afarensis
        </span>
      )}
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreDropdownRef = useRef(null);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle click outside for More dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const mainNavItems = [
    { 
      title: 'Compute',
      onClick: () => scrollToSection('compute-section')
    },
    { 
      title: 'Intelligence',
      onClick: () => scrollToSection('intelligence-section')
    },
    { 
      title: 'Research',
      onClick: () => scrollToSection('research-section')
    }
  ];

  const moreDropdownItems = {
    column1: [
      { title: 'Documentation', href: '/docs' },
      { title: 'API Reference', href: '/api' },
      { title: 'Pricing', href: '/pricing' },
      { title: 'Status', href: '/status' },
    ],
    column2: [
      { title: 'Blog', href: '/blog' },
      { title: 'About Us', href: '/about' },
      { title: 'Careers', href: '/careers' },
      { title: 'Contact', href: '/contact' },
    ]
  };

  return (
    <div>
      <AvailabilityRibbon />
      <nav className="fixed top-8 w-full bg-background-elevated-light dark:bg-background-elevated-dark border-b border-gray-200 dark:border-gray-800 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <AnimatedLogo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Main Nav Items */}
              {mainNavItems.map((item) => (
                <button
                  key={item.title}
                  onClick={item.onClick}
                  className="text-text-primary dark:text-text-dark-primary hover:text-lime-400 transition-colors"
                >
                  {item.title}
                </button>
              ))}

              {/* More Dropdown */}
              <div className="relative" ref={moreDropdownRef}>
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className="flex items-center space-x-1 text-text-primary dark:text-text-dark-primary hover:text-lime-400 transition-colors"
                >
                  <span>More</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isMoreOpen && (
                  <div className="absolute top-full right-0 mt-2 w-[480px] bg-background-elevated-light dark:bg-background-elevated-dark rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg">
                    <div className="p-4 grid grid-cols-2 gap-4">
                      {/* Column 1 */}
                      <div>
                        {moreDropdownItems.column1.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="block px-4 py-2 rounded-lg hover:bg-lime-400/10 text-text-primary dark:text-text-dark-primary hover:text-lime-400 transition-colors"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                      {/* Column 2 */}
                      <div>
                        {moreDropdownItems.column2.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="block px-4 py-2 rounded-lg hover:bg-lime-400/10 text-text-primary dark:text-text-dark-primary hover:text-lime-400 transition-colors"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="relative group"
              >
                <div className="flex items-center w-[270px] px-4 py-2 text-sm border rounded-lg bg-background-light dark:bg-background-dark text-text-secondary dark:text-text-dark-secondary hover:border-lime-400/50 transition-colors">
                  <Search className="h-4 w-4 mr-3" />
                  <span className="flex-1">Search GPU/Instance...</span>
                  <div className="flex items-center space-x-1 ml-2">
                    <kbd className="hidden sm:block px-1.5 py-0.5 text-xs text-text-secondary dark:text-text-dark-secondary bg-background-elevated-light dark:bg-background-elevated-dark rounded">⌘</kbd>
                    <kbd className="hidden sm:block px-1.5 py-0.5 text-xs text-text-secondary dark:text-text-dark-secondary bg-background-elevated-light dark:bg-background-elevated-dark rounded">K</kbd>
                  </div>
                </div>
              </button>

              {/* Auth Button - Updated with Link */}
              <Link 
                href="/sign-up"
                className="auth-button-animate relative overflow-hidden px-6 py-2 rounded-lg text-sm font-medium"
              >
                <span className="relative z-10 text-white">Sign Up</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-lime-400 hover:bg-lime-400/10 transition-all duration-300"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden absolute left-0 right-0 bg-background-elevated-light dark:bg-background-elevated-dark border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out transform ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-4 py-3 space-y-1">
            {/* Main Navigation Items */}
            {mainNavItems.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-4 py-3 rounded-lg text-text-primary dark:text-text-dark-primary hover:text-lime-400 hover:bg-lime-400/10 transition-all duration-300"
              >
                {item.title}
              </button>
            ))}

            {/* More Dropdown in Mobile */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-text-primary dark:text-text-dark-primary hover:text-lime-400 hover:bg-lime-400/10 transition-all duration-300"
              >
                <span>More</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isMoreOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Collapsible More Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isMoreOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {[...moreDropdownItems.column1, ...moreDropdownItems.column2].map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => {
                      setIsMoreOpen(false);
                      setIsOpen(false);
                    }}
                    className="block px-4 py-2.5 text-sm text-text-secondary dark:text-text-dark-secondary hover:text-lime-400 hover:bg-lime-400/10 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-3 rounded-lg text-text-secondary dark:text-text-dark-secondary hover:text-lime-400 hover:bg-lime-400/10 transition-all duration-300"
            >
              <Search className="h-4 w-4 mr-2" />
              <span>Search GPU/Instance...</span>
            </button>

            {/* Mobile Auth Button - Updated with Link */}
            <div className="px-4 pt-2 pb-3">
              <Link 
                href="/sign-up"
                className="block w-full auth-button-animate relative overflow-hidden px-6 py-3 rounded-lg text-sm font-medium text-center"
              >
                <span className="relative z-10 text-white">Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <SearchModal 
        isOpen={isSearchOpen}
        closeModal={() => setIsSearchOpen(false)}
      />
    </div>
  );
};

export default Navbar;