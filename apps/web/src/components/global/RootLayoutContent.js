"use client";
import { usePathname } from 'next/navigation';
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";

export default function RootLayoutContent({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.includes('/sign-');
  const isDashboardPage = pathname?.startsWith('/dashboard') || pathname?.includes('/(pages)');

  // Don't show navbar and footer for auth pages and dashboard pages
  const shouldShowNavFooter = !isAuthPage && !isDashboardPage;

  return (
    <body className="font-sans antialiased min-h-screen flex flex-col">
      {shouldShowNavFooter && <Navbar />}
      <main className={`flex-grow ${shouldShowNavFooter ? 'pt-16' : ''}`}>
        {children}
      </main>
      {shouldShowNavFooter && <Footer />}
    </body>
  );
} 