import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PyramidLoader } from "./PyramidLoader";
import { AnimatePresence, motion } from "framer-motion";

export const PageLoader = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Increment navigation count
        const count = parseInt(sessionStorage.getItem("navCount") || "0") + 1;
        sessionStorage.setItem("navCount", count.toString());

        // Show loader only every 5th navigation or on first load
        if (count === 1 || count % 5 === 0) {
            setLoading(true);
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [location.pathname]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl"
                >
                    <PyramidLoader />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
