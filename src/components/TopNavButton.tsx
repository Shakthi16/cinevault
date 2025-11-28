import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TopNavButtonProps {
    to: string;
    children: React.ReactNode;
    icon?: React.ElementType;
}

export const TopNavButton = ({ to, children, icon: Icon }: TopNavButtonProps) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} className="relative group px-4 py-2">
            <div className="flex items-center gap-2 relative z-10">
                {Icon && (
                    <Icon
                        size={18}
                        className={cn(
                            "transition-colors duration-300",
                            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        )}
                    />
                )}
                <span
                    className={cn(
                        "font-medium text-sm transition-colors duration-300",
                        isActive ? "text-foreground font-bold" : "text-muted-foreground group-hover:text-foreground"
                    )}
                >
                    {children}
                </span>
            </div>

            {/* Active Indicator */}
            {isActive && (
                <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            )}

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
    );
};
