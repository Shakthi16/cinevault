import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getVideoForMovie } from "@/lib/videoMapper";
import { useWatchHistory } from "@/lib/WatchHistoryContext";
import { useEffect, useRef, useState } from "react";
import { tmdb } from "@/lib/tmdb";

const Watch = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const { updateProgress } = useWatchHistory();
    const progressInterval = useRef<NodeJS.Timeout>();
    const [videoId, setVideoId] = useState<string>("");

    // Fetch Video ID
    useEffect(() => {
        const fetchVideo = async () => {
            if (!id || !type) return;

            let videosData;
            if (type === 'tv') {
                videosData = await tmdb.getTVVideos(Number(id));
            } else {
                videosData = await tmdb.getMovieVideos(Number(id));
            }

            const results = videosData?.results || [];
            // Find the first Trailer on YouTube
            const trailer = results.find((v: any) => v.site === "YouTube" && v.type === "Trailer");
            // Or any YouTube video
            const anyVideo = results.find((v: any) => v.site === "YouTube");

            if (trailer) {
                setVideoId(trailer.key);
            } else if (anyVideo) {
                setVideoId(anyVideo.key);
            } else {
                // Fallback to mapper if API fails or no video found
                // We need the title for the mapper, but we only have ID here.
                // We can try to use the ID-based fallback in the mapper.
                setVideoId(getVideoForMovie("", id));
            }
        };

        fetchVideo();
    }, [id, type]);

    // Simulate tracking progress
    useEffect(() => {
        if (!id) return;

        // Start tracking "progress" every 5 seconds
        let currentProgress = 0;
        progressInterval.current = setInterval(() => {
            currentProgress += 1; // 1% every 5 seconds (simulated)
            if (currentProgress > 100) currentProgress = 100;
            updateProgress(Number(id), currentProgress);
        }, 5000);

        return () => {
            if (progressInterval.current) clearInterval(progressInterval.current);
        };
    }, [id, updateProgress]);

    return (
        <div className="min-h-screen bg-black flex flex-col">
            <div className="absolute top-4 left-4 z-50">
                <Button
                    variant="ghost"
                    className="text-foreground hover:bg-primary/20"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="w-6 h-6 mr-2" />
                    Back
                </Button>
            </div>

            <div className="flex-1 flex items-center justify-center bg-black">
                <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-center p-4">
                    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-primary/20">
                        {videoId ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                                title="Movie Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            ></iframe>
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-white">
                                <p>Loading video...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Watch;
