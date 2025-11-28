import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/lib/tmdb";
import { BentoGrid } from "@/components/BentoGrid";
import { useState } from "react";

const LANGUAGES = [
    { code: "ta", label: "Tamil" },
    { code: "hi", label: "Hindi" },
    { code: "en", label: "Hollywood" },
    { code: "ml", label: "Malayalam" },
    { code: "te", label: "Telugu" },
    { code: "ja", label: "Anime" },
    { code: "ko", label: "K-Drama" },
];

const Categories = () => {
    const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);

    const { data: movies, isLoading } = useQuery({
        queryKey: ["movies-by-language", selectedLang.code],
        queryFn: async () => {
            if (selectedLang.code === "ja") {
                // Anime: Animation genre (16) + Japanese language
                const data = await tmdb.discoverByGenre(16, "tv");
                // Explicitly set media_type to 'tv' for Anime so the player works
                return data.map((m: any) => ({ ...m, media_type: 'tv' }));
            }
            if (selectedLang.code === "ko") {
                // K-Drama: Korean language
                return await tmdb.discoverByLanguage("ko");
            }
            return await tmdb.discoverByLanguage(selectedLang.code);
        },
    });

    return (
        <div className="min-h-screen bg-background pt-24 px-8 pb-20">
            <h1 className="text-4xl font-bold text-white mb-8">Browse by Language</h1>

            <div className="flex flex-wrap gap-4 mb-12">
                {LANGUAGES.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => setSelectedLang(lang)}
                        className={`px-6 py-3 rounded-full text-lg font-medium transition-all ${selectedLang.code === lang.code
                            ? "bg-primary text-white shadow-lg scale-105"
                            : "bg-secondary/20 text-gray-400 hover:bg-secondary/40 hover:text-white"
                            }`}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
                </div>
            ) : (
                <BentoGrid
                    items={movies || []}
                    title={`${selectedLang.label} Movies & Series`}
                />
            )}
        </div>
    );
};

export default Categories;
