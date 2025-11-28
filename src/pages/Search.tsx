import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { tmdb } from "@/lib/tmdb";
import { Link } from "react-router-dom";

// Simple debounce hook implementation inline if not exists
function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}

const Search = () => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounceValue(query, 500);

    const { data: results, isLoading } = useQuery({
        queryKey: ["search", debouncedQuery],
        queryFn: () => tmdb.search(debouncedQuery),
        enabled: debouncedQuery.length > 0,
    });

    return (
        <div className="min-h-screen bg-background pt-24 px-8">
            <div className="max-w-4xl mx-auto">
                <div className="relative mb-12">
                    <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                    <input
                        type="text"
                        placeholder="Search movies, series, originals..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-6 pl-16 pr-8 text-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                        autoFocus
                    />
                </div>

                {isLoading && (
                    <div className="flex justify-center py-12">
                        <Loader2 className="animate-spin text-white" size={32} />
                    </div>
                )}

                {!isLoading && results && results.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
                        {results.map((item) => (
                            <Link to={`/watch/${item.media_type || 'movie'}/${item.id}`} key={item.id} className="group cursor-pointer">
                                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 bg-white/5">
                                    {item.poster_path ? (
                                        <img
                                            src={tmdb.getImageUrl(item.poster_path, "w500")}
                                            alt={item.title || item.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                </div>
                                <h3 className="text-white font-medium truncate">{item.title || item.name}</h3>
                                <p className="text-sm text-gray-400">
                                    {new Date(item.release_date || item.first_air_date || "").getFullYear() || "Unknown"}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}

                {!isLoading && debouncedQuery && results?.length === 0 && (
                    <div className="text-center text-gray-400 py-12">
                        No results found for "{debouncedQuery}"
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
