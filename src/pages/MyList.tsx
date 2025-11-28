import { useState, useEffect } from "react";
import { ContentCard } from "@/components/ContentCard";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { tmdb } from "@/lib/tmdb";
import { ListPlus } from "lucide-react";
import { useMyList } from "@/lib/MyListContext";

const MyList = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { list: myList } = useMyList();
  const [loading, setLoading] = useState(false); // No loading needed for local context

  // Removed Supabase logic as we are using local context for now

  if (authLoading || loading) {
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
            <div className="flex items-center gap-3 mb-2">
              <ListPlus className="w-8 h-8 text-primary" />
              <h1 className="font-serif text-4xl md:text-5xl font-bold gradient-text">
                My List
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Your personal collection of movies and series
            </p>
          </motion.div>
        </div>

        {myList.length > 0 ? (
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {myList.map((item) => (
                <ContentCard
                  key={item.id}
                  title={item.title}
                  image={tmdb.getImageUrl(item.poster_path)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ListPlus className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="font-serif text-2xl font-bold mb-2">Your list is empty</h2>
              <p className="text-muted-foreground mb-6">
                Start adding movies and series to build your perfect collection
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors"
              >
                Explore Content
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyList;
