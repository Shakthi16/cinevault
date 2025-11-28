import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Info, X, Star } from "lucide-react";
import { tmdb, Movie } from "@/lib/tmdb";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface MoviePreviewModalProps {
    movie: Movie | null;
    isOpen: boolean;
    onClose: () => void;
}

export const MoviePreviewModal = ({ movie, isOpen, onClose }: MoviePreviewModalProps) => {
    const navigate = useNavigate();

    if (!movie) return null;

    const handlePlay = () => {
        onClose();
        navigate(`/watch/${movie.media_type || 'movie'}/${movie.id}`);
    };

    const handleMoreInfo = () => {
        onClose();
        navigate(`/watch/${movie.media_type || 'movie'}/${movie.id}`);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-[#1F2937] border-white/10 text-white rounded-[2rem]">
                <div className="relative aspect-video w-full">
                    <img
                        src={tmdb.getImageUrl(movie.backdrop_path || movie.poster_path, "original")}
                        alt={movie.title || movie.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] via-transparent to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors backdrop-blur-md z-50"
                    >
                        <X size={20} />
                    </button>

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-4xl font-bold mb-4">{movie.title || movie.name}</h2>

                            <div className="flex items-center gap-4 mb-6 text-sm text-gray-300">
                                <div className="flex items-center gap-1 text-green-400 font-semibold">
                                    <Star size={16} fill="currentColor" />
                                    <span>{movie.vote_average.toFixed(1)} Match</span>
                                </div>
                                <span>{new Date(movie.release_date || movie.first_air_date || "").getFullYear()}</span>
                                <span className="border border-white/20 px-2 py-0.5 rounded text-xs">HD</span>
                            </div>

                            <p className="text-gray-300 line-clamp-3 max-w-2xl mb-8 text-lg">
                                {movie.overview}
                            </p>

                            <div className="flex items-center gap-4">
                                <Button
                                    onClick={handlePlay}
                                    className="bg-white text-black hover:bg-gray-200 px-8 py-6 rounded-xl font-bold text-lg flex items-center gap-2"
                                >
                                    <Play size={24} fill="currentColor" />
                                    Play
                                </Button>
                                <Button
                                    onClick={handleMoreInfo}
                                    variant="outline"
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-6 rounded-xl font-bold text-lg flex items-center gap-2"
                                >
                                    <Info size={24} />
                                    More Info
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
