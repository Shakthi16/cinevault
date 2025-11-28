import { motion } from "framer-motion";
import { TrendingUp, Users, Star, Award } from "lucide-react";

export const DashboardStats = () => {
    const stats = [
        { label: "Total Views", value: "2.4M", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
        { label: "Avg Rating", value: "4.8", icon: Star, color: "text-yellow-400", bg: "bg-yellow-400/10" },
        { label: "Awards", value: "12", icon: Award, color: "text-purple-400", bg: "bg-purple-400/10" },
        { label: "Trending", value: "#1", icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#1F2937]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex items-center gap-4"
                >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                </motion.div>
            ))}

            {/* Score Ring Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="md:col-span-2 bg-[#1F2937]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex items-center justify-between relative overflow-hidden"
            >
                <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2">Audience Score</h3>
                    <p className="text-gray-400 max-w-xs">Based on verified ratings from our premium community members.</p>
                </div>

                <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="25.12" className="text-green-500" />
                    </svg>
                    <span className="absolute text-2xl font-bold text-white">90%</span>
                </div>
            </motion.div>

            {/* Top Critic Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="md:col-span-2 bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex items-center gap-6"
            >
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <Award className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Critics Choice</h3>
                    <p className="text-gray-300">"A masterpiece of modern storytelling"</p>
                    <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-current" />)}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
