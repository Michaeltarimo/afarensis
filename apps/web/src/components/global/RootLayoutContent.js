"use client";
import { usePathname } from 'next/navigation';
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";

export default function RootLayoutContent({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.includes('/sign-');

  return (
    <body className="font-sans antialiased min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className={`flex-grow ${!isAuthPage ? 'pt-16' : ''}`}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </body>
  );
} 