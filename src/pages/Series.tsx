import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/lib/tmdb";
import { HeroSection } from "@/components/HeroSection";
import { CategoryPills } from "@/components/CategoryPills";
import { BentoGrid } from "@/components/BentoGrid";
import { LoadingScreen } from "@/components/LoadingScreen";

const Series = () => {
  const { data: series, isLoading } = useQuery({
    queryKey: ["popular-series"],
    queryFn: () => tmdb.getPopularTVShows(),
  });

  // if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-background pt-24">
      <HeroSection mediaType="tv" />
      <CategoryPills />

      {series && (
        <BentoGrid
          items={series}
          title="Popular Series"
        />
      )}
    </div>
  );
};

export default Series;
