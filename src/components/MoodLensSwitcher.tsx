import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Zap } from "lucide-react";
import { motion } from "framer-motion";

type Mood = "dark" | "vibrant" | "gritty";

export const MoodLensSwitcher = () => {
    const [mood, setMood] = useState<Mood>("dark");

    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        // Reset classes
        root.classList.remove("light", "mood-gritty");
        body.classList.remove("light", "mood-gritty"); // Apply to body too for safety
        root.style.cssText = ""; // Clear inline styles

        if (mood === "vibrant") {
            root.classList.add("light");
            body.classList.add("light");
        } else if (mood === "gritty") {
            root.style.setProperty("--background", "0 0% 5%");
            root.style.setProperty("--primary", "0 100% 40%");
            root.style.setProperty("--accent", "30 100% 50%");
        }
    }, [mood]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
            <motion.div
                className="bg-card/80 backdrop-blur-md border border-border/30 p-2 rounded-full flex flex-col gap-2 shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <Button
                    variant={mood === "dark" ? "default" : "ghost"}
                    size="icon"
                    className="rounded-full w-10 h-10"
                    onClick={() => setMood("dark")}
                    title="Dark (Cinematic)"
                >
                    <Moon className="w-4 h-4" />
                </Button>
                <Button
                    variant={mood === "vibrant" ? "default" : "ghost"}
                    size="icon"
                    className="rounded-full w-10 h-10"
                    onClick={() => setMood("vibrant")}
                    title="Rose Gold (Light)"
                >
                    <Sun className="w-4 h-4" />
                </Button>
            </motion.div>
        </div>
    );
};
