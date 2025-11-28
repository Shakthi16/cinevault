import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoryPills } from "@/components/CategoryPills";
import { TrendingSection } from "@/components/TrendingSection";
import { ContentCarousel } from "@/components/ContentCarousel";
import { MovieTasteBreaker } from "@/components/MovieTasteBreaker";
import { GENRES } from "@/lib/tmdb";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Trending");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-background">

      <main className="pt-24">
        {/* Hero Section */}
        <HeroSection />

        {/* Categories */}
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Trending Section */}
        <TrendingSection selectedCategory={selectedCategory} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-black text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                StreamHub
              </h3>
              <p className="text-sm text-muted-foreground">
                Premium streaming, redefined.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Browse</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Movies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Series</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Premium</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Kids</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Account</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Preferences</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
            © 2024 StreamHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
