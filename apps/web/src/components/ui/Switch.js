"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Switch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <motion.button
      onClick={() => setEnabled(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        enabled ? 'bg-lime-400' : 'bg-white/10'
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );
} 