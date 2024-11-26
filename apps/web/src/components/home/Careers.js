"use client";
import { ArrowRight, Code, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Careers = () => {
  return (
    <section className="py-24 bg-background-light dark:bg-background-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-lime-400/10 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          {/* Content Container */}
          <div className="max-w-2xl">
            {/* Section Label */}
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-mono text-lime-400 mb-3"
            >
              CAREERS
            </motion.h3>

            {/* Main Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6"
            >
              Join Afarensis
            </motion.h2>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-text-secondary dark:text-text-dark-secondary text-lg mb-8"
            >
              We are seeking the most ambitious developers to join our team. 
              Please send us examples of your exceptional work.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link href="/career" className="group inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-lime-400 hover:bg-lime-500 text-black font-medium transition-colors">
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -right-4 top-0 -translate-y-1/4 flex items-center space-x-4 text-lime-400/20">
              <Code className="w-12 h-12" />
              <Star className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers; 