"use client";
import { motion } from "framer-motion";

const PageHeader = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-white/5"
    >
      <div className="px-8 py-6">
        <h1 className="text-xl font-medium text-text-dark-primary mb-1">
          {title}
        </h1>
        <p className="text-sm text-text-dark-secondary">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default PageHeader; 