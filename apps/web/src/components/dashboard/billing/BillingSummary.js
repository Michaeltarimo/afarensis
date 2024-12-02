"use client";
import { motion } from "framer-motion";

export default function BillingSummary() {
  const headers = [
    { title: "Date", width: "20%" },
    { title: "Amount", width: "20%" },
    { title: "Billed Time", width: "20%" },
    { title: "GPU", width: "20%" },
    { title: "Provider", width: "20%" },
  ];

  const billings = [
    {
      date: "Dec 1, 2023",
      amount: "$12.50",
      billedTime: "5h 30m",
      gpu: "RTX 4090",
      provider: "AWS"
    },
    {
      date: "Nov 30, 2023",
      amount: "$8.75",
      billedTime: "3h 45m",
      gpu: "RTX 4080",
      provider: "GCP"
    },
    {
      date: "Nov 29, 2023",
      amount: "$15.20",
      billedTime: "6h 15m",
      gpu: "RTX 4090",
      provider: "AWS"
    }
  ];

  return (
    <div className="bg-background-elevated-dark rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <h2 className="text-lg font-medium text-text-dark-primary">
          Billing Summary
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
      {billings.length > 0 ? (
        <div className="divide-y divide-white/5">
          {billings.map((billing) => (
            <div 
              key={`${billing.date}-${billing.gpu}`}
              className="px-6 py-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-[20%] text-sm text-text-dark-primary">
                  {billing.date}
                </div>
                <div className="w-[20%] text-sm font-medium text-lime-400">
                  {billing.amount}
                </div>
                <div className="w-[20%] text-sm text-text-dark-secondary">
                  {billing.billedTime}
                </div>
                <div className="w-[20%] text-sm text-text-dark-secondary">
                  {billing.gpu}
                </div>
                <div className="w-[20%] text-sm text-text-dark-secondary">
                  {billing.provider}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-6 py-12 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-text-dark-secondary mb-2">
            Your billing history is empty.
          </p>
          <p className="text-xs text-text-dark-secondary">
            Deploy a GPU cluster first.
          </p>
        </div>
      )}
    </div>
  );
} 