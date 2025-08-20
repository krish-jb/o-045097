import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WeddingProvider } from "@/context/WeddingProvider";
import AllImages from "./pages/Gallery";
import WeddingIndex from "./pages/WeddingIndex";
import Login from "./pages/LoginRoute";
import NotFound from "./pages/NotFound";
import Wishes from "./pages/Wishes";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Sonner />
            <BrowserRouter>
                <WeddingProvider>
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
                </WeddingProvider>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
