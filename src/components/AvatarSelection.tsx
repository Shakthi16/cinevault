import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const AVATARS = [
    { id: "classic", emoji: "🎬", name: "The Classic" },
    { id: "popcorn", emoji: "🍿", name: "Popcorn Addict" },
    { id: "director", emoji: "📢", name: "The Director" },
    { id: "critic", emoji: "🧐", name: "The Critic" },
    { id: "star", emoji: "⭐", name: "Superstar" },
    { id: "alien", emoji: "👽", name: "Sci-Fi Geek" },
    { id: "ghost", emoji: "👻", name: "Horror Fan" },
    { id: "cowboy", emoji: "🤠", name: "Western Hero" },
    { id: "robot", emoji: "🤖", name: "Tech Noir" },
    { id: "ninja", emoji: "🥷", name: "Action Star" },
];

export const AvatarSelection = () => {
    const [selectedAvatar, setSelectedAvatar] = useState("classic");

    useEffect(() => {
        const saved = localStorage.getItem("cinevault-avatar");
        if (saved) setSelectedAvatar(saved);
    }, []);

    const handleSelect = (id: string) => {
        setSelectedAvatar(id);
        localStorage.setItem("cinevault-avatar", id);
    };

    return (
        <div className="bg-card/30 border border-primary/15 rounded-xl p-6 backdrop-blur-md">
            <h3 className="text-xl font-serif font-bold text-foreground mb-4">Choose Your Persona</h3>
            <div className="grid grid-cols-5 gap-4">
                {AVATARS.map((avatar) => (
                    <motion.button
                        key={avatar.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelect(avatar.id)}
                        className={`relative aspect-square rounded-full flex items-center justify-center text-3xl bg-black/40 border-2 transition-all ${selectedAvatar === avatar.id
                                ? "border-primary shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                                : "border-transparent hover:border-white/20"
                            }`}
                        title={avatar.name}
                    >
                        {avatar.emoji}
                        {selectedAvatar === avatar.id && (
                            <div className="absolute -bottom-1 -right-1 bg-primary text-black rounded-full p-0.5">
                                <Check className="w-3 h-3" />
                            </div>
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
