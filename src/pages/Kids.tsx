import { useState, useEffect } from "react";
import { ContentCarousel } from "@/components/ContentCarousel";
import { GENRES } from "@/lib/tmdb";
import { motion } from "framer-motion";

const Kids = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold gradient-text mb-2">
              Kids & Family
            </h1>
            <p className="text-muted-foreground text-lg">
              Safe and fun content for the whole family
            </p>
          </motion.div>
        </div>

        <div className="space-y-8">
          <ContentCarousel title="Kids Favorites" type="kids" />
          <ContentCarousel title="Animation" type="genre" genreId={GENRES.ANIMATION} />
          <ContentCarousel title="Family Movies" type="genre" genreId={GENRES.FAMILY} />
          <ContentCarousel title="Adventure" type="genre" genreId={GENRES.ADVENTURE} />
        </div>
      </main>
    </div>
  );
};

export default Kids;
