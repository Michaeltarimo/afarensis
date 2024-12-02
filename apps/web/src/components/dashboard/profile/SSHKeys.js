"use client";
import { Key, Download } from 'lucide-react';

export default function SSHKeys() {
  const handleDownload = (keyType) => {
    console.log(`Downloading ${keyType} key`);
  };

  return (
    <div className="bg-background-elevated-dark rounded-lg p-6">
      <div className="flex items-center gap-3 mb-2">
        <Key className="h-5 w-5 text-text-dark-secondary" />
        <h2 className="text-base font-semibold text-text-dark-primary">SSH Keys</h2>
      </div>
      
      <p className="text-sm text-text-dark-secondary mb-6">
        Download your SSH Keys to access your GPUs here
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => handleDownload('private')}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
        >
          <span className="text-sm text-text-dark-secondary group-hover:text-lime-400 transition-colors">
            Private Key
          </span>
          <Download className="h-4 w-4 text-text-dark-secondary group-hover:text-lime-400 transition-colors" />
        </button>

        <button
          onClick={() => handleDownload('public')}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
        >
          <span className="text-sm text-text-dark-secondary group-hover:text-lime-400 transition-colors">
            Public Key
          </span>
          <Download className="h-4 w-4 text-text-dark-secondary group-hover:text-lime-400 transition-colors" />
        </button>
      </div>
    </div>
  );
} 