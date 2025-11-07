import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-[radial-gradient(60%_60%_at_70%_10%,hsl(var(--primary)/0.08)_0%,transparent_60%)]">
          <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
            <div className="container flex h-14 items-center justify-between">
              <Link to="/" className="flex items-center gap-2" data-testid="brand-link">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">V</span>
                <span className="font-semibold tracking-tight">Vardiya Yönetimi</span>
              </Link>
              <nav className="flex items-center gap-6 text-sm">
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-home-link">Anasayfa</Link>
              </nav>
            </div>
          </header>
          <main className="container py-8">
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
