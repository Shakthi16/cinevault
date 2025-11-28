import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Heart, Ghost, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { tmdb, GENRES } from "@/lib/tmdb";
import { Link } from "react-router-dom";

export const MovieGame = () => {
    const [step, setStep] = useState(0);
    const [mood, setMood] = useState<number | null>(null);

    const questions = [
        {
            id: 1,
            text: "How are you feeling today?",
            options: [
                { label: "Energetic", icon: Zap, genre: GENRES.ACTION, color: "bg-yellow-500" },
                { label: "Relaxed", icon: Sparkles, genre: GENRES.COMEDY, color: "bg-blue-500" },
            ]
        },
        {
            id: 2,
            text: "Pick a vibe:",
            options: [
                { label: "Romantic", icon: Heart, genre: GENRES.ROMANCE, color: "bg-pink-500" },
                { label: "Spooky", icon: Ghost, genre: GENRES.HORROR, color: "bg-purple-500" },
            ]
        }
    ];

    const { data: recommendation, refetch, isFetching } = useQuery({
        queryKey: ["game-recommendation", mood],
        queryFn: () => mood ? tmdb.discoverByGenre(mood) : Promise.resolve([]),
        enabled: !!mood,
    });

    const handleChoice = (genre: number) => {
        setMood(genre);
        setStep(2); // Go to result
        setTimeout(() => refetch(), 100);
    };

    const resetGame = () => {
        setStep(0);
        setMood(null);
    };

    const recommendedMovie = recommendation?.[0];

    return (
        <div className="w-full bg-[#1F2937] rounded-[2rem] p-8 md:p-12 relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles size={120} />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Discover Your Taste</h2>
                <p className="text-gray-400 mb-12">Play a quick game to find your next obsession</p>

                <AnimatePresence mode="wait">
                    {step < 2 ? (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <h3 className="text-2xl font-medium text-white">{questions[step].text}</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {questions[step].options.map((option) => (
                                    <button
                                        key={option.label}
                                        onClick={() => {
                                            if (step === 0) setStep(1);
                                            else handleChoice(option.genre);
                                        }}
                                        className="group relative aspect-square rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
                                    >
                                        <div className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity ${option.color}`} />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                            <div className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                <option.icon size={32} className="text-white" />
                                            </div>
                                            <span className="text-xl font-bold text-white">{option.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            {isFetching ? (
                                <div className="h-64 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                                </div>
                            ) : recommendedMovie ? (
                                <div className="bg-black/40 rounded-3xl p-6 border border-white/10">
                                    <p className="text-gray-400 mb-4">We found a match!</p>
                                    <div className="flex flex-col md:flex-row gap-6 items-center">
                                        <img
                                            src={tmdb.getImageUrl(recommendedMovie.poster_path, "w342")}
                                            alt={recommendedMovie.title}
                                            className="w-48 rounded-xl shadow-2xl"
                                        />
                                        <div className="text-left flex-1">
                                            <h3 className="text-2xl font-bold text-white mb-2">{recommendedMovie.title}</h3>
                                            <p className="text-gray-300 mb-6 line-clamp-3">{recommendedMovie.overview}</p>
                                            <div className="flex gap-4">
                                                <Link
                                                    to={`/watch/movie/${recommendedMovie.id}`}
                                                    className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
                                                >
                                                    Watch Now
                                                </Link>
                                                <button
                                                    onClick={resetGame}
                                                    className="px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
                                                >
                                                    <RefreshCw size={18} />
                                                    Play Again
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-white mb-4">No match found, try again!</p>
                                    <button onClick={resetGame} className="text-blue-400 underline">Restart</button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
