import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "accent";
}

export const GradientButton = ({ children, className, variant = "primary", ...props }: GradientButtonProps) => {
    const gradients = {
        primary: "bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_20px_rgba(255,20,147,0.5)]",
        secondary: "bg-gradient-to-r from-secondary to-accent hover:shadow-[0_0_20px_rgba(138,43,226,0.5)]",
        accent: "bg-gradient-to-r from-accent to-primary hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]",
    };

    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
                className={cn(
                    "relative overflow-hidden border-0 text-white font-bold tracking-wide transition-all duration-300",
                    gradients[variant],
                    className
                )}
                {...props}
            >
                <span className="relative z-10">{children}</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </Button>
        </motion.div>
    );
};
