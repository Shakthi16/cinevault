import { motion, AnimatePresence } from "framer-motion";
import { X, Search as SearchIcon, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { tmdb, Movie } from "@/lib/tmdb";
import { ContentCard } from "./ContentCard";
import { useNavigate } from "react-router-dom";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Load trending on open
      tmdb.getTrending().then(setTrending);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length >= 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        tmdb.search(query).then((data) => {
          setResults(data);
          setIsSearching(false);
        });
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [query]);

  const displayedContent = query.trim().length >= 2 ? results : trending;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 overflow-y-auto"
        >
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search movies, series, actors..."
                  className="pl-12 h-14 text-lg bg-card/50 border-border/50 focus:border-primary"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-14 w-14 hover:bg-primary/10"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Results */}
            {isSearching ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              <>
                {/* Header for results/trending */}
                <div className="flex items-center gap-2 mb-6">
                  {query.trim().length >= 2 ? (
                    <>
                      <SearchIcon className="w-5 h-5 text-primary" />
                      <h2 className="font-serif text-2xl font-bold">
                        Search Results for "{query}"
                      </h2>
                      <span className="text-muted-foreground">({results.length})</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <h2 className="font-serif text-2xl font-bold">Trending Now</h2>
                    </>
                  )}
                </div>

                {/* Content Grid */}
                {displayedContent.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {displayedContent.map((item) => (
                      <ContentCard
                        key={item.id}
                        id={item.id}
                        title={item.title || item.name || ""}
                        image={tmdb.getImageUrl(item.poster_path)}
                        year={
                          item.release_date?.split("-")[0] ||
                          item.first_air_date?.split("-")[0]
                        }
                        rating={Math.round(item.vote_average * 10) / 10}
                      />
                    ))}
                  </div>
                ) : query.trim().length >= 2 ? (
                  <div className="text-center py-20">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                      <SearchIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">No results found</h3>
                    <p className="text-muted-foreground">
                      Try searching with different keywords
                    </p>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
