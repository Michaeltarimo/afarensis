"use client";
import { useState } from 'react';
import { DollarSign, Edit, Plus, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BalanceCard = ({ title, amount, isSpend = false }) => (
  <div className="bg-background-elevated-dark rounded-lg p-6 mb-4">
    <h3 className="text-sm text-text-dark-secondary mb-2">{title}</h3>
    <div className="flex items-center gap-2">
      <span className="text-2xl font-medium text-text-dark-primary">
        ${amount}
      </span>
      {isSpend && <span className="text-sm text-text-dark-secondary">/hr</span>}
    </div>
  </div>
);

const SpendingCard = () => {
  const [spendLimit, setSpendLimit] = useState('50');

  return (
    <div className="bg-background-elevated-dark rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm text-text-dark-secondary mb-2">Current GPU Spend</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-medium text-text-dark-primary">$0.00</span>
            <span className="text-sm text-text-dark-secondary">/hr</span>
          </div>
        </div>
        <div className="h-10 w-px bg-white/5" />
        <div>
          <div className="flex items-center justify-between gap-8">
            <h3 className="text-sm text-text-dark-secondary">Spend Limit /hr</h3>
            <Edit className="h-4 w-4 text-text-dark-secondary hover:text-lime-400 cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-text-dark-secondary">$</span>
            <input 
              type="number" 
              value={spendLimit}
              onChange={(e) => setSpendLimit(e.target.value)}
              className="bg-transparent border border-white/10 rounded px-3 py-2 text-text-dark-primary w-[120px] focus:border-lime-400 outline-none"
            />
          </div>
        </div>
      </div>
      <button className="w-full bg-lime-400/10 hover:bg-lime-400/20 text-lime-400 py-2 rounded-lg transition-colors">
        Set new limit
      </button>
    </div>
  );
};

const AutoTopUp = () => {
  const [minBalance, setMinBalance] = useState('20');
  const [topUpAmount, setTopUpAmount] = useState('50');

  return (
    <div className="bg-background-elevated-dark rounded-lg p-6">
      <h3 className="text-sm font-medium text-text-dark-primary mb-4">Auto Top Up</h3>
      <div className="flex items-center gap-6 mb-6">
        <div className="flex-1">
          <label className="text-sm text-text-dark-secondary block mb-2">
            When balance falls below
          </label>
          <div className="flex items-center gap-2">
            <span className="text-text-dark-secondary">$</span>
            <input 
              type="number" 
              value={minBalance}
              onChange={(e) => setMinBalance(e.target.value)}
              className="bg-transparent border border-white/10 rounded px-3 py-2 text-text-dark-primary w-full focus:border-lime-400 outline-none"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="text-sm text-text-dark-secondary block mb-2">
            automatically add
          </label>
          <div className="flex items-center gap-2">
            <span className="text-text-dark-secondary">$</span>
            <input 
              type="number" 
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              className="bg-transparent border border-white/10 rounded px-3 py-2 text-text-dark-primary w-full focus:border-lime-400 outline-none"
            />
          </div>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-lime-400/10 hover:bg-lime-400/20 text-lime-400 py-2 rounded-lg transition-colors mb-4">
        <Plus className="h-4 w-4" />
        Configure Auto Top-up
      </button>
      <p className="text-xs text-text-dark-secondary">
        Auto Top-up is not configured yet. Configure auto top up to automatically add funds to your wallet when your wallet balance is low. Use auto top up to prevent unexpected terminations of your instances due to a negative balance.
      </p>
    </div>
  );
};

const CouponSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  return (
    <div className="bg-background-elevated-dark rounded-lg p-6">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 text-left"
      >
        <DollarSign className="h-4 w-4 text-text-dark-secondary" />
        <h3 className="text-sm text-text-dark-secondary hover:text-text-dark-primary transition-colors">
          Enter Coupon Code
        </h3>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-4"
          >
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-dark-secondary">Coupon Code</span>
                  <Edit className="h-3.5 w-3.5 text-text-dark-secondary hover:text-lime-400 cursor-pointer" />
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="w-full bg-transparent border border-white/10 rounded px-3 py-2 text-text-dark-primary text-sm focus:border-lime-400 outline-none pr-24"
                  />
                  <button className="absolute right-1.5 top-1.5 px-4 py-1 bg-lime-400 hover:bg-lime-500 text-black rounded text-xs font-medium transition-colors">
                    Redeem
                  </button>
                </div>
              </div>

              {couponCode && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-2.5 bg-lime-400/5 border border-lime-400/20 rounded"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-lime-400">S9WWsBT3</span>
                      <span className="text-[10px] text-lime-400/60">Valid coupon</span>
                    </div>
                    <span className="text-[10px] text-text-dark-secondary">10% off</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function BalanceSection() {
  return (
    <div className="space-y-6">
      <BalanceCard title="Current Balance" amount="0.00" />
      <button className="w-full bg-lime-400 hover:bg-lime-500 text-black font-medium py-2.5 rounded-lg transition-colors">
        Add Credit
      </button>
      <SpendingCard />
      <CouponSection />
      <AutoTopUp />
    </div>
  );
} 