import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WeddingProvider } from "@/context/WeddingProvider";
import { Suspense, lazy } from "react";

// Lazy load pages
const AllImages = lazy(() => import("./pages/Gallery"));
const WeddingIndex = lazy(() => import("./pages/WeddingIndex"));
const Login = lazy(() => import("./pages/LoginRoute"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Wishes = lazy(() => import("./pages/Wishes"));

const queryClient = new QueryClient();

// Loading component
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
);

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Sonner />
            <BrowserRouter>
                <WeddingProvider>
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/wishes/:username" element={<Wishes />} />
                            <Route
                                path="/gallery/:username"
                                element={<AllImages />}
                            />
                            <Route path="/:username" element={<WeddingIndex />} />
                            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </WeddingProvider>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
