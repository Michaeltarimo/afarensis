"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import SearchModal from '../search/SearchModal';
import { Search, Menu, X } from 'lucide-react';

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
  const [closedDropdowns, setClosedDropdowns] = useState(new Set());

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

  const navItems = [
    { 
      title: 'Marketplace', 
      href: '/marketplace',
      tooltip: 'Browse GPU Resources' 
    },
    { 
      title: 'Solutions', 
      href: '#',
      tooltip: 'Explore Solutions',
      dropdown: [
        { title: 'AI Training', href: '/solutions/ai-training' },
        { title: 'Machine Learning', href: '/solutions/machine-learning' },
        { title: 'Rendering', href: '/solutions/rendering' },
        { title: 'Scientific Computing', href: '/solutions/scientific-computing' },
        { title: 'Cryptocurrency Mining', href: '/solutions/crypto-mining' },
      ]
    },
    { 
      title: 'Documentation', 
      href: '/docs',
      tooltip: 'Read Documentation'
    },
    { 
      title: 'Company', 
      href: '#',
      tooltip: 'About Our Company',
      dropdown: [
        { title: 'About Us', href: '/about' },
        { title: 'Blog', href: '/blog' },
        { title: 'Careers', href: '/careers' },
        { title: 'Contact', href: '/contact' },
        { title: 'Press Kit', href: '/press' },
      ]
    },
  ];

  const toggleDropdown = (title) => {
    setClosedDropdowns(prev => {
      const newClosed = new Set(prev);
      if (newClosed.has(title)) {
        newClosed.delete(title);
      } else {
        newClosed.add(title);
      }
      return newClosed;
    });
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-background-elevated-light dark:bg-background-elevated-dark border-b border-gray-200 dark:border-gray-800 z-50">
        <div className=" mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Updated Logo */}
            <div className="flex-shrink-0">
              <AnimatedLogo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.title} className="relative group">
                  <Link 
                    href={item.href}
                    className="flex flex-col items-center group relative"
                  >
                    <div className="flex items-center space-x-1 p-2 rounded-lg transition-all duration-300 group-hover:-translate-y-1">
                      <span className="text-text-primary dark:text-text-dark-primary group-hover:text-lime-400 transition-colors">
                        {item.title}
                        {item.dropdown && <span className="ml-1">▾</span>}
                      </span>
                    </div>
                    
                    {/* Tooltip - Only show for items without dropdown */}
                    {!item.dropdown && (
                      <div className="absolute -bottom-12 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
                        {item.tooltip}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
                      </div>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
                      <div className="py-1 rounded-lg overflow-hidden">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.title}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-text-primary dark:text-text-dark-primary hover:bg-lime-50 dark:hover:bg-lime-900/20 transition-colors"
                          >
                            {dropdownItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Items */}
            <div className="hidden lg:flex items-center space-x-6">
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

              {/* Auth Button */}
              <button className="auth-button-animate relative overflow-hidden px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out">
                <span className="relative z-10 text-white">Sign Up</span>
              </button>
            </div>

            {/* Mobile menu button - Updated with Lucide icon */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-lime-400 hover:bg-lime-400/10 transition-all duration-300"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="h-6 w-6 transition-transform duration-300 ease-in-out" />
                ) : (
                  <Menu className="h-6 w-6 transition-transform duration-300 ease-in-out" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden absolute left-0 right-0 bg-background-elevated-light dark:bg-background-elevated-dark border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out transform ${
              isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
            }`}
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.title} className="group">
                  {!item.dropdown ? (
                    <Link
                      href={item.href}
                      className="block px-4 py-2.5 rounded-lg text-text-primary dark:text-text-dark-primary hover:text-lime-400 hover:bg-lime-400/10 transition-all duration-300"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <div className="space-y-1">
                      <button
                        onClick={() => toggleDropdown(item.title)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-text-primary dark:text-text-dark-primary hover:text-lime-400 hover:bg-lime-400/10 transition-all duration-300"
                      >
                        <span>{item.title}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${
                            closedDropdowns.has(item.title) ? '' : 'rotate-180'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {/* Dropdown content with animation */}
                      <div
                        className={`pl-4 ml-4 space-y-1 border-l-2 border-lime-400/20 overflow-hidden transition-all duration-300 ${
                          closedDropdowns.has(item.title)
                            ? 'max-h-0 opacity-0'
                            : 'max-h-96 opacity-100'
                        }`}
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.title}
                            href={dropdownItem.href}
                            className="block px-4 py-2 rounded-lg text-sm text-text-secondary dark:text-text-dark-secondary hover:text-lime-400 hover:bg-lime-400/10 transition-all duration-300"
                          >
                            {dropdownItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Search Button */}
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-4 py-2.5 rounded-lg text-text-secondary dark:text-text-dark-secondary hover:text-lime-400 hover:bg-lime-400/10 transition-all duration-300 mt-2"
              >
                <Search className="h-4 w-4 mr-2" />
                <span>Search GPU/Instance...</span>
              </button>

              {/* Mobile Auth Button */}
              <div className="px-4 pt-2 pb-3">
                <button className="w-full auth-button-animate relative overflow-hidden px-6 py-2.5 rounded-lg text-sm font-medium">
                  <span className="relative z-10 text-white">Sign Up</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <SearchModal 
        isOpen={isSearchOpen}
        closeModal={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;