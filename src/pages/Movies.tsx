import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/lib/tmdb";
import { HeroSection } from "@/components/HeroSection";
import { CategoryPills } from "@/components/CategoryPills";
import { BentoGrid } from "@/components/BentoGrid";
import { LoadingScreen } from "@/components/LoadingScreen";

const Movies = () => {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["popular-movies-page"],
    queryFn: () => tmdb.getPopularMovies(2), // Fetch page 2 for variety
  });

  // if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-background pt-24">
      <HeroSection />
      <CategoryPills />

      {movies && (
        <BentoGrid
          items={movies}
          title="Popular Movies"
        />
      )}
    </div>
  );
};

export default Movies;
