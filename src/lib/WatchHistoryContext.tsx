import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface WatchHistoryContextType {
    history: Record<number, { progress: number; lastWatched: number }>;
    updateProgress: (movieId: number, progress: number) => void;
    getProgress: (movieId: number) => number;
}

const WatchHistoryContext = createContext<WatchHistoryContextType>({
    history: {},
    updateProgress: () => { },
    getProgress: () => 0,
});

export const useWatchHistory = () => useContext(WatchHistoryContext);

export const WatchHistoryProvider = ({ children }: { children: ReactNode }) => {
    const [history, setHistory] = useState<Record<number, { progress: number; lastWatched: number }>>({});

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("cinevault-history");
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("cinevault-history", JSON.stringify(history));
    }, [history]);

    const updateProgress = (movieId: number, progress: number) => {
        setHistory(prev => ({
            ...prev,
            [movieId]: {
                progress,
                lastWatched: Date.now()
            }
        }));
    };

    const getProgress = (movieId: number) => {
        return history[movieId]?.progress || 0;
    };

    return (
        <WatchHistoryContext.Provider value={{ history, updateProgress, getProgress }}>
            {children}
        </WatchHistoryContext.Provider>
    );
};
