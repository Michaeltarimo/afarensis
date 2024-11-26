import { DM_Sans } from "next/font/google";
import RootLayoutContent from "@/components/global/RootLayoutContent";
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
    <html lang="en" className={dmSans.variable}>
      <RootLayoutContent>{children}</RootLayoutContent>
    </html>
  );
}
