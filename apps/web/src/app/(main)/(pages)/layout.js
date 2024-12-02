"use client";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import DashboardFooter from "@/components/dashboard/footer/DashboardFooter";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarProvider open={open} setOpen={setOpen}>
      <div className="flex h-screen bg-background-dark">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          <DashboardFooter />
        </div>
      </div>
    </SidebarProvider>
  );
}
