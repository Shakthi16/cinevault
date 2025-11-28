import { motion, AnimatePresence } from "framer-motion";
import { Home, Film, Tv, Baby, Star, List, User, Search, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useSidebar } from "@/lib/SidebarContext";

export const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { isCollapsed, toggleSidebar } = useSidebar();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navItems = [
        { icon: Home, label: "Home", path: "/" },
        { icon: Film, label: "Movies", path: "/movies" },
        { icon: Tv, label: "Series", path: "/series" },
        { icon: Baby, label: "Kids", path: "/kids" },
        { icon: Star, label: "Premium", path: "/premium" },
        { icon: List, label: "My List", path: "/my-list" },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-gradient-to-b from-card to-background/80 backdrop-blur-sm border-r border-border/30 relative glass">
            {/* Toggle Button (Desktop) */}
            <button
                onClick={toggleSidebar}
                className="hidden lg:flex absolute -right-3 top-8 w-6 h-6 bg-primary text-background rounded-full items-center justify-center shadow-[0_0_12px_rgba(14,165,233,0.4)] hover:scale-110 transition-transform z-50"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Logo */}
            <div
                className={`mb-8 cursor-pointer transition-all duration-300 ${isCollapsed ? "px-4 pt-6" : "px-6 pt-6"}`}
                onClick={() => navigate("/")}
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    <h1 className="text-2xl font-black tracking-tight bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent shrink-0">
                        SH
                    </h1>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="whitespace-nowrap"
                        >
                            <span className="text-xs text-muted-foreground tracking-widest uppercase block font-bold">StreamHub</span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-3">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => {
                                navigate(item.path);
                                setIsMobileOpen(false);
                            }}
                            className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all group relative overflow-hidden ${isActive
                                ? "bg-primary/15 text-primary shadow-[inset_0_0_20px_rgba(14,165,233,0.1)]"
                                : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                                }`}
                            title={isCollapsed ? item.label : ""}
                        >
                            <item.icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-primary drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]" : ""}`} />

                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`font-medium tracking-wide whitespace-nowrap ${isActive ? "font-bold" : ""}`}
                                >
                                    {item.label}
                                </motion.span>
                            )}

                            {/* Active Indicator Dot */}
                            {isActive && !isCollapsed && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#D4AF37]"
                                />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="mt-auto p-4 border-t border-border/30 space-y-2">
                <button
                    onClick={() => navigate("/search")}
                    className={`w-full flex items-center gap-4 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors ${isCollapsed ? "justify-center" : ""}`}
                    title="Search"
                >
                    <Search className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="font-medium">Search</span>}
                </button>

                <button
                    onClick={() => navigate(user ? "/profile" : "/auth")}
                    className={`w-full flex items-center gap-4 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors ${isCollapsed ? "justify-center" : ""}`}
                    title="Profile"
                >
                    <User className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="font-medium">{user ? "Profile" : "Sign In"}</span>}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isCollapsed ? 80 : 256 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="hidden lg:block fixed left-0 top-0 bottom-0 z-50"
            >
                <SidebarContent />
            </motion.aside>

            {/* Mobile Header & Menu */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-background/80 backdrop-blur-md flex items-center justify-between border-b border-border/30">
                <div onClick={() => navigate("/")}>
                    <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SH</h1>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(true)}>
                    <Menu className="w-6 h-6" />
                </Button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileOpen && (
                    <div className="fixed inset-0 z-[60] lg:hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute left-0 top-0 bottom-0 w-80 bg-card shadow-2xl border-r border-border/30"
                        >
                            <div className="h-full relative">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-4 right-4 z-50 text-muted-foreground hover:text-foreground"
                                    onClick={() => setIsMobileOpen(false)}
                                >
                                    <X className="w-6 h-6" />
                                </Button>
                                <SidebarContent />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
