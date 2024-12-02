"use client";
import { motion } from "framer-motion";
import { FileText, Download } from 'lucide-react';

export default function WalletTopUps() {
  const headers = [
    { title: "Date", width: "20%" },
    { title: "Amount", width: "20%" },
    { title: "Type", width: "20%" },
    { title: "Platform", width: "20%" },
    { title: "Invoice", width: "20%" },
  ];

  const transactions = [
    {
      date: "Dec 1, 2023",
      amount: "$100.00",
      type: "Credit Card",
      platform: "Stripe",
      invoice: "INV-2023120101"
    },
    {
      date: "Nov 28, 2023",
      amount: "$75.00",
      type: "Credit Card",
      platform: "Stripe",
      invoice: "INV-2023112801"
    },
    {
      date: "Nov 25, 2023",
      amount: "$200.00",
      type: "Credit Card",
      platform: "Stripe",
      invoice: "INV-2023112501"
    },
    {
      date: "Nov 22, 2023",
      amount: "$150.00",
      type: "Credit Card",
      platform: "Stripe",
      invoice: "INV-2023112201"
    }
  ];

  const handleDownload = (invoice) => {
    console.log(`Downloading invoice ${invoice}`);
  };

  return (
    <div className="bg-background-elevated-dark rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <h2 className="text-lg font-medium text-text-dark-primary">
          Wallet Top Ups
        </h2>
      </div>

      {/* Table Headers */}
      <div className="px-6 py-3 border-b border-white/5">
        <div className="flex">
          {headers.map((header) => (
            <div
              key={header.title}
              className="text-xs font-medium text-text-dark-secondary"
              style={{ width: header.width }}
            >
              {header.title}
            </div>
          ))}
        </div>
      </div>

      {/* Table Content */}
      {transactions.length > 0 ? (
        <div className="divide-y divide-white/5">
          {transactions.map((transaction) => (
            <div 
              key={transaction.invoice} 
              className="px-6 py-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-[20%] text-sm text-text-dark-primary">
                  {transaction.date}
                </div>
                <div className="w-[20%] text-sm font-medium text-lime-400">
                  {transaction.amount}
                </div>
                <div className="w-[20%] text-sm text-text-dark-secondary">
                  {transaction.type}
                </div>
                <div className="w-[20%] text-sm text-text-dark-secondary">
                  {transaction.platform}
                </div>
                <div className="w-[20%] flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(transaction.invoice)}
                    className="group flex items-center gap-2 hover:bg-lime-400/10 px-2 py-1 rounded transition-colors"
                  >
                    <FileText className="h-4 w-4 text-text-dark-secondary group-hover:text-lime-400 transition-colors" />
                    <span className="text-sm text-text-dark-secondary group-hover:text-lime-400 transition-colors">
                      {transaction.invoice}
                    </span>
                    <Download className="h-3.5 w-3.5 text-text-dark-secondary group-hover:text-lime-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-6 py-12 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-text-dark-secondary mb-2">
            There are no transactions yet.
          </p>
          <p className="text-xs text-text-dark-secondary">
            Add credits to your Prime Intellect account.
          </p>
        </div>
      )}
    </div>
  );
} 