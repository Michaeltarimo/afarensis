"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Clock } from 'lucide-react';

const MessageStatus = ({ status }) => {
  const statusIcons = {
    sending: <Clock className="h-3 w-3 text-text-dark-secondary/60" />,
    sent: <Check className="h-3 w-3 text-text-dark-secondary/60" />,
    delivered: (
      <div className="flex">
        <Check className="h-3 w-3 text-text-dark-secondary/60" />
        <Check className="h-3 w-3 text-text-dark-secondary/60 -ml-1" />
      </div>
    ),
    read: (
      <div className="flex">
        <Check className="h-3 w-3 text-lime-400" />
        <Check className="h-3 w-3 text-lime-400 -ml-1" />
      </div>
    )
  };

  return statusIcons[status] || null;
};

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg w-fit">
    <motion.div
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.4, repeat: Infinity, times: [0, 0.5, 1] }}
      className="h-1.5 w-1.5 bg-text-dark-secondary rounded-full"
    />
    <motion.div
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.4, delay: 0.2, repeat: Infinity, times: [0, 0.5, 1] }}
      className="h-1.5 w-1.5 bg-text-dark-secondary rounded-full"
    />
    <motion.div
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.4, delay: 0.4, repeat: Infinity, times: [0, 0.5, 1] }}
      className="h-1.5 w-1.5 bg-text-dark-secondary rounded-full"
    />
  </div>
);

const Message = ({ content, isUser, status, timestamp }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
  >
    <div
      className={`max-w-[80%] px-4 py-2 rounded-2xl ${
        isUser 
          ? 'bg-lime-400 text-neutral-900 font-semibold'
          : 'bg-white/10 text-white'
      }`}
    >
      <p className="text-sm">{content}</p>
    </div>
    <div className="flex items-center gap-1.5 mt-1">
      <span className="text-[10px] text-text-dark-secondary">
        {timestamp}
      </span>
      {isUser && <MessageStatus status={status} />}
    </div>
  </motion.div>
);

export default function ChatInterface({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const simulateResponse = async () => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTyping(false);
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      content: "Hi there! Thanks for reaching out. How can I help you today?",
      isUser: false,
      timestamp: "Just now"
    }]);
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      content: inputValue,
      isUser: true,
      status: 'sending',
      timestamp: "Just now"
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        )
      );
    }, 1500);

    simulateResponse();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Area - Added scrollbar-hide */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto scrollbar-hide">
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <TypingIndicator />
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-text-dark-primary placeholder:text-text-dark-secondary focus:border-lime-400 outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim()}
            className="p-2 bg-lime-400 hover:bg-lime-500 disabled:opacity-50 disabled:hover:bg-lime-400 text-black rounded-lg transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 