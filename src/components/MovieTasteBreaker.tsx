import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Trophy, Zap } from "lucide-react";

const QUESTIONS = [
    {
        id: 1,
        text: "It's Friday night. You want...",
        options: [
            { text: "To cry my eyes out 😭", score: "emotional" },
            { text: "To see stuff explode 💥", score: "action" },
        ],
    },
    {
        id: 2,
        text: "Pick a weapon:",
        options: [
            { text: "Lightsaber ⚔️", score: "scifi" },
            { text: "Sharp Wit 🧠", score: "drama" },
        ],
    },
    {
        id: 3,
        text: "Your ideal sidekick is...",
        options: [
            { text: "A talking raccoon 🦝", score: "fun" },
            { text: "A brooding detective 🕵️", score: "serious" },
        ],
    },
];

const RESULTS = {
    "action-scifi-fun": { title: "Chaos Gremlin", emoji: "👾", desc: "You just want to watch the world burn... in 4K." },
    "emotional-drama-serious": { title: "Crying in the Club", emoji: "🎭", desc: "You love pain. Who hurt you?" },
    "action-drama-serious": { title: "The Vigilante", emoji: "🦇", desc: "Dark alleys and justice. Very moody." },
    "emotional-scifi-fun": { title: "Space Cadet", emoji: "🚀", desc: "Head in the stars, heart on your sleeve." },
    // Default fallback
    "default": { title: "Popcorn Connoisseur", emoji: "🍿", desc: "You just love movies. Respect." },
};

export const MovieTasteBreaker = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<any>(null);

    const handleAnswer = (score: string) => {
        const newAnswers = [...answers, score];
        setAnswers(newAnswers);

        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers: string[]) => {
        // Simple logic: just join them for a unique key, or random fallback for demo
        // In a real app, this would be smarter.
        // For now, let's just pick a random fun result to ensure it's always entertaining
        const keys = Object.keys(RESULTS);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        setResult(RESULTS[randomKey as keyof typeof RESULTS] || RESULTS["default"]);
    };

    const reset = () => {
        setStep(0);
        setAnswers([]);
        setResult(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-zinc-900 border border-primary/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                            onClick={onClose}
                        >
                            <X className="w-6 h-6" />
                        </Button>

                        {!result ? (
                            <>
                                <div className="mb-8 text-center">
                                    <h2 className="text-2xl font-serif font-bold text-primary mb-2">Vibe Check ⚡</h2>
                                    <p className="text-muted-foreground">Let's find your cinematic soulmate.</p>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-foreground text-center mb-6">
                                        {QUESTIONS[step].text}
                                    </h3>
                                    <div className="grid gap-4">
                                        {QUESTIONS[step].options.map((option) => (
                                            <Button
                                                key={option.text}
                                                variant="outline"
                                                className="h-16 text-lg border-primary/20 hover:bg-primary hover:text-foreground hover:border-primary transition-all"
                                                onClick={() => handleAnswer(option.score)}
                                            >
                                                {option.text}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-center gap-2">
                                    {QUESTIONS.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 rounded-full transition-all ${i === step ? "w-8 bg-primary" : "w-2 bg-white/20"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="text-8xl mb-6"
                                >
                                    {result.emoji}
                                </motion.div>
                                <h2 className="text-3xl font-serif font-bold text-primary mb-2">{result.title}</h2>
                                <p className="text-xl text-foreground mb-8">{result.desc}</p>

                                <div className="flex gap-4">
                                    <Button
                                        className="flex-1 bg-gradient-to-r from-primary to-secondary text-foreground font-bold hover:shadow-[0_0_20px_rgba(239,109,47,0.4)]"
                                        onClick={onClose}
                                    >
                                        Accept Fate
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-primary/30 hover:bg-primary/10"
                                        onClick={reset}
                                    >
                                        Try Again
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
