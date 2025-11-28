import { useState, useEffect } from "react";
import { ContentCarousel } from "@/components/ContentCarousel";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

const Premium = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-premium border-t-transparent" />
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
            className="relative"
          >
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-10 h-10 text-premium animate-float" />
              <h1 className="font-serif text-4xl md:text-5xl font-bold gradient-gold">
                Premium Exclusives
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Exceptional content reserved for our premium members
            </p>
          </motion.div>
        </div>

        <div className="space-y-8">
          <ContentCarousel title="Premium Originals" type="premium" />
          <ContentCarousel title="Early Access" type="premium" />
          <ContentCarousel title="Award Winners" type="top-rated" />
          <ContentCarousel title="Premium Documentaries" type="genre" genreId={99} />
        </div>
      </main>
    </div>
  );
};

export default Premium;
