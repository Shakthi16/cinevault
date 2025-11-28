import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { User, Mail, LogOut, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { AvatarSelection } from "@/components/AvatarSelection";

const Profile = () => {
    const { user, signOut } = useAuth();

    if (!user) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-background">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
                    <Button onClick={() => window.location.href = "/auth"}>Sign In</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-background">
            <div className="container mx-auto max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-primary/20 rounded-2xl p-8 shadow-2xl"
                >
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold text-foreground shadow-[0_0_20px_rgba(239,109,47,0.3)] border-2 border-primary overflow-hidden">
                            {/* Display selected avatar emoji if available, else default */}
                            {localStorage.getItem("cinevault-avatar")
                                ? (
                                    <span className="text-5xl">
                                        {localStorage.getItem("cinevault-avatar") === "classic" ? "🎬" :
                                            localStorage.getItem("cinevault-avatar") === "director" ? "🎥" :
                                                localStorage.getItem("cinevault-avatar") === "popcorn" ? "🍿" :
                                                    localStorage.getItem("cinevault-avatar") === "critic" ? "🧐" :
                                                        localStorage.getItem("cinevault-avatar") === "star" ? "⭐" :
                                                            localStorage.getItem("cinevault-avatar") === "alien" ? "👽" : "👤"}
                                    </span>
                                )
                                : <span className="text-5xl">👤</span>
                            }
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{user.user_metadata.full_name || "StreamHub User"}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Shield className="w-4 h-4 text-accent" />
                                <span className="text-accent font-medium">Premium Member</span>
                            </div>
                        </div>
                    </div>

                    {/* Avatar Selection Section */}
                    <div className="mb-8">
                        <AvatarSelection />
                    </div>

                    <div className="space-y-6">
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                            <div className="flex items-center gap-3 mb-2 text-muted-foreground">
                                <Mail className="w-5 h-5" />
                                <span>Email Address</span>
                            </div>
                            <p className="text-lg font-medium">{user.email}</p>
                        </div>

                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                            <div className="flex items-center gap-3 mb-2 text-muted-foreground">
                                <User className="w-5 h-5" />
                                <span>User ID</span>
                            </div>
                            <p className="text-sm font-mono text-muted-foreground">{user.id}</p>
                        </div>

                        <Button
                            onClick={signOut}
                            variant="destructive"
                            className="w-full h-12 text-lg font-medium mt-8"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
