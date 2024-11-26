"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import SignInLoader from '@/components/auth/SignInLoader';

// Custom Google Icon component
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle sign in
  };

  return (
    <>
      <div 
        className="fixed inset-0 w-full h-full bg-background-light dark:bg-background-dark flex items-center justify-center"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(132, 204, 22, 0.1) 2px, transparent 2px)
          `,
          backgroundSize: '24px 24px',
        }}
      >
        {/* Radial gradient overlay */}
        <div 
          className="absolute pointer-events-none inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 20%, var(--background-color) 80%)',
            '--background-color': 'rgb(38, 38, 38)'
          }}
        />
        
        {/* Back Button */}
        <Link 
          href="/"
          className="absolute top-6 left-6 flex items-center text-text-secondary dark:text-text-dark-secondary hover:text-lime-400 transition-colors z-20"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back to home</span>
        </Link>
        
        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[90%] xs:max-w-[99%] sm:max-w-xl px-4 sm:px-6">
          {/* Sign In Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background-elevated-light dark:bg-background-elevated-dark p-4 xs:p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* OAuth Providers */}
              <div className="grid grid-cols-2 gap-2 xs:gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center w-full px-3 xs:px-4 py-2 text-xs xs:text-sm border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-[#24292F]/10 dark:hover:bg-[#24292F]/20 transition-colors text-text-primary dark:text-text-dark-primary"
                >
                  <Github className="w-4 h-4 xs:w-5 xs:h-5 mr-1.5 xs:mr-2 text-[#24292F] dark:text-white" />
                  <span>GitHub</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-[#4285F4]/10 dark:hover:bg-[#4285F4]/20 transition-colors text-text-primary dark:text-text-dark-primary"
                >
                  <div className="mr-2 text-[#4285F4]">
                    <GoogleIcon />
                  </div>
                  <span>Google</span>
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-background-elevated-light dark:bg-background-elevated-dark text-text-secondary dark:text-text-dark-secondary">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-3 xs:gap-4">
                <div>
                  <label className="block text-xs xs:text-sm font-medium mb-1 xs:mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-2.5 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm rounded-lg bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-800 focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-colors pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-text-dark-secondary hover:text-lime-400 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-lime-400 hover:bg-lime-500 py-1.5 xs:py-2 text-xs xs:text-sm rounded-lg text-black font-medium transition-colors"
              >
                Sign In
              </button>
            </form>

            {/* Links */}
            <div className="mt-3 xs:mt-4 text-center text-[11px] xs:text-xs">
              <Link 
                href="/forgot-password"
                className="text-lime-400 hover:text-lime-300 transition-colors text-xs"
              >
                Forgot password?
              </Link>
              <div className="mt-1.5 text-text-secondary dark:text-text-dark-secondary text-xs">
                Don&apos;t have an account?{' '}
                <Link 
                  href="/sign-up"
                  className="text-lime-400 hover:text-lime-300 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {isLoading && (
        <SignInLoader 
          onComplete={() => {
            // Redirect to dashboard
            window.location.href = '/dashboard';
          }} 
        />
      )}
    </>
  );
};

export default SignInPage;