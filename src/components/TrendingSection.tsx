import { Star, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { tmdb, GENRES, Movie } from "@/lib/tmdb";
import { useState } from "react";
import { MoviePreviewModal } from "./MoviePreviewModal";

interface TrendingSectionProps {
    selectedCategory?: string;
}

export const TrendingSection = ({ selectedCategory = "Trending" }: TrendingSectionProps) => {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    console.log("TrendingSection: selectedCategory changed to", selectedCategory);

    const { data: movies, isLoading, isFetching } = useQuery({
        queryKey: ["trending-movies", selectedCategory],
        queryFn: async () => {
            console.log("Fetching movies for:", selectedCategory);
            switch (selectedCategory) {
                case "Action":
                    return await tmdb.discoverByGenre(GENRES.ACTION);
                case "Romance":
                    return await tmdb.discoverByGenre(GENRES.ROMANCE);
                case "Animation":
                    return await tmdb.discoverByGenre(GENRES.ANIMATION);
                case "Horror":
                    return await tmdb.discoverByGenre(GENRES.HORROR);
                case "Special":
                    return await tmdb.getTopRatedMovies();
                case "Drakor":
                    return await tmdb.getPopularTVShows();
                case "Trending":
                default:
                    return await tmdb.getPopularMovies();
            }
        },
    });

    if (isLoading || isFetching) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full px-8 pb-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-medium text-foreground">{selectedCategory} Now</h2>
                    <div className="flex items-center gap-2 bg-secondary/30 rounded-full p-1 border border-border">
                        <button className="p-2 rounded-full hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {movies?.slice(0, 12).map((movie) => (
                        <div
                            key={movie.id}
                            onClick={() => setSelectedMovie(movie)}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-4 bg-secondary/20">
                                <img
                                    src={tmdb.getImageUrl(movie.poster_path, "w500")}
                                    alt={movie.title || movie.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop";
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                            </div>

                            <h3 className="text-foreground font-medium truncate mb-1">{movie.title || movie.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star size={14} fill="currentColor" />
                                    <span>{movie.vote_average.toFixed(1)}</span>
                                </div>
                                <span>{new Date(movie.release_date || movie.first_air_date || "").getFullYear()}</span>
                            </div>
                        </div>
                    ))}
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
