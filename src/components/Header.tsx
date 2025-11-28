import { motion } from "framer-motion";
import { Search, Bell, User, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { MobileMenu } from "./MobileMenu";
import { NotificationsPanel } from "./NotificationsPanel";
import { SearchOverlay } from "./SearchOverlay";

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Movies", path: "/movies" },
    { label: "Series", path: "/series" },
    { label: "Kids", path: "/kids" },
    { label: "Premium", path: "/premium" },
    { label: "My List", path: "/my-list" },
  ];

  const handleNavigation = (path: string, label: string) => {
    setActiveTab(label);
    navigate(path);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-border/50 bg-gradient-to-b from-background/80 to-background/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleNavigation("/", "Home")}
          >
            <div className="relative">
              <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                StreamHub
              </h1>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-secondary to-transparent opacity-70" />
            </div>
          </motion.div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path, item.label)}
                className={`relative text-sm font-medium transition-colors ${activeTab === item.label ? "text-foreground" : "text-muted-foreground"
                  } hover:text-foreground`}
              >
                {item.label}
                {activeTab === item.label && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                    layoutId="activeTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="hover:bg-primary/10"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 relative"
              onClick={() => setIsNotificationsOpen(true)}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </Button>

            {/* Profile */}
            {user ? (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hidden md:flex"
                onClick={() => navigate("/profile")}
              >
                <User className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                className="bg-primary hover:bg-primary/90 hidden md:flex"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              {/* Custom "Vault Handle" / Film Strip Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M3 6H21V8H3V6Z" fill="currentColor" />
                <path d="M3 11H21V13H3V11Z" fill="currentColor" />
                <path d="M3 16H21V18H3V16Z" fill="currentColor" />
                <rect x="5" y="6" width="2" height="2" fill="black" />
                <rect x="17" y="6" width="2" height="2" fill="black" />
                <rect x="5" y="11" width="2" height="2" fill="black" />
                <rect x="17" y="11" width="2" height="2" fill="black" />
                <rect x="5" y="16" width="2" height="2" fill="black" />
                <rect x="17" y="16" width="2" height="2" fill="black" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          className="lg:hidden flex items-center space-x-4 mt-4 overflow-x-auto pb-2 scrollbar-hide"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path, item.label)}
              className={`relative text-sm font-medium whitespace-nowrap px-3 py-1.5 rounded-lg transition-all ${activeTab === item.label
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {item.label}
            </button>
          ))}
        </motion.nav>
      </div>

      {/* Overlays */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NotificationsPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </motion.header>
  );
};
