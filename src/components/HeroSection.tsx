import { Play, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/lib/tmdb";
import { Link } from "react-router-dom";

interface HeroSectionProps {
    mediaType?: "movie" | "tv";
}

export const HeroSection = ({ mediaType = "movie" }: HeroSectionProps) => {
    const { data: movies, isLoading } = useQuery({
        queryKey: ["hero-movies", mediaType],
        queryFn: () => tmdb.getTrending(mediaType, "day"),
    });

    if (isLoading || !movies || movies.length < 2) {
        return (
            <div className="w-full px-8 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-[400px] rounded-[2.5rem] bg-white/5 animate-pulse" />
                <div className="h-[400px] rounded-[2.5rem] bg-white/5 animate-pulse" />
            </div>
        );
    }

    const heroMovies = movies.slice(0, 2);

    return (
        <div className="w-full px-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {heroMovies.map((movie, index) => (
                    <Link
                        to={`/watch/${mediaType}/${movie.id}`}
                        key={movie.id}
                        className="relative h-[400px] rounded-[2.5rem] overflow-hidden group cursor-pointer block"
                    >
                        <img
                            src={tmdb.getImageUrl(movie.backdrop_path || movie.poster_path, "original")}
                            alt={movie.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-r ${index === 0 ? 'from-[#1e3a8a]/90' : 'from-[#7dd3fc]/90'} to-transparent opacity-90`} />

                        <div className="absolute inset-0 p-12 flex flex-col justify-center items-start gap-6">
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-white uppercase tracking-wider mb-2">
                                Trending #{index + 1}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-md line-clamp-3">
                                {movie.title}
                            </h2>

                            <div className="flex items-center gap-4 mt-auto">
                                <button className="flex items-center gap-3 bg-black/30 backdrop-blur-md hover:bg-black/50 text-white px-6 py-3 rounded-full transition-all group-hover:pl-8">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                        <Play size={14} className="text-black fill-current ml-0.5" />
                                    </div>
                                    <span className="font-medium">Play Now</span>
                                </button>
                                <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors">
                                    <Info size={20} />
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
