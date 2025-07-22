
import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${
        sidebarOpen ? "" : "lg:ml-64"
      }`}>
        <Header onMenuToggle={toggleSidebar} />
        <main className="flex-1 pt-16 lg:pt-20">
          <div className="w-full p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
