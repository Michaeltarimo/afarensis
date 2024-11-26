"use client";
import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Search, X, Clock, Cpu, Sparkles, Filter, Send, Bot, User, ArrowRight } from 'lucide-react';

const SearchModal = ({ isOpen, closeModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isAiMode, setIsAiMode] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [aiConversation, setAiConversation] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const recentSearches = [
    'NVIDIA A100',
    'AWS P4d instances',
    'Multi-GPU setup',
    'RTX 4090 instances'
  ];

  const mockSearchResults = [
    {
      title: 'NVIDIA A100 GPU Instance',
      provider: 'AWS',
      price: '$0.85/hr',
      specs: '80GB Memory, PCIe 4.0',
      availability: 'Available Now'
    },
    {
      title: 'Tesla V100 Instance',
      provider: 'GCP',
      price: '$0.74/hr',
      specs: '32GB Memory, NVLink',
      availability: 'Available Now'
    },
    // Add more mock results...
  ];

  const suggestedFilters = [
    { id: 'provider', name: 'Provider', options: ['AWS', 'GCP', 'Azure'] },
    { id: 'memory', name: 'Memory', options: ['16GB', '24GB', '32GB', '80GB'] },
    { id: 'availability', name: 'Availability', options: ['Available Now', 'Coming Soon'] },
    { id: 'price', name: 'Price Range', options: ['$0-1/hr', '$1-5/hr', '$5+/hr'] }
  ];

  // Handle regular search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (isAiMode) {
      // Handle AI chat
      setAiConversation(prev => [...prev, { type: 'user', content: searchQuery }]);
      setIsAiTyping(true);
      setTimeout(() => {
        const aiResponse = {
          type: 'assistant',
          content: `Based on your query "${searchQuery}", here are some recommendations:
          
1. For GPU compute tasks, I recommend checking out our AWS P4d instances with NVIDIA A100 GPUs.
2. Current pricing starts at $0.85/hour with spot instances available.
3. These instances are ideal for ML training and inference workloads.

Would you like me to help you configure an instance?`,
        };
        setAiConversation(prev => [...prev, aiResponse]);
        setIsAiTyping(false);
        setSearchQuery('');
      }, 1500);
    } else {
      // Handle instant search
      setSearchResults(mockSearchResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  };

  // Handle live search as user types (only in search mode)
  useEffect(() => {
    if (!isAiMode && searchQuery) {
      const results = mockSearchResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchQuery, isAiMode]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 sm:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-background-light dark:bg-background-dark p-6 shadow-2xl transition-all">
                {/* Mode Toggle */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setIsAiMode(!isAiMode)}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm bg-lime-400/10 text-lime-400 hover:bg-lime-400/20 transition-colors"
                  >
                    {isAiMode ? <Search className="h-4 w-4 mr-2" /> : <Bot className="h-4 w-4 mr-2" />}
                    <span>{isAiMode ? 'Switch to Search' : 'Switch to AI Assistant'}</span>
                  </button>
                </div>

                {/* Search Header */}
                <form onSubmit={handleSearch} className="relative">
                  <div className="flex items-center border-2 border-lime-400/20 focus-within:border-lime-400 rounded-lg transition-colors">
                    {isAiMode ? (
                      <Bot className="h-5 w-5 ml-3 text-lime-400" />
                    ) : (
                      <Search className="h-5 w-5 ml-3 text-gray-400" />
                    )}
                    <input
                      type="text"
                      className="w-full px-3 py-3 bg-transparent text-text-primary dark:text-text-dark-primary placeholder-gray-400 focus:outline-none"
                      placeholder={isAiMode ? "Ask AI anything about GPU instances..." : "Search GPU instances..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && isAiMode && (
                      <button
                        type="submit"
                        className="p-2 mr-1 text-lime-400 hover:bg-lime-400/10 rounded-lg transition-colors"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={closeModal}
                      className="p-2 mr-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </form>

                <div className="mt-6 space-y-6">
                  {/* AI Chat Mode */}
                  {isAiMode && (
                    <div className="space-y-4">
                      {aiConversation.map((message, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-3 ${
                            message.type === 'user' ? 'justify-end' : ''
                          }`}
                        >
                          {message.type === 'assistant' && (
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-lime-400/10 flex items-center justify-center">
                              <Bot className="h-5 w-5 text-lime-400" />
                            </div>
                          )}
                          <div
                            className={`max-w-[80%] rounded-lg p-4 ${
                              message.type === 'user'
                                ? 'bg-lime-400/10 text-text-primary dark:text-text-dark-primary'
                                : 'bg-background-elevated-light dark:bg-background-elevated-dark'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                          </div>
                          {message.type === 'user' && (
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-lime-400/10 flex items-center justify-center">
                              <User className="h-5 w-5 text-lime-400" />
                            </div>
                          )}
                        </div>
                      ))}
                      {isAiTyping && (
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-lime-400/10 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-lime-400" />
                          </div>
                          <div className="bg-background-elevated-light dark:bg-background-elevated-dark rounded-lg p-4">
                            <div className="flex space-x-2">
                              <span className="w-2 h-2 bg-lime-400 rounded-full animate-bounce" />
                              <span className="w-2 h-2 bg-lime-400 rounded-full animate-bounce delay-100" />
                              <span className="w-2 h-2 bg-lime-400 rounded-full animate-bounce delay-200" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Search Results Mode */}
                  {!isAiMode && searchQuery && (
                    <div className="space-y-4">
                      {searchResults.map((result, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg bg-background-elevated-light dark:bg-background-elevated-dark hover:bg-lime-50 dark:hover:bg-lime-900/20 transition-colors cursor-pointer group"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-text-primary dark:text-text-dark-primary">
                              {result.title}
                            </h4>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-text-secondary dark:text-text-dark-secondary">
                              <span>{result.provider}</span>
                              <span>{result.price}</span>
                              <span>{result.specs}</span>
                              <span className="text-lime-400">{result.availability}</span>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-lime-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Show these sections only when no search or conversation is active */}
                  {!searchQuery && !aiConversation.length && (
                    <>
                      {/* Recent Searches */}
                      <div>
                        <h3 className="text-sm font-medium text-text-secondary dark:text-text-dark-secondary mb-3 flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Recent Searches
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search) => (
                            <button
                              key={search}
                              onClick={() => setSearchQuery(search)}
                              className="px-3 py-1.5 text-sm bg-background-elevated-light dark:bg-background-elevated-dark rounded-lg hover:bg-lime-50 dark:hover:bg-lime-900/20 transition-colors"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Filters */}
                      <div>
                        <h3 className="text-sm font-medium text-text-secondary dark:text-text-dark-secondary mb-3 flex items-center">
                          <Filter className="h-4 w-4 mr-2" />
                          Filters
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {suggestedFilters.map((filter) => (
                            <div key={filter.id} className="space-y-2">
                              <h4 className="text-sm font-medium">{filter.name}</h4>
                              <select className="w-full text-sm bg-background-elevated-light dark:bg-background-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5">
                                <option value="">Any</option>
                                {filter.options.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-text-secondary dark:text-text-dark-secondary">
                      <Cpu className="h-4 w-4" />
                      <span>Press</span>
                      <kbd className="px-2 py-1 bg-background-elevated-light dark:bg-background-elevated-dark rounded-lg">⌘</kbd>
                      <span>+</span>
                      <kbd className="px-2 py-1 bg-background-elevated-light dark:bg-background-elevated-dark rounded-lg">K</kbd>
                      <span>to search anytime</span>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SearchModal; 