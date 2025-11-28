import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tmdb, Movie } from "@/lib/tmdb";
import { useMyList } from "@/lib/MyListContext";
import { GlassDetailOverlay } from "./GlassDetailOverlay";
import { useNavigate } from "react-router-dom";

export const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [heroContent, setHeroContent] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const { addToList } = useMyList();

  useEffect(() => {
    loadHeroContent();
  }, []);

  const loadHeroContent = async () => {
    try {
      const trending = await tmdb.getTrending("movie");
      setHeroContent(trending.slice(0, 3));
    } catch (error) {
      console.error("Error loading hero content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (heroContent.length === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(timer);
  }, [currentIndex, heroContent.length]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? heroContent.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === heroContent.length - 1 ? 0 : prev + 1));
  };

  const current = heroContent[currentIndex];

  if (loading || !current) {
    return (
      <div className="relative h-[85vh] w-full overflow-hidden mt-16 md:mt-20 flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative h-[85vh] w-full overflow-hidden mt-16 md:mt-20">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={tmdb.getImageUrl(current.backdrop_path, "original")}
              alt={current.title || current.name}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative container mx-auto px-12 h-full flex items-center">
            <motion.div
              className="max-w-2xl space-y-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {/* Badges */}
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-primary to-secondary text-foreground px-3 py-1 text-sm font-bold shadow-[0_0_15px_rgba(239,109,47,0.3)]">
                  ✨ FEATURED
                </Badge>
              </div>

              {/* Title */}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Glass Detail Overlay */}
      <GlassDetailOverlay
        movie={showDetails ? current : null}
        onClose={() => setShowDetails(false)}
      />

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/30 hover:bg-card/50 backdrop-blur-sm z-20"
        onClick={handlePrevious}
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/30 hover:bg-card/50 backdrop-blur-sm z-20"
        onClick={handleNext}
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-1 rounded-full transition-all duration-300 ${index === currentIndex
              ? "w-12 bg-primary"
              : "w-6 bg-muted-foreground/50 hover:bg-muted-foreground"
              }`}
          />
        ))}
      </div>
    </div>
  );
};
