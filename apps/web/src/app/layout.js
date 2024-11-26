import { DM_Sans } from "next/font/google";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Afarensis | Enterprise-Grade GPU Computing On Demand",
  description: "Access AWS and GCP GPU resources at competitive prices. The leading marketplace for GPU computing resources, making high-performance computing accessible and cost-effective.",
  keywords: "GPU marketplace, cloud computing, AWS GPU, GCP GPU, AI training, machine learning, GPU resources",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased min-h-screen flex flex-col`}>
        
        <Navbar />
        <main className="pt-16 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
