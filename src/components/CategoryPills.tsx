import { Flame, Sword, Heart, Ghost, Star, Moon, Baby } from "lucide-react";

interface CategoryPillsProps {
    selectedCategory?: string;
    onSelectCategory?: (category: string) => void;
}

export const CategoryPills = ({ selectedCategory = "Trending", onSelectCategory }: CategoryPillsProps) => {
    const categories = [
        { icon: Flame, label: "Trending" },
        { icon: Sword, label: "Action" },
        { icon: Heart, label: "Romance" },
        { icon: Baby, label: "Animation" },
        { icon: Ghost, label: "Horror" },
        { icon: Star, label: "Special" },
        { icon: Moon, label: "Drakor" },
    ];

    // Duplicate categories for infinite loop
    const marqueeCategories = [...categories, ...categories, ...categories, ...categories];

    return (
        <div className="w-full mb-12 overflow-hidden relative group">
            {/* Gradient Masks for smooth fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex items-center gap-4 animate-marquee min-w-max py-4">
                {marqueeCategories.map((cat, index) => {
                    const isActive = selectedCategory === cat.label;
                    return (
                        <button
                            key={`${cat.label}-${index}`}
                            onClick={() => onSelectCategory?.(cat.label)}
                            className={`
                flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-medium transition-all duration-300
                ${isActive
                                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                    : "bg-secondary/50 hover:bg-secondary/80 text-muted-foreground hover:text-foreground border border-transparent hover:border-border hover:scale-105"
                                }
              `}
                        >
                            <cat.icon size={24} className={isActive ? "text-primary-foreground" : "text-muted-foreground"} />
                            {cat.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
