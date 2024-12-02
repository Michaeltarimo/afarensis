"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Server, 
  Network, 
  Cpu, 
  FileCode, 
  Quote,
  Globe,
  Settings,
  CreditCard,
  User,
  Cloud,
  Headphones,
  Users,
  BookOpen,
  FileText,
  Shield,
  ChevronUp,
  ChevronDown,
  LogOut,
  UserCircle,
  UserPlus,
  Users2,
  Bell,
} from "lucide-react";
import { 
  Sidebar as SidebarContainer, 
  SidebarBody, 
  SidebarLink,
  useSidebar 
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const Logo = () => (
  <div className="flex items-center justify-between py-1 relative z-20">
    <Link href="/dashboard" className="font-normal flex space-x-2 items-center">
      <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-lime-400/10 group overflow-hidden">
        <span className="text-lg font-bold text-lime-400">A</span>
        <div className="absolute inset-0 border-2 border-lime-400/20 rounded-lg group-hover:border-lime-400 transition-colors duration-300"></div>
        <div className="absolute inset-0 bg-lime-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-base text-lime-400"
      >
        Afarensis
      </motion.span>
    </Link>
    
    <div className="flex items-center gap-1">
      <div className="relative">
        <Bell className="h-4 w-4 text-text-dark-secondary hover:text-lime-400 transition-colors cursor-pointer" />
        <span className="absolute -top-1 -right-1 h-3 w-3 flex items-center justify-center rounded-full bg-lime-400/10 border border-lime-400">
          <span className="text-[8px] font-medium text-lime-400">0</span>
        </span>
      </div>
    </div>
  </div>
);

const LogoIcon = () => (
  <div className="flex items-center justify-between py-1 relative z-20">
    <Link href="/dashboard" className="font-normal flex items-center">
      <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-lime-400/10 group overflow-hidden">
        <span className="text-lg font-bold text-lime-400">A</span>
        <div className="absolute inset-0 border-2 border-lime-400/20 rounded-lg group-hover:border-lime-400 transition-colors duration-300"></div>
        <div className="absolute inset-0 bg-lime-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Link>
  </div>
);

const SectionTitle = ({ children }) => {
  const { open } = useSidebar();
  return open ? (
    <h3 className="px-2 mb-1.5 text-[10px] font-medium uppercase tracking-wider text-text-dark-secondary/40">
      {children}
    </h3>
  ) : null;
};

const ProfileDropup = ({ isOpen, onClose }) => {
  const { open } = useSidebar();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-full left-0 w-full mb-2 bg-black rounded-lg border border-white/5 overflow-hidden z-50"
        >
          <div className="py-1">
            <button className="w-full px-3 py-2 text-xs text-text-dark-secondary hover:text-lime-400 hover:bg-lime-400/5 transition-colors text-left flex items-center gap-2">
              <UserPlus className="h-3.5 w-3.5" />
              <span>Switch Account</span>
            </button>
            
            <div className="px-3 py-2 flex items-center gap-2 text-xs text-text-dark-secondary hover:text-lime-400 hover:bg-lime-400/5 transition-colors">
              <div className="h-6 w-6 rounded-full bg-lime-400 flex items-center justify-center">
                <span className="text-black font-medium text-xs">MT</span>
              </div>
              <span>Michael Tarimo</span>
            </div>

            <Link 
              href="/dashboard/team/create"
              className="w-full px-3 py-2 text-xs text-text-dark-secondary hover:text-lime-400 hover:bg-lime-400/5 transition-colors text-left flex items-center gap-2"
            >
              <Users2 className="h-3.5 w-3.5" />
              <span>Create Team</span>
            </Link>

            <div className="h-px bg-white/5 my-1" />

            <button className="w-full px-3 py-2 text-xs text-red-400 hover:bg-red-400/5 transition-colors text-left flex items-center gap-2">
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Sidebar = ({ open, setOpen }) => {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const mainLinks = [
    { href: "/dashboard/", icon: <Server className="h-3.5 w-3.5" />, label: "Deploy GPU Instance" },
    { href: "/dashboard/clusters", icon: <Network className="h-3.5 w-3.5" />, label: "Multi-Node Cluster" },
    { href: "/dashboard/instances", icon: <Cpu className="h-3.5 w-3.5" />, label: "Instances" },
    { href: "/dashboard/templates", icon: <FileCode className="h-3.5 w-3.5" />, label: "Templates" },
    { href: "/dashboard/reserved", icon: <Quote className="h-3.5 w-3.5" />, label: "Reserved Instances" },
    { href: "/dashboard/intelligence", icon: <Globe className="h-3.5 w-3.5" />, label: "Intelligence" },
  ];

  const settingsLinks = [
    { href: "/dashboard/billing", icon: <CreditCard className="h-3.5 w-3.5" />, label: "Billing" },
    { href: "/dashboard/profile", icon: <User className="h-3.5 w-3.5" />, label: "Profile" },
    { href: "/dashboard/providers", icon: <Cloud className="h-3.5 w-3.5" />, label: "Providers" },
    { href: "/dashboard/support", icon: <Headphones className="h-3.5 w-3.5" />, label: "Support" },
    { href: "/dashboard/team/create", icon: <Users className="h-3.5 w-3.5" />, label: "Create Team" },
    { href: "/documentation", icon: <BookOpen className="h-3.5 w-3.5" />, label: "Documentation" },
  ];

  // Set deploy as active on dashboard landing
  const isActive = (href) => {
    if (pathname === '/dashboard' && href === '/dashboard/deploy') {
      return true;
    }
    return pathname === href;
  };

  return (
    <SidebarContainer open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-8">
        <div className="flex flex-col flex-1 overflow-y-auto scrollbar-hide">
          {open ? <Logo /> : <LogoIcon />}
          
          {/* Main Section */}
          <div className="mt-6 flex flex-col">
            <SectionTitle>Compute</SectionTitle>
            <div className="flex flex-col gap-1 mb-6">
              {mainLinks.map((link) => (
                <SidebarLink 
                  key={link.href} 
                  link={link}
                  isActive={isActive(link.href)}
                />
              ))}
            </div>

            {/* Settings Section */}
            <SectionTitle>Settings</SectionTitle>
            <div className="flex flex-col gap-1">
              {settingsLinks.map((link) => (
                <SidebarLink 
                  key={link.href} 
                  link={link}
                  isActive={isActive(link.href)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Legal Links */}
        {open && (
          <div className="flex items-center justify-center gap-2 px-2 py-1 text-[10px] text-text-dark-secondary/50">
            <Link 
              href="/terms" 
              className="hover:text-text-dark-secondary transition-colors"
            >
              Terms of Service
            </Link>
            <span>·</span>
            <Link 
              href="/privacy" 
              className="hover:text-text-dark-secondary transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        )}

        {/* Profile Section */}
        <div className="pt-2 border-t border-white/5 relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={cn(
              "w-full flex items-center gap-2 py-1.5 px-2 rounded-lg transition-all duration-200",
              "text-text-dark-secondary hover:text-lime-400 hover:bg-lime-400/5",
              isProfileOpen && "text-lime-400 bg-lime-400/5"
            )}
          >
            <UserCircle className="h-6 w-6" />
            {open && (
              <>
                <span className="flex-1 text-xs text-left">Michael Tarimo</span>
                {isProfileOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </>
            )}
          </button>

          {open && <ProfileDropup isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />}
        </div>
      </SidebarBody>
    </SidebarContainer>
  );
};

export default Sidebar;
