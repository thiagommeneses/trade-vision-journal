
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  LineChart,
  BookOpen,
  PenLine,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  {
    title: "Home",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Market Panorama",
    icon: LineChart,
    href: "/market-panorama",
  },
  {
    title: "Extra Material",
    icon: BookOpen,
    href: "/extra-material",
  },
  {
    title: "Add New Diary Entry",
    icon: PenLine,
    href: "/trade-entry",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
          collapsed && "w-20",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div
            className={cn(
              "flex items-center h-16 px-4",
              collapsed ? "justify-center" : "justify-between"
            )}
          >
            {!collapsed && (
              <Link to="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">DT</span>
                </div>
                <span className="font-medium text-lg">DT Diary</span>
              </Link>
            )}
            {collapsed && (
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">DT</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:flex hidden"
              onClick={toggleCollapse}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          </div>

          <Separator />

          {/* Navigation */}
          <ScrollArea className="flex-1 py-4">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-sidebar-accent text-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    collapsed ? "justify-center" : ""
                  )}
                >
                  <item.icon
                    size={20}
                    className={cn(
                      "flex-shrink-0",
                      location.pathname === item.href ? "text-primary" : "text-sidebar-foreground",
                      collapsed ? "" : "mr-3"
                    )}
                  />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              ))}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4">
            {!collapsed && (
              <div className="rounded-lg bg-sidebar-accent p-4">
                <h5 className="font-medium text-sm mb-2">Need Help?</h5>
                <p className="text-xs text-sidebar-foreground/80 mb-3">
                  Access tutorials and guides to improve your trading.
                </p>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View Resources
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
