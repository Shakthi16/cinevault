import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { ContentCard } from "./ContentCard";
import { Button } from "@/components/ui/button";
import { tmdb, Movie } from "@/lib/tmdb";

interface ContentCarouselProps {
  title: string;
  type?: "standard" | "continue" | "trending" | "premium" | "popular" | "top-rated" | "now-playing" | "kids" | "genre" | "upcoming";
  mediaType?: "movie" | "tv";
  genreId?: number;
}

export const ContentCarousel = ({ title, type = "standard", mediaType = "movie", genreId }: ContentCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [content, setContent] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, [type, mediaType, genreId]);

  const loadContent = async () => {
    setLoading(true);
    try {
      let data: Movie[] = [];

      if (type === "popular") {
        data = mediaType === "tv"
          ? await tmdb.getPopularTVShows()
          : await tmdb.getPopularMovies();
      } else if (type === "top-rated") {
        data = await tmdb.getTopRatedMovies();
      } else if (type === "now-playing") {
        data = await tmdb.getNowPlayingMovies();
      } else if (type === "trending") {
        data = await tmdb.getTrending(mediaType);
      } else if (type === "genre" && genreId) {
        data = await tmdb.discoverByGenre(genreId, mediaType);
      } else if (type === "kids") {
        data = await tmdb.getKidsContent();
      } else if (type === "upcoming") {
        data = await tmdb.getUpcomingMovies();
      } else if (type === "premium") {
        // For premium, use top rated as placeholder
        data = await tmdb.getTopRatedMovies();
      } else {
        // Standard/continue watching - use popular as fallback
        data = await tmdb.getPopularMovies();
      }

      setContent(data);
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group py-6">
      {/* Header */}
      <div className="container mx-auto px-12 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-2xl md:text-3xl font-bold">
            {title}
          </h2>
          {type === "trending" && (
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="w-6 h-6 text-primary" />
            </motion.div>
          )}
          {type === "premium" && (
            <div className="px-3 py-1 rounded-full bg-premium/20 border border-premium/30">
              <span className="text-xs font-bold gradient-gold">EXCLUSIVE</span>
            </div>
          )}
        </div>
        <button
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
          onClick={() => window.location.href = "/movies"}
        >
          View All →
        </button>
      </div>

      {/* Carousel */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-0 bottom-0 z-30 flex items-center pointer-events-none"
            >
              <div className="pl-4 pointer-events-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scroll("left")}
                  className="w-12 h-12 rounded-full bg-card/80 hover:bg-card backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Content */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-4 container mx-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {content.map((item, index) => (
              <ContentCard
                key={`${item.id}-${index}`}
                title={item.title || item.name || ""}
                image={tmdb.getImageUrl(item.poster_path)}
                year={
                  item.release_date?.split("-")[0] ||
                  item.first_air_date?.split("-")[0]
                }
                rating={Math.round(item.vote_average * 10) / 10}
                isPremium={type === "premium"}
                rank={type === "trending" ? index + 1 : undefined}
                isNew={type === "trending" && index < 2}
              />
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-0 bottom-0 z-30 flex items-center pointer-events-none"
            >
              <div className="pr-4 pointer-events-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scroll("right")}
                  className="w-12 h-12 rounded-full bg-card/80 hover:bg-card backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};
