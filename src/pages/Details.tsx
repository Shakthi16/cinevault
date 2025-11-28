import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Plus, Star, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { tmdb, Movie } from "@/lib/tmdb";

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, we would fetch by ID. 
        // For now, we'll just fetch trending and find one or mock it if not found.
        // Since we don't have a getById in the tmdb lib shown, we'll simulate it.
        const fetchMovie = async () => {
            try {
                // Simulating fetch
                const trending = await tmdb.getTrending();
                const found = trending.find(m => m.id.toString() === id);
                if (found) {
                    setMovie(found);
                } else {
                    // Fallback mock if not in trending list
                    setMovie({
                        id: Number(id),
                        title: "Movie Title",
                        overview: "This is a detailed description of the movie. It is very interesting and you should watch it.",
                        backdrop_path: "/placeholder.jpg",
                        poster_path: "/placeholder.jpg",
                        vote_average: 8.5,
                        release_date: "2023-01-01",
                        genre_ids: [1, 2, 3]
                    } as Movie);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!movie) return null;

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="relative h-[70vh]">
                <div className="absolute inset-0">
                    <img
                        src={tmdb.getImageUrl(movie.backdrop_path, "original")}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
                </div>

                <div className="absolute inset-0 container mx-auto px-4 flex items-end pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-shadow">
                            {movie.title || movie.name}
                        </h1>

                        <div className="flex items-center gap-6 text-lg mb-6">
                            <div className="flex items-center gap-2 text-accent">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="font-bold">{Math.round(movie.vote_average * 10) / 10}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <Calendar className="w-5 h-5" />
                                <span>{movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0]}</span>
                            </div>
                        </div>

                        <p className="text-xl text-gray-200 leading-relaxed mb-8 line-clamp-3">
                            {movie.overview}
                        </p>

                        <div className="flex items-center gap-4">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-foreground font-bold px-8 h-14 text-lg shadow-[0_0_20px_rgba(239,109,47,0.3)]"
                                onClick={() => navigate(`/watch/${movie.media_type || 'movie'}/${movie.id}`)}
                            >
                                <Play className="w-6 h-6 mr-2 fill-current" />
                                Watch Now
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-primary/30 hover:bg-primary/10 h-14 px-6"
                            >
                                <Plus className="w-6 h-6 mr-2" />
                                My List
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Details;
