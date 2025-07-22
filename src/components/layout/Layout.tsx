
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
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : ""}`}>
        <Header onMenuToggle={toggleSidebar} />
        <main className="flex-1 pt-16">
          <div className={`w-full p-4 ${sidebarOpen ? "lg:pl-4" : "lg:pl-4"}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
