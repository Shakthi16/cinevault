import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Plus, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Movie, tmdb } from "@/lib/tmdb";
import { useNavigate } from "react-router-dom";
import { useMyList } from "@/lib/MyListContext";
import { createPortal } from "react-dom";

interface GlassDetailOverlayProps {
    movie: Movie | null;
    onClose: () => void;
}

export const GlassDetailOverlay = ({ movie, onClose }: GlassDetailOverlayProps) => {
    const navigate = useNavigate();
    const { addToList } = useMyList();

    if (!movie) return null;

    return createPortal(
        <AnimatePresence>
            {movie && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-card/60 backdrop-blur-xl border border-border/30 rounded-lg shadow-[0_20px_50px_rgba(14,165,233,0.15)] scrollbar-hide"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 z-20 text-foreground hover:bg-primary/20 rounded-full"
                            onClick={onClose}
                        >
                            <X className="w-6 h-6" />
                        </Button>

                        {/* Content */}
                        <div className="grid md:grid-cols-[2fr,3fr] gap-0">
                            {/* Image Side */}
                            <div className="relative aspect-[2/3] md:aspect-auto h-full">
                                <img
                                    src={tmdb.getImageUrl(movie.poster_path)}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/80" />
                            </div>

                            {/* Info Side */}
                            <div className="p-8 flex flex-col justify-center text-foreground bg-background/40">
                                <h2 className="text-4xl font-serif font-bold mb-4 leading-tight text-shadow">
                                    {movie.title || movie.name}
                                </h2>

                                <div className="flex items-center gap-4 text-sm mb-6 text-muted-foreground">
                                    <div className="flex items-center gap-1 text-primary">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="font-bold">{Math.round(movie.vote_average * 10) / 10}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>{movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0]}</span>
                                    </div>
                                </div>

                                <p className="text-lg text-muted-foreground leading-relaxed mb-8 line-clamp-4">
                                    {movie.overview}
                                </p>

                                <div className="flex items-center gap-4">
                                    <Button
                                        size="lg"
                                        className="flex-1 bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] text-foreground font-bold h-12 uppercase text-sm tracking-wider"
                                        onClick={() => navigate(`/watch/${movie.media_type || 'movie'}/${movie.id}`)}
                                    >
                                        <Play className="w-5 h-5 mr-2 fill-current" />
                                        Play Now
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="flex-1 border-border/50 hover:bg-primary/10 h-12"
                                        onClick={() => addToList(movie)}
                                    >
                                        <Plus className="w-5 h-5 mr-2" />
                                        Watchlist
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Related Content Section */}
                        <div className="px-8 pb-8 bg-black/40">
                            <h3 className="text-xl font-serif font-bold text-foreground mb-4">More Like This</h3>
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {/* Placeholder Related Content - In a real app, fetch recommendations based on movie.id */}
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex-shrink-0 w-32 md:w-40 cursor-pointer group/related">
                                        <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2 relative">
                                            <div className="absolute inset-0 bg-gray-800 animate-pulse" /> {/* Placeholder skeleton */}
                                            <img
                                                src={tmdb.getImageUrl(movie.poster_path)} // Just reusing same image for demo or random
                                                alt="Related"
                                                className="w-full h-full object-cover opacity-60 group-hover/related:opacity-100 transition-opacity"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/related:opacity-100 transition-opacity bg-black/40">
                                                <Play className="w-8 h-8 text-foreground fill-current" />
                                            </div>
                                        </div>
                                        <div className="h-3 w-3/4 bg-gray-700 rounded mb-1" />
                                        <div className="h-3 w-1/2 bg-gray-800 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};
