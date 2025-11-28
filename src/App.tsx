import { Toaster } from "@/components/ui/toaster";
// Force rebuild
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { WatchHistoryProvider } from "@/lib/WatchHistoryContext";
import { MyListProvider } from "@/lib/MyListContext";
import Index from "./pages/Index";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Kids from "./pages/Kids";
import Premium from "./pages/Premium";
import MyList from "./pages/MyList";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Watch from "./pages/Watch";
import Details from "./pages/Details";
import Originals from "./pages/Originals";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { AmbientMotionCanvas } from "./components/AmbientMotionCanvas";
import { MoodLensSwitcher } from "./components/MoodLensSwitcher";
import { SidebarProvider } from "@/lib/SidebarContext";
import { TopNav } from "./components/TopNav";
import { PageLoader } from "./components/PageLoader";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <TopNav />
      <main className="min-h-screen relative">
        {children}
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AmbientMotionCanvas />
      <MoodLensSwitcher />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <WatchHistoryProvider>
            <MyListProvider>
              <SidebarProvider>
                <PageLoader />
                <Routes>
                  {/* Standalone Pages (No Sidebar) */}
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/watch/:type/:id" element={<Watch />} />

                  {/* Main App Layout (With Sidebar) */}
                  <Route path="*" element={
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/series" element={<Series />} />
                        <Route path="/originals" element={<Originals />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/kids" element={<Kids />} />
                        <Route path="/premium" element={<Premium />} />
                        <Route path="/my-list" element={<MyList />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/movie/:id" element={<Details />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Layout>
                  } />
                </Routes>
              </SidebarProvider>
            </MyListProvider>
          </WatchHistoryProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
