import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TopNav = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleAuthAction = () => {
        if (!user) {
            navigate("/auth");
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
                CineVault
            </Link>

            {/* Center Navigation Pill */}
            <nav className="hidden md:flex items-center bg-black/30 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/10 shadow-lg">
                {[
                    { path: "/movies", label: "Movie" },
                    { path: "/series", label: "Series" },
                    { path: "/originals", label: "Originals" },
                    { path: "/categories", label: "Categories" },
                ].map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                            isActive
                                ? "bg-white/10 text-white shadow-sm"
                                : "text-gray-300 hover:text-white hover:bg-white/5"
                        )}
                    >
                        {item.label}
                    </NavLink>
                ))}
                <Link to="/search" className="p-2 rounded-full hover:bg-white/10 transition-colors ml-2 group">
                    <Search size={18} className="text-gray-300 group-hover:text-white transition-colors" />
                </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <Bell size={20} className="text-gray-300" />
                    {user && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1F2937]" />}
                </button>

                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-black/50 flex items-center justify-center text-white font-bold">
                                        {user.email?.[0].toUpperCase()}
                                    </div>
                                </div>
                                <div className="hidden lg:block text-sm">
                                    <p className="font-semibold text-white leading-none">{user.user_metadata?.full_name || "User"}</p>
                                    <p className="text-xs text-gray-400">Premium</p>
                                </div>
                                <ChevronDown size={16} className="text-gray-400" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-black/90 border-white/10 text-white backdrop-blur-xl">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => signOut()} className="focus:bg-white/10 focus:text-white cursor-pointer text-red-400 focus:text-red-400">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <button
                        onClick={handleAuthAction}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-medium"
                    >
                        <User size={18} />
                        <span>Sign In</span>
                    </button>
                )}
            </div>
        </header>
    );
};
