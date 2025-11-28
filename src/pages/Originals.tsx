import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/lib/tmdb";
import { DashboardStats } from "@/components/DashboardStats";
import { BentoGrid } from "@/components/BentoGrid";
import { MovieGame } from "@/components/MovieGame";
import { LoadingScreen } from "@/components/LoadingScreen";

const Originals = () => {
    const { data: originals, isLoading } = useQuery({
        queryKey: ["originals-content"],
        queryFn: () => tmdb.getTopRatedMovies(),
    });

    // if (isLoading) return <LoadingScreen onLoadingComplete={() => { }} />;

    return (
        <div className="min-h-screen bg-background pt-24 px-8 pb-20">
            <div className="max-w-7xl mx-auto space-y-20">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                        CineVault <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Originals</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Exclusive content you won't find anywhere else. Award-winning series, movies, and documentaries.
                    </p>
                </div>

                {/* Dashboard Stats */}
                <DashboardStats />

                {/* Interactive Game */}
                <MovieGame />

                {/* Content Grid */}
                {originals && (
                    <BentoGrid
                        items={originals}
                        title="Critics Choice Collection"
                    />
                )}
            </div>
        </div>
    );
};

export default Originals;
