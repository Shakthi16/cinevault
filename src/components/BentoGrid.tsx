import { motion } from "framer-motion";
import { Star, Play } from "lucide-react";
import { tmdb, Movie } from "@/lib/tmdb";
import { useState } from "react";
import { MoviePreviewModal } from "./MoviePreviewModal";

interface BentoGridProps {
    items: Movie[];
    title: string;
}

export const BentoGrid = ({ items, title }: BentoGridProps) => {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    return (
        <>
            <div className="w-full px-8 pb-20">
                <h2 className="text-2xl font-medium text-foreground mb-8">{title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
                    {items
                        .filter(item => !item.title?.includes("High School of the Dead"))
                        .slice(0, 7)
                        .map((item, index) => {
                            // Create a bento layout pattern
                            const isLarge = index === 0 || index === 6;
                            const isTall = index === 3;

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setSelectedMovie(item)}
                                    className={`
                  relative group rounded-[2rem] overflow-hidden cursor-pointer border border-border bg-card
                  ${isLarge ? "md:col-span-2 md:row-span-2" : ""}
                  ${isTall ? "md:row-span-2" : ""}
                `}
                                >
                                    <div className="block w-full h-full">
                                        <img
                                            src={tmdb.getImageUrl(item.backdrop_path || item.poster_path, "w500")}
                                            alt={item.title || item.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <h3 className={`font-bold text-white mb-2 ${isLarge ? "text-3xl" : "text-lg"}`}>
                                                    {item.title || item.name}
                                                </h3>

                                                <div className="flex items-center gap-4 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                                    <div className="flex items-center gap-1 text-yellow-400">
                                                        <Star size={14} fill="currentColor" />
                                                        <span>{item.vote_average.toFixed(1)}</span>
                                                    </div>
                                                    <span>{new Date(item.release_date || item.first_air_date || "").getFullYear()}</span>
                                                    <button className="ml-auto w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white text-white hover:text-black transition-colors">
                                                        <Play size={12} fill="currentColor" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                </div>
            </div>

            <MoviePreviewModal
                movie={selectedMovie}
                isOpen={!!selectedMovie}
                onClose={() => setSelectedMovie(null)}
            />
        </>
    );
};
