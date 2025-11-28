import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroCardProps {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
}

export const HeroCard = ({ id, title, description, image, link }: HeroCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-[500px] rounded-2xl overflow-hidden group shadow-2xl border border-white/5"
        >
            {/* Background Image */}
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 w-full md:w-2/3 lg:w-1/2 space-y-4">
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl font-black text-white drop-shadow-lg font-playfair tracking-tight"
                >
                    {title}
                </motion.h2>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-muted-foreground text-lg line-clamp-2"
                >
                    {description}
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4 pt-4"
                >
                    <Link to={link}>
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg font-bold shadow-[0_0_20px_rgba(255,20,147,0.4)] hover:shadow-[0_0_30px_rgba(255,20,147,0.6)] transition-all">
                            <Play className="mr-2 fill-current" /> Watch Now
                        </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-white/20 hover:bg-white/10 backdrop-blur-sm">
                        More Info
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
};
