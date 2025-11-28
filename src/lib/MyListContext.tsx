import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Movie } from "@/lib/tmdb";
import { toast } from "sonner";

interface MyListContextType {
    list: Movie[];
    addToList: (movie: Movie) => void;
    removeFromList: (movieId: number) => void;
    isInList: (movieId: number) => boolean;
}

const MyListContext = createContext<MyListContextType>({
    list: [],
    addToList: () => { },
    removeFromList: () => { },
    isInList: () => false,
});

export const useMyList = () => useContext(MyListContext);

export const MyListProvider = ({ children }: { children: ReactNode }) => {
    const [list, setList] = useState<Movie[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedList = localStorage.getItem("cinevault-mylist");
        if (savedList) {
            try {
                setList(JSON.parse(savedList));
            } catch (e) {
                console.error("Failed to parse my list", e);
            }
        }
    }, []);

    // Save to localStorage whenever list changes
    useEffect(() => {
        localStorage.setItem("cinevault-mylist", JSON.stringify(list));
    }, [list]);

    const addToList = (movie: Movie) => {
        setList((prev) => {
            if (prev.some((m) => m.id === movie.id)) return prev;
            toast.success("Added to My List");
            return [...prev, movie];
        });
    };

    const removeFromList = (movieId: number) => {
        setList((prev) => {
            toast.info("Removed from My List");
            return prev.filter((m) => m.id !== movieId);
        });
    };

    const isInList = (movieId: number) => {
        return list.some((m) => m.id === movieId);
    };

    return (
        <MyListContext.Provider value={{ list, addToList, removeFromList, isInList }}>
            {children}
        </MyListContext.Provider>
    );
};
