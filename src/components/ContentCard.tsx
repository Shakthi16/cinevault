import { motion } from "framer-motion";
import { Play, Plus, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { GlassDetailOverlay } from "./GlassDetailOverlay";
import { useWatchHistory } from "@/lib/WatchHistoryContext";
import { useNavigate } from "react-router-dom";

interface ContentCardProps {
  id?: number; // Make optional to avoid breaking everything immediately, but we should pass it
  title: string;
  image: string;
  year?: string;
  rating?: number;
  duration?: string;
  isPremium?: boolean;
  isNew?: boolean;
  rank?: number;
  progress?: number;
  mediaType?: "movie" | "tv";
}

export const ContentCard = ({
  id,
  title,
  image,
  year,
  rating,
  duration,
  isPremium,
  isNew,
  rank,
  progress: propProgress,
  mediaType = "movie",
}: ContentCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { getProgress } = useWatchHistory();
  const navigate = useNavigate();

  // Use prop progress (e.g. from trending) or history progress
  const progress = propProgress || (id ? getProgress(id) : 0);

  return (
    <motion.div
      className="group relative flex-shrink-0 w-48 md:w-56 cursor-pointer"
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.3 }}
      onClick={() => setShowDetails(true)}
    >
      <div
        className={`relative aspect-[2/3] rounded-xl overflow-hidden ${isPremium ? "ring-2 ring-primary shadow-[0_0_20px_rgba(239,109,47,0.4)]" : ""
          }`}
      >
        {/* Rank Badge for Trending */}
        {rank !== undefined && (
          <div className="absolute top-0 left-0 w-12 h-16 bg-gradient-to-br from-primary to-secondary flex items-start justify-center pt-2 z-20">
            <span className="text-2xl font-bold text-foreground">{rank}</span>
          </div>
        )}

        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Progress Bar for Continue Watching */}
        {progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30">
            <div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {isPremium && (
            <Badge className="bg-premium text-premium-foreground font-semibold shadow-lg">
              PREMIUM
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-secondary text-secondary-foreground font-semibold shadow-lg">
              NEW
            </Badge>
          )}
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {/* Info */}
          <div className="mb-3">
            <h3 className="font-serif text-lg font-bold text-shadow line-clamp-2 mb-2">
              {title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {year && <span>{year}</span>}
              {rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-accent text-accent" />
                  <span>{rating}</span>
                </div>
              )}
              {duration && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{duration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                if (id) navigate(`/watch/${mediaType}/${id}`);
              }}
            >
              <Play className="w-4 h-4 mr-1" />
              Play
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="border-border/50 hover:border-primary hover:bg-primary/10"
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(true);
              }}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Title below card (visible when not hovering) */}
      <motion.div
        className="mt-2 group-hover:opacity-0 transition-opacity"
        initial={{ opacity: 1 }}
      >
        <h4 className="text-sm font-medium line-clamp-1">{title}</h4>
        {year && <p className="text-xs text-muted-foreground">{year}</p>}
      </motion.div>

      {/* Watch Progress Bar */}
      {progress > 0 && (
        <div className="absolute bottom-[3.5rem] left-0 right-0 h-1 bg-gray-800 z-20">
          <div
            className="h-full bg-red-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <GlassDetailOverlay
        movie={showDetails ? {
          id: id || 0, // Pass the ID if available
          title,
          overview: "Detailed overview would be fetched here...",
          poster_path: image.replace("https://image.tmdb.org/t/p/w500", ""),
          backdrop_path: image.replace("https://image.tmdb.org/t/p/w500", ""),
          vote_average: rating || 0,
          release_date: year,
        } as any : null}
        onClose={() => setShowDetails(false)}
      />
    </motion.div>
  );
};
